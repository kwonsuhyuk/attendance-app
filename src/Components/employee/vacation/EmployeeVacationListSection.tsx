import EmployeeVacationList from "./EmployeeVacationList";
import Pagination from "@/components/ui/pagination";
import Error from "@/components/Error";
import { TVacationRequest } from "@/model/types/vacation.type";

interface IVacationListSectionProps {
  loading: boolean;
  error: boolean;
  requests: TVacationRequest[];
  currentPage: number;
  totalPageCount: number;
  setCurrentPage: (page: number) => void;
}

const VacationListSection = ({
  error,
  requests,
  currentPage,
  totalPageCount,
  setCurrentPage,
}: IVacationListSectionProps) => {
  if (error) return <Error />;

  return (
    <>
      <EmployeeVacationList key={currentPage} requests={requests} paginated />
      <div className="-translate-y-8">
        <Pagination
          page={currentPage}
          totalPageCount={totalPageCount}
          onNext={() => {
            setCurrentPage(Math.min(currentPage + 1, totalPageCount - 1));
          }}
          onPrevious={() => {
            setCurrentPage(Math.max(currentPage - 1, 0));
          }}
        />
      </div>
    </>
  );
};

export default VacationListSection;
