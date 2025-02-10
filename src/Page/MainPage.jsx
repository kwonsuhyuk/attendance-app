import "../firebase";
import { Route, Routes } from "react-router-dom";
import AccessCameraPage from "./AccessCameraPage";
import DateCheckPage from "./DateCheckPage";
import ManagerSettingPage from "./ManagerSettingPage";
import EmployeeListPage from "./EmployeeListPage";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CompanyMain from "./CompanyMain";
import ShowCalendarPage from "./ShowCalendarPage";
import AppGuidePage from "./AppGuidePage";
import AboutPage from "./AboutPage";
import { useTour } from "@reactour/tour";
import Loading from "../components/common/Loading";
import Footer from "../components/common/Footer";
import { getCompanyInfo } from "../api";
import Header from "../components/common/Header";
import { setCompany } from "@/store/companySlice";

function MainPage() {
  const { currentUser } = useSelector(state => state.user);
  const [currentCompany, setCurrentCompany] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const { setIsOpen } = useTour();
  const dispatch = useDispatch();

  useEffect(() => {
    async function getCompany() {
      setIsLoading(true);
      const data = await getCompanyInfo(currentUser);
      if (data) {
        setCurrentCompany(data);
        dispatch(setCompany(data));
      }
      setIsLoading(false);
    }
    getCompany();
  }, [currentUser, dispatch]);

  useEffect(() => {
    // LocalStorage에서 tourShown 값을 확인
    const tourShown = localStorage.getItem("tourShown");

    // tourShown 값이 없거나 'false'인 경우, 투어를 시작
    if (!tourShown || tourShown === "false") {
      setTimeout(() => {
        setIsOpen(true);
      }, 1000);
    }
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <main className="min-h-screen min-w-screen bg-white-bg dark:bg-dark-bg text-white-text dark:text-dark-text flex flex-col">
      <Header currentCompany={currentCompany} />
      <div className="overflow-auto mx-10 md:px-20 flex-grow flex flex-col justify-center h-full lg:h-auto relative">
        <Routes>
          <Route path="/companymain" element={<CompanyMain companyInfo={currentCompany} />} />
          <Route
            path="/camera"
            element={<AccessCameraPage companyLogo={currentCompany?.companyLogo} />}
          />

          <Route
            path="/datecheck/:id?"
            element={
              <DateCheckPage
                modalDefaultValue={currentCompany?.payCheckDay}
                nightPay={currentCompany?.isNightPay}
                holidayPay={currentCompany?.holidayPay}
                holidayList={currentCompany?.holidayList}
              />
            }
          />
          <Route path="/setting/*" element={<ManagerSettingPage />} />
          <Route path="/employeelist" element={<EmployeeListPage />} />
          <Route path="/calendar" element={<ShowCalendarPage />} />
          <Route path="/appguide" element={<AppGuidePage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </div>
      <Footer />
    </main>
  );
}

export default MainPage;
