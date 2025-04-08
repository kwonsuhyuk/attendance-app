import { useState } from "react";
import { Card } from "@/components/ui/card";
import Seo from "@/components/Seo";
import dayjs from "dayjs";
import CustomCalendarHeader from "@/components/company/attendance/CustomCalendarHeader";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const DAYS = ["일", "월", "화", "수", "목", "금", "토"];

const PeriodAttendancePage = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [workplaceFilter, setWorkplaceFilter] = useState("전체");
  const [workTypeFilter, setWorkTypeFilter] = useState("전체");

  const generateCalendar = (date: Date) => {
    const startOfMonth = dayjs(date).startOf("month").day();
    const daysInMonth = dayjs(date).daysInMonth();
    const totalCells = Math.ceil((startOfMonth + daysInMonth) / 7) * 7;

    return Array.from({ length: totalCells }, (_, i) => {
      const day = i - startOfMonth + 1;
      return day > 0 && day <= daysInMonth ? day : null;
    });
  };

  const calendar = generateCalendar(currentDate);

  return (
    <>
      <Seo
        title="기간 출퇴근 | On & Off"
        description="On & Off에서 근태관리 서비스를 이용해보세요."
      />
      <div className="w-full max-w-none p-2">
        <div className="mb-4 flex gap-3">
          <CustomCalendarHeader onChangeMonth={setCurrentDate} />
          {/* 필터: 근무지 + 근로유형 */}
          <div className="flex flex-wrap gap-3">
            {/* 근무지 필터 */}
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-muted-foreground">근무지</span>
              <Select value={workplaceFilter} onValueChange={setWorkplaceFilter}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="근무지 선택" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="전체">전체</SelectItem>
                  <SelectItem value="본사">본사</SelectItem>
                  <SelectItem value="지점A">지점 A</SelectItem>
                  <SelectItem value="지점B">지점 B</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* 근로유형 필터 */}
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-muted-foreground">근무 형태</span>
              <Select value={workTypeFilter} onValueChange={setWorkTypeFilter}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="근로유형 선택" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="전체">전체</SelectItem>
                  <SelectItem value="정규직">정규직</SelectItem>
                  <SelectItem value="계약직">계약직</SelectItem>
                  <SelectItem value="아르바이트">아르바이트</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-2 border-b border-t border-solid border-white-border-sub pb-3 pt-3 text-center text-base font-medium text-muted-foreground dark:border-dark-border-sub">
          {DAYS.map(day => (
            <div key={day}>{day}</div>
          ))}
        </div>

        <div className="grid grid-cols-7">
          {calendar.map((day, idx) => {
            const isSunday = idx % 7 === 0;

            return (
              <Card
                key={idx}
                className="flex h-[120px] flex-col justify-between rounded-none border-[0.5px] border-solid border-white-border-sub p-2 text-xs dark:border-dark-border-sub"
              >
                {day ? (
                  <>
                    {/* 날짜 + 총원 */}
                    <div className="mb-1 flex items-center justify-between text-[13px] font-medium">
                      <span className={isSunday ? "text-red-500" : "text-muted-foreground"}>
                        {day < 10 ? `0${day}` : day}
                      </span>
                      <span className="text-muted-foreground">총원 12</span>
                    </div>

                    {/* 통계 박스 2행 2열 */}
                    <div className="grid grid-cols-2 gap-1">
                      <div className="flex items-center gap-1 rounded border border-solid border-white-border-sub px-2 py-1 text-[13px] dark:border-dark-border-sub">
                        <span className="h-3 w-1.5 rounded-full bg-cyan-300" />
                        <span>출근</span>
                        <span className="ml-auto font-semibold">3</span>
                      </div>
                      <div className="flex items-center gap-1 rounded border border-solid border-white-border-sub px-2 py-1 text-[13px] dark:border-dark-border-sub">
                        <span className="h-3 w-1.5 rounded-full bg-green-400" />
                        <span>휴가</span>
                        <span className="ml-auto font-semibold">0</span>
                      </div>
                      <div className="flex items-center gap-1 rounded border border-solid border-white-border-sub px-2 py-1 text-[13px] dark:border-dark-border-sub">
                        <span className="h-3 w-1.5 rounded-full bg-lime-300" />
                        <span>휴직</span>
                        <span className="ml-auto font-semibold">0</span>
                      </div>
                      <div className="flex items-center gap-1 rounded border border-solid border-white-border-sub px-2 py-1 text-[13px] dark:border-dark-border-sub">
                        <span className="h-3 w-1.5 rounded-full bg-yellow-400" />
                        <span>결근</span>
                        <span className="ml-auto font-semibold">1</span>
                      </div>
                    </div>
                  </>
                ) : null}
              </Card>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default PeriodAttendancePage;
