import dayjs from "dayjs";
import { TCommuteData, TCalendarDayInfo } from "@/model/types/commute.type";
import { TWorkPlace } from "@/model/types/company.type";

export function mapCommuteDataToCalendar(
  data: Record<string, TCommuteData> | null,
  currentDate: Date,
  workPlacesList: TWorkPlace[] = [],
  holidayList: string[] = [],
  vacationDateSet: Set<string> = new Set(),
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
    const isOutworking = commute?.startWorkplaceId === "외근";
    const isVacation = vacationDateSet.has(`${year}-${month}-${key}`);

    const startPlace = isOutworking
      ? "외근"
      : workPlacesList.find(p => p.id === commute?.startWorkplaceId)?.name || "근무지";

    const endPlace =
      commute?.endWorkplaceId === "외근"
        ? "외근"
        : workPlacesList.find(p => p.id === commute?.endWorkplaceId)?.name || "근무지";

    const isCompanyHoliday = holidayList.includes(`${year}-${month}-${key}`);

    return {
      day,
      summary: {
        출근: commute?.startTime && !isOutworking ? 1 : 0,
        외근: isOutworking ? 1 : 0,
        휴가: isVacation ? 1 : 0,
        총원: commute || isVacation ? 1 : 0,
      },
      // commute가 있으면 휴가여도 checkIn/out 유지
      checkIn:
        commute?.startTime || isOutworking
          ? {
              time: commute?.startTime ? dayjs(commute.startTime).format("HH:mm") : "",
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
