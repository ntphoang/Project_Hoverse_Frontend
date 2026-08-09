import { toast } from "react-toastify";
import reviewService from "../services/reviewService";
import { useState } from "react";

const useDeleteReview = () => {
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteReview = async (reviewId) => {
    try {
      setIsDeleting(true);
      await reviewService.deleteReview(reviewId);
      toast.success("Đã xóa đánh giá!");
    } catch (error) {
      const errorMsg =
        error.response?.data?.message || "Có lỗi xảy ra khi xóa đánh giá!";
      toast.error(errorMsg);
    } finally {
      setIsDeleting(false);
    }
  };

  return { deleteReview, isDeleting };
};

export default useDeleteReview;
