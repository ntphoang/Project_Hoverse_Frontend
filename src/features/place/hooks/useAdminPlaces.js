import { useQuery } from "@tanstack/react-query";
import placeService from "../services/placeService";

const useAdminPlaces = ({ tab, page }) => {
  return useQuery({
    queryKey: ["admin-places", tab, page],

    queryFn: async () => {
      const response = placeService.getPlaceByConditions(
        page,
        { status: tab.toUpperCase() },
        10,
      );
      return response;
    },
  });
};

export default useAdminPlaces;
