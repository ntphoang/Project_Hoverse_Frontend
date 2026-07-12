import { useState } from "react";
import { AddPlaceModal, PlaceItem, usePlaces } from "@/features/place";
import Layout from "@/layouts/Layout";
import { useNavigate } from "react-router-dom";
import IconDictionary from "@/components/ui/IconDictionary";

const Home = () => {
  const {
    places,
    categories,
    draftFilter,
    appliedFilter,
    loading,
    hasMore,
    setDraftFilter,
    handleSearch,
    handleReadMore,
    handleSelectCategory,
    handlePlaceAdded,
  } = usePlaces();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();
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
