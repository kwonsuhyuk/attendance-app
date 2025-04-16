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

      const todayPath = getUserDayCommutePath(companyCode, year, month, day, userId);

      const yesterday = new Date(now);
      yesterday.setDate(yesterday.getDate() - 1);
      const yYear = String(yesterday.getFullYear());
      const yMonth = String(yesterday.getMonth() + 1).padStart(2, "0");
      const yDay = String(yesterday.getDate()).padStart(2, "0");

      const yesterdayPath = getUserDayCommutePath(companyCode, yYear, yMonth, yDay, userId);

      const [todayData, yesterdayData] = await Promise.all([
        getData<TCommuteData>(todayPath),
        getData<TCommuteData>(yesterdayPath),
      ]);

      console.log(todayData, yesterdayData);
      // 외근은 그냥 오늘 데이터만 봄
      const isOutWork = todayData?.startWorkplaceId === "외근";
      if (isOutWork) {
        setStatus("out-working");
        setCommuteData(todayData);
        setIsLoading(false);
        return;
      }

      const hasStartToday = !!todayData?.startTime;
      const hasEndToday = !!todayData?.endTime;

      const hasStartYesterday = !!yesterdayData?.startTime;
      const hasEndYesterday = !!yesterdayData?.endTime;

      let computedStatus: TCommuteStatus = "not-checked-in";
      let mergedCommute: TCommuteData | null = todayData;

      if (hasStartYesterday && !hasEndYesterday && !hasStartToday && !hasEndToday) {
        computedStatus = "checked-in-only";
        mergedCommute = yesterdayData;
      } else if (hasStartYesterday && hasEndToday && !hasStartToday) {
        computedStatus = "checked-in-and-out";
        mergedCommute = {
          ...yesterdayData,
          endTime: todayData?.endTime,
          endWorkplaceId: todayData?.endWorkplaceId,
        };
      } else if (hasStartToday && hasEndToday) {
        computedStatus = "checked-in-and-out";
      } else if (hasStartToday && !hasEndToday) {
        computedStatus = "checked-in-only";
      } else if (!hasStartToday && hasEndToday) {
        computedStatus = "missing-check-in";
      } else {
        computedStatus = "not-checked-in";
      }

      setStatus(computedStatus);
      setCommuteData(mergedCommute);
      setIsLoading(false);
    };

    fetch();
  }, [companyCode, userId]);

  return { status, commuteData, isLoading };
}
