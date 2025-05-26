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
import Seo from "@/components/Seo";
import { useTour } from "@/hooks/use-tour";
import { vacationTourSteps } from "@/constants/employeeTourSteps";

const MyVacationPage = () => {
  const { companyCode } = useParams();
  const userId = useUserStore(state => state.currentUser?.uid);
  const { isModalOpen, toggleModal } = useMyVacation();
  const [date, setDate] = useState(new Date());
  const [currentPage, setCurrentPage] = useState(0);
  const [filterStatus, setFilterStatus] = useState<"전체" | TVacationStatus>("전체");
  const [reloadKey, setReloadKey] = useState<number>(0);

  useTour("vacation", vacationTourSteps);

  const year = date.getFullYear().toString();
  const { requests, loading, error } = useGetEmployeeVacationList({
    companyCode: companyCode!,
    year,
    reloadKey,
  });

  const { paginatedRequests, totalPageCount } = useFilteredVacationRequests(
    requests,
    year,
    filterStatus,
    currentPage,
  );

  const yearOnlyApprovedRequests = requests.filter(req => {
    return req.status === "승인" && req.startDate?.startsWith(year);
  });

  const { requests: sendRequest } = useVacationRequests();
  const { register: handleRequest } = sendRequest;

  const handleSubmit = async (data: IVacationRequest) => {
    try {
      await handleRequest(data);
      setReloadKey(prev => prev + 1);
    } catch (err) {
      // 실패 시 모달 유지
    }
  };

  // const year = date.getFullYear();

  const handleYearChange = (direction: "prev" | "next") => {
    setDate(prev => {
      const newDate = new Date(prev);
      newDate.setFullYear(direction === "prev" ? prev.getFullYear() - 1 : prev.getFullYear() + 1);
      return newDate;
    });
  };

  return (
    <>
      <Seo title="휴가 | On & Off" description="On & Off에서 근태관리 서비스를 이용해보세요." />
      <div className="flex w-full flex-col gap-4 sm:py-5">
        <EmployeeVacationYearFilter
          setDate={setDate}
          setCurrentPage={setCurrentPage}
          year={year}
          yearFilteredRequests={yearOnlyApprovedRequests}
        />

        <Button className="w-full cursor-pointer" onClick={toggleModal} data-tour="vacation-2">
          휴가 요청
        </Button>

        <Card
          className="relative flex flex-col gap-5 p-4 shadow-md transition hover:bg-gray-50 dark:hover:bg-dark-card-bg"
          data-tour="vacation-3"
        >
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
    </>
  );
};

export default MyVacationPage;
