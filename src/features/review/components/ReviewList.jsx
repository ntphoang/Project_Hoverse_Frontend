import { useEffect, useState } from "react";
import reviewService from "../services/reviewService";
import ReviewItem from "./ReviewItem";
import "./ReviewList.css";

const ReviewList = ({ placeId }) => {
  const [reviews, setReviews] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const size = 5;

  useEffect(() => {
    const fetchInitReview = async () => {
      try {
        setLoading(true);
        const response = await reviewService.getReviewsByPlace(
          placeId,
          0,
          size,
        );
        setReviews(response.content);
        setHasMore(!response.last);
        setPage(0);
      } catch (error) {
        console.error("Lỗi khi tải đánh giá: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchInitReview();
  }, [placeId]);

  const handleReadMore = async () => {
    try {
      const nextPage = page + 1;
      setLoading(true);
      const response = await reviewService.getReviewsByPlace(
        placeId,
        nextPage,
        size,
      );
      setReviews((prev) => [...prev, ...response.content]);
      setHasMore(!response.last);
      setPage(nextPage);
    } catch (error) {
      console.error("Lỗi khi tải đánh giá: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (reviews.length <= 0) return <p>Chưa có đánh giá nào!</p>;

  console.log(reviews);

  return (
    <div className="review-list-container">
      {reviews.map((review) => {
        return <ReviewItem key={review.id} review={review}></ReviewItem>;
      })}

      {hasMore && (
        <button
          onClick={handleReadMore}
          disabled={loading}
          className="btn-load-more"
        >
          {loading ? "Đang tải đánh giá..." : "Xem thêm đánh giá"}
        </button>
      )}
    </div>
  );
};

export default ReviewList;
