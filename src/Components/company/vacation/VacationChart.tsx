import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import { EmployeeInfo } from "@/model/types/user.type";
import VacationChartModal from "@/components/common/modal/VacationChartModal";
import { useVacationChartData } from "@/hooks/vacation/useVacationChartData";
import { getFilteredDetails } from "@/util/vacation.util";
import VacationSubTitle from "./\bVacationSubTitle";
import { CustomBarLegend } from "@/components/common/chart/CustomLegend";
import { CustomBarTooltip } from "@/components/common/chart/CustomTooltip";

interface IVacationChartProps {
  selectedDate: { year: number; month: number };
  selectedName: EmployeeInfo | null;
  mode: "month" | "year";
}

const VacationChart = ({ selectedDate, selectedName, mode }: IVacationChartProps) => {
  const [selectedData, setSelectedData] = useState<any>(null);
  const { vacationData, rawDetails } = useVacationChartData(selectedDate, selectedName, mode);

  const handleBarClick = (data: any) => {
    setSelectedData(data);
  };

  const handleClose = () => setSelectedData(null);

  const detailedList = getFilteredDetails({
    rawDetails,
    selectedData,
    mode,
  });

  return (
    <>
      <Card className="p-4">
        <VacationSubTitle
          selectedDate={selectedDate}
          selectedName={selectedName}
          mode={mode}
          className="mb-10 ml-3 text-left text-lg font-semibold"
          title="휴가 현황"
        />
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
            <Tooltip content={<CustomBarTooltip />} />
            <Bar dataKey="annual" fill="#0F4C75" name="연차" radius={[4, 4, 0, 0]} />
            <Bar dataKey="half" fill="#3282B8" name="반차" radius={[4, 4, 0, 0]} />
            <Bar dataKey="special" fill="#BBE1FA" name="특별 휴가" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>

        <div className="mt-4">
          <CustomBarLegend />
        </div>
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
