import VacationFilter from "@/components/company/vacation/VacationFilter";
import VacationStatisticLayout from "@/layout/VacationStatisticLayout";
import VacationStatisticContainer from "@/components/container/manager/VacationStatisticContainer";
import VacationChart from "@/components/company/vacation/VacationChart";
import VacationStatisticTable from "@/components/company/vacation/VacationStatisticTable";
import { Card } from "@/components/ui/card";
import VacationPieChart from "@/components/company/vacation/VacationPieChart";
import { useState } from "react";

const VacationStatisticPage = () => {
  const today = new Date();

  const [selectedMonth, setSelectedMonth] = useState({
    year: today.getFullYear(),
    month: today.getMonth(),
  });

  return (
    <VacationStatisticLayout>
      <VacationFilter selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth} />
      <VacationStatisticContainer>
        <VacationChart selectedMonth={selectedMonth} />
        <div className="flex min-h-[680px] flex-col gap-3 md:flex-row">
          <Card className="hidden h-full items-center justify-center px-4 py-10 md:block md:min-h-[680px] md:w-1/3">
            <VacationPieChart />
          </Card>
          <VacationStatisticTable />
        </div>
      </VacationStatisticContainer>
    </VacationStatisticLayout>
  );
};

export default VacationStatisticPage;
