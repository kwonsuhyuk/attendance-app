import { useState } from "react";
import { Card } from "@/components/ui/card";
import Seo from "@/components/Seo";
import dayjs from "dayjs";
import CustomCalendarHeader from "@/components/company/attendance/CustomCalendarHeader";

const DAYS = ["일", "월", "화", "수", "목", "금", "토"];

const PeriodAttendancePage = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

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
        <div className="mb-4">
          <CustomCalendarHeader onChangeMonth={setCurrentDate} />
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
                className="flex h-[100px] flex-col items-start justify-start rounded-none border border-solid border-white-border-sub p-3 text-sm dark:border-dark-border-sub"
              >
                {day ? (
                  <>
                    <div
                      className={`mb-1 text-[15px] ${
                        isSunday ? "text-red-500" : "text-muted-foreground"
                      }`}
                    >
                      {day}
                    </div>
                    <div className="flex h-6 w-full items-center rounded bg-gray-200">
                      <div
                        className="flex h-6 w-full items-center rounded border border-primary p-3 text-[12px] dark:text-white-text"
                        style={{ width: "0%" }} // 출근율 적용
                      >
                        0% (0/0)
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
