import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { Link } from "react-router-dom";
import EmployeeModifyModal from "@/components/company/table/EmployeeModifyModal";
import { useEmployeeList } from "@/hooks/manager/useEmployeeList";
import { EmployeeInfo } from "@/model/types/user.type";
import EmployeeFilter from "@/components/company/table/EmployeeFilter";
import EmployeeListPageContainer from "@/components/container/manager/EmployeeListPageContainer";
import Pagination from "@/components/ui/pagination";

const EmployeeListPage = () => {
  const {
    selectedEmployee,
    setSelectedEmployee,
    register,
    setValue,
    paginatedEmployees,
    page,
    totalPageCount,
    handleNextPage,
    handlePreviousPage,
    filteredEmployees,
    handleSubmit,
    onSubmit,
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
    // { accessorKey: "salaryType", header: "급여 지급 방식" },
    { accessorKey: "employmentType", header: "고용 형태" },
    {
      accessorKey: "salaryAmount",
      header: "급여",
      cell: ({ getValue }) => {
        const value = getValue() ?? 0;
        return `${value.toLocaleString()} 원`;
      },
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
        <Link to={`/${row.original.companyCode}/datecheck/${row.original.uid}`}>
          <Button variant="default" size="sm" className="dark:bg-dark-border">
            <span className="inline sm:hidden">상세보기</span>
            <span className="hidden sm:inline">상세보기 & 정산 {">"}</span>
          </Button>
        </Link>
      ),
    },
  ];

  return (
    <EmployeeListPageContainer>
      <div className="flex w-full flex-col p-6">
        <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div className="text-lg font-bold">직원 수: {filteredEmployees.length}명</div>
        </div>

        <EmployeeFilter
          register={register}
          setValue={setValue}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
        />

        <div className="mt-4 w-full overflow-x-auto">
          <DataTable columns={columns} data={paginatedEmployees} />
        </div>

        <Pagination
          page={page}
          totalPageCount={totalPageCount}
          onNext={handleNextPage}
          onPrevious={handlePreviousPage}
        />

        {/* 수정 버튼 클릭 시 모달 */}
        {selectedEmployee && (
          <EmployeeModifyModal user={selectedEmployee} onClose={() => setSelectedEmployee(null)} />
        )}
      </div>
    </EmployeeListPageContainer>
  );
};

export default EmployeeListPage;
