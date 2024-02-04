import { child, get, getDatabase, onValue, ref } from 'firebase/database';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ClipLoader from 'react-spinners/ClipLoader';

function ShowSalary() {
  const [daySalary, setDaySalary] = useState(0);
  const [nightSalary, setNightSalary] = useState(0);
  const { currentUser } = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(false);

  const companyCode = currentUser?.photoURL; // 회사 코드
  const userId = currentUser?.uid; // 유저 아이디

  const hourlyWage = 10000; // 시급
  const nightTimeWage = hourlyWage * 1.5; // 야간 시급
  const holidayAndWeekendWage = hourlyWage * 1.5; // 공휴일 및 주말 시급

  useEffect(() => {
    setIsLoading(true);
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

    Promise.all([
      get(dateRef),
      get(nightStartRef),
      get(nightEndRef),
      get(holidayListRef),
    ])
      .then(
        ([
          dateSnapshot,
          nightStartSnapshot,
          nightEndSnapshot,
          holidayListSnapshot,
        ]) => {
          if (
            dateSnapshot.exists() &&
            nightStartSnapshot.exists() &&
            nightEndSnapshot.exists() &&
            holidayListSnapshot.exists()
          ) {
            const dates = dateSnapshot.val();
            const nightStart = nightStartSnapshot.val();
            const nightEnd = nightEndSnapshot.val();
            const holidayList = holidayListSnapshot.val();

            let totalDaySalary = 0;
            let totalNightSalary = 0;

            for (let date in dates) {
              const { startTime, endTime } = dates[date];
              const start = new Date(startTime);
              const end = new Date(endTime);

              const workHours = Math.abs(end - start) / 36e5; //근무시간 계산

              const dateStr = start.toISOString().split('T')[0]; // YYYY-MM-DD 형식
              const isHoliday = holidayList[dateStr]; // 공휴일인지 확인
              const isWeekend = start.getDay() === 0 || start.getDay() === 6; // 주말인지 확인

              const wage =
                isHoliday || isWeekend ? holidayAndWeekendWage : hourlyWage; // 공휴일이거나 주말이면 공휴일 시급, 아니면 일반 시급

              if (
                start.getDate() === end.getDate() &&
                start.getHours() >= nightEnd &&
                end.getHours() <= nightStart
              ) {
                totalDaySalary += workHours * wage; // 시급에 따른 급여 계산
              } else {
                totalNightSalary += workHours * nightTimeWage;
              }
            }

            setDaySalary(totalDaySalary);
            setNightSalary(totalNightSalary);
          }
        }
      )
      .finally(() => setIsLoading(false));
  }, [companyCode, userId, hourlyWage, nightTimeWage, holidayAndWeekendWage]);

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
    <div>
      {daySalary > 0 && <h1>당신의 오늘 주간 급여는 {daySalary}원 입니다.</h1>}
      {nightSalary > 0 && (
        <h1>당신의 오늘 야간 급여는 {nightSalary}원 입니다.</h1>
      )}
      ShowSalary
    </div>
  );
}

export default ShowSalary;
