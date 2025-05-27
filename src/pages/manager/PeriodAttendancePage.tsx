import Seo from "@/components/Seo";
import PeriodAttCalendarGrid from "@/components/company/attendance/PeriodAttCalendarGrid";
import PeriodAttFilterSection from "@/components/company/attendance/PeriodAttFilterSection";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import AttendancePageContainer from "@/components/container/manager/AttendancePageContainer";
import usePeriodAttendance from "@/hooks/manager/usePeriodAttendance";
import { useEmployeeList } from "@/hooks/manager/useEmployeeList";
import { periodAttTourSteps } from "@/constants/managerTourSteps";
import { useTour } from "@/hooks/use-tour";
import { useTourStore } from "@/store/tour.store";
import { Separator } from "@/components/ui/separator";

const PeriodAttendancePage = () => {
  const { employeeList } = useEmployeeList();
  const {
    tab,
    setTab,
    currentDate,
    setCurrentDate,
    workplaceFilter,
    setWorkplaceFilter,
    workTypeFilter,
    setWorkTypeFilter,
    employeeName,
    setEmployeeName,
    selectedEmployee,
    setSelectedEmployee,
    calendar,
  } = usePeriodAttendance(employeeList);

  useTour("period_att", periodAttTourSteps);

  const handleTabClick = (tab: "total" | "employee") => {
    setTab(tab);

    if (tab === "employee") {
      setTimeout(() => {
        useTourStore.getState().setSteps([
          {
            target: '[data-tour="period-5"]',
            content: "이 탭은 특정 직원의 이름을 검색하면 근태 현황이 나옵니다.",
            disableBeacon: true,
          },
        ]);
        useTourStore.getState().setRun(true);
      }, 200);
    }
  };

  const tabTriggerBaseClass =
    "rounded-t-md border border-b-0 flex flex-1 border-white-border-sub px-1 py-2 text-base font-semibold " +
    "data-[state=inactive]:border-b-0 data-[state=active]:border-b-white-card-bg data-[state=active]:bg-white-card-bg data-[state=inactive]:bg-white-bg " +
    "data-[state=active]:text-white-text data-[state=inactive]:text-white-nav-text " +
    "dark:border-dark-border-sub dark:data-[state=inactive]:border-b-0 dark:data-[state=active]:border-b-dark-card-bg dark:data-[state=active]:bg-dark-card-bg " +
    "dark:data-[state=inactive]:bg-dark-bg dark:data-[state=active]:text-dark-text dark:data-[state=inactive]:text-dark-nav-text sm:px-6";
  return (
    <>
      <Seo
        title={
          tab === "employee" && selectedEmployee
            ? `${selectedEmployee.name}님의 근태 현황 | On & Off`
            : "기간 출퇴근 | On & Off"
        }
        description="On & Off에서 근태관리 서비스를 이용해보세요."
      />

      <AttendancePageContainer>
        <Card className="w-full rounded-lg bg-white shadow-sm">
          <Tabs value={tab} onValueChange={value => setTab(value as "total" | "employee" | "")}>
            <div className="relative px-4 pb-2 pt-4 sm:px-6 sm:pt-6">
              {/* 탭 구분선 */}
              <div className="absolute bottom-1 left-0 z-0 hidden h-[1px] w-full translate-y-[0.5px] bg-white-bg dark:bg-dark-border-sub sm:block" />

              {/* 반응형 탭 리스트 */}
              <TabsList
                className="relative z-10 flex w-full flex-wrap gap-2 bg-transparent sm:w-fit sm:flex-nowrap sm:gap-5"
                data-tour="period-1"
              >
                <TabsTrigger value="total" className={tabTriggerBaseClass}>
                  전체 근태 현황
                </TabsTrigger>
                <TabsTrigger
                  value="employee"
                  className={tabTriggerBaseClass}
                  onClick={() => handleTabClick("employee")}
                >
                  직원별 월간 현황
                </TabsTrigger>
              </TabsList>
            </div>

            {/* 전체 현황 */}
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
              <Separator />
              <PeriodAttCalendarGrid
                calendar={calendar}
                currentDate={currentDate}
                variant="total"
                workplace={workplaceFilter}
              />
            </TabsContent>

            {/* 직원 상세 현황 */}
            <TabsContent value="employee" data-tour="period-5">
              <PeriodAttFilterSection
                type="employee"
                currentDate={currentDate}
                onChangeDate={setCurrentDate}
                workplaceFilter={workplaceFilter}
                setWorkplaceFilter={setWorkplaceFilter}
                employeeName={employeeName}
                setEmployeeName={setEmployeeName}
                selectedEmployee={selectedEmployee}
                setSelectedEmployee={setSelectedEmployee}
              />
              <Separator />
              <PeriodAttCalendarGrid
                calendar={calendar}
                variant="employee"
                currentDate={currentDate}
                selectedEmployee={selectedEmployee}
              />
            </TabsContent>
          </Tabs>
        </Card>
      </AttendancePageContainer>
    </>
  );
};

export default PeriodAttendancePage;
