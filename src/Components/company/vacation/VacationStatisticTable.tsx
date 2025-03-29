import { Card } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import Pagination from "@/components/ui/pagination";
import { generateColumns } from "@/constants/vacationstatisticColumns";
import { useVacationStatisticTableData } from "@/hooks/vacation/useVacationStatisticTableData";
import { EmployeeInfo } from "@/model/types/user.type";

interface IVacationStatisticTableProps {
  employeeList: EmployeeInfo[];
  page: number;
  totalPages: number;
  handleNextPage: () => void;
  handlePreviousPage: () => void;
  selectedDate: { year: number; month: number };
  mode: "month" | "year";
}

const VacationStatisticTable = ({
  employeeList,
  page,
  totalPages,
  handleNextPage,
  handlePreviousPage,
  selectedDate,
  mode,
}: IVacationStatisticTableProps) => {
  const updatedList = useVacationStatisticTableData(employeeList, selectedDate, mode);

  return (
    <Card className="relative p-4 md:w-2/3">
      <p className="absolute right-2 top-2 text-xs text-gray-500">(사용횟수 : 일)</p>
      <div className="w-full overflow-x-auto pt-4">
        <DataTable
          columns={generateColumns(selectedDate.year, selectedDate.month, mode)}
          data={updatedList}
        />
        <Pagination
          page={page}
          totalPageCount={totalPages}
          onNext={handleNextPage}
          onPrevious={handlePreviousPage}
        />
      </div>
    </Card>
  );
};

export default VacationStatisticTable;
