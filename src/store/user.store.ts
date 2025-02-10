import { UserData } from "@/model";
import { create } from "zustand";

interface IUserState {
  currentUser: UserData | null;
  isLoading: boolean;
  userType: string | null;
  setUser: (user: UserData) => void;
  clearUser: () => void;
}

export const useUserStore = create<IUserState>((set, get) => ({
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
