import { useTodayCommuteData } from "@/hooks/manager/useTodayCommuteData";
import { useCompanyStore } from "@/store/company.store";
import dayjs from "dayjs";
import React from "react";
import { RadialBarChart, RadialBar, PolarAngleAxis, ResponsiveContainer } from "recharts";
import { TodayVacationEmployeeCard } from "./attendance/DaliyAttendanceUI";
import { Copy, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useFilterWork } from "@/hooks/manager/useFilterWork";

export const EmployeeListItem = ({
  name,
  jobName,
  phoneNumber,
  employmentType,
  iconColor = "text-emerald-700",
  bgColor = "bg-emerald-100",
  subText,
  darkBgColor = "dark:bg-zinc-800/70",
}: {
  name: string;
  jobName?: string;
  phoneNumber?: string;
  employmentType?: string;
  iconColor?: string;
  bgColor?: string;
  subText?: string;
  darkBgColor?: string;
}) => {
  const { toast } = useToast();

  const handleCopy = () => {
    if (!phoneNumber) return;
    navigator.clipboard.writeText(phoneNumber);
    toast({ title: "전화번호가 복사되었습니다." });
  };

  return (
    <li
      className={`flex items-start gap-3 rounded-md bg-white px-3 py-2 shadow-none ${darkBgColor}`}
    >
      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${bgColor} text-sm font-bold text-blue-900 dark:${bgColor} dark:text-white`}
      >
        <User className={`${iconColor} dark:text-black`} />
      </div>
      <div className="flex flex-col gap-0.5 overflow-hidden">
        <p className="truncate text-sm font-semibold text-gray-900 dark:text-white">{name}</p>
        <p className="truncate text-xs text-gray-500 dark:text-gray-400">
          {jobName} {employmentType && `· ${employmentType}`}
        </p>
        {phoneNumber && <p className="text-xs text-gray-500 dark:text-gray-400">{phoneNumber}</p>}
        {subText && (
          <p
            className={`text-xs ${iconColor} ${
              iconColor.includes("text-")
                ? iconColor.replace("text-", "dark:text-")
                : "dark:text-green-300"
            }`}
          >
            {subText}
          </p>
        )}
      </div>
      {phoneNumber && (
        <button
          onClick={handleCopy}
          className="ml-auto text-gray-400 hover:text-gray-600 dark:text-zinc-300 dark:hover:text-white"
        >
          <Copy className="h-4 w-4" />
        </button>
      )}
    </li>
  );
};

const TodayCommuteBox = () => {
  const { totalEmployeeNumber, commuteEmployeeNumber, workingEmployees } = useTodayCommuteData({
    year: dayjs().format("YYYY"),
    month: dayjs().format("MM"),
    day: dayjs().format("DD"),
  });
  const { commuteData, employeeList } = useTodayCommuteData({
    year: dayjs(new Date()).format("YYYY"),
    month: dayjs(new Date()).format("MM"),
    day: dayjs(new Date()).format("DD"),
  });
  const placeList = useCompanyStore(state => state.currentCompany?.workPlacesList);
  const { outworkingPlace } = useFilterWork(commuteData, placeList ?? [], employeeList);
  const outworkingEmployees = outworkingPlace.employees;

  useCompanyStore(state => state.currentCompany?.workPlacesList);

  const percentage = totalEmployeeNumber
    ? Math.round((commuteEmployeeNumber / totalEmployeeNumber) * 100)
    : 0;

  const chartData = [{ name: "출근율", value: percentage, fill: "#10b981" }];

  return (
    <div
      className="flex min-h-[250px] flex-col gap-4 md:flex-row md:gap-6 md:p-3"
      data-tour="manager_home-2"
    >
      {/* 출근율 박스 */}
      <div className="w-full dark:text-white md:max-w-sm">
        <div className="border-point-color-sub bg-point-color-sub rounded-xl border border-solid p-6 text-white shadow-lg dark:border-white/20 dark:bg-[#b4c8bb] dark:text-white">
          <h2 className="mb-2 text-lg font-bold text-vacation-dark-color dark:text-white">
            금일 출근율
          </h2>
          {/* 출근 인원 시각적 강조 */}
          <div className="mb-4 flex items-baseline gap-1 text-sm dark:text-white/80">
            <span className="text-3xl font-extrabold text-vacation-dark-color">
              {commuteEmployeeNumber}
            </span>
            <span className="font-semibol text-base text-vacation-color">
              / {totalEmployeeNumber}명 출근
            </span>
          </div>

          <div className="relative h-[220px] sm:h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart
                innerRadius="65%"
                outerRadius="115%"
                cx="50%"
                cy="50%"
                startAngle={90}
                endAngle={-270}
                data={chartData.map(d => ({ ...d, fill: "#6b8c7d" }))}
              >
                <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
                <RadialBar dataKey="value" background fill="#6b8c7d" />
              </RadialBarChart>
            </ResponsiveContainer>

            {/* 가운데 텍스트 */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xl font-extrabold text-vacation-dark-color sm:text-3xl">
                {percentage}%
              </span>
            </div>
          </div>
        </div>
        <div className="mt-8">
          <TodayVacationEmployeeCard selectedDate={new Date()} />
        </div>
      </div>

      {/* 리스트 */}
      <div className="flex w-full flex-col gap-4 md:flex-row">
        {[
          { title: "현재 근무 중", list: workingEmployees },
          { title: "금일 외근", list: outworkingEmployees },
        ].map(({ title, list }, idx) => (
          <div
            key={title}
            className="flex flex-1 flex-col gap-4 rounded-xl border border-point-color bg-white px-4 pt-6 shadow-md dark:border-white/20 dark:bg-[#f6f8f7]"
          >
            <h3 className="flex items-center gap-2 text-sm font-semibold">
              <span className="inline-block rounded bg-vacation-color px-2 py-0.5 text-[11px] font-bold text-white">
                {idx === 0 ? "WORKING" : "OUTWORK"}
              </span>
              <span className="text-vacation-color">
                {title} ({list?.length || 0})
              </span>
            </h3>
            <ul className="relative max-h-[480px] space-y-3 overflow-y-auto pr-1 pt-5">
              {list?.length > 0 ? (
                list.map((item, index) => {
                  const user = idx === 0 ? item.user : item;
                  if (!user) return null;
                  return (
                    <EmployeeListItem
                      key={index}
                      name={user.name}
                      jobName={user.jobName}
                      phoneNumber={user.phoneNumber}
                      employmentType={user.employmentType}
                      subText={
                        idx === 0
                          ? `출근 ${dayjs(item.startTime).format("HH:mm")}`
                          : (user.memo ?? "외근 중")
                      }
                      iconColor="text-vacation-color"
                      bgColor="bg-point-color-sub"
                      darkBgColor="dark:bg-point-color-sub/10"
                    />
                  );
                })
              ) : (
                <li className="text-sm text-gray-500 dark:text-gray-400">
                  {title}인 직원이 없습니다.
                </li>
              )}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodayCommuteBox;
