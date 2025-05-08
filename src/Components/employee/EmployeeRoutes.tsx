import type { RouteObject } from "react-router-dom";
import { EMPLOYEE_ROUTES, COMMON_ROUTES } from "@/constants/routes";
import EmployeeLayout from "@/layout/EmployeeLayout";
import EmployeeMainContent from "@/components/employee/EmployeeMainContent";
import ShowCalendarPage from "@/pages/employee/ShowCalendarPage";
import MyVacationPage from "@/pages/employee/MyVacationPage";
import EmployeeMenuPage from "@/pages/employee/EmployeeMenuPage";
import AppGuidePage from "@/pages/employee/AppGuidePage";
import CommutePage from "@/pages/employee/CommutePage";
import NoticePage from "@/pages/manager/NoticePage";
import AboutPage from "@/pages/common/AboutPage";

const EmployeeRoutes: RouteObject[] = [
  {
    path: "",
    Component: () => <EmployeeLayout type="main" />,
    children: [
      { path: COMMON_ROUTES.COMPANY_MAIN.substring(1), element: <EmployeeMainContent /> },
      { path: EMPLOYEE_ROUTES.EMPLOYEE_DATE_CHECK.substring(1), element: <ShowCalendarPage /> },
      { path: EMPLOYEE_ROUTES.MY_VACATION.substring(1), element: <MyVacationPage /> },
      { path: EMPLOYEE_ROUTES.EMPLOYEE_MENU.substring(1), element: <EmployeeMenuPage /> },
    ],
  },
  {
    path: "",
    Component: () => <EmployeeLayout type="sub" />,
    children: [
      { path: EMPLOYEE_ROUTES.APP_GUIDE.substring(1), element: <AppGuidePage /> },
      { path: EMPLOYEE_ROUTES.COMMUTE.substring(1), element: <CommutePage /> },
      { path: COMMON_ROUTES.NOTICE.substring(1), element: <NoticePage /> },
      { path: COMMON_ROUTES.ABOUT.substring(1), element: <AboutPage /> },
    ],
  },
];

export default EmployeeRoutes;
