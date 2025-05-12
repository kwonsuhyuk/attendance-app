import { TabsContent } from "@/components/ui/tabs";
import { DataTable } from "@/components/ui/data-table";
import Pagination from "@/components/ui/pagination";
import { IVacationRequest } from "./VacationColumns";
import { ColumnDef } from "@tanstack/react-table";

interface IVacationTabContentProps {
  tab: {
    value: string;
    includeActions?: boolean;
    isRegistered?: boolean;
  };
  filteredData: IVacationRequest[];
  getCurrentPageData: (data: IVacationRequest[], tabValue: string) => IVacationRequest[];
  page: number;
  totalPageCount: number;
  onNext: () => void;
  onPrevious: () => void;
  onRowClick: (row: IVacationRequest) => void;
  columns: ColumnDef<IVacationRequest>[];
}

const VacationTabContent = ({
  tab,
  filteredData,
  getCurrentPageData,
  page,
  totalPageCount,
  onNext,
  onPrevious,
  onRowClick,
  columns,
}: IVacationTabContentProps) => {
  return (
    <TabsContent value={tab.value} className="mt-6 w-full">
      {["registered", "processed"].includes(tab.value) && (
        <p className="mb-2 flex justify-end px-5 text-xs text-white-nav-text dark:text-dark-nav-text">
          ※ 휴가 내역은 최근 6개월 이전 ~ 3개월 이후 까지만 표시됩니다.
        </p>
      )}
      {["pending"].includes(tab.value) && (
        <p className="mb-2 flex justify-end px-5 text-xs text-white-nav-text dark:text-dark-nav-text">
          ※ 해당 직원 클릭 시, 승인/거절 가능합니다.
        </p>
      )}
      <div className="w-full">
        <DataTable
          columns={columns}
          data={getCurrentPageData(filteredData, tab.value)}
          onRowClick={onRowClick}
        />
      </div>
      <div className="p-5">
        {filteredData.length > 0 && (
          <Pagination
            page={page}
            totalPageCount={totalPageCount}
            onNext={onNext}
            onPrevious={onPrevious}
          />
        )}
      </div>
    </TabsContent>
  );
};

export default VacationTabContent;
