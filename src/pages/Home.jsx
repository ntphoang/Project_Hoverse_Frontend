import { useState, useEffect } from "react";
import placeService from "../services/placeService";
import Layout from "../components/layout/Layout";
import AddPlaceModal from "../components/place/AddPlaceModal";
import PlaceItem from "../components/place/PlaceItem";
import { Link, useNavigate } from "react-router-dom";
import categoryService from "../services/categoryService";
import IconDictionary from "../icons/iconDictionary";

const PAGE_SIZE = 8;

const Home = () => {
  const [places, setPlaces] = useState([]);
  const [categories, setCategories] = useState([]);

  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const [draftFilter, setDraftFilter] = useState({
    title: "",
    minRating: "",
  });

  const [appliedFilter, setAppliedFilter] = useState({
    title: "",
    categoryId: null,
    minRating: "",
  });

  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const navigate = useNavigate();

  const fetchCategories = async () => {
    try {
      const response = await categoryService.getAllCategories();
      setCategories([
        { id: null, name: "Tất cả", iconName: "All" },
        ...response,
      ]);
    } catch (error) {
      console.error("Lỗi khi load category: ", error.message);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        setLoading(true);
        const response = await placeService.getPlaceByConditions(
          page,
          appliedFilter,
          PAGE_SIZE,
        );
        if (page === 0) {
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
    fetchPlaces();
  }, [page, appliedFilter, refreshTrigger]);

  const handleSearch = () => {
    setAppliedFilter((prev) => ({
      ...prev,
      title: draftFilter.title,
      minRating: draftFilter.minRating,
    }));
    setPage(0);
  };

  const handleReadMore = () => {
    setPage((prev) => prev + 1);
  };

  const handleSelectCategory = (categoryId) => {
    setAppliedFilter((prev) => ({ ...prev, categoryId }));
    setPage(0);
  };

  const handlePlaceAdded = () => {
    setPage(0);
    setRefreshTrigger((prev) => prev + 1);
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
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleSelectCategory(cat.id)}
              className={`category-card ${appliedFilter.categoryId === cat.id ? "active" : ""}`}
            >
              <IconDictionary
                iconName={cat.iconName}
                className="category-icon"
              ></IconDictionary>
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
            value={draftFilter.title}
            onChange={(e) =>
              setDraftFilter((prev) => ({ ...prev, title: e.target.value }))
            }
            onKeyDown={(e) => {
              if (key.e === "ENTER") handleSearch();
            }}
          />
          <select
            className="search-select"
            name="rating"
            value={draftFilter.minRating}
            onChange={(e) =>
              setDraftFilter((prev) => ({ ...prev, minRating: e.target.value }))
            }
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
          onPlaceAdded={handlePlaceAdded}
        />
      </div>
    </Layout>
  );
};

export default Home;
