import { useQuery } from "@tanstack/react-query";
import placeService from "../services/placeService";

const usePlacesTopRating = () => {
  return useQuery({
    queryKey: ["places-top-rating"],

    queryFn: async (reviewCount) => {
      return await placeService.getPlacesTopRating(reviewCount);
    },
  });
};

export default usePlacesTopRating;
