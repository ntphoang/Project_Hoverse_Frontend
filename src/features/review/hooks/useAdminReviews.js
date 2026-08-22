import { useQuery } from "@tanstack/react-query";
import reviewService from "../services/reviewService";

const useAdminReviews = (conditions, page) => {
  return useQuery({
    queryKey: ["admin-reviews", conditions, page],

    queryFn: async () => {
      return await reviewService.getReviewsByConditions(conditions, page);
    },
  });
};

export default useAdminReviews;
