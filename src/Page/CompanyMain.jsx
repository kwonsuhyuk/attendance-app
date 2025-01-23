import "../firebase";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useTour } from "@reactour/tour";
import { ADMIN_STEP, EMPLOYEE_STEP } from "../constant/tourStep";
import MainContent from "../Components/MainContent";

const CompanyMain = ({ companyInfo }) => {
  const { currentUser, userType } = useSelector((state) => state.user);
  const [currentCompany, setCurrentCompany] = useState();
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

  useEffect(() => {
    if (companyInfo) setCurrentCompany(companyInfo);
  }, [companyInfo]);

  return (
    <MainContent
      currentCompany={currentCompany}
      currentUser={currentUser}
      userType={userType}
    />
  );
};

export default CompanyMain;
