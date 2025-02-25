import { useUserStore } from "@/store/user.store";
import { getDatabase, ref, get } from "firebase/database";
import { useEffect, useState } from "react";

function SalaryDay() {
  const [salaryDay, setSalaryDay] = useState(0);
  const [totalSalaryPay, setTotalSalaryPay] = useState(0);
  const companyCode = useUserStore(state => state.currentUser.companyCode);
  const userId = useUserStore(state => state.currentUser.userId);
  // const [isLoading, setIsLoading] = useState(false);

  let totalSalary = 0;

  useEffect(() => {
    let isCancelled = false;
    const db = getDatabase();
    const salaryDayRef = ref(db, `companyCode/${companyCode}/companyInfo/payCheckDay`);
    const salaryPayRef = ref(db, `companyCode/${companyCode}/users/${userId}/workDates`);

    Promise.all([get(salaryDayRef), get(salaryPayRef)]).then(
      ([salaryDaySnapshot, salaryPaySnapshot]) => {
        if (salaryDaySnapshot.exists() && salaryPaySnapshot.exists()) {
          setSalaryDay(salaryDaySnapshot.val());
          const salaryPays = salaryPaySnapshot.val();

          // 저번달 salaryDay부터 이번달 salaryDay - 1일까지의 salary를 합산
          for (let date in salaryPays) {
            const dateObj = new Date(date);
            const today = new Date();
            if (dateObj.getMonth() === today.getMonth() && dateObj.getDate() < salaryDay) {
              const { daySalary, nightSalary, holidayAndWeekendSalary } = salaryPays[date];
              totalSalary += daySalary + nightSalary + holidayAndWeekendSalary;
            }
          }
          setTotalSalaryPay(totalSalary);
        }
      },
    );

    return () => {
      isCancelled = true;
    };
  }, []);

  return { salaryDay, totalSalaryPay };
}

export default SalaryDay;
