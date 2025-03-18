import VacationFilter from "@/components/company/vacation/VacationFilter";
import VacationPageContainer from "@/components/container/manager/VacationPageContainer";
import { Card } from "@/components/ui/card";
import VacationStatisticLayout from "@/layout/VacationStatisticLayout";

const VacationStatisticPage = () => {
  return (
    <VacationStatisticLayout>
      <VacationFilter />
      <Card className="h-full"></Card>
    </VacationStatisticLayout>
  );
};

export default VacationStatisticPage;
