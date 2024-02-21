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
  const [jobName, setJobName] = useState();
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
      const jobNameRef = ref(
        db,
        `companyCode/${currentUser?.photoURL}/users/${currentUser?.uid}/jobName`
      );
      const snapshot = await get(dbRef);
      const jobSnapshot = await get(jobNameRef);
      if (snapshot.val() && jobSnapshot.val()) {
        setCurrentCompany(snapshot.val());
        setJobName(jobSnapshot.val());
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
      <div className="m-10">
        <div className="flex flex-col space-y-8">
          <div className="flex justify-between">
            <a
              className="cursor-pointer"
              onClick={() => navigate(`${currentUser.photoURL}/`)}
            >
              main
            </a>
            <a className="cursor-pointer">menu</a>
          </div>

          <div className="flex flex-col items-center space-y-4">
            <img
              src={companyLogo}
              alt="회사로고"
              className="rounded-full w-[130px] h-[130px]"
              style={{ border: '2px solid black' }}
            />
            <div className="flex items-center text-white-text">
              {currentCompany?.companyName}/{jobName}
            </div>
          </div>
          <div className="flex flex-col items-center space-y-4">
            <div
              className="flex flex-row justify-between w-full items-center cursor-pointer text-white-text"
              onClick={() => navigate(`/${currentUser.photoURL}/calendar`)}
            >
              <div>캘린더 바로가기</div>
              <div className="text-white-text">&gt;</div>
            </div>
            <div className="border-b border-solid w-[316px]"></div>
            {userType === 'employee' && (
              <ShowSalary matchCalendar={matchCalendar} matchHome={matchHome} />
            )}
            <div
              className="cursor-pointer text-[20px] font-extrabold text-white-text"
              onClick={() => navigate(`/${currentUser.photoURL}/camera`)}
            >
              QR SCAN
            </div>
            <div className="border-b border-solid w-[316px]"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CompanyMain;
