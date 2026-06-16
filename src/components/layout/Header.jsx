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
    <header className="app-header">
      <div className="logo-container">
        <span className="logo-icon">🌍</span>
        <h1 className="logo-text">Hoverse</h1>
      </div>

      <nav className="nav-menu">
        {user ? (
          <div className="user-info ">
            <span>
              Xin chào, <b>{user.email.split("@")[0]}</b>!
            </span>
            <button className="logout-btn" onClick={handleLogout}>Đăng xuất</button>
          </div>
        ) : (
          <div className="auth-links">
            <Link to="/login">
              <button className="login-btn">Đăng nhập</button>
            </Link>
            <Link to="/register">
              <button className="logout-btn">Đăng ký</button>
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
