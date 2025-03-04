import { useEffect, useState } from "react";
import { fetchEmployees } from "@/api";
import { useUserStore } from "@/store/user.store";
import { EmployeeInfo } from "@/model/types/employeeInfo.type";

export const useEmployeeList = () => {
  const companyCode = useUserStore(state => state.currentUser?.companyCode);
  const [employeeList, setEmployeeList] = useState<EmployeeInfo[]>([]);
  const [searchName, setSearchName] = useState<string>("");
  const [selectedJob, setSelectedJob] = useState("전체");
  const [selectedSalaryType, setSelectedSalaryType] = useState("전체");
  const [selectedEmployee, setSelectedEmployee] = useState<EmployeeInfo | null>(null);

  useEffect(() => {
    if (!companyCode) return;
    async function loadEmployees() {
      const employees = await fetchEmployees(companyCode as string);
      setEmployeeList(employees);
    }
    loadEmployees();
  }, [companyCode]);

  const handleFilterReset = () => {
    setSearchName("");
    setSelectedJob("전체");
    setSelectedSalaryType("전체");
  };

  const filteredEmployees = employeeList.filter(
    user =>
      user.name.includes(searchName) &&
      (selectedJob === "전체" || user?.jobName === selectedJob) &&
      (selectedSalaryType === "전체" || user?.salaryType === selectedSalaryType),
  );

  return {
    employeeList,
    searchName,
    setSearchName,
    selectedJob,
    setSelectedJob,
    selectedSalaryType,
    setSelectedSalaryType,
    selectedEmployee,
    setSelectedEmployee,
    handleFilterReset,
    filteredEmployees,
  };
};
