import { useState } from "react";
import axiosClient from "../../../api/axiosClient";
import "./Profile.css";

export default function Profile() {
  const [data, setData] = useState("");
  const [error, setError] = useState("");

  const fetchSecretData = async () => {
    try {
      setError("");
      const response = await axiosClient.get("/users/profile");
      setData(response);
    } catch (err) {
      setError("Bị chặn! Bạn không có quyền truy cập hoặc thẻ đã hết hạn.");
    }
  };

  return (
    <div className="page-profile">
      <div className="profile-card">
        <div className="profile-header">
          <span className="profile-icon">🔐</span>
          <h2 className="profile-title">Khu vực cá nhân</h2>
        </div>

        <button className="btn-fetch" onClick={fetchSecretData}>
          Gọi API tuyệt mật
        </button>

        {data && <div className="message-secret">{data}</div>}
        {error && <div className="message-error">{error}</div>}
      </div>
    </div>
  );
}
