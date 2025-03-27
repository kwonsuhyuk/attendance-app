import { useEffect, useRef, useState } from "react";
import { DateRange } from "react-day-picker";
import { differenceInDays } from "date-fns";
import { IVacationRequest } from "@/components/company/table/VacationColumns";
import { useEmployeeSearch } from "./useEmployeeSearch";
import { EmployeeInfo } from "@/model/types/user.type";
import { registerVacation } from "@/api/vacation.api";
import { format } from "date-fns";
import { TVacationType } from "@/model/types/vacation.type";

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

  // 날짜 구간 내 포함된 모든 연/월 리스트 구하기
  const getYearMonthList = (start: Date, end: Date) => {
    const list = [];
    const current = new Date(start.getFullYear(), start.getMonth(), 1);

    while (current <= end) {
      list.push({
        year: String(current.getFullYear()),
        month: String(current.getMonth() + 1).padStart(2, "0"),
      });
      current.setMonth(current.getMonth() + 1);
    }

    return list;
  };

  const handleRegister = async () => {
    if (!vacationType || !dateRange?.from || !dateRange?.to || !selectedEmployee || !reason) {
      alert("필수 정보를 모두 입력해주세요.");
      return;
    }

    const newRequest: IVacationRequest = {
      id: Date.now(),
      requestType: vacationType as TVacationType,
      requester: selectedEmployee.name,
      requestDate: `${dateRange.from.toISOString().split("T")[0]} ~ ${dateRange.to.toISOString().split("T")[0]}`,
      reason,
      status: "자동 승인",
      email: selectedEmployee.email,
    };

    const yearMonthList = getYearMonthList(dateRange.from, dateRange.to); // 두 달 걸쳐 있는 경우 대비
    const registerId = String(newRequest.id); // 중복 방지를 위한 ID

    for (const { year, month } of yearMonthList) {
      const res = await registerVacation(
        selectedEmployee.companyCode,
        year,
        month,
        selectedEmployee.uid,
        registerId,
        {
          registerId,
          startDate: format(dateRange.from, "yyyy-MM-dd"),
          endDate: format(dateRange.to, "yyyy-MM-dd"),
          vacationType: vacationType as TVacationType,
          reason,
          status: "자동 승인됨",
          createdAt: new Date().toISOString(),
          name: selectedEmployee.name,
          email: selectedEmployee.email,
          jobName: selectedEmployee.jobName,
        },
      );
      console.log("등록 결과: ", res);
    }
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
