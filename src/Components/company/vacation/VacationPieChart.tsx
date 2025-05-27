import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { EmployeeInfo } from "@/model/types/user.type";
import { useVacationPieChart } from "@/hooks/vacation/useVacationPieChart";
import { CustomTooltip } from "@/components/common/chart/CustomTooltip";
import { CustomLegend } from "@/components/common/chart/CustomLegend";
import VacationSubTitle from "./\bVacationSubTitle";
import { cn } from "@/util/cn.util";
import { CardTitle } from "@/components/ui/card";

interface IVacationPieChartProps {
  selectedDate: { year: number; month: number };
  selectedName: EmployeeInfo | null;
  mode: "month" | "year";
}

const VacationPieChart = ({ selectedDate, selectedName, mode }: IVacationPieChartProps) => {
  const { pieData, totalDays } = useVacationPieChart(selectedDate, selectedName, mode);

  const hasData = pieData.length > 0;
  const chartData = hasData ? pieData : [{ name: "휴가 없음", value: 1, color: "#e5e7eb" }];

  return (
    <div
      className={cn("w-full max-w-3xl rounded-2xl bg-white px-6 transition-all dark:bg-dark-bg")}
      data-tour="vstatic-4"
    >
      <CardTitle className="flex items-center gap-2 text-lg font-semibold md:text-xl">
        유형별 휴가 현황
      </CardTitle>
      <div className="relative mt-4 h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={80}
              outerRadius={140}
              paddingAngle={2}
              dataKey="value"
              stroke="none"
              label={false}
              labelLine={false}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            {hasData && <Tooltip content={<CustomTooltip />} />}
          </PieChart>
        </ResponsiveContainer>

        {hasData && (
          <div className="absolute inset-0 flex items-center justify-center text-center">
            <div className="text-sm font-bold text-gray-700 dark:text-white-text">
              총 {totalDays}일
            </div>
          </div>
        )}
      </div>

      <div className="mt-6">
        {hasData ? (
          <CustomLegend
            className="flex flex-col flex-wrap items-center justify-center gap-3 text-sm"
            payload={pieData.map(d => ({ value: d, color: d.color }))}
            total={totalDays}
          />
        ) : (
          <div className="text-center text-sm text-gray-400 dark:text-gray-500">
            휴가 데이터가 없습니다.
          </div>
        )}
      </div>
    </div>
  );
};

export default VacationPieChart;
