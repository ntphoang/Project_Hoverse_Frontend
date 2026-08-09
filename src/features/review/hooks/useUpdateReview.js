import { useState } from "react";
import { toast } from "react-toastify";
import reviewService from "../services/reviewService";

const useUpdateReview = () => {
  const [isLoading, setIsLoading] = useState(false);

  const updateReview = async (data, files, reviewId) => {
    try {
      setIsLoading(true);

      const formData = new FormData();
      const jsonBlob = new Blob([JSON.stringify(data)], {
        type: "application/json",
      });
      formData.append("review", jsonBlob);
      if (files && files.length > 0) {
        files.forEach((file) => formData.append("files", file));
      }

      const response = await reviewService.updateReview(formData, reviewId);
      return response;
    } catch (error) {
      const errorMsg =
        error.response?.data?.message || "Có lỗi xảy ra khi cập nhật đánh giá!";
      toast.error(errorMsg);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, updateReview };
};

export default useUpdateReview;
