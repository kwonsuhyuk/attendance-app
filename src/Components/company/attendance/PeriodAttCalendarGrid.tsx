import { Card } from "@/components/ui/card";
import PeriodAttCalendarDayCard from "./PeriodAttCalendarDayCard";
import PeriodAttCalendarList from "./PeriodAttCalendarList";
import { useIsMobile } from "@/hooks/use-mobile";
import dayjs from "dayjs";
import { EmployeeInfo } from "@/model/types/user.type";

const DAYS = ["일", "월", "화", "수", "목", "금", "토"];

interface Props {
  calendar: (number | null)[];
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
      <div className="px-2">
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
              date={`${year}-${month}-${String(day).padStart(2, "0")}`}
              checkIn={{ time: "09:00", workplace: "근무지A" }} // 이후 실제 데이터로 교체
              checkOut={{ time: "18:00", workplace: "근무지A" }} // 이후 실제 데이터로 교체
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
        {calendar.map((day, idx) => {
          const isSunday = idx % 7 === 0;
          const isSaturday = idx % 7 === 6;

          return day ? (
            <PeriodAttCalendarDayCard
              key={idx}
              day={day}
              isSunday={isSunday}
              isSaturday={isSaturday}
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
