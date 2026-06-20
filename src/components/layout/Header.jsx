import "./Header.css";
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="modern-header">
      <div className="header-container">
        <Link to="/" className="logo-container">
          <span className="logo-icon">✨</span>
          <h1 className="logo-text">Hoverse</h1>
        </Link>

        <nav className="nav-menu">
          {user ? (
            <div className="user-info">
              <div className="user-avatar">
                {user.email.charAt(0).toUpperCase()}
              </div>
              <span className="user-greeting">
                Xin chào, <b>{user.email.split("@")[0]}</b>!
              </span>
              <button className="btn-logout" onClick={handleLogout}>
                Đăng xuất
              </button>
            </div>
          ) : (
            <div className="auth-links">
              <Link to="/login" className="btn-login">
                Đăng nhập
              </Link>
              <Link to="/register" className="btn-register">
                Đăng ký
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
