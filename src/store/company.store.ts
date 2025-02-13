import { TCompanyInfo } from "@/model";
import { create } from "zustand";

interface ICompanyState {
  currentCompany: TCompanyInfo | null;
  isLoading: boolean;
  setCompany: (company: TCompanyInfo) => void;
  clearCompany: () => void;
}

export const useCompanyStore = create<ICompanyState>(set => ({
  currentCompany: null,
  isLoading: true,

  setCompany: company => {
    set({ currentCompany: company, isLoading: false });
  },
  clearCompany: () => {
    set({ currentCompany: null });
  },
}));
