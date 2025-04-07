import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Seo from "@/components/Seo";
import { cn } from "@/util/cn.util";

const DAYS = ["일", "월", "화", "수", "목", "금", "토"];

const PeriodAttendancePage = () => {
  const [currentMonth, setCurrentMonth] = useState("2025.04");

  // 테스트용 캘린더 생성 (5주)
  const getCalendarGrid = () => {
    return Array.from({ length: 5 * 7 }, (_, i) => ({
      date: i + 1 > 30 ? null : i + 1, // 4월 30일 기준
      attendanceRate: 0,
      present: 0,
      total: 0,
    }));
  };

  return (
    <>
      <Seo
        title="기간 출퇴근 | On & Off"
        description="On & Off에서 근태관리 서비스를 이용해보세요."
      />
      <div className="w-full space-y-4 p-4">
        {/* 상단 헤더 */}
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <Button variant="ghost" size="icon">
              <ChevronLeft />
            </Button>
            <span className="text-lg font-semibold">{currentMonth}</span>
            <Button variant="ghost" size="icon">
              <ChevronRight />
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Select>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="출퇴근 현황" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="attendance">출퇴근 현황</SelectItem>
                <SelectItem value="vacation">휴가</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="근무" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="work">근무</SelectItem>
                <SelectItem value="remote">재택</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* 캘린더 그리드 */}
        <div className="grid grid-cols-7 gap-2 text-center text-sm font-medium text-muted-foreground">
          {DAYS.map(day => (
            <div key={day}>{day}</div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2">
          {getCalendarGrid().map((day, idx) => (
            <Card
              key={idx}
              className={cn(
                "h-[80px] p-1 text-xs",
                idx % 7 === 0 && "text-red-500", // 일요일 빨간색
              )}
            >
              {day.date ? (
                <>
                  <div className="text-[10px] text-muted-foreground">{day.date}</div>
                  <div className="mt-1 text-[10px]">
                    0% <span className="text-muted-foreground">(0/0)</span>
                  </div>
                </>
              ) : null}
            </Card>
          ))}
        </div>
      </div>
    </>
  );
};

export default PeriodAttendancePage;
