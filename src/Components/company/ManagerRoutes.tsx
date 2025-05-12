import type { RouteObject } from "react-router-dom";
import { MANAGER_ROUTES, COMMON_ROUTES } from "@/constants/routes";

// Manager pages
import ManagerMainContent from "@/components/company/ManagerMainContent";
import EmployeeListPage from "@/pages/manager/EmployeeListPage";
import TodayAttendancePage from "@/pages/manager/TodayAttenancePage";
import PeriodAttendancePage from "@/pages/manager/PeriodAttendancePage";
import PositionManagePage from "@/pages/manager/PositionManagePage";
import WorkplaceManagePage from "@/pages/manager/WorkplaceManagePage";
import VacationStatisticPage from "@/pages/manager/VacationStatisticPage";
import VacationDetailPage from "@/pages/manager/VacationDetailPage";
import CompanyInfoPage from "@/pages/manager/CompanyInfoPage";
import HolidayNightManagePage from "@/pages/manager/HolidayNightManagePage";
import NoticePage from "@/pages/manager/NoticePage";
import AboutPage from "@/pages/common/AboutPage";

const ManagerRoutes: RouteObject[] = [
  // Company main dashboard
  { path: COMMON_ROUTES.COMPANY_MAIN.substring(1), Component: ManagerMainContent },

  // Attendance and statistics
  { path: MANAGER_ROUTES.TODAY_ATT.substring(1), Component: TodayAttendancePage },
  { path: MANAGER_ROUTES.PERIOD_ATT.substring(1), Component: PeriodAttendancePage },
  { path: MANAGER_ROUTES.VACATION_STATISTIC.substring(1), Component: VacationStatisticPage },
  { path: MANAGER_ROUTES.VACATION_DETAIL.substring(1), Component: VacationDetailPage },

  // Employee management
  { path: MANAGER_ROUTES.EMPLOYEE_LIST.substring(1), Component: EmployeeListPage },

  // Company settings
  { path: MANAGER_ROUTES.COMPANY_INFO.substring(1), Component: CompanyInfoPage },
  { path: MANAGER_ROUTES.HOLIDAY_MANAGE.substring(1), Component: HolidayNightManagePage },
  { path: MANAGER_ROUTES.POSITION_MANAGE.substring(1), Component: PositionManagePage },
  { path: MANAGER_ROUTES.WORKPLACE_MANAGE.substring(1), Component: WorkplaceManagePage },

  // Common pages
  { path: COMMON_ROUTES.NOTICE.substring(1), Component: NoticePage },
  { path: COMMON_ROUTES.ABOUT.substring(1), Component: AboutPage },
];

export default ManagerRoutes;
