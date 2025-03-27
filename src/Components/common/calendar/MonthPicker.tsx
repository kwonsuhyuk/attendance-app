import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/util/cn.util";

interface IMonthPickerProps {
  value: { year: number; month: number };
  onChange: (value: { year: number; month: number }) => void;
}

const MonthPicker = ({ value, onChange }: IMonthPickerProps) => {
  const [open, setOpen] = useState(false);

  const getYearList = (from: number, to: number) =>
    Array.from({ length: to - from + 1 }, (_, i) => from + i);

  const yearValue = String(value.year);
  const monthValue = String(value.month + 1);

  const handleYearChange = (year: string) => {
    onChange({ year: Number(year), month: value.month });
  };

  const handleMonthChange = (month: string) => {
    onChange({ year: value.year, month: Number(month) - 1 });
  };

  const monthString = `${value.year}년 ${monthValue.padStart(2, "0")}월`;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "h-full w-full justify-start text-left font-normal dark:bg-dark-border-sub dark:text-white-bg sm:w-48",
          )}
        >
          {monthString}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-fit p-3">
        <div className="flex items-center gap-2">
          {/* 연도 선택 */}
          <Select value={yearValue} onValueChange={handleYearChange}>
            <SelectTrigger className="w-28 dark:bg-dark-bg dark:text-white-bg">
              <SelectValue placeholder="연도 선택" />
            </SelectTrigger>
            <SelectContent className="dark:bg-dark-bg">
              {getYearList(2020, 2030).map(year => (
                <SelectItem key={year} value={String(year)}>
                  {year}년
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* 월 선택 */}
          <Select value={monthValue} onValueChange={handleMonthChange}>
            <SelectTrigger className="w-28 dark:bg-dark-bg dark:text-white-bg">
              <SelectValue placeholder="월 선택" />
            </SelectTrigger>
            <SelectContent className="dark:bg-dark-bg">
              {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
                <SelectItem key={month} value={String(month)}>
                  {month}월
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default MonthPicker;
