import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axiosClient from "@/api/axiosClient";
import { Mail, Lock, ShieldCheck, Globe } from "lucide-react";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

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
      navigate("/");
    } catch (err) {
      const serverMessage =
        err.response?.data || "Tài khoản hoặc mật khẩu không chính xác.";
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
            <div className="flex items-center gap-2 mb-6 lg:mb-8 text-slate-900">
              <ShieldCheck size={28} className="fill-slate-900 text-white" />
              <span className="text-xl font-bold font-heading tracking-tight">Hoverse</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-normal text-slate-900 mb-3 lg:mb-4 tracking-tight">
              Welcome back to Hoverse
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm lg:text-base leading-relaxed mb-8 lg:mb-10 max-w-xs">
              Welcome back to Hoverse, the ultimate platform for exploring places. Let's get you signed in.
            </p>

            <form onSubmit={handleSubmit} className="w-full flex flex-col items-center gap-3.5 lg:gap-4">
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
                {loading ? "Signing in..." : "Log In"}
              </button>
            </form>

            <div className="w-3/4 h-px bg-slate-200/80 my-6 lg:my-8"></div>

            <button
              type="button"
              className="w-full h-12 lg:h-14 bg-white text-slate-900 rounded-full text-sm font-medium shadow-sm border border-slate-100/50 hover:bg-slate-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2 flex items-center justify-center gap-2.5"
            >
              <Globe size={18} className="text-slate-700 lg:w-5 lg:h-5" />
              Sign in with Google
            </button>

            <div className="mt-6 lg:mt-8 text-xs lg:text-sm text-slate-500">
              Don't have an account?{" "}
              <Link to="/register" className="font-semibold text-slate-900 hover:underline">
                Sign up
              </Link>
            </div>
          </div>
        </div>

        <div className="hidden lg:block bg-slate-200 rounded-[2.5rem] relative overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
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