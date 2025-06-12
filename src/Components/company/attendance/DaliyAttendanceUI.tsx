import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  UserCheck,
  Users,
  Plus,
  ChevronRight,
  RefreshCw,
  User,
  PlaneTakeoffIcon,
  Copy,
} from "lucide-react";
import { useMemo, useState } from "react";
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
import { toast, useToast } from "@/hooks/use-toast";
import { EmployeeListItem } from "../TodayCommuteBox";
import WorkplaceDetailModal from "@/components/common/modal/WorkplaceDetailModal";
import clsx from "clsx";
import RequestAlarmButton from "../RequestAlarmButton";
import OutworkRequestModal from "@/components/common/modal/OutworkRequestModal";
import { useOutworkRequests } from "@/hooks/manager/useOutworkRequests";

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
          description: "출퇴근 등록이 완료되었습니다.",
        });

        setOpenSelfCommute(false);
        handleRefresh();
      } else {
        toast({
          description:
            "출근 기록을 먼저 등록해주세요. 출근 시간 이전 시간으로 퇴근을 요청할 수 없습니다.",
          variant: "destructive",
        });
      }
    } catch (e) {
      console.error("수동 출퇴근 등록 실패", e);
      toast({
        description: "등록 중 오류가 발생했습니다. 다시 시도해주세요.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-end gap-1 sm:gap-2">
        <h1 className="text-2xl font-extrabold sm:text-3xl">
          {selectedDate.getMonth() + 1}월 {selectedDate.getDate()}일
        </h1>
        <p className="text-sm text-muted-foreground sm:text-base">출퇴근 현황</p>
      </div>

      {/* 모바일 레이아웃 */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-1 sm:hidden">
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
          variant="outline"
          className="flex w-full items-center gap-2"
          onClick={handleSelfCommuteModalOpen}
        >
          <Plus className="h-4 w-4" /> 수동 출퇴근 등록
        </Button>
      </div>

      {/* 데스크탑 레이아웃 */}
      <div className="hidden sm:flex sm:items-center sm:justify-between">
        <div className="flex items-center gap-2" data-tour="today-1">
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
        <div data-tour="today-2">
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={handleSelfCommuteModalOpen}
          >
            <Plus className="h-4 w-4" /> 수동 출퇴근 등록
          </Button>
        </div>
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

interface StatCardProps {
  icon: React.ElementType;
  iconColor: string;
  bgColor: string;
  title: string;
  count: string | number;
  subtitle?: string;
  onClick?: () => void;
  rightIcon?: React.ReactNode;
  className?: string;
}

const StatCard = ({
  icon: Icon,
  iconColor,
  bgColor,
  title,
  count,
  subtitle,
  onClick,
  rightIcon,
  className,
}: StatCardProps) => (
  <div
    onClick={onClick}
    className={clsx(
      "group relative flex items-center gap-4 rounded-2xl border border-solid border-point-color bg-white p-4 shadow-sm transition hover:shadow-md hover:ring-1 hover:ring-point-color/30",
      "dark:bg-[#1f2b26] dark:hover:ring-white/20",
      onClick && "cursor-pointer",
      className,
    )}
  >
    <div
      className={clsx("flex h-12 w-12 shrink-0 items-center justify-center rounded-xl", bgColor)}
    >
      <Icon className={clsx("h-5 w-5", iconColor)} />
    </div>

    <div className="flex flex-col justify-center">
      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</p>
      {subtitle && <p className="text-xs text-gray-400 dark:text-gray-500">{subtitle}</p>}
      <p className="text-xl font-bold text-gray-900 dark:text-white">{count}</p>
    </div>

    {rightIcon && <div className="ml-auto">{rightIcon}</div>}
  </div>
);

export const AttendanceStatsCards = ({ selectedDate }: { selectedDate: Date }) => {
  const { totalEmployeeNumber, commuteEmployeeNumber } = useTodayCommuteData({
    year: dayjs(selectedDate).format("YYYY"),
    month: dayjs(selectedDate).format("MM"),
    day: dayjs(selectedDate).format("DD"),
  });

  return (
    <div
      className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
      data-tour="today-3"
    >
      <StatCard
        icon={Users}
        iconColor="text-point-color"
        bgColor="bg-point-color-sub"
        title="전체 직원 수"
        count={`${totalEmployeeNumber}명`}
      />

      <StatCard
        icon={UserCheck}
        iconColor="text-point-color-sub"
        bgColor="bg-point-color"
        title="출근 현황"
        count={`${commuteEmployeeNumber}명 / ${totalEmployeeNumber}명`}
        className="border-point-color bg-point-color-sub"
      />

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

  const [selectedPlace, setSelectedPlace] = useState<any | null>(null);
  const [open, setOpen] = useState(false);

  const { coloredData, total } = useMemo(() => {
    const baseData = [
      ...workplacePlaces.map(place => ({
        name: place.name,
        value: place.employees.length,
        place,
      })),
      { name: "외근", value: outworkingPlace.employees.length, place: outworkingPlace },
      { name: "미출근", value: notCommutePlace.employees.length, place: notCommutePlace },
    ];

    const totalValue = baseData.reduce((acc, cur) => acc + cur.value, 0);

    let colorIndex = 0;
    const chartData = baseData.map(item => {
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

    return { coloredData: chartData, total: totalValue };
  }, [workplacePlaces, outworkingPlace, notCommutePlace]);

  const handlePieClick = (data: any) => {
    setSelectedPlace(data.place);
    setOpen(true);
  };

  return (
    <Card
      className="rounded-xl border bg-point-color-sub shadow-lg dark:bg-zinc-900"
      data-tour="today-5"
    >
      <CardContent className="flex flex-col gap-4 p-4 sm:p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-vacation-dark-color dark:text-white">
            금일 출근 분포
          </h3>
          <span className="text-sm text-point-color">{dayjs(selectedDate).format("M월 D일")}</span>
        </div>

        <div className="relative h-48 w-full sm:h-64 md:h-72" data-tour="today-6">
          <ResponsiveContainer width="100%" height="100%">
            <RechartPieChart>
              <Pie
                data={coloredData}
                cx="50%"
                cy="50%"
                innerRadius="55%"
                outerRadius="95%"
                paddingAngle={1}
                dataKey="value"
                stroke="none"
                isAnimationActive={false}
                onClick={handlePieClick}
              >
                {coloredData.map((entry, idx) => (
                  <Cell key={`cell-${idx}`} fill={entry.color} cursor="pointer" />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </RechartPieChart>
          </ResponsiveContainer>

          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <span className="text-3xl font-bold text-vacation-dark-color">
              {(() => {
                const notCommute = coloredData.find(d => d.name === "미출근")?.value || 0;
                return total === 0 ? "0%" : `${~~((1 - notCommute / total) * 100)}%`;
              })()}
            </span>
          </div>
        </div>

        <CustomLegend
          payload={coloredData.map(d => ({ value: d, color: d.color }))}
          total={total}
          className="pt-4 sm:px-8"
        />
      </CardContent>

      {selectedPlace && (
        <WorkplaceDetailModal open={open} onClose={() => setOpen(false)} place={selectedPlace} />
      )}
    </Card>
  );
};

export const OutworkingBox = ({ selectedDate }: { selectedDate: Date }) => {
  const { commuteData, employeeList } = useTodayCommuteData({
    year: dayjs(selectedDate).format("YYYY"),
    month: dayjs(selectedDate).format("MM"),
    day: dayjs(selectedDate).format("DD"),
  });
  const [showModal, setShowModal] = useState(false);
  const placeList = useCompanyStore(state => state.currentCompany?.workPlacesList);
  const { outworkingPlace } = useFilterWork(commuteData, placeList ?? [], employeeList);
  const outworkingEmployees = outworkingPlace.employees;
  const { pendingOutworkList, pendingOutworkCount } = useOutworkRequests();

  return (
    <div
      className="dark:border-outwork-color-dark dark:bg-outwork-color-dark flex flex-1 flex-col gap-4 rounded-xl bg-white p-4 shadow-lg"
      data-tour="today-7"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-base font-bold text-gray-800 dark:text-white sm:text-lg">
          외근 인원
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            ({outworkingEmployees.length})
          </span>
        </div>

        <RequestAlarmButton
          count={pendingOutworkCount}
          label="새로운 외근 요청"
          onClick={() => setShowModal(true)}
        />
      </div>

      <ul className="relative max-h-[380px] space-y-3 overflow-y-auto pb-6 pr-1">
        {outworkingEmployees.length > 0 ? (
          outworkingEmployees.map((user: any, index: number) =>
            user ? (
              <EmployeeListItem
                key={index}
                name={user.name}
                jobName={user.jobName}
                employmentType={user.employmentType}
                phoneNumber={user.phoneNumber}
                memo={user.memo}
                iconColor="text-vacation-color"
                bgColor="bg-point-color-sub"
                darkBgColor="dark:bg-point-color-sub/30"
                subText={`출근 ${dayjs(user?.startTime).format("HH:mm")}`}
              />
            ) : null,
          )
        ) : (
          <li className="text-sm text-gray-500 dark:text-gray-400">
            금일 외근 중인 직원이 없습니다.
          </li>
        )}
      </ul>
      <OutworkRequestModal
        open={showModal}
        onClose={() => setShowModal(false)}
        pendingOutworkList={pendingOutworkList}
      />
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
    <Card className="w-full bg-white" data-tour="today-8">
      <CardContent className="p-4">
        <div>
          <div className="flex items-center gap-2 text-lg font-bold text-zinc-800 dark:text-white sm:text-xl">
            근무지별 출근 인원
            <span className="group relative">
              <span className="ml-1 cursor-help text-sm text-gray-400 dark:text-gray-500">ⓘ</span>
              <div className="absolute left-5 top-full z-10 hidden w-max max-w-xs rounded-md border border-solid border-zinc-200 bg-white px-3 py-2 text-xs text-gray-600 shadow-md group-hover:block dark:border-zinc-700 dark:bg-zinc-800 dark:text-gray-300">
                출근지와 퇴근지가 다를 경우 <strong>출근지 기준</strong>으로 표시됩니다.
              </div>
            </span>
          </div>
        </div>

        <div className="relative w-full overflow-hidden">
          <Carousel>
            <CarouselContent className="mx-4 my-6 h-[450px] w-[18rem] max-w-[500px] sm:mx-12 sm:w-96 sm:max-w-[640px] md:w-[48rem] md:max-w-[976px] lg:w-[100rem]">
              {placeList && placeList.length > 0 ? (
                [...placeList]
                  .sort((a, b) => {
                    const aCount = workplacePlaces.find(p => p.id === a.id)?.employees.length ?? 0;
                    const bCount = workplacePlaces.find(p => p.id === b.id)?.employees.length ?? 0;
                    return bCount - aCount;
                  })
                  .map((place, idx) => {
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
                <div className="flex h-full w-full flex-col items-center justify-center gap-5 text-sm text-zinc-600 dark:text-zinc-400 sm:ml-40">
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
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const handleCopy = (phone: string) => {
    navigator.clipboard.writeText(phone);
    toast({ title: "전화번호가 복사되었습니다." });
  };

  return (
    <>
      <div
        onClick={() => setOpen(true)}
        className="flex h-full flex-col gap-4 rounded-2xl border border-point-color-sub bg-white p-4 pb-0 shadow-md transition-transform hover:scale-[1.01] hover:shadow-lg dark:border-white/10 dark:bg-[#f6f8f7]"
      >
        {/* 헤더 */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-vacation-dark-color" />
            <h3 className="text-lg font-bold text-vacation-dark-color">{place.name}</h3>
          </div>
          <div className="text-xs text-gray-400 dark:text-gray-500">
            {place.address || "주소 정보 없음"}
          </div>
        </div>

        {place.memo && (
          <div className="rounded-md border border-dashed border-point-color-sub bg-point-color-sub/10 px-4 py-3 text-sm text-vacation-dark-color dark:border-point-color-sub dark:text-point-color">
            {place.memo}
          </div>
        )}

        {/* 직원 목록 */}
        <div>
          {place.employees.length > 0 && (
            <h4 className="mb-2 flex justify-between text-sm font-semibold text-white-text">
              출근·퇴근 직원{" "}
              <span className="text-sm font-medium text-white-text dark:text-gray-300">
                {`${place.employees.length}명`}
              </span>
            </h4>
          )}

          <ul className="scrollbar-thin scrollbar-thumb-zinc-200 relative max-h-72 space-y-2 overflow-y-auto pr-1 pt-5">
            {place.employees.length > 0 ? (
              place.employees
                .slice()
                .sort((a, b) => {
                  const aTime =
                    a.startTime && isValid(new Date(a.startTime))
                      ? new Date(a.startTime).getTime()
                      : Infinity;
                  const bTime =
                    b.startTime && isValid(new Date(b.startTime))
                      ? new Date(b.startTime).getTime()
                      : Infinity;
                  return aTime - bTime;
                })
                .map(emp => (
                  <li
                    key={emp.userId}
                    className="flex items-start justify-between gap-2 rounded-md bg-white px-3 py-2 dark:bg-zinc-800"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-point-color-sub text-vacation-color dark:bg-point-color-sub/40 dark:text-white">
                        <User className="h-5 w-5" />
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <p className="truncate text-sm font-semibold text-gray-900 dark:text-white">
                          {emp.name}
                        </p>
                        <p className="truncate text-xs text-gray-500 dark:text-gray-400">
                          {emp.jobName} · {emp.employmentType}
                        </p>
                        {emp.phoneNumber && (
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {emp.phoneNumber}
                          </p>
                        )}
                        <div className="flex flex-wrap gap-1">
                          <p className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-700 dark:bg-emerald-900 dark:text-emerald-200">
                            출근{" "}
                            {emp.startTime && isValid(new Date(emp.startTime))
                              ? getKSTDateInfo(emp.startTime)
                              : "-"}
                          </p>
                          {emp.endTime !== "-" && (
                            <p className="rounded-full bg-rose-100 px-2 py-0.5 text-xs font-medium text-rose-700 dark:bg-rose-900 dark:text-rose-200">
                              퇴근{" "}
                              {emp.endTime && isValid(new Date(emp.endTime))
                                ? getKSTDateInfo(emp.endTime)
                                : "-"}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                    {emp.phoneNumber && (
                      <button
                        onClick={e => {
                          e.stopPropagation();
                          handleCopy(emp.phoneNumber);
                        }}
                        className="mt-1 text-gray-400 hover:text-gray-600 dark:text-zinc-300 dark:hover:text-white"
                      >
                        <Copy className="h-4 w-4" />
                      </button>
                    )}
                  </li>
                ))
            ) : (
              <li className="flex h-24 items-center justify-center text-sm text-zinc-400 dark:text-zinc-500">
                금일 출근한 직원이 없습니다.
              </li>
            )}
          </ul>
        </div>
      </div>

      <WorkplaceDetailModal open={open} onClose={() => setOpen(false)} place={place} />
    </>
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
      <div data-tour="today-4">
        <StatCard
          icon={PlaneTakeoffIcon}
          iconColor="text-point-color"
          bgColor="bg-point-color-sub"
          title="휴가 인원"
          count={`${totalTodayVacationCount}명`}
          onClick={() => handleVacationBoxClick(todayVacationData || null)}
          rightIcon={<ChevronRight className="h-4 w-4 text-gray-400 dark:text-white/60" />}
        />
      </div>

      <VacationChartModal
        open={!!selectedData}
        onClose={handleModalClose}
        label={selectedData?.date}
        details={detailedList}
      />
    </>
  );
};
