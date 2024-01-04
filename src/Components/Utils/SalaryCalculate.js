// showsalary.js

function isWeekend(date) {
    const day = date.getDay();
    return day === 0 || day === 6; // 0은 일요일, 6은 토요일
  }
  
  function isNightTime(date) {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return hours < 7 || (hours === 17 && minutes >= 30) || hours > 17;
  }
  
  function calculatePay(hoursWorked, baseRate, date) {
    let rate = baseRate;
  
    if (isWeekend(date) || isNightTime(date)) {
      rate *= 1.5;
    }
  
    return hoursWorked * rate;
  }
  
  const baseRate = 10000; // 시급
  const hoursWorked = [8, 8, 4, 8, 8, 0, 0]; // 월요일부터 일요일까지의 근무 시간
  let totalPay = 0;
  
  for (let i = 0; i < 7; i++) {
    const date = new Date(2024, 0, 1 + i); // 2024년 1월 1일부터 7일까지의 날짜
    totalPay += calculatePay(hoursWorked[i], baseRate, date);
  }
  
  console.log(`이번 주의 총 급여는 ${totalPay}원입니다.`);
  