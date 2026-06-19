import { useState, useEffect } from "react";
import placeService from "../services/placeService";
import Layout from "../components/layout/Layout";
import AddPlaceModal from "../components/place/AddPlaceModal";
import PlaceItem from "../components/place/PlaceItem";

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
          <PlaceItem
            className="place-card"
            key={place.id}
            place={place}
          ></PlaceItem>
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
