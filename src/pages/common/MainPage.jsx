import "@/firebase";
import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTour } from "@reactour/tour";
import { useUserStore } from "@/store/user.store";
import { useCompanyStore } from "@/store/company.store";
import Header from "@/components/common/Header";
import { getCompanyInfo } from "@/api";
import Loading from "@/components/common/Loading";
import CompanyMain from "./CompanyMain";
import AccessCameraPage from "../employee/AccessCameraPage";
import DateCheckPage from "../manager/DateCheckPage";
import ManagerSettingPage from "../manager/ManagerSettingPage";
import EmployeeListPage from "../manager/EmployeeListPage";
import ShowCalendarPage from "../employee/ShowCalendarPage";
import AppGuidePage from "../employee/AppGuidePage";
import AboutPage from "./AboutPage";
import Footer from "@/components/common/Footer";
import { COMMON_ROUTES, EMPLOYEE_ROUTES, MANAGER_ROUTES } from "@/constants/routes";

const MainPage = () => {
  const companyCode = useUserStore(state => state.currentUser?.companyCode);
  const setCompany = useCompanyStore(state => state.setCompany);
  const [isLoading, setIsLoading] = useState(false);
  const { setIsOpen } = useTour();

  useEffect(() => {
    async function getCompany() {
      if (companyCode) {
        setIsLoading(true);
        try {
          const data = await getCompanyInfo(companyCode);
          setCompany(data);
        } catch (error) {
          console.error("Error fetching company info:", error);
        } finally {
          setIsLoading(false);
        }
      }
    }
    getCompany();
  }, [setCompany, companyCode]);

  useEffect(() => {
    const tourShown = localStorage.getItem("tourShown");
    if (!tourShown || tourShown === "false") {
      setTimeout(() => {
        setIsOpen(true);
      }, 1000);
    }
  }, [setIsOpen]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <main className="min-h-screen min-w-screen bg-white-bg dark:bg-dark-bg text-white-text dark:text-dark-text flex flex-col">
      <Header />
      <div className="overflow-auto mx-10 md:px-20 flex-grow flex flex-col justify-center h-full lg:h-auto relative">
        <Routes>
          <Route path={COMMON_ROUTES.COMPANY_MAIN} element={<CompanyMain />} />
          <Route path={EMPLOYEE_ROUTES.COMMUTE} element={<AccessCameraPage />} />
          <Route path={EMPLOYEE_ROUTES.EMPLOYEE_DATE_CHECK} element={<DateCheckPage />} />
          <Route path={MANAGER_ROUTES.SETTING} element={<ManagerSettingPage />} />
          <Route path={MANAGER_ROUTES.EMPLOYEE_LIST} element={<EmployeeListPage />} />
          <Route path={MANAGER_ROUTES.CALENDAR} element={<ShowCalendarPage />} />
          <Route path={EMPLOYEE_ROUTES.APP_GUIDE} element={<AppGuidePage />} />
          <Route path={COMMON_ROUTES.ABOUT} element={<AboutPage />} />
        </Routes>
      </div>
      <Footer />
    </main>
  );
};

export default MainPage;
