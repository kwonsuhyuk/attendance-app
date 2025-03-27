import React, { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { format, startOfMonth, endOfMonth, addDays } from "date-fns";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { TEmpUserData } from "@/model/types/user.type";

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

const generateDummyYearlySummary = (year: number) => {
  return Array.from({ length: 12 }, (_, i) => ({
    monthLabel: `${i + 1}월`,
    annual: Math.floor(Math.random() * 30),
    half: Math.floor(Math.random() * 20),
    special: Math.floor(Math.random() * 10),
  }));
};

interface IVacationChartProps {
  selectedDate: { year: number; month: number };
  selectedName: TEmpUserData | null;
  mode: "month" | "year";
}

const VacationChart = ({ selectedDate, selectedName, mode }: IVacationChartProps) => {
  const dummyVacationData = useMemo(() => {
    if (mode === "month") {
      return generateDummyVacationData(selectedDate.year, selectedDate.month);
    }
    return generateDummyYearlySummary(selectedDate.year);
  }, [selectedDate, mode]);

  const [selectedData, setSelectedData] = useState<any>(null);

  const handleBarClick = (data: any) => {
    setSelectedData(data);
  };

  const handleClose = () => setSelectedData(null);

  return (
    <>
      <Card className="p-4">
        <h2 className="mb-12 text-lg font-semibold">
          {selectedDate.year}년 {mode === "month" && `${selectedDate.month + 1}월 `}
          {selectedName ? `${selectedName.name}님의` : "전체"} 휴가 사용 현황
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={dummyVacationData} className="text-sm" margin={{ left: 0, right: 10 }}>
            <XAxis stroke="gray" dataKey={mode === "year" ? "monthLabel" : "date"} />
            <YAxis stroke="gray" width={30} />
            <Tooltip />
            <Legend align="right" />
            <Bar
              dataKey="annual"
              fill="#0F4C75"
              name="연차"
              radius={[4, 4, 0, 0]}
              onClick={handleBarClick}
            />
            <Bar
              dataKey="half"
              fill="#3282B8"
              name="반차"
              radius={[4, 4, 0, 0]}
              onClick={handleBarClick}
            />
            <Bar
              dataKey="special"
              fill="#BBE1FA"
              name="특별 휴가"
              radius={[4, 4, 0, 0]}
              onClick={handleBarClick}
            />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      <Dialog open={!!selectedData} onOpenChange={handleClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {selectedData?.date || selectedData?.monthLabel} 휴가 상세 정보
            </DialogTitle>
          </DialogHeader>
          <div className="mt-2 space-y-2 text-sm text-gray-700">
            <p>연차: {selectedData?.annual}건</p>
            <p>반차: {selectedData?.half}건</p>
            <p>특별 휴가: {selectedData?.special}건</p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default VacationChart;
