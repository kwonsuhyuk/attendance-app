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

interface IVacationChartProps {
  selectedDate: { year: number; month: number };
  selectedName: TEmpUserData | null;
}

const VacationChart = ({ selectedDate, selectedName }: IVacationChartProps) => {
  const dummyVacationData = useMemo(() => {
    return generateDummyVacationData(selectedDate.year, selectedDate.month);
  }, [selectedDate]);

  const [selectedData, setSelectedData] = useState<{
    date: string;
    annual: number;
    half: number;
    special: number;
  } | null>(null);

  const handleBarClick = (data: any) => {
    setSelectedData(data); // data = { date, annual, half, special }
  };

  const handleClose = () => setSelectedData(null);

  return (
    <>
      <Card className="p-4">
        <h2 className="mb-12 text-lg font-semibold">
          {selectedDate && `${selectedDate.year}년 ${selectedDate.month + 1}월 `}
          {selectedName ? `${selectedName.name}님의` : "전체"} 휴가 사용 현황
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={dummyVacationData} className="text-sm" margin={{ left: 0, right: 10 }}>
            <XAxis stroke="gray" dataKey="date" />
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

      {/* Fix : 여기 부분은 이제 해당 날짜에 휴가 사용중인, 사용한 인원 리스트 보여주는 모달로 교체 */}
      <Dialog open={!!selectedData} onOpenChange={handleClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedData?.date} 휴가 상세 정보</DialogTitle>
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
