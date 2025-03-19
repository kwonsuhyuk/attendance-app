import VacationFilter from "@/components/company/vacation/VacationFilter";
import VacationStatisticLayout from "@/layout/VacationStatisticLayout";
import VacationStatisticContainer from "@/components/container/manager/VacationStatisticContainer";
import VacationChart from "@/components/company/vacation/VacationChart";
import VacationStatisticTable from "@/components/company/vacation/VacationStatisticTable";

import { Card } from "@/components/ui/card";
import VacationPieChart from "@/components/company/vacation/VacationPieChart";

const VacationStatisticPage = () => {
  return (
    <VacationStatisticLayout>
      <VacationFilter />
      <VacationStatisticContainer>
        <VacationChart />
        <div className="flex flex-col gap-3 md:flex-row">
          <Card className="hidden h-full items-center justify-center px-4 py-10 md:block md:min-h-[600px] md:w-1/3">
            <VacationPieChart />
          </Card>
          <VacationStatisticTable />
        </div>
      </VacationStatisticContainer>
    </VacationStatisticLayout>
  );
};

export default VacationStatisticPage;
