import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { fetchEmployees } from "@/api";
import { useUserStore } from "@/store/user.store";
import { EmployeeInfo, FilterForm } from "@/model/types/employeeInfo.type";

export const useEmployeeList = () => {
  const companyCode = useUserStore(state => state.currentUser?.companyCode);
  const [employeeList, setEmployeeList] = useState<EmployeeInfo[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<EmployeeInfo | null>(null);

  const { register, watch, setValue, reset } = useForm<FilterForm>({
    defaultValues: {
      searchName: "",
      selectedJob: "전체",
      selectedSalaryType: "전체",
    },
  });

  useEffect(() => {
    if (!companyCode) return;
    async function loadEmployees() {
      const employees = await fetchEmployees(companyCode as string);
      setEmployeeList(employees);
    }
    loadEmployees();
  }, [companyCode]);

  const searchName = watch("searchName");
  const selectedJob = watch("selectedJob");
  const selectedSalaryType = watch("selectedSalaryType");

  const handleFilterReset = () => {
    reset();
  };

  const filteredEmployees = employeeList.filter(
    user =>
      user.name.includes(searchName) &&
      (selectedJob === "전체" || user?.jobName === selectedJob) &&
      (selectedSalaryType === "전체" || user?.salaryType === selectedSalaryType),
  );

  return {
    employeeList,
    selectedEmployee,
    setSelectedEmployee,
    register,
    setValue,
    handleFilterReset,
    filteredEmployees,
  };
};
