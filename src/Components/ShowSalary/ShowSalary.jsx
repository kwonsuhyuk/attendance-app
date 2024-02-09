// import { child, get, getDatabase, onValue, ref } from 'firebase/database';
// import React, { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
// import ClipLoader from 'react-spinners/ClipLoader';
// import { SalaryType } from '../Utils/SalaryType';

// function ShowSalary() {
//   const [daySalary, setDaySalary] = useState(0);
//   const [nightSalary, setNightSalary] = useState(0);
//   const [holidayAndWeekendSalary, setHolidayAndWeekendSalary] = useState(0);
//   const { currentUser } = useSelector((state) => state.user);
//   const [isLoading, setIsLoading] = useState(false);

//   const companyCode = currentUser?.photoURL; // 회사 코드
//   const userId = currentUser?.uid; // 유저 아이디
//   const { salaryPayment, monthlyPay } = SalaryType(companyCode, userId);
//   const hourlyWage = salaryPayment; // 시급
//   const monthlyWage = monthlyPay; //월급인 경우

//   // const nightTimeWage = hourlyWage * 1.5; // 야간 시급
//   // const holidayAndWeekendWage = hourlyWage * 1.5; // 공휴일 및 주말 시급

//   useEffect(() => {
//     setIsLoading(true);
//     const db = getDatabase();
//     const dateRef = ref(db, `companyCode/${companyCode}/users/${userId}/date`);
//     const nightStartRef = ref(
//       db,
//       `companyCode/${companyCode}/companyInfo/nightStart`
//     );
//     const nightEndRef = ref(
//       db,
//       `companyCode/${companyCode}/companyInfo/nightEnd`
//     );
//     const holidayListRef = ref(
//       db,
//       `companyCode/${companyCode}/companyInfo/holidayList`
//     );
//     const holidayPayRef = ref(
//       db,
//       `companyCode/${companyCode}/companyInfo/holidayPay`
//     );
//     const isNightPayRef = ref(
//       db,
//       `companyCode/${companyCode}/companyInfo/isNightPay`
//     );

//     Promise.all([
//       get(dateRef),
//       get(nightStartRef),
//       get(nightEndRef),
//       get(holidayListRef),
//       get(holidayPayRef),
//       get(isNightPayRef),
//     ])
//       .then(
//         ([
//           dateSnapshot,
//           nightStartSnapshot,
//           nightEndSnapshot,
//           holidayListSnapshot,
//           holidayPaySnapshot,
//           isNightPaySnapshot,
//         ]) => {
//           if (
//             dateSnapshot.exists() &&
//             nightStartSnapshot.exists() &&
//             nightEndSnapshot.exists() &&
//             holidayListSnapshot.exists() &&
//             holidayPaySnapshot.exists() &&
//             isNightPaySnapshot.exists()
//           ) {
//             const dates = dateSnapshot.val();
//             const nightStart = nightStartSnapshot.val();
//             const nightEnd = nightEndSnapshot.val();
//             const holidayList = holidayListSnapshot.val();
//             const holidayPay = holidayPaySnapshot.val();
//             const isNightPay = isNightPaySnapshot.val();

//             let totalDaySalary = 0;
//             let totalNightSalary = 0;
//             let totalWeekendOrHolidaySalary = 0;

//             for (let date in dates) {
//               const { startTime, endTime } = dates[date];
//               const start = new Date(startTime);
//               const end = new Date(endTime);

//               const workHours = Math.abs(end - start) / 36e5; //근무시간 계산

//               const dateStr = start.toISOString().split('T')[0]; // YYYY-MM-DD 형식
//               const isHolidayOrWeekend =
//                 holidayList[dateStr] ||
//                 start.getDay() === 0 ||
//                 start.getDay() === 6; // 공휴일 또는 주말인지 확인

//               let wage = hourlyWage;

