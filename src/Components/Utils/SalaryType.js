import { getDatabase, ref, get } from 'firebase/database';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

function SalaryType() {
  const [salaryPayment, setSalaryPayment] = useState(0);
  const [monthlyPay, setMonthlyPay] = useState(0);
  const { currentUser } = useSelector((state) => state.user);

  const companyCode = currentUser?.photoURL; // 회사 코드
  const userId = currentUser?.uid; // 유저 아이디

  useEffect(() => {
    let isCancelled = false;
    const db = getDatabase();
    const salaryTypeRef = ref(
      db,
      `companyCode/${companyCode}/users/${userId}/salaryType`
    ); //임시 경로
    const salaryAmountRef = ref(
      db,
      `companyCode/${companyCode}/users/${userId}/salaryAmount`
    );

    Promise.all([get(salaryTypeRef), get(salaryAmountRef)]).then(
      ([salaryTypeSnapshot, salaryAmountSnapshot]) => {
        if (salaryTypeSnapshot.exists() && salaryAmountSnapshot.exists()) {
          const salaryType = salaryTypeSnapshot.val();
          const salaryAmount = salaryAmountSnapshot.val();

          if (salaryType === 'hourPay') {
            setSalaryPayment(salaryAmount);
          } else if (salaryType === 'dailyPay') {
            setSalaryPayment(salaryAmount / 8);
          } else if (salaryType === 'monthlyPay') {
            setMonthlyPay(salaryAmount);
          }
        }
      }
    );
    return () => {
      isCancelled = true;
    };
  }, []);

  return { salaryPayment, monthlyPay };
}

export default SalaryType;
