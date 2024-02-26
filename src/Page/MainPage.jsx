import "../firebase";
import { Route, Routes } from "react-router-dom";
import AccessCameraPage from "./AccessCameraPage";
import DateCheckPage from "./DateCheckPage";
import ShowSalary from "../Components/ShowSalary/ShowSalary";
import ManagerSettingPage from "./ManagerSettingPage";
import EmployeeListPage from "./EmployeeListPage";
import MenuBar from "../Components/MenuBar";
import { useEffect, useState } from "react";
import { get, getDatabase, ref } from "firebase/database";
import { useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";
import MyCalendar from "../Components/Calendar/MyCalendar";
import CompanyMain from "./CompanyMain";
import ShowCalendarPage from "./ShowCalendarPage";
import { Divider } from "@mui/material";
import { useNavigate, useMatch } from "react-router-dom";
import AppGuidePage from "./AppGuidePage";

function MainPage() {
  const navigate = useNavigate();
  const { currentUser, userType } = useSelector((state) => state.user);
  const [currentCompany, setCurrentCompany] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const { darkMode } = useSelector((state) => state.darkmodeSlice);

  const matchCalendar = useMatch(`/${currentUser?.photoURL}/calendar`);
  useEffect(() => {
    console.log(matchCalendar);
  }, []);
  const matchHome = useMatch(`/${currentUser?.photoURL}`);
  useEffect(() => {
    console.log(matchHome);
  }, []);
  console.log(matchCalendar);
  console.log(matchHome);

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
    return () => {
      setCurrentCompany([]);
    };
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
          <Route path="/datecheck/:id?" element={<DateCheckPage />} />
          <Route path="/setting/*" element={<ManagerSettingPage />} />
          <Route path="/employeelist" element={<EmployeeListPage />} />
          <Route path="/calendar" element={<ShowCalendarPage />} />
          <Route path="/appguide" element={<AppGuidePage />} />
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
