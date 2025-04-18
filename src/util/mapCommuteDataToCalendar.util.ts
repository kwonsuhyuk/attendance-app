import dayjs from "dayjs";
import { TCommuteData, TCalendarDayInfo } from "@/model/types/commute.type";
import { TWorkPlace } from "@/model/types/company.type";

export function mapCommuteDataToCalendar(
  data: Record<string, TCommuteData> | null,
  currentDate: Date,
  workPlacesList: TWorkPlace[] = [],
  holidayList: string[] = [],
): (TCalendarDayInfo | null)[] {
  const daysInMonth = dayjs(currentDate).daysInMonth();
  const startOfMonth = dayjs(currentDate).startOf("month").day();
  const totalCells = Math.ceil((startOfMonth + daysInMonth) / 7) * 7;

  const year = dayjs(currentDate).format("YYYY");
  const month = dayjs(currentDate).format("MM");

  return Array.from({ length: totalCells }, (_, i) => {
    const day = i - startOfMonth + 1;
    if (day < 1 || day > daysInMonth) return null;

    const key = String(day).padStart(2, "0");
    const commute = data?.[key];

    const startPlace =
      workPlacesList.find(p => p.id === commute?.startWorkplaceId)?.name || "근무지";
    const endPlace = workPlacesList.find(p => p.id === commute?.endWorkplaceId)?.name || "근무지";
    const isCompanyHoliday = holidayList.includes(`${year}-${month}-${key}`);

    return {
      day,
      summary: {
        출근: commute?.startTime ? 1 : 0,
        외근: commute?.startWorkplaceId === "외근" ? 1 : 0,
        휴가: 0,
        총원: commute ? 1 : 0,
      },
      checkIn: commute?.startTime
        ? {
            time: dayjs(commute.startTime).format("HH:mm"),
            workplace: startPlace,
          }
        : undefined,
      checkOut: commute?.endTime
        ? {
            time: dayjs(commute.endTime).format("HH:mm"),
            workplace: endPlace,
          }
        : undefined,
      isCompanyHoliday,
    };
  });
}
