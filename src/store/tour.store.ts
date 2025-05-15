import { create } from "zustand";
import { Step } from "react-joyride";

interface TourStoreState {
  steps: Step[];
  run: boolean;
  setSteps: (steps: Step[]) => void;
  setRun: (run: boolean) => void;
  clearSteps: () => void;
}

// 특정 페이지 투어 step 실행 여부 관리
export const useTourStore = create<TourStoreState>(set => ({
  steps: [],
  run: false,
  setSteps: steps => set({ steps }),
  setRun: run => set({ run }),
  clearSteps: () => set({ steps: [], run: false }),
}));
