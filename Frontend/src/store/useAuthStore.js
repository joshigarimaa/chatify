import { create } from "zustand";

export const useAuthStore = create((set) => ({
  authUser: { name: "Garima", id: 123, age: 21 },
  isLoggedIn: false,
  isLoading: false,

  login: () => {
    console.log("We just logged in");
    set({ isLoggedIn: true, isLoading: false });
  },
}));