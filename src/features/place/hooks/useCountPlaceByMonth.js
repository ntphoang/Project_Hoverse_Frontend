import { useQuery } from "@tanstack/react-query";
import placeService from "../services/placeService";

const useCountPlaceByMonth = (year) => {
  return useQuery({
    queryKey: ["count-places", year],

    queryFn: async () => {
      return await placeService.countPlaceGroupByMonth(year);
    },
  });
};

export default useCountPlaceByMonth;
