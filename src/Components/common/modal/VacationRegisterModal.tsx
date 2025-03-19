import React, { useState } from "react";
import { Button } from "@/components/ui/button";
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
import { X } from "lucide-react";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { DateRange } from "react-day-picker";
import { differenceInDays } from "date-fns";
import { Input } from "antd";
import { IVacationRequest } from "@/components/company/table/VacationColumns";
import { useVacationRegister } from "@/hooks/manager/useVacationRegisterModal";

interface IVacationModalProps {
  onClose: () => void;
  onRegister: (newRequest: IVacationRequest) => void;
}

const VacationRegisterModal: React.FC<IVacationModalProps> = ({ onClose, onRegister }) => {
  const { vacationType, setVacationType, dateRange, setDateRange, vacationDays, handleRegister } =
    useVacationRegister(onRegister, onClose);

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
          <div className="flex flex-col gap-3">
            <span className="font-medium">휴가 대상</span>
            <Input
              type="text"
              placeholder="추후 기능 추가 예정"
              className="h-10 placeholder:text-sm dark:bg-white-bg"
            />
          </div>
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

          <div className="flex flex-col gap-3">
            <span className="font-medium">사용 기간</span>
            <DateRangePicker date={dateRange} setDate={setDateRange} />
          </div>

          <div className="flex gap-3">
            <span className="font-medium">휴가 일수 :</span>
            <div className="rounded-md border dark:border-dark-border dark:bg-white-bg">
              {vacationDays > 0 ? `${vacationDays}일` : "날짜를 선택하세요"}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button
            type="submit"
            className="dark:bg-white-bg dark:hover:text-white-text"
            onClick={handleRegister}
          >
            등록
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default VacationRegisterModal;
