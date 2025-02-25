import { Route, Routes } from "react-router-dom";
import { EMPLOYEE_ROUTES, COMMON_ROUTES } from "@/constants/routes";
import EmployeePageContainer from "@/components/container/EmployeePageContainer";
import Footer from "@/components/common/Footer";
import AccessCameraPage from "@/pages/employee/AccessCameraPage";
import ShowCalendarPage from "@/pages/employee/ShowCalendarPage";
import AppGuidePage from "@/pages/employee/AppGuidePage";
import AboutPage from "@/pages/common/AboutPage";
import EmployeeMainContent from "./EmployeeMainContent";

const EmployeeRoutes = () => {
  return (
    <EmployeePageContainer>
      <Routes>
        <Route path={COMMON_ROUTES.COMPANY_MAIN} element={<EmployeeMainContent />} />
        <Route path={EMPLOYEE_ROUTES.COMMUTE} element={<AccessCameraPage />} />
        <Route path={EMPLOYEE_ROUTES.EMPLOYEE_DATE_CHECK} element={<ShowCalendarPage />} />
        <Route path={EMPLOYEE_ROUTES.APP_GUIDE} element={<AppGuidePage />} />
        <Route path={COMMON_ROUTES.ABOUT} element={<AboutPage />} />
      </Routes>
    </EmployeePageContainer>
  );
};

export default EmployeeRoutes;
