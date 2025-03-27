import { TEmpUserData } from "@/model/types/user.type";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

const data = [
  { name: "연차", value: 60, color: "#0F4C75", days: 12 },
  { name: "반차", value: 25, color: "#3282B8", days: 5 },
  { name: "특별 휴가", value: 15, color: "#BBE1FA", days: 3 },
];

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
    return (
      <div className="rounded-md bg-white p-2 text-xs text-black shadow-md">
        <p className="font-semibold">{payload[0].name}</p>
        <p>{`${payload[0].value}% (${data.find(item => item.name === payload[0].name)?.days}일)`}</p>
      </div>
    );
  }
  return null;
};
interface IVacationPieChartProps {
  selectedDate: { year: number; month: number };
  selectedName: TEmpUserData | null;
}

const VacationPieChart = ({ selectedDate, selectedName }: IVacationPieChartProps) => {
  return (
    <div className="flex flex-col items-center">
      <h3 className="mb-3 text-lg font-semibold text-white-text dark:text-dark-text">
        {selectedDate && `${selectedDate.year}년 ${selectedDate.month + 1}월 `}
        {selectedName ? `${selectedName.name}님의` : "전체"} 유형별 휴가 사용 현황
      </h3>
      <ResponsiveContainer width="100%" height={350}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={50} // 도넛 두께 증가
            outerRadius={120}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
            label={renderCustomizedLabel}
            labelLine={false}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      </ResponsiveContainer>
      {/* 차트 아래 휴가 일수 표시 */}
      <div className="mt-3 flex flex-col items-center gap-1 text-sm text-white-border dark:text-dark-border">
        {data.map(item => (
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
