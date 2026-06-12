import { useState } from "react";
import "./Auth.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (error) setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError("Vui lòng nhập đầy đủ email và mật khẩu");
      return;
    }
    console.log("Dữ liệu đăng nhập: ", formData);
    alert("Dữ liệu hợp lệ!");
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h2 className="auth-title">Đăng nhập</h2>

        <form onSubmit={handleSubmit}>
          {error && <div className="error-text"></div>}

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="abc@domain.com"
            />
          </div>

          <div className="form-group">
            <label>Mật khẩu</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="********"
            />
          </div>

          <button type="submit" className="btn-submit">
            Đăng nhập
          </button>
        </form>

        <div className="auth-switch">
          Chưa có tài khoản? <a href="/register">Tạo tài khoản mới</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
