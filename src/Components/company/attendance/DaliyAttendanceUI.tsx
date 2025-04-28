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
import React, { useState } from "react";
import { ResponsiveContainer, Pie, PieChart as RechartPieChart, Cell } from "recharts";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { Building2, Laptop, MapPin, Briefcase, Slash, Phone } from "lucide-react";
import { DatePickerDemo } from "@/components/ui/DatePicker";
import { useNavigate, useParams } from "react-router-dom";

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
      <h1 className="text-xl font-bold sm:text-2xl">금일 출퇴근 현황</h1>

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

export const AttendanceStatsCards = () => (
  <div className="grid w-full grid-cols-3 gap-2 md:grid-cols-3 md:gap-4">
    {/* 전체 직원 수 */}
    <Card>
      <CardContent className="flex flex-col items-center gap-1 p-2 md:flex-row md:items-center md:gap-4 md:p-4">
        <Users className="h-5 w-5 text-blue-600 md:h-6 md:w-6" />
        <div className="text-center md:text-left">
          <p className="text-[0.65rem] text-muted-foreground md:text-xs">전체 직원 수</p>
          <p className="text-sm font-bold md:text-lg">87명</p>
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
            68명 / 76명
          </p>
        </div>
      </CardContent>
    </Card>

    {/* 휴가 인원 */}
    <Card className="cursor-pointer transition hover:bg-purple-50 dark:hover:bg-zinc-900">
      <CardContent className="flex flex-col items-center gap-1 p-2 md:flex-row md:items-center md:gap-4 md:p-4">
        <PlaneTakeoffIcon className="h-5 w-5 text-purple-600 md:h-6 md:w-6" />
        <div className="text-center md:text-left">
          <p className="text-[0.65rem] text-muted-foreground md:text-xs">휴가 인원</p>
          <p className="text-sm font-bold md:text-lg">11명</p>
        </div>
        <ChevronRight className="mt-1 hidden h-4 w-4 text-muted-foreground sm:block md:ml-auto md:mt-0" />
      </CardContent>
    </Card>
  </div>
);

