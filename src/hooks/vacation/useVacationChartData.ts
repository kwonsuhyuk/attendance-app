import { useEffect, useState } from "react";
import { parseISO, eachDayOfInterval, format } from "date-fns";
import { EmployeeInfo } from "@/model/types/user.type";
import {
  fetchRegisteredVacationsByMonth,
  fetchRegisteredVacationsByYear,
} from "@/api/vacation.api";
import { useCompanyStore } from "@/store/company.store";
import { getMonthDates } from "@/util/vacation.util";

interface IVacationChartData {
  vacationData: any[];
  rawDetails: any[];
}

export const useVacationChartData = (
  selectedDate: { year: number; month: number },
  selectedName: EmployeeInfo | null,
  mode: "month" | "year",
): IVacationChartData => {
  const [vacationData, setVacationData] = useState<any[]>([]);
  const [rawDetails, setRawDetails] = useState<any[]>([]);
  const companyCode = useCompanyStore(state => state.currentCompany?.companyCode);

  useEffect(() => {
    const fetchData = async () => {
      const year = selectedDate.year.toString();
      const month = (selectedDate.month + 1).toString().padStart(2, "0");
      if (!companyCode) return;

      if (mode === "month") {
        const data = await fetchRegisteredVacationsByMonth(companyCode, year, month);
        const flattened: any[] = [];

        Object.values(data || {}).forEach((userData: any) => {
          Object.values(userData).forEach((entry: any) => {
            if (selectedName && entry.name !== selectedName.name) return;

            const start = parseISO(entry.startDate);
            const end = parseISO(entry.endDate);

            eachDayOfInterval({ start, end }).forEach(date => {
              const key = format(date, "MM-dd");
              flattened.push({
                date: key,
                type: entry.vacationType,
                ...entry,
              });
            });
          });
        });

        const dates = getMonthDates(selectedDate.year, selectedDate.month);
        const result = dates.map(date => {
          const daily = flattened.filter(item => item.date === date);
          return {
            date,
            annual: daily.filter(d => d.type === "연차").length,
            half: daily.filter(d => d.type === "반차").length,
            special: daily.filter(d => d.type === "특별 휴가").length,
          };
        });

        setVacationData(result);
        setRawDetails(flattened);
      }

      if (mode === "year") {
        const data = await fetchRegisteredVacationsByYear(companyCode, year);
        const summary: Record<string, { annual: number; half: number; special: number }> = {};
        const allDetails: any[] = [];

        Object.entries(data || {}).forEach(([month, users]) => {
          const flattened: any[] = [];

          Object.values(users as any).forEach((userData: any) => {
            Object.values(userData).forEach((entry: any) => {
              if (selectedName && entry.name !== selectedName.name) return;

              const start = parseISO(entry.startDate);
              const end = parseISO(entry.endDate);

              eachDayOfInterval({ start, end }).forEach(() => {
                flattened.push({ type: entry.vacationType });
              });

              allDetails.push({ ...entry, month });
            });
          });

          summary[month] = {
            annual: flattened.filter(i => i.type === "연차").length,
            half: flattened.filter(i => i.type === "반차").length,
            special: flattened.filter(i => i.type === "특별 휴가").length,
          };
        });

        const result = Array.from({ length: 12 }, (_, i) => {
          const monthKey = (i + 1).toString().padStart(2, "0");
          const item = summary[monthKey] || { annual: 0, half: 0, special: 0 };
          return {
            monthLabel: `${i + 1}월`,
            ...item,
          };
        });

        setVacationData(result);
        setRawDetails(allDetails);
      }
    };

    fetchData();
  }, [selectedDate, selectedName, mode, companyCode]);

  return { vacationData, rawDetails };
};
