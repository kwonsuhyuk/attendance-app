import { useState, useEffect, useRef, useMemo } from "react";
import moment from "moment/moment.js";
import { get, getDatabase, ref } from "firebase/database";
import { useSelector } from "react-redux";
import "./DateCheckPage.css";
import Calendar from "react-calendar";
import { useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import GuidePopover from "../Components/GuidePopover";
import { Button, DatePicker, Modal } from "antd";
const paymentMethods = {
  monthlyPay: "월급 지급",
  dailyPay: "일급 지급",
  hourPay: "시급 지급",
};
("react");
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import { formatMoney } from "../util/formatMoney";
import { toast } from "react-toastify";
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

const { RangePicker } = DatePicker;

const DateCheckPage = ({ modalDefaultValue, nightPay, holidayPay }) => {
  const [modalDates, setModalDates] = useState([
    dayjs().subtract(1, "month").date(modalDefaultValue),
    dayjs().subtract(1, "day"),
  ]);
  const [date, setDate] = useState(dayjs());
  const [workTimes, setWorkTimes] = useState({});
  const { currentUser } = useSelector((state) => state.user);
  const companyCode = currentUser?.photoURL; //회사 코드
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const { darkMode } = useSelector((state) => state.darkmodeSlice);
  const [isLoading, setIsLoading] = useState(false);
  const [workDates, setWorkDates] = useState({});
  const [user, setUser] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const [salaryInfo, setSalaryInfo] = useState(null);

  useEffect(() => {
    async function getuserinfo() {
      setIsLoading(true);
      const db = getDatabase();
      const dbRef = ref(db, `companyCode/${currentUser?.photoURL}/users/${id}`);
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
  }, [currentUser?.photoURL, id]);

  useEffect(() => {
    const db = getDatabase();
    const dateRef1 = ref(
      db,
      `companyCode/${companyCode}/users/${user?.uid}/date`
    );
    const dateRef2 = ref(
      db,
      `companyCode/${companyCode}/users/${user?.uid}/workDates`
    );

    Promise.all([get(dateRef1), get(dateRef2)]).then(
      ([dateSnapshot1, dateSnapshot2]) => {
        if (dateSnapshot1.exists()) {
          const dates = dateSnapshot1.val();
          let newWorkTimes = {};
          for (let date in dates) {
            const { startTime, endTime } = dates[date];
            const start = new Date(startTime);
            const end = new Date(endTime);
            const workHours = Math.floor(Math.abs(end - start) / 36e5);
            const workMinutes = Math.round(
              (Math.abs(end - start) % 36e5) / 60000
            );
            newWorkTimes[date] = { workHours, workMinutes, startTime, endTime };
          }
          setWorkTimes(newWorkTimes);
        }

        if (dateSnapshot2.exists()) {
          const workDates = dateSnapshot2.val();
          setWorkDates(workDates);
        }
      }
    );
  }, [companyCode, user?.uid]);

  const tileContent = ({ date, view }) => {
    // Month view에 대해서만 커스텀 컨텐트를 제공합니다.
    if (view === "month") {
      const workTime = workTimes[dayjs(date).format("YYYY-MM-DD")];

      // If workTime exists for the date
      if (workTime) {
        const { workHours, workMinutes } = workTime;
        // 각 날짜에 대한 근무 시간, 시작 시간, 종료 시간을 반환합니다.
        return (
          <div className="text-base px-5 py-7 h-full flex items-center justify-center">
            <span
              className="bg-gray-700 text-white text-xs w-full"
              style={{ borderRadius: "10px" }}>
              {workHours}시간 {workMinutes}분
            </span>
          </div>
        );
      } else {
        // If workTime does not exist for the date
        return (
          <p className="text-xl px-5 py-7 h-full flex items-center justify-center"></p>
        );
      }
    }
  };

  const tileClassName = ({ date, view }) => {
    if (view === "month") {
      return `${darkMode ? "text-white" : "text-black"}`;
    }
  };

  const handleDateSelect = (date) => {
    setSelectedDate(dayjs(date));
  };

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

  const onChange = (date) => {
    setDate(date);
  };

  const handleOpenSettleModal = () => {
    if (user) {
      setIsModalOpen(true);
    } else {
      toast.error("정산할 직원을 선택해 주세요.");
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSalaryInfo(null);
  };

  const calculateSalary = () => {
    // 선택한 기간 내에 있는 workdates를 필터링합니다.
    const filteredWorkdates = Object.entries(workDates).filter(
      ([date]) =>
        dayjs(date).isSameOrBefore(modalDates[1]) &&
        dayjs(date).isSameOrAfter(modalDates[0])
    );

    console.log(filteredWorkdates);

    // 필터링된 workDates 대해 주간, 야간, 공휴일 시간을 계산합니다.
    let totalDayHours = 0;
    let totalNightHours = 0;
    let totalHolidayHours = 0;

    let totalDaySalary = 0;
    let totalNightSalary = 0;
    let totalHolidaySalary = 0;

    filteredWorkdates.forEach(([date, workDates]) => {
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
    });

    const totalSalary = totalDaySalary + totalNightSalary + totalHolidaySalary;

    setSalaryInfo({
      totalDayHours,
      totalNightHours,
      totalHolidayHours,
      totalDaySalary,
      totalNightSalary,
      totalHolidaySalary,
      totalSalary,
    });
  };
  console.log(user);
  // const handleModalDateChange = (dates, dateStrings) => {
  //   console.log(dates, dateStrings);
  // };

  return (
    <div
      className="pb-10 px-3"
      style={{
        height: "calc(100vh - 10rem)",
        marginBottom: "3rem",
        position: "relative",
        justifyContent: "flex-start",
        overflowY: "scroll",
        overflowX: "hidden",
        borderBottom: !darkMode ? "1px solid #00000080" : "1px solid #FFFFFF80",
      }}>
      <div
        className="grid h-full gap-7 place-content-start"
        style={{ gridTemplateColumns: "80fr 23fr" }}>
        <div className="h-full w-full">
          <div className="flex justify-between items-end font-bold pl-3">
            <div
              className="text-xl flex items-center cursor-pointer underline"
              onClick={() =>
                navigate(`/${currentUser?.photoURL}/employeelist`)
              }>
              직원 리스트로 가기
              <ArrowForwardIcon />{" "}
            </div>
            <GuidePopover text="이 페이지는 직원 상세보기 및 정산을 할 수 있는 페이지 입니다. 직원 리스트 에서 직원을 선택해서 직원의 근무 시간 확인 및 정산을 할 수 있습니다." />
            <div className="text-7xl">
              {selectedDate && selectedDate?.month() + 1}{" "}
              <span className="text-xs">月</span>
            </div>
          </div>
          <div
            style={{
              height: "90%",
              border: !darkMode ? "1px solid #00000080" : "1px solid #FFFFFF80",
            }}>
            <Calendar
              onChange={onChange}
              value={date}
              onClickDay={handleDateSelect}
              tileClassName={tileClassName}
              tileContent={tileContent}
              className={`h-full transition-all duration-500 ease-in-out overflow-hidden ${
                darkMode ? "text-white bg-dark-bg" : "text-black bg-white-bg"
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
            className="w-full flex flex-col gap-7"
            style={{
              height: "90%",
            }}>
            <div
              className="w-full h-5/6 flex flex-col gap-12 py-7"
              style={{
                backgroundColor: darkMode ? "#363636" : "#D6D6D6",
                border: !darkMode
                  ? "1px solid #00000080"
                  : "1px solid #FFFFFF80",
              }}>
              {user ? (
                <div className="flex flex-col px-5 gap-3">
                  <div className="flex justify-between w-full text-sm items-center">
                    <div className="text-xl font-semibold">{user?.name}</div>
                    <div>{user?.jobName}</div>
                  </div>
                  <div className="h-[1px] w-full bg-white-border dark:bg-dark-border"></div>
                  <div className="flex justify-between w-full text-sm">
                    <div className="font-semibold">급여 지급/계산 방법</div>
                    <div>
                      {user?.salaryType && paymentMethods[user.salaryType]}
                    </div>
                  </div>
                  <div className="h-[1px] w-full bg-white-border dark:bg-dark-border"></div>
                  <div className="flex justify-between w-full text-sm">
                    <div className="font-semibold">기본 설정 급여</div>
                    <div>{user?.salaryAmount && user.salaryAmount}</div>
                  </div>
                  <div className="h-[1px] w-full bg-white-border dark:bg-dark-border"></div>
                </div>
              ) : (
                <div className="flex justify-center items-center font-light h-full w-full text-center leading-7">
                  PEOPLE 페이지에서 <br />
                  직원 상세정보&정산 버튼을 통해 직원을 선택하세요.
                </div>
              )}

              {selectedDate && user && (
                <div className="flex flex-col px-5 gap-3">
                  <h2 className="text-xl font-bold">
                    {selectedDate.month() + 1}월 {selectedDate.date()}일의
                    근무기록
                  </h2>
                  <div className="h-[1px] w-full bg-white-border dark:bg-dark-border"></div>
                  <div className="flex justify-between w-full text-sm">
                    <div>출근 시간</div>
                    <div>
                      {workTimes[selectedDate.format("YYYY-MM-DD")]
                        ? new Date(
                            workTimes[
                              selectedDate.format("YYYY-MM-DD")
                            ].startTime
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
                  <div className="flex justify-between w-full text-sm">
                    <div>퇴근 시간</div>
                    <div>
                      {workTimes[selectedDate.format("YYYY-MM-DD")]
                        ? new Date(
                            workTimes[selectedDate.format("YYYY-MM-DD")].endTime
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
                  <div className="flex justify-between w-full text-sm">
                    <div>근무 시간</div>
                    <div>
                      {workTimes[selectedDate.format("YYYY-MM-DD")]
                        ?.workHours || 0}
                      시간{" "}
                      {workTimes[selectedDate.format("YYYY-MM-DD")]
                        ?.workMinutes || 0}
                      분
                    </div>
                  </div>
                  <div className="h-[1px] w-full bg-white-border dark:bg-dark-border"></div>
                  <div className="flex justify-between w-full text-sm">
                    <div>급여 지급 구분</div>
                    <div>
                      {workDates[selectedDate?.format("YYYY-MM-DD")] &&
                        Object.keys(
                          workDates[selectedDate?.format("YYYY-MM-DD")]
                        )?.map((key, index) => {
                          if (
                            workDates[selectedDate?.format("YYYY-MM-DD")][key] >
                              0 &&
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
                        })}
                    </div>
                  </div>

                  <div className="h-[3px] w-full bg-white-border dark:bg-dark-border"></div>
                  <div className="flex justify-between w-full text-base font-semibold">
                    <div>오늘 급여</div>
                    {/* 데이터 불러와지면 여기에 삽입 */}
                    <div>
                      {workDates[selectedDate?.format("YYYY-MM-DD")] &&
                        Object.keys(
                          workDates[selectedDate?.format("YYYY-MM-DD")]
                        )?.map((key, index) => {
                          if (
                            workDates[selectedDate?.format("YYYY-MM-DD")][key] >
                              0 &&
                            key != "workHour"
                          ) {
                            return (
                              <div key={index}>
                                {
                                  workDates[selectedDate?.format("YYYY-MM-DD")][
                                    key
                                  ]
                                }
                              </div>
                            );
                          }
                        })}
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div
              className="w-full h-1/6 text-xl font-bold flex justify-center items-center text-white dark:text-black bg-black dark:bg-white cursor-pointer"
              onClick={handleOpenSettleModal}>
              {user ? "이번달 직원 정산하기" : "직원을 선택해 주세요."}
            </div>

            <Modal
              title={`${user?.name}/${user?.jobName}의 이번달 정산`}
              open={isModalOpen}
              onCancel={handleCancel}
              cancelText="닫기"
              footer={[
                <Button key="back" onClick={handleCancel}>
                  닫기
                </Button>,
              ]}>
              <div className="flex flex-col">
                <RangePicker
                  defaultValue={modalDates}
                  onChange={(dates) => {
                    setModalDates(dates);
                  }}
                />
                <div className="text-xs">
                  (시작 날 당일 부터 끝나는 날 당일 까지 계산합니다.)
                </div>
                <Button
                  key="calculate"
                  onClick={calculateSalary}
                  className="mt-7 mb-7">
                  정산하기
                </Button>

                {salaryInfo && (
                  <div
                    className="text-black"
                    style={{
                      padding: 5,
                    }}>
                    <div className="flex flex-col" style={{ height: "auto" }}>
                      <div
                        className="flex justify-between items-center py-3"
                        style={{
                          borderTop: "2px solid black",
                          borderBottom: "2px solid black",
                        }}>
                        <div>
                          <strong className="text-xl font-bold">총 급여</strong>
                        </div>
                        <div className="text-red-500 font-bold text-base">
                          {formatMoney(salaryInfo.totalSalary)} 원
                        </div>
                      </div>
                      <div className="grid grid-cols-4 my-3">
                        <div>
                          <strong className="text-xl font-bold">
                            시간 타입
                          </strong>
                        </div>
                        <div>
                          <strong className="text-xl font-bold">
                            근무 시간
                          </strong>
                        </div>
                        <div>
                          <strong className="text-xl font-bold">
                            설정 급여
                          </strong>
                        </div>
                        <div>
                          <strong className="text-xl font-bold">급여</strong>
                        </div>
                      </div>
                      <div className="w-full h-[1px] bg-black"></div>
                      <div className="grid grid-cols-4 my-3">
                        <div>주간</div>
                        <div>{salaryInfo.totalDayHours} 시간</div>
                        <div>{formatMoney(user?.salaryAmount)}원</div>
                        <div>{formatMoney(salaryInfo.totalDaySalary)}원</div>
                      </div>
                      <div className="w-full h-[1px] bg-gray-300"></div>
                      <div className="grid grid-cols-4 my-3">
                        <div>야간</div>
                        <div>{salaryInfo.totalNightHours} 시간</div>
                        <div className="flex flex-col">
                          <span>
                            {formatMoney(user?.salaryAmount * nightPay)}원
                          </span>
                          <span className="text-xs font-thin">
                            ({user?.salaryAmount}원 x {nightPay})
                          </span>
                        </div>
                        <div>{formatMoney(salaryInfo.totalNightSalary)}원</div>
                      </div>
                      <div className="w-full h-[1px] bg-gray-300"></div>
                      <div className="grid grid-cols-4 my-3">
                        <div>공휴일</div>
                        <div>{salaryInfo.totalHolidayHours} 시간</div>
                        <div className="flex flex-col">
                          <span>
                            {formatMoney(user?.salaryAmount * holidayPay)}원
                          </span>
                          <span className="text-xs font-thin">
                            ({user?.salaryAmount}원 x {holidayPay})
                          </span>
                        </div>
                        <div>
                          {formatMoney(salaryInfo.totalHolidaySalary)}원
                        </div>
                      </div>
                      <div className="w-full h-[1px] bg-gray-300"></div>
                      <div
                        className="flex justify-between items-center py-3"
                        style={{
                          borderTop: "1px solid black",
                          borderBottom: "2px solid black",
                        }}>
                        <div>
                          <strong className="text-xl font-bold">총 시간</strong>
                        </div>
                        <div>
                          {salaryInfo.totalDayHours +
                            salaryInfo.totalNightHours +
                            salaryInfo.totalHolidayHours}{" "}
                          시간
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DateCheckPage;
