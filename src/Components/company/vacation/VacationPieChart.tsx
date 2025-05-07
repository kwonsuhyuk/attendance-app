import { TEmpUserData } from "@/model/types/user.type";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { EmployeeInfo } from "@/model/types/user.type";
import { useVacationPieChart } from "@/hooks/vacation/useVacationPieChart";
import VacationTooltip from "./VacationTooltip";
import { renderCustomizedLabel } from "./CustomLabel";
import VacationSubTitle from "./\bVacationSubTitle";
import { CustomTooltip } from "@/components/common/chart/CustomTooltip";
import { CustomLegend } from "@/components/common/chart/CustomLegend";

interface IVacationPieChartProps {
  selectedDate: { year: number; month: number };
  selectedName: EmployeeInfo | null;
  mode: "month" | "year";
}

const VacationPieChart = ({ selectedDate, selectedName, mode }: IVacationPieChartProps) => {
  const { pieData, rawData, totalDays } = useVacationPieChart(selectedDate, selectedName, mode);

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
        <>
          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={10}
                outerRadius={90}
                paddingAngle={1}
                dataKey="value"
                fill="#8884d8"
                label={false}
                labelLine={false}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <CustomLegend
            payload={pieData.map(d => ({ value: d, color: d.color }))}
            total={totalDays}
          />
        </>
      ) : (
        <div className="flex h-[350px] items-center justify-center text-sm text-white-text dark:text-dark-text">
          휴가 데이터가 없습니다.
        </div>
      )}
    </div>
  );
};

export default VacationPieChart;
