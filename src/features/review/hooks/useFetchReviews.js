import { useEffect, useState } from "react";
import reviewService from "../services/reviewService";

const SIZE = 5;

const useFetchReviews = (placeId, refreshTrigger) => {
  const [reviews, setReviews] = useState([]);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchReviews = async () => {
    try {
      setIsLoading(true);
      const response = await reviewService.getReviewsByPlace(placeId, 0, SIZE);
      setReviews(response.content);
      setHasMore(!response.last);
      setPage(0);
    } catch (err) {
      setError("Lỗi khi tải đánh giá: " + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [placeId, refreshTrigger]);

  const handleReadMore = async () => {
    try {
      const nextPage = page + 1;
      setIsLoading(true);
      const response = await reviewService.getReviewsByPlace(
        placeId,
        nextPage,
        size,
      );
      setReviews((prev) => [...prev, ...response.content]);
      setHasMore(!response.last);
      setPage(nextPage);
    } catch (err) {
      setError("Lỗi khi tải đánh giá: " + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { reviews, isLoading, error, hasMore, handleReadMore };
};

export default useFetchReviews;
