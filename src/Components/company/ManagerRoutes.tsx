import { Route, Routes } from "react-router-dom";
import { MANAGER_ROUTES, COMMON_ROUTES } from "@/constants/routes";
import ManagerMainContent from "./ManagerMainContent";
import EmployeeListPage from "@/pages/manager/EmployeeListPage";
import AboutPage from "@/pages/common/AboutPage";
import DateCheckPage from "@/pages/manager/DateCheckPage";
import TodayAttenancePage from "@/pages/manager/TodayAttenancePage";
import PeriodAttendancePage from "@/pages/manager/PeriodAttendancePage";
import PositionManagePage from "@/pages/manager/PositionManagePage";
import WorkplaceManagePage from "@/pages/manager/WorkplaceManagePage";
import VacationStatisticPage from "@/pages/manager/VacationStatisticPage";
import VacationDetailPage from "@/pages/manager/VacationDetailPage";
import NoticePage from "@/pages/manager/NoticePage";
import Layout from "@/layout/ManagerLayout";
import CompanyInfoPage from "@/pages/manager/CompanyInfoPage";
import HolidayNightManagePage from "@/pages/manager/HolidayNightManagePage";

const ManagerRoutes = () => {
  return (
    <Layout>
      <Routes>
        <Route path={COMMON_ROUTES.COMPANY_MAIN} element={<ManagerMainContent />} />
        <Route path={MANAGER_ROUTES.EMPLOYEE_LIST} element={<EmployeeListPage />} />
        <Route path={MANAGER_ROUTES.CALENDAR} element={<DateCheckPage />} />
        <Route path={COMMON_ROUTES.ABOUT} element={<AboutPage />} />
        <Route path={MANAGER_ROUTES.TODAY_ATT} element={<TodayAttenancePage />} />
        <Route path={MANAGER_ROUTES.PERIROD_ATT} element={<PeriodAttendancePage />} />
        <Route path={MANAGER_ROUTES.POSITION_MANAGE} element={<PositionManagePage />} />
        <Route path={MANAGER_ROUTES.WORKPLACE_MANAGE} element={<WorkplaceManagePage />} />
        <Route path={MANAGER_ROUTES.VACATION_STATISTIC} element={<VacationStatisticPage />} />
        <Route path={MANAGER_ROUTES.VACATION_DETAIL} element={<VacationDetailPage />} />
        <Route path={COMMON_ROUTES.NOTICE} element={<NoticePage />} />
        <Route path={MANAGER_ROUTES.COMPANY_INFO} element={<CompanyInfoPage />} />
        <Route path={MANAGER_ROUTES.HOLIDAY_MANAGE} element={<HolidayNightManagePage />} />
      </Routes>
    </Layout>
  );
};

export default ManagerRoutes;
