import { Card } from "@/components/ui/card";
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
        <div className="rounded-t-lg bg-vacation-color py-4 pl-4 text-left text-base font-semibold text-dark-text">
          {variant === "total"
            ? `${workplace === "전체" ? "전체" : workplace} 근태 현황`
            : `${selectedEmployee?.name ?? "직원"}님의 근태 현황`}
        </div>
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
    <div className="overflow-hidden rounded-lg border border-white-border-sub px-6 pb-6 dark:border-dark-border-sub">
      <div className="dark:bg-vacation-dark-color sticky top-0 rounded-t-lg bg-vacation-color py-4 pl-6 text-left text-base font-semibold text-dark-text">
        {variant === "total"
          ? `${workplace === "전체" ? "전체" : workplace} 근태 현황`
          : `${selectedEmployee?.name ?? "직원"}님의 근태 현황`}
      </div>

      <div className="grid grid-cols-7 border-b border-t border-solid border-white-border-sub bg-white-bg pb-2 pt-2 text-center font-medium text-white-text dark:border-dark-border-sub dark:bg-dark-bg dark:text-dark-text">
        {DAYS.map(day => (
          <div key={day}>{day}</div>
        ))}
      </div>

      <div className="grid grid-cols-7">
        {calendar.map((data, idx) => {
          const isSunday = idx % 7 === 0;
          const isSaturday = idx % 7 === 6;

          return data ? (
            <PeriodAttCalendarDayCard
              key={idx}
              day={data.day}
              summary={data.summary}
              checkIn={data.checkIn}
              checkOut={data.checkOut}
              isSunday={isSunday}
              isCompanyHoliday={data.isCompanyHoliday}
              variant={variant}
            />
          ) : (
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
