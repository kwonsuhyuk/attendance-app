import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BarChart3,
  UserCheck,
  Users,
  Plus,
  ChevronRight,
  RefreshCw,
  User,
  PlaneTakeoffIcon,
  StickyNote,
} from "lucide-react";
import { useState } from "react";
import { ResponsiveContainer, Pie, PieChart as RechartPieChart, Cell, Tooltip } from "recharts";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { MapPin, Phone } from "lucide-react";
import { DatePickerDemo } from "@/components/ui/DatePicker";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import { useTodayCommuteData } from "@/hooks/manager/useTodayCommuteData";
import VacationChartModal from "@/components/common/modal/VacationChartModal";
import { useVacationChartData } from "@/hooks/vacation/useVacationChartData";
import { getFilteredDetails } from "@/util/vacation.util";
import useTodayVacationData from "@/hooks/manager/useTodayVacationData";
import { TPlaceData, TWorkplaceEmployee, useFilterWork } from "@/hooks/manager/useFilterWork";
import { useCompanyStore } from "@/store/company.store";
import { getKSTDateInfo } from "@/util/time.util";
import { isValid } from "date-fns";

interface IAttendanceHeaderProps {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
}

export const AttendanceHeader = ({ selectedDate, setSelectedDate }: IAttendanceHeaderProps) => {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-xl font-bold sm:text-2xl">
        {selectedDate.getMonth() + 1}/{selectedDate.getDate()} 출퇴근 현황
      </h1>

      {/* 모바일 레이아웃 */}
      <div className="flex flex-wrap items-center justify-between gap-2 sm:hidden">
        <div className="flex w-full items-center justify-between gap-2">
          <DatePickerDemo pickDate={selectedDate} setPickDate={setSelectedDate} />
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1 bg-transparent"
            onClick={handleRefresh}
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
        <Button className="flex w-full items-center gap-2 bg-point-color text-black hover:bg-orange-200">
          <Plus className="h-4 w-4" /> 수동 출퇴근 등록
        </Button>
      </div>

      {/* 데스크탑 레이아웃 */}
      <div className="hidden sm:flex sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <DatePickerDemo pickDate={selectedDate} setPickDate={setSelectedDate} />
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1 bg-transparent"
            onClick={handleRefresh}
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
        <Button className="flex items-center gap-2 bg-point-color text-black hover:bg-orange-200">
          <Plus className="h-4 w-4" /> 수동 출퇴근 등록
        </Button>
      </div>
    </div>
  );
};

export const AttendanceStatsCards = ({ selectedDate }: { selectedDate: Date }) => {

  const { totalEmployeeNumber, commuteEmployeeNumber } = useTodayCommuteData({
    year: dayjs(selectedDate).format("YYYY"),
    month: dayjs(selectedDate).format("MM"),
    day: dayjs(selectedDate).format("DD"),
  });
  return (
    <div className="grid w-full grid-cols-3 gap-2 md:grid-cols-3 md:gap-4">
      {/* 전체 직원 수 */}
      <Card>
        <CardContent className="flex flex-col items-center gap-1 p-2 md:flex-row md:items-center md:gap-4 md:p-4">
          <Users className="h-5 w-5 text-blue-600 md:h-6 md:w-6" />
          <div className="text-center md:text-left">
            <p className="text-[0.65rem] text-muted-foreground md:text-xs">전체 직원 수</p>
            <p className="text-sm font-bold md:text-lg">{totalEmployeeNumber}명</p>
          </div>
        </CardContent>
      </Card>

      {/* 출근 현황 */}
      <Card className="border border-green-200 bg-green-100 dark:bg-green-800">
        <CardContent className="flex flex-col items-center gap-1 p-2 md:flex-row md:items-center md:gap-4 md:p-4">
          <UserCheck className="h-5 w-5 text-green-800 dark:text-green-300 md:h-6 md:w-6" />
          <div className="text-center md:text-left">
            <p className="text-[0.65rem] dark:text-dark-text md:text-xs">출근 현황</p>
            <p className="text-sm font-bold text-green-800 dark:text-green-300 md:text-lg">
              {commuteEmployeeNumber}명 / {totalEmployeeNumber}명
            </p>
          </div>
        </CardContent>
      </Card>
      <TodayVacationEmployeeCard selectedDate={selectedDate} />
    </div>
  );
};

