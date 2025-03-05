import { DataTable } from "@/components/ui/data-table";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { useNavigate } from "react-router-dom";
import EmployeeModifyModal from "@/components/company/table/EmployeeModifyModal";
import { useEmployeeList } from "@/hooks/manager/useEmployeeList";
import { EmployeeInfo } from "@/model/types/user.type";
import EmployeeFilter from "@/components/company/table/EmployeeFilter";

const EmployeeListPage = () => {
  const navigate = useNavigate();
  const {
    employeeList,
    selectedEmployee,
    setSelectedEmployee,
    register,
    setValue,
    filteredEmployees,
  } = useEmployeeList();

  const columns: ColumnDef<EmployeeInfo>[] = [
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
        {/* 직원 수 표시 ->  employeeList로 변경 */}
        <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div className="text-lg font-bold">직원 수: {employeeList.length}명</div>
        </div>

        <EmployeeFilter register={register} setValue={setValue} />

        {/* 직원 리스트(데이터) & 페이지네이션 */}
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
