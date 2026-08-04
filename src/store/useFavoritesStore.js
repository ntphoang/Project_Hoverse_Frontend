import { placeService } from "@/features/place";
import { create } from "zustand";

const useFavoritesStore = create((set, get) => ({
  // State
  favoriteIds: [],
  favorites: [],

  //Actions
  setFavoriteIds: (idList) => {
    set({ favoriteIds: idList });
  },

  setFavorites: (placeList) => {
    set({ favorites: placeList });
  },

  toggleFavorite: async (place) => {
    const currentFavoriteIds = get().favoriteIds;
    const currentFavorites = get().favorites;
    const isSaved = currentFavoriteIds.includes(place.id);

    // Lưu trên FE
    if (isSaved) {
      set({
        favoriteIds: currentFavoriteIds.filter((id) => id !== place.id),
        favorites: currentFavorites.filter(
          (favorite) => favorite.id !== place.id,
        ),
      });
    } else {
      set({
        favoriteIds: [...currentFavoriteIds, place.id],
        favorites: [...currentFavorites, place],
      });
    }

    // Lưu dưới BE
    try {
      await placeService.toggleFavorite(place.id);
    } catch (error) {
      console.log("Có lỗi xảy ra khi toggle favorite: ", error);
      set({ favoriteIds: currentFavoriteIds, favorites: currentFavorites }); //rollback
    }
  },
}));

export default useFavoritesStore;
