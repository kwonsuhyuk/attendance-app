import { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import { differenceInDays, format } from "date-fns";
import { IVacationRequest } from "@/components/company/table/VacationColumns";
import { TVacationType } from "@/model/types/vacation.type";
import { useToast } from "../use-toast";
import { useUserStore } from "@/store/user.store";
import { v4 as uuid } from "uuid";
import { createVacationRequest } from "@/api/vacation.api";

export const useMyVacationRequestModal = (
  onRequest: (newRequest: IVacationRequest) => void,
  onClose: () => void,
) => {
  const [vacationType, setVacationType] = useState("");
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [reason, setReason] = useState("");
  const { toast } = useToast();
  const currentUser = useUserStore(state => state.currentUser);

  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 3);

  const vacationDays =
    dateRange?.from && dateRange?.to ? differenceInDays(dateRange.to, dateRange.from) + 1 : 0;

  const handleRegister = async () => {
    if (!vacationType || !dateRange?.from || !dateRange?.to || !reason) {
      toast({
        title: "등록 실패",
        description: "모든 항목을 입력해주세요.",
        variant: "destructive",
      });
      return;
    }

    if (!currentUser || !("jobName" in currentUser)) {
      toast({
        title: "등록 실패",
        description: "직원 정보가 올바르지 않습니다.",
        variant: "destructive",
      });
      return;
    }

    const requestId = uuid();

    await createVacationRequest(currentUser.companyCode, requestId, {
      requestId,
      requester: {
        uid: currentUser.uid,
        name: currentUser.name,
        email: currentUser.email,
        jobName: currentUser.jobName,
      },
      vacationType: vacationType as TVacationType,
      startDate: format(dateRange.from, "yyyy-MM-dd"),
      endDate: format(dateRange.to, "yyyy-MM-dd"),
      reason,
      status: "대기중",
      createdAt: new Date().toISOString(),
    });

    const newRequest: IVacationRequest = {
      id: String(Date.now()),
      requestType: vacationType as TVacationType,
      requester: {
        name: currentUser.name,
        email: currentUser.email,
        uid: currentUser.uid,
        jobName: currentUser.jobName,
      },
      requestDate:
        vacationType === "반차" ||
        format(dateRange.from, "yyyy-MM-dd") === format(dateRange.to, "yyyy-MM-dd")
          ? format(dateRange.from, "yyyy-MM-dd")
          : `${format(dateRange.from, "yyyy-MM-dd")} ~ ${format(dateRange.to, "yyyy-MM-dd")}`,
      reason,
      status: "대기중",
      email: currentUser.email,
    };

    onRequest(newRequest);
    toast({
      title: "휴가 요청 완료",
      description: "휴가 요청이 정상적으로 등록되었습니다.",
    });
    onClose();
  };

  const handleDateChange: React.Dispatch<React.SetStateAction<DateRange | undefined>> = value => {
    const range = typeof value === "function" ? value(undefined) : value;
    if (!range?.from) return;

    if (vacationType === "반차") {
      setDateRange({ from: range.from, to: range.from });
    } else {
      setDateRange(range);
    }
  };

  // "반차"일 경우 하루 고정
  useEffect(() => {
    if (vacationType === "반차" && dateRange?.from) {
      setDateRange({ from: dateRange.from, to: dateRange.from });
    }
  }, [vacationType, dateRange?.from]);

  return {
    vacationType,
    setVacationType,
    dateRange,
    setDateRange,
    vacationDays,
    reason,
    setReason,
    maxDate,
    handleRegister,
    handleDateChange,
  };
};
