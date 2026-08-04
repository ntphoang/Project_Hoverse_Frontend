import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const useAuthStore = create(
  // persist giúp từ động lưu xuống localstorage
  persist(
    (set) => ({
      // States
      user: null,
      token: null,

      // Actions
      login: (userData) => {
        set({
          user: {
            email: userData.email,
            role: userData.role,
            isEmailVerified: userData.emailVerified,
          },
          token: userData.token,
        });
      },

      logout: () => {
        set({ user: null, token: null });
      },
    }),
    {
      name: "hoverse-auth",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useAuthStore;
