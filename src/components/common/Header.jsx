import styles from "./Header.module.css";
import { useAuth } from "@/features/auth";
import { Link, useNavigate, NavLink } from "react-router-dom";

export default function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className={styles.modernHeader}>
      <div className={styles.headerContainer}>
        <Link to="/" className={styles.logoContainer}>
          <h1 className={styles.logoText}>Hoverse</h1>
        </Link>

        <ul className={styles.navLinks}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? `${styles.linkItem} ${styles.active}`
                  : styles.linkItem
              }
              end
            >
              Trang chủ
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/favorites"
              className={({ isActive }) =>
                isActive
                  ? `${styles.linkItem} ${styles.active}`
                  : styles.linkItem
              }
            >
              Yêu thích
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive
                  ? `${styles.linkItem} ${styles.active}`
                  : styles.linkItem
              }
            >
              Giới thiệu
            </NavLink>
          </li>
        </ul>

        <nav className={styles.navMenu}>
          {user ? (
            <div className={styles.userInfo}>
              <Link to="/users/me" className={styles.profileLink}>
                <div className={styles.userAvatar}>
                  {user.email.charAt(0).toUpperCase()}
                </div>
                <span className={styles.userGreeting}>
                  Xin chào, <b>{user.email.split("@")[0]}</b>!
                </span>
              </Link>

              <button className={styles.btnLogout} onClick={handleLogout}>
                Đăng xuất
              </button>
            </div>
          ) : (
            <div className={styles.authLinks}>
              <Link to="/login" className={styles.btnLogin}>
                Đăng nhập
              </Link>
              <Link to="/register" className={styles.btnRegister}>
                Đăng ký
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
