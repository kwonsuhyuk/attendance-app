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
import { CHART_COLORS, GRAY_COLOR, ORANGE_COLOR } from "@/constants/chartColor";
import { CustomLegend } from "@/components/common/chart/CustomLegend";
import { CustomTooltip } from "@/components/common/chart/CustomTooltip";
import SelfCommuteModal from "@/components/common/modal/SelfCommuteModal";
import { EmployeeInfo } from "@/model/types/user.type";
import { processCommute } from "@/api/commute.api";
import { TCommuteStatus } from "@/model/types/commute.type";
import { toast } from "@/hooks/use-toast";
import { EmployeeListItem } from "../TodayCommuteBox";

interface IAttendanceHeaderProps {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
}

interface IAttendanceHeaderProps {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
}

export const AttendanceHeader = ({ selectedDate, setSelectedDate }: IAttendanceHeaderProps) => {
  const [openSelfCommute, setOpenSelfCommute] = useState(false);
  const { companyCode } = useParams();
  const handleRefresh = () => {
    window.location.reload();
  };

  const handleSelfCommuteModalOpen = () => {
    setOpenSelfCommute(true);
  };

  const handleSelfCommuteModalClose = () => {
    setOpenSelfCommute(false);
  };

  const handleSelfCommuteRegister = async (data: {
    user: EmployeeInfo;
    date: Date;
    startTime?: string;
    mode: "start" | "end";
    endTime?: string;
    place: string;
  }) => {
    try {
      const userId = data.user.uid;
      const time = data.startTime ?? data.endTime;

      if (!time) throw new Error("시간 정보가 없습니다.");

      const scanTime = dayjs(data.date).format("YYYY-MM-DD") + `T${time}`;

      if (!companyCode || !userId) {
        throw new Error("유저 정보가 없습니다.");
      }

      const status: TCommuteStatus = data.mode === "start" ? "not-checked-in" : "checked-in-only";

      const result = await processCommute(status, companyCode, userId, scanTime, data.place);

      if (result.success) {
        toast({
          description: "출근 등록이 완료되었습니다.",
        });
      } else {
        // 우선 출근기록없을때 퇴근찍었을때 오류만 핸들링해놓음
        toast({
          description:
            "출근 기록을 먼저 등록해주세요. 출근 시간 이전 시간으로 퇴근을 요청할 수 없습니다.",
          variant: "destructive",
        });
      }

      setOpenSelfCommute(false);
      handleRefresh();
    } catch (e) {
      console.error("수동 출퇴근 등록 실패", e);
    }
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
        <Button
          className="flex w-full items-center gap-2 bg-point-color text-black hover:bg-orange-200"
          onClick={handleSelfCommuteModalOpen}
        >
          <Plus className="h-4 w-4" /> 수동 출퇴근 등록
        </Button>
      </div>

      {/* 데스크탑 레이아웃 */}
      <div className="hidden sm:flex sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <DatePickerDemo
            pickDate={selectedDate}
            setPickDate={setSelectedDate}
            className="w-[240px]"
          />
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1 bg-transparent"
            onClick={handleRefresh}
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
        <Button
          className="flex items-center gap-2 bg-point-color text-black hover:bg-orange-200"
          onClick={handleSelfCommuteModalOpen}
        >
          <Plus className="h-4 w-4" /> 수동 출퇴근 등록
        </Button>
      </div>

      {/* SelfCommuteModal 연결 */}
      {openSelfCommute && (
        <SelfCommuteModal
          onClose={handleSelfCommuteModalClose}
          onRegister={handleSelfCommuteRegister}
        />
      )}
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

  const totalData = [
    ...workplacePlaces.map(place => ({
      name: place.name,
      value: place.employees.length,
    })),
    { name: "외근", value: outworkingPlace.employees.length },
    { name: "미출근", value: notCommutePlace.employees.length },
  ];

  const total = totalData.reduce((acc, cur) => acc + cur.value, 0);

  let colorIndex = 0;
  const coloredData = totalData.map(item => {
    let color = "";

    if (item.name === "미출근") {
      color = GRAY_COLOR;
    } else if (item.name === "외근") {
      color = ORANGE_COLOR;
    } else {
      color = CHART_COLORS[colorIndex % CHART_COLORS.length];
      colorIndex++;
    }

    return { ...item, color };
  });

  return (
    <Card className="border bg-white dark:bg-zinc-900">
      <CardContent className="flex flex-col space-y-2 p-4 sm:space-y-4">
        <h3 className="text-base font-semibold text-gray-800 dark:text-white sm:text-lg">
          전체 출근 분포
        </h3>

        <div className="h-48 w-full md:h-64 lg:h-72 xl:h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <RechartPieChart>
              <Pie
                data={coloredData}
                cx="50%"
                cy="50%"
                innerRadius={10}
                outerRadius={90}
                paddingAngle={1}
                dataKey="value"
                labelLine={false}
                label={false}
              >
                {coloredData.map((entry, idx) => (
                  <Cell key={`cell-${idx}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </RechartPieChart>
          </ResponsiveContainer>
        </div>

        <CustomLegend
          payload={coloredData.map(d => ({ value: d, color: d.color }))}
          total={total}
          className="py-5 sm:px-10"
        />
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
    <div className="flex flex-1 flex-col gap-4 rounded-lg border border-orange-100 bg-orange-50 p-5 dark:border-orange-700/30 dark:bg-orange-900/10">
      <h3 className="text-base font-semibold text-yellow-700 dark:text-orange-300 sm:text-lg">
        외근 인원{" "}
        <span className="ml-1 text-xs font-normal text-yellow-600 dark:text-orange-300">
          ({outworkingEmployees.length}명)
        </span>
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
    <Card className="w-full bg-white">
      <CardContent className="p-4">
        <div className="mb-4 flex items-center gap-2 text-base font-semibold text-zinc-800 dark:text-white sm:text-lg">
          근무지별 출근 인원
        </div>

        <div className="relative w-full overflow-hidden">
          <Carousel>
            <CarouselContent className="mx-4 my-6 h-[450px] w-[18rem] max-w-[500px] sm:mx-12 sm:w-96 sm:max-w-[640px] md:w-[48rem] md:max-w-[976px] lg:w-[100rem]">
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
                <div className="flex h-[300px] w-full flex-col items-center justify-center gap-5 text-sm text-zinc-600 dark:text-zinc-400">
                  등록된 근무지가 없습니다. 근무지를 등록해주세요.
                  <Button onClick={() => navigate(`/${companyCode}/manager/workplacemanage`)}>
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
    <div className="flex h-full flex-col justify-between gap-5 rounded-xl border border-solid border-zinc-200 bg-white p-5 shadow-sm transition-transform hover:scale-[1.01] hover:shadow-md dark:border-zinc-700 dark:bg-zinc-900">
      {/* 헤더 */}
      <div className="flex flex-col gap-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-zinc-500 dark:text-zinc-400" />
            <h3 className="text-lg font-semibold text-zinc-800 dark:text-white">{place.name}</h3>
          </div>
          <span className="text-xs text-zinc-400 dark:text-zinc-500">
            {place.address || "주소 정보 없음"}
          </span>
        </div>

        {/* 메모 새 디자인 */}
        {place.memo && (
          <div className="rounded-md border border-dashed border-zinc-300 bg-zinc-50 px-4 py-3 text-sm text-zinc-600 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
            {place.memo}
          </div>
        )}
      </div>

      {/* 직원 목록 */}
      <div className="flex-1">
        <h4 className="mb-2 text-sm font-semibold text-zinc-800 dark:text-white">
          출근 직원 {place.employees.length > 0 ? `(${place.employees.length})` : ""}
        </h4>
        <div className="scrollbar-thin scrollbar-thumb-zinc-300 relative h-64 overflow-y-auto rounded-md border border-zinc-100 bg-zinc-50 p-2 dark:border-zinc-700 dark:bg-zinc-800">
          {place.employees.length > 0 ? (
            <ul className="space-y-2">
              {place.employees.map(emp => (
                <li
                  key={emp.userId}
                  className="flex items-center justify-between rounded-md bg-white px-3 py-2 shadow-sm dark:bg-zinc-700"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-200 text-zinc-800 dark:bg-zinc-600 dark:text-white">
                      <User className="h-4 w-4" />
                    </div>
                    <div className="text-sm">
                      <div className="font-medium text-zinc-800 dark:text-white">{emp.name}</div>
                      <div className="text-xs text-zinc-500 dark:text-zinc-400">
                        {emp.jobName} · {emp.employmentType}
                      </div>
                    </div>
                  </div>
                  <div className="flex-start flex flex-col gap-1 text-xs">
                    <p className="text-green-600 dark:text-green-400">
                      출근:{" "}
                      {emp.startTime && isValid(new Date(emp.startTime))
                        ? getKSTDateInfo(emp.startTime)
                        : "-"}
                    </p>
                    <p className="text-rose-500 dark:text-rose-400">
                      퇴근:{" "}
                      {emp.endTime && isValid(new Date(emp.endTime))
                        ? getKSTDateInfo(emp.endTime)
                        : "-"}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex h-24 items-center justify-center text-sm text-zinc-400 dark:text-zinc-500">
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
        className="h-fit cursor-pointer bg-sky-100 transition hover:bg-sky-50 dark:bg-sky-900 dark:hover:bg-sky-800"
        onClick={() => handleVacationBoxClick(todayVacationData || null)}
      >
        <CardContent className="flex flex-col items-center gap-1 p-2 md:flex-row md:items-center md:gap-4 md:p-4">
          <PlaneTakeoffIcon className="h-5 w-5 text-sky-600 dark:text-sky-300 md:h-6 md:w-6" />
          <div className="text-center md:text-left">
            <p className="text-[0.65rem] text-muted-foreground dark:text-sky-300 md:text-xs">
              휴가 인원
            </p>
            <p className="text-sm font-bold text-gray-800 dark:text-white md:text-lg">
              {totalTodayVacationCount}명
            </p>
          </div>
          <ChevronRight className="mt-1 hidden h-4 w-4 text-muted-foreground dark:text-sky-300 sm:block md:ml-auto md:mt-0" />
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
