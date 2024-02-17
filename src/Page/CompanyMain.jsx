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
import ShowCalendarPage from './ShowCalendarPage';
import { Divider } from '@mui/material';
import { useNavigate, useMatch } from 'react-router-dom';

const CompanyMain = ({ companyLogo }) => {
  const navigate = useNavigate();
  const { currentUser, userType } = useSelector((state) => state.user);
  const [currentCompany, setCurrentCompany] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const matchCalendar = useMatch(`/${currentUser?.photoURL}/calendar`);
  useEffect(() => {
    console.log(matchCalendar);
  }, []);
  const matchHome = useMatch(`/${currentUser?.photoURL}/companymain`);
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

  return (
    <>
      <div className="m-10 ">
        <div className="flex flex-col">
          <div className="flex flex-row space-x-[150px]">
            <a
              className="cursor-pointer"
              onClick={() => navigate(`${currentUser.photoURL}/`)}
            >
              main
            </a>
            <a className="cursor-pointer">menu</a>
          </div>
          <Divider />
          <div className="flex gap-5 flex-col">
            <div>{currentCompany?.companyName}</div>
            <img
              src={companyLogo}
              alt="회사로고"
              className="rounded-full w-24 h-24 mr-5"
              style={{ border: '2px solid black' }}
            />

            <div onClick={() => navigate(`/${currentUser.photoURL}/calendar`)}>
              캘린더 바로가기 {'>'}
            </div>
          </div>
          <div></div>
        </div>
        {userType === 'employee' && (
          <>
            <div className="flex flex-col">
              <ShowSalary matchCalendar={matchCalendar} matchHome={matchHome} />
            </div>
          </>
        )}
        <div>
          <a
            className="dark-nav-selected cursor-pointer"
            onClick={() => navigate(`/${currentUser.photoURL}/camera`)}
          >
            QR SCAN
          </a>
        </div>
      </div>
    </>
  );
};

export default CompanyMain;
