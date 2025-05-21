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
    <li className={`flex items-start gap-3 rounded-md bg-white px-3 py-2 shadow-sm ${darkBgColor}`}>
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
    <div className="flex min-h-[250px] flex-col gap-4 md:flex-row md:p-3">
      {/* 출근율 박스 */}
      <div className="w-full dark:text-white md:max-w-sm">
        <div className="rounded-md border border-solid border-white-border-sub bg-white p-4 py-6 text-gray-800 transition-all duration-300 hover:shadow-xl dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100">
          <h2 className="mb-2 text-xl font-semibold">금일 출근율</h2>
          <p className="mb-6 text-sm text-gray-600 dark:text-zinc-400">
            전체 직원 중{" "}
            <span className="text-emerald-500 dark:text-emerald-300">
              {commuteEmployeeNumber}명
            </span>{" "}
            출근 / 총 {totalEmployeeNumber}명
          </p>
          <div className="relative h-[180px] sm:h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart
                innerRadius="100%"
                outerRadius="170%"
                cx="50%"
                cy="100%"
                startAngle={180}
                endAngle={0}
                data={chartData}
              >
                <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
                <RadialBar dataKey="value" background fill="#34d399" />
              </RadialBarChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-end justify-center">
              <span className="bg-gradient-to-r from-emerald-500 to-green-400 bg-clip-text text-2xl font-extrabold text-transparent dark:from-emerald-300 dark:to-green-200 sm:text-4xl">
                {percentage}%
              </span>
            </div>
          </div>
        </div>
        <div className="mt-3">
          <TodayVacationEmployeeCard selectedDate={new Date()} />
        </div>
      </div>

      {/* 리스트 */}
      <div className="flex w-full flex-col gap-4 md:flex-row">
        {/* 출근 중 */}
        <div className="flex flex-1 flex-col gap-4 rounded-xl border border-emerald-100 bg-emerald-50 p-5 dark:border-emerald-700/30 dark:bg-emerald-900/10">
          <h3 className="flex items-center gap-2 text-sm font-semibold text-emerald-700 dark:text-emerald-300">
            <span className="inline-block rounded bg-emerald-200 px-2 py-0.5 text-[11px] font-bold dark:bg-emerald-600 dark:text-white">
              WORKING
            </span>
            현재 근무 중 ({workingEmployees?.length || 0})
          </h3>
          <ul className="relative max-h-[380px] space-y-3 overflow-y-auto pb-6 pr-1">
            {workingEmployees?.length > 0 ? (
              workingEmployees.map(({ user, startTime }, index) =>
                user ? (
                  <EmployeeListItem
                    key={index}
                    name={user.name}
                    jobName={user.jobName}
                    phoneNumber={user.phoneNumber}
                    employmentType={user.employmentType}
                    subText={`출근 ${dayjs(startTime).format("HH:mm")}`}
                    iconColor="text-emerald-700"
                    bgColor="bg-emerald-100"
                    darkBgColor="dark:bg-emerald-800/30"
                  />
                ) : null,
              )
            ) : (
              <li className="text-sm text-gray-500 dark:text-gray-400">
                금일 출근 중인 직원이 없습니다.
              </li>
            )}
          </ul>
        </div>

        {/* 외근 */}
        <div className="flex flex-1 flex-col gap-4 rounded-xl border border-orange-100 bg-orange-50 p-5 dark:border-orange-700/30 dark:bg-orange-900/10">
          <h3 className="flex items-center gap-2 text-sm font-semibold text-orange-700 dark:text-orange-300">
            <span className="inline-block rounded bg-orange-200 px-2 py-0.5 text-[11px] font-semibold dark:bg-orange-600 dark:text-white">
              OUTWORK
            </span>
            금일 외근 ({outworkingPlace?.employees?.length || 0})
          </h3>

          <ul className="relative max-h-[380px] space-y-3 overflow-y-auto pb-6 pr-1">
            {outworkingEmployees.length > 0 ? (
              outworkingEmployees.map((user: any, index: number) =>
                user ? (
                  <EmployeeListItem
                    key={index}
                    name={user.name}
                    jobName={user.jobName}
                    phoneNumber={user.phoneNumber}
                    employmentType={user.employmentType}
                    subText={user.memo}
                    iconColor="text-orange-700"
                    bgColor="bg-orange-100"
                    darkBgColor="dark:bg-orange-800/30"
                  />
                ) : null,
              )
            ) : (
              <li className="text-sm text-gray-500 dark:text-gray-400">
                금일 외근 중인 직원이 없습니다.
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TodayCommuteBox;
