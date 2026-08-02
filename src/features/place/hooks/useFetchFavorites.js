import { useEffect, useState } from "react";
import placeFavoriteService from "../services/placeFavoriteService";
import { useFavoritesStore } from "@/store";

const PAGE_SIZE = 6;

const useFetchFavorites = () => {
  const favorites = useFavoritesStore((state) => state.favorites);
  const setFavorites = useFavoritesStore((state) => state.setFavorites);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(false);

  const fetchFavorites = async (currentPage) => {
    try {
      setIsLoading(true);
      setError(false);
      const response = await placeFavoriteService.getPlaceFavorites(
        currentPage,
        PAGE_SIZE,
      );
      if (currentPage > 0) {
        setFavorites([...favorites, ...response.content]);
      } else {
        setFavorites(response.content);
      }
      setHasMore(!response.last);
    } catch (error) {
      setError("Có lỗi xảy ra khi tải địa điểm yêu thích: " + error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleHasMore = () => {
    setPage((prev) => prev + 1);
  };

  useEffect(() => {
    fetchFavorites(page);
  }, [page]);

  return { favorites, isLoading, error, hasMore, handleHasMore };
};

export default useFetchFavorites;
