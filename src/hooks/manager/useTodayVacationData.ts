import { useState } from "react";
import { useVacationChartData } from "../vacation/useVacationChartData";
import dayjs from "dayjs";
import { getFilteredDetails } from "@/util/vacation.util";

export default function useTodayVacationData({
  vacationData,
  selectedDate,
}: {
  vacationData: any[];
  selectedDate: Date;
}) {
  const todayKey = dayjs(selectedDate).format("MM-DD");
  const todayVacationData = vacationData.find(item => item.date === todayKey);

  const totalTodayVacationCount =
    (todayVacationData?.annual || 0) +
    (todayVacationData?.half || 0) +
    (todayVacationData?.special || 0);

  return {
    todayVacationData,
    totalTodayVacationCount,
  };
}
