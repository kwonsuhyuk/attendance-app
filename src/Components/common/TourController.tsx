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

  const pathname = window.location.pathname;
  const isEmployeePage = pathname.includes("/employee");

  return (
    <Joyride
      steps={steps}
      run={run}
      stepIndex={controlled ? stepIndex : internalStepIndex}
      callback={handleCallback}
      continuous
      scrollToFirstStep={false}
      scrollOffset={100}
      showProgress={false}
      showSkipButton
      disableOverlayClose={true}
      disableScrolling={false}
      spotlightClicks={false}
      hideCloseButton={true}
      spotlightPadding={10}
      locale={{
        last: "Done",
      }}
      styles={{
        options: {
          primaryColor: "#FFD369",
          zIndex: 10000,
          width: isEmployeePage ? 280 : 380,
        },
        tooltip: {
          fontSize: isEmployeePage ? "14px" : "17px",
          padding: "10px 14px",
        },
      }}
    />
  );
};

export default TourController;
