import "../firebase";
import { Route, Routes } from "react-router-dom";
import AccessCameraPage from "./AccessCameraPage";
import DateCheckPage from "./DateCheckPage";
import ManagerSettingPage from "./ManagerSettingPage";
import EmployeeListPage from "./EmployeeListPage";
import MenuBar from "../Components/MenuBar";
import { useEffect, useState } from "react";
import { get, getDatabase, ref } from "firebase/database";
import { useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";
import CompanyMain from "./CompanyMain";
import ShowCalendarPage from "./ShowCalendarPage";
import AppGuidePage from "./AppGuidePage";
import AboutPage from "./AboutPage";
import OutjobCheckPage from "./OutjobCheckPage";

function MainPage() {
  const { currentUser } = useSelector((state) => state.user);
  const [currentCompany, setCurrentCompany] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const { darkMode } = useSelector((state) => state.darkmodeSlice);

  useEffect(() => {
    async function getCompanyInfo() {
      setIsLoading(true);
      const db = getDatabase();
      const dbRef = ref(db, `companyCode/${currentUser?.photoURL}/companyInfo`);
      const snapshot = await get(dbRef);
      if (snapshot.val()) {
        setCurrentCompany(snapshot.val());
      }
      setIsLoading(false);
    }
    getCompanyInfo();
  }, [currentUser?.photoURL]);

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen w-screen">
        <ClipLoader
          color="black"
          size={100}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
        <h3>로딩 중 입니다.</h3>
      </div> // 로딩 스피너
    );
  }

  return (
    <div className="min-h-screen min-w-screen bg-white-bg dark:bg-dark-bg text-white-text dark:text-dark-text flex flex-col">
      <div className="overflow-auto px-10 md:px-20 py-10">
        <MenuBar
          companyName={currentCompany?.companyName}
          companyLogo={currentCompany?.companyLogo}
        />
      </div>
      <div className="overflow-auto mx-10 md:px-20 flex-grow flex flex-col justify-center h-full lg:h-auto relative">
        <Routes>
          <Route
            path="/companymain"
            element={<CompanyMain companyLogo={currentCompany?.companyLogo} />}
          />
          <Route
            path="/camera"
            element={
              <AccessCameraPage companyLogo={currentCompany?.companyLogo} />
            }
          />
          <Route path="/outjobcheck" element={<OutjobCheckPage />} />
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
      {/* footer */}
      <div
        className="lg:hidden mx-10 mb-10"
        style={{
          borderTop: !darkMode ? "1px solid #00000080" : "1px solid #FFFFFF80",
        }}></div>
    </div>
  );
}

export default MainPage;
