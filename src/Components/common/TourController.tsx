import { useEffect, useState } from "react";
import Joyride, { CallBackProps, STATUS, Step } from "react-joyride";
import { useTourStore } from "@/store/tour.store";

interface TourControllerProps {
  steps: Step[];
  run: boolean;
  onClose: () => void;
  stepIndex?: number;
  onStepChange?: (index: number) => void;
}

const TourController = ({ steps, run, onClose, stepIndex, onStepChange }: TourControllerProps) => {
  const [internalStepIndex, setInternalStepIndex] = useState(0);
  const controlled = typeof stepIndex === "number" && typeof onStepChange === "function";

  const controlledSteps = useTourStore(state => state.controlledSteps);

  useEffect(() => {
    if (run && !controlled) setInternalStepIndex(0);
  }, [run, controlled]);

  const handleCallback = (data: CallBackProps) => {
    const { status, action, index, type } = data;

    if (status === STATUS.FINISHED || status === STATUS.SKIPPED) {
      onClose();
      return;
    }

    const isControlled = controlledSteps.includes(index);

    if (controlled && typeof onStepChange === "function") {
      if (!isControlled && type === "step:after") {
        if (action === "next") onStepChange(index + 1);
        if (action === "prev") onStepChange(Math.max(index - 1, 0));
      }
    } else {
      if (!isControlled && type === "step:after") {
        if (action === "next") setInternalStepIndex(index + 1);
        if (action === "prev") setInternalStepIndex(Math.max(index - 1, 0));
      }
    }
  };

  if (!run || steps.length === 0) return null;

  return (
    <Joyride
      steps={steps}
      run={run}
      stepIndex={controlled ? stepIndex : internalStepIndex}
      callback={handleCallback}
      continuous
      scrollToFirstStep
      showProgress={false}
      showSkipButton
      disableOverlayClose
      disableScrolling
      spotlightClicks={false}
      hideCloseButton={true}
      spotlightPadding={10}
      locale={{
        last: "Done",
      }}
      styles={{
        options: {
          zIndex: 10000,
          primaryColor: "#FFD369",
        },
      }}
    />
  );
};

export default TourController;
