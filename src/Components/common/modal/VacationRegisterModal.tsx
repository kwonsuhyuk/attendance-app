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
import { Input } from "antd";
import { IVacationRequest } from "@/components/company/table/VacationColumns";
import { useVacationRegister } from "@/hooks/manager/useVacationRegisterModal";
import { VACATIONSELECT_TYPES } from "@/constants/vacationSelect";

interface IVacationModalProps {
  onClose: () => void;
  onRegister: (newRequest: IVacationRequest) => void;
}

const VacationRegisterModal: React.FC<IVacationModalProps> = ({ onClose, onRegister }) => {
  const {
    vacationType,
    setVacationType,
    dateRange,
    setDateRange,
    vacationDays,
    handleRegister,
    reason,
    setReason,
    inputValue,
    setInputValue,
    searchResults,
    setSearchResults,
    search,
    selectedEmployee,
    setSelectedEmployee,
    dropdownRef,
  } = useVacationRegister(onRegister, onClose);

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="dark:border dark:border-dark-border dark:bg-white-bg dark:text-white-text dark:shadow-lg sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="dark:text-white-text">휴가 등록</DialogTitle>
          <button
            onClick={onClose}
            className="absolute right-4 top-7 rounded-md border-none bg-transparent text-gray-500 hover:text-gray-700 dark:text-white-text dark:hover:bg-dark-border dark:hover:bg-white-bg"
          >
            <X size={20} strokeWidth={3} />
          </button>
        </DialogHeader>

        <div className="grid gap-8 py-6">
          <div className="flex flex-col gap-2">
            <span className="font-medium">휴가 대상</span>
            <div className="relative" ref={dropdownRef}>
              <Input
                value={inputValue}
                onChange={e => {
                  const keyword = e.target.value;
                  setInputValue(keyword);
                  search(keyword);
                }}
                placeholder="이름을 입력하세요"
                className="h-10 placeholder:text-sm dark:bg-white-bg dark:placeholder:text-white-text"
              />

              {searchResults.length > 0 && (
                <ul
                  className={`absolute top-full z-50 mt-1 w-full rounded-md border bg-white-card-bg text-sm shadow-lg dark:bg-white-card-bg dark:text-white-text ${searchResults.length > 5 ? "max-h-48 overflow-y-auto" : ""} `}
                >
                  {searchResults.map(emp => (
                    <li
                      key={emp.uid}
                      onClick={() => {
                        setSelectedEmployee(emp);
                        setInputValue(`${emp.name} (${emp.email})`);
                        setSearchResults([]);
                      }}
                      className="cursor-pointer px-3 py-2 hover:bg-white-bg dark:hover:bg-white-bg"
                    >
                      {emp.name} ({emp.email})
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <span className="font-medium">휴가 유형</span>
            <Select value={vacationType} onValueChange={setVacationType}>
              <SelectTrigger className="dark:bg-white-bg dark:text-white-text">
                <SelectValue placeholder="휴가 유형 선택" />
              </SelectTrigger>
              <SelectContent className="dark:border dark:border-dark-border dark:bg-white-bg dark:text-white-text">
                {VACATIONSELECT_TYPES.map(type => (
                  <SelectItem
                    key={type}
                    value={type}
                    className="dark:text-white-text dark:hover:bg-white-bg"
                  >
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex gap-3">
              <span className="font-medium">사용 기간 :</span>
              {/* <span className="font-medium">휴가 일수 :</span> */}
              <div className="rounded-md border dark:border-dark-border dark:bg-white-bg">
                {vacationDays > 0 ? `${vacationDays}일` : ""}
              </div>
            </div>
            <DateRangePicker date={dateRange} setDate={setDateRange} />
          </div>

          <div className="flex flex-col gap-2">
            <span>사유</span>
            <textarea
              className="h-20 w-full rounded-md text-base"
              value={reason}
              onChange={e => setReason(e.target.value)}
            ></textarea>
          </div>
        </div>

        <DialogFooter>
          <Button
            type="submit"
            className="dark:bg-dark-bg dark:text-dark-text"
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
