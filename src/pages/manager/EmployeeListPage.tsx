import { DataTable } from "@/components/ui/data-table";
import EmployeeModifyModal from "@/components/company/table/EmployeeModifyModal";
import { useEmployeeList } from "@/hooks/manager/useEmployeeList";
import EmployeeFilter from "@/components/company/table/EmployeeFilter";
import EmployeeListPageContainer from "@/components/container/manager/EmployeeListPageContainer";
import Pagination from "@/components/ui/pagination";
import { getEmployeeColumns } from "@/components/company/table/EmployeeColumns";

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

  const columns = getEmployeeColumns();

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
          <DataTable columns={columns} data={paginatedEmployees} onRowClick={setSelectedEmployee} />
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
