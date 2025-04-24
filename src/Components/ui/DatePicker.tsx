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
}

export function DatePickerDemo({ pickDate }: DatePickerDemoProps) {
  const [date, setDate] = React.useState<Date | undefined>(pickDate);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[240px] justify-start text-left font-normal",
            !date && "text-muted-foreground",
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP", { locale: ko }) : <span>날짜 선택</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
          locale={ko}
          modifiers={{ today: new Date() }}
          modifiersClassNames={{ today: "bg-blue-100 text-blue-700 font-semibold" }}
        />
      </PopoverContent>
    </Popover>
  );
}
