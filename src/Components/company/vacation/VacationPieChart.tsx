import { TEmpUserData } from "@/model/types/user.type";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { EmployeeInfo } from "@/model/types/user.type";
import { useVacationPieChart } from "@/hooks/vacation/useVacationPieChart";
import VacationTooltip from "./VacationTooltip";
import { renderCustomizedLabel } from "./CustomLabel";
import VacationSubTitle from "./\bVacationSubTitle";

interface IVacationPieChartProps {
  selectedDate: { year: number; month: number };
  selectedName: EmployeeInfo | null;
  mode: "month" | "year";
}


const VacationPieChart = ({ selectedDate, selectedName, mode }: IVacationPieChartProps) => {
  const { pieData, rawData } = useVacationPieChart(selectedDate, selectedName, mode);

  return (
    <div className="flex flex-col items-center">
      <VacationSubTitle
        selectedDate={selectedDate}
        selectedName={selectedName}
        mode={mode}
        title="유형별 휴가 현황"
        br
      />
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
            <Tooltip content={<VacationTooltip />} />
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
