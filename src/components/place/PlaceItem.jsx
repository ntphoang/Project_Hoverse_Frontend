import "./PlaceItem.css";
const PlaceItem = ({ place }) => {
  const {
    title,
    address,
    categoryName,
    avgRating,
    reviewCount,
    coverImageUrl,
    authorName,
  } = place;

  const fallbackImage =
    "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=800&auto=format&fit=crop";
  const displayImage = coverImageUrl ? coverImageUrl : fallbackImage;

  return (
    <article className="modern-place-card">
      <div className="card-image-wrapper">
        <img src={displayImage} alt={title} className="card-image" />
        {/* Badge danh mục phong cách Pill (viên thuốc) màu tương phản cao */}
        <div className="card-badge">{categoryName}</div>
      </div>

      <div className="card-content">
        <div className="card-header-info">
          <h3 className="card-title">{title}</h3>
          
          {/* Rating hiển thị tối giản */}
          <div className="card-rating">
            <span className="star">★</span>
            <span className="rating-score">{reviewCount > 0 ? avgRating : "Mới"}</span>
            {reviewCount > 0 && <span className="review-count">({reviewCount})</span>}
          </div>
        </div>

        <p className="card-address">{address}</p>

        <div className="card-footer">
          <div className="card-author">
            <div className="author-avatar">{authorName.charAt(0).toUpperCase()}</div>
            <span className="author-name">Bởi {authorName}</span>
          </div>
        </div>
      </div>
    </article>
  );
};

export default PlaceItem;
