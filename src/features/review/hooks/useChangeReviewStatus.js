import { useMutation, useQueryClient } from "@tanstack/react-query";
import reviewService from "../services/reviewService";

const useChangeReviewStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({reviewId, formData}) => {
      return reviewService.changeReviewStatus(reviewId, formData);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-reviews"] });
    },
  });
};

export default useChangeReviewStatus;
