import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";
import placeService from "./services/placeService";
import Header from "./components/layout/Header";
import Layout from "./components/layout/Layout";
import AddPlaceModal from "./components/place/AddPlaceModal";

function App() {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  useEffect(() => {
    fetchPlaces();
  }, []);

  if (loading) return <h2>Đang tải dữ liệu từ Server...</h2>;
  return (
    <Layout>
      <h1 className="page-title">Khám phá Hoverse</h1>

      <div className="places-grid">
        {places.map((place) => (
          <div key={place.id} className="place-card">
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
      <button className="add-button" onClick={() => setIsModalOpen(true)}>
        Thêm quán mới
      </button>
      <AddPlaceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onPlaceAdded={fetchPlaces}
      ></AddPlaceModal>
    </Layout>
  );
}

export default App;