//               if (isHolidayOrWeekend) {
//                 wage = hourlyWage * holidayPay;
//                 totalWeekendOrHolidaySalary += wage * workHours;
//               } else if (
//                 start.getDate() === end.getDate() && //야간의 경우인데 같은 날 20시부터 22시까지 할 경우
//                 start.getHours() >= nightStart &&
//                 end.getHours() <= 24
//               ) {
//                 wage = hourlyWage * isNightPay;
//                 totalNightSalary += wage * workHours;
//               } else if (
//                 start.getDate() !== end.getDate() && // 야간의 경우인데 다른 날이고 오늘 20시부터 다음날 06시까지 근무할 경우
//                 start.getHours() >= nightStart &&
//                 end.getHours() <= nightEnd
//               ) {
//                 wage = hourlyWage * isNightPay;
//                 totalNightSalary += wage * workHours;
//               } else {
//                 wage = hourlyWage;
//                 totalDaySalary += wage * workHours;
//               }
//             }

//             setDaySalary(totalDaySalary);
//             setNightSalary(totalNightSalary);
//             setHolidayAndWeekendSalary(totalWeekendOrHolidaySalary);
//           }
//         }
//       )
//       .finally(() => setIsLoading(false));
//   }, [companyCode, userId, hourlyWage]);

//   if (isLoading) {
//     return (
//       <div className="flex flex-col justify-center items-center h-screen w-screen">
//         <ClipLoader
//           color="black"
//           size={100}
//           aria-label="Loading Spinner"
//           data-testid="loader"
//         />
//         <h3>로딩 중입니다.</h3>
//       </div> // 로딩 스피너
//     );
//   }
//   return (
//     <div>
//       {daySalary > 0 && <h1>당신의 오늘 주간 급여는 {daySalary}원 입니다.</h1>}
//       {nightSalary > 0 && (
//         <h1>당신의 오늘 야간 급여는 {nightSalary}원 입니다.</h1>
//       )}
//       {holidayAndWeekendSalary > 0 && (
//         <h1>
//           오늘은 주말입니다. 당신의 오늘 급여는 {holidayAndWeekendSalary}원
//           입니다.
//         </h1>
//       )}
//     </div>
//   );
// }

// export default ShowSalary;
import { child, get, getDatabase, onValue, ref } from 'firebase/database';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ClipLoader from 'react-spinners/ClipLoader';
import { SalaryType } from '../Utils/SalaryType';

