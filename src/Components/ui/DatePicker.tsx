import * as React from "react";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/util/cn.util";
import { twMerge } from "tailwind-merge";

interface DatePickerDemoProps {
  pickDate: Date;
  setPickDate: (date: Date) => void;
  className?: string;
}

export function DatePickerDemo({ pickDate, setPickDate, className }: DatePickerDemoProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          data-tour="today-1"
          variant={"outline"}
          className={twMerge(
            "w-full justify-start text-left font-normal",
            !pickDate && "text-muted-foreground",
            className,
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {pickDate ? format(pickDate, "PPP", { locale: ko }) : <span>날짜 선택</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full min-w-0 p-0" align="start">
        <Calendar
          mode="single"
          selected={pickDate}
          onSelect={date => date && setPickDate(date)}
          initialFocus
          locale={ko}
          modifiers={{ today: new Date() }}
          modifiersClassNames={{ today: "bg-blue-100 text-blue-700 font-semibold" }}
        />
      </PopoverContent>
    </Popover>
  );
}
