import "@/firebase";
import { useEffect } from "react";
import { useTour } from "@reactour/tour";
import { useUserStore } from "@/store/user.store";
import { ADMIN_STEP, EMPLOYEE_STEP } from "@/constants/tourStep";
import ManagerMainContent from "@/components/company/ManagerMainContent";
import EmployeeMainContent from "@/components/employee/EmployeeMainContent";
import EmployeePageContainer from "@/components/container/EmployeePageContainer";
import Header from "@/components/common/Header";

const CompanyMain = () => {
  const userType = useUserStore(state => state.userType);
  const { isOpen, setCurrentStep, setSteps } = useTour();

  useEffect(() => {
    if (isOpen && userType === "manager") {
      const timer = setTimeout(() => {
        setCurrentStep(0);
        setSteps(ADMIN_STEP);
      }, 300);

      return () => {
        clearTimeout(timer), setSteps([]);
      };
    }

    if (isOpen && userType === "employee") {
      const timer = setTimeout(() => {
        setCurrentStep(0);
        setSteps(EMPLOYEE_STEP);
      }, 300);

      return () => {
        clearTimeout(timer), setSteps([]);
      };
    }
  }, [isOpen, setCurrentStep, setSteps, userType]);

  return (
    <EmployeePageContainer>
      <Header />
      {userType === "manager" ? <ManagerMainContent /> : <EmployeeMainContent />}
    </EmployeePageContainer>
  );
};

export default CompanyMain;
