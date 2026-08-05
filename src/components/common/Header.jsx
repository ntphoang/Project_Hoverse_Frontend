import { useAuthStore } from "@/store";
import { Link, useNavigate, NavLink } from "react-router-dom";
import { AlertTriangle, Loader2 } from "lucide-react";
import { useResendVerify } from "@/features/auth";

const NAV_ITEMS = [
  { path: "/", label: "Trang chủ", isExact: true },
  { path: "/favorites", label: "Yêu thích" },
  { path: "/about", label: "Giới thiệu" },
];

const AVATAR_DEFAULT = "https://res.cloudinary.com/ty4mmnvd/image/upload/v1785929829/avatar-default_ziyif2.svg";

export default function Header() {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const { resendVerify, countdown, isLoading, error } = useResendVerify();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navLinkStyles = ({ isActive }) =>
    `flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-sm transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/50 ${
      isActive
        ? "bg-slate-100 text-slate-900 shadow-sm"
        : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
    }`;

  return (
    <header className="sticky top-4 w-full z-50 px-4 md:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-2.5 bg-white/80 backdrop-blur-md rounded-full shadow-card flex justify-between items-center ring-1 ring-slate-900/5">
        {/* 1. BRAND / LOGO */}
        <Link
          to="/"
          className="flex items-center gap-2 transition-transform duration-300 hover:scale-[1.02] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/50 rounded-lg"
          aria-label="Về trang chủ Hoverse"
        >
          <h1 className="text-2xl font-extrabold font-heading text-slate-900 tracking-tight">
            Hoverse
          </h1>
        </Link>

        {/* 2. MAIN NAVIGATION */}
        <nav aria-label="Main Navigation" className="hidden md:block">
          <ul className="flex items-center gap-1 m-0 p-0 list-none">
            {NAV_ITEMS.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={navLinkStyles}
                  end={item.isExact}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* 3. USER / AUTH ACTIONS */}
        <div className="flex items-center">
          {user != null ? (
            <div className="flex items-center gap-2">
              <Link
                to="/users/me"
                className="flex items-center gap-2 pr-4 pl-1.5 py-1.5 rounded-full hover:bg-slate-100 transition-all duration-300 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/50"
              >
                {/* Avatar */}
                <img src={user.avatarUrl || AVATAR_DEFAULT} className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shadow-sm">
                </img>
                <span className="hidden sm:block text-slate-900 text-sm font-semibold truncate max-w-[120px]">
                  {user.fullName || user.email.split("@")[0]}
                </span>
              </Link>

              <button
                onClick={handleLogout}
                className="text-slate-500 font-semibold text-sm px-4 py-2 rounded-full hover:text-danger hover:bg-accent-50 transition-all duration-300 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-danger/50"
              >
                Đăng xuất
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 md:gap-3">
              <Link
                to="/login"
                className="text-slate-600 font-semibold text-sm px-4 md:px-5 py-2.5 rounded-full hover:text-slate-900 hover:bg-slate-100 transition-all duration-300 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/50"
              >
                Đăng nhập
              </Link>

              <Link
                to="/register"
                className="bg-primary-600 text-white font-semibold text-sm px-5 md:px-6 py-2.5 rounded-full hover:bg-primary-700 hover:-translate-y-0.5 hover:shadow-hover transition-all duration-300 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/50 focus-visible:ring-offset-2 flex items-center gap-2"
              >
                Đăng ký
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Banner cảnh báo khi chưa xác thực email */}
      {user && user.isEmailVerified === false && (
        <div className="bg-amber-50 border-b border-amber-200 px-4 py-3 mt-2 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 text-sm font-medium">
            {/* Nhóm Icon và Text */}
            <div className="flex items-center gap-2.5 text-amber-900 text-center sm:text-left">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>
                Tài khoản của bạn chưa được xác thực. Một số tính năng đã bị
                giới hạn.
              </span>
            </div>

            {/* Call to Action Button */}
            <button
              onClick={resendVerify}
              disabled={countdown > 0 || isLoading}
              className={`
          inline-flex items-center gap-1.5 font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-600 rounded-sm
          ${
            countdown > 0 || isLoading
              ? "text-amber-600/50 cursor-not-allowed"
              : "text-amber-700 hover:text-amber-900 hover:underline underline-offset-4 cursor-pointer"
          }
        `}
            >
              {isLoading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}

              {countdown > 0
                ? `Gửi lại sau (${countdown}s)`
                : "Gửi lại mã xác thực"}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
