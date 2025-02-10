import "../firebase";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useTour } from "@reactour/tour";
import { ADMIN_STEP, EMPLOYEE_STEP } from "../constant/tourStep";
import MainContent from "../components/MainContent";
import { useUserStore } from "@/store/user.store";

const CompanyMain = ({ companyInfo }) => {
  const userType = useUserStore(state => state.userType);

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

  return <MainContent currentCompany={currentCompany} userType={userType} />;
};

export default CompanyMain;
