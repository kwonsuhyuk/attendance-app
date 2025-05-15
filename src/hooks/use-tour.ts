import { useEffect, useState } from "react";
import { Step } from "react-joyride";
import { useUserStore } from "@/store/user.store";
import { useTourStore } from "@/store/tour.store";
import { hasSeenTour, markTourAsSeen } from "@/util/tourStorage.util";

export const useTour = (pageKey: string, steps: Step[], dependencyReady: boolean = true) => {
  const [runTour, setRunTour] = useState(false);
  const userId = useUserStore(state => state.currentUser?.uid);

  // steps 등록 (공통)
  useEffect(() => {
    useTourStore.getState().setSteps(steps);
  }, [steps]);

  // 최초 페이지 진입 시 투어 실행
  useEffect(() => {
    if (!userId || !dependencyReady) return;

    const hasSeen = hasSeenTour(pageKey, userId);
    if (!hasSeen) {
      setRunTour(true);
      markTourAsSeen(pageKey, userId);
    }
  }, [userId, dependencyReady]);

  return {
    runTour,
    setRunTour,
  };
};
