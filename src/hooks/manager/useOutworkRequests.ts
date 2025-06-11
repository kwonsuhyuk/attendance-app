import { useEffect, useState } from "react";
import { subscribeToOutworkRequests } from "@/api/commute.api";
import { useCompanyStore } from "@/store/company.store";
import { TOutworkRequestWithId } from "@/model/types/commute.type";

export function useOutworkRequests() {
  const [pendingOutworkList, setPendingOutworkList] = useState<TOutworkRequestWithId[]>([]);
  const [pendingOutworkCount, setPendingOutworkCount] = useState(0);

  const companyCode = useCompanyStore(state => state.currentCompany?.companyCode);

  useEffect(() => {
    if (!companyCode) return;

    const unsubscribe = subscribeToOutworkRequests(companyCode, requestList => {
      setPendingOutworkList(requestList);
      setPendingOutworkCount(requestList.length);
    });

    return () => unsubscribe();
  }, [companyCode]);

  return { pendingOutworkList, pendingOutworkCount };
}
