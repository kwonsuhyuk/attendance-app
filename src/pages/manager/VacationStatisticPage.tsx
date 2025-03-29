import { useEffect, useState } from "react";
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
    }
  };

  return (
    <VacationStatisticLayout>
      <VacationFilter
        selectedName={selectedName}
        selectedMonth={selectedDate}
        setSelectedMonth={setSelectedDate}
        selectedMode={mode}
        setSelectedMode={setMode}
        handleNameSelect={handleNameSelect}
        employeeList={employeeList}
      />
      <VacationStatisticContainer>
        <VacationChart selectedDate={selectedDate} selectedName={selectedName} mode={mode} />
        <div className="flex min-h-[680px] flex-col gap-3 md:flex-row">
          <Card className="hidden h-full items-center justify-center px-4 py-10 md:block md:min-h-[680px] md:w-1/3">
            <VacationPieChart selectedDate={selectedDate} selectedName={selectedName} mode={mode} />
          </Card>
          <VacationStatisticTable
            employeeList={paginatedEmployees}
            page={page}
            totalPages={totalPageCount}
            handleNextPage={handleNextPage}
            handlePreviousPage={handlePreviousPage}
            selectedDate={selectedDate}
            mode={mode}
          />
        </div>
      </VacationStatisticContainer>
    </VacationStatisticLayout>
  );
};

export default VacationStatisticPage;
