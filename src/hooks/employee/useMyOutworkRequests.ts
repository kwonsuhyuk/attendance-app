import { useEffect, useState } from "react";
import { useUserStore } from "@/store/user.store";
import { useCompanyStore } from "@/store/company.store";
import { subscribeToOutworkRequests } from "@/api/commute.api";
import { TOutworkRequestWithId } from "@/model/types/commute.type";

export function useMyOutworkRequests() {
  const [myOutworkRequests, setMyOutworkRequests] = useState<TOutworkRequestWithId[]>([]);
  const [hasRequest, setHasRequest] = useState(false);

  const companyCode = useCompanyStore(state => state.currentCompany?.companyCode);
  const userId = useUserStore(state => state.currentUser?.uid);

  useEffect(() => {
    if (!companyCode || !userId) return;

    const unsubscribe = subscribeToOutworkRequests(companyCode, requestList => {
      const userRequests = requestList.filter(req => req.requester.uid === userId);
      setMyOutworkRequests(userRequests);
      setHasRequest(userRequests.length > 0);
    });

    return () => unsubscribe();
  }, [companyCode, userId]);

  return {
    hasRequest,
    myOutworkRequests,
  };
}
