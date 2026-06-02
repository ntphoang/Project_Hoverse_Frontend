import "./Header.css";

export default function Header() {
  return (
    <header className="app-header">
      <div className="logo-container">
        <span className="logo-icon">🌍</span>
        <h1 className="logo-text">Hoverse</h1>
      </div>

      <nav className="nav-menu">
        <a href="/" className="nav-link active">
          Khám phá
        </a>
        <a href="/saved" className="nav-link">
          Đã lưu
        </a>
        <button className="login-btn">Đăng nhập</button>
      </nav>
    </header>
  );
}
