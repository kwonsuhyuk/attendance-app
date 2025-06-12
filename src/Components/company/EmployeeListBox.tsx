import { useEmployeeList } from "@/hooks/manager/useEmployeeList";
import { useCompanyStore } from "@/store/company.store";
import { Users } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { CustomTooltip } from "../common/chart/CustomTooltip";
import { CustomLegend } from "../common/chart/CustomLegend";
import { CHART_COLORS, GRAY_COLOR } from "@/constants/chartColor";
import SummaryCard from "./\bSummaryCard";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const EmployeeListBox = () => {
  const { employeeList } = useEmployeeList();
  const jobList = useCompanyStore(state => state.currentCompany?.jobList);
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [current, setCurrent] = useState(0);
  const totalSlides = 2;

  const { pieData: jobPieData, total: jobTotal } = useMemo(() => {
    const jobCountMap: Record<string, number> = {};
    const jobNames = jobList?.map(job => job.name);

    employeeList?.forEach(emp => {
      const jobName = emp.jobName;
      const key = jobNames?.includes(jobName) ? jobName : "선택 안함";
      jobCountMap[key] = (jobCountMap[key] || 0) + 1;
    });

    let colorIndex = 0;
    const data = Object.entries(jobCountMap)
      .sort(([a], [b]) => {
        if (a === "선택 안함") return 1;
        if (b === "선택 안함") return -1;
        return 0;
      })
      .map(([name, value]) => {
        const color =
          name === "선택 안함" ? GRAY_COLOR : CHART_COLORS[colorIndex++ % CHART_COLORS.length];
        return { name, value, color };
      });

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

    let colorIndex = 0;
    const data = Object.entries(typeCountMap).map(([name, value]) => {
      const color =
        name === "선택안함" ? GRAY_COLOR : CHART_COLORS[colorIndex++ % CHART_COLORS.length];
      return { name, value, color };
    });

    return {
      pieData: data,
      total: data.reduce((sum, d) => sum + d.value, 0),
    };
  }, [employeeList]);

  useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <div className="space-y-4" data-tour="manager_home-5">
      <SummaryCard title="전체 구성원 수" count={employeeList.length} icon={Users} />

      <div className="hidden h-[28rem] grid-cols-1 gap-5 md:grid md:grid-cols-2">
        <div className="rounded-xl p-6 shadow-md">
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
        <div className="rounded-xl p-6 shadow-md">
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
      {/* 모바일 전용 */}
      <div className="md:hidden">
        <Carousel
          setApi={setApi}
          opts={{ loop: false }}
          className="relative mx-auto ml-3 w-full max-w-[360px]"
        >
          <CarouselContent className="p-4">
            <CarouselItem className="flex w-full justify-center">
              <div className="w-full rounded-xl p-4 shadow-md">
                <h2 className="mb-2 text-center text-base font-semibold">직무 분포도</h2>
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
            </CarouselItem>

            <CarouselItem className="flex w-full justify-center">
              <div className="w-full rounded-xl p-4 shadow-md">
                <h2 className="mb-2 text-center text-base font-semibold">고용형태 분포도</h2>
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
            </CarouselItem>
          </CarouselContent>

          {current > 0 && <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2" />}
          {current < totalSlides - 1 && (
            <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2" />
          )}
        </Carousel>
      </div>
    </div>
  );
};

export default EmployeeListBox;
