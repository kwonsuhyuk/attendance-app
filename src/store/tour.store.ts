import { create } from "zustand";
import { Step } from "react-joyride";

interface TourStoreState {
  steps: Step[];
  run: boolean;
  stepIndex: number;
  controlledSteps: number[];
  setSteps: (steps: Step[]) => void;
  setRun: (run: boolean) => void;
  setStepIndex: (index: number) => void;
  setControlledSteps: (steps: number[]) => void;
  clearSteps: () => void;
}

export const useTourStore = create<TourStoreState>(set => ({
  steps: [],
  run: false,
  stepIndex: 0,
  controlledSteps: [],
  setSteps: steps => set({ steps }),
  setRun: run => set({ run }),
  setStepIndex: index => set({ stepIndex: index }),
  setControlledSteps: steps => set({ controlledSteps: steps }),
  clearSteps: () => set({ steps: [], run: false, stepIndex: 0, controlledSteps: [] }),
}));
