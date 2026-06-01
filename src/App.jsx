import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";
import placeService from "./services/placeService";

function App() {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const data = await placeService.getAllPlaces();
        setPlaces(data);
      } catch (error) {
        console.log("Loi khi lay data: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaces();
  }, []);

  if (loading) return <h2>Đang tải dữ liệu từ Server...</h2>;
  return (
    <div>
      <h1>Hoverse - Khám phá địa điểm</h1>
      {/* DANH SÁCH CÁC ĐỊA ĐIỂM */}
      <div>
        {places.map((place) => (
          <div key={place.id}>
            <h3>{place.title}</h3>
            <p>
              <strong>Địa chỉ: </strong>
              {place.address}
            </p>
            <p>
              <strong>Mô tả: </strong>
              {place.description}
            </p>
            <p>
              <strong>Danh mục: </strong>
              {place.categoryName}
            </p>
            <p>
              <strong>Đăng bởi: </strong>
              {place.authorName}
            </p>
          </div>
        ))}
      </div>

      {/* NƠI THÊM QUÁN MỚI */}
      <button>Thêm quán mới</button>
    </div>
  );
}

export default App;
