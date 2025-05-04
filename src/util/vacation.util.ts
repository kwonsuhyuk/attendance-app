import { TVacationRequest } from "@/model/types/vacation.type";
import { addDays, eachDayOfInterval, endOfMonth, format, parseISO, startOfMonth } from "date-fns";

export const flattenVacationEntries = (entries: any[], uid?: string) => {
  const flattened: any[] = [];
  entries.forEach(entry => {
    if (uid && entry.uid !== uid) return;
    const start = parseISO(entry.startDate);
    const end = parseISO(entry.endDate);
    eachDayOfInterval({ start, end }).forEach(date => {
      flattened.push({
        ...entry,
        type: entry.vacationType,
        date: date,
        dateKey: `${date.getMonth() + 1}`.padStart(2, "0"),
      });
    });
  });
  return flattened;
};

export const groupByDateKey = (data: any[], mode: "month" | "year") => {
  const groupMap: Record<string, any[]> = {};
  data.forEach(item => {
    const key = mode === "month" ? item.date.toISOString().slice(5, 10) : item.dateKey;
    if (!groupMap[key]) groupMap[key] = [];
    groupMap[key].push(item);
  });
  return groupMap;
};

export const getMonthDates = (year: number, month: number): string[] => {
  const firstDay = startOfMonth(new Date(year, month));
  const lastDay = endOfMonth(new Date(year, month));

  const dates: string[] = [];
  for (let day = firstDay; day <= lastDay; day = addDays(day, 1)) {
    dates.push(format(day, "MM-dd"));
  }

  return dates;
};

interface IGetFilteredDetailsParams {
  rawDetails: any[];
  selectedData: any;
  mode: "month" | "year";
}

export const getFilteredDetails = ({
  rawDetails,
  selectedData,
  mode,
}: IGetFilteredDetailsParams) => {
  if (!selectedData) return [];

  if (mode === "month") {
    return rawDetails.filter(detail => detail.date === selectedData.date);
  }

  if (mode === "year") {
    const selectedMonth = parseInt(selectedData.monthLabel?.replace("월", "") ?? "0", 10);
    return rawDetails.filter(detail => parseISO(detail.startDate).getMonth() + 1 === selectedMonth);
  }

  return [];
};

export const calculateVacationDaysByType = (requests: TVacationRequest[]) => {
  const result = {
    totalDays: 0,
    annual: 0,
    half: 0,
    special: 0,
  };

  requests.forEach(request => {
    const start = new Date(request.startDate);
    const end = new Date(request.endDate);
    const duration = (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24) + 1;

    // 승인된 휴가만 계산
    if (request.status !== "승인") return;

    if (request.vacationType === "연차") {
      result.annual += duration;
    } else if (request.vacationType === "반차") {
      result.half += 0.5; // 반차는 보통 0.5일로 간주
    } else if (request.vacationType === "특별") {
      result.special += duration;
    }

    result.totalDays = result.annual + result.half + result.special;
  });

  return result;
};

export const getVacationDateRange = (start: string, end: string): string[] => {
  const days = eachDayOfInterval({
    start: new Date(start),
    end: new Date(end),
  });
  return days.map(day => format(day, "yyyy-MM-dd"));
};

