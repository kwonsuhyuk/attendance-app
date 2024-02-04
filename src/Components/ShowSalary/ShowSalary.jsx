import { getDatabase, onValue, ref } from 'firebase/database';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

function ShowSalary() {
  const [daySalary, setDaySalary] = useState(0);
  const [nightSalary, setNightSalary] = useState(0);
  const { currentUser } = useSelector((state) => state.user);

  const companyCode = currentUser.photoURL; // 회사 코드
  const userId = currentUser.uid; // 유저 아이디

  const hourlyWage = 10000; // 시급
  const nightTimeWage = hourlyWage * 1.5; // 야간 시급

  useEffect(() => {
    const dbref = ref(
      getDatabase(),
      `companyCode/${companyCode}/users/${userId}/`
    );
    const nightStartRef = ref(
      getDatabase(),
      `companyCode/${companyCode}/companyInfo/nightStart`
    );
    const nightEndRef = ref(
      getDatabase(),
      `companyCode/${companyCode}/companyInfo/nightEnd`
    );

    onValue(dbref, (snapshot) => {
      if (snapshot.exists()) {
        const { startTime, endTime } = snapshot.val();
        const start = new Date(startTime);
        const end = new Date(endTime);
        const workHours = Math.abs(end - start) / 36e5; //근무시간 계산

        if (
          start.getDate() === end.getDate() &&
          start.getHours() > nightEndRef &&
          end.getHours() < nightStartRef
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
