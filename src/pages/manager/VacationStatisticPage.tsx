import { useEffect, useRef, useState } from "react";
import VacationStatisticLayout from "@/layout/VacationStatisticLayout";
import VacationStatisticContainer from "@/components/container/manager/VacationStatisticContainer";
import VacationChart from "@/components/company/vacation/VacationChart";
import VacationStatisticTable from "@/components/company/vacation/VacationStatisticTable";
import VacationPieChart from "@/components/company/vacation/VacationPieChart";
import VacationFilter from "@/components/company/vacation/VacationFilter";
import { Card } from "@/components/ui/card";
import { EmployeeInfo } from "@/model/types/user.type";
import { useSearchParams } from "react-router-dom";
import { useEmployeeList } from "@/hooks/manager/useEmployeeList";
import Seo from "@/components/Seo";
import { useTour } from "@/hooks/use-tour";
import { vacationStatisticSteps } from "@/constants/managerTourSteps";

const VacationStatisticPage = () => {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState({
    year: today.getFullYear(),
    month: today.getMonth(),
  });
  const [selectedName, setSelectedName] = useState<EmployeeInfo | null>(null);
  const [mode, setMode] = useState<"month" | "year">("month");
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    employeeList,
    paginatedEmployees,
    page,
    totalPageCount,
    handleNextPage,
    handlePreviousPage,
  } = useEmployeeList();
  const tableTopRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const uid = searchParams.get("user");
    const found = employeeList.find(emp => emp.uid === uid);
    setSelectedName(found ?? null);
  }, [searchParams, employeeList]);

  const handleNameSelect = (user: EmployeeInfo | null) => {
    if (user) {
      setSelectedName(user);
      const params = new URLSearchParams(searchParams);
      params.set("user", user.uid);
      setSearchParams(params);

      setTimeout(() => {
        tableTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  };
  useTour("v_static", vacationStatisticSteps);

  return (
    <>
      <Seo
        title="휴가 통계 | On & Off"
        description="On & Off에서 근태관리 서비스를 이용해보세요."
      />
      <div ref={tableTopRef} />
      <VacationStatisticLayout>
        <VacationFilter
          selectedMonth={selectedDate}
          setSelectedMonth={setSelectedDate}
          selectedMode={mode}
          setSelectedMode={setMode}
          selectedName={selectedName}
          handleNameSelect={handleNameSelect}
          employeeList={employeeList}
        />
        <VacationStatisticContainer>
          <VacationChart selectedDate={selectedDate} selectedName={selectedName} mode={mode} />
          <div className="flex min-h-[680px] flex-col gap-3 md:flex-row">
            <Card className="hidden h-full items-center justify-center px-4 py-10 md:min-h-[680px] lg:block lg:w-1/2">
              <VacationPieChart
                selectedDate={selectedDate}
                selectedName={selectedName}
                mode={mode}
              />
            </Card>
            <VacationStatisticTable
              employeeList={paginatedEmployees}
              page={page}
              totalPages={totalPageCount}
              handleNextPage={handleNextPage}
              handlePreviousPage={handlePreviousPage}
              selectedDate={selectedDate}
              selectedName={selectedName}
              handleNameSelect={handleNameSelect}
              mode={mode}
            />
          </div>
        </VacationStatisticContainer>
      </VacationStatisticLayout>
    </>
  );
};

export default VacationStatisticPage;
