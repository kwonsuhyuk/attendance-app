import Joyride, { CallBackProps, STATUS, Step } from "react-joyride";

interface TourControllerProps {
  steps: Step[];
  run: boolean;
  onClose: () => void;
}

const TourController = ({ steps, run, onClose }: TourControllerProps) => {
  const handleCallback = (data: CallBackProps) => {
    const { status } = data;
    if (status === STATUS.FINISHED || status === STATUS.SKIPPED) {
      onClose();
    }
  };

  if (!run || steps.length === 0) return null;

  return (
    <Joyride
      steps={steps}
      run={run}
      callback={handleCallback}
      continuous
      showProgress
      showSkipButton
      scrollToFirstStep
      disableScrolling={true}
      spotlightClicks={true}
      disableOverlayClose={true}
      hideCloseButton={true}
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
