import { useEffect } from "react";
import placeFavoriteService from "../services/placeFavoriteService";
import { useFavoritesStore } from "@/store";

const useFetchFavorites = () => {
  const setFavoriteIds = useFavoritesStore(state=>state.setFavoriteIds);

  const fetchFavorites = async () => {
    try {
      const response = await placeFavoriteService.getPlaceFavorite();
      setFavoriteIds(response);
    } catch (error) {
      console.log("Có lỗi xảy ra khi load favorites: ", error);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);
};

export default useFetchFavorites;
