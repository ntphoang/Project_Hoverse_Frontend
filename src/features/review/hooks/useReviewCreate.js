import { useState } from "react";
import reviewService from "../services/reviewService";

const useReviewCreate = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const submitReview = async (placeId, reviewData, files) => {
    try {
      setIsSubmitting(true);
      setError(null);
      const formData = new FormData();

      const jsonBlob = new Blob([JSON.stringify(reviewData)], {
        type: "application/json",
      });
      
     formData.append("review", jsonBlob);

      if (files && files.length > 0) {
        files.forEach((file) => {
          formData.append("files", file);
        });
      }

      const response = await reviewService.createReview(placeId, formData);
      return response;
    } catch (error) {
      setError("Có lỗi xảy ra khi lưu review" + error.message);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  return { isSubmitting, error, submitReview };
};

export default useReviewCreate;
