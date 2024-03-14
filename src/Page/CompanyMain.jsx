import "../firebase";
import ShowSalary from "../Components/ShowSalary/ShowSalary";
import { useEffect, useState } from "react";
import { get, getDatabase, ref } from "firebase/database";
import { useSelector } from "react-redux";
import { useNavigate, useMatch } from "react-router-dom";
import { useTour } from "@reactour/tour";
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
  const matchHome = useMatch(`/${currentUser?.photoURL}/companymain`);

  const { isOpen, setCurrentStep, setSteps } = useTour();
  useEffect(() => {
    if (isOpen && userType == "admin") {
      const timer = setTimeout(() => {
        setCurrentStep(0);
        setSteps([
          {
            selector: '[data-tour="step-1"]',
            content: `안녕하세요! Attandance App 에
오신 것을 환영합니다.
사용하시기 전에 간단하게 서비스 이용 가이드를 
안내해드리도록 하겠습니다.`,
          },
          {
            selector: '[data-tour="step-2"]',
            content: "회사의 서비스 들을 이용 할 수 있는 메뉴바 입니다.",
          },
          {
            selector: '[data-tour="step-3"]',
            content:
              "우선 PEOPLE을 클릭하셔서 현재 회사의 직원들을 볼 수 있는 직원테이블 페이지로 이동해주세요",
          },
        ]);
      }, 300);

      return () => {
        clearTimeout(timer), setSteps([]);
      };
    }

    if (isOpen && userType == "employee") {
      const timer = setTimeout(() => {
        setCurrentStep(0);
        setSteps([
          {
            selector: '[data-tour="step-32"]',
            content: `Att-App 을 휴대폰 바탕화면에 등록하셨나요? 그렇다면 빠르게 가이드 진행해드리겠습니다!`,
          },
          {
            selector: '[data-tour="step-33"]',
            content: `우선은 이곳은 HOME 화면으로 이부분은 근무를 하실시 최근 근무를 요약해 주는 공간입니다.`,
          },
          {
            selector: '[data-tour="step-34"]',
            content: `첫번째로 QR을 스캔하여 회사에 출퇴근 하는 방법을 알아 보겠습니다. 아래버튼을 클릭해주세요!`,
          },
        ]);
      }, 300);

      return () => {
        clearTimeout(timer), setSteps([]);
      };
    }
  }, [isOpen, setCurrentStep, setSteps, userType]);

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
    if (window.innerWidth <= 600) {
      return (
        <div className="flex justify-center items-center">
          PC로 접속해주세요.
        </div>
      );
    } else {
      return (
        <div
          data-tour="step-1"
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
                  onClick={() =>
                    navigate(`/${currentUser?.photoURL}/datecheck`)
                  }
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
    }
  } else {
    return (
      <div data-tour="step-32">
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
            <div className="w-full" data-tour="step-33">
              {userType === "employee" && (
                <ShowSalary
                  matchCalendar={matchCalendar}
                  matchHome={matchHome}
                />
              )}
            </div>
            <div className="h-[1px] w-full bg-white-border-sub dark:bg-dark-border-sub"></div>
            <div
              data-tour="step-34"
              className="cursor-pointer text-lg font-extrabold flex justify-center items-center pb-5 underline"
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
