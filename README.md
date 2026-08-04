# 1. Tech Stack
- Database: MariaDB
- Backend: Java Spring Boot
- Frontend: ReactJS, TailwindCSS
- Infrastructure/3rd Party:
    + Cloudinary (Image Storage)
    + Nominatim API (Geocoding)
    + JWT (Authentication)

# 2. Folder structure:
```
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

# 3. Tech conventions
## 3.1 State Management Convention
| Kịch bản (IF) | Giải pháp (THEN) | Ví dụ thực tế trong Hoverse |
| --- | --- | --- |
| State dùng chung toàn cục (Global), **cập nhật liên tục / phức tạp**. | Dùng **Zustand** | Giỏ hàng, Bookmark, Notification. |
| State dùng chung, **ít thay đổi**, chỉ mang tính chất Read-only. | Dùng **Context API** | Theme (Dark/Light), Multi-language. |
| State cục bộ, chỉ dùng trong 1 Component hoặc truyền 1 cấp xuống con. | Dùng `useState` / `useReducer` | Form input, Đóng/mở Modal, Toggle UI. |

## 2. Custom Hook Convention

* **Bắt buộc tách hook khi:** Logic lặp lại >= 2 lần ở các module khác nhau.
* **Khuyến khích tách hook khi:** Component dài > 150 dòng. Tách toàn bộ API call và logic xử lý data ra. Component chỉ giữ lại UI.