export const FullAttendanceRatioChart = () => {
  const totalData = [
    { name: "본사", value: 42, icon: Building2 },
    { name: "재택근무", value: 18, icon: Laptop },
    { name: "지점", value: 6, icon: MapPin },
    { name: "외근", value: 4, icon: Briefcase },
    { name: "미출근", value: 17, icon: Slash },
  ];

  const pieColors = ["#3b82f6", "#10b981", "#8b5cf6", "#f59e0b", "#d1d5db"];
  const total = totalData.reduce((acc, cur) => acc + cur.value, 0);

  return (
    <Card className="border bg-white dark:bg-zinc-900">
      <CardContent className="flex flex-col space-y-2 p-4 sm:space-y-4">
        {/* 제목 */}
        <h3 className="text-base font-semibold text-gray-800 dark:text-white sm:text-lg">
          전체 출근 분포
        </h3>

        {/* 차트 컨테이너: 모바일→sm→md→lg→xl 별로 높이 조정 */}
        <div className="h-48 w-full md:h-64 lg:h-72 xl:h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <RechartPieChart>
              <Pie
                data={totalData}
                cx="50%"
                cy="50%"
                innerRadius="30%"
                outerRadius="70%"
                paddingAngle={2}
                dataKey="value"
              >
                {totalData.map((_, idx) => (
                  <Cell key={`cell-${idx}`} fill={pieColors[idx % pieColors.length]} />
                ))}
              </Pie>
            </RechartPieChart>
          </ResponsiveContainer>
        </div>

        {/* 범례: 모바일 1열, sm 이상 2열 */}
        <div className="grid grid-cols-1 gap-2 overflow-y-auto py-2 pr-1 text-xs sm:grid-cols-2 sm:gap-3 sm:text-sm">
          {totalData.map((item, idx) => {
            const percent = ((item.value / total) * 100).toFixed(1);
            return (
              <div
                key={idx}
                className="flex items-center gap-2 rounded bg-gray-50 px-2 py-1 dark:bg-zinc-700"
              >
                <span
                  className="inline-block h-2 w-2 rounded-full"
                  style={{ backgroundColor: pieColors[idx] }}
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

export const OutworkingBox = () => {
  const outworkers = [
    {
      name: "고길동",
      jobName: "영업팀",
      employmentType: "정규직",
      phoneNumber: "010-1234-5678",
      memo: "고객사 미팅 참석",
    },
    {
      name: "유재석",
      jobName: "디자인팀",
      employmentType: "계약직",
      phoneNumber: "010-2345-6789",
      memo: "외부 촬영 진행",
    },
    {
      name: "이영희",
      jobName: "마케팅팀",
      employmentType: "정규직",
      phoneNumber: "010-3456-7890",
      memo: "캠페인 미팅",
    },
    {
      name: "정준하",
      jobName: "영업팀",
      employmentType: "프리랜서",
      phoneNumber: "010-4567-8901",
      memo: "현장 점검",
    },
    {
      name: "박나래",
      jobName: "홍보팀",
      employmentType: "정규직",
      phoneNumber: "010-5678-9012",
      memo: "브랜드 인터뷰 진행",
    },
    {
      name: "이동욱",
      jobName: "기술팀",
      employmentType: "정규직",
      phoneNumber: "010-6789-0123",
      memo: "장비 설치",
    },
    {
      name: "장도연",
      jobName: "기획팀",
      employmentType: "계약직",
      phoneNumber: "010-7890-1234",
      memo: "파트너사 협의",
    },
  ];

  return (
    <Card className="h-[450px] border border-yellow-100 bg-yellow-50 dark:border-yellow-300 dark:bg-zinc-800 sm:h-[550px]">
      {/* flex-col & h-full 추가 */}
      <CardContent className="flex h-full flex-col p-4">
        {/* 헤더 */}
        <div className="mb-2 flex items-center justify-between sm:mb-4">
          <h3 className="text-base font-semibold text-yellow-700 dark:text-yellow-300 sm:text-lg">
            외근 인원{" "}
            <span className="ml-1 text-xs font-normal text-yellow-600 dark:text-yellow-400">
              ({outworkers.length}명)
            </span>
          </h3>
        </div>

        {/* 리스트: flex-1 + overflow-y-auto 로 남은 영역 스크롤 */}
        <div className="flex-1 space-y-2 overflow-y-auto pb-2 pr-1 sm:space-y-3">
          {outworkers.length > 0 ? (
            outworkers.map((w, i) => <OutworkerItem key={i} {...w} />)
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
  memo: string;
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

export const WorkplaceBreakdown = () => {
  const places = [
    {
      name: "본사",
      address: "서울특별시 강남구 테헤란로 123",
      memo: "본사 3층 회의실 공사 중",
      count: 42,
      employees: [
        { name: "홍길동", jobName: "영업팀", employmentType: "정규직", phone: "010-1234-5678" },
        { name: "김민지", jobName: "기획팀", employmentType: "계약직", phone: "010-5678-1234" },
        { name: "박찬호", jobName: "기술팀", employmentType: "프리랜서", phone: "010-3456-7890" },
      ],
    },
    {
      name: "재택근무",
      address: "개별 장소",
      memo: "줌 미팅 필수",
      count: 18,
      employees: [
        { name: "이수진", jobName: "마케팅팀", employmentType: "정규직", phone: "010-4567-8912" },
        { name: "장원영", jobName: "디자인팀", employmentType: "계약직", phone: "010-1234-8888" },
        { name: "최지훈", jobName: "개발팀", employmentType: "정규직", phone: "010-1111-2222" },
        { name: "이수진", jobName: "마케팅팀", employmentType: "정규직", phone: "010-4567-8912" },
        { name: "장원영", jobName: "디자인팀", employmentType: "계약직", phone: "010-1234-8888" },
        { name: "최지훈", jobName: "개발팀", employmentType: "정규직", phone: "010-1111-2222" },
        { name: "이수진", jobName: "마케팅팀", employmentType: "정규직", phone: "010-4567-8912" },
        { name: "장원영", jobName: "디자인팀", employmentType: "계약직", phone: "010-1234-8888" },
        { name: "최지훈", jobName: "개발팀", employmentType: "정규직", phone: "010-1111-2222" },
        { name: "이수진", jobName: "마케팅팀", employmentType: "정규직", phone: "010-4567-8912" },
        { name: "장원영", jobName: "디자인팀", employmentType: "계약직", phone: "010-1234-8888" },
        { name: "최지훈", jobName: "개발팀", employmentType: "정규직", phone: "010-1111-2222" },
        { name: "이수진", jobName: "마케팅팀", employmentType: "정규직", phone: "010-4567-8912" },
        { name: "장원영", jobName: "디자인팀", employmentType: "계약직", phone: "010-1234-8888" },
        { name: "최지훈", jobName: "개발팀", employmentType: "정규직", phone: "010-1111-2222" },
        { name: "이수진", jobName: "마케팅팀", employmentType: "정규직", phone: "010-4567-8912" },
        { name: "장원영", jobName: "디자인팀", employmentType: "계약직", phone: "010-1234-8888" },
        { name: "최지훈", jobName: "개발팀", employmentType: "정규직", phone: "010-1111-2222" },
      ],
    },
    {
      name: "지점",
      address: "부산 해운대구 해운대로 456",
      memo: "지점 리뉴얼 완료",
      count: 6,
      employees: [],
    },
    {
      name: "2사업장",
      address: "인천 연수구 센트럴로 77",
      memo: "출입증 필수 지참",
      count: 12,
      employees: [
        { name: "이동욱", jobName: "보안팀", employmentType: "정규직", phone: "010-6789-1234" },
        { name: "고길동", jobName: "유통팀", employmentType: "프리랜서", phone: "010-4567-3210" },
      ],
    },
    {
      name: "창고",
      address: "경기도 시흥시 배곧동 999",
      memo: "재고 정리 진행 중",
      count: 5,
      employees: [
        { name: "박나래", jobName: "물류팀", employmentType: "계약직", phone: "010-2345-1234" },
        { name: "유재석", jobName: "총무팀", employmentType: "정규직", phone: "010-7890-4567" },
      ],
    },
    {
      name: "본사",
      address: "서울특별시 강남구 테헤란로 123",
      memo: "본사 3층 회의실 공사 중",
      count: 42,
      employees: [
        { name: "홍길동", jobName: "영업팀", employmentType: "정규직", phone: "010-1234-5678" },
        { name: "김민지", jobName: "기획팀", employmentType: "계약직", phone: "010-5678-1234" },
        { name: "박찬호", jobName: "기술팀", employmentType: "프리랜서", phone: "010-3456-7890" },
      ],
    },
    {
      name: "재택근무",
      address: "개별 장소",
      memo: "줌 미팅 필수",
      count: 18,
      employees: [
        { name: "이수진", jobName: "마케팅팀", employmentType: "정규직", phone: "010-4567-8912" },
        { name: "장원영", jobName: "디자인팀", employmentType: "계약직", phone: "010-1234-8888" },
        { name: "최지훈", jobName: "개발팀", employmentType: "정규직", phone: "010-1111-2222" },
      ],
    },
    {
      name: "지점",
      address: "부산 해운대구 해운대로 456",
      memo: "지점 리뉴얼 완료",
      count: 6,
      employees: [
        { name: "정해인", jobName: "운영팀", employmentType: "정규직", phone: "010-9999-0000" },
        { name: "한소희", jobName: "관리팀", employmentType: "계약직", phone: "010-0000-1111" },
      ],
    },
    {
      name: "2사업장",
      address: "인천 연수구 센트럴로 77",
      memo: "출입증 필수 지참",
      count: 12,
      employees: [
        { name: "이동욱", jobName: "보안팀", employmentType: "정규직", phone: "010-6789-1234" },
        { name: "고길동", jobName: "유통팀", employmentType: "프리랜서", phone: "010-4567-3210" },
      ],
    },
    {
      name: "창고",
      address: "경기도 시흥시 배곧동 999",
      memo: "재고 정리 진행 중",
      count: 5,
      employees: [
        { name: "박나래", jobName: "물류팀", employmentType: "계약직", phone: "010-2345-1234" },
        { name: "유재석", jobName: "총무팀", employmentType: "정규직", phone: "010-7890-4567" },
      ],
    },
    {
      name: "본사",
      address: "서울특별시 강남구 테헤란로 123",
      memo: "본사 3층 회의실 공사 중",
      count: 42,
      employees: [
        { name: "홍길동", jobName: "영업팀", employmentType: "정규직", phone: "010-1234-5678" },
        { name: "김민지", jobName: "기획팀", employmentType: "계약직", phone: "010-5678-1234" },
        { name: "박찬호", jobName: "기술팀", employmentType: "프리랜서", phone: "010-3456-7890" },
      ],
    },
  ];
  const navigate = useNavigate();
  const { companyCode } = useParams();
  return (
    <Card className="w-full border bg-white dark:border-zinc-700 dark:bg-zinc-900">
      <CardContent className="p-4">
        <div className="mb-4 flex items-center gap-2 text-base font-semibold text-blue-800 dark:text-blue-300 sm:text-lg">
          <BarChart3 className="h-5 w-5" /> 근무지별 출근 인원
        </div>

        {/* overflow-hidden 으로 Carousel이 화면을 넘지 않도록 */}
        <div className="relative w-full overflow-hidden">
          <Carousel>
            <CarouselContent
              className={`mx-4 my-6 h-[450px] w-64 max-w-[500px] sm:mx-12 sm:w-96 sm:max-w-[640px] md:w-[48rem] md:max-w-[976px] lg:w-[100rem]`}
            >
              {places.length > 0 ? (
                places.map((place, idx) => (
                  <CarouselItem key={idx} className="flex-none basis-full sm:basis-1/2">
                    <PlaceCard place={place} />
                  </CarouselItem>
                ))
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

export const PlaceCard = ({ place }: { place: any }) => {
  return (
    <div
      className={`flex h-full flex-col gap-4 rounded-2xl border border-solid border-gray-200 bg-white p-4 pl-5 shadow-sm transition hover:shadow-md dark:border-zinc-700 dark:bg-zinc-900 md:h-[450px]`}
    >
      {/* 헤더 */}
      <div className="mb-2 flex items-start justify-between">
        <div>
          <h3 className="text-base font-bold text-gray-800 dark:text-white sm:text-lg">
            {place.name}
          </h3>
          <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 sm:text-sm">
            <MapPin className="h-4 w-4 sm:h-5 sm:w-5" /> {place.address}
          </div>
        </div>
      </div>

      {/* 메모 */}
      {place.memo && (
        <p className="mb-4 flex items-center gap-1 text-xs text-gray-600 dark:text-gray-300 sm:text-sm">
          <StickyNote className="h-4 w-4 sm:h-5 sm:w-5" /> {place.memo}
        </p>
      )}

      {/* 직원 리스트 */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <h4 className="mb-4 flex items-center gap-1 text-sm font-semibold text-gray-700 dark:text-white sm:text-base">
          <Users className="h-4 w-4 sm:h-5 sm:w-5" /> 출근 직원 ({place.employees.length})
        </h4>
        <div className="scrollbar-thin scrollbar-thumb-blue-300 h-40 flex-1 divide-y divide-gray-100 overflow-y-auto py-1 pr-1 dark:divide-zinc-700 sm:h-[250px]">
          {place.employees.length > 0 ? (
            place.employees.map((emp: any, i: number) => (
              <div key={i} className="flex items-start gap-2 py-2 sm:gap-3">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-blue-900 dark:bg-blue-600 dark:text-white sm:h-9 sm:w-9">
                  <User className="h-4 w-4 sm:h-5 sm:w-5" />
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-800 dark:text-white sm:text-base">
                    {emp.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-300 sm:text-sm">
                    {emp.jobName} · {emp.employmentType}
                  </p>
                  <p className="mt-1 flex items-center text-xs text-gray-500 dark:text-gray-400 sm:text-sm">
                    <Phone className="mr-1 h-3 w-3" /> {emp.phone}
                  </p>
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
