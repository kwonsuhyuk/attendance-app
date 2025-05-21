import { Card } from "@/components/ui/card";
import dayjs from "dayjs";
import { useNavigate, useParams } from "react-router-dom";

interface Props {
  date: string; // ISO: "2025-04-12"
  checkIn?: {
    time: string;
    workplace?: string;
  };
  checkOut?: {
    time: string;
    workplace?: string;
  };
  summary?: {
    출근: number;
    외근: number;
    휴가: number;
    총원: number;
  };
  variant?: "total" | "employee";
  isHoliday?: boolean;
  isCompanyHoliday?: boolean;
}

const PeriodAttCalendarList = ({
  date,
  checkIn,
  checkOut,
  summary,
  variant = "total",
  isHoliday = false,
  isCompanyHoliday = false,
}: Props) => {
  const navigate = useNavigate();
  const { companyCode } = useParams();

  const dayObj = dayjs(date);
  const dayText = dayObj.format("dd"); // 요일만 추출
  const dateText = dayObj.format("M월 D일"); // 날짜만 추출

  const isSunday = dayObj.day() === 0;
  const isSaturday = dayObj.day() === 6;

  return (
    <Card
      onClick={() => {
        if (variant === "total" && companyCode) {
          navigate(`/${companyCode}/manager/todayatt`);
        }
      }}
      className="cursor-pointer rounded-none border border-solid border-white-border-sub p-4 text-sm hover:bg-white-hover dark:border-dark-border-sub dark:hover:bg-white-border"
    >
      {/* 날짜 + 총원 */}
      <div className="mb-2 flex justify-between text-base font-semibold">
        <span className="text-[15px] text-muted-foreground">
          {dateText} (
          <span
            className={
              isCompanyHoliday
                ? "text-yellow-500"
                : isSunday
                  ? "text-red-500"
                  : "text-muted-foreground"
            }
          >
            {dayText}
          </span>
          )
        </span>
        {variant === "total" && (
          <span className="whitespace-nowrap text-sm text-muted-foreground">
            총원 {summary?.총원 ?? 0}
          </span>
        )}
      </div>

      {variant === "total" ? (
        <div className="grid grid-cols-3 gap-1 py-2">
          {[
            { label: "출근", color: "bg-green-300 dark:bg-green-500", value: summary?.출근 ?? 0 },
            { label: "외근", color: "bg-orange-300 dark:bg-orange-500", value: summary?.외근 ?? 0 },
            { label: "휴가", color: "bg-cyan-300 dark:bg-cyan-500", value: summary?.휴가 ?? 0 },
          ].map(item => (
            <div
              key={item.label}
              className="flex items-center gap-1 overflow-hidden text-ellipsis whitespace-nowrap rounded border-2 border-solid border-white-border-sub px-2 py-1 text-[13px] dark:border-dark-border-sub"
            >
              <span className={`h-3 w-1.5 rounded-full ${item.color}`} />
              <span className="truncate">{item.label}</span>
              <span className="ml-auto font-semibold">{item.value}</span>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-start gap-2 py-2 text-sm text-muted-foreground">
          {checkIn ? (
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-green-300 dark:bg-green-500" />
              <span
                className={`${checkIn.workplace === "외근" ? "font-semibold text-[#f3c78c]" : ""}`}
              >
                {`${checkIn.workplace ?? "근무지"} 출근 ${checkIn.time}`}
              </span>
            </div>
          ) : summary?.휴가 ? (
            <div className="font-semibold text-blue-500">휴가</div>
          ) : (
            <div className="text-xs text-gray-400">출근 기록 없음</div>
          )}

          {checkOut ? (
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-gray-400 dark:bg-gray-300" />
              <span
                className={`${checkOut.workplace === "외근" ? "font-semibold text-[#f3c78c]" : ""}`}
              >
                {`${checkOut.workplace ?? "근무지"} 퇴근 ${checkOut.time}`}
              </span>
            </div>
          ) : summary?.휴가 ? null : (
            <div className="text-xs text-gray-400">퇴근 기록 없음</div>
          )}
        </div>
      )}
    </Card>
  );
};

export default PeriodAttCalendarList;
