import { TCommuteData, TCommuteStatus } from "@/model/types/commute.type";
import dayjs from "dayjs";

export const getWorkTypeFromCommute = (data?: TCommuteData): "출근" | "외근" | undefined => {
  if (!data) return undefined;
  if (data.startTime) return "출근";
  if (data.outworkingMemo || data.startWorkplaceId === "외근") return "외근";
  return undefined;
};

const getDiffInMinutes = (start: string, end: string): number => {
  const s = dayjs(start);
  const e = dayjs(end);
  return e.diff(s, "minute");
};

export const calculateCommuteSummaryByType = (
  commuteData: Record<string, TCommuteData>,
  vacationDates: string[],
  year: string,
  month: string,
): {
  work: { time: number; count: number };
  out: { time: number; count: number };
  vacation: { count: number };
} => {
  const summary = {
    work: { time: 0, count: 0 },
    out: { time: 0, count: 0 },
    vacation: { count: 0 },
  };

  const workDays = new Set<string>();
  const outDays = new Set<string>();
  const vacationDays = new Set<string>();

  const vacationDateSet = new Set(
    vacationDates.filter(date => date.startsWith(`${year}-${month.padStart(2, "0")}`)),
  );

  Object.entries(commuteData).forEach(([date, data]) => {
    const start = data.startTime;
    const end = data.endTime;

    if (start || end) {
      workDays.add(date);
      if (start && end) {
        const minutes = dayjs(end).diff(dayjs(start), "minute");
        summary.work.time += minutes;
      }
    }

    if (data.outworkingMemo || data.startWorkplaceId === "외근") {
      outDays.add(date);
      if (start && end) {
        const minutes = dayjs(end).diff(dayjs(start), "minute");
        summary.out.time += minutes;
      }
    }
  });

  vacationDateSet.forEach(date => {
    vacationDays.add(date);
  });

  summary.work.count = workDays.size;
  summary.out.count = outDays.size;
  summary.vacation.count = vacationDays.size;

  return summary;
};
//
export function computeCommuteStatus(
  today: TCommuteData | null,
  yesterday: TCommuteData | null,
): { status: TCommuteStatus; data: TCommuteData | null } {
  const hasStartToday = !!today?.startTime;
  const hasEndToday = !!today?.endTime;
  const hasStartYesterday = !!yesterday?.startTime;
  const hasEndYesterday = !!yesterday?.endTime;

  const isOutWorkToday = today?.startWorkplaceId === "외근";
  if (isOutWorkToday) {
    return { status: "out-working", data: today };
  }

  if (hasStartYesterday && !hasEndYesterday && !hasStartToday && !hasEndToday) {
    return { status: "checked-in-only", data: yesterday };
  }

  if (hasStartYesterday && hasEndToday && !hasStartToday) {
    return {
      status: "checked-in-and-out",
      data: {
        ...yesterday!,
        endTime: today!.endTime,
        endWorkplaceId: today!.endWorkplaceId,
      },
    };
  }

  if (hasStartToday && hasEndToday) {
    return { status: "checked-in-and-out", data: today };
  }

  if (hasStartToday && !hasEndToday) {
    return { status: "checked-in-only", data: today };
  }

  if (!hasStartToday && hasEndToday) {
    return { status: "missing-check-in", data: today };
  }

  return { status: "not-checked-in", data: today };
}