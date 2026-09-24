import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axiosClient from "@/api/axiosClient";
import { Mail, Lock, ShieldCheck, Globe, ArrowLeft } from "lucide-react";
import { useAuthStore } from "@/store";
import { GoogleLogin } from "@react-oauth/google";

const COVER_IMAGE_DEFAULT =
  "https://res.cloudinary.com/ty4mmnvd/image/upload/v1787644536/viahe_mkjivv.jpg";

const Login = () => {
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const location = useLocation();
  const from = location.state?.from || "/";

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError("Vui lòng nhập đầy đủ email và mật khẩu.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      const responseData = await axiosClient.post("/auth/login", formData);
      login(responseData);
      navigate(from, { replace: true });
    } catch (err) {
      const serverMessage =
        err.response?.data || "Tài khoản hoặc mật khẩu không chính xác.";
      setError(serverMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async (credentialResponse) => {
    try {
      setLoading(true);
      setError("");

      const response = await axiosClient.post("/auth/google", {
        credential: credentialResponse.credential,
      });

      login(response);

      navigate(from, { replace: true });
    } catch (error) {
      const serverMessage =
        error.response?.data || "Đăng nhập Google thất bại.";
      setError(serverMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-slate-50 p-4 md:p-6 lg:p-8 flex items-center justify-center overflow-y-auto">
      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        <div className="bg-gradient-to-br from-white via-[#fdfbf7] to-[#eeeae0] rounded-[2rem] lg:rounded-[2.5rem] flex flex-col items-center justify-center py-10 px-6 sm:p-12 lg:p-16 shadow-sm border border-white/50">
          <div className="w-full max-w-md flex flex-col items-center text-center">
            <div className="flex items-center gap-2 mb-3 lg:mb-2 text-slate-900">
              <ShieldCheck size={28} className="fill-slate-900 text-white" />
              <span className="text-xl font-bold font-heading tracking-tight">
                Hoverse
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-normal text-slate-900 mb-3 lg:mb-4 tracking-tight">
              Chào mừng đến với Hoverse
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm lg:text-base leading-relaxed mb-8 lg:mb-10 max-w-xs">
              Cùng nhau chia sẻ và khám phá các địa điểm vui chơi, giải trí.
            </p>

            <form
              onSubmit={handleSubmit}
              className="w-full flex flex-col items-center gap-3.5 lg:gap-4"
            >
              <div className="w-full h-12 lg:h-14 bg-white rounded-full flex items-center px-5 shadow-sm border border-slate-100/50 focus-within:ring-2 focus-within:ring-slate-900/10 transition-all">
                <Mail size={18} className="text-slate-400 shrink-0" />
                <div className="w-px h-5 bg-slate-200 mx-3 lg:mx-4 shrink-0"></div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={loading}
                  placeholder="hi@domain.com"
                  className="flex-1 h-full bg-transparent outline-none text-sm text-slate-900 placeholder:text-slate-400"
                />
              </div>

              <div className="w-full h-12 lg:h-14 bg-white rounded-full flex items-center px-5 shadow-sm border border-slate-100/50 focus-within:ring-2 focus-within:ring-slate-900/10 transition-all">
                <Lock size={18} className="text-slate-400 shrink-0" />
                <div className="w-px h-5 bg-slate-200 mx-3 lg:mx-4 shrink-0"></div>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  disabled={loading}
                  placeholder="Password"
                  className="flex-1 h-full bg-transparent outline-none text-sm text-slate-900 placeholder:text-slate-400"
                />
              </div>

              {error && (
                <div className="w-full text-center text-sm font-medium text-danger mt-1">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full h-12 lg:h-14 mt-2 lg:mt-4 bg-black text-white rounded-full text-sm font-medium hover:bg-slate-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? "Đang đăng nhập..." : "Đăng nhập"}
              </button>
            </form>

            <div className="w-3/4 h-px bg-slate-200/80 my-6 lg:my-8"></div>

            <div className="relative w-full h-12 lg:h-14">
              {/* GoogleLogin thật */}
              <div className="absolute inset-0 z-10 opacity-0">
                <GoogleLogin
                  onSuccess={handleGoogleLogin}
                  onError={() => {
                    setError("Đăng nhập Google thất bại.");
                  }}
                  useOneTap={false}
                />
              </div>

              {/* UI Google của Hoverse */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="w-full h-full bg-white text-slate-900 rounded-full text-sm font-medium shadow-sm border border-slate-100/80 flex items-center justify-center gap-2.5 transition-all duration-200 hover:bg-slate-50 hover:border-slate-200 hover:shadow-md">
                  <svg
                    width="19"
                    height="19"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className="shrink-0"
                  >
                    <path
                      fill="#4285F4"
                      d="M21.35 12.27c0-.78-.07-1.53-.22-2.25H12v4.26h5.24a4.48 4.48 0 0 1-1.94 2.94v2.45h3.14c1.84-1.69 2.91-4.18 2.91-7.4Z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 21.5c2.63 0 4.84-.87 6.45-2.36l-3.14-2.45c-.87.58-1.98.92-3.31.92-2.54 0-4.69-1.72-5.46-4.03H3.29v2.53A9.75 9.75 0 0 0 12 21.5Z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M6.54 13.58A5.87 5.87 0 0 1 6.23 12c0-.55.1-1.08.31-1.58V7.89H3.29A9.5 9.5 0 0 0 2.25 12c0 1.53.37 2.98 1.04 4.11l3.25-2.53Z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 6.39c1.43 0 2.71.49 3.72 1.45l2.79-2.79C16.84 3.47 14.63 2.5 12 2.5a9.75 9.75 0 0 0-8.71 5.39l3.25 2.53C7.31 8.11 9.46 6.39 12 6.39Z"
                    />
                  </svg>
                  <span>Đăng nhập với Google</span>
                </div>
              </div>
            </div>

            <div className="mt-6 lg:mt-8 text-xs lg:text-sm text-slate-500">
              Bạn chưa có tài khoản?{" "}
              <Link
                to="/register"
                className="font-semibold text-slate-900 hover:underline"
              >
                Đăng ký
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
            alt="Hovers Workspace"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
        </div>
      </div>
    </div>
  );
};

export default Login;
