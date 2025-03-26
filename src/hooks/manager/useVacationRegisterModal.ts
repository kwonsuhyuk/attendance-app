import { useEffect, useRef, useState } from "react";
import { DateRange } from "react-day-picker";
import { differenceInDays } from "date-fns";
import { IVacationRequest } from "@/components/company/table/VacationColumns";
import { useEmployeeSearch } from "./useEmployeeSearch";
import { EmployeeInfo } from "@/model/types/user.type";

export const useVacationRegister = (
  onRegister: (newRequest: IVacationRequest) => void,
  onClose: () => void,
) => {
  const [vacationType, setVacationType] = useState("");
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [reason, setReason] = useState("");
  const { searchResults, setSearchResults, search } = useEmployeeSearch();
  const [inputValue, setInputValue] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState<EmployeeInfo | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setSearchResults([]);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [setSearchResults]);

  const vacationDays =
    dateRange?.from && dateRange?.to ? differenceInDays(dateRange.to, dateRange.from) + 1 : 0;

  const handleRegister = () => {
    if (!vacationType || !dateRange?.from || !dateRange?.to || !selectedEmployee || !reason) {
      alert("필수 정보를 모두 입력해주세요.");
      return;
    }

    const newRequest: IVacationRequest = {
      id: Date.now(),
      requestType: vacationType,
      requester: selectedEmployee.name,
      requestDate: `${dateRange.from.toISOString().split("T")[0]} ~ ${dateRange.to.toISOString().split("T")[0]}`,
      reason,
      status: "자동 승인",
      // 필요 시 email 등 추가 확장 가능
    };

    onRegister(newRequest);
    onClose();
  };

  return {
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
  };
};
