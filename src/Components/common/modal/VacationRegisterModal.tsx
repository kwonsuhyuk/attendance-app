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
import AutoCompleteUserInput from "../AutoCompleteInput";
import { TEmpUserData } from "@/model/types/user.type";
import { useEmployeeList } from "@/hooks/manager/useEmployeeList";

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
    maxDate,
  } = useVacationRegister(onRegister, onClose);

  const { employeeList } = useEmployeeList();

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="dark:border dark:border-dark-border sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex justify-center dark:text-white-text">휴가 등록</DialogTitle>
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
            <AutoCompleteUserInput
              users={employeeList as TEmpUserData[]}
              onSelect={(emp: TEmpUserData) => {
                setSelectedEmployee(emp);
                setInputValue(`${emp.name} (${emp.email})`);
              }}
            />
          </div>
          <div className="flex flex-col gap-2">
            <span className="font-medium">휴가 유형</span>
            <Select value={vacationType} onValueChange={setVacationType}>
              <SelectTrigger className="dark:text-white-text">
                <SelectValue placeholder="휴가 유형 선택" />
              </SelectTrigger>
              <SelectContent className="dark:border dark:border-dark-border dark:bg-white-card-bg dark:text-white-text">
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
              <div className="rounded-md border dark:border-dark-border dark:bg-white-bg">
                {vacationDays > 0 ? `${vacationDays}일` : ""}
              </div>
            </div>
            <DateRangePicker date={dateRange} setDate={setDateRange} toDate={maxDate} />
            <p className="text-xs text-gray-500 dark:text-gray-400">
              ※ 휴가 등록은 <strong>최대 3개월</strong> 이후까지만 가능합니다.
            </p>
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
            className="w-full dark:bg-dark-bg dark:text-dark-text"
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
