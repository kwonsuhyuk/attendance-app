import { useEffect, useState } from "react";
import { getUserDayCommutePath } from "@/constants/api.path";
import { getData } from "@/api";
import { TCommuteData, TCommuteStatus } from "@/model/types/commute.type";

export function useCommuteStatus(companyCode?: string, userId?: string) {
  const [commuteData, setCommuteData] = useState<TCommuteData | null>(null);
  const [status, setStatus] = useState<TCommuteStatus>("not-checked-in");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!companyCode || !userId) return;

    const fetch = async () => {
      setIsLoading(true);
      const now = new Date();
      const year = String(now.getFullYear());
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const day = String(now.getDate()).padStart(2, "0");

      const path = getUserDayCommutePath(companyCode, year, month, day, userId);
      const data = await getData<TCommuteData>(path);
      setCommuteData(data);

      const hasStart = !!data?.startTime;
      const hasEnd = !!data?.endTime;

      const computedStatus: TCommuteStatus =
        !hasStart && !hasEnd
          ? "not-checked-in"
          : hasStart && !hasEnd
            ? "checked-in-only"
            : hasStart && hasEnd
              ? "checked-in-and-out"
              : "missing-check-in";

      setStatus(computedStatus);
      setIsLoading(false);
    };

    fetch();
  }, [companyCode, userId]);

  return { status, commuteData, isLoading };
}
