import { setMonth } from 'date-fns';
import { child, get, getDatabase, onValue, ref } from 'firebase/database';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

function SalaryType({ id }) {
  const [salaryPayment, setSalaryPayment] = useState(0);
  const [MonthlyPay, setMonthlyPay] = useState(0);
  const { currentUser } = useSelector((state) => state.user);

  const companyCode = currentUser?.photoURL; // 회사 코드
  const userId = currentUser?.uid; // 유저 아이디

  useEffect(() => {
    const db = getDatabase();
    const salaryTypeRef = ref(
      db,
      `companyCode/${companyCode}/companyInfo/jobName/${jobid}/payWay`
    ); //임시 경로
    const salaryAmountRef = ref(
      db,
      `companyCode/${companyCode}/users/${userId}/date`
    );

    Promise.all([get(salaryTypeRef), get(salaryAmountRef)]).then(
      ([salaryTypeSnapshot, salaryAmountSnapshot]) => {
        if (salaryTypeSnapshot.exists() && salaryAmountSnapshot.exists()) {
          const salaryType = salaryTypeSnapshot.val();
          const salaryAmount = salaryAmountSnapshot.val();

          if (salaryType == 'hourPay') {
            setSalaryPayment(salaryAmount);
          } else if (salaryPayment == 'dailyPay') {
            setSalaryPayment(salaryAmount / 8);
          } else if (salaryPayment == 'monthlyPay') {
            setMonthlyPay(salaryAmount); //월급의 경우에는 전달해주는것이 필요한가? 라는 생각
          }
        }
      }
    );
  }, []);
  return { salaryPayment, MonthlyPay };
}

export default SalaryType;
// 아직 해결이 안된것 : paytype 과 amount의 경로 문제와 월급의 경우는 어떻게 전달할지
