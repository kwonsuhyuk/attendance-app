import { COMPANY_SETTING_STEPS } from "@/constant/steps";
import { useState } from "react";

interface IuseCompanyStepProps {
  submitCompanyData: () => void;
  companySettingForm: any;
}

export const useCompanyStep = ({ submitCompanyData, companySettingForm }: IuseCompanyStepProps) => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const handleNext = async () => {
    const stepValidation =
      activeStep === 0
        ? "companyBasic"
        : activeStep === 1
        ? "companyJobList"
        : activeStep === 2
        ? "companyNightHoliday"
        : null;

    if (stepValidation) {
      const isValid = await companySettingForm.trigger(stepValidation, { shouldFocus: true });

      if (!isValid) {
        return;
      }
    }
    if (activeStep === COMPANY_SETTING_STEPS.length - 1) {
      submitCompanyData();
      return;
    }
    setActiveStep(prev => prev + 1);
  };
  const handleBack = () => setActiveStep(prev => prev - 1);
  return { activeStep, handleNext, handleBack };
};
