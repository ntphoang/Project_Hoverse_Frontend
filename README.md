# 🌍 Hoverse - AI-Powered Venue Discovery Platform

> Một nền tảng Crowdsourcing kết hợp AI Recommendation, giúp người dùng khám phá và chia sẻ các địa điểm vui chơi, đặc biệt là các "quán vỉa hè" không tồn tại trên Google Maps.

[![ReactJS](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)]()
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)]()
[![Spring Boot](https://img.shields.io/badge/Spring_Boot-F2F4F9?style=for-the-badge&logo=spring-boot)]()
[![MariaDB](https://img.shields.io/badge/MariaDB-003545?style=for-the-badge&logo=mariadb&logoColor=white)]()
[![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)]()

## 💡 The "Why" - Bài toán thực tế

Trên thực tế, có rất nhiều quán ăn vỉa hè, điểm vui chơi local cực kỳ thú vị nhưng lại **không xuất hiện trên Google Maps**. Hoverse ra đời để giải quyết lỗ hổng này bằng cách:

- Cung cấp nền tảng để cộng đồng tự do đóng góp (Crowdsourcing) các địa điểm ẩn.
- Tích hợp **AI Recommendation** để phân tích và đề xuất địa điểm cá nhân hóa dựa trên tiêu chí: mức giá, khoảng cách, và thói quen của người dùng.

## 🏗️ System Architecture

Dự án áp dụng kiến trúc **N-Layer**, phân tách hoàn toàn Frontend và Backend thành 2 repositories độc lập để tối ưu hóa việc mở rộng (scale) và bảo trì:

- **Frontend Repository:** [Project_Hoverse_Frontend](https://github.com/ntphoang/Project_Hoverse_Frontend)
- **Backend Repository:** [Project_Hoverse_Backend](https://github.com/ntphoang/Project_Hoverse_Backend)

## ✨ Core Features (Đã hoàn thiện)

<details>
  <summary><b>1. Secure Authentication với JWT</b> (Click để xem chi tiết)</summary>
  
  - **Vấn đề:** Đảm bảo an toàn cho API và phân quyền người dùng (User/Admin).
  - **Giải pháp:** Triển khai luồng xác thực Stateless sử dụng JSON Web Token (JWT). Tách biệt Access Token và Refresh Token để tối ưu bảo mật.
</details>

<details>
  <summary><b>2. Tối ưu lưu trữ Media với Cloudinary</b> (Click để xem chi tiết)</summary>
  
  - **Vấn đề:** Quán vỉa hè cần nhiều hình ảnh thực tế, lưu trữ ảnh trực tiếp trên server sẽ gây phình to database và giảm hiệu suất.
  - **Giải pháp:** Tích hợp Cloudinary API để xử lý upload, tự động resize và tối ưu hóa ảnh trước khi lưu trữ, chỉ lưu chuỗi URL vào MariaDB.
</details>

## 🚀 Upcoming Features (Roadmap)

Dự án vẫn đang trong quá trình phát triển tích cực. Các tính năng nâng cao đang được xây dựng:

- [ ] **AI-Powered Recommendation:** Tích hợp mô hình học máy để phân tích thói quen và gợi ý địa điểm cá nhân hóa.
- [ ] **Geo-spatial Search:** Tìm kiếm địa điểm vui chơi theo bán kính dựa trên GPS thời gian thực của người dùng.

## 📂 Folder Structure

```text
📦 Backend (Spring Boot)
 ┣ 📂 controller  # API Endpoints (Request/Response routing)
 ┣ 📂 service     # Business Logic (Interface & Impl)
 ┣ 📂 repository  # Data Access Layer
 ┣ 📂 entity      # Database Models
 ┣ 📂 dto         # Data Transfer Objects
 ┗ 📂 utils/enum  # Helpers & Constants

📦 Frontend (ReactJS)
 ┣ 📂 features    # Module theo nghiệp vụ (Core: components, pages, hooks, services)
 ┣ 📂 components  # Global UI Components
 ┣ 📂 store       # Global State (Zustand)
 ┣ 📂 api         # Axios Client Config
 ┗ 📂 layouts/pages/utils
```

## 👨‍💻 Author

**Nguyễn Trần Phi Hoàng**

- 🎓 Sinh viên Kỹ thuật phần mềm (Software Engineering) — IUH
- 📧 **Email:** ntphoang205@gmail.com
- 💼 **LinkedIn:**
