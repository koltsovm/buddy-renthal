import { create } from "zustand";

interface AuthStore {
  user: any; // TODO: заменить на строгий тип пользователя (исправить позже)
  isAuthenticated: boolean;
  login: (userData: any) => void; // TODO: заменить на строгий тип (исправить позже)
  register: (userData: any) => void; // TODO: заменить на строгий тип (исправить позже)
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isAuthenticated: false,
  login: (userData: any) => {
    set({ user: userData, isAuthenticated: true });
  },
  register: (userData: any) => {
    set({ user: userData, isAuthenticated: true });
  },
  logout: () => {
    set({ user: null, isAuthenticated: false });
  },
}));
