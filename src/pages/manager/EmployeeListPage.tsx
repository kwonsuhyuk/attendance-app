import { DataTable } from "@/components/ui/data-table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ColumnDef } from "@tanstack/react-table";
import { useNavigate } from "react-router-dom";
import EmployeeModifyModal from "@/components/company/EmployeeModifyModal";
import { useEmployeeList } from "@/hooks/manager/useEmployeeList";
import { PAYMENT_METHODS } from "@/constants/paymentMethods";

const EmployeeListPage = () => {
  const navigate = useNavigate();
  const {
    employeeList,
    selectedEmployee,
    setSelectedEmployee,
    register,
    setValue,
    handleFilterReset,
    filteredEmployees,
  } = useEmployeeList();

  const columns: ColumnDef<any>[] = [
    { accessorKey: "name", header: "이름" },
    { accessorKey: "email", header: "이메일" },
    { accessorKey: "phoneNumber", header: "전화번호" },
    { accessorKey: "jobName", header: "직종" },
    { accessorKey: "salaryType", header: "급여 지급 방식" },
    {
      accessorKey: "salaryAmount",
      header: "급여",
      cell: ({ getValue }) => `${getValue() ?? 0} 원`,
    },
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
          variant="default"
          size="sm"
          onClick={() => navigate(`/${row.original.companyCode}/datecheck/${row.original.uid}`)}
        >
          상세보기 & 정산 {">"}
        </Button>
      ),
    },
  ];

  return (
    <div className="flex w-full min-w-full flex-col">
      {/* 직원 수 표시 & 필터 초기화 버튼 */}
      <div className="mb-4 flex items-center justify-between">
        <div className="text-lg font-bold">직원 수: {employeeList.length}명</div>
        <Button variant="outline" size="sm" onClick={handleFilterReset} className="mr-1">
          필터 초기화
        </Button>
      </div>

      {/* 검색 바 & 필터 */}
      <div className="mb-4 flex w-full flex-wrap items-center justify-start gap-4">
        <Input
          className="min-w-[280px] flex-1 px-3"
          placeholder="이름 검색"
          {...register("searchName")}
        />
        <Select onValueChange={value => setValue("selectedJob", value)}>
          <SelectTrigger className="mr-1 w-[240px]">
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
        <Select onValueChange={value => setValue("selectedSalaryType", value)}>
          <SelectTrigger className="mr-1 w-[240px]">
            <SelectValue placeholder="급여 지급 방식" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="전체">전체</SelectItem>
            {Object.entries(PAYMENT_METHODS).map(([key, label]) => (
              <SelectItem key={key} value={key}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* 직원 리스트(데이터) */}
      <div className="w-full min-w-full overflow-x-auto">
        <DataTable columns={columns} data={filteredEmployees} />
      </div>

      {/* 수정 버튼 클릭 시 모달 */}
      {selectedEmployee && (
        <EmployeeModifyModal user={selectedEmployee} onClose={() => setSelectedEmployee(null)} />
      )}
    </div>
  );
};

export default EmployeeListPage;