export const FullAttendanceRatioChart = ({ selectedDate }: { selectedDate: Date }) => {
  const { commuteData, employeeList } = useTodayCommuteData({
    year: dayjs(selectedDate).format("YYYY"),
    month: dayjs(selectedDate).format("MM"),
    day: dayjs(selectedDate).format("DD"),
  });
  const placeList = useCompanyStore(state => state.currentCompany?.workPlacesList);
  const { workplacePlaces, outworkingPlace, notCommutePlace } = useFilterWork(
    commuteData,
    placeList ?? [],
    employeeList,
  );

  const pieColors = ["#4F46E5", "#22C55E", "#F97316", "#E11D48", "#3B82F6", "#FACC15", "#10B981"];

  const totalData = [
    ...workplacePlaces.map(place => ({
      name: place.name,
      value: place.employees.length,
    })),
    { name: "외근", value: outworkingPlace.employees.length },
    { name: "미출근", value: notCommutePlace.employees.length },
  ];

  const total = totalData.reduce((acc, cur) => acc + cur.value, 0);

  return (
    <Card className="border bg-white dark:bg-zinc-900">
      <CardContent className="flex flex-col space-y-2 p-4 sm:space-y-4">
        {/* 제목 */}
        <h3 className="text-base font-semibold text-gray-800 dark:text-white sm:text-lg">
          전체 출근 분포
        </h3>

        {/* 차트 컨테이너 */}
        <div className="h-48 w-full md:h-64 lg:h-72 xl:h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <RechartPieChart>
              <Pie
                data={totalData}
                cx="50%"
                cy="50%"
                innerRadius="20%"
                outerRadius="65%"
                paddingAngle={3}
                cornerRadius={5}
                dataKey="value"
              >
                {totalData.map((_, idx) => (
                  <Cell key={`cell-${idx}`} fill={pieColors[idx % pieColors.length]} />
                ))}
              </Pie>

              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  borderRadius: "8px",
                  border: "1px solid #ccc",
                  fontSize: "12px",
                  padding: "8px",
                }}
                formatter={(value: number, name: string) => [`${value}명`, name]}
              />
            </RechartPieChart>
          </ResponsiveContainer>
        </div>

        {/* 범례 */}
        <div className="grid grid-cols-1 gap-2 overflow-y-auto py-2 pr-1 text-xs sm:grid-cols-2 sm:gap-3 sm:text-sm">
          {totalData.map((item, idx) => {
            const percent = total > 0 ? ((item.value / total) * 100).toFixed(1) : "0.0";
            return (
              <div
                key={idx}
                className="flex items-center gap-2 rounded bg-gray-50 px-2 py-1 dark:bg-zinc-700"
              >
                <span
                  className="inline-block h-2 w-2 rounded-full"
                  style={{ backgroundColor: pieColors[idx % pieColors.length] }}
                />
                <span className="font-medium text-gray-700 dark:text-white">{item.name}</span>
                <span className="ml-auto text-gray-500 dark:text-gray-300">
                  {item.value}명 ({percent}%)
                </span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export const OutworkingBox = ({ selectedDate }: { selectedDate: Date }) => {
  const { commuteData, employeeList } = useTodayCommuteData({
    year: dayjs(selectedDate).format("YYYY"),
    month: dayjs(selectedDate).format("MM"),
    day: dayjs(selectedDate).format("DD"),
  });
  const placeList = useCompanyStore(state => state.currentCompany?.workPlacesList);
  const { outworkingPlace } = useFilterWork(commuteData, placeList ?? [], employeeList);
  const outworkingEmployees = outworkingPlace.employees;

  return (
    <Card className="h-[450px] border border-yellow-100 bg-yellow-50 dark:border-yellow-300 dark:bg-zinc-800 sm:h-[550px]">
      <CardContent className="flex h-full flex-col p-4">
        {/* 헤더 */}
        <div className="mb-2 flex items-center justify-between sm:mb-4">
          <h3 className="text-base font-semibold text-yellow-700 dark:text-yellow-300 sm:text-lg">
            외근 인원{" "}
            <span className="ml-1 text-xs font-normal text-yellow-600 dark:text-yellow-400">
              ({outworkingEmployees.length}명)
            </span>
          </h3>
        </div>

        <div className="flex-1 space-y-2 overflow-y-auto pb-2 pr-1 sm:space-y-3">
          {outworkingEmployees.length > 0 ? (
            outworkingEmployees.map((item, i) => <OutworkerItem key={i} {...item} />)
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-yellow-600 dark:text-yellow-300">
              금일 외근 인원이 없습니다.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export const OutworkerItem = ({
  name,
  jobName,
  employmentType,
  phoneNumber,
  memo,
}: {
  name: string;
  jobName: string;
  employmentType: string;
  phoneNumber: string;
  memo?: string;
}) => {
  return (
    <div className="flex items-start gap-2 rounded-lg border border-gray-200 bg-white p-4 dark:border-zinc-600 dark:bg-zinc-700">
      {/* 아이콘 */}
      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-yellow-100 text-yellow-900 dark:bg-yellow-500 dark:text-white sm:h-9 sm:w-9">
        <User className="h-4 w-4 sm:h-5 sm:w-5" />
      </div>

      {/* 내용 */}
      <div className="flex-1">
        <h4 className="text-sm font-medium text-gray-900 dark:text-white sm:text-base">{name}</h4>
        <p className="text-xs text-gray-600 dark:text-gray-300 sm:text-sm">
          {jobName} · {employmentType}
        </p>
        <p className="mt-1 flex items-center text-xs text-gray-500 dark:text-gray-400 sm:text-sm">
          <Phone className="mr-1 h-3 w-3 sm:h-4 sm:w-4" /> {phoneNumber}
        </p>
        <div className="mt-2 flex items-center gap-1 text-xs sm:text-sm">
          <StickyNote className="h-3 w-3 text-yellow-600 dark:text-yellow-400 sm:h-4 sm:w-4" />
          <span className="rounded bg-yellow-50 px-1 py-0.5 font-medium text-yellow-800 dark:bg-transparent dark:text-yellow-400">
            {memo?.trim() ? memo : "-"}
          </span>
        </div>
      </div>
    </div>
  );
};

export const WorkplaceBreakdown = ({ selectedDate }: { selectedDate: Date }) => {
  const { commuteData, employeeList } = useTodayCommuteData({
    year: dayjs(selectedDate).format("YYYY"),
    month: dayjs(selectedDate).format("MM"),
    day: dayjs(selectedDate).format("DD"),
  });

  const placeList = useCompanyStore(state => state.currentCompany?.workPlacesList);
  const { workplacePlaces } = useFilterWork(commuteData, placeList ?? [], employeeList);

  const navigate = useNavigate();
  const { companyCode } = useParams();

  return (
    <Card className="w-full border bg-white dark:border-zinc-700 dark:bg-zinc-900">
      <CardContent className="p-4">
        <div className="mb-4 flex items-center gap-2 text-base font-semibold text-blue-800 dark:text-blue-300 sm:text-lg">
          <BarChart3 className="h-5 w-5" /> 근무지별 출근 인원
        </div>

        <div className="relative w-full overflow-hidden">
          <Carousel>
            <CarouselContent className="mx-4 my-6 h-[450px] w-64 max-w-[500px] sm:mx-12 sm:w-96 sm:max-w-[640px] md:w-[48rem] md:max-w-[976px] lg:w-[100rem]">
              {placeList && placeList.length > 0 ? (
                placeList.map((place, idx) => {
                  const matched = workplacePlaces.find(p => p.id === place.id);

                  return (
                    <CarouselItem key={idx} className="flex-none basis-full sm:basis-1/2">
                      <PlaceCard
                        place={{
                          ...place,
                          employees: matched?.employees || [],
                        }}
                      />
                    </CarouselItem>
                  );
                })
              ) : (
                <div className="flex h-[300px] w-full flex-col items-center justify-center gap-5 text-sm">
                  등록된 근무지가 없습니다. 근무지를 등록해주세요.
                  <Button onClick={() => navigate(`/${companyCode}/workplacemanage`)}>
                    근무지 등록하러 가기
                  </Button>
                </div>
              )}
            </CarouselContent>
            <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 bg-white shadow-sm dark:bg-zinc-700" />
            <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 bg-white shadow-sm dark:bg-zinc-700" />
          </Carousel>
        </div>
      </CardContent>
    </Card>
  );
};

export const PlaceCard = ({ place }: { place: TPlaceData }) => {
  return (
    <div className="flex h-full flex-col gap-5 rounded-2xl border border-solid border-gray-200 bg-white p-6 shadow-md transition-transform hover:scale-[1.02] hover:shadow-lg dark:border-gray-800 dark:bg-zinc-900">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-blue-500 dark:text-blue-400" />
          <h3 className="truncate text-lg font-bold text-gray-900 dark:text-white">{place.name}</h3>
        </div>
        <p className="ml-7 truncate text-sm text-gray-500 dark:text-gray-400">
          {place.address || "-"}
        </p>
      </div>

      {/* Memo */}
      <div className="flex items-start gap-2 rounded-md bg-gray-100 p-3 text-sm text-gray-600 dark:bg-zinc-800 dark:text-gray-300">
        <StickyNote className="h-5 w-5 shrink-0 text-yellow-500 dark:text-yellow-400" />
        <span className="truncate">{place.memo || "-"}</span>
      </div>

      {/* Employee List */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <h4 className="mb-2 text-base font-semibold text-gray-800 dark:text-white">
          출근 직원 {place.employees.length > 0 ? `(${place.employees.length})` : ""}
        </h4>
        <div className="scrollbar-thin scrollbar-thumb-blue-300 h-40 flex-1 space-y-2 overflow-y-auto pr-2">
          {place.employees.length > 0 ? (
            place.employees.map((emp: TWorkplaceEmployee) => (
              <div
                key={emp.userId}
                className="flex items-start gap-3 rounded-md border border-gray-200 bg-gray-50 p-3 dark:border-zinc-700 dark:bg-zinc-800"
              >
                {/* 프로필 이니셜 */}
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-900 dark:bg-blue-600 dark:text-white">
                  <User />
                </div>

                {/* 직원 정보 */}
                <div className="flex flex-col gap-0.5 overflow-hidden">
                  <p className="truncate text-sm font-semibold text-gray-900 dark:text-white">
                    {emp.name}
                  </p>
                  <p className="truncate text-xs text-gray-500 dark:text-gray-400">
                    {emp.jobName} · {emp.employmentType}
                  </p>

                  {(emp.startTime || emp.endTime) && (
                    <div className="mt-1 flex flex-col gap-0.5 text-xs">
                      <p className="text-green-600 dark:text-green-300">
                        출근:{" "}
                        <span className="text-gray-600 dark:text-gray-300">
                          {emp.startTime && isValid(new Date(emp.startTime))
                            ? getKSTDateInfo(emp.startTime)
                            : "-"}
                        </span>
                      </p>
                      <p className="text-rose-500 dark:text-rose-400">
                        퇴근:{" "}
                        <span className="text-gray-600 dark:text-gray-300">
                          {emp.endTime && isValid(new Date(emp.endTime))
                            ? getKSTDateInfo(emp.endTime)
                            : "-"}
                        </span>
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-gray-500 dark:text-gray-400 sm:text-base">
              금일 출근한 직원이 없습니다.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export const TodayVacationEmployeeCard = ({ selectedDate }: { selectedDate: Date }) => {
  const [selectedData, setSelectedData] = useState<any>(null);
  const { vacationData, rawDetails } = useVacationChartData(
    {
      year: dayjs(selectedDate).year(),
      month: dayjs(selectedDate).month(),
    },
    null,
    "month",
  );
  const { todayVacationData, totalTodayVacationCount } = useTodayVacationData({
    vacationData,
    selectedDate,
  });
  const detailedList = getFilteredDetails({
    rawDetails,
    selectedData,
    mode: "month",
  });

  const handleModalClose = () => setSelectedData(null);

  const handleVacationBoxClick = (data: any) => {
    setSelectedData(data);
  };
  return (
    <>
      <Card
        className="h-fit cursor-pointer bg-purple-100 transition hover:bg-purple-50 dark:bg-zinc-800 dark:hover:bg-zinc-700"
        onClick={() => handleVacationBoxClick(todayVacationData || null)}
      >
        <CardContent className="flex flex-col items-center gap-1 p-2 md:flex-row md:items-center md:gap-4 md:p-4">
          <PlaneTakeoffIcon className="h-5 w-5 text-purple-600 dark:text-purple-300 md:h-6 md:w-6" />
          <div className="text-center md:text-left">
            <p className="text-[0.65rem] text-muted-foreground dark:text-zinc-400 md:text-xs">
              휴가 인원
            </p>
            <p className="text-sm font-bold text-gray-800 dark:text-white md:text-lg">
              {totalTodayVacationCount}명
            </p>
          </div>
          <ChevronRight className="mt-1 hidden h-4 w-4 text-muted-foreground dark:text-zinc-400 sm:block md:ml-auto md:mt-0" />
        </CardContent>
      </Card>
      <VacationChartModal
        open={!!selectedData}
        onClose={handleModalClose}
        label={selectedData?.date}
        details={detailedList}
      />
    </>
  );
};
