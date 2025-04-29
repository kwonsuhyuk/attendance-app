import * as React from "react";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/util/cn.util";

interface DatePickerDemoProps {
  pickDate: Date;
  setPickDate: (date: Date) => void;
}

export function DatePickerDemo({ pickDate, setPickDate }: DatePickerDemoProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal sm:w-[240px]",
            !pickDate && "text-muted-foreground",
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {pickDate ? format(pickDate, "PPP", { locale: ko }) : <span>날짜 선택</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={pickDate}
          onSelect={date => {
            if (date) {
              setPickDate(date);
            }
          }}
          initialFocus
          locale={ko}
          modifiers={{ today: new Date() }}
          modifiersClassNames={{ today: "bg-blue-100 text-blue-700 font-semibold" }}
        />
      </PopoverContent>
    </Popover>
  );
}
