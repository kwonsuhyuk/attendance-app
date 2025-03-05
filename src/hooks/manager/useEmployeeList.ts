import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { fetchEmployees } from "@/api";
import { useUserStore } from "@/store/user.store";
import { EmployeeInfo, FilterForm } from "@/model/types/employeeInfo.type";

const DUMMY_EMPLOYEES = [
  {
    name: "송지우",
    email: "송지우_0@email.com",
    phoneNumber: "010-4826-6170",
    jobName: "사원",
    salaryType: "일급",
    salaryAmount: 3358325,
    companyCode: "ABC123",
    uid: "1",
  },
  {
    name: "오하영",
    email: "오하영_1@email.com",
    phoneNumber: "010-1638-9175",
    jobName: "신입",
    salaryType: "일급",
    salaryAmount: 3157774,
    companyCode: "ABC123",
    uid: "2",
  },
  {
    name: "정한결",
    email: "정한결_2@email.com",
    phoneNumber: "010-7586-9862",
    jobName: "대리",
    salaryType: "일급",
    salaryAmount: 3328918,
    companyCode: "ABC123",
    uid: "3",
  },
  {
    name: "최지현",
    email: "최지현_3@email.com",
    phoneNumber: "010-7552-2921",
    jobName: "대리",
    salaryType: "주급",
    salaryAmount: 2289350,
    companyCode: "ABC123",
    uid: "4",
  },
  {
    name: "이영희",
    email: "이영희_4@email.com",
    phoneNumber: "010-2158-1956",
    jobName: "대리",
    salaryType: "일급",
    salaryAmount: 4408038,
    companyCode: "ABC123",
    uid: "5",
  },
  {
    name: "박민수",
    email: "박민수_5@email.com",
    phoneNumber: "010-1270-8858",
    jobName: "사원",
    salaryType: "주급",
    salaryAmount: 1589049,
    companyCode: "ABC123",
    uid: "6",
  },
  {
    name: "김철수",
    email: "김철수_6@email.com",
    phoneNumber: "010-2479-9933",
    jobName: "신입",
    salaryType: "일급",
    salaryAmount: 5113143,
    companyCode: "ABC123",
    uid: "7",
  },
  {
    name: "오하영",
    email: "오하영_7@email.com",
    phoneNumber: "010-9734-8362",
    jobName: "대리",
    salaryType: "월급",
    salaryAmount: 2352531,
    companyCode: "ABC123",
    uid: "8",
  },
  {
    name: "김철수",
    email: "김철수_8@email.com",
    phoneNumber: "010-9217-1580",
    jobName: "신입",
    salaryType: "일급",
    salaryAmount: 6963474,
    companyCode: "ABC123",
    uid: "9",
  },
  {
    name: "오하영",
    email: "오하영_9@email.com",
    phoneNumber: "010-8073-4163",
    jobName: "대리",
    salaryType: "일급",
    salaryAmount: 1273756,
    companyCode: "ABC123",
    uid: "10",
  },
  {
    name: "박민수",
    email: "박민수_10@email.com",
    phoneNumber: "010-5758-8280",
    jobName: "사원",
    salaryType: "월급",
    salaryAmount: 2021438,
    companyCode: "ABC123",
    uid: "11",
  },
  {
    name: "김철수",
    email: "김철수_11@email.com",
    phoneNumber: "010-3649-7232",
    jobName: "대리",
    salaryType: "주급",
    salaryAmount: 1552851,
    companyCode: "ABC123",
    uid: "12",
  },
  {
    name: "박민수",
    email: "박민수_12@email.com",
    phoneNumber: "010-4819-9922",
    jobName: "대리",
    salaryType: "주급",
    salaryAmount: 1267205,
    companyCode: "ABC123",
    uid: "13",
  },
  {
    name: "윤서준",
    email: "윤서준_13@email.com",
    phoneNumber: "010-9691-6396",
    jobName: "대리",
    salaryType: "주급",
    salaryAmount: 3268936,
    companyCode: "ABC123",
    uid: "14",
  },
  {
    name: "김철수",
    email: "김철수_14@email.com",
    phoneNumber: "010-5079-3562",
    jobName: "과장",
    salaryType: "일급",
    salaryAmount: 2761230,
    companyCode: "ABC123",
    uid: "15",
  },
  {
    name: "강하늘",
    email: "강하늘_15@email.com",
    phoneNumber: "010-4833-1449",
    jobName: "사원",
    salaryType: "일급",
    salaryAmount: 4069920,
    companyCode: "ABC123",
    uid: "16",
  },
  {
    name: "오하영",
    email: "오하영_16@email.com",
    phoneNumber: "010-4526-4780",
    jobName: "과장",
    salaryType: "일급",
    salaryAmount: 5062479,
    companyCode: "ABC123",
    uid: "17",
  },
  {
    name: "이영희",
    email: "이영희_17@email.com",
    phoneNumber: "010-9383-8944",
    jobName: "신입",
    salaryType: "일급",
    salaryAmount: 6811721,
    companyCode: "ABC123",
    uid: "18",
  },
  {
    name: "강하늘",
    email: "강하늘_18@email.com",
    phoneNumber: "010-6045-2799",
    jobName: "사원",
    salaryType: "월급",
    salaryAmount: 2009436,
    companyCode: "ABC123",
    uid: "19",
  },
  {
    name: "정한결",
    email: "정한결_19@email.com",
    phoneNumber: "010-7952-1616",
    jobName: "대리",
    salaryType: "일급",
    salaryAmount: 1009100,
    companyCode: "ABC123",
    uid: "20",
  },
];

export const useEmployeeList = () => {
  const companyCode = useUserStore(state => state.currentUser?.companyCode);
  const [employeeList, setEmployeeList] = useState<EmployeeInfo[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<EmployeeInfo | null>(null);

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
      setEmployeeList(employees ?? []);
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
      (selectedSalaryType === "전체" || user?.salaryType === normalizedSalaryType),
  );

  // const [displayedEmployees, setDisplayedEmployees] = useState([...DUMMY_EMPLOYEES]);

  // useEffect(() => {
  //   setDisplayedEmployees([
  //     ...DUMMY_EMPLOYEES,
  //     ...employeeList.map(e => ({ ...e, uid: e.uid ?? "" })),
  //   ]);
  // }, [employeeList]);

  // const filteredEmployees = displayedEmployees.filter(
  //   user =>
  //     (user.name.includes(searchName) || user.email.includes(searchName)) &&
  //     (selectedJob === "전체" || user.jobName === selectedJob) &&
  //     (selectedSalaryType === "전체" || user.salaryType === normalizedSalaryType),
  // );

  return {
    employeeList,
    selectedEmployee,
    setSelectedEmployee,
    selectedSalaryType,
    register,
    setValue,
    filteredEmployees,
  };
};
