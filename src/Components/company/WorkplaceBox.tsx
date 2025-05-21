import { useCompanyStore } from "@/store/company.store";
import { Building2 } from "lucide-react";
import WorkPlaceItem from "./company-settings/workplace-setting/WorkPlaceItem";
import SummaryCard from "./\bSummaryCard";

const WorkplaceBox = () => {
  const workplaces = useCompanyStore(state => state.currentCompany?.workPlacesList);

  return (
    <div className="space-y-4">
      <SummaryCard title="전체 근무지 수" count={workplaces?.length} icon={Building2} />
      <ul className="relative max-h-[380px] space-y-2 overflow-y-auto rounded-md border border-solid border-white-border-sub py-3 pr-1 dark:border-dark-border-sub">
        {workplaces && workplaces.length > 0 ? (
          workplaces.map(place => <WorkPlaceItem place={place} key={place.id} />)
        ) : (
          <div className="rounded-md px-4 py-4 text-sm text-muted-foreground">
            등록된 근무지가 없습니다. 근무지 관리에서 근무지를 추가해주세요.
          </div>
        )}
      </ul>
    </div>
  );
};

export default WorkplaceBox;
