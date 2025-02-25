import { useState, useEffect } from "react";
import { get, getDatabase, ref, update } from "firebase/database";
import { useSelector } from "react-redux";
import "./DateCheckPage.css";
import Calendar from "react-calendar";
import { useNavigate, useParams } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Button, DatePicker, Input, Modal } from "antd";
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import { formatMoney } from "../../util/formatMoney.util";
import { toast } from "react-toastify";
import convertTime from "@/util/formatTime.util";
import { useTour } from "@reactour/tour";
import Loading from "@/components/common/Loading";
import {
  DATE_CHECK_STEPS1,
  DATE_CHECK_STEPS2,
  DATE_CHECK_STEPS3,
  DATE_CHECK_STEPS4,
  DATE_CHECK_STEPS5,
} from "@/constants/tourStep";
import { useUserStore } from "@/store/user.store";
import { useCompanyStore } from "@/store/company.store";
import { useShallow } from "zustand/shallow";

dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

const { RangePicker } = DatePicker;

const paymentMethods = {
  monthlyPay: "월급 지급",
  dailyPay: "일급 지급",
  hourPay: "시급 지급",
};

const DateCheckPage = () => {
  const [date, setDate] = useState(dayjs());
  const [workTimes, setWorkTimes] = useState({});
  const { nightPay, holidayPay, holidayList, paycheckDay } = useCompanyStore(
    useShallow(state => ({
      paycheckDay: state.currentCompany?.payCheckDay,
      nightPay: state.currentCompany?.isNightPay,
      holidayPay: state.currentCompany?.holidayPay,
      holidayList: state.currentCompany?.holidayList,
    })),
  );
  const [modalDates, setModalDates] = useState([
    dayjs().subtract(1, "month").date(paycheckDay),
    dayjs().subtract(1, "day"),
  ]);
  const companyCode = useUserStore(state => state.currentUser?.companyCode);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const { darkMode } = useSelector(state => state.darkmodeSlice);
  const [isLoading, setIsLoading] = useState(false);
  const [workDates, setWorkDates] = useState({});
  const [user, setUser] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const [salaryInfo, setSalaryInfo] = useState(null);
  const { isOpen, setCurrentStep, setSteps } = useTour();
  const [isVacationModalOpen, setIsVacationModalOpen] = useState(false);
  const [addVacationDates, setAddVacationDates] = useState();
  const [vacationDates, setVacationDates] = useState();
  const [addVacationMemo, setAddVacationMemo] = useState("");

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        setCurrentStep(0);
        setSteps(DATE_CHECK_STEPS1);
      }, 300);

      return () => {
        clearTimeout(timer), setSteps([]);
      };
    }
  }, [isOpen, setCurrentStep, setSteps]);

  useEffect(() => {
    async function getuserinfo() {
      setIsLoading(true);
      const db = getDatabase();
      const dbRef = ref(db, `companyCode/${companyCode}/users/${id}`);
      const snapshot = await get(dbRef);
      if (snapshot.val()) {
        setUser(snapshot.val());
      }
      setIsLoading(false);
    }
    getuserinfo();
    return () => {
      setUser([]);
    };
  }, [companyCode, id]);

  useEffect(() => {
    const db = getDatabase();
    const dateRef1 = ref(db, `companyCode/${companyCode}/users/${user?.uid}/date`);
    const dateRef2 = ref(db, `companyCode/${companyCode}/users/${user?.uid}/workDates`);

    const dateRef3 = ref(db, `companyCode/${companyCode}/users/${user?.uid}/vacationDates`);

    Promise.all([get(dateRef1), get(dateRef2), get(dateRef3)]).then(
      ([dateSnapshot1, dateSnapshot2, dateSnapshot3]) => {
        if (dateSnapshot1.exists()) {
          const dates = dateSnapshot1.val();
          let newWorkTimes = {};
          for (let date in dates) {
            const { startTime, endTime } = dates[date];
            const start = new Date(startTime);
            const end = new Date(endTime);
            const workHours = Math.floor(Math.abs(end - start) / 36e5);
            const workMinutes = Math.round((Math.abs(end - start) % 36e5) / 60000);
            newWorkTimes[date] = { workHours, workMinutes, startTime, endTime };
          }
          setWorkTimes(newWorkTimes);
        }

        if (dateSnapshot2.exists()) {
          const workDates = dateSnapshot2.val();
          setWorkDates(workDates);
        }
        if (dateSnapshot3.exists()) {
          setVacationDates(dateSnapshot3.val());
        }
      },
    );
  }, [companyCode, user?.uid]);

  useEffect(() => {
    return () => {
      setSalaryInfo([]);
    };
  }, []);

  const tileContent = ({ date, view }) => {
    // Month view에 대해서만 커스텀 컨텐트를 제공합니다.
    if (view === "month") {
      const workTime = workTimes[dayjs(date).format("YYYY-MM-DD")];

      // vacationDates 객체가 정의되어 있지 않거나 undefined인 경우를 대비한 안전한 접근 방식
      const isVacation = vacationDates
        ? vacationDates[dayjs(date).format("YYYY-MM-DD")] || false
        : false;

      // 휴가일 경우
      if (isVacation) {
        return (
          <div className="flex h-full items-center justify-center px-5 py-5 text-base">
            <span
              className="w-full bg-red-500 p-1 text-xs text-white"
              style={{ borderRadius: "10px" }}
            >
              휴가
            </span>
          </div>
        );
      }

      // If workTime exists for the date
      if (workTime) {
        if (workTime.startTime == "외근") {
          return (
            <div className="flex h-full items-center justify-center px-5 py-5 text-base">
              <span
                className="w-full bg-blue-300 p-1 text-xs text-white"
                style={{ borderRadius: "10px" }}
              >
                외근
              </span>
            </div>
          );
        }
        const { workHours, workMinutes } = workTime;

        // 각 날짜에 대한 근무 시간, 시작 시간, 종료 시간을 반환합니다.
        return (
          <div className="flex h-full items-center justify-center px-5 py-5 text-base">
            <span
              className="w-full bg-gray-700 p-1 text-xs text-white"
              style={{ borderRadius: "10px" }}
            >
              {workHours > 9 ? workHours - 1 : workHours}시간 {workMinutes}분
            </span>
          </div>
        );
      } else {
        // If workTime does not exist for the date
        return <p className="flex h-full items-center justify-center px-5 py-7 text-xl"></p>;
      }
    }
  };

  const tileClassName = ({ view, date }) => {
    const dateString = date.toLocaleDateString("fr-CA"); // 날짜를 "YYYY-MM-DD" 형식의 문자열로 변환

    if (
      holidayList &&
      view === "month" &&
      (date.getDay() === 0 || date.getDay() === 6 || holidayList[dateString])
    ) {
      return "weekend";
    }

    if (view === "month") {
      return `${darkMode ? "text-white" : "text-black"}`;
    }
  };

  const handleDateSelect = date => {
    setSelectedDate(dayjs(date));
    if (isOpen) {
      setCurrentStep(2);
      setSteps(prev => [...prev, DATE_CHECK_STEPS2]);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  const onChange = date => {
    setDate(date);
  };

  const handleOpenSettleModal = () => {
    if (isOpen) {
      setIsModalOpen(true);
      setTimeout(() => {
        setCurrentStep(0);
        setSteps(DATE_CHECK_STEPS3);
      }, 300);
    }
    if (user) {
      setIsModalOpen(true);
    } else {
      toast.error("정산할 직원을 선택해 주세요.");
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSalaryInfo(null);
    if (isOpen) {
      setCurrentStep(0);
      setSteps(DATE_CHECK_STEPS5);
    }
  };

  const handleVacationCancel = () => {
    setIsVacationModalOpen(false);
  };

  const handleVacationSubmit = async () => {
    const db = getDatabase();
    const dbRef = ref(db, `companyCode/${companyCode}/users/${user?.uid}/vacationDates`);

    // addVacationDates의 첫 번째와 두 번째 요소를 시작일과 끝일로 사용
    const startDate = dayjs(addVacationDates[0]);
    const endDate = dayjs(addVacationDates[1]);

    const updates = {};
    let currentDate = startDate;

    while (currentDate.isBefore(endDate.add(1, "day"))) {
      const formattedDate = currentDate.format("YYYY-MM-DD");
      updates[formattedDate] = addVacationMemo; // 날짜를 키로 하여 true 값을 설정
      currentDate = currentDate.add(1, "day"); // 다음 날짜로 이동
    }

    try {
      await update(dbRef, updates); // 생성된 업데이트 객체를 사용하여 Firebase에 일괄 업데이트
      setIsVacationModalOpen(false); // 모달 닫기
      setAddVacationDates([]);
      setAddVacationMemo("");
      window.location.reload();
    } catch (error) {
      setAddVacationDates([]);
      setAddVacationMemo("");
    }
  };

  const calculateSalary = () => {
    if (isOpen) {
      setTimeout(() => {
        setCurrentStep(3);
        setSteps(prev => [...prev, DATE_CHECK_STEPS4]);
      }, 300);
    }
    // 선택한 기간 내에 있는 workdates를 필터링합니다.
    const filteredWorkdates = Object.entries(workDates).filter(
      ([date]) =>
        dayjs(date).isSameOrBefore(modalDates[1]) && dayjs(date).isSameOrAfter(modalDates[0]),
    );

    // 필터링된 workDates 대해 주간, 야간, 공휴일 시간을 계산합니다.
    let totalDayHours = 0;
    let totalNightHours = 0;
    let totalHolidayHours = 0;

    let totalDaySalary = 0;
    let totalNightSalary = 0;
    let totalHolidaySalary = 0;

    let totalOutJob = 0;
    let totalWorkHour = 0;

    filteredWorkdates.forEach(([dates, workDates]) => {
      if (workDates.workHour == "외근") {
        totalOutJob++;
      } else {
        if (workDates.daySalary > 0) {
          totalDayHours += workDates.workHour;
          totalDaySalary += workDates.daySalary;
        }
        if (workDates.nightSalary > 0) {
          totalNightHours += workDates.workHour;
          totalNightSalary += workDates.nightSalary;
        }
        if (workDates.holidayAndWeekendSalary > 0) {
          totalHolidayHours += workDates.workHour;
          totalHolidaySalary += workDates.holidayAndWeekendSalary;
        }
        if (workDates.workHour > 9) {
          totalWorkHour += workDates.workHour - 1;
        } else {
          totalWorkHour += workDates.workHour;
        }
      }
    });

    const totalSalary = totalDaySalary + totalNightSalary + totalHolidaySalary;

    setSalaryInfo({
      totalWorkHour,
      totalOutJob,
      totalDayHours,
      totalNightHours,
      totalHolidayHours,
      totalDaySalary,
      totalNightSalary,
      totalHolidaySalary,
      totalSalary,
    });
  };

  return (
    <div
      className="px-3 pb-10"
      style={{
        height: "calc(100vh - 10rem)",
        marginBottom: "3rem",
        position: "relative",
        justifyContent: "flex-start",
        overflowY: "auto",
        overflowX: "hidden",
        borderBottom: !darkMode ? "1px solid #00000080" : "1px solid #FFFFFF80",
      }}
    >
      <div
        data-tour="step-9"
        className="grid h-full place-content-start gap-7"
        style={{ gridTemplateColumns: "80fr 23fr" }}
      >
        <div className="h-full w-full">
          <div className="flex items-end justify-between font-bold">
            <div
              style={{ borderRadius: "10px" }}
              className="flex cursor-pointer items-center p-3 text-xl underline"
              onClick={() => navigate(`/${companyCode}/employeelist`)}
            >
              직원 리스트로 가기
              <ArrowForwardIcon />{" "}
            </div>
            <div
              style={{ borderRadius: "10px" }}
              className="flex cursor-pointer items-center p-3 text-xl underline"
              onClick={() => setIsVacationModalOpen(true)}
            >
              직원 휴가 등록
            </div>

            <div className="text-7xl">
              {selectedDate && selectedDate?.month() + 1} <span className="text-xs">月</span>
            </div>
          </div>
          <div
            data-tour="step-10"
            style={{
              height: "90%",
              border: !darkMode ? "1px solid #00000080" : "1px solid #FFFFFF80",
            }}
          >
            <Calendar
              onChange={onChange}
              value={date}
              onClickDay={handleDateSelect}
              tileClassName={tileClassName}
              tileContent={tileContent}
              className={`h-full overflow-hidden transition-all duration-500 ease-in-out ${
                darkMode ? "bg-dark-bg text-white" : "bg-white-bg text-black"
              }`}
            />
          </div>
        </div>
        <div className="h-full w-full">
          <div className="text-end text-7xl font-bold">
            {selectedDate?.date()}
            <span className="text-xs">日</span>
          </div>
          <div
            className="flex w-full flex-col gap-7"
            style={{
              height: "90%",
            }}
          >
            <div
              className="flex h-5/6 w-full flex-col gap-12 py-7"
              data-tour="step-11"
              style={{
                backgroundColor: darkMode ? "#363636" : "#D6D6D6",
                border: !darkMode ? "1px solid #00000080" : "1px solid #FFFFFF80",
              }}
            >
              {user ? (
                <div className="flex flex-col gap-3 px-5">
                  <div className="flex w-full items-center justify-between text-sm">
                    <div className="text-xl font-semibold">{user?.name}</div>
                    <div>{user?.jobName}</div>
                  </div>
                  <div className="h-[1px] w-full bg-white-border dark:bg-dark-border"></div>
                  <div className="flex w-full justify-between text-sm">
                    <div className="font-semibold">급여 지급/계산 방법</div>
                    <div>{user?.salaryType && paymentMethods[user.salaryType]}</div>
                  </div>
                  <div className="h-[1px] w-full bg-white-border dark:bg-dark-border"></div>
                  <div className="flex w-full justify-between text-sm">
                    <div className="font-semibold">기본 설정 급여</div>
                    <div>{user?.salaryAmount && user.salaryAmount}</div>
                  </div>
                  <div className="h-[1px] w-full bg-white-border dark:bg-dark-border"></div>
                </div>
              ) : (
                <div className="flex h-full w-full items-center justify-center text-center font-light leading-7">
                  PEOPLE 페이지에서 <br />
                  직원 상세정보&정산 버튼을 통해 직원을 선택하세요.
                </div>
              )}

              {selectedDate && user && (
                <div className="flex flex-col gap-3 px-5">
                  <h2 className="text-xl font-bold">
                    {selectedDate.month() + 1}월 {selectedDate.date()}일의 근무기록
                  </h2>
                  <div className="h-[1px] w-full bg-white-border dark:bg-dark-border"></div>
                  {vacationDates && vacationDates[dayjs(selectedDate).format("YYYY-MM-DD")] ? (
                    <div className="flex h-48 w-full items-center justify-center text-lg">
                      {vacationDates[dayjs(selectedDate).format("YYYY-MM-DD")]}
                    </div>
                  ) : workTimes[selectedDate.format("YYYY-MM-DD")]?.startTime == "외근" ? (
                    <div className="flex h-48 w-full items-center justify-center text-lg">외근</div>
                  ) : (
                    <>
                      <div className="flex w-full justify-between text-sm">
                        <div>출근 시간</div>
                        <div>
                          {workTimes[selectedDate.format("YYYY-MM-DD")]
                            ? new Date(
                                workTimes[selectedDate.format("YYYY-MM-DD")].startTime,
                              ).toLocaleString("ko-KR", {
                                month: "long",
                                day: "numeric",
                                hour: "numeric",
                                minute: "numeric",
                                second: "numeric",
                                hour12: false,
                              })
                            : "데이터 없음"}
                        </div>
                      </div>

                      <div className="h-[1px] w-full bg-white-border dark:bg-dark-border"></div>
                      <div className="flex w-full justify-between text-sm">
                        <div>퇴근 시간</div>
                        <div>
                          {workTimes[selectedDate.format("YYYY-MM-DD")]
                            ? new Date(
                                workTimes[selectedDate.format("YYYY-MM-DD")].endTime,
                              ).toLocaleString("ko-KR", {
                                month: "long",
                                day: "numeric",
                                hour: "numeric",
                                minute: "numeric",
                                second: "numeric",
                                hour12: false,
                              })
                            : "데이터 없음"}
                        </div>
                      </div>

                      <div className="h-[1px] w-full bg-white-border dark:bg-dark-border"></div>
                      <div className="flex w-full justify-between text-sm">
                        <div>근무 시간</div>
                        <div>
                          {workTimes[selectedDate.format("YYYY-MM-DD")]?.workHours || 0}
                          시간 {workTimes[selectedDate.format("YYYY-MM-DD")]?.workMinutes || 0}분
                        </div>
                      </div>
                      <div className="h-[1px] w-full bg-white-border dark:bg-dark-border"></div>
                      {user?.salaryType && user.salaryType != "monthlyPay" && (
                        <>
                          <div className="flex w-full justify-between text-sm">
                            <div>급여 지급 구분</div>
                            <div>
                              {workDates[selectedDate?.format("YYYY-MM-DD")] &&
                                Object.keys(workDates[selectedDate?.format("YYYY-MM-DD")])?.map(
                                  (key, index) => {
                                    if (
                                      workDates[selectedDate?.format("YYYY-MM-DD")][key] > 0 &&
                                      key != "workHour"
                                    ) {
                                      let displayText = "";
                                      switch (key) {
                                        case "holidayAndWeekendSalary":
                                          displayText = "공휴일 급여";
                                          break;
                                        case "nightSalary":
                                          displayText = "야간 급여";
                                          break;
                                        case "daySalary":
                                          displayText = "주간 급여";
                                          break;
                                      }
                                      return <div key={index}>{displayText}</div>;
                                    }
                                  },
                                )}
                            </div>
                          </div>
                        </>
                      )}

                      <div className="h-[3px] w-full bg-white-border dark:bg-dark-border"></div>
                      {user?.salaryType && user.salaryType == "monthlyPay" ? (
                        <div></div>
                      ) : (
                        <>
                          <div className="flex w-full justify-between text-base font-semibold">
                            <div>오늘 급여</div>
                            {/* 데이터 불러와지면 여기에 삽입 */}
                            <div>
                              {workDates[selectedDate?.format("YYYY-MM-DD")] &&
                                Object.keys(workDates[selectedDate?.format("YYYY-MM-DD")])?.map(
                                  (key, index) => {
                                    if (
                                      workDates[selectedDate?.format("YYYY-MM-DD")][key] > 0 &&
                                      key != "workHour"
                                    ) {
                                      return (
                                        <div key={index}>
                                          {workDates[selectedDate?.format("YYYY-MM-DD")][key]}원
                                        </div>
                                      );
                                    }
                                  },
                                )}
                            </div>
                          </div>
                        </>
                      )}
                    </>
                  )}
                </div>
              )}
            </div>
            <div
              data-tour="step-12"
              className="flex h-1/6 w-full cursor-pointer items-center justify-center bg-black text-xl font-bold text-white dark:bg-white dark:text-black"
              onClick={handleOpenSettleModal}
            >
              {user ? "이번달 직원 정산하기" : "직원을 선택해 주세요."}
            </div>
            {/* 휴가모달 */}
            <Modal
              title={`${user?.name}/${user?.jobName}의 휴가등록`}
              open={isVacationModalOpen}
              onCancel={handleVacationCancel}
              cancelText="닫기"
              footer={[
                <Button key="back" onClick={handleVacationCancel}>
                  닫기
                </Button>,
                <Button key="submit" onClick={handleVacationSubmit}>
                  휴가등록
                </Button>,
              ]}
            >
              <div className="flex flex-col gap-5">
                <RangePicker
                  onChange={dates => {
                    setAddVacationDates(dates);
                  }}
                />
                <div>
                  휴가메모
                  <Input
                    placeholder="ex) 연차"
                    value={addVacationMemo}
                    onChange={e => setAddVacationMemo(e.target.value)}
                  />
                </div>
              </div>
            </Modal>
            {/* 정산모달 */}
            <Modal
              title={`${user?.name}/${user?.jobName}의 이번달 정산`}
              open={isModalOpen}
              onCancel={handleCancel}
              cancelText="닫기"
              footer={[
                <Button key="back" onClick={handleCancel} data-tour="step-17">
                  닫기
                </Button>,
              ]}
            >
              <div className="flex flex-col" data-tour="step-13">
                <RangePicker
                  data-tour="step-14"
                  defaultValue={modalDates}
                  onChange={dates => {
                    setModalDates(dates);
                  }}
                />
                <div className="text-xs">(시작 날 당일 부터 끝나는 날 당일 까지 계산합니다.)</div>
                <Button
                  data-tour="step-15"
                  key="calculate"
                  onClick={calculateSalary}
                  className="mb-7 mt-7"
                >
                  정산하기
                </Button>
                <div
                  data-tour="step-16"
                  className="text-black"
                  style={{
                    padding: 5,
                  }}
                >
                  {salaryInfo && user?.salaryType != "monthlyPay" && (
                    <div className="flex flex-col" style={{ height: "auto" }}>
                      <div
                        className="flex items-center justify-between py-3"
                        style={{
                          borderTop: "2px solid black",
                          borderBottom: "2px solid black",
                        }}
                      >
                        <div>
                          <strong className="text-xl font-bold">총 급여</strong>
                        </div>
                        <div className="text-base font-bold text-red-500">
                          {formatMoney(salaryInfo.totalSalary)} 원
                        </div>
                      </div>
                      <div className="my-3 grid grid-cols-4">
                        <div>
                          <strong className="text-xl font-bold">시간 타입</strong>
                        </div>
                        <div>
                          <strong className="text-xl font-bold">근무 시간</strong>
                        </div>
                        <div>
                          <strong className="text-xl font-bold">설정 급여</strong>
                        </div>
                        <div>
                          <strong className="text-xl font-bold">급여</strong>
                        </div>
                      </div>
                      <div className="h-[1px] w-full bg-black"></div>
                      <div className="my-3 grid grid-cols-4">
                        <div>주간</div>
                        <div>{salaryInfo.totalDayHours?.toFixed(1)} 시간</div>
                        <div>{formatMoney(user?.salaryAmount)}원</div>
                        <div>{formatMoney(salaryInfo.totalDaySalary)}원</div>
                      </div>
                      <div className="h-[1px] w-full bg-gray-300"></div>
                      <div className="my-3 grid grid-cols-4">
                        <div>야간</div>
                        <div>{salaryInfo.totalNightHours?.toFixed(1)} 시간</div>
                        <div className="flex flex-col">
                          <span>{formatMoney(user?.salaryAmount * nightPay)}원</span>
                          <span className="text-xs font-thin">
                            ({user?.salaryAmount}원 x {nightPay})
                          </span>
                        </div>
                        <div>{formatMoney(salaryInfo.totalNightSalary)}원</div>
                      </div>
                      <div className="h-[1px] w-full bg-gray-300"></div>
                      <div className="my-3 grid grid-cols-4">
                        <div>공휴일</div>
                        <div>{salaryInfo.totalHolidayHours?.toFixed(1)} 시간</div>
                        <div className="flex flex-col">
                          <span>{formatMoney(user?.salaryAmount * holidayPay)}원</span>
                          <span className="text-xs font-thin">
                            ({user?.salaryAmount}원 x {holidayPay})
                          </span>
                        </div>
                        <div>{formatMoney(salaryInfo.totalHolidaySalary)}원</div>
                      </div>
                      <div className="h-[1px] w-full bg-gray-300"></div>
                      <div
                        className="flex items-center justify-between py-3"
                        style={{
                          borderTop: "1px solid black",
                          borderBottom: "2px solid black",
                        }}
                      >
                        <div>
                          <strong className="text-xl font-bold">총 외근 횟수</strong>
                        </div>
                        <div>{salaryInfo?.totalOutJob}회</div>
                        <div>
                          <strong className="text-xl font-bold">총 시간</strong>
                        </div>
                        <div>
                          {convertTime(
                            salaryInfo.totalDayHours +
                              salaryInfo.totalNightHours +
                              salaryInfo.totalHolidayHours,
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                  {/* 월급쟁이 */}
                  {salaryInfo && user?.salaryType == "monthlyPay" && (
                    <div className="flex flex-col" style={{ height: "auto" }}>
                      <div
                        className="flex items-center justify-between px-3 py-3"
                        style={{ borderTop: "2px solid black" }}
                      >
                        <div>
                          <strong className="text-xl font-bold">이번 달 급여</strong>
                        </div>
                        <div className="text-base font-bold text-red-500">
                          {user?.salaryAmount && formatMoney(user?.salaryAmount)}원
                        </div>
                      </div>
                      <div
                        className="text-xs"
                        style={{
                          borderBottom: "2px solid black",
                        }}
                      >
                        (월급 직원으로, 설정된 급여로 정산됩니다.)
                      </div>
                      <div
                        className="flex items-center justify-between px-3 py-3"
                        style={{
                          borderBottom: "1px solid black",
                        }}
                      >
                        <div>
                          <strong className="text-xl font-bold">총 외근 횟수</strong>
                        </div>
                        <div>{salaryInfo?.totalOutJob}회</div>
                      </div>
                      <div
                        className="flex items-center justify-between px-3 py-3"
                        style={{
                          borderTop: "1px solid black",
                          borderBottom: "2px solid black",
                        }}
                      >
                        <div>
                          <strong className="text-xl font-bold">총 근무 시간</strong>
                        </div>
                        <div>{convertTime(salaryInfo?.totalWorkHour)}</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DateCheckPage;
