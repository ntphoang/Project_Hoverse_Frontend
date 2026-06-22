import { useState, useEffect } from "react";
import placeService from "../services/placeService";
import Layout from "../components/layout/Layout";
import AddPlaceModal from "../components/place/AddPlaceModal";
import PlaceItem from "../components/place/PlaceItem";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();

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

  if (loading) {
    return (
      <Layout>
        <div className="loading-container">
          <span className="loader-text">Đang tải dữ liệu khám phá...</span>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="app-container">
        <div className="home-header">
          <h1 className="page-title">Khám phá Hoverse 🌍</h1>
        </div>

        <div className="places-grid">
          {places.map((place) => (
            <PlaceItem
              key={place.id}
              place={place}
              onClick={()=>navigate(`/places/${place.id}`)}
            />
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
      </div>
    </Layout>
  );
};

export default Home;
