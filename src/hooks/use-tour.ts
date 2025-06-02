import { useEffect } from "react";
import { Step } from "react-joyride";
import { useTourStore } from "@/store/tour.store";
import { hasSeenTour, markTourAsSeen } from "@/util/tourStorage.util";

export const useTour = (
  pageKey: string,
  steps: Step[],
  controlledSteps: number[] = [],
  dependencyReady: boolean = true,
) => {
  const { setSteps, setRun, setControlledSteps } = useTourStore.getState();

  useEffect(() => {
    setSteps(steps);
    setControlledSteps(controlledSteps);
  }, [steps, controlledSteps]);

  useEffect(() => {
    if (!dependencyReady) return;
    if (!hasSeenTour(pageKey)) {
      markTourAsSeen(pageKey);
      setRun(true);
    }
  }, [dependencyReady]);
};
