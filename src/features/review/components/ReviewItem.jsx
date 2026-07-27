import "./ReviewItem.css";

const ReviewItem = ({ review }) => {
  const avatarUrlDefault = "https://www.svgrepo.com/show/452030/avatar-default.svg";

  return (
    <div className="review-item">
      {/* Tầng 1: Header (User Info + Rating) */}
      <div className="review-header">
        <div className="review-user">
          <img
            src={review.avatarUrl || avatarUrlDefault}
            alt={review.username}
            className="img-avatar"
          />
          <div className="review-meta">
            <h4 className="reviewer-name">{review.username}</h4>
            <p className="review-date">
              {new Date(review.updatedAt).toLocaleDateString("vi-VN")}
            </p>
          </div>
        </div>
        
        {/* Đưa rating lên góc phải cho sang trọng */}
        <div className="review-rating">
          <div className="stars">
            {/* Render 5 sao, tô màu theo số điểm */}
            {Array.from({ length: 5 }).map((_, index) => (
              <span key={index} className={`star-icon ${index < review.rating ? 'active' : 'inactive'}`}>
                ★
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Tầng 2: Body (Nội dung text) */}
      {review.content && (
        <div className="review-body">
          <p className="review-content">{review.content}</p>
        </div>
      )}

      {/* Tầng 3: Gallery (Ảnh) - Có check null an toàn */}
      {review.reviewMediaList && review.reviewMediaList.length > 0 && (
        <div className="review-gallery">
          {review.reviewMediaList.map((media) => (
            <img 
              key={media.id} 
              src={media.url} 
              alt="Review attachment" 
              className="review-media-img" 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewItem;