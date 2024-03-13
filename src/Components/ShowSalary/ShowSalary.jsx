import {
  child,
  get,
  getDatabase,
  onValue,
  ref,
  update,
} from 'firebase/database';
import React, { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';
import { useMatch } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';
import SalaryType from '../../util/SalaryType';
import { formatMoney } from '../../util/formatMoney';
import convertTime from '../../util/formatTime';

//import SalaryDay from '../Utils/SalaryDay';

function ShowSalary({ matchCalendar, matchHome }) {
  const [daySalary, setDaySalary] = useState(0);
  const [nightSalary, setNightSalary] = useState(0);
  const [holidayAndWeekendSalary, setHolidayAndWeekendSalary] = useState(0);
  const { currentUser } = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(false);
  const [today, setToday] = useState('');
  const [workHours, setWorkHours] = useState(0);
  const [salaryDay, setSalaryDay] = useState(0);
  const [totalSalaryPay1, setTotalSalaryPay1] = useState(0);
  const [totalSalaryPay2, setTotalSalaryPay2] = useState(0);

  const [totalDayHour1, setTotalDayHours1] = useState(0);
  const [totalDayHour2, setTotalDayHours2] = useState(0);
  const [totalNightHour1, setTotalNightHours1] = useState(0);
  const [totalNightHour2, setTotalNightHours2] = useState(0);
  const [totalHolidayHour1, setTotalHolidayHours1] = useState(0);
  const [totalHolidayHour2, setTotalHolidayHours2] = useState(0);
  const [totalDayPay1, setTotalDayPay1] = useState(0);
  const [totalDayPay2, setTotalDayPay2] = useState(0);
  const [totalNightPay1, setTotalNightPay1] = useState(0);
  const [totalNightPay2, setTotalNightPay2] = useState(0);
  const [totalHolidayPay1, setTotalHolidayPay1] = useState(0);
  const [totalHolidayPay2, setTotalHolidayPay2] = useState(0);
  const [totalWorkHour1, setTotalWorkHour1] = useState(0);
  const [totalWorkHour2, setTotalWorkHour2] = useState(0);

  const companyCode = currentUser?.photoURL; // 회사 코드
  const userId = currentUser?.uid; // 유저 아이디
  const { salaryPayment, monthlyPay } = SalaryType(companyCode, userId);
  //const { salaryDay, totalSalaryPay } = SalaryDay(companyCode, userId);
  const hourlyWage = salaryPayment; // 시급
  const monthlyWage = monthlyPay; //월급인 경우
  const tempoWage = monthlyPay;

  const now = new Date().getDate();

  useEffect(() => {
    const db = getDatabase();
    const dateRef = ref(db, `companyCode/${companyCode}/users/${userId}/date`);
    const nightStartRef = ref(
      db,
      `companyCode/${companyCode}/companyInfo/nightStart`
    );
    const nightEndRef = ref(
      db,
      `companyCode/${companyCode}/companyInfo/nightEnd`
    );
    const holidayListRef = ref(
      db,
      `companyCode/${companyCode}/companyInfo/holidayList`
    );
    const holidayPayRef = ref(
      db,
      `companyCode/${companyCode}/companyInfo/holidayPay`
    );
    const isNightPayRef = ref(
      db,
      `companyCode/${companyCode}/companyInfo/isNightPay`
    );
    const workHourRef = ref(
      db,
      `companyCode/${companyCode}/users/${userId}/workDates/${today}`
    );

    const fetchData = async () => {
      setIsLoading(true);
      const db = getDatabase();
      const salaryDayRef = ref(
        db,
        `companyCode/${companyCode}/companyInfo/payCheckDay`
      );

      const salaryPayRef = ref(
        db,
        `companyCode/${companyCode}/users/${userId}/workDates`
      );

      const salaryDaySnapshot = await get(salaryDayRef);
      if (salaryDaySnapshot.exists()) {
        setSalaryDay(salaryDaySnapshot.val());
      }

      const salaryPaySnapshot = await get(salaryPayRef);

      if (salaryPaySnapshot.exists() && salaryDay > 0) {
        const salaryPays = salaryPaySnapshot.val();
        let totalSalary1 = 0;
        let totalSalary2 = 0;
        let totalDayHours1 = 0;
        let totalNightHours1 = 0;
        let totalHolidayHours1 = 0;

        let totalDaySalary1 = 0;
        let totalNightSalary1 = 0;
        let totalHolidaySalary1 = 0;

        let totalDayHours2 = 0;
        let totalNightHours2 = 0;
        let totalHolidayHours2 = 0;

        let totalDaySalary2 = 0;
        let totalNightSalary2 = 0;
        let totalHolidaySalary2 = 0;

        let totalWorkHour1 = 0;
        let totalWorkHour2 = 0;

        console.log(tempoWage);

        // 저번달 salaryDay부터 이번달 salaryDay - 1일까지의 salary를 합산
        for (let date in salaryPays) {
          const dateObj = new Date(date);

          const today = new Date();

          if (salaryPays[date].workHour == '외근') {
            console.log('외근할래융!');
            continue;
          }

          //salaryDay = 10
          //급여날 지남
          if (
            dateObj.getMonth() === today.getMonth() &&
            dateObj.getDate() >= salaryDay
          ) {
            const {
              workHour,
              daySalary,
              nightSalary,
              holidayAndWeekendSalary,
            } = salaryPays[date];

            if (daySalary > 0) {
              totalDayHours1 += workHour;
              totalDaySalary1 += daySalary;
            }
            if (nightSalary > 0) {
              totalNightHours1 += workHour;

              totalNightSalary1 += nightSalary;
            }
            if (holidayAndWeekendSalary > 0) {
              totalHolidayHours1 += workHour;
              totalHolidaySalary1 += holidayAndWeekendSalary;
            }

            setTotalDayHours1(totalDayHours1);
            setTotalDayPay1(totalDaySalary1);
            setTotalNightHours1(totalNightHours1);
            setTotalNightPay1(totalNightSalary1);
            setTotalHolidayHours1(totalHolidayHours1);
            setTotalHolidayPay1(totalHolidaySalary1);

            totalSalary1 += daySalary + nightSalary + holidayAndWeekendSalary;
            totalWorkHour1 += workHour;
            setTotalWorkHour1(totalWorkHour1);
            setTotalSalaryPay1(totalSalary1);
          }

          //급여날 2월 10일
          //28일 -> 급여날 지남
          // 오늘 기준 이게 맞음
          else if (
            (dateObj.getMonth() === today.getMonth() &&
              dateObj.getDate() < salaryDay) ||
            (dateObj.getMonth() === today.getMonth() - 1 &&
              dateObj.getDate() >= salaryDay)
          ) {
            const {
              workHour,
              daySalary,
              nightSalary,
              holidayAndWeekendSalary,
            } = salaryPays[date];

            if (daySalary > 0) {
              totalDayHours2 += workHour;
              totalDaySalary2 += daySalary;
            }
            if (nightSalary > 0) {
              totalNightHours2 += workHour;

              totalNightSalary2 += nightSalary;
            }
            if (holidayAndWeekendSalary > 0) {
              totalHolidayHours2 += workHour;
              totalHolidaySalary2 += holidayAndWeekendSalary;
            }
            setTotalDayHours2(totalDayHours2);
            setTotalDayPay2(totalDaySalary2);
            setTotalNightHours2(totalNightHours2);
            setTotalNightPay2(totalNightSalary2);
            setTotalHolidayHours2(totalHolidayHours2);
            setTotalHolidayPay2(totalHolidaySalary2);
            totalSalary2 += daySalary + nightSalary + holidayAndWeekendSalary;
            totalWorkHour2 += workHour;
            setTotalWorkHour2(totalWorkHour2);
            setTotalSalaryPay2(totalSalary2);
          }
        }
      }
    };

    Promise.all([
      get(dateRef),
      get(nightStartRef),
      get(nightEndRef),
      get(holidayListRef),
      get(holidayPayRef),
      get(isNightPayRef),
      get(workHourRef),
    ])
      .then(
        async ([
          dateSnapshot,
          nightStartSnapshot,
          nightEndSnapshot,
          holidayListSnapshot,
          holidayPaySnapshot,
          isNightPaySnapshot,
          workHourSnapshot,
        ]) => {
          if (
            dateSnapshot.exists() ||
            nightStartSnapshot.exists() ||
            nightEndSnapshot.exists() ||
            holidayPaySnapshot.exists() ||
            isNightPaySnapshot.exists() ||
            workHourSnapshot.exists()
          ) {
            const dates = dateSnapshot.val();
            const nightStart = nightStartSnapshot.val();
            const nightEnd = nightEndSnapshot.val();
            const holidayList = holidayListSnapshot.val();
            const holidayPay = holidayPaySnapshot.val();
            const isNightPay = isNightPaySnapshot.val();
            const workHours = workHourSnapshot.val().workHour;

            let totalDaySalary = 0;
            let totalNightSalary = 0;
            let totalWeekendOrHolidaySalary = 0;

            function getNextDate(date) {
              let currentDate = new Date(date);
              currentDate.setDate(currentDate.getDate() + 1);

              return currentDate.toISOString().split('T')[0];
            }
            function getPrevDate(dateStr) {
              const date = new Date(dateStr);
              date.setDate(date.getDate() - 1);
              return date.toISOString().split('T')[0];
            }

            let start, end;
            for (let date in dates) {
              const { startTime, endTime } = dates[date];

              if (startTime == '외근' || endTime == '외근') {
                continue;
              }

              if (startTime) {
                start = new Date(startTime);
              } else {
                const prevDay = getPrevDate(date);
                const prevDayRef = ref(
                  db,
                  `companyCode/${companyCode}/users/${userId}/date/${prevDay}`
                );
                const prevDaySnapShot = await get(prevDayRef);
                if (
                  prevDaySnapShot.exists() &&
                  prevDaySnapShot.val().startTime
                ) {
                  start = new Date(prevDaySnapShot.val().startTime);
                } else {
                  console.warn(`${date}의 시작 시간이 없습니다.`);
                }
              }

              if (endTime) {
                end = new Date(endTime);
              } else {
                const nextDay = getNextDate(date);
                const nextDayRef = ref(
                  db,
                  `companyCode/${companyCode}/users/${userId}/date/${nextDay}`
                );
                const nextDaySnapshot = await get(nextDayRef);

                if (nextDaySnapshot.exists() && nextDaySnapshot.val().endTime) {
                  end = new Date(nextDaySnapshot.val().endTime);
                } else {
                  console.warn(
                    `${date}의 퇴근 시간이 없습니다. 아직 퇴근을 하지 않았을 수 있습니다.`
                  );
                }
              }
            }

            //const dateStr = start.toISOString().split('T')[0]; // YYYY-MM-DD 형식
            const offset = start.getTimezoneOffset() * 60000;
            const localTimeDateStr = new Date(start - offset);
            const dateStr = localTimeDateStr.toISOString().slice(0, 10);

            let isHolidayOrWeekend;

            if (holidayList) {
              isHolidayOrWeekend =
                holidayList[dateStr] ||
                start.getDay() === 0 ||
                start.getDay() === 6; // 공휴일 또는 주말인지 확인}
            } else {
              isHolidayOrWeekend = start.getDay() === 0 || start.getDay() === 6; // 공
            }
            let wage = hourlyWage;
            if (hourlyWage) {
              wage = hourlyWage;
            } else {
              wage = tempoWage;
            }
            console.log('wage', tempoWage);
            //console.log('wage', wage);
            const workDateRef = ref(
              db,
              `companyCode/${companyCode}/users/${userId}/workDates`
            );
            const workDateSnapshot = await get(workDateRef);
            const workDates = workDateSnapshot.val();
            let workDate;
            for (workDate in workDates) {
              if (workDate == dateStr) {
                const workHourRef = ref(
                  db,
                  `companyCode/${companyCode}/users/${userId}/workDates/${workDate}`
                );
                const workHourSnapshot = await get(workHourRef);

                setWorkHours(workHourSnapshot.val().workHour);
                setToday(workDate);
                console.log('이건작동함');
              }
            }

            if (isHolidayOrWeekend) {
              if (holidayPay && hourlyWage) {
                wage = hourlyWage * holidayPay;
              } else {
                wage = tempoWage;
                //console.log('wage', wage);
              }
              totalWeekendOrHolidaySalary += wage * workHours;
              setHolidayAndWeekendSalary(totalWeekendOrHolidaySalary);
              console.log('오늘은 공휴일이야');
            } else {
              // 출퇴근 시간이 같은 날에 있으면서, 그 시간이 야간 시간 범위에 포함되는 경우

              if (
                start.getDate() === end.getDate() &&
                ((start.getHours() >= nightStart && start.getHours() < 24) ||
                  (end.getHours() > 0 && end.getHours() <= nightEnd))
              ) {
                if (hourlyWage) {
                  wage = hourlyWage * isNightPay;
                } else {
                  wage = tempoWage;
                  console.log('wage', tempoWage);
                }
                totalNightSalary += wage * workHours;
                console.log('오늘은 22시~24시라서 야간근무야');
                setNightSalary(totalNightSalary);
              } else if (
                start.getDate() === end.getDate() &&
                start.getHours() >= 0 &&
                start.getHours() < end.getHours() &&
                end.getHours() > start.getHours() &&
                end.getHours() <= nightEnd
              ) {
                if (hourlyWage) {
                  wage = hourlyWage * isNightPay;
                } else {
                  wage = tempoWage;
                  console.log('wage', tempoWage);
                }
                totalNightSalary += wage * workHours;
                console.log('오늘은 0시~7시라서 야간근무야');
                setNightSalary(totalNightSalary);
              }
              // 출퇴근 시간이 다른 날에 걸쳐 있는 경우
              else if (start.getDate() !== end.getDate()) {
                if (
                  start.getHours() >= nightStart &&
                  start.getHours() < 24 &&
                  end.getHours() > 0 &&
                  end.getHours() <= nightEnd
                ) {
                  // 출근 시간이 야간 근무 시간에 포함되는 경우
                  if (hourlyWage) {
                    wage = hourlyWage * isNightPay;
                  } else {
                    wage = tempoWage;
                    console.log('wage', tempoWage);
                  }
                  totalNightSalary += wage * workHours;

                  setNightSalary(totalNightSalary);
                }
              } else {
                console.log('오늘은 주간 근무야');
                if (hourlyWage) {
                  wage = hourlyWage;
                } else {
                  wage = tempoWage;
                  console.log('wage', tempoWage);
                }
                totalDaySalary += wage * workHours;
                console.log(totalDaySalary);
                setDaySalary(totalDaySalary);
              }
            }

            if (workHours > 0) {
              await update(workHourRef, {
                workHour: workHours,
                daySalary: totalDaySalary,
                nightSalary: totalNightSalary,
                holidayAndWeekendSalary: totalWeekendOrHolidaySalary,
              });
            }
          }
        }
      )
      .finally(() => {
        setIsLoading(false);
      });

    fetchData();
  }, [companyCode, userId, today, workHours]);

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
      </div>
    );
  }

  return matchHome ? (
    <>
      <div className="flex flex-col justify-between items-center text-sm w-full">
        <div className="flex flex-row justify-between items-center w-full">
          {daySalary > 0 && !monthlyWage && (
            <div className="flex flex-col justify-between items-center space-y-4 w-full">
              <div className="flex flex-row w-full justify-between items-center">
                <div className="flex items-baseline">최근 일한 날짜</div>
                <div className="flex items-baseline">{today}</div>
              </div>
              <div className="h-[1px] w-full bg-white-border-sub dark:bg-dark-border-sub"></div>
              <div className="flex flex-row w-full justify-between  items-center">
                <div className="flex items-start ">최근 근무 형태</div>
                <div className="flex items-baseline">주간</div>
              </div>
              <div className="h-[1px] w-full bg-white-border-sub dark:bg-dark-border-sub"></div>
              <div className="flex flex-row w-full justify-between  items-center">
                <div className="flex items-baseline">해당 급여</div>
                <div className="flex items-baseline">
                  {formatMoney(daySalary)}원
                </div>
              </div>
            </div>
          )}
          {nightSalary > 0 && !monthlyWage && (
            <div className="flex flex-col justify-between items-center space-y-4 w-full">
              <div className="flex flex-row w-full justify-between  items-center">
                <div className="flex items-baseline">최근 일한 날짜</div>
                <div className="flex items-baseline">{today}</div>
              </div>
              <div className="h-[1px] w-full bg-white-border-sub dark:bg-dark-border-sub"></div>
              <div className="flex flex-row w-full justify-between  items-center">
                <div className="flex items-start ">최근 근무 형태</div>
                <div className="flex items-baseline">야간</div>
              </div>
              <div className="h-[1px] w-full bg-white-border-sub dark:bg-dark-border-sub"></div>
              <div className="flex flex-row w-full justify-between  items-center">
                <div className="flex items-baseline">해당 급여</div>
                <div className="flex items-baseline">
                  {formatMoney(nightSalary)}원
                </div>
              </div>
            </div>
          )}
          {holidayAndWeekendSalary > 0 && !monthlyWage && (
            <div className="flex flex-col justify-between items-center space-y-4 w-full">
              <div className="flex flex-row w-full justify-between items-center">
                <div className="flex items-baseline">최근 일한 날짜</div>
                <div className="flex items-baseline">{today}</div>
              </div>
              <div className="h-[1px] w-full bg-white-border-sub dark:bg-dark-border-sub"></div>
              <div className="flex flex-row w-full justify-between items-center">
                <div className="flex items-start ">최근 근무 형태</div>
                <div className="flex items-baseline">공휴일 및 주말</div>
              </div>
              <div className="h-[1px] w-full bg-white-border-sub dark:bg-dark-border-sub"></div>
              <div className="flex flex-row w-full justify-between items-center">
                <div className="flex items-baseline">해당 급여</div>
                <div className="flex items-baseline">
                  {formatMoney(holidayAndWeekendSalary)}원
                </div>
              </div>
            </div>
          )}
          {monthlyWage > 0 && (
            <div className="flex flex-col justify-between items-center space-y-4 w-full">
              <div className="flex flex-row w-full justify-between items-center">
                <div className="flex items-baseline">최근 일한 날짜</div>
                <div className="flex items-baseline">{today}</div>
              </div>
              <div className="h-[1px] w-full bg-white-border-sub dark:bg-dark-border-sub"></div>
              <div className="flex flex-row w-full justify-between items-center">
                <div className="flex items-start ">최근 근무 형태</div>
                <div className="flex items-baseline">월급</div>
              </div>
              <div className="w-full border-b border-solid"></div>
              <div className="flex flex-row w-full justify-between items-center">
                <div className="flex items-baseline">해당 급여</div>
                <div className="flex items-baseline">
                  {formatMoney(monthlyWage)}원
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  ) : matchCalendar ? (
    <>
      {(totalWorkHour1 || totalWorkHour2 || hourlyWage || tempoWage) && (
        <div className="relative w-full h-full overflow-x-auto">
          <div className="py-2 text-base font-bold">이번달 근무내역</div>
          <div className="text-xs pb-1">
            (외근은 포함되지 않습니다. 관리자에게 문의해주세요.)
          </div>
          <table className="w-full text-xs rtl:text-right text-center border-none">
            <thead className="text-xs border-t border-b border-solid border-white-border-sub dark:border-dark-border-sub uppercase">
              <tr>
                <th
                  scope="col"
                  className="pr-6 py-3 border-r border-solid border-white-border-sub dark:border-dark-border-sub text-start"
                >
                  Work
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 border-r border-solid border-white-border-sub dark:border-dark-border-sub text-end"
                >
                  Time
                </th>
                <th scope="col" className="pl-6 py-3 text-end">
                  Pay
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-solid border-white-border-sub dark:border-dark-border-sub">
                <th
                  scope="row"
                  className="pr-6 py-3 font-medium whitespace-nowrap border-r border-solid border-white-border-sub dark:border-dark-border-sub text-start"
                >
                  주간
                </th>
                <td className="px-6 border-r border-solid border-white-border-sub dark:border-dark-border-sub text-end">
                  {now > salaryDay
                    ? `${convertTime(totalDayHour1.toFixed(1))}`
                    : `${convertTime(totalDayHour2.toFixed(1))}`}
                </td>
                <td className="pl-6 py-3 text-end text-nowrap">
                  {monthlyWage
                    ? null
                    : !totalDayPay1 && !totalDayPay2
                    ? '0원'
                    : now > salaryDay
                    ? `${formatMoney(totalDayPay1)}원`
                    : `${formatMoney(totalDayPay2)}원`}
                </td>
              </tr>
              <tr className="border-b border-solid border-white-border-sub dark:border-dark-border-sub">
                <th
                  scope="row"
                  className="pr-6 py-3 font-medium whitespace-nowrap border-r border-solid border-white-border-sub dark:border-dark-border-sub text-start"
                >
                  야간
                </th>
                <td className="px-6 border-r border-solid border-white-border-sub dark:border-dark-border-sub text-end">
                  {now > salaryDay
                    ? `${convertTime(totalNightHour1.toFixed(1))}`
                    : `${convertTime(totalNightHour2.toFixed(1))}`}
                </td>
                <td className="pl-6 py-3 text-end text-nowrap">
                  {monthlyWage > 0
                    ? null
                    : !totalNightPay1 && !totalNightPay2
                    ? '0원'
                    : now > salaryDay
                    ? `${formatMoney(totalNightPay1)}원`
                    : `${formatMoney(totalNightPay2)}원`}
                </td>
              </tr>
              <tr className="border-b border-solid border-white-border-sub dark:border-dark-border-sub">
                <th
                  scope="row"
                  className="pr-6 py-3 font-medium whitespace-nowrap border-r border-solid border-white-border-sub dark:border-dark-border-sub text-start"
                >
                  공휴일 및 주말
                </th>
                <td className="px-6 border-r border-solid border-white-border-sub dark:border-dark-border-sub text-end">
                  {now > salaryDay
                    ? `${convertTime(totalHolidayHour1.toFixed(1))}`
                    : `${convertTime(totalHolidayHour2.toFixed(1))}`}
                </td>
                <td className="pl-6 py-3 text-end text-nowrap">
                  {monthlyWage > 0
                    ? null
                    : !totalHolidayPay1 && !totalHolidayPay2
                    ? '0원'
                    : now > salaryDay
                    ? `${formatMoney(totalHolidayPay1)}원`
                    : `${formatMoney(totalHolidayPay2)}원`}
                </td>
              </tr>

              <tr className="px-6 border-b border-solid border-white-border-sub dark:border-dark-border-sub font-bold">
                <th
                  scope="row"
                  className="pr-6 py-3 text-start text-gray-900 whitespace-nowrap dark:text-white border-r border-solid border-white-border-sub dark:border-dark-border-sub uppercase"
                >
                  이번 달 총합
                </th>
                <td className="px-6 border-r border-solid border-white-border-sub dark:border-dark-border-sub text-end">
                  {now > salaryDay
                    ? `${convertTime(totalWorkHour1.toFixed(1))}`
                    : `${convertTime(totalWorkHour2.toFixed(1))}`}
                </td>
                <td className="pl-6 py-3 text-end text-nowrap">
                  {monthlyWage > 0
                    ? `${formatMoney(monthlyWage)}원`
                    : !totalSalaryPay1 && !totalSalaryPay2
                    ? '0원'
                    : now > salaryDay
                    ? `${formatMoney(totalSalaryPay1)}원`
                    : `${formatMoney(totalSalaryPay2)}원`}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </>
  ) : null;
}

export default ShowSalary;
