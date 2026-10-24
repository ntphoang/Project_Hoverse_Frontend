import { useQuery } from "@tanstack/react-query";
import placeService from "../services/placeService";

const usePlaceForMap = () => {
  return useQuery({
    queryKey: ["places-map"],

    queryFn: async () => {
      const response = placeService.getPlacesForMap();
      return response;
    },
  });
};

export default usePlaceForMap;
