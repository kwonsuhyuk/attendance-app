import { TUserData } from "@/model";
import { create } from "zustand";

interface IUserState {
  currentUser: TUserData | null;
  isLoading: boolean;
  userType: string | null;
  setUser: (user: TUserData) => void;
  clearUser: () => void;
}

export const useUserStore = create<IUserState>(set => ({
  currentUser: null,
  isLoading: true,
  userType: null,

  setUser: user => {
    set({ currentUser: user, isLoading: false, userType: user?.userType });
  },
  clearUser: () => {
    set({ currentUser: null, userType: null, isLoading: false });
  },
}));
