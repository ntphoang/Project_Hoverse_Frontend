import { useState } from "react";
import { useAuthStore } from "@/store";
import { Link, useNavigate, NavLink } from "react-router-dom";
import { AlertTriangle, Loader2, Menu, X } from "lucide-react";
import { useResendVerify } from "@/features/auth";

const NAV_ITEMS = [
  { path: "/", label: "Trang chủ", isExact: true },
  { path: "/favorites", label: "Yêu thích" },
  { path: "/ai", label: "AI gợi ý" },
  { path: "/admin/dashboard", label: "Quản lý" },
];

const AVATAR_DEFAULT =
  "https://res.cloudinary.com/ty4mmnvd/image/upload/v1785929829/avatar-default_ziyif2.svg";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const { resendVerify, countdown, isLoading, error } = useResendVerify();
  const navigate = useNavigate();

  const navItems =
    user?.role === "ADMIN"
      ? NAV_ITEMS
      : NAV_ITEMS.filter((item) => !item.path.startsWith("/admin/"));

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleMobileNavClick = () => {
    setIsMobileMenuOpen(false);
  };

  const navLinkStyles = ({ isActive }) =>
    `flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-sm transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/50 ${
      isActive
        ? "bg-slate-900 text-white shadow-sm"
        : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
    }`;

  return (
    <header className="sticky top-4 w-full z-50 px-4 md:px-6 lg:px-8">
      <div className="relative max-w-7xl mx-auto px-4 md:px-6 py-2.5 bg-white/90 backdrop-blur-md rounded-full shadow-card flex justify-between items-center border border-slate-200">
        
        {/* 1. BRAND / LOGO */}
        <Link
          to="/"
          className="flex items-center gap-2 transition-transform duration-300 hover:scale-[1.02] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/50 rounded-lg"
          aria-label="Về trang chủ Hoverse"
        >
          <h1 className="text-2xl font-extrabold font-heading text-slate-900 tracking-tight">
            Hoverse
          </h1>
        </Link>

        {/* 2. MAIN NAVIGATION */}
        <nav aria-label="Main Navigation" className="hidden md:block">
          <ul className="flex items-center gap-1 m-0 p-0 list-none">
            {navItems.map((item) => (
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

        {/* 3. USER / AUTH ACTIONS & MOBILE TOGGLE */}
        <div className="flex items-center gap-1.5 md:gap-3">
          {user != null ? (
            <div className="flex items-center gap-2">
              <Link
                to="/users/me"
                className="flex items-center gap-2 pr-2 sm:pr-4 pl-1.5 py-1.5 rounded-full hover:bg-slate-100 transition-all duration-300 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/50"
              >
                <img
                  src={user.avatarUrl || AVATAR_DEFAULT}
                  className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shadow-sm"
                  alt="Avatar"
                />
                <span className="hidden sm:block text-slate-900 text-sm font-semibold truncate max-w-[120px]">
                  {user.fullName || user.email.split("@")[0]}
                </span>
              </Link>

              <button
                onClick={handleLogout}
                className="hidden sm:block text-slate-500 font-semibold text-sm px-4 py-2 rounded-full hover:text-white hover:bg-slate-900 transition-all duration-300 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/50"
              >
                Đăng xuất
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-1 md:gap-3">
              <Link
                to="/login"
                className="text-slate-600 font-semibold text-sm px-3 md:px-5 py-2.5 rounded-full hover:text-slate-900 hover:bg-slate-100 transition-all duration-300 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/50"
              >
                Đăng nhập
              </Link>

              <Link
                to="/register"
                className="hidden sm:flex bg-slate-900 text-white font-semibold text-sm px-5 md:px-6 py-2.5 rounded-full hover:bg-black hover:-translate-y-0.5 shadow-card hover:shadow-hover transition-all duration-300 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/50 focus-visible:ring-offset-2 items-center gap-2"
              >
                Đăng ký
              </Link>
            </div>
          )}

          {/* NÚT TOGGLE MENU CHO MOBILE */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/50 ml-1"
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* 4. MOBILE MENU DROPDOWN */}
        {isMobileMenuOpen && (
          <div className="absolute top-[calc(100%+12px)] left-0 right-0 bg-white/95 backdrop-blur-md rounded-2xl shadow-hover border border-slate-200 p-4 flex flex-col gap-2 md:hidden animate-in fade-in slide-in-from-top-4 duration-200">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={handleMobileNavClick}
                end={item.isExact}
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 rounded-xl font-semibold text-sm transition-all ${
                    isActive
                      ? "bg-slate-900 text-white"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
            
            {user ? (
              <button
                onClick={() => {
                  handleLogout();
                  handleMobileNavClick();
                }}
                className="sm:hidden mt-2 flex items-center justify-center w-full px-4 py-3 bg-slate-100 text-slate-900 font-semibold text-sm rounded-xl hover:bg-slate-200 transition-colors"
              >
                Đăng xuất
              </button>
            ) : (
              <Link
                to="/register"
                onClick={handleMobileNavClick}
                className="sm:hidden mt-2 flex items-center justify-center w-full px-4 py-3 bg-slate-900 text-white font-semibold text-sm rounded-xl hover:bg-black transition-colors shadow-card"
              >
                Đăng ký ngay
              </Link>
            )}
          </div>
        )}
      </div>

      {/* Banner cảnh báo khi chưa xác thực email */}
      {user && user.isEmailVerified === false && (
        <div className="bg-warning/10 border border-warning/20 rounded-2xl px-4 py-3 mt-3 max-w-7xl mx-auto shadow-sm animate-in fade-in duration-300">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-sm font-medium">
            <div className="flex items-center gap-2.5 text-slate-800 text-center sm:text-left">
              <AlertTriangle className="w-5 h-5 text-warning shrink-0" />
              <span>
                Tài khoản của bạn chưa được xác thực. Một số tính năng đã bị giới hạn.
              </span>
            </div>

            <button
              onClick={resendVerify}
              disabled={countdown > 0 || isLoading}
              className={`
                inline-flex items-center shrink-0 px-4 py-1.5 rounded-full font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-warning
                ${
                  countdown > 0 || isLoading
                    ? "bg-white/50 text-warning/50 cursor-not-allowed"
                    : "bg-white text-warning hover:bg-warning hover:text-white shadow-sm cursor-pointer"
                }
              `}
            >
              {isLoading && <Loader2 className="w-3.5 h-3.5 animate-spin mr-1.5" />}
              {countdown > 0 ? `Gửi lại sau (${countdown}s)` : "Gửi lại mã"}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}