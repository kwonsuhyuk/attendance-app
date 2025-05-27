import { Card, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import Pagination from "@/components/ui/pagination";
import { generateColumns } from "@/constants/vacationstatisticColumns";
import { useVacationStatisticTableData } from "@/hooks/vacation/useVacationStatisticTableData";
import { EmployeeInfo } from "@/model/types/user.type";
import { useRef } from "react";

interface IVacationStatisticTableProps {
  employeeList: EmployeeInfo[];
  page: number;
  totalPages: number;
  handleNextPage: () => void;
  handlePreviousPage: () => void;
  selectedDate: { year: number; month: number };
  selectedName: EmployeeInfo | null;
  handleNameSelect: (user: EmployeeInfo | null) => void;
  mode: "month" | "year";
}

const VacationStatisticTable = ({
  employeeList,
  page,
  totalPages,
  handleNextPage,
  handlePreviousPage,
  selectedDate,
  handleNameSelect,
  selectedName,
  mode,
}: IVacationStatisticTableProps) => {
  const updatedList = useVacationStatisticTableData(employeeList, selectedDate, mode);

  return (
    <Card className="relative p-4 lg:w-full" data-tour="vstatic-5">
      <CardTitle className="flex items-center gap-2 p-5 text-lg font-semibold md:text-xl">
        직원 전체 휴가 현황
      </CardTitle>
      <p className="absolute right-2 top-2 text-xs text-gray-500">(사용횟수 : 일)</p>

      <div className="w-full overflow-x-auto pt-4">
        <DataTable
          columns={generateColumns(selectedDate.year, selectedDate.month, mode)}
          data={updatedList}
          selectedItem={selectedName}
          onRowClick={handleNameSelect}
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
