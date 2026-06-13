import { useState } from "react";
import "./Auth.css";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../api/axiosClient";

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
      setError("Vui lòng nhập đầy đủ email và mật khẩu");
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
        err.response?.data || "Tài khoản hoặc mật khẩu không chính xác!";
      setError(serverMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h2 className="auth-title">Đăng nhập</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              disabled={loading}
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
              disabled={loading}
              value={formData.password}
              onChange={handleInputChange}
              placeholder="********"
            />
          </div>

          {error && (
            <div
              className="error-text"
              style={{
                marginBottom: "15px",
                textAlign: "center",
                fontSize: "14px",
              }}
            >
              {error}
            </div>
          )}

          <button type="submit" className="btn-submit">
            {loading ? "Đang xác thực..." : "Đăng nhập"}
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
