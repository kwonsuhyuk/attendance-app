import { useEffect, useState } from "react";
import { useTour } from "@reactour/tour";
import { CALENDAR_STEPS } from "@/constants/tourStep";
import { fetchCommutesByPeriod } from "@/api/commute.api";
import { fetchRegisteredVacationsByMonth } from "@/api/vacation.api";
import { getVacationDateRange } from "@/util/vacation.util";
import { TCommuteData } from "@/model/types/commute.type";
import { useUserStore } from "@/store/user.store";
import { useCompanyStore } from "@/store/company.store";
import { getToday } from "@/util/date.util";
import { calculateCommuteSummaryByType } from "@/util/commute.util";
import { TRegisteredVacation } from "@/model/types/vacation.type";

export const useShowCalendar = () => {
  const { isOpen, setCurrentStep, setSteps, setIsOpen } = useTour();

  const [openModal, setOpenModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [currentDate, setCurrentDate] = useState(() => getToday());

  const [commuteData, setCommuteData] = useState<Record<string, TCommuteData>>({});
  const [vacationDates, setVacationDates] = useState<string[]>([]);
  const [summary, setSummary] = useState<ReturnType<typeof calculateCommuteSummaryByType> | null>(
    null,
  );
  const [vacationList, setVacationList] = useState<Record<string, TRegisteredVacation>>({});

  const companyCode = useUserStore(state => state.currentUser?.companyCode);
  const userId = useUserStore(state => state.currentUser?.uid);
  const holidayList = useCompanyStore(state => state.currentCompany?.holidayList || []);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        setCurrentStep?.(0);
        setSteps?.(CALENDAR_STEPS(setIsOpen));
      }, 300);
      return () => {
        clearTimeout(timer);
        setSteps?.([]);
      };
    }
  }, [isOpen, setCurrentStep, setSteps, setIsOpen]);

  const handleDateClick = (date: string) => {
    setSelectedDate(date);
    setOpenModal(true);
  };

  const normalizeCommuteData = (
    raw: Record<string, TCommuteData>,
    year: string,
    month: string,
  ): Record<string, TCommuteData> => {
    const result: Record<string, TCommuteData> = {};
    Object.entries(raw).forEach(([day, data]) => {
      const dateKey = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
      result[dateKey] = data;
    });
    return result;
  };

  const handleMonthChange = async (newYear: string, newMonth: string) => {
    const monthStr = newMonth.padStart(2, "0");
    const yyyymm = `${newYear}-${monthStr}`;
    setCurrentDate(yyyymm);

    if (!companyCode || !userId) return;

    const rawCommute = await fetchCommutesByPeriod(companyCode, userId, newYear, monthStr);
    const normalized = normalizeCommuteData(rawCommute || {}, newYear, monthStr);
    setCommuteData(normalized);

    const snapshot = await fetchRegisteredVacationsByMonth(companyCode, newYear, monthStr);
    const vacationList = snapshot?.[userId] ?? {};
    setVacationList(vacationList);
    const vacationDateList = Object.values(vacationList).flatMap(vac =>
      getVacationDateRange(vac.startDate, vac.endDate),
    );
    setVacationDates(vacationDateList);

    const newSummary = calculateCommuteSummaryByType(
      normalized,
      vacationDateList,
      newYear,
      monthStr,
    );
    setSummary(newSummary);
  };

  const formatMinutesToHourText = (minutes: number) => {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return `${h.toString().padStart(2, "0")}시간 ${m.toString().padStart(2, "0")}분`;
  };

  return {
    isOpen,
    openModal,
    setOpenModal,
    selectedDate,
    commuteData,
    vacationDates,
    currentDate,
    handleMonthChange,
    handleDateClick,
    summary,
    formatMinutesToHourText,
    vacationList,
  };
};
