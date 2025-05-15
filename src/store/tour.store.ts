import { create } from "zustand";
import { Step } from "react-joyride";

interface TourStoreState {
  steps: Step[];
  setSteps: (steps: Step[]) => void;
  clearSteps: () => void;
}

export const useTourStore = create<TourStoreState>(set => ({
  steps: [],
  setSteps: (steps: Step[]) => set({ steps }),
  clearSteps: () => set({ steps: [] }),
}));
