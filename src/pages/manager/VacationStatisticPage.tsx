import { useState } from "react";
import VacationStatisticLayout from "@/layout/VacationStatisticLayout";
import VacationStatisticContainer from "@/components/container/manager/VacationStatisticContainer";
import VacationChart from "@/components/company/vacation/VacationChart";
import VacationStatisticTable from "@/components/company/vacation/VacationStatisticTable";
import VacationPieChart from "@/components/company/vacation/VacationPieChart";
import VacationFilter from "@/components/company/vacation/VacationFilter";
import { Card } from "@/components/ui/card";
import { TEmpUserData } from "@/model/types/user.type";

const VacationStatisticPage = () => {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState({
    year: today.getFullYear(),
    month: today.getMonth(),
  });
  const [mode, setMode] = useState<"month" | "year">("month");
  const [selectedName, setSelectedName] = useState<TEmpUserData | null>(null);

  return (
    <VacationStatisticLayout>
      <VacationFilter
        selectedMonth={selectedDate}
        setSelectedMonth={setSelectedDate}
        selectedMode={mode}
        setSelectedMode={setMode}
        handleNameSelect={setSelectedName}
      />
      <VacationStatisticContainer>
        <VacationChart selectedDate={selectedDate} selectedName={selectedName} mode={mode} />
        <div className="flex min-h-[680px] flex-col gap-3 md:flex-row">
          <Card className="hidden h-full items-center justify-center px-4 py-10 md:block md:min-h-[680px] md:w-1/3">
            <VacationPieChart selectedDate={selectedDate} selectedName={selectedName} mode={mode} />
          </Card>
          <VacationStatisticTable />
        </div>
      </VacationStatisticContainer>
    </VacationStatisticLayout>
  );
};

export default VacationStatisticPage;
