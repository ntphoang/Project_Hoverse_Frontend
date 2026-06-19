import { useState } from "react";
import axiosClient from "../api/axiosClient";
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
      <h2>Khu vực cá nhân</h2>
      <button className="btn-fetch" onClick={fetchSecretData}>
        Gọi API tuyệt mật
      </button>

      {data && <div className="message-secret">{data}</div>}
      {error && <div className="message-error">{error}</div>}
    </div>
  );
}
