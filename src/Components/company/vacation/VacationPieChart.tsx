import { TEmpUserData } from "@/model/types/user.type";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

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
        <p>{`${value}% (${fullData.days}일)`}</p>
      </div>
    );
  }
  return null;
};

interface IVacationPieChartProps {
  selectedDate: { year: number; month: number };
  selectedName: TEmpUserData | null;
  mode: "month" | "year";
}

const VacationPieChart = ({ selectedDate, selectedName, mode }: IVacationPieChartProps) => {
  // 예시: 연간 or 월간에 따른 임시 더미 데이터
  const pieData =
    mode === "month"
      ? [
          { name: "연차", value: 60, color: "#0F4C75", days: 12 },
          { name: "반차", value: 25, color: "#3282B8", days: 5 },
          { name: "특별 휴가", value: 15, color: "#BBE1FA", days: 3 },
        ]
      : [
          { name: "연차", value: 70, color: "#0F4C75", days: 38 },
          { name: "반차", value: 20, color: "#3282B8", days: 10 },
          { name: "특별 휴가", value: 10, color: "#BBE1FA", days: 6 },
        ];

  return (
    <div className="flex flex-col items-center">
      <h3 className="mb-3 text-lg font-semibold text-white-text dark:text-dark-text">
        {selectedDate.year}년{mode === "month" && ` ${selectedDate.month + 1}월 `}
        {selectedName ? `${selectedName.name}님의` : "전체"} 유형별 휴가 사용 현황
      </h3>

      <ResponsiveContainer width="100%" height={350}>
        <PieChart>
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            innerRadius={50}
            outerRadius={120}
            fill="#8884d8"
            paddingAngle={5}
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

      <div className="mt-3 flex flex-col items-center gap-1 text-sm text-white-border dark:text-dark-border">
        {pieData.map(item => (
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
