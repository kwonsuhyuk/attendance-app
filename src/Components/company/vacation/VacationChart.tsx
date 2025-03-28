import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";
import {
  format,
  startOfMonth,
  endOfMonth,
  addDays,
  parseISO,
  eachDayOfInterval,
  isWithinInterval,
} from "date-fns";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { EmployeeInfo } from "@/model/types/user.type";
import {
  fetchRegisteredVacationsByMonth,
  fetchRegisteredVacationsByYear,
} from "@/api/vacation.api";
import { useCompanyStore } from "@/store/company.store";
import VacationChartModal from "@/components/common/modal/VacationChartModal";

const getMonthDates = (year: number, month: number) => {
  const firstDay = startOfMonth(new Date(year, month));
  const lastDay = endOfMonth(new Date(year, month));
  const dates = [];
  for (let day = firstDay; day <= lastDay; day = addDays(day, 1)) {
    dates.push(format(day, "MM-dd"));
  }
  return dates;
};

interface IVacationChartProps {
  selectedDate: { year: number; month: number };
  selectedName: EmployeeInfo | null;
  mode: "month" | "year";
}

const VacationChart = ({ selectedDate, selectedName, mode }: IVacationChartProps) => {
  const [vacationData, setVacationData] = useState<any[]>([]);
  const [selectedData, setSelectedData] = useState<any>(null);
  const [rawDetails, setRawDetails] = useState<any[]>([]);
  const companyCode = useCompanyStore(state => state.currentCompany?.companyCode);

  useEffect(() => {
    const fetchData = async () => {
      const year = selectedDate.year.toString();
      const month = (selectedDate.month + 1).toString().padStart(2, "0");

      if (!companyCode) return;

      const details: any[] = [];

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

  const handleBarClick = (data: any) => {
    setSelectedData(data);
  };

  const handleClose = () => setSelectedData(null);

  const detailedList = rawDetails.filter(detail => {
    if (!selectedData) return false;
    if (mode === "month") return detail.date === selectedData.date;
    if (mode === "year")
      return selectedData.monthLabel?.startsWith(String(parseISO(detail.startDate).getMonth() + 1));
    return false;
  });

  return (
    <>
      <Card className="p-4">
        <h2 className="mb-12 text-lg font-semibold">
          {selectedDate.year}년 {mode === "month" && `${selectedDate.month + 1}월 `}
          {selectedName ? `${selectedName.name}님의` : "전체"} 휴가 사용 현황
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={vacationData}
            className="text-sm"
            margin={{ left: 0, right: 10 }}
            onClick={(e: any) => {
              if (e?.activePayload?.[0]?.payload) {
                handleBarClick(e.activePayload[0].payload);
              }
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis stroke="gray" dataKey={mode === "year" ? "monthLabel" : "date"} />
            <YAxis
              stroke="gray"
              width={30}
              allowDecimals={false}
              domain={[0, (dataMax: number) => Math.max(dataMax, 10)]}
            />
            <Tooltip />
            <Legend align="right" />
            <Bar dataKey="annual" fill="#0F4C75" name="연차" radius={[4, 4, 0, 0]} />
            <Bar dataKey="half" fill="#3282B8" name="반차" radius={[4, 4, 0, 0]} />
            <Bar dataKey="special" fill="#BBE1FA" name="특별 휴가" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      <VacationChartModal
        open={!!selectedData}
        onClose={handleClose}
        label={selectedData?.date || selectedData?.monthLabel}
        details={detailedList}
      />
    </>
  );
};

export default VacationChart;
