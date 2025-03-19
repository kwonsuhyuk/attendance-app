import VacationFilter from "@/components/company/vacation/VacationFilter";
import VacationStatisticLayout from "@/layout/VacationStatisticLayout";
import VacationStatisticContainer from "@/components/container/manager/VacationStatisticContainer";
import VacationChart from "@/components/company/vacation/VacationChart";
import VacationStatisticTable from "@/components/company/vacation/VacationStatisticTable";

const VacationStatisticPage = () => {
  return (
    <VacationStatisticLayout>
      <VacationFilter />
      <VacationStatisticContainer>
        <VacationChart />
        <VacationStatisticTable />
      </VacationStatisticContainer>
    </VacationStatisticLayout>
  );
};

export default VacationStatisticPage;
