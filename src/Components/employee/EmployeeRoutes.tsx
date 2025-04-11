import { Route, Routes } from "react-router-dom";
import { EMPLOYEE_ROUTES, COMMON_ROUTES } from "@/constants/routes";
import AccessCameraPage from "@/pages/employee/AccessCameraPage";
import ShowCalendarPage from "@/pages/employee/ShowCalendarPage";
import AppGuidePage from "@/pages/employee/AppGuidePage";
import AboutPage from "@/pages/common/AboutPage";
import EmployeeMainContent from "./EmployeeMainContent";
import EmployeeLayout from "@/layout/EmployeeLayout";
import NoticePage from "@/pages/manager/NoticePage";
import MyVacationPage from "@/pages/employee/MyVacationPage";
import EmployeeMenuPage from "@/pages/employee/EmployeeMenuPage";
import CommutePage from "@/pages/employee/CommutePage";

const EmployeeRoutes = () => {
  return (
    <Routes>
      <Route element={<EmployeeLayout type="main" />}>
        <Route path={COMMON_ROUTES.COMPANY_MAIN} element={<EmployeeMainContent />} />
        {/* <Route path={EMPLOYEE_ROUTES.COMMUTE} element={<AccessCameraPage />} /> */}
        <Route path={EMPLOYEE_ROUTES.EMPLOYEE_DATE_CHECK} element={<ShowCalendarPage />} />
        <Route path={EMPLOYEE_ROUTES.MY_VACATION} element={<MyVacationPage />} />
        <Route path={EMPLOYEE_ROUTES.EMPLOYEE_MENU} element={<EmployeeMenuPage />} />
      </Route>
      {/* header,footer 를 안보여주기 위한 분기처리 */}
      <Route element={<EmployeeLayout type="sub" />}>
        <Route path={COMMON_ROUTES.ABOUT} element={<AboutPage />} />
        <Route path={COMMON_ROUTES.NOTICE} element={<NoticePage />} />
        <Route path={EMPLOYEE_ROUTES.APP_GUIDE} element={<AppGuidePage />} />
        <Route path={EMPLOYEE_ROUTES.COMMUTE} element={<CommutePage />} />
      </Route>
    </Routes>
  );
};

export default EmployeeRoutes;
