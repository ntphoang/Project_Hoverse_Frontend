import "./ReviewItem.css";

const ReviewItem = ({ review }) => {
  const avatarUrlDefault = "https://www.svgrepo.com/show/452030/avatar-default.svg";

  return (
    <div className="review-item">
      {/* Nửa trên: Thông tin người dùng */}
      <div className="review-top">
        <img
          src={review.avatarUrl || avatarUrlDefault}
          alt={review.username}
          className="img-avatar"
        />
        <div className="review-meta">
          <h4 className="reviewer-name">{review.username}</h4>
          <p className="review-date">
            Đánh giá vào {new Date(review.updatedAt).toLocaleDateString("vi-VN")}
          </p>
        </div>
      </div>

      {/* Nửa dưới: Nội dung và Điểm số */}
      <div className="review-bottom">
        <div className="review-content">
          <p>{review.content}</p>
        </div>
        <div className="review-rating">
          <h3 className="rating-number">{review.rating}.0</h3>
          <div className="stars">
            {Array.from({ length: review.rating }).map((_, index) => (
              <span key={index} className="star-icon">⭐</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewItem;