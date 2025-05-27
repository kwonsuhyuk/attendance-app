import { useState } from "react";
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
  mode: "month" | "year";
  setMode: (value: "month" | "year") => void;
}

const MonthPicker = ({ value, onChange, mode, setMode }: IMonthPickerProps) => {
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

  const label = `${value.year}년${mode === "month" ? ` ${monthValue.padStart(2, "0")}월` : " 전체"}`;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn("h-11 w-full justify-start text-left font-normal sm:w-56", "text-sm")}
        >
          {label}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[90vw] max-w-sm p-4 sm:w-fit">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-2">
          {/* 보기 모드 선택 */}
          <Select value={mode} onValueChange={v => setMode(v as "month" | "year")}>
            <SelectTrigger className="w-full sm:w-36">
              <SelectValue placeholder="기간 선택" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="month">
                <div className="flex items-center gap-2">
                  <span className="text-base">📅</span>
                  <span className="text-sm">월별 보기</span>
                </div>
              </SelectItem>
              <SelectItem value="year">
                <div className="flex items-center gap-2">
                  <span className="text-base">🗓️</span>
                  <span className="text-sm">연별 보기</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>

          {/* 연도 선택 */}
          <Select value={yearValue} onValueChange={handleYearChange}>
            <SelectTrigger className="w-full sm:w-28">
              <SelectValue placeholder="연도 선택" />
            </SelectTrigger>
            <SelectContent>
              {getYearList(2020, 2030).map(year => (
                <SelectItem key={year} value={String(year)}>
                  {year}년
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* 월 선택 */}
          {mode === "month" && (
            <Select value={monthValue} onValueChange={handleMonthChange}>
              <SelectTrigger className="w-full sm:w-28">
                <SelectValue placeholder="월 선택" />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
                  <SelectItem key={month} value={String(month)}>
                    {month}월
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default MonthPicker;
