import { Card, CardTitle } from "@/components/ui/card";
import { useNavigate, useParams } from "react-router-dom";
import { CalendarCheck, CircleDot, CircleDashed, ChevronRight } from "lucide-react";
import React from "react";
import { addDays, startOfWeek, endOfWeek, format, isSameDay } from "date-fns";
import { ko } from "date-fns/locale";

const CommuteHistoryBox = () => {
  const navigate = useNavigate();
  const { companyCode } = useParams();

  const today = new Date();
  const start = startOfWeek(today, { weekStartsOn: 1 }); // 월요일
  const end = endOfWeek(today, { weekStartsOn: 1 }); // 일요일
  const weekDates = Array.from({ length: 7 }, (_, i) => addDays(start, i));

  // 예시 데이터 (출근: true, 연차: false, undefined는 없음)
  const commuteData: Record<string, boolean | undefined> = {
    [format(addDays(start, 0), "yyyy-MM-dd")]: true,
    [format(addDays(start, 1), "yyyy-MM-dd")]: true,
    [format(addDays(start, 2), "yyyy-MM-dd")]: false,
    [format(addDays(start, 3), "yyyy-MM-dd")]: true,
    [format(addDays(start, 4), "yyyy-MM-dd")]: true,
  };

  const renderStatusIcon = (date: Date) => {
    const key = format(date, "yyyy-MM-dd");
    const status = commuteData[key];

    if (status === true) return <CircleDot className="h-4 w-4 text-green-500" />;
    if (status === false) return <CircleDashed className="h-4 w-4 text-yellow-500" />;
    return <CircleDot className="h-4 w-4 text-gray-400" />;
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
      <div className="mt-10 flex flex-wrap gap-4 text-xs text-muted-foreground">
        <div className="flex items-center gap-1">
          <CircleDot className="h-3 w-3 text-green-500" />
          출근
        </div>
        <div className="flex items-center gap-1">
          <CircleDashed className="h-3 w-3 text-yellow-500" />
          휴가
        </div>
        <div className="flex items-center gap-1">
          <CircleDot className="h-3 w-3 text-gray-400" />
          기록 없음
        </div>
      </div>
    </Card>
  );
};

export default CommuteHistoryBox;
