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

export const AttendanceHeader = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-5">
        <h1 className="text-2xl font-bold">금일 출퇴근 현황</h1>
        <DatePickerDemo pickDate={new Date()} />
      </div>

      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" className="flex items-center gap-1 bg-transparent">
          <RefreshCw className="h-4 w-4" />
        </Button>
        <Button className="flex items-center gap-2 bg-point-color text-black hover:bg-orange-200">
          <Plus className="h-4 w-4" /> 수동 출퇴근 등록
        </Button>
      </div>
    </div>
  );
};

export const AttendanceStatsCards = () => (
  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
    <Card>
      <CardContent className="flex items-center gap-4 p-4">
        <Users className="text-blue-600" />
        <div>
          <p className="text-xs text-muted-foreground">전체 직원 수</p>
          <p className="text-lg font-bold">87명</p>
        </div>
      </CardContent>
    </Card>
    <Card className="border border-green-200 bg-green-100 dark:bg-green-800">
      <CardContent className="flex items-center gap-4 p-4">
        <UserCheck className="text-green-800 dark:text-green-300" />
        <div>
          <p className="text-xs text-muted-foreground dark:text-dark-text">출근 현황</p>
          <p className="text-lg font-bold text-green-800 dark:text-green-300">68명 / 76명</p>
        </div>
      </CardContent>
    </Card>
    <Card className="cursor-pointer transition hover:bg-purple-50 dark:hover:bg-zinc-900">
      <CardContent className="flex items-center justify-between gap-4 p-4">
        <div className="flex items-center gap-4">
          <PlaneTakeoffIcon className="text-purple-600" />
          <div>
            <p className="text-xs text-muted-foreground">휴가 인원</p>
            <p className="text-lg font-bold">11명</p>
          </div>
        </div>
        <ChevronRight className="text-muted-foreground" />
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
    <Card className="h-full max-h-[500px] border bg-white">
      <CardContent className="flex h-full flex-col space-y-4 p-4 pb-0">
        <div className="flex items-center gap-2 text-lg font-semibold text-gray-800 dark:text-white">
          전체 출근 분포
        </div>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <RechartPieChart>
              <Pie
                data={totalData}
                cx="50%"
                cy="50%"
                innerRadius={20}
                outerRadius={70}
                paddingAngle={3}
                dataKey="value"
              >
                {totalData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                ))}
              </Pie>
            </RechartPieChart>
          </ResponsiveContainer>
        </div>
        <div className="grid min-h-0 flex-1 grid-cols-1 gap-3 overflow-y-auto py-5 pr-1 text-sm sm:grid-cols-2">
          {totalData.map((item, idx) => {
            const percent = ((item.value / total) * 100).toFixed(1);
            return (
              <div
                key={idx}
                className="flex items-center gap-2 rounded-md bg-gray-50 px-3 py-2 dark:bg-zinc-700"
              >
                <span
                  className="inline-flex h-3 w-3 shrink-0 rounded-full"
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
    <Card className="h-full max-h-[500px] border border-yellow-100 bg-yellow-50 pb-0 dark:border-yellow-300">
      <CardContent className="flex h-full flex-col space-y-4 p-4 pb-0">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-yellow-700 dark:text-yellow-300">
            외근 인원{" "}
            <span className="ml-1 text-sm font-normal text-yellow-600 dark:text-yellow-400">
              ({outworkers.length}명)
            </span>
          </h3>
        </div>

        <div className="min-h-0 flex-1 space-y-3 overflow-y-auto pb-5 pr-1">
          {outworkers.length > 0 ? (
            outworkers.map((worker, idx) => <OutworkerItem key={idx} {...worker} />)
          ) : (
            <div className="flex h-full w-full items-center justify-center text-sm text-yellow-600 dark:text-yellow-300">
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
    <div className="flex gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-zinc-600 dark:bg-zinc-800">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-yellow-100 text-xs font-bold text-yellow-900 dark:bg-yellow-500 dark:text-white">
        <User className="h-4 w-4" />
      </div>
      <div className="flex flex-col justify-center">
        <h3 className="text-sm font-medium leading-tight text-gray-900 dark:text-white">{name}</h3>
        <p className="text-xs leading-tight text-gray-600 dark:text-gray-300">
          {jobName} · {employmentType}
        </p>
        <p className="mt-1 flex items-center text-xs leading-tight text-gray-500 dark:text-gray-400">
          <Phone className="mr-1 h-3 w-3" /> {phoneNumber}
        </p>
        <div className="mt-2 flex items-center gap-2 text-xs">
          <StickyNote className="h-3 w-3 text-yellow-600 dark:text-yellow-400" />
          <span className="rounded-full bg-yellow-50 px-2 py-0.5 font-medium text-yellow-800 dark:bg-yellow-600 dark:text-white">
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
    <Card className="border bg-white dark:border-zinc-700 dark:bg-zinc-900">
      <CardContent className="space-y-4 p-6">
        <div className="flex items-center gap-2 text-lg font-semibold text-blue-800 dark:text-blue-300">
          <BarChart3 className="h-5 w-5" /> 근무지별 출근 인원
        </div>
        <Carousel className="relative">
          <CarouselContent className="mx-auto my-3">
            {places.length > 0 ? (
              places.map((place, idx) => (
                <CarouselItem key={idx} className="basis-full px-2 sm:basis-1/2 md:basis-1/3">
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
          <CarouselPrevious className="left-0 top-1/2 -translate-x-6 -translate-y-1/2 bg-white shadow-sm dark:bg-zinc-700" />
          <CarouselNext className="right-0 top-1/2 -translate-y-1/2 translate-x-6 bg-white shadow-sm dark:bg-zinc-700" />
        </Carousel>
      </CardContent>
    </Card>
  );
};

export const PlaceCard = ({ place }: { place: any }) => {
  return (
    <div className="flex h-[450px] flex-col gap-8 rounded-2xl border border-solid border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md dark:border-zinc-700 dark:bg-zinc-900">
      {/* 헤더 */}
      <div className="flex flex-col gap-2">
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-1">
            <h3 className="text-lg font-bold text-gray-800 dark:text-white">{place.name}</h3>
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <MapPin className="h-4 w-4" />
              <span>{place.address}</span>
            </div>
          </div>
          <div className="text-right text-sm font-medium text-blue-700 dark:text-blue-300">
            <Users className="mr-1 inline-block h-4 w-4" />
            {place.count}명
          </div>
        </div>

        {/* 메모 */}
        {place.memo && (
          <div className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
            <StickyNote className="mt-0.5 h-4 w-4" />
            <span className="leading-snug">{place.memo}</span>
          </div>
        )}
      </div>

      {/* 직원 리스트 */}
      <div className="mt-4 flex h-[250px] flex-col">
        <h4 className="mb-5 flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-white">
          <Users className="h-4 w-4" />
          출근 직원
        </h4>
        <div className="flex h-full flex-col py-1">
          <div className="scrollbar-thin scrollbar-thumb-blue-300 flex-1 divide-y divide-gray-100 overflow-y-auto pr-1 dark:divide-zinc-700">
            {place.employees.length > 0 ? (
              place.employees.map((emp: any, i: number) => (
                <div key={i} className="flex items-start gap-3 py-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-blue-900 dark:bg-blue-600 dark:text-white">
                    <User className="h-4 w-4" />
                  </div>
                  <div className="text-sm">
                    <p className="font-medium text-gray-800 dark:text-white">{emp.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-300">
                      {emp.jobName} / {emp.employmentType}
                    </p>
                    <p className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                      <Phone className="h-3 w-3" /> {emp.phone}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex h-full w-full items-center justify-center text-sm">
                금일 출근한 직원이 없습니다.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
