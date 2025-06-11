import { useEffect, useState } from "react";
import { getData } from "@/api";
import { TCommuteData, TCommuteStatus } from "@/model/types/commute.type";
import { computeCommuteStatus } from "@/util/commute.util";
import { getDatePath } from "@/util/getpath.util";
import { useUserStore } from "@/store/user.store";
import { useCompanyStore } from "@/store/company.store";
import { useMyOutworkRequests } from "./useMyOutworkRequests";

export function useCommuteStatus() {
  const [commuteData, setCommuteData] = useState<TCommuteData | null>(null);
  const [status, setStatus] = useState<TCommuteStatus>("not-checked-in");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const companyCode = useCompanyStore(state => state.currentCompany?.companyCode);
  const userId = useUserStore(state => state.currentUser?.uid);
  const { hasRequest: hasOutworkRequest, myOutworkRequests } = useMyOutworkRequests();

  useEffect(() => {
    if (!companyCode || !userId) return;

    const fetchCommuteStatus = async () => {
      setIsLoading(true);

      const now = new Date();
      const todayPath = getDatePath(now, companyCode, userId);

      const yesterday = new Date(now);
      yesterday.setDate(now.getDate() - 1);
      const yesterdayPath = getDatePath(yesterday, companyCode, userId);

      const [todayData, yesterdayData] = await Promise.all([
        getData<TCommuteData>(todayPath),
        getData<TCommuteData>(yesterdayPath),
      ]);

      const result = computeCommuteStatus(todayData, yesterdayData, hasOutworkRequest);
      setStatus(result.status);

      if (result.status === "out-working-checking" && myOutworkRequests.length > 0) {
        const latestOutwork = myOutworkRequests[0];
        setCommuteData({
          requestTime: latestOutwork.requestTime,
          outworkingMemo: latestOutwork.outworkingMemo,
        });
      } else {
        setCommuteData(result.data);
      }

      setIsLoading(false);
    };

    fetchCommuteStatus();
  }, [companyCode, userId, hasOutworkRequest, myOutworkRequests]);

  return { status, commuteData, isLoading };
}
