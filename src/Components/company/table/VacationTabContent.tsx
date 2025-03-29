import { TabsContent } from "@/components/ui/tabs";
import { DataTable } from "@/components/ui/data-table";
import Pagination from "@/components/ui/pagination";

interface VacationTabContentProps {
  tab: {
    value: string;
    includeActions?: boolean;
    isRegistered?: boolean;
  };
  filteredData: any[];
  getCurrentPageData: (data: any[], tabValue: string) => any[];
  page: number;
  totalPageCount: number;
  onNext: () => void;
  onPrevious: () => void;
  onRowClick: (row: any) => void;
  columns: any[];
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
}: VacationTabContentProps) => {
  return (
    <TabsContent value={tab.value} className="mt-6 w-full">
      {["registered", "processed"].includes(tab.value) && (
        <p className="mb-2 flex justify-end px-5 text-xs text-white-nav-text dark:text-dark-nav-text">
          ※ 휴가 내역은 최근 6개월 이전 ~ 3개월 이후 까지만 표시됩니다.
        </p>
      )}
      <div className="w-full overflow-x-auto">
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
