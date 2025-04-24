import { Card, CardTitle } from "@/components/ui/card";
import { useNavigate, useParams } from "react-router-dom";
import { CalendarCheck, CircleDot, CircleDashed, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import {
  addDays,
  startOfWeek,
  endOfWeek,
  format,
  isSameDay,
  parseISO,
  eachDayOfInterval,
} from "date-fns";
import { ko } from "date-fns/locale";
import { fetchCommutesByPeriod } from "@/api/commute.api";
import { useUserStore } from "@/store/user.store";
import { fetchRegisteredVacationsByMonth } from "@/api/vacation.api";

const CommuteHistoryBox = () => {
  const navigate = useNavigate();
  const { companyCode } = useParams();

  const today = new Date();
  const start = startOfWeek(today, { weekStartsOn: 1 }); // 월요일
  const end = endOfWeek(today, { weekStartsOn: 1 }); // 일요일
  const weekDates = Array.from({ length: 7 }, (_, i) => addDays(start, i));

  type CommuteStatus = "출근" | "외근" | "휴가" | "기록없음";
  const [commuteData, setCommuteData] = useState<Record<string, CommuteStatus>>({});

  useEffect(() => {
    const fetchData = async () => {
      const user = useUserStore.getState().currentUser;
      const userId = user?.uid;
      if (!companyCode || !userId) return;

      const year = format(today, "yyyy");
      const month = format(today, "MM");

      const commuteDataRaw = await fetchCommutesByPeriod(companyCode, userId, year, month);
      const vacationData = await fetchRegisteredVacationsByMonth(companyCode, year, month);

      const myVacations = vacationData?.[userId] || {};

      // 날짜 목록 생성 (예: "2025-04-23")
      const vacationRanges = Object.values(myVacations).flatMap(v => {
        const start = parseISO(v.startDate); // "2025-04-21"
        const end = parseISO(v.endDate); // "2025-04-23"
        return eachDayOfInterval({ start, end }).map(d => format(d, "yyyy-MM-dd"));
      });

      const weekData: Record<string, CommuteStatus> = {};

      weekDates.forEach(date => {
        const fullKey = format(date, "yyyy-MM-dd");
        const dayKey = format(date, "d");
        const commute = commuteDataRaw?.[dayKey];

        if (vacationRanges.includes(fullKey)) {
          weekData[fullKey] = "휴가";
        } else if (commute) {
          if (commute.outworkingMemo || commute.startWorkplaceId === "외근") {
            weekData[fullKey] = "외근";
          } else if (commute.startTime) {
            weekData[fullKey] = "출근";
          } else {
            weekData[fullKey] = "기록없음";
          }
        } else {
          weekData[fullKey] = "기록없음";
        }
      });

      setCommuteData(weekData);
    };

    fetchData();
  }, [companyCode]);

  const renderStatusIcon = (date: Date) => {
    const key = format(date, "yyyy-MM-dd");
    const status = commuteData[key];

    switch (status) {
      case "출근":
        return <CircleDot className="h-4 w-4 text-green-500" />;
      case "휴가":
        return <CircleDot className="h-4 w-4 text-blue-500" />;
      case "외근":
        return <CircleDot className="h-4 w-4 text-yellow-500" />;
      default:
        return <CircleDashed className="h-4 w-4 text-gray-400" />;
    }
  };

  return (
    <Card
      className="group relative cursor-pointer p-4 shadow-md transition hover:bg-muted/50"
      onClick={() => navigate(`/${companyCode}/calendar`)}
    >
      {/* 헤더 */}
      <div className="flex items-center gap-2 text-base font-semibold">
        <CalendarCheck className="h-5 w-5 text-primary" />
        <CardTitle className="text-base">이번 주 출퇴근 현황</CardTitle>
      </div>
      {/* 이동 아이콘 */}
      <ChevronRight className="absolute right-4 top-4 h-5 w-5 text-muted-foreground group-hover:text-foreground" />

      {/* 주간 날짜 범위 표시 */}
      <p className="mt-1 text-xs text-muted-foreground">
        {format(start, "yyyy년 M월 d일", { locale: ko })} ~ {format(end, "M월 d일", { locale: ko })}
      </p>

      {/* 주간 상태 미니 캘린더 */}
      <div className="mt-7 grid grid-cols-7 gap-2 text-center text-xs text-muted-foreground">
        {weekDates.map(date => (
          <div key={date.toDateString()} className="flex flex-col items-center gap-1">
            <span className={isSameDay(date, today) ? "font-bold text-primary" : ""}>
              {format(date, "EE", { locale: ko })}
            </span>
            {renderStatusIcon(date)}
          </div>
        ))}
      </div>

      {/* 범례 설명 */}
      {/* 범례 설명 */}
      <div className="mt-10 flex flex-wrap gap-4 text-xs text-muted-foreground">
        <div className="flex items-center gap-1">
          <CircleDot className="h-3 w-3 text-green-500" />
          출근
        </div>
        <div className="flex items-center gap-1">
          <CircleDot className="h-3 w-3 text-blue-500" />
          휴가
        </div>
        <div className="flex items-center gap-1">
          <CircleDot className="h-3 w-3 text-yellow-500" />
          외근
        </div>
        <div className="flex items-center gap-1">
          <CircleDashed className="h-3 w-3 text-gray-400" />
          기록 없음
        </div>
      </div>
    </Card>
  );
};

export default CommuteHistoryBox;
