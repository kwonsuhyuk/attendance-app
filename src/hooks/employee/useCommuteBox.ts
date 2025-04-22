import { useCompanyStore } from "@/store/company.store";
import { useCommuteStatus } from "./useCommuteStatus";
import { useUserStore } from "@/store/user.store";
import { useShallow } from "zustand/shallow";
import { useMemo } from "react";

export default function useCommuteBox() {
  const { status, commuteData, isLoading } = useCommuteStatus();
  const workPlacesList = useCompanyStore(state => state.currentCompany?.workPlacesList);
  console.log(status, "qwe");
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
