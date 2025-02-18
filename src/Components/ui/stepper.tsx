import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export default function StepperPage({ steps }) {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep(prev => prev - 1);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 space-y-6">
      {/* Progress Bar */}
      <div className="w-full max-w-md">
        <Progress value={(activeStep / (steps.length - 1)) * 100} />
      </div>

      {/* Step Content */}
      <div className="text-center">
        <h2 className="text-xl font-semibold">{steps[activeStep]}</h2>
      </div>

      {/* Navigation Buttons */}
      <div className="flex space-x-4">
        <Button onClick={handleBack} disabled={activeStep === 0} variant="outline">
          Back
        </Button>
        <Button onClick={handleNext}>{activeStep === steps.length - 1 ? "Finish" : "Next"}</Button>
      </div>
    </div>
  );
}
