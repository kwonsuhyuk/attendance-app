import { useUserStore } from "@/store/user.store";
import { getDatabase, ref, get } from "firebase/database";
import { useEffect, useState } from "react";

function SalaryType() {
  const [salaryPayment, setSalaryPayment] = useState(0);
  const [monthlyPay, setMonthlyPay] = useState(0);
  const companyCode = useUserStore(state => state.currentUser.companyCode);
  const userId = useUserStore(state => state.currentUser.userId);

  useEffect(() => {
    let isCancelled = false;
    const db = getDatabase();
    const salaryTypeRef = ref(db, `companyCode/${companyCode}/users/${userId}/salaryType`); //임시 경로
    const salaryAmountRef = ref(db, `companyCode/${companyCode}/users/${userId}/salaryAmount`);

    Promise.all([get(salaryTypeRef), get(salaryAmountRef)]).then(
      ([salaryTypeSnapshot, salaryAmountSnapshot]) => {
        if (salaryTypeSnapshot.exists() && salaryAmountSnapshot.exists()) {
          const salaryType = salaryTypeSnapshot.val();
          const salaryAmount = salaryAmountSnapshot.val();

          if (salaryType === "hourPay") {
            setSalaryPayment(salaryAmount);
          } else if (salaryType === "dailyPay") {
            setSalaryPayment(salaryAmount / 8);
          } else if (salaryType === "monthlyPay") {
            setMonthlyPay(salaryAmount);
          }
        }
      },
    );
    return () => {
      isCancelled = true;
    };
  }, []);

  return { salaryPayment, monthlyPay };
}

export default SalaryType;
