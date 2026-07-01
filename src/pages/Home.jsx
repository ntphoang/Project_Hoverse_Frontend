import { useState, useEffect } from "react";
import placeService from "../services/placeService";
import Layout from "../components/layout/Layout";
import AddPlaceModal from "../components/place/AddPlaceModal";
import PlaceItem from "../components/place/PlaceItem";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const [places, setPlaces] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [title, setTitle] = useState("");
  const [minRating, setMinRating] = useState("");

  const size = 8;

  const navigate = useNavigate();

  const quickCategories = [
    { name: "Cà phê", icon: "☕" },
    { name: "Trà sữa", icon: "🧋" },
    { name: "Quán ăn", icon: "🍜" },
    { name: "Vỉa hè", icon: "🛵" },
    { name: "Chụp ảnh", icon: "📸" },
    { name: "Chill đêm", icon: "🌃" },
  ];

  const fetchPlaces = async (currentPage) => {
    try {
      setLoading(true);
      const response = await placeService.getPlaceByConditions(
        title,
        minRating,
        currentPage,
        size,
      );
      if (currentPage === 0) {
        setPlaces(response.content);
      } else {
        setPlaces((prev) => [...prev, ...response.content]);
      }
      setHasMore(!response.last);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlaces(0);
  }, []);

  const handleSearch = () => {
    setPage(0);
    fetchPlaces(0);
  };

  const handleReadMore = () => {
    const nextPage = page + 1;
    fetchPlaces(nextPage);
    setPage((page) => page + 1);
  };

  return (
    <Layout>
      <div className="app-container">
        {/* HEADER & NÚT THÊM QUÁN */}
        <div className="hero-section">
          <h1 className="hero-title">Khám phá thế giới quanh bạn</h1>
          <p className="hero-subtitle">
            Tìm kiếm hàng ngàn quán cà phê, trà sữa và địa điểm vui chơi lý
            tưởng.
          </p>

          <button
            className="add-button hero-add-btn"
            onClick={() => setIsModalOpen(true)}
          >
            + Thêm địa điểm mới
          </button>
        </div>

        {/* LỌC NHANH */}
        <div className="category-scroll-container">
          {quickCategories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => setTitle(cat.name)}
              className={`category-card ${title === cat.name ? "active" : ""}`}
            >
              <span className="category-icon">{cat.icon}</span>
              <span className="category-name">{cat.name}</span>
            </button>
          ))}
        </div>

        {/* THANH TÌM KIẾM & LỌC */}
        <div className="search-filter-panel">
          <input
            type="text"
            className="search-input"
            placeholder="Nhập địa điểm cần tìm..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <select
            className="search-select"
            name="rating"
            onChange={(e) => setMinRating(e.target.value)}
            value={minRating}
          >
            <option value="">Tất cả đánh giá</option>
            <option value="4">Từ 4⭐ trở lên</option>
            <option value="3">Từ 3⭐ trở lên</option>
            <option value="2">Từ 2⭐ trở lên</option>
            <option value="1">Từ 1⭐ trở lên</option>
          </select>
          <button
            className="btn-search"
            onClick={handleSearch}
            disabled={loading}
          >
            {loading ? "Đang tìm..." : "🔍 Tìm kiếm"}
          </button>
        </div>

        {/* DANH SÁCH QUÁN VÀ TRẠNG THÁI TRỐNG */}
        {places.length === 0 && !loading ? (
          <div className="empty-state">
            <p>Không tìm thấy địa điểm nào phù hợp với yêu cầu của bạn 😢</p>
          </div>
        ) : (
          <div className="places-grid">
            {places.map((place) => (
              <PlaceItem
                key={place.id}
                place={place}
                onClick={() => navigate(`/places/${place.id}`)}
              />
            ))}
          </div>
        )}

        {/* NÚT XEM THÊM */}
        {hasMore && places.length > 0 && (
          <button
            className="btn-load-more"
            onClick={handleReadMore}
            disabled={loading}
          >
            {loading ? "Đang tải thêm dữ liệu..." : "Xem thêm địa điểm"}
          </button>
        )}

        <AddPlaceModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onPlaceAdded={() => {
            setPage(0);
            fetchPlaces(0);
          }}
        />
      </div>
    </Layout>
  );
};

export default Home;
