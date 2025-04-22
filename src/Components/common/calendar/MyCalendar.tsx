import { useState, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { TCommuteData } from "@/model/types/commute.type";
import { getWorkTypeFromCommute } from "@/util/commute.util";

interface MyCalendarProps {
  data: Record<string, TCommuteData>;
  vacationDates: string[];
  onDateClick: (date: string) => void;
  onMonthChange: (year: string, month: string) => void;
}

const getStatusDot = (type: string | undefined) => {
  if (type === "출근") return <div className="mx-auto mt-1 h-2 w-2 rounded-full bg-green-500" />;
  if (type === "외근") return <div className="mx-auto mt-1 h-2 w-2 rounded-full bg-yellow-500" />;
  if (type === "휴가") return <div className="mx-auto mt-1 h-2 w-2 rounded-full bg-blue-500" />;
  return null;
};

const MyCalendar = ({ data, vacationDates, onDateClick, onMonthChange }: MyCalendarProps) => {
  const [month, setMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  // 최초 마운트 시 호출
  useEffect(() => {
    const year = String(month.getFullYear());
    const m = String(month.getMonth() + 1).padStart(2, "0");
    onMonthChange(year, m);
  }, [month]);

  return (
    <div className="flex w-full flex-col items-center">
      <div className="scale-110">
        <Calendar
          mode="single"
          month={month}
          onMonthChange={setMonth}
          selected={selectedDate}
          onSelect={date => {
            if (!date) return;
            setSelectedDate(date);
            onDateClick(format(date, "yyyy-MM-dd"));
          }}
          classNames={{
            day: "w-8 font-normal text-sm rounded-md",
            day_today: "bg-dark-bg text-dark-text dark:bg-white-bg dark:text-white-text pb-1",
            day_selected: "bg-white-border-sub dark:bg-dark-border-sub pb-1",
            cell: "h-9 w-9 text-center text-sm relative",
            day_outside: "text-muted-foreground opacity-30",
          }}
          modifiers={{
            출근: date => getWorkTypeFromCommute(data[format(date, "yyyy-MM-dd")]) === "출근",
            외근: date => getWorkTypeFromCommute(data[format(date, "yyyy-MM-dd")]) === "외근",
            휴가: date => vacationDates.includes(format(date, "yyyy-MM-dd")),
          }}
          components={{
            DayContent: ({ date }) => {
              const key = format(date, "yyyy-MM-dd");
              const commuteType = getWorkTypeFromCommute(data[key]);
              const isVacation = vacationDates.includes(key);
              const type =
                commuteType === "출근"
                  ? "출근"
                  : commuteType === "외근"
                    ? "외근"
                    : isVacation
                      ? "휴가"
                      : undefined;

              return (
                <div className="p-1 text-sm">
                  {format(date, "d")}
                  {getStatusDot(type)}
                </div>
              );
            },
          }}
        />
      </div>
    </div>
  );
};

export default MyCalendar;
