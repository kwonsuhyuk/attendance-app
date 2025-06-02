import { Card, CardTitle } from "@/components/ui/card";
import PeriodAttCalendarDayCard from "./PeriodAttCalendarDayCard";
import PeriodAttCalendarList from "./PeriodAttCalendarList";
import { useIsMobile } from "@/hooks/use-mobile";
import dayjs from "dayjs";
import { EmployeeInfo } from "@/model/types/user.type";
import { TCalendarDayInfo } from "@/model/types/commute.type";

const DAYS = ["일", "월", "화", "수", "목", "금", "토"];

interface Props {
  calendar: (TCalendarDayInfo | null)[];
  currentDate: Date;
  variant?: "total" | "employee";
  selectedEmployee?: EmployeeInfo | null;
  workplace?: string;
}

const PeriodAttCalendarGrid = ({
  calendar,
  currentDate,
  variant = "total",
  selectedEmployee,
  workplace,
}: Props) => {
  const isMobile = useIsMobile();
  if (isMobile) {
    const year = dayjs(currentDate).format("YYYY");
    const month = dayjs(currentDate).format("MM");

    return (
      <div className="p-2">
        <CardTitle className="flex w-fit flex-wrap items-center gap-2 rounded-md p-4 py-5 text-base font-semibold">
          {variant === "total" ? (
            <>
              <span className="text-xl font-bold text-zinc-900">
                {workplace === "전체" ? "전체" : workplace}
              </span>
              <span className="text-sm font-medium text-zinc-500">근태 현황</span>
            </>
          ) : selectedEmployee ? (
            <>
              <span className="text-xl font-bold text-zinc-900">{selectedEmployee.name}</span>
              <span className="text-sm font-medium text-zinc-500">님의 근태 현황</span>
            </>
          ) : (
            <span className="text-xl font-medium text-zinc-500">직원을 선택해주세요.</span>
          )}
        </CardTitle>
        {calendar
          .filter(day => day !== null)
          .map((day, idx) => (
            <PeriodAttCalendarList
              key={idx}
              date={`${year}-${month}-${String(day!.day).padStart(2, "0")}`}
              variant={variant}
              summary={day.summary}
              checkIn={day.checkIn}
              checkOut={day.checkOut}
              isCompanyHoliday={day?.isCompanyHoliday ?? false}
              isHoliday={dayjs(`${year}-${month}-${String(day!.day).padStart(2, "0")}`).day() === 0}
            />
          ))}
      </div>
    );
  }

  return (
    <div
      className="mb-12 overflow-hidden rounded-lg border border-white-border-sub px-6 pb-6 shadow-md dark:border-dark-border-sub"
      data-tour="period-3"
    >
      <CardTitle className="my-3 flex w-fit flex-wrap items-center gap-2 rounded-md p-4 py-5 text-base font-semibold">
        {variant === "total" ? (
          <>
            <span className="text-xl font-bold text-zinc-900">
              {workplace === "전체" ? "전체" : workplace}
            </span>
            <span className="text-sm font-medium text-zinc-500">근태 현황</span>
          </>
        ) : selectedEmployee ? (
          <>
            <span className="text-xl font-bold text-zinc-900">{selectedEmployee.name}</span>
            <span className="text-sm font-medium text-zinc-500">님의 근태 현황</span>
          </>
        ) : (
          <span className="text-xl font-medium text-zinc-500">직원을 선택해주세요.</span>
        )}
      </CardTitle>

      <div className="grid grid-cols-7 border border-solid border-white-border-sub bg-white pb-2 pt-2 text-center font-medium text-white-text dark:border-dark-border-sub dark:bg-dark-bg dark:text-dark-text">
        {DAYS.map(day => (
          <div key={day}>{day}</div>
        ))}
      </div>

      <div className="grid grid-cols-7">
        {calendar.map((data, idx) => {
          const isSunday = idx % 7 === 0;
          const isSaturday = idx % 7 === 6;

          if (data) {
            const fullDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), data.day);

            return (
              <PeriodAttCalendarDayCard
                key={idx}
                day={data.day}
                fullDate={fullDate}
                summary={data.summary}
                checkIn={data.checkIn}
                checkOut={data.checkOut}
                isSunday={isSunday}
                isCompanyHoliday={data.isCompanyHoliday}
                variant={variant}
              />
            );
          }

          return (
            <Card
              key={idx}
              className="h-[120px] rounded-none border-[0.5px] border-solid border-white-border-sub dark:border-dark-border-sub sm:h-[140px] md:h-[160px] lg:h-[120px]"
            />
          );
        })}
      </div>
    </div>
  );
};

export default PeriodAttCalendarGrid;
