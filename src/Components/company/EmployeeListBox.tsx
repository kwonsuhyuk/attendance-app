import { useEmployeeList } from "@/hooks/manager/useEmployeeList";
import { useCompanyStore } from "@/store/company.store";
import { Users } from "lucide-react";
import React, { useMemo } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import SummaryCard from "./\bSummaryCard";

// 파스텔톤 직무 색상
const JOB_COLORS = ["#A5D8FF", "#B9FBC0", "#FFD6A5", "#FFADAD", "#CDB4DB"];

// 깔끔한 고용형태 색상
const EMPLOYMENT_COLORS = ["#60A5FA", "#FACC15", "#34D399", "#9CA3AF"];

const EmployeeListBox = () => {
  const { employeeList } = useEmployeeList();
  const jobList = useCompanyStore(state => state.currentCompany?.jobList || []);

  const { pieData: jobPieData, total: jobTotal } = useMemo(() => {
    const jobCountMap: Record<string, number> = {};
    const jobNames = jobList.map(job => job.name);

    employeeList?.forEach(emp => {
      const jobName = emp.jobName;
      const key = jobNames.includes(jobName) ? jobName : "선택 안함";
      jobCountMap[key] = (jobCountMap[key] || 0) + 1;
    });

    const data = Object.entries(jobCountMap)
      .sort(([aName], [bName]) => {
        if (aName === "선택 안함") return 1;
        if (bName === "선택 안함") return -1;
        return 0;
      })
      .map(([name, value], index) => ({
        name,
        value,
        color: JOB_COLORS[index % JOB_COLORS.length],
      }));

    return {
      pieData: data,
      total: data.reduce((sum, d) => sum + d.value, 0),
    };
  }, [employeeList, jobList]);

  const { pieData: empTypePieData, total: empTypeTotal } = useMemo(() => {
    const typeCountMap: Record<string, number> = {
      정규직: 0,
      계약직: 0,
      일용직: 0,
      선택안함: 0,
    };

    employeeList?.forEach(emp => {
      const type = emp.employmentType || "선택안함";
      typeCountMap[type] = (typeCountMap[type] || 0) + 1;
    });

    const data = Object.entries(typeCountMap).map(([name, value], index) => ({
      name,
      value,
      color: EMPLOYMENT_COLORS[index],
    }));

    return {
      pieData: data,
      total: data.reduce((sum, d) => sum + d.value, 0),
    };
  }, [employeeList]);

  return (
    <div className="space-y-4">
      <SummaryCard title="전체 구성원 수" count={employeeList.length} icon={Users} />
      {/* 직무 분포도 */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div className="rounded-md border border-solid border-white-border-sub p-4 dark:border-dark-border-sub">
          <h2 className="mb-2 text-base font-semibold">직무 분포도</h2>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={jobPieData}
                cx="50%"
                cy="50%"
                innerRadius={10}
                outerRadius={90}
                paddingAngle={1}
                dataKey="value"
                labelLine={false}
                label={false}
              >
                {jobPieData.map((entry, index) => (
                  <Cell key={`job-cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <CustomLegend
            payload={jobPieData.map(d => ({ value: d, color: d.color }))}
            total={jobTotal}
          />
        </div>

        {/* 고용형태 분포도 */}
        <div className="rounded-md border border-solid border-white-border-sub p-4 dark:border-dark-border-sub">
          <h2 className="mb-2 text-base font-semibold">고용형태 분포도</h2>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={empTypePieData}
                cx="50%"
                cy="50%"
                innerRadius={10}
                outerRadius={90}
                paddingAngle={1}
                dataKey="value"
                labelLine={false}
                label={false}
              >
                {empTypePieData.map((entry, index) => (
                  <Cell key={`emp-cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <CustomLegend
            payload={empTypePieData.map(d => ({ value: d, color: d.color }))}
            total={empTypeTotal}
          />
        </div>
      </div>
    </div>
  );
};

export default EmployeeListBox;

const CustomLegend = ({ payload, total }: { payload: any[]; total: number }) => {
  return (
    <ul className="mt-4 space-y-1 text-sm">
      {payload.map((entry, index) => (
        <li key={index} className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-sm" style={{ backgroundColor: entry.color }} />
            <span>{entry.value.name}</span>
          </div>
          <div className="text-gray-500">{`${entry.value.value} (${((entry.value.value / total) * 100).toFixed(1)}%)`}</div>
        </li>
      ))}
    </ul>
  );
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload?.length > 0) {
    const { name, value, color } = payload[0].payload;
    return (
      <div className="rounded-md border bg-white px-3 py-2 text-sm shadow-md">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-sm" style={{ backgroundColor: color }} />
          <span className="font-medium text-gray-800">{name}</span>
        </div>
        <div className="mt-1 text-gray-500">{value}명</div>
      </div>
    );
  }
  return null;
};
