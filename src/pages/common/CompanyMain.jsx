import "@/firebase";
import { useEffect } from "react";
import { useTour } from "@reactour/tour";
import MainContent from "@/components/common/MainContent";
import { useUserStore } from "@/store/user.store";
import { ADMIN_STEP, EMPLOYEE_STEP } from "@/constants/tourStep";

const CompanyMain = () => {
  const userType = useUserStore(state => state.userType);
  const { isOpen, setCurrentStep, setSteps } = useTour();

  useEffect(() => {
    if (isOpen && userType == "admin") {
      const timer = setTimeout(() => {
        setCurrentStep(0);
        setSteps(ADMIN_STEP);
      }, 300);

      return () => {
        clearTimeout(timer), setSteps([]);
      };
    }

    if (isOpen && userType == "employee") {
      const timer = setTimeout(() => {
        setCurrentStep(0);
        setSteps(EMPLOYEE_STEP);
      }, 300);

      return () => {
        clearTimeout(timer), setSteps([]);
      };
    }
  }, [isOpen, setCurrentStep, setSteps, userType]);

  return <MainContent />;
};

export default CompanyMain;
