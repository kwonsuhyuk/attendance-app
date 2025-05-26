import React from "react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { PlaneTakeoff, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { calculateVacationDaysByType } from "@/util/vacation.util";
import { IVacationRequest } from "@/components/company/table/VacationColumns";

interface IEmployeeVacationYearFilterProps {
  setDate: (date: Date) => void;
  setCurrentPage: (page: number) => void;
  year: string;
  yearFilteredRequests: any;
}

const EmployeeVacationYearFilter = ({
  setDate,
  setCurrentPage,
  year,
  yearFilteredRequests,
}: IEmployeeVacationYearFilterProps) => {
  const approvedRequests = yearFilteredRequests.filter(
    (req: IVacationRequest) => req.status === "승인",
  );
  const stats = calculateVacationDaysByType(approvedRequests);

  const handleYearChange = (direction: "prev" | "next") => {
    const newDate = new Date();
    newDate.setFullYear(direction === "prev" ? Number(year) - 1 : Number(year) + 1);
    setDate(newDate);
    setCurrentPage(0);
  };
  return (
    <Card
      className="relative cursor-pointer rounded-xl bg-vacation-color p-4 text-white shadow-md transition dark:bg-vacation-color"
      data-tour="vacation-1"
    >
      <div className="flex items-center justify-center">
        <div className="flex items-center gap-4">
          <Button
            onClick={() => handleYearChange("prev")}
            size="icon"
            className="h-7 w-7 bg-white/20 text-white hover:bg-white/30"
            aria-label="이전 연도"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm font-medium">{year}년</span>
          <Button
            onClick={() => handleYearChange("next")}
            size="icon"
            className="h-7 w-7 bg-white/20 text-white hover:bg-white/30"
            aria-label="다음 연도"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <CardContent className="mt-6 flex flex-col items-center justify-center gap-6 p-0 p-4 text-sm text-white">
        <div className="flex items-center gap-2">
          <span className="text-base">
            {year}년에 사용한 휴가는 총{" "}
            <span className="font-bold underline">{stats.totalDays}일</span>
            입니다.
          </span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-white/80">
          <span className="rounded-full bg-white/10 px-2 py-1">연차 {stats.annual}일</span>
          <span className="rounded-full bg-white/10 px-2 py-1">반차 {stats.half}일</span>
          <span className="rounded-full bg-white/10 px-2 py-1">특별 {stats.special}일</span>
        </div>
        <div className="absolute bottom-0 right-2 text-[10px] text-[#e2e2e2]">
          ※ 반차는 0.5일로 계산됩니다
        </div>
      </CardContent>
    </Card>
  );
};

export default EmployeeVacationYearFilter;
