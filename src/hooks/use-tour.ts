import { useEffect } from "react";
import { Step } from "react-joyride";
import { useUserStore } from "@/store/user.store";
import { useTourStore } from "@/store/tour.store";
import { hasSeenTour, markTourAsSeen } from "@/util/tourStorage.util";

export const useTour = (
  pageKey: string,
  steps: Step[],
  controlledSteps: number[] = [],
  dependencyReady: boolean = true,
) => {
  const userId = useUserStore(state => state.currentUser?.uid);
  const { setSteps, setRun, setControlledSteps } = useTourStore.getState();

  useEffect(() => {
    setSteps(steps);
    setControlledSteps(controlledSteps);
  }, [steps, controlledSteps]);

  useEffect(() => {
    if (!userId || !dependencyReady) return;
    if (!hasSeenTour(pageKey, userId)) {
      markTourAsSeen(pageKey, userId);
      setRun(true);
    }
  }, [userId, dependencyReady]);
};
