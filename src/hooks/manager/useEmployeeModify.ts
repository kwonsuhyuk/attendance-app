import { useState, useEffect } from "react";
import { fetchJobNames, updateEmployeeSettings } from "@/api";
import { toast } from "react-toastify";
import { EmployeeInfo } from "@/model/types/employeeInfo.type";

export const useEmployeeModify = (user: EmployeeInfo, onClose: () => void) => {
  const { name, email, jobName, uid, salaryAmount, companyCode, salaryType, phoneNumber } = user;

  const [selectedJobName, setSelectedJobName] = useState(jobName);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(salaryType);
  const [salary, setSalary] = useState<number>(salaryAmount);
  const [jobNames, setJobNames] = useState<string[]>([]);

  useEffect(() => {
    async function loadJobNames() {
      const jobs = await fetchJobNames(companyCode);
      setJobNames(jobs || []);
    }
    loadJobNames();
  }, [companyCode]);

  const handleSalaryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value.replace(/\D/g, ""); // 숫자만 입력 가능
    setSalary(parseInt(value, 10) || 0);
  };

  const handleSettingSubmit = async () => {
    const result = await updateEmployeeSettings(companyCode, uid, {
      jobName: selectedJobName,
      salaryType: selectedPaymentMethod,
      salary,
    });

    if (result.success) {
      window.location.reload();
      toast.success("정보 수정이 완료되었습니다.");
      onClose();
    } else {
      toast.error("오류가 발생하였습니다. 다시 시도해주세요.");
    }
  };

  return {
    name,
    email,
    phoneNumber,
    selectedJobName,
    setSelectedJobName,
    selectedPaymentMethod,
    setSelectedPaymentMethod,
    salary,
    handleSalaryChange,
    handleSettingSubmit,
    jobNames,
  };
};
