import { useCompanyStore } from "@/store/company.store";
import { useCommuteStatus } from "./useCommuteStatus";
import { useUserStore } from "@/store/user.store";

export default function useCommuteBox(companyCode: string) {
  const userId = useUserStore(state => state.currentUser?.uid);
  const workPlacesList = useCompanyStore(state => state.currentCompany?.workPlacesList ?? []);
  const { status, commuteData, isLoading } = useCommuteStatus(companyCode, userId);

  const getWorkplaceInfo = (type: "startPlace" | "endPlace") => {
    const id = type === "startPlace" ? commuteData?.startWorkplaceId : commuteData?.endWorkplaceId;
    if (id === "외근") {
      return { name: "외근", address: "" };
    }
    return workPlacesList.find(place => place.id === id);
  };

  const startWorkplace = getWorkplaceInfo("startPlace");
  const endWorkplace = getWorkplaceInfo("endPlace");

  return {
    status,
    isLoading,
    commuteData,
    startWorkplace,
    endWorkplace,
  };
}
