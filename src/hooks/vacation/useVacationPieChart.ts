import { useEffect, useState } from "react";
import { parseISO, eachDayOfInterval } from "date-fns";
import {
  fetchRegisteredVacationsByMonth,
  fetchRegisteredVacationsByYear,
} from "@/api/vacation.api";
import { useCompanyStore } from "@/store/company.store";
import { EmployeeInfo } from "@/model/types/user.type";

interface PieDataItem {
  name: string;
  value: number;
  days: number;
  color: string;
}

export const useVacationPieChart = (
  selectedDate: { year: number; month: number },
  selectedName: EmployeeInfo | null,
  mode: "month" | "year",
) => {
  const companyCode = useCompanyStore(state => state.currentCompany?.companyCode);
  const [pieData, setPieData] = useState<PieDataItem[]>([]);
  const [rawData, setRawData] = useState<PieDataItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const year = selectedDate.year.toString();
      if (!companyCode) return;

      const flattened: { type: string }[] = [];

      if (mode === "month") {
        const month = (selectedDate.month + 1).toString().padStart(2, "0");
        const data = await fetchRegisteredVacationsByMonth(companyCode, year, month);

        Object.entries(data || {}).forEach(([userId, userData]) => {
          Object.values(userData).forEach((entry: any) => {
            if (selectedName && selectedName.uid !== userId) return;
            const start = parseISO(entry.startDate);
            const end = parseISO(entry.endDate);

            eachDayOfInterval({ start, end }).forEach(() => {
              flattened.push({ type: entry.vacationType });
            });
          });
        });
      } else {
        const data = await fetchRegisteredVacationsByYear(companyCode, year);
        Object.values(data || {}).forEach((monthData: any) => {
          Object.entries(monthData).forEach(([userId, userData]) => {
            Object.values(userData as Record<string, any>).forEach((entry: any) => {
              if (selectedName && selectedName.uid !== userId) return;
              const start = parseISO(entry.startDate);
              const end = parseISO(entry.endDate);

              eachDayOfInterval({ start, end }).forEach(() => {
                flattened.push({ type: entry.vacationType });
              });
            });
          });
        });
      }

      const counts = {
        연차: flattened.filter(f => f.type === "연차").length,
        반차: flattened.filter(f => f.type === "반차").length,
        "특별 휴가": flattened.filter(f => f.type === "특별 휴가").length,
      };

      const total = counts["연차"] + counts["반차"] + counts["특별 휴가"];

      const allData: PieDataItem[] = [
        {
          name: "연차",
          value: total ? (counts["연차"] / total) * 100 : 0,
          days: counts["연차"],
          color: "#0F4C75",
        },
        {
          name: "반차",
          value: total ? (counts["반차"] / total) * 100 : 0,
          days: counts["반차"],
          color: "#3282B8",
        },
        {
          name: "특별 휴가",
          value: total ? (counts["특별 휴가"] / total) * 100 : 0,
          days: counts["특별 휴가"],
          color: "#BBE1FA",
        },
      ];

      setRawData(allData);
      setPieData(allData.filter(d => d.days > 0));
    };

    fetchData();
  }, [selectedDate, selectedName, mode, companyCode]);

  return { pieData, rawData };
};
