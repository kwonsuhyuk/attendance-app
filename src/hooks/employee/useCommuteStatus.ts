import { useEffect, useState } from "react";
import { getUserDayCommutePath } from "@/constants/api.path";
import { getData } from "@/api";
import { TCommuteData, TCommuteStatus } from "@/model/types/commute.type";
import { computeCommuteStatus } from "@/util/commute.util";
import { getDatePath } from "@/util/getpath.util";

export function useCommuteStatus(companyCode?: string, userId?: string) {
  const [commuteData, setCommuteData] = useState<TCommuteData | null>(null);
  const [status, setStatus] = useState<TCommuteStatus>("not-checked-in");
  const [isLoading, setIsLoading] = useState<boolean>(true);

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

      const result = computeCommuteStatus(todayData, yesterdayData);
      setCommuteData(result.data);
      setStatus(result.status);
      setIsLoading(false);
    };

    fetchCommuteStatus();
  }, [companyCode, userId]);

  return { status, commuteData, isLoading };
}
