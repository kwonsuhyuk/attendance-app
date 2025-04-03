import { useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { PlaneTakeoff } from "lucide-react";
import { useUserStore } from "@/store/user.store";
import { useMyVacation } from "@/hooks/employee/useMyVacation";
import { useVacationRequests } from "@/hooks/manager/useVacationRequests";
import { useGetEmployeeVacationList } from "@/hooks/vacation/useGetEmployeeVacationList";
import VacationRequestModal from "@/components/common/modal/VacationRequestModal";
import EmployeeVacationYearFilter from "@/components/employee/vacation/EmployeeVacationYearFilter";
import { useFilteredVacationRequests } from "@/hooks/vacation/useFilteredVacationRequests";
import { TVacationStatus } from "@/model/types/vacation.type";
import { IVacationRequest } from "@/components/company/table/VacationColumns";
import VacationFilterButtons from "@/components/employee/vacation/EmployeeVacationTableFilterButton";
import VacationListSection from "@/components/employee/vacation/EmployeeVacationListSection";

const MyVacationPage = () => {
  const { companyCode } = useParams();
  const userId = useUserStore(state => state.currentUser?.uid);
  const { isModalOpen, toggleModal } = useMyVacation();
  const [date, setDate] = useState(new Date());
  const [currentPage, setCurrentPage] = useState(0);
  const [filterStatus, setFilterStatus] = useState<"전체" | TVacationStatus>("전체");

  const year = date.getFullYear().toString();
  const { requests, loading, error } = useGetEmployeeVacationList({
    companyCode: companyCode!,
    userId: userId!,
    year,
  });

  const { paginatedRequests, totalPageCount, yearFilteredRequests } = useFilteredVacationRequests(
    requests,
    year,
    filterStatus,
    currentPage,
  );

  const { requests: sendRequest } = useVacationRequests();
  const { register: handleRequest } = sendRequest;

  const handleSubmit = (data: IVacationRequest) => {
    handleRequest(data);
  };

  const year = date.getFullYear();

  const handleYearChange = (direction: "prev" | "next") => {
    setDate(prev => {
      const newDate = new Date(prev);
      newDate.setFullYear(direction === "prev" ? prev.getFullYear() - 1 : prev.getFullYear() + 1);
      return newDate;
    });
  };

  return (
    <div className="flex w-full flex-col gap-4 sm:py-5">
      <EmployeeVacationYearFilter
        setDate={setDate}
        setCurrentPage={setCurrentPage}
        year={year}
        yearFilteredRequests={yearFilteredRequests}
      />

      <Button className="w-full cursor-pointer" onClick={toggleModal}>
        휴가 요청
      </Button>

      <Card className="relative flex flex-col gap-5 p-4 shadow-md transition hover:bg-gray-50 dark:hover:bg-dark-card-bg">
        <div className="flex items-center gap-2 text-base font-semibold">
          <PlaneTakeoff className="h-5 w-5 text-primary" />
          <CardTitle className="text-base">휴가 내역</CardTitle>
        </div>

        <VacationFilterButtons
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
          resetPage={() => setCurrentPage(0)}
        />

        <VacationListSection
          loading={loading}
          error={!!error}
          requests={paginatedRequests}
          currentPage={currentPage}
          totalPageCount={totalPageCount}
          setCurrentPage={setCurrentPage}
        />
      </Card>

      {isModalOpen && <VacationRequestModal onClose={toggleModal} onRegister={handleSubmit} />}
    </div>
  );
};

export default MyVacationPage;
