import { create } from "zustand";

interface IUserState {
  currentUser: any | null;
  isLoading: boolean;
  userType: string | null;
  setUser: (user: any) => void;
  clearUser: () => void;
  setUserType: (type: string) => void;
}

export const useUserStore = create<IUserState>(set => ({
  currentUser: null,
  isLoading: true,
  userType: null,

  setUser: user => set({ currentUser: user, isLoading: false }),
  clearUser: () => set({ currentUser: null, userType: null, isLoading: false }),
  setUserType: type => set({ userType: type }),
}));
