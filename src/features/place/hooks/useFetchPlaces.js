import { useState, useEffect } from "react";
import { placeService } from "@/features/place";

const PAGE_SIZE = 9;

const useFetchPlaces = (appliedFilter) => {
  const [places, setPlaces] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPlaces = async () => {
    try {
      setIsLoading(true);
      const response = await placeService.getPlaceByConditions(
        page,
        appliedFilter,
        PAGE_SIZE,
      );
      if (page === 0) {
        setPlaces(response.content);
      } else {
        setPlaces((prev) => [...prev, ...response.content]);
      }
      setHasMore(!response.last);
    } catch (error) {
      console.log("Có lỗi khi lấy danh sách địa điểm: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setPage(0);
  }, [appliedFilter]);

  useEffect(() => {
    fetchPlaces();
  }, [page, appliedFilter]);

  const handleReadMore = () => {
    setPage((prev) => prev + 1);
  };

  const handlePlaceAdded = (newPlace) => {
    setPlaces((prev) => [newPlace, ...prev]);
  };

  return {
    places,
    isLoading,
    hasMore,
    handleReadMore,
    handlePlaceAdded,
  };
};

export default useFetchPlaces;
