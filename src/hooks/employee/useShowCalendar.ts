import { useEffect, useState } from "react";
import { useTour } from "@reactour/tour";
import { CALENDAR_STEPS } from "@/constants/tourStep";
import { fetchCommutesByPeriod } from "@/api/commute.api";
import { fetchRegisteredVacationsByMonth } from "@/api/vacation.api";
import { getVacationDateRange } from "@/util/vacation.util";
import { TCommuteData } from "@/model/types/commute.type";
import { useUserStore } from "@/store/user.store";
import { getToday } from "@/util/date.util";

export const useShowCalendar = () => {
  const { isOpen, setCurrentStep, setSteps, setIsOpen } = useTour();
  const [openModal, setOpenModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const [currentDate, setCurrentDate] = useState(() => getToday());
  const [commuteData, setCommuteData] = useState<Record<string, TCommuteData>>({});
  const [vacationDates, setVacationDates] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const companyCode = useUserStore(state => state.currentUser?.companyCode);
  const userId = useUserStore(state => state.currentUser?.uid);

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

  const loadCommuteData = async (year: string, month: string) => {
    if (!companyCode || !userId) return;

    setLoading(true);
    const raw = await fetchCommutesByPeriod(companyCode, userId, year, month);

    const normalized = normalizeCommuteData(raw || {}, year, month);
    setCommuteData(normalized);

    setLoading(false);
  };

  const loadVacationDates = async (year: string, month: string) => {
    if (!companyCode || !userId) return;
    const snapshot = await fetchRegisteredVacationsByMonth(companyCode, year, month);
    if (!snapshot) return;

    const result = Object.values(snapshot[userId])
      .map(vac => getVacationDateRange(vac.startDate, vac.endDate))
      .flat();

    setVacationDates(result);
  };

  const handleMonthChange = async (newYear: string, newMonth: string) => {
    setCurrentDate(`${newYear}-${newMonth}`);
    await loadCommuteData(newYear, newMonth);
    await loadVacationDates(newYear, newMonth);
  };

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
    loading,
  };
};
