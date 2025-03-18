import * as React from "react";
import { addDays, format } from "date-fns";
import { CalendarIcon, ChevronDown } from "lucide-react";
import { DateRange } from "react-day-picker";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/util/cn.util";

interface IDatePickerWithRangeProps extends React.HTMLAttributes<HTMLDivElement> {
  setFilterDate?: (date: DateRange | undefined) => void;
}

export function DatePickerWithRange({ className, setFilterDate }: IDatePickerWithRangeProps) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(2022, 0, 20),
    to: addDays(new Date(2022, 0, 20), 20),
  });

  const handleDateChange = (newDate: DateRange | undefined) => {
    setDate(newDate);
    if (setFilterDate) {
      setFilterDate(newDate);
    }
  };

  return (
    <div className={cn("grid w-full gap-2 sm:w-auto", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant="outline"
            className={cn(
              "flex w-full items-center justify-between gap-2 text-left font-normal sm:w-fit",
              !date && "text-muted-foreground",
            )}
          >
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-4 w-4" />
              {date?.from ? (
                date.to ? (
                  <>
                    {format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}
                  </>
                ) : (
                  format(date.from, "LLL dd, y")
                )
              ) : (
                <span>Pick a date</span>
              )}
            </div>
            <ChevronDown className="h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0 sm:w-auto" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={handleDateChange}
            numberOfMonths={window.innerWidth < 640 ? 1 : 2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
