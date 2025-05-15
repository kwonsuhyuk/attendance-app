import { create } from "zustand";
import { Step } from "react-joyride";

interface TourStoreState {
  steps: Step[];
  setSteps: (steps: Step[]) => void;
  clearSteps: () => void;
}

// 특정 페이지 투어 step 실행 여부 관리
export const useTourStore = create<TourStoreState>(set => ({
  steps: [],
  setSteps: (steps: Step[]) => set({ steps }),
  clearSteps: () => set({ steps: [] }),
}));
