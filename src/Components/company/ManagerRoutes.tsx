import { Route, Routes } from "react-router-dom";
import { MANAGER_ROUTES, COMMON_ROUTES } from "@/constants/routes";
import Footer from "@/components/common/Footer";
import ManagerPageContainer from "@/components/container/ManagerPageContainer";
import ManagerMainContent from "./ManagerMainContent";
import EmployeeListPage from "@/pages/manager/EmployeeListPage";
import ManagerSettingPage from "@/pages/manager/ManagerSettingPage";
import AboutPage from "@/pages/common/AboutPage";
import DateCheckPage from "@/pages/manager/DateCheckPage";
import TodayAttenancePage from '@/pages/manager/TodayAttenancePage';
import PeriodAttendancePage from '@/pages/manager/PeriodAttendancePage';
import PositionManagePage from '@/pages/manager/PositionManagePage';
import WorkplaceManagePage from '@/pages/manager/WorkplaceManagePage';
import VacationStatisticPage from '@/pages/manager/VacationStatisticPage';
import VacationDetailPage from '@/pages/manager/VacationDetailPage';
import NoticePage from '@/pages/manager/NoticePage';

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
        <Route path={MANAGER_ROUTES.TODAY_ATT} element={<TodayAttenancePage />} />
        <Route path={MANAGER_ROUTES.PERIROD_ATT} element={<PeriodAttendancePage />} />
        <Route path={MANAGER_ROUTES.POSITION_MANAGE} element={<PositionManagePage />} />
        <Route path={MANAGER_ROUTES.WORKPLACE_MANAGE} element={<WorkplaceManagePage />} />
        <Route path={MANAGER_ROUTES.VACATION_STATISTIC} element={<VacationStatisticPage />} />
        <Route path={MANAGER_ROUTES.VACATION_DETAIL} element={<VacationDetailPage />} />
        <Route path={MANAGER_ROUTES.NOTICE} element={<NoticePage />} />
      </Routes>
      <Footer />
    </ManagerPageContainer>
  );
};

export default ManagerRoutes;
