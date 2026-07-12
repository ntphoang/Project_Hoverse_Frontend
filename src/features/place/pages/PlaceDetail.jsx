import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./PlaceDetail.css";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import AddReviewModal from "@/features/review/components/AddReviewModal";
import ReviewList from "@/features/review/components/ReviewList";
import placeService from "@/services/placeService";
import reviewService from "@/features/review/services/reviewService";

const PlaceDetail = () => {
  const [place, setPlace] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { placeId } = useParams();

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        setLoading(true);
        setError("");
        const placeResponse = await placeService.getPlaceDetail(placeId);
        setPlace(placeResponse);
      } catch (err) {
        setError(err.response?.data?.message || "Đã xảy ra lỗi");
      } finally {
        setLoading(false);
      }
    };

    fetchPlace();
  }, [placeId]);

  const handleCreateReview = async ({ rating, content }) => {
    try {
      setIsSubmitting(true);

      const reviewData = { rating, content };
      const reviewSaved = await reviewService.createReview(placeId, reviewData);

      setIsModalOpen(false);

      setPlace((prev) => ({ ...prev, reviewCount: prev.reviewCount + 1 }));
    } catch (error) {
      console.error("Lỗi khi thêm đánh giá", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading)
    return (
      <div className="pd-container">
        <h2 style={{ color: "var(--text-primary)" }}>Đang tải dữ liệu...</h2>
      </div>
    );
  if (error)
    return (
      <div className="pd-container">
        <h2 style={{ color: "var(--danger-color)" }}>{error}</h2>
      </div>
    );

  return (
    <div>
      <Header></Header>
      <div className="pd-container">
        {/* KHỐI 1: HERO COVER */}
        <div className="pd-hero">
          <img
            src={
              place.coverImageUrl ||
              "https://images.unsplash.com/photo-1554118811-1e0d58224f24"
            }
            alt={place.title}
            className="pd-cover-image"
          />
          <div className="pd-hero-overlay">
            <span className="pd-badge">{place.categoryName || "Khám phá"}</span>
            <h1 className="pd-title">{place.title}</h1>
          </div>
        </div>

        {/* KHỐI 2: MAIN GRID */}
        <div className="pd-content-grid">
          {/* CỘT TRÁI */}
          <div className="pd-main-info">
            <h2 className="pd-section-title">Giới thiệu</h2>
            <p className="pd-description">
              {place.description || "Chưa có mô tả cho địa điểm này."}
            </p>

            <h2 className="pd-section-title" style={{ marginTop: "30px" }}>
              Đánh giá từ cộng đồng
            </h2>
            <div className="pd-description">
              <ReviewList placeId={place.id}></ReviewList>
            </div>
          </div>

          {/* CỘT PHẢI (STICKY) */}
          <div className="pd-sidebar">
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
      <Footer></Footer>

      <AddReviewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateReview}
        isSubmitting={isSubmitting}
      ></AddReviewModal>
    </div>
  );
};

export default PlaceDetail;
