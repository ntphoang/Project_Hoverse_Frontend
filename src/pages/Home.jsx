import { useState, useEffect } from "react";
import placeService from "../services/placeService";
import Layout from "../components/layout/Layout";
import AddPlaceModal from "../components/place/AddPlaceModal";

const Home = () => {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchPlaces = async () => {
    try {
      const data = await placeService.getAllPlaces();
      setPlaces(data);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlaces();
  }, []);

  if (loading)
    return <h2 className="page-title">Đang tải dữ liệu từ Server...</h2>;

  return (
    <Layout>
      <h1 className="page-title">🌍 Khám phá Hoverse</h1>

      <div className="places-grid">
        {places.map((place) => (
          <div key={place.id} className="place-card">
            <h3 className="place-title">{place.title}</h3>
            <p>
              📍 <strong>Địa chỉ:</strong> {place.address}
            </p>
            <p>
              📝 <strong>Mô tả:</strong> {place.description}
            </p>
            <p>
              🏷️ <span className="category-badge">{place.categoryName}</span>
            </p>
          </div>
        ))}
      </div>

      <button className="add-button" onClick={() => setIsModalOpen(true)}>
        + Thêm quán mới
      </button>

      <AddPlaceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onPlaceAdded={fetchPlaces}
      />
    </Layout>
  );
};

export default Home;
