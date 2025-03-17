import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { X, CalendarIcon } from "lucide-react";
import { format } from "date-fns";

interface VacationModifyModalProps {
  onClose: () => void;
}

const VacationModifyModal: React.FC<VacationModifyModalProps> = ({ onClose }) => {
  const [vacationType, setVacationType] = useState("");
  const [vacationDays, setVacationDays] = useState("");

  const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date }>({
    from: undefined,
    to: undefined,
  });

  // 숫자만 입력 가능하게 처리
  const handleVacationDaysChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, ""); // 숫자 이외 문자 제거
    setVacationDays(value);
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="dark:border dark:border-dark-border dark:bg-white-bg dark:text-white-text dark:shadow-lg sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="dark:text-white-text">휴가 등록</DialogTitle>
          <button
            onClick={onClose}
            className="absolute right-4 top-7 rounded-md border-none bg-transparent text-gray-500 hover:text-gray-700 dark:text-white-text dark:hover:bg-dark-border"
          >
            <X size={20} strokeWidth={3} />
          </button>
        </DialogHeader>

        <div className="grid gap-8 py-8">
          {/* 휴가 유형 선택 */}
          <div className="flex flex-col gap-3">
            <span className="font-medium">휴가 유형</span>
            <Select defaultValue={vacationType} onValueChange={setVacationType}>
              <SelectTrigger className="dark:bg-white-bg">
                <SelectValue placeholder="휴가 유형 선택" />
              </SelectTrigger>
              <SelectContent className="dark:border dark:border-dark-border dark:bg-white-bg dark:text-white-text">
                {["연차", "반차", "병가", "출산휴가"].map(type => (
                  <SelectItem
                    key={type}
                    value={type}
                    className="dark:text-white-text dark:hover:bg-dark-border"
                  >
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* 휴가 일수 입력 */}
          <div className="flex flex-col gap-3">
            <span className="font-medium">휴가 일수</span>
            <Input
              type="text"
              value={vacationDays}
              onChange={handleVacationDaysChange}
              placeholder="휴가 일수를 입력하세요."
              className="h-10 placeholder:text-sm dark:bg-white-bg"
            />
          </div>

          {/* 사용 기간 선택 */}
          <div className="flex flex-col gap-3">
            <span className="font-medium">사용 기간</span>
            <div className="flex items-center gap-4">
              {/* 시작 날짜 선택 */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="flex w-[180px] items-center justify-start gap-2"
                  >
                    <CalendarIcon size={16} />
                    {dateRange.from ? format(dateRange.from, "yyyy-MM-dd") : "시작"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="p-2">
                  <Calendar
                    mode="single"
                    selected={dateRange.from}
                    onSelect={date => setDateRange(prev => ({ ...prev, from: date }))}
                  />
                </PopoverContent>
              </Popover>

              <span>~</span>

              {/* 종료 날짜 선택 */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="flex w-[180px] items-center justify-start gap-2"
                  >
                    <CalendarIcon size={16} />
                    {dateRange.to ? format(dateRange.to, "yyyy-MM-dd") : "종료"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="p-2">
                  <Calendar
                    mode="single"
                    selected={dateRange.to}
                    onSelect={date => setDateRange(prev => ({ ...prev, to: date }))}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button type="submit" className="dark:bg-white-bg dark:hover:text-white-text">
            등록
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default VacationModifyModal;
