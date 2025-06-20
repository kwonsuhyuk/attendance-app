import { useCompanyStore } from "@/store/company.store";
import { useCommuteStatus } from "./useCommuteStatus";
import { useMemo } from "react";

export default function useCommuteBox() {
  const { status, commuteData, isLoading } = useCommuteStatus();
  const workPlacesList = useCompanyStore(state => state.currentCompany?.workPlacesList);

  const getWorkplaceInfo = (type: "startPlace" | "endPlace") => {
    const id = type === "startPlace" ? commuteData?.startWorkplaceId : commuteData?.endWorkplaceId;
    if (id === "외근") {
      return { name: "외근", address: "" };
    }
    return workPlacesList?.find(place => place.id === id);
  };

  const startWorkplace = useMemo(() => getWorkplaceInfo("startPlace"), [commuteData]);
  const endWorkplace = useMemo(() => getWorkplaceInfo("endPlace"), [commuteData]);

  return {
    status,
    isLoading,
    commuteData,
    startWorkplace,
    endWorkplace,
  };
}
