import "../firebase";
import { useEffect } from "react";
import { useTour } from "@reactour/tour";
import { ADMIN_STEP, EMPLOYEE_STEP } from "../constant/tourStep";
import MainContent from "../components/MainContent";
import { useUserStore } from "@/store/user.store";

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
