import { Card } from "@/components/ui/card";
import PeriodAttCalendarDayCard from "./PeriodAttCalendarDayCard";

const DAYS = ["일", "월", "화", "수", "목", "금", "토"];

interface Props {
  calendar: (number | null)[];
}

const PeriodAttCalendarGrid = ({ calendar }: Props) => {
  return (
    <div className="overflow-hidden rounded-lg border border-white-border-sub p-6 dark:border-dark-border-sub">
      <div className="grid grid-cols-7 border-b border-t border-solid border-white-border-sub bg-dark-card-bg pb-2 pt-2 text-center font-medium text-dark-nav-selected dark:border-dark-border-sub dark:bg-white-bg dark:text-white-text">
        {DAYS.map(day => (
          <div key={day}>{day}</div>
        ))}
      </div>

      <div className="grid grid-cols-7">
        {calendar.map((day, idx) => {
          const isSunday = idx % 7 === 0;

          return day ? (
            <PeriodAttCalendarDayCard key={idx} day={day} isSunday={isSunday} />
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
