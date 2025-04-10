import { useState } from "react";
import Seo from "@/components/Seo";
import PeriodAttCalendarGrid from "@/components/company/attendance/PeriodAttCalendarGrid";
import PeriodAttFilterSection from "@/components/company/attendance/PeriodAttFilterSection";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import dayjs from "dayjs";
import { Card } from "@/components/ui/card";
import AttendancePageContainer from "@/components/container/manager/AttendancePageContainer";

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
            <div className="relative p-6">
              <div className="absolute bottom-5 left-0 z-0 h-[1px] w-full translate-y-[0.5px] bg-gray-200" />

              {/* 탭 리스트 */}
              <TabsList className="relative z-10 flex w-fit gap-5 bg-transparent">
                <TabsTrigger
                  value="total"
                  className="rounded-t-md border border-b-0 border-gray-300 px-6 py-2 text-base font-semibold data-[state=inactive]:border-b-0 data-[state=active]:border-b-white data-[state=active]:bg-white data-[state=inactive]:bg-gray-100 data-[state=active]:text-black data-[state=inactive]:text-gray-400"
                >
                  전체 근태 현황
                </TabsTrigger>

                <TabsTrigger
                  value="employee"
                  className="rounded-t-md border border-b-0 border-gray-300 px-6 py-2 text-base font-semibold data-[state=inactive]:border-b-0 data-[state=active]:border-b-white data-[state=active]:bg-white data-[state=inactive]:bg-gray-100 data-[state=active]:text-black data-[state=inactive]:text-gray-400"
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
              <PeriodAttCalendarGrid calendar={calendar} />
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
              <PeriodAttCalendarGrid calendar={calendar} />
            </TabsContent>
          </Tabs>
        </Card>
      </AttendancePageContainer>
    </>
  );
};

export default PeriodAttendancePage;
