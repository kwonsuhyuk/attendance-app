import React, { useEffect, useState } from 'react';
import { getDatabase, ref, onValue } from '../../firebase/index.js';

function ShowSalary() {
  const [daySalary, setDaySalary] = useState(0);
  const [nightSalary, setNightSalary] = useState(0);
  const companyCode = 'yourCompanyCode'; // 회사 코드
  const userId = 'yourUserId'; // 유저 아이디
  const hourlyWage = 10000; // 시급
  const nightTimeWage = hourlyWage * 1.5; // 야간 시급

  useEffect(() => {
    const dbref = ref(getDatabase(), `/${companyCode}/users/${userId}`);
    onValue(dbref, (snapshot) => {
      if (snapshot.exists()) {
        const { startTime, endTime } = snapshot.val();
        const start = new Date(startTime);
        const end = new Date(endTime);
        const workHours = Math.abs(end - start) / 36e5; //근무시간 계산

        if (
          start.getDate() === end.getDate() &&
          start.getHours() < 22 &&
          end.getHours() < 22
        ) {
          setDaySalary(workHours * hourlyWage);
          setNightSalary(0);
        } else {
          setDaySalary(0);
          setNightSalary(workHours * nightTimeWage);
        }
      }
    });
  }, [companyCode, userId, hourlyWage, nightTimeWage]);

  return (
    <div className='App'>
      {daySalary > 0 && <h1>당신의 오늘 주간 급여는 {daySalary}원 입니다.</h1>}
      {nightSalary > 0 && (
        <h1>당신의 오늘 야간 급여는 {nightSalary}원 입니다.</h1>
      )}
    </div>
  );
}

export default ShowSalary;
