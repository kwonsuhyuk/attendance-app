import { useState } from "react";
import Seo from "@/components/Seo";
import PeriodAttCalendarGrid from "@/components/company/attendance/PeriodAttCalendarGrid";
import PeriodAttFilterSection from "@/components/company/attendance/PeriodAttFilterSection";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import dayjs from "dayjs";
import { Card } from "@/components/ui/card";
import AttendancePageContainer from "@/components/container/manager/AttendancePageContainer";
import PeriodAttTable from "@/components/company/attendance/PeriodAttTable";

const PeriodAttendancePage = () => {
  const [tab, setTab] = useState("total");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [workplaceFilter, setWorkplaceFilter] = useState("전체");
  const [workTypeFilter, setWorkTypeFilter] = useState("전체");
  const [employeeName, setEmployeeName] = useState("");

  const generateCalendar = (date: Date) => {
    const startOfMonth = dayjs(date).startOf("month").day();
    const daysInMonth = dayjs(date).daysInMonth();
    const totalCells = Math.ceil((startOfMonth + daysInMonth) / 7) * 7;

    return Array.from({ length: totalCells }, (_, i) => {
      const day = i - startOfMonth + 1;
      return day > 0 && day <= daysInMonth ? day : null;
    });
  };

  const calendar = generateCalendar(currentDate);

  return (
    <>
      <Seo
        title="기간 출퇴근 | On & Off"
        description="On & Off에서 근태관리 서비스를 이용해보세요."
      />

      <AttendancePageContainer>
        <Card className="w-full rounded-lg bg-white shadow-sm">
          <Tabs value={tab} onValueChange={setTab}>
            <div className="relative px-4 pb-2 pt-4 sm:px-6 sm:pt-6">
              {/* 바닥선: 모바일에서는 겹침 방지를 위해 숨김 */}
              <div className="absolute bottom-1 left-0 z-0 hidden h-[1px] w-full translate-y-[0.5px] bg-white-bg dark:bg-dark-border-sub sm:block" />

              {/* 반응형 탭 리스트 */}
              <TabsList className="relative z-10 flex w-full flex-wrap gap-2 bg-transparent sm:w-fit sm:flex-nowrap sm:gap-5">
                <TabsTrigger
                  value="total"
                  className="rounded-t-md border border-b-0 border-white-border-sub px-6 py-2 text-base font-semibold data-[state=inactive]:border-b-0 data-[state=active]:border-b-white-card-bg data-[state=active]:bg-white-card-bg data-[state=inactive]:bg-white-bg data-[state=active]:text-white-text data-[state=inactive]:text-white-nav-text dark:border-dark-border-sub dark:data-[state=inactive]:border-b-0 dark:data-[state=active]:border-b-dark-card-bg dark:data-[state=active]:bg-dark-card-bg dark:data-[state=inactive]:bg-dark-bg dark:data-[state=active]:text-dark-text dark:data-[state=inactive]:text-dark-nav-text"
                >
                  전체 근태 현황
                </TabsTrigger>

                <TabsTrigger
                  value="employee"
                  className="rounded-t-md border border-b-0 border-white-border-sub px-6 py-2 text-base font-semibold data-[state=inactive]:border-b-0 data-[state=active]:border-b-white-card-bg data-[state=active]:bg-white-card-bg data-[state=inactive]:bg-white-bg data-[state=active]:text-white-text data-[state=inactive]:text-white-nav-text dark:border-dark-border-sub dark:data-[state=inactive]:border-b-0 dark:data-[state=active]:border-b-dark-card-bg dark:data-[state=active]:bg-dark-card-bg dark:data-[state=inactive]:bg-dark-bg dark:data-[state=active]:text-dark-text dark:data-[state=inactive]:text-dark-nav-text"
                >
                  직원별 월간 현황
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="total">
              <PeriodAttFilterSection
                type="total"
                currentDate={currentDate}
                onChangeDate={setCurrentDate}
                workplaceFilter={workplaceFilter}
                setWorkplaceFilter={setWorkplaceFilter}
                workTypeFilter={workTypeFilter}
                setWorkTypeFilter={setWorkTypeFilter}
              />
              <PeriodAttCalendarGrid
                calendar={calendar}
                currentDate={currentDate}
                variant="total"
              />
            </TabsContent>

            <TabsContent value="employee">
              <PeriodAttFilterSection
                type="employee"
                currentDate={currentDate}
                onChangeDate={setCurrentDate}
                workplaceFilter={workplaceFilter}
                setWorkplaceFilter={setWorkplaceFilter}
                employeeName={employeeName}
                setEmployeeName={setEmployeeName}
              />
              {/* <PeriodAttTable calendar={calendar} currentDate={currentDate} /> */}
              <PeriodAttCalendarGrid
                calendar={calendar}
                currentDate={currentDate}
                variant="employee"
              />
            </TabsContent>
          </Tabs>
        </Card>
      </AttendancePageContainer>
    </>
  );
};

export default PeriodAttendancePage;
