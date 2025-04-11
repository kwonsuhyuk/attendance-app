import { Card } from "@/components/ui/card";
import PeriodAttCalendarDayCard from "./PeriodAttCalendarDayCard";
import PeriodAttCalendarList from "./PeriodAttCalendarList";
import { useIsMobile } from "@/hooks/use-mobile";
import dayjs from "dayjs";

const DAYS = ["일", "월", "화", "수", "목", "금", "토"];

interface Props {
  calendar: (number | null)[];
  currentDate: Date;
  variant?: "total" | "employee";
}

const PeriodAttCalendarGrid = ({ calendar, currentDate, variant = "total" }: Props) => {
  const isMobile = useIsMobile();
  if (isMobile) {
    const year = dayjs(currentDate).format("YYYY");
    const month = dayjs(currentDate).format("MM");

    return (
      <div className="px-2">
        <div className="rounded-t-lg bg-vacation-color py-4 pl-4 text-left text-base font-semibold text-dark-text">
          {variant === "total" ? "본사 전체 근태 현황" : "오민택님의 근태 현황"}
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
    <div className="overflow-hidden rounded-lg border border-white-border-sub p-6 dark:border-dark-border-sub">
      <div className="sticky top-0 z-20 rounded-t-lg bg-vacation-color py-4 pl-6 text-left text-base font-semibold text-dark-text">
        {variant === "total" ? "본사 전체 근태 현황" : "오민택님의 근태 현황"}
      </div>
      <div className="grid grid-cols-7 border-b border-t border-solid border-white-border-sub bg-white-bg pb-2 pt-2 text-center font-medium text-white-text dark:border-dark-border-sub dark:bg-white-bg dark:text-white-text">
        {DAYS.map(day => (
          <div key={day}>{day}</div>
        ))}
      </div>

      <div className="grid grid-cols-7">
        {calendar.map((day, idx) => {
          const isSunday = idx % 7 === 0;

          return day ? (
            <PeriodAttCalendarDayCard key={idx} day={day} isSunday={isSunday} variant={variant} />
          ) : (
            <Card
              key={idx}
              className="h-[120px] rounded-none border-[0.5px] border-solid border-white-border-sub dark:border-dark-border-sub"
            />
          );
        })}
      </div>
    </div>
  );
};

export default PeriodAttCalendarGrid;
