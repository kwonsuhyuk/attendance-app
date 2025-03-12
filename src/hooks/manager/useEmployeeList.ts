import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useUserStore } from "@/store/user.store";
import { EmployeeInfo, FilterForm } from "@/model/types/user.type";
import { fetchEmployees } from "@/api/employee.api";

export const useEmployeeList = () => {
  const companyCode = useUserStore(state => state.currentUser?.companyCode);
  const [employeeList, setEmployeeList] = useState<EmployeeInfo[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<EmployeeInfo | null>(null);
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 640);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 640);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [searchValues, setSearchValues] = useState<FilterForm>({
    searchName: "",
    selectedJob: "전체",
    selectedEmploymentType: "전체",
    salary: 0,
  });

  const { register, setValue, getValues, handleSubmit, watch } = useForm<FilterForm>({
    defaultValues: {
      searchName: "",
      selectedJob: "전체",
      selectedEmploymentType: "전체",
      salary: 0,
    },
  });

  useEffect(() => {
    if (!companyCode) return;
    async function loadEmployees() {
      const employees = await fetchEmployees(companyCode as string);
      setEmployeeList(employees ?? []);
      // 이 주석 코드는 더미데이터를 포함한 리스트 입니다.
      // setEmployeeList([...employees, ...DUMMY_EMPLOYEES]);
    }
    loadEmployees();
  }, [companyCode]);

  const filteredEmployees = employeeList.filter(user => {
    const search = isMobile ? searchValues.searchName : watch("searchName");
    const job = isMobile ? searchValues.selectedJob : watch("selectedJob");
    const employment = isMobile
      ? searchValues.selectedEmploymentType
      : watch("selectedEmploymentType");

    return (
      user.name.includes(search) &&
      (job === "전체" || user?.jobName === job) &&
      (employment === "전체" || user?.employmentType === employment.replace(" 지급", ""))
    );
  });

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

  const onSubmit = () => {
    setSearchValues(getValues());
    setPage(0);
  };

  return {
    employeeList,
    selectedEmployee,
    setSelectedEmployee,
    register,
    setValue,
    filteredEmployees,
    paginatedEmployees,
    page,
    totalPageCount,
    handleNextPage,
    handlePreviousPage,
    handleSubmit,
    onSubmit,
  };
};
