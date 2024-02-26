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
import SalaryType from '../Utils/SalaryType';
import { formatMoney } from '../../util/formatMoney';

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
  const [totalSalaryPay, setTotalSalaryPay] = useState(0);

  const companyCode = currentUser?.photoURL; // 회사 코드
  const userId = currentUser?.uid; // 유저 아이디
  const { salaryPayment, monthlyPay } = SalaryType(companyCode, userId);
  //const { salaryDay, totalSalaryPay } = SalaryDay(companyCode, userId);
  const hourlyWage = salaryPayment; // 시급
  const monthlyWage = monthlyPay; //월급인 경우
  const now = new Date().getDate();
  const nowStr = new Date().toISOString().split('T')[0];
  console.log('totalSalary', totalSalaryPay);

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
      console.log('존재', salaryPaySnapshot.exists());
      if (salaryPaySnapshot.exists()) {
        const salaryPays = salaryPaySnapshot.val();
        let totalSalary = 0;

        // 저번달 salaryDay부터 이번달 salaryDay - 1일까지의 salary를 합산
        for (let date in salaryPays) {
          const dateObj = new Date(date);
          console.log('dateObj', dateObj);

          const today = new Date();
          console.log('today', today);

          if (
            dateObj.getMonth() === today.getMonth() &&
            dateObj.getDate() < salaryDay
          ) {
            const { daySalary, nightSalary, holidayAndWeekendSalary } =
              salaryPays[date];

            totalSalary += daySalary + nightSalary + holidayAndWeekendSalary;
            setTotalSalaryPay(totalSalary);
            console.log('총 급여1', totalSalaryPay);
          }
        }

        console.log('총 급여2', totalSalaryPay);
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
            console.log('시작시간', start);
            console.log('퇴근 시간', end);

            const dateStr = start.toISOString().split('T')[0]; // YYYY-MM-DD 형식
            console.log(dateStr);

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
              }
            }

            console.log('오늘', today);
            console.log('일한시간', workHours);
            console.log('지금', now);
            console.log('돈주는 날', salaryDay);
            console.log('월급', totalSalaryPay);

            if (isHolidayOrWeekend) {
              if (holidayPay) {
                wage = hourlyWage * holidayPay;
              } else {
                wage = hourlyWage;
              }

              totalWeekendOrHolidaySalary += wage * workHours;
              console.log('오늘은 공휴일');
              console.log('wage', wage);
              console.log('workHours', workHours);
              console.log(totalWeekendOrHolidaySalary);
            } else {
              // 출퇴근 시간이 같은 날에 있으면서, 그 시간이 야간 시간 범위에 포함되는 경우
              console.log('주말 혹은 공휴일', isHolidayOrWeekend);
              if (
                start.getDate() === end.getDate() &&
                ((start.getHours() >= nightStart && start.getHours() < 24) ||
                  (end.getHours() > 0 && end.getHours() <= nightEnd))
              ) {
                wage = hourlyWage * isNightPay;
                totalNightSalary += wage * workHours;
                console.log('오늘은 22시~24시라서 야간근무야');
              }
              // 출퇴근 시간이 다른 날에 걸쳐 있는 경우
              else if (start.getDate() !== end.getDate()) {
                console.log('야간 시작 시간은', nightStart);
                console.log('주간 시작 시간은', nightEnd);
                console.log('출근 시간은', start.getHours());
                console.log('퇴근 시간은', end.getHours());
                if (
                  start.getHours() >= nightStart &&
                  start.getHours() < 24 &&
                  end.getHours() > 0 &&
                  end.getHours() <= nightEnd
                ) {
                  // 출근 시간이 야간 근무 시간에 포함되는 경우
                  wage = hourlyWage * isNightPay;
                  console.log('오늘의 시급은', wage);
                  totalNightSalary += wage * workHours;
                  console.log(workHours);

                  console.log('오늘도 야간 근무야');
                }
              } else {
                totalDaySalary += wage * workHours;
                console.log('오늘은 주간 근무야');
                console.log(totalDaySalary);
              }
            }

            setDaySalary(totalDaySalary);
            setNightSalary(totalNightSalary);
            setHolidayAndWeekendSalary(totalWeekendOrHolidaySalary);
            console.log(workHours);
            console.log(workDateSnapshot.exists());
            console.log(workDateSnapshot.val().workHour);
            console.log('isItTrue', workDateSnapshot.exists() && workHours);

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
          {daySalary > 0 && (
            <div className="flex flex-col justify-between items-center space-y-4 w-full">
              <div className="flex flex-row w-full justify-between items-center">
                <div className="flex items-baseline">최근 일한 날짜</div>
                <div className="flex items-baseline">{today}</div>
              </div>
              <div className="h-[1px] w-full bg-white-border-sub dark:bg-dark-border-sub"></div>
              <div className="flex flex-row w-full justify-between  items-center">
                <div className="flex items-start ">근무 형태</div>
                <div className="flex items-baseline">주간</div>
              </div>
              <div className="h-[1px] w-full bg-white-border-sub dark:bg-dark-border-sub"></div>
              <div className="flex flex-row w-full justify-between  items-center">
                <div className="flex items-baseline">급여</div>
                <div className="flex items-baseline">
                  {formatMoney(daySalary)}원
                </div>
              </div>
            </div>
          )}
          {nightSalary > 0 && (
            <div className="flex flex-col justify-between items-center space-y-4 w-full">
              <div className="flex flex-row w-full justify-between  items-center">
                <div className="flex items-baseline">최근 일한 날짜</div>
                <div className="flex items-baseline">{today}</div>
              </div>
              <div className="h-[1px] w-full bg-white-border-sub dark:bg-dark-border-sub"></div>
              <div className="flex flex-row w-full justify-between  items-center">
                <div className="flex items-start ">근무 형태</div>
                <div className="flex items-baseline">야간</div>
              </div>
              <div className="h-[1px] w-full bg-white-border-sub dark:bg-dark-border-sub"></div>
              <div className="flex flex-row w-full justify-between  items-center">
                <div className="flex items-baseline">급여</div>
                <div className="flex items-baseline">
                  {formatMoney(nightSalary)}원
                </div>
              </div>
            </div>
          )}
          {holidayAndWeekendSalary > 0 && (
            <div className="flex flex-col justify-between items-center space-y-4 w-full">
              <div className="flex flex-row w-full justify-between items-center">
                <div className="flex items-baseline">최근 일한 날짜</div>
                <div className="flex items-baseline">{today}</div>
              </div>
              <div className="h-[1px] w-full bg-white-border-sub dark:bg-dark-border-sub"></div>
              <div className="flex flex-row w-full justify-between items-center">
                <div className="flex items-start ">근무 형태</div>
                <div className="flex items-baseline">공휴일 및 주말</div>
              </div>
              <div className="h-[1px] w-full bg-white-border-sub dark:bg-dark-border-sub"></div>
              <div className="flex flex-row w-full justify-between items-center">
                <div className="flex items-baseline">급여</div>
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
                <div className="flex items-start ">근무 형태</div>
                <div className="flex items-baseline">월급</div>
              </div>
              <div className="w-full border-b border-solid"></div>
              <div className="flex flex-row w-full justify-between items-center">
                <div className="flex items-baseline">급여</div>
                <div className="flex items-baseline">
                  {formatMoney(monthlyWage)}원
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="flex flex-row justify-between space-x-16">
          {salaryDay == now && totalSalaryPay > 0 && !monthlyWage && (
            <div className="flex flex-row w-full justify-between space-x-16 items-center">
              <div>월급정산일 </div>
              <div>{formatMoney(totalSalaryPay)}</div>
            </div>
          )}
        </div>
      </div>
    </>
  ) : matchCalendar ? (
    <>
      <div className="relative w-full h-full overflow-x-auto">
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
                {daySalary > 0 && today == nowStr && `${workHours}`}
              </td>
              <td className="pl-6 py-3 text-end text-nowrap">
                {daySalary > 0 &&
                  today == nowStr &&
                  `${formatMoney(daySalary)}`}
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
                {nightSalary > 0 && today == nowStr && `${workHours}시간`}
              </td>
              <td className="pl-6 py-3 text-end text-nowrap">
                {nightSalary > 0 &&
                  today == nowStr &&
                  `${formatMoney(nightSalary)}원`}
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
                {holidayAndWeekendSalary > 0 &&
                  today == nowStr &&
                  `${workHours}시간`}
              </td>
              <td className="pl-6 py-3 text-end text-nowrap">
                {holidayAndWeekendSalary > 0 &&
                  today == nowStr &&
                  `${formatMoney(holidayAndWeekendSalary)}원`}
              </td>
            </tr>

            <tr className="px-6 border-b border-solid border-white-border-sub dark:border-dark-border-sub font-bold">
              <th
                scope="row"
                className="pr-6 py-3 text-start text-gray-900 whitespace-nowrap dark:text-white border-r border-solid border-white-border-sub dark:border-dark-border-sub uppercase"
              >
                Month
              </th>
              <td className="px-6 border-r border-solid border-white-border-sub dark:border-dark-border-sub"></td>
              <td className="pl-6 py-3 text-end text-nowrap">
                {monthlyWage > 0
                  ? `${formatMoney(monthlyWage)}원`
                  : `${formatMoney(totalSalaryPay)}원`}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  ) : null;
}

export default ShowSalary;
