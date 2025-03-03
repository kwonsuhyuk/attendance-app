import { useEffect, useState } from "react";
import { DataTable } from "@/components/ui/data-table";
import { useUserStore } from "@/store/user.store";
import { fetchEmployees } from "@/api";
import { ColumnDef } from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import EmployeeItem from "@/components/company/EmployeeItem";

interface Employee {
  name: string;
  email: string;
  phoneNumber: string;
  jobName: string;
  salaryType: string;
  salaryAmount: number;
}

const EmployeeListPage = () => {
  const companyCode = useUserStore(state => state.currentUser?.companyCode);
  const navigate = useNavigate();
  const [employeeList, setEmployeeList] = useState<Employee[]>([]);
  const [searchName, setSearchName] = useState<string>("");
  const [selectedJob, setSelectedJob] = useState("전체");
  const [selectedSalaryType, setSelectedSalaryType] = useState("전체");

  // ✅ 모달 상태를 중앙에서 관리
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  useEffect(() => {
    if (!companyCode) return;
    async function loadEmployees() {
      const employees = await fetchEmployees(companyCode); // ✅ API 호출
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

  const columns: ColumnDef<any>[] = [
    { accessorKey: "name", header: "이름" },
    { accessorKey: "email", header: "이메일" },
    { accessorKey: "phoneNumber", header: "전화번호" },
    { accessorKey: "jobName", header: "직종" },
    { accessorKey: "salaryType", header: "급여 지급 방식" },
    { accessorKey: "salaryAmount", header: "급여", cell: ({ getValue }) => `${getValue()} 원` },
    {
      accessorKey: "edit",
      header: "수정",
      cell: ({ row }) => (
        <Button variant="outline" size="sm" onClick={() => setSelectedEmployee(row.original)}>
          수정
        </Button>
      ),
    },
    {
      accessorKey: "details",
      header: "상세보기 & 정산",
      cell: ({ row }) => (
        <Button
          variant="link"
          size="sm"
          onClick={() => navigate(`/${companyCode}/datecheck/${row.original.uid}`)}
        >
          상세보기 & 정산 {">"}
        </Button>
      ),
    },
  ];

  return (
    <div className="p-5">
      {/* 직원 수 표시 & 필터 초기화 버튼 */}
      <div className="mb-4 flex items-center justify-between">
        <div className="text-lg font-bold">직원 수: {employeeList.length}명</div>
        <Button variant="outline" size="sm" onClick={handleFilterReset}>
          필터 초기화
        </Button>
      </div>
      {/* 검색 바 & 카테고리 필터 */}
      <div className="mb-4 flex gap-4">
        <Input
          placeholder="이름 검색"
          value={searchName}
          onChange={e => setSearchName(e.target.value)}
        />
        <Select onValueChange={setSelectedJob} defaultValue="전체">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="직종 선택" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="전체">전체</SelectItem>
            {["과장", "대리", "직원"].map(job => (
              <SelectItem key={job} value={job}>
                {job}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select onValueChange={setSelectedSalaryType} defaultValue="전체">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="급여 지급 방식" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="전체">전체</SelectItem>
            <SelectItem value="monthlyPay">월급 지급</SelectItem>
            <SelectItem value="dailyPay">일급 지급</SelectItem>
            <SelectItem value="hourPay">시급 지급</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {/* 직원 리스트 */}
      <DataTable columns={columns} data={filteredEmployees} />
      {selectedEmployee && (
        <EmployeeItem user={selectedEmployee} onClose={() => setSelectedEmployee(null)} />
      )}
    </div>
  );
};

export default EmployeeListPage;
