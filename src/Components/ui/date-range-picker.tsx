import * as React from "react";
import { addDays, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/util/cn.util";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export function DateRangePicker({
  date,
  setDate,
  className,
  toDate,
  vacationType,
  handleDateChange,
}: {
  date: DateRange | undefined;
  setDate: React.Dispatch<React.SetStateAction<DateRange | undefined>>;
  className?: string;
  toDate?: Date;
  vacationType: string;
  handleDateChange: (range: DateRange | undefined) => void;
}) {
  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant="outline"
            className={cn(
              "w-[400px] justify-start text-left font-normal",
              !date && "text-muted-foreground",
            )}
          >
            <CalendarIcon size={18} />
            {date?.from ? (
              date.to ? (
                format(date.from, "yyyy-MM-dd") === format(date.to, "yyyy-MM-dd") ? (
                  format(date.from, "yyyy-MM-dd")
                ) : (
                  <>
                    {format(date.from, "yyyy-MM-dd")} ~ {format(date.to, "yyyy-MM-dd")}
                  </>
                )
              ) : (
                format(date.from, "yyyy-MM-dd")
              )
            ) : (
              <span>날짜를 선택하세요</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          {vacationType === "반차" ? (
            <Calendar
              initialFocus
              mode="single"
              defaultMonth={date?.from}
              selected={date?.from}
              onSelect={day => handleDateChange(day ? { from: day, to: day } : undefined)}
              numberOfMonths={1}
              toDate={toDate}
            />
          ) : (
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={handleDateChange}
              numberOfMonths={2}
              toDate={toDate}
            />
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
}
