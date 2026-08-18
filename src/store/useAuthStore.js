import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const avatarUrlDefault =
  "https://res.cloudinary.com/ty4mmnvd/image/upload/v1785929829/avatar-default_ziyif2.svg";

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
            id: userData.id,
            email: userData.email,
            role: userData.role,
            fullName: userData.fullName,
            avatarUrl: userData.avatarUrl || avatarUrlDefault,
            isEmailVerified: userData.emailVerified,
          },
          token: userData.token,
        });
      },

      logout: () => {
        set({ user: null, token: null });
      },

      setToken: (token) => {
        set({ token });
      },

      update: (userData) => {
        set((state) => ({ user: { ...state.user, ...userData } }));
      },
    }),
    {
      name: "hoverse-auth",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useAuthStore;
