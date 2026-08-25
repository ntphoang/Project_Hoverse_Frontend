import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosClient from "@/api/axiosClient";
import { Mail, Lock, ShieldCheck, Globe, ArrowLeft } from "lucide-react";

const COVER_IMAGE_DEFAULT =
  "https://res.cloudinary.com/ty4mmnvd/image/upload/v1787644536/viahe2_otgmsh.webp";

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
    if (apiError) setApiError("");
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email không được để trống";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email không đúng định dạng";
    }

    if (!formData.password) {
      newErrors.password = "Mật khẩu không được để trống";
    } else if (formData.password.length < 6) {
      newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Mật khẩu nhập lại không khớp";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const payload = {
      email: formData.email,
      password: formData.password,
    };

    try {
      setIsLoading(true);
      const response = await axiosClient.post("/auth/register", payload);
      navigate("/login");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Đăng ký thất bại. Vui lòng thử lại!";
      setApiError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-slate-50 p-4 md:p-6 lg:p-8 flex items-center justify-center overflow-y-auto">
      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 my-auto">
        <div className="bg-gradient-to-br from-white via-[#fdfbf7] to-[#eeeae0] rounded-[2rem] lg:rounded-[2.5rem] flex flex-col items-center justify-center py-10 px-6 sm:p-12 lg:p-16 shadow-sm border border-white/50">
          <div className="w-full max-w-md flex flex-col items-center text-center">
            <div className="flex items-center gap-2 mb-3 lg:mb-2 text-slate-900">
              <ShieldCheck size={28} className="fill-slate-900 text-white" />
              <span className="text-xl font-bold font-heading tracking-tight">
                Hoverse
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-normal text-slate-900 mb-3 lg:mb-4 tracking-tight">
              Tham gia ngay hôm nay
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm lg:text-base leading-relaxed mb-8 lg:mb-10 max-w-xs">
              Tạo tài khoản để lưu và đánh giá các địa điểm yêu thích của bạn.
            </p>

            {apiError && (
              <div className="w-full p-3 mb-6 text-sm font-medium text-danger bg-danger/5 border-l-4 border-danger text-left rounded-r-md">
                {apiError}
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="w-full flex flex-col items-center gap-4 lg:gap-5"
            >
              <div className="w-full flex flex-col gap-1.5">
                <div
                  className={`w-full h-12 lg:h-14 bg-white rounded-full flex items-center px-5 shadow-sm border transition-all ${errors.email ? "border-danger/50 focus-within:ring-2 focus-within:ring-danger/20" : "border-slate-100/50 focus-within:ring-2 focus-within:ring-slate-900/10"}`}
                >
                  <Mail
                    size={18}
                    className={
                      errors.email ? "text-danger" : "text-slate-400 shrink-0"
                    }
                  />
                  <div
                    className={`w-px h-5 mx-3 lg:mx-4 shrink-0 ${errors.email ? "bg-danger/20" : "bg-slate-200"}`}
                  ></div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={isLoading}
                    placeholder="hi@domain.com"
                    className="flex-1 h-full bg-transparent outline-none text-sm text-slate-900 placeholder:text-slate-400"
                  />
                </div>
                {errors.email && (
                  <span className="text-xs text-danger ml-5 text-left">
                    {errors.email}
                  </span>
                )}
              </div>

              <div className="w-full flex flex-col gap-1.5">
                <div
                  className={`w-full h-12 lg:h-14 bg-white rounded-full flex items-center px-5 shadow-sm border transition-all ${errors.password ? "border-danger/50 focus-within:ring-2 focus-within:ring-danger/20" : "border-slate-100/50 focus-within:ring-2 focus-within:ring-slate-900/10"}`}
                >
                  <Lock
                    size={18}
                    className={
                      errors.password
                        ? "text-danger"
                        : "text-slate-400 shrink-0"
                    }
                  />
                  <div
                    className={`w-px h-5 mx-3 lg:mx-4 shrink-0 ${errors.password ? "bg-danger/20" : "bg-slate-200"}`}
                  ></div>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    disabled={isLoading}
                    placeholder="Password (min 6 characters)"
                    className="flex-1 h-full bg-transparent outline-none text-sm text-slate-900 placeholder:text-slate-400"
                  />
                </div>
                {errors.password && (
                  <span className="text-xs text-danger ml-5 text-left">
                    {errors.password}
                  </span>
                )}
              </div>

              <div className="w-full flex flex-col gap-1.5">
                <div
                  className={`w-full h-12 lg:h-14 bg-white rounded-full flex items-center px-5 shadow-sm border transition-all ${errors.confirmPassword ? "border-danger/50 focus-within:ring-2 focus-within:ring-danger/20" : "border-slate-100/50 focus-within:ring-2 focus-within:ring-slate-900/10"}`}
                >
                  <Lock
                    size={18}
                    className={
                      errors.confirmPassword
                        ? "text-danger"
                        : "text-slate-400 shrink-0"
                    }
                  />
                  <div
                    className={`w-px h-5 mx-3 lg:mx-4 shrink-0 ${errors.confirmPassword ? "bg-danger/20" : "bg-slate-200"}`}
                  ></div>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    disabled={isLoading}
                    placeholder="Confirm Password"
                    className="flex-1 h-full bg-transparent outline-none text-sm text-slate-900 placeholder:text-slate-400"
                  />
                </div>
                {errors.confirmPassword && (
                  <span className="text-xs text-danger ml-5 text-left">
                    {errors.confirmPassword}
                  </span>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 lg:h-14 mt-2 lg:mt-4 bg-black text-white rounded-full text-sm font-medium hover:bg-slate-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? "Đang đăng ký..." : "Đăng ký"}
              </button>
            </form>

            <div className="w-3/4 h-px bg-slate-200/80 my-6 lg:my-8"></div>

            <button
              type="button"
              className="w-full h-12 lg:h-14 bg-white text-slate-900 rounded-full text-sm font-medium shadow-sm border border-slate-100/50 hover:bg-slate-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2 flex items-center justify-center gap-2.5"
            >
              <Globe size={18} className="text-slate-700 lg:w-5 lg:h-5" />
              Đăng ký với Google
            </button>

            <div className="mt-6 lg:mt-8 text-xs lg:text-sm text-slate-500">
              Bạn đã có tài khoản?{" "}
              <Link
                to="/login"
                className="font-semibold text-slate-900 hover:underline"
              >
                Đăng nhập
              </Link>
            </div>

            <div className="text-xs lg:text-sm text-slate-500">
              <Link
                to="/"
                className="inline-flex items-center gap-1.5 text-slate-500 hover:text-slate-900 font-medium transition-colors group"
              >
                <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
                <span>Quay về trang chủ</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="hidden lg:block bg-slate-200 rounded-[2.5rem] relative overflow-hidden">
          <img
            src={COVER_IMAGE_DEFAULT}
            alt="Hovers Architecture"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
        </div>
      </div>
    </div>
  );
};

export default Register;
