import { useEffect, useState } from "react";
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
  isMobile: boolean;
  hiddenColumnIdsOnMobile?: string[];
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
  isMobile,
  hiddenColumnIdsOnMobile,
}: IVacationTabContentProps) => {
  const currentPageData = getCurrentPageData(filteredData, tab.value);

  console.log(`📋 [${tab.value}] 정렬된 전체 데이터:`);
  filteredData.forEach((d, i) => {
    console.log(
      `${i + 1}. id: ${d.id}, status: ${d.status}, requestedAt: ${d.requestedAt}, processedAt: ${d.processedAt}, createdAt: ${d.createdAt}`,
    );
  });

  return (
    <TabsContent value={tab.value} className="mt-4 w-full">
      <div>
        {["registered", "processed"].includes(tab.value) && (
          <p className="mb-4 flex justify-end px-5 text-xs text-white-nav-text dark:text-dark-nav-text">
            ※ 휴가 내역은 최근 6개월 이전 ~ 3개월 이후 까지만 표시됩니다.
          </p>
        )}
        {["pending"].includes(tab.value) && (
          <p className="mb-4 flex justify-end px-5 text-xs text-white-nav-text dark:text-dark-nav-text">
            ※ 해당 직원 클릭 시, 승인/거절 가능합니다.
          </p>
        )}
        <div
          className="min-h-[510px] w-full overflow-auto"
          data-tour={
            tab.value === "pending"
              ? "pending-1"
              : tab.value === "processed"
                ? "process-2"
                : tab.value === "registered"
                  ? "register-2"
                  : undefined
          }
        >
          <DataTable
            columns={columns}
            data={currentPageData}
            onRowClick={onRowClick}
            hiddenColumnIdsOnMobile={hiddenColumnIdsOnMobile}
          />
        </div>
        <div className="-translate-y-8 sm:translate-y-0">
          {filteredData.length > 0 && (
            <Pagination
              page={page}
              totalPageCount={totalPageCount}
              onNext={onNext}
              onPrevious={onPrevious}
            />
          )}
        </div>
      </div>
    </TabsContent>
  );
};

export default VacationTabContent;
