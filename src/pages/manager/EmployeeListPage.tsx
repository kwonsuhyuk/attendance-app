import { DataTable } from "@/components/ui/data-table";
import { Card } from "@/components/ui/card";
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
    {
      accessorKey: "email",
      header: "이메일",
      cell: ({ getValue }) => (
        <div className="whitespace-normal break-words">{String(getValue())}</div>
      ),
    },
    { accessorKey: "phoneNumber", header: "전화번호" },
    { accessorKey: "jobName", header: "직종" },
    { accessorKey: "salaryType", header: "급여 지급 방식" },
    {
      accessorKey: "salaryAmount",
      header: "급여",
      cell: ({ getValue }) => `${String(getValue() ?? 0)} 원`,
    },
    {
      accessorKey: "edit",
      header: "수정",
      cell: ({ row }) => (
        <Button
          variant="outline"
          size="sm"
          onClick={() => setSelectedEmployee(row.original)}
          className="dark:bg-dark-border"
        >
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
          className="dark:bg-dark-border"
        >
          상세보기 & 정산 {">"}
        </Button>
      ),
    },
  ];

  return (
    <Card className="flex w-full max-w-6xl flex-col items-center space-y-6 p-6 shadow-lg">
      <div className="flex w-full flex-col">
        {/* 직원 수 표시 & 필터 초기화 버튼 */}
        <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div className="text-lg font-bold">직원 수: {employeeList.length}명</div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleFilterReset}
            className="w-auto self-start dark:bg-dark-border sm:self-auto"
          >
            필터 초기화
          </Button>
        </div>

        {/* 검색 바 & 필터 */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <Input
            className="h-[48px] w-full px-3 dark:bg-dark-border-sub dark:text-white-bg dark:placeholder-dark-border"
            placeholder="이름 검색"
            {...register("searchName")}
          />
          <Select onValueChange={value => setValue("selectedJob", value)}>
            <SelectTrigger className="h-[48px] w-full dark:bg-dark-border-sub dark:text-white-bg">
              <SelectValue placeholder="직종 선택" />
            </SelectTrigger>
            <SelectContent className="dark:hover:dark-border-sub dark:border-dark-border dark:bg-dark-bg">
              <SelectItem value="전체" className="dark:bg-dark-b dark:hover:bg-dark-border">
                전체
              </SelectItem>
              {["과장", "대리", "직원"].map(job => (
                <SelectItem key={job} value={job} className="dark:hover:bg-dark-border">
                  {job}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select onValueChange={value => setValue("selectedSalaryType", value)}>
            <SelectTrigger className="h-[48px] w-full dark:bg-dark-border-sub dark:text-white-bg">
              <SelectValue placeholder="급여 지급 방식" />
            </SelectTrigger>
            <SelectContent className="dark:hover:dark-border-sub dark:border-dark-border dark:bg-dark-bg">
              <SelectItem value="전체" className="dark:bg-dark-b dark:hover:bg-dark-border">
                전체
              </SelectItem>
              {Object.entries(PAYMENT_METHODS).map(([key, label]) => (
                <SelectItem key={key} value={key} className="dark:hover:bg-dark-border">
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* 직원 리스트(데이터) */}
        <div className="mt-4 w-full overflow-x-auto">
          <DataTable columns={columns} data={filteredEmployees} />
        </div>

        {/* 수정 버튼 클릭 시 모달 */}
        {selectedEmployee && (
          <EmployeeModifyModal user={selectedEmployee} onClose={() => setSelectedEmployee(null)} />
        )}
      </div>
    </Card>
  );
};

export default EmployeeListPage;
