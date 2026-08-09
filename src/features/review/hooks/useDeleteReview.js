import { toast } from "react-toastify";
import reviewService from "../services/reviewService";

const useDeleteReview = () => {
  const deleteReview = async (reviewId) => {
    try {
      await reviewService.deleteReview(reviewId);
      toast.success("Đã xóa đánh giá!");
    } catch (error) {
      const errorMsg =
        error.response?.data?.message || "Có lỗi xảy ra khi xóa đánh giá!";
      toast.error(errorMsg);
    }
  };

  return { deleteReview };
};

export default useDeleteReview;
