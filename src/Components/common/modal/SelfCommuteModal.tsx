import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { X } from "lucide-react";

import { useEmployeeList } from "@/hooks/manager/useEmployeeList";
import { useCompanyStore } from "@/store/company.store";
import { EmployeeInfo } from "@/model/types/user.type";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import AutoCompleteUserInput from "../AutoCompleteInput";
import { DatePickerDemo } from "@/components/ui/DatePicker";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface ISelfCommuteModalProps {
  onClose: () => void;
  onRegister: (data: {
    user: EmployeeInfo;
    date: Date;
    startTime?: string;
    mode: "start" | "end";
    endTime?: string;
    place: string;
  }) => void;
}

const HOURS = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, "0"));
const MINUTES = ["00", "15", "30", "45"];

const SelfCommuteModal: React.FC<ISelfCommuteModalProps> = ({ onClose, onRegister }) => {
  const { employeeList } = useEmployeeList();
  const workPlaces = useCompanyStore(state => state.currentCompany?.workPlacesList || []);
  const [selectedEmployee, setSelectedEmployee] = useState<EmployeeInfo | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [mode, setMode] = useState<"start" | "end">("start");
  const [startHour, setStartHour] = useState("09");
  const [startMin, setStartMin] = useState("00");
  const [endHour, setEndHour] = useState("18");
  const [endMin, setEndMin] = useState("00");
  const [selectedPlaceId, setSelectedPlaceId] = useState<string>("");

  const handleSubmit = () => {
    if (!selectedEmployee || !selectedDate || !selectedPlaceId) return;

    const data = {
      user: selectedEmployee,
      date: selectedDate,
      mode: mode,
      startTime: mode === "start" ? `${startHour}:${startMin}` : undefined,
      endTime: mode === "end" ? `${endHour}:${endMin}` : undefined,
      place: selectedPlaceId,
    };

    onRegister(data);
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-[350px] rounded-xl px-4 py-6 dark:border dark:border-dark-border sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex justify-center dark:text-white-text">
            출퇴근 수동 등록
          </DialogTitle>
          <button
            onClick={onClose}
            className="absolute right-4 top-7 rounded-md border-none bg-transparent text-gray-500 hover:text-gray-700 dark:text-white-text dark:hover:bg-dark-border dark:hover:bg-white-bg"
          >
            <X size={20} strokeWidth={3} />
          </button>
        </DialogHeader>

        <div className="grid gap-8 py-6">
          {/* 직원 선택 */}
          <div className="flex flex-col gap-2">
            <span className="font-medium">직원 선택</span>
            <AutoCompleteUserInput
              users={employeeList as EmployeeInfo[]}
              onSelect={(emp: EmployeeInfo | null) => {
                setSelectedEmployee(emp);
                setInputValue(`${emp?.name} (${emp?.email})`);
              }}
            />
          </div>

          {/* 날짜 */}
          <div className="flex flex-col gap-2">
            <span className="font-medium">날짜 선택</span>
            <DatePickerDemo pickDate={selectedDate} setPickDate={setSelectedDate} />
          </div>

          {/* 출근/퇴근 선택 */}
          <div className="flex flex-col gap-2">
            <span className="font-medium">등록할 항목</span>
            <RadioGroup
              defaultValue="start"
              value={mode}
              onValueChange={val => setMode(val as "start" | "end")}
              className="flex gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="start" id="r1" />
                <label htmlFor="r1" className="text-sm font-medium">
                  출근
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="end" id="r2" />
                <label htmlFor="r2" className="text-sm font-medium">
                  퇴근
                </label>
              </div>
            </RadioGroup>
          </div>

          {/* 시간 선택 */}
          <div className="flex flex-col gap-2">
            <span className="font-medium">{mode === "start" ? "출근 시간" : "퇴근 시간"}</span>
            <div className="flex gap-2">
              <Select
                value={mode === "start" ? startHour : endHour}
                onValueChange={mode === "start" ? setStartHour : setEndHour}
              >
                <SelectTrigger className="w-[80px]">
                  <SelectValue placeholder="시" />
                </SelectTrigger>
                <SelectContent>
                  {HOURS.map(hour => (
                    <SelectItem key={hour} value={hour}>
                      {hour}시
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select
                value={mode === "start" ? startMin : endMin}
                onValueChange={mode === "start" ? setStartMin : setEndMin}
              >
                <SelectTrigger className="w-[80px]">
                  <SelectValue placeholder="분" />
                </SelectTrigger>
                <SelectContent>
                  {MINUTES.map(min => (
                    <SelectItem key={min} value={min}>
                      {min}분
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* 근무지 선택 */}
          <div className="flex flex-col gap-2">
            <span className="font-medium">근무지 선택</span>
            <Select value={selectedPlaceId} onValueChange={setSelectedPlaceId}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="근무지를 선택하세요" />
              </SelectTrigger>
              <SelectContent>
                {workPlaces.map(place => (
                  <SelectItem key={place.id} value={place.id}>
                    <div className="flex flex-col items-start text-left">
                      <span className="text-sm font-semibold">{place.name}</span>
                      <span className="text-xs text-muted-foreground">{place.address}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button
            type="submit"
            className="w-full dark:bg-dark-bg dark:text-dark-text"
            onClick={handleSubmit}
          >
            등록
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SelfCommuteModal;
