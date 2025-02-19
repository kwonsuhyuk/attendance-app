import { Button } from "@/components/ui/button";

interface StepperNavigationProps {
  activeStep: number;
  steps: string[];
  onNext: () => void;
  onBack: () => void;
}

const StepperNavigation = ({ activeStep, steps, onNext, onBack }: StepperNavigationProps) => {
  return (
    <div className="flex space-x-4">
      <Button onClick={onBack} disabled={activeStep === 0} variant="outline">
        이전
      </Button>
      <Button onClick={onNext}>{activeStep === steps.length - 1 ? "완료" : "다음"}</Button>
    </div>
  );
};

export default StepperNavigation;
