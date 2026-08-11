import { placeService } from "@/features/place";
import { useInfiniteQuery } from "@tanstack/react-query";

const PAGE_SIZE = 9;

const usePlacesInfinite = (appliedFilter) => {
  return useInfiniteQuery({
    queryKey: ["places", "infinite", appliedFilter ],

    queryFn: async ({pageParam = 0}) => {
      const response = await placeService.getPlaceByConditions(
        pageParam,
        appliedFilter,
        PAGE_SIZE,
      );
      return response;
    },

    getNextPageParam: (lastPage, allPages)=>{
      if(!lastPage.last) return allPages.length;
      return undefined;
    },

    staleTime: 5 * 60 * 1000,
  });
};

export default usePlacesInfinite;
