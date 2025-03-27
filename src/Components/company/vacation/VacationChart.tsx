import React, { useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { format, startOfMonth, endOfMonth, addDays } from "date-fns";

const getMonthDates = (year: number, month: number) => {
  const firstDay = startOfMonth(new Date(year, month));
  const lastDay = endOfMonth(new Date(year, month));

  let dates = [];
  for (let day = firstDay; day <= lastDay; day = addDays(day, 1)) {
    dates.push(format(day, "MM-dd"));
  }
  return dates;
};

const generateDummyVacationData = (year: number, month: number) => {
  const dates = getMonthDates(year, month);
  return dates.map(date => ({
    date,
    annual: Math.floor(Math.random() * 10),
    half: Math.floor(Math.random() * 5),
    special: Math.floor(Math.random() * 3),
  }));
};

interface IVacationChartProps {
  selectedMonth: { year: number; month: number };
}

const VacationChart = ({ selectedMonth }: IVacationChartProps) => {
  const dummyVacationData = useMemo(() => {
    return generateDummyVacationData(selectedMonth.year, selectedMonth.month);
  }, [selectedMonth]);

  return (
    <Card className="p-4">
      <h2 className="mb-4 text-lg font-semibold">직원 휴가 사용 현황</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={dummyVacationData} className="text-sm" margin={{ left: 0, right: 10 }}>
          <XAxis stroke="gray" dataKey="date" />
          <YAxis stroke="gray" width={30} />
          <Tooltip />
          <Legend align="right" />
          <Bar dataKey="annual" fill="#0F4C75" name="연차" radius={[4, 4, 0, 0]} />
          <Bar dataKey="half" fill="#3282B8" name="반차" radius={[4, 4, 0, 0]} />
          <Bar dataKey="special" fill="#BBE1FA" name="특별 휴가" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default VacationChart;
