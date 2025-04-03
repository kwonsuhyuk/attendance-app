import EmployeeVacationList from "./EmployeeVacationList";
import Pagination from "@/components/ui/pagination";
import Loading from "@/components/common/Loading";
import Error from "@/components/Error";
import { IVacationRequest } from "@/components/company/table/VacationColumns";
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
  loading,
  error,
  requests,
  currentPage,
  totalPageCount,
  setCurrentPage,
}: IVacationListSectionProps) => {
  if (loading) return <Loading />;
  if (error) return <Error />;

  return (
    <>
      <EmployeeVacationList key={currentPage} requests={requests} paginated />
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
    </>
  );
};

export default VacationListSection;
