import { Route, Routes } from "react-router-dom";
import { MANAGER_ROUTES, COMMON_ROUTES } from "@/constants/routes";
import Footer from "@/components/common/Footer";
import ManagerPageContainer from "@/components/container/ManagerPageContainer";
import ManagerMainContent from "./ManagerMainContent";
import EmployeeListPage from "@/pages/manager/EmployeeListPage";
import ShowCalendarPage from "@/pages/employee/ShowCalendarPage";
import ManagerSettingPage from "@/pages/manager/ManagerSettingPage";
import AboutPage from "@/pages/common/AboutPage";
import DateCheckPage from "@/pages/manager/DateCheckPage";

const ManagerRoutes = () => {
  return (
    <ManagerPageContainer>
      <Routes>
        <Route path={COMMON_ROUTES.COMPANY_MAIN} element={<ManagerMainContent />} />
        <Route path={MANAGER_ROUTES.EMPLOYEE_LIST} element={<EmployeeListPage />} />
        <Route path={MANAGER_ROUTES.CALENDAR} element={<DateCheckPage />} />
        <Route path={MANAGER_ROUTES.SETTING} element={<ManagerSettingPage />} />
        <Route path={COMMON_ROUTES.ABOUT} element={<AboutPage />} />
        {/* 여기서 부턴 임시 */}
        <Route path={MANAGER_ROUTES.TODAY_ATT} element={<EmployeeListPage />} />
        <Route path={MANAGER_ROUTES.PERIROD_ATT} element={<EmployeeListPage />} />
        <Route path={MANAGER_ROUTES.EMPLOYEE_MANAGE} element={<EmployeeListPage />} />
        <Route path={MANAGER_ROUTES.POSITION_MANAGE} element={<EmployeeListPage />} />
        <Route path={MANAGER_ROUTES.WORKPLACE_MANAGE} element={<EmployeeListPage />} />
        <Route path={MANAGER_ROUTES.VACATION_REGISTER} element={<EmployeeListPage />} />
        <Route path={MANAGER_ROUTES.VACATION_APPROVED} element={<EmployeeListPage />} />
        <Route path={MANAGER_ROUTES.VACATION_LIST} element={<EmployeeListPage />} />
      </Routes>
      <Footer />
    </ManagerPageContainer>
  );
};

export default ManagerRoutes;
