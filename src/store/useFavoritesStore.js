import { placeService } from "@/features/place";
import { create } from "zustand";

const useFavoritesStore = create((set, get) => ({
  favoriteIds: [],

  setFavoriteIds: (idList) => {
    set({ favoriteIds: idList });
  },

  toggleFavorite: async (placeId) => {
    const currentFavorites = get().favoriteIds;
    const isSaved = currentFavorites.includes(placeId);

    // Lưu trên FE
    if (isSaved) {
      set({ favoriteIds: currentFavorites.filter((id) => id !== placeId) });
    } else {
      set({ favoriteIds: [...currentFavorites, placeId] });
    }

    // Lưu dưới BE
    try {
      await placeService.toggleFavorite(placeId);
    } catch (error) {
      console.log("Có lỗi xảy ra khi toggle favorite: ", error);
      set({ favoriteIds: currentFavorites }); //rollback
    }
  },
}));

export default useFavoritesStore;
