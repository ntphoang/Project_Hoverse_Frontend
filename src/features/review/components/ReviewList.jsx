import ReviewItem from "./ReviewItem";
import "./ReviewList.css";
import useFetchReviews from "../hooks/useFetchReviews";

const ReviewList = ({ placeId,refreshTrigger }) => {
  const { reviews, isLoading, error, hasMore, handleReadMore } =
    useFetchReviews(placeId,refreshTrigger);

  if (reviews.length <= 0) return <p>Chưa có đánh giá nào!</p>;

  return (
    <div className="review-list-container">
      {reviews?.map((review) => {
        return <ReviewItem key={review.id} review={review}></ReviewItem>;
      })}

      {hasMore && (
        <button
          onClick={handleReadMore}
          disabled={isLoading}
          className="btn-load-more"
        >
          {isLoading ? "Đang tải đánh giá..." : "Xem thêm đánh giá"}
        </button>
      )}
    </div>
  );
};

export default ReviewList;
