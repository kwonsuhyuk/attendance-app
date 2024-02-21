import "../firebase";
import { Route, Routes } from "react-router-dom";
import AccessCameraPage from "./AccessCameraPage";
import DateCheckPage from "./DateCheckPage";
import ShowSalary from "../Components/ShowSalary/ShowSalary";
import ManagerSettingPage from "./ManagerSettingBasicPage";
import EmployeeListPage from "./EmployeeListPage";
import MenuBar from "../Components/MenuBar";
import { useEffect, useState } from "react";
import { get, getDatabase, ref } from "firebase/database";
import { useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";
import MyCalendar from "../Components/Calendar/MyCalendar";
import ShowCalendarPage from "./ShowCalendarPage";
import { Divider } from "@mui/material";
import { useNavigate, useMatch } from "react-router-dom";
const paymentMethods = {
  monthlyPay: "월급 지급",
  dailyPay: "일급 지급",
  hourPay: "시급 지급",
};
const CompanyMain = ({ companyLogo }) => {
  const navigate = useNavigate();
  const { currentUser, userType } = useSelector((state) => state.user);
  const [currentCompany, setCurrentCompany] = useState();
  const [jobName, setJobName] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const { darkMode } = useSelector((state) => state.darkmodeSlice);
  const [userpaytype, setUserpaytype] = useState("");

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
        `companyCode/${currentUser?.photoURL}/users/${currentUser?.uid}/`
      );
      const snapshot = await get(dbRef);
      const userSnapshot = await get(jobNameRef);
      if (snapshot.val() && userSnapshot.val()) {
        setCurrentCompany(snapshot.val());
        setJobName(userSnapshot.val().jobName);
        setUserpaytype(userSnapshot.val().salaryType);
      }
      setIsLoading(false);
    }
    getCompanyInfo();
    return () => {
      setCurrentCompany([]);
    };
  }, [currentUser?.photoURL, currentUser?.uid]);

  // 관리자 일때
  if (userType === "admin") {
    return (
      <div
        className="flex justify-center items-center"
        style={{
          height: "calc(100vh - 18rem)",
          borderBottom: !darkMode
            ? "1px solid #00000080"
            : "1px solid #FFFFFF80",
        }}>
        <div className="relative flex items-center h-full w-full">
          <div
            className="flex flex-col items-center justify-center gap-7 cursor-pointer"
            style={{ position: "absolute", left: "30%", top: "10%" }}>
            <div
              className="bg-gradient-to-b from-black to-transparent w-80 h-80 rounded-full"
              onClick={() =>
                navigate(`/${currentUser?.photoURL}/employeelist`)
              }></div>
            <div className="font-black text-lg">PEOPLE</div>
            <div className="font-normal text-xs">
              직원 리스트와 요약 보기 및 정산
            </div>

            <div
              className="flex flex-col items-center justify-center gap-7 cursor-pointer z-9"
              style={{ position: "absolute", left: "65%" }}>
              <div
                className="w-80 h-80 rounded-full "
                onClick={() => navigate(`/${currentUser?.photoURL}/datecheck`)}
                style={{ backgroundColor: "#B8B8B84D" }}></div>
              <div className="font-black text-lg">CALENDAR</div>
              <div className="font-normal text-xs">직원 달력 별 보기</div>

              <div
                className="flex flex-col items-center justify-center gap-7 cursor-pointer z-10"
                style={{ position: "absolute", left: "65%" }}
                onClick={() => navigate(`/${currentUser?.photoURL}/setting`)}>
                <div className="bg-gradient-to-b from-gray-300 to-transparent w-80 h-80 rounded-full "></div>
                <div className="font-black text-lg">SETTING</div>
                <div className="font-normal text-xs">
                  공휴일 설정 및 근태 관리
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <div className="flex flex-col gap-16">
          <div className="flex flex-col items-center gap-4">
            <img
              src={companyLogo}
              alt="회사로고"
              className="rounded-full w-[130px] h-[130px]"
            />
            <div className="font-black text-base">
              {currentCompany?.companyName}
            </div>
            <div className="flex items-center text-xs">
              {currentUser?.displayName}/{jobName}
            </div>
          </div>
          <div className="flex flex-col items-center gap-4">
            <div className="h-[1px] w-full bg-white-border-sub dark:bg-dark-border-sub"></div>
            <div
              className="flex flex-row justify-between w-full items-center cursor-pointer text-sm"
              onClick={() => navigate(`/${currentUser.photoURL}/calendar`)}>
              <div>캘린더 바로가기</div>
              <div>&gt;</div>
            </div>
            <div className="h-[1px] w-full bg-white-border-sub dark:bg-dark-border-sub"></div>
            <div className="flex flex-row justify-between w-full items-center text-sm">
              <div>급여 지급/계산 방식</div>
              <div>{paymentMethods[userpaytype]}</div>
            </div>
            <div className="h-[1px] w-full bg-white-border-sub dark:bg-dark-border-sub"></div>
            {userType === "employee" && (
              <ShowSalary matchCalendar={matchCalendar} matchHome={matchHome} />
            )}
            <div className="h-[1px] w-full bg-white-border-sub dark:bg-dark-border-sub"></div>
            <div
              className="cursor-pointer text-lg font-extrabold flex justify-center items-center pb-5"
              onClick={() => navigate(`/${currentUser.photoURL}/camera`)}>
              QR SCAN
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default CompanyMain;
