import { useCompanyStore } from "@/store/company.store";
import { Building2 } from "lucide-react";
import WorkPlaceItem from "./company-settings/workplace-setting/WorkPlaceItem";
import SummaryCard from "./\bSummaryCard";
import { CardContent } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";

const WorkplaceBox = () => {
  const workPlaces = useCompanyStore(state => state.currentCompany?.workPlacesList);
  return (
    <div className="space-y-4" data-tour="manager_home-5">
      <SummaryCard title="전체 근무지 수" count={workPlaces?.length} icon={Building2} />

      <CardContent className="flex h-[28rem] items-center justify-center rounded-xl p-2 shadow-md">
        {!workPlaces || workPlaces?.length === 0 ? (
          <div className="p-12">
            <p className="text-center text-sm text-muted-foreground">추가된 근무지가 없습니다.</p>
          </div>
        ) : (
          <ScrollArea className="h-full w-full overflow-y-auto rounded-xl dark:border-dark-border">
            {workPlaces &&
              workPlaces.map((place, index) => (
                <div key={place.id}>
                  <WorkPlaceItem place={place} />
                  {/* {index !== workPlaces.length - 1 && <Separator />} */}
                </div>
              ))}
          </ScrollArea>
        )}
      </CardContent>
    </div>
  );
};

export default WorkplaceBox;
