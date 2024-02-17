import '../firebase';
import { Route, Routes } from 'react-router-dom';
import AccessCameraPage from './AccessCameraPage';
import DateCheckPage from './DateCheckPage';
import ShowSalary from '../Components/ShowSalary/ShowSalary';
import ManagerSettingPage from './managerSettingPage';
import EmployeeListPage from './EmployeeListPage';
import MenuBar from '../Components/MenuBar';
import { useEffect, useState } from 'react';
import { get, getDatabase, ref } from 'firebase/database';
import { useSelector } from 'react-redux';
import { ClipLoader } from 'react-spinners';
import MyCalendar from '../Components/Calendar/MyCalendar';
import CompanyMain from './CompanyMain';
import ShowCalendarPage from './ShowCalendarPage';
import { Divider } from '@mui/material';
import { useNavigate, useMatch } from 'react-router-dom';

function MainPage() {
  const navigate = useNavigate();
  const { currentUser, userType } = useSelector((state) => state.user);
  const [currentCompany, setCurrentCompany] = useState();
  const [isLoading, setIsLoading] = useState(false);

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
        <h3>로딩 중입니다.</h3>
      </div> // 로딩 스피너
    );
  }

  return (
    <div className="min-h-screen min-w-screen bg-white-bg dark:bg-dark-bg text-white-text dark:text-dark-text">
      <div className="h-full overflow-auto xl:px-20 py-14">
        {/* <div className="flex gap-5">
             <div>{currentCompany?.companyName}</div>
            <img
               src={currentCompany?.companyLogo}
               alt="회사로고"
               className="w-10 h-10"
             />
           </div> */}

        {userType === 'employee' && (
          <div className="bg-red-300">
            <ShowSalary />
          </div>
        )}

        {/* <MenuBar
          companyName={currentCompany?.companyName}
          companyLogo={currentCompany?.companyLogo}
        /> */}

        <Routes>
          <Route
            path="/companymain"
            element={<CompanyMain companyLogo={currentCompany?.companyLogo} />}
          />
          <Route path="/camera" element={<AccessCameraPage />} />
          <Route path="/datecheck" element={<DateCheckPage />} />
          <Route path="/setting" element={<ManagerSettingPage />} />
          <Route path="/employeelist" element={<EmployeeListPage />} />
          <Route path="/calendar" element={<ShowCalendarPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default MainPage;
