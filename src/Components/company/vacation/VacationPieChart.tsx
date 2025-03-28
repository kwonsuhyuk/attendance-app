import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { EmployeeInfo } from "@/model/types/user.type";
import {
  fetchRegisteredVacationsByMonth,
  fetchRegisteredVacationsByYear,
} from "@/api/vacation.api";
import { useCompanyStore } from "@/store/company.store";
import { parseISO, eachDayOfInterval } from "date-fns";

const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.6;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor="middle"
      dominantBaseline="central"
      className="text-sm font-bold"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const { name, value, payload: fullData } = payload[0];
    return (
      <div className="rounded-md bg-white p-2 text-xs text-black shadow-md">
        <p className="font-semibold">{name}</p>
        <p>{`${value.toFixed(1)}% (${fullData.days}일)`}</p>
      </div>
    );
  }
  return null;
};

interface IVacationPieChartProps {
  selectedDate: { year: number; month: number };
  selectedName: EmployeeInfo | null;
  mode: "month" | "year";
}

const VacationPieChart = ({ selectedDate, selectedName, mode }: IVacationPieChartProps) => {
  const companyCode = useCompanyStore(state => state.currentCompany?.companyCode);
  const [pieData, setPieData] = useState<any[]>([]);
  const [rawData, setRawData] = useState<any[]>([]); // 하단 텍스트용

  useEffect(() => {
    const fetchData = async () => {
      const year = selectedDate.year.toString();
      if (!companyCode) return;

      let flattened: any[] = [];

      if (mode === "month") {
        const month = (selectedDate.month + 1).toString().padStart(2, "0");
        const data = await fetchRegisteredVacationsByMonth(companyCode, year, month);

        Object.entries(data || {}).forEach(([userId, userData]: [string, any]) => {
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
          Object.entries(monthData).forEach(([userId, userData]: [string, any]) => {
            Object.values(userData).forEach((entry: any) => {
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
        특별휴가: flattened.filter(f => f.type === "특별 휴가").length,
      };

      const total = counts.연차 + counts.반차 + counts.특별휴가;

      const allData = [
        {
          name: "연차",
          value: total ? (counts.연차 / total) * 100 : 0,
          days: counts.연차,
          color: "#0F4C75",
        },
        {
          name: "반차",
          value: total ? (counts.반차 / total) * 100 : 0,
          days: counts.반차,
          color: "#3282B8",
        },
        {
          name: "특별 휴가",
          value: total ? (counts.특별휴가 / total) * 100 : 0,
          days: counts.특별휴가,
          color: "#BBE1FA",
        },
      ];

      setRawData(allData);
      setPieData(allData.filter(d => d.days > 0));
    };

    fetchData();
  }, [selectedDate, selectedName, mode, companyCode]);

  return (
    <div className="flex flex-col items-center">
      <h3 className="mb-3 text-center text-lg font-semibold text-white-text dark:text-dark-text">
        {selectedDate.year}년{mode === "month" && ` ${selectedDate.month + 1}월 `}
        {selectedName ? `${selectedName.name}님의` : "전체"} <br /> 유형별 휴가 사용 현황
      </h3>

      {pieData.length > 0 ? (
        <ResponsiveContainer width="100%" height={350}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              innerRadius={10}
              outerRadius={120}
              fill="#8884d8"
              paddingAngle={1}
              dataKey="value"
              label={renderCustomizedLabel}
              labelLine={false}
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <div className="flex h-[350px] items-center justify-center text-sm text-white-text dark:text-dark-text">
          휴가 데이터가 없습니다.
        </div>
      )}

      <div className="mt-3 flex flex-col items-center gap-1 text-sm text-white-border dark:text-dark-border">
        {rawData.map(item => (
          <p key={item.name} className="flex items-center gap-2">
            <span
              className="inline-block h-3 w-3 rounded-full"
              style={{ backgroundColor: item.color }}
            ></span>
            {item.name}: {item.days}일
          </p>
        ))}
      </div>
    </div>
  );
};

export default VacationPieChart;
