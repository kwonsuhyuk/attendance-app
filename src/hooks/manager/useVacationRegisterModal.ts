import { useState } from "react";
import { DateRange } from "react-day-picker";
import { differenceInDays } from "date-fns";
import { IVacationRequest } from "@/components/company/table/VacationColumns";

export const useVacationRegister = (
  onRegister: (newRequest: IVacationRequest) => void,
  onClose: () => void,
) => {
  const [vacationType, setVacationType] = useState("");
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);

  const vacationDays =
    dateRange?.from && dateRange?.to ? differenceInDays(dateRange.to, dateRange.from) + 1 : 0;

  const handleRegister = () => {
    if (!vacationType || !dateRange?.from || !dateRange?.to) {
      alert("휴가 유형과 사용 기간을 선택해주세요.");
      return;
    }

    const newRequest: IVacationRequest = {
      id: Date.now(),
      requestType: vacationType,
      requester: "현재 사용자",
      requestDate: new Date().toISOString().split("T")[0],
      reason: "사유 없음",
      status: "대기중",
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
  };
};
