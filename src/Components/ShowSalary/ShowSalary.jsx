import { child, get, getDatabase, onValue, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function ShowSalary() {
  const [daySalary, setDaySalary] = useState(0);
  const [nightSalary, setNightSalary] = useState(0);
  const { currentUser } = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(false);

  const companyCode = currentUser?.photoURL; // 회사 코드
  const userId = currentUser?.uid; // 유저 아이디

  const hourlyWage = 10000; // 시급
  const nightTimeWage = hourlyWage * 1.5; // 야간 시급

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

    Promise.all([get(dateRef), get(nightStartRef), get(nightEndRef)]).then(
      ([dateSnapshot, nightStartSnapshot, nightEndSnapshot]) => {
        if (
          dateSnapshot.exists() &&
          nightStartSnapshot.exists() &&
          nightEndSnapshot.exists()
        ) {
          const dates = dateSnapshot.val();
          const nightStart = nightStartSnapshot.val();
          const nightEnd = nightEndSnapshot.val();

          let totalDaySalary = 0;
          let totalNightSalary = 0;

          for (let date in dates) {
            const { startTime, endTime } = dates[date];
            const start = new Date(startTime);
            const end = new Date(endTime);
            const workHours = Math.abs(end - start) / 36e5; //근무시간 계산

            if (
              start.getDate() === end.getDate() &&
              start.getHours() >= nightEnd &&
              end.getHours() <= nightStart
            ) {
              totalDaySalary += workHours * hourlyWage;
            } else {
              totalNightSalary += workHours * nightTimeWage;
            }
          }

          setDaySalary(totalDaySalary);
          setNightSalary(totalNightSalary);
        }
      }
    );
  }, [companyCode, userId, hourlyWage, nightTimeWage]);

  console.log(daySalary);

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
