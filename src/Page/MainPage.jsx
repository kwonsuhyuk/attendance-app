import "../firebase";
import { Route, Routes } from "react-router-dom";
import AccessCameraPage from "./AccessCameraPage";
import DateCheckPage from "./DateCheckPage";
import ShowSalary from "../Components/ShowSalary/ShowSalary";
import ManagerSettingPage from "./managerSettingPage";
import EmployeeListPage from "./EmployeeListPage";
import MenuBar from "../Components/MenuBar";
import { useEffect, useState } from "react";
import { get, getDatabase, ref } from "firebase/database";
import { useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";

function MainPage() {
  const { currentUser, userType } = useSelector((state) => state.user);
  const [currentCompany, setCurrentCompany] = useState();
  const [isLoading, setIsLoading] = useState(false);
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
        <h3>로딩 중입니다.</h3>
      </div> // 로딩 스피너
    );
  }

  return (
    <div className="m-10">
      <div className="flex gap-5">
        <div>{currentCompany?.companyName}</div>
        <img
          src={currentCompany?.companyLogo}
          alt="회사로고"
          className="w-10 h-10"
        />
      </div>
      {userType === "employee" && (
        <div className="bg-red-300">
          <ShowSalary />
        </div>
      )}
      <div>
        <MenuBar />
      </div>
      <Routes>
        <Route path="/camera" element={<AccessCameraPage />} />
        <Route path="/datecheck" element={<DateCheckPage />} />
        <Route path="/setting" element={<ManagerSettingPage />} />
        <Route path="/employeelist" element={<EmployeeListPage />} />
      </Routes>
    </div>
  );
}

export default MainPage;
