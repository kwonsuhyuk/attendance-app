import { TCMUserData, TEmpUserData } from "@/model/types/user.type";
import { create } from "zustand";

interface IUserState {
  currentUser: TEmpUserData | TCMUserData | null;
  isLoading: boolean;
  userType: string | null;
  setUser: (user: TEmpUserData | TCMUserData) => void;
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
