import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { fetchEmployees } from "@/api";
import { useUserStore } from "@/store/user.store";
import { EmployeeInfo, FilterForm } from "@/model/types/user.type";
import { DUMMY_EMPLOYEES } from "@/constants/dummyEmployees";

export const useEmployeeList = () => {
  const companyCode = useUserStore(state => state.currentUser?.companyCode);
  const [employeeList, setEmployeeList] = useState<EmployeeInfo[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<EmployeeInfo | null>(null);
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;

  const { register, watch, setValue } = useForm<FilterForm>({
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
      // setEmployeeList(employees ?? []);
      setEmployeeList([...employees, ...DUMMY_EMPLOYEES]);
    }
    loadEmployees();
  }, [companyCode]);

  const searchName = watch("searchName");
  const selectedJob = watch("selectedJob");
  const selectedSalaryType = watch("selectedSalaryType");

  const normalizedSalaryType = selectedSalaryType.replace(" 지급", "");

  const filteredEmployees = employeeList.filter(
    user =>
      user.name.includes(searchName) &&
      (selectedJob === "전체" || user?.jobName === selectedJob) &&
      (selectedSalaryType === "전체" || user?.employmentType === normalizedSalaryType),
  );

  const paginatedEmployees = filteredEmployees.slice(page * rowsPerPage, (page + 1) * rowsPerPage);

  const totalPageCount = Math.ceil(filteredEmployees.length / rowsPerPage);

  const handleNextPage = () => {
    if (page < totalPageCount - 1) {
      setPage(page + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  return {
    employeeList,
    selectedEmployee,
    setSelectedEmployee,
    selectedSalaryType,
    register,
    setValue,
    filteredEmployees,
    paginatedEmployees,
    page,
    totalPageCount,
    handleNextPage,
    handlePreviousPage,
  };
};
