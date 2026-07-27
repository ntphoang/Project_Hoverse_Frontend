import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./PlaceDetail.css";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { AddReviewModal, ReviewList, useReviewCreate } from "@/features/review";
import { useAuth } from "@/features/auth";
import MapPicker from "../components/MapPicker";
import usePlaceDetail from "../hooks/usePlaceDetail";

const PlaceDetail = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const { placeId } = useParams();
  const { user } = useAuth();

  const { place, isLoading, error: placeDetailError } = usePlaceDetail(placeId);
  const {
    isSubmitting,
    error: reviewCreateError,
    submitReview,
  } = useReviewCreate();

  const handleCreateReview = async ({ rating, content, files }) => {
    try {
      await submitReview(placeId, { rating, content }, files);
      setIsModalOpen(false);
      setRefreshTrigger((prev) => prev + 1);
      alert("Cảm ơn đánh giá của bạn!");
    } catch (err) {
      alert("Có lỗi xảy ra khi thêm review: " + err);
    }
  };

  if (isLoading)
    return (
      <div className="pd-container pd-center-msg">
        <h2 style={{ color: "var(--text-primary)" }}>Đang tải dữ liệu...</h2>
      </div>
    );

  if (placeDetailError)
    return (
      <div className="pd-container pd-center-msg">
        <h2 style={{ color: "var(--danger-color)" }}>{placeDetailError}</h2>
      </div>
    );

  if (reviewCreateError) {
    console.log("Thêm review thất bại: " + reviewCreateError);
  }

  const isAuthor = user?.email === place.authorEmail || user?.role === "ADMIN";

  return (
    <div>
      <Header />
      <div className="pd-container">
        <div className="pd-hero">
          <img
            src={
              place.coverImageUrl ||
              "https://images.unsplash.com/photo-1554118811-1e0d58224f24"
            }
            alt={place.title}
            className="pd-cover-image"
          />

          {isAuthor && (
            <Link
              to={`/edit-place/${placeId}`}
              className="pd-btn-edit-floating"
            >
              ✏️ Chỉnh sửa
            </Link>
          )}

          <div className="pd-hero-overlay">
            <span className="pd-badge">{place.categoryName || "Khám phá"}</span>
            <h1 className="pd-title">{place.title}</h1>
          </div>
        </div>

        <div className="pd-content-grid">
          <div className="pd-main-info">
            <div className="pd-author-card">
              Đăng bởi: <strong>{place.authorName || "Người ẩn danh"}</strong>
            </div>

            <h2 className="pd-section-title">Giới thiệu</h2>
            <p className="pd-description">
              {place.description || "Chưa có mô tả cho địa điểm này."}
            </p>

            {place.placeMediaList && place.placeMediaList.length > 0 && (
              <>
                <h2 className="pd-section-title">Hình ảnh nổi bật</h2>
                <div className="pd-gallery-grid">
                  {place.placeMediaList.map((media) => (
                    <img
                      key={media.id}
                      src={media.url}
                      alt="Gallery"
                      className="pd-gallery-img"
                    />
                  ))}
                </div>
              </>
            )}
            {place.tag && place.tag.length > 0 && (
              <>
                <h2 className="pd-section-title">Tiện ích</h2>
                <div className="pd-tags-wrapper">
                  {place.tags?.map((tag) => (
                    <span key={tag.id} className="pd-tag-item">
                      {tag.name}
                    </span>
                  ))}
                </div>
              </>
            )}

            <h2 className="pd-section-title" style={{ marginTop: "40px" }}>
              Đánh giá từ cộng đồng ({place.reviewCount})
            </h2>
            <ReviewList placeId={place.id} refreshTrigger={refreshTrigger} />
          </div>

          <div className="pd-sidebar">
            <div className="pd-info-row">
              <MapPicker
                latitude={place.latitude}
                longitude={place.longitude}
              ></MapPicker>
            </div>

            <div className="pd-info-row">
              <span>📍</span>
              <span>{place.address}</span>
            </div>

            <div className="pd-info-row">
              <span>⭐</span>
              <span>
                {place.avgRating
                  ? `${place.avgRating} / 5.0`
                  : "Chưa có đánh giá"}
              </span>
            </div>

            <button
              className="pd-action-btn pd-btn-primary"
              onClick={() => setIsModalOpen(true)}
            >
              ✍️ Viết đánh giá
            </button>
            <button className="pd-action-btn pd-btn-secondary">
              ❤️ Lưu địa điểm
            </button>
          </div>
        </div>
      </div>
      <Footer />

      {isModalOpen && (
        <AddReviewModal
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleCreateReview}
          isSubmitting={isSubmitting}
        />
      )}
    </div>
  );
};

export default PlaceDetail;
