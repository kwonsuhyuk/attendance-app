import { DataTable } from "@/components/ui/data-table";
import EmployeeModifyModal from "@/components/company/table/EmployeeModifyModal";
import { useEmployeeList } from "@/hooks/manager/useEmployeeList";
import EmployeeFilter from "@/components/company/table/EmployeeFilter";
import EmployeeListPageContainer from "@/components/container/manager/EmployeeListPageContainer";
import Pagination from "@/components/ui/pagination";
import { getEmployeeColumns } from "@/components/company/table/EmployeeColumns";
import Seo from "@/components/Seo";
import { useTour } from "@/hooks/use-tour";
import { employeeManageTourSteps } from "@/constants/managerTourSteps";
import { useEffect, useState } from "react";

const EmployeeListPage = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 640);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
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
    isUpdated,
    setIsUpdated,
    handleClose,
  } = useEmployeeList();

  const columns = getEmployeeColumns();

  useTour("employee-manage", employeeManageTourSteps);

  return (
    <>
      <Seo
        title="직원 관리 | On & Off"
        description="On & Off에서 근태관리 서비스를 이용해보세요."
      />
      <EmployeeListPageContainer>
        <div className="flex flex-col" data-tour="body">
          <div className="p-4">
            <div className="mb-3 flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div className="text-lg font-bold">직원 수: {filteredEmployees.length}명</div>
            </div>
            <EmployeeFilter
              register={register}
              setValue={setValue}
              handleSubmit={handleSubmit}
              onSubmit={onSubmit}
            />
          </div>

          <div className="flex-1" data-tour="empManage-table">
            <DataTable
              columns={columns}
              data={paginatedEmployees}
              onRowClick={setSelectedEmployee}
              hiddenColumnIdsOnMobile={isMobile ? ["email", "phoneNumber", "salaryAmount"] : []}
            />
          </div>

          <div className="w-full p-10">
            <Pagination
              page={page}
              totalPageCount={totalPageCount}
              onNext={handleNextPage}
              onPrevious={handlePreviousPage}
            />
          </div>
        </div>

        {selectedEmployee && (
          <EmployeeModifyModal
            user={selectedEmployee}
            onClose={handleClose}
            setIsUpdated={setIsUpdated}
          />
        )}
      </EmployeeListPageContainer>
    </>
  );
};

export default EmployeeListPage;