function ShowSalary() {
  const [daySalary, setDaySalary] = useState(0);
  const [nightSalary, setNightSalary] = useState(0);
  const [holidayAndWeekendSalary, setHolidayAndWeekendSalary] = useState(0);
  const { currentUser } = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(false);

  const companyCode = currentUser?.photoURL; // 회사 코드
  const userId = currentUser?.uid; // 유저 아이디
  const { salaryPayment, monthlyPay } = SalaryType(companyCode, userId);
  const hourlyWage = salaryPayment; // 시급
  const monthlyWage = monthlyPay; //월급인 경우

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
    const holidayPayRef = ref(
      db,
      `companyCode/${companyCode}/companyInfo/holidayPay`
    );
    const isNightPayRef = ref(
      db,
      `companyCode/${companyCode}/companyInfo/isNightPay`
    );

    Promise.all([
      get(dateRef),
      get(nightStartRef),
      get(nightEndRef),
      get(holidayListRef),
      get(holidayPayRef),
      get(isNightPayRef),
    ])
      .then(
        async ([
          dateSnapshot,
          nightStartSnapshot,
          nightEndSnapshot,
          holidayListSnapshot,
          holidayPaySnapshot,
          isNightPaySnapshot,
        ]) => {
          if (
            dateSnapshot.exists() &&
            nightStartSnapshot.exists() &&
            nightEndSnapshot.exists() &&
            holidayListSnapshot.exists() &&
            holidayPaySnapshot.exists() &&
            isNightPaySnapshot.exists()
          ) {
            const dates = dateSnapshot.val();
            const nightStart = nightStartSnapshot.val();
            const nightEnd = nightEndSnapshot.val();
            const holidayList = holidayListSnapshot.val();
            const holidayPay = holidayPaySnapshot.val();
            const isNightPay = isNightPaySnapshot.val();

            let totalDaySalary = 0;
            let totalNightSalary = 0;
            let totalWeekendOrHolidaySalary = 0;
            let workDate = '';

            for (let date in dates) {
              const { startTime, endTime } = dates[date];
              const start = new Date(startTime);
              workDate = new Date(startTime).toISOString().split('T')[0];

              if (!endTime) {
                console.warn(
                  `${date}의 퇴근 시간이 없습니다. 급여 계산을 건너뜁니다.`
                );
                continue;
              }

              let end = new Date(endTime);

              if (start.getDate() !== end.getDate()) {
                // 출퇴근이 다른 날에 걸쳐 있는 경우
                const nextDayRef = ref(
                  db,
                  `companyCode/${companyCode}/users/${userId}/date/${end
                    .toISOString()
                    .slice(0, 10)}`
                );
                const nextDaySnapshot = await get(nextDayRef);
                if (nextDaySnapshot.exists() && nextDaySnapshot.val().endTime) {
                  end = new Date(nextDaySnapshot.val().endTime);
                }
              }

              const workHours = Math.abs(end - start) / 36e5; //근무시간 계산

              const dateStr = start.toISOString().split('T')[0]; // YYYY-MM-DD 형식
              const isHolidayOrWeekend =
                holidayList[dateStr] ||
                start.getDay() === 0 ||
                start.getDay() === 6; // 공휴일 또는 주말인지 확인

              let wage = hourlyWage;

              if (isHolidayOrWeekend) {
                wage = hourlyWage * holidayPay;
                totalWeekendOrHolidaySalary += wage * workHours;
              } else if (
                start.getDate() === end.getDate() && //야간의 경우인데 같은 날 20시부터 22시까지 할 경우
                start.getHours() >= nightStart &&
                end.getHours() <= 24
              ) {
                wage = hourlyWage * isNightPay;
                totalNightSalary += wage * workHours;
              } else if (
                start.getDate() !== end.getDate() && // 야간의 경우인데 다른 날이고 오늘 20시부터 다음날 06시까지 근무할 경우
                start.getHours() >= nightStart &&
                end.getHours() <= nightEnd
              ) {
                wage = hourlyWage * isNightPay;
                totalNightSalary += wage * workHours;
              } else {
                wage = hourlyWage;
                totalDaySalary += wage * workHours;
              }
            }
            const salaryRef = ref(
              db,
              `companyCode/${companyCode}/users/${userId}/workDate/${workDate}`
            );

            setDaySalary(totalDaySalary);
            setNightSalary(totalNightSalary);
            setHolidayAndWeekendSalary(totalWeekendOrHolidaySalary);
            set(salaryRef, {
              daySalary: totalDaySalary,
              nightSalary: totalNightSalary,
              holidayAndWeekendSalary: totalWeekendOrHolidaySalary,
            });
          }
        }
      )
      .finally(() => setIsLoading(false));
  }, [companyCode, userId, hourlyWage]);

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
  return (
    <div>
      {daySalary > 0 && (
        <h1>
          당신의 {workDate} 주간 급여는 {daySalary}원 입니다.
        </h1>
      )}
      {nightSalary > 0 && (
        <h1>
          당신의 {workDate} 야간 급여는 {nightSalary}원 입니다.
        </h1>
      )}
      {holidayAndWeekendSalary > 0 && (
        <h1>
          {workDate}는 주말입니다. 당신의 급여는 {holidayAndWeekendSalary}원
          입니다.
        </h1>
      )}
    </div>
  );
}

export default ShowSalary;
