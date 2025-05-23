import { Card } from "@/components/ui/card";
import { useNavigate, useParams } from "react-router-dom";
import { format } from "date-fns";

interface Props {
  day: number;
  fullDate: Date;
  isSunday: boolean;
  isCompanyHoliday?: boolean;
  variant?: "total" | "employee";
  summary?: {
    출근: number;
    외근: number;
    휴가: number;
    총원: number;
  };
  checkIn?: {
    time: string;
    workplace: string;
  };
  checkOut?: {
    time: string;
    workplace: string;
  };
}

const PeriodAttCalendarDayCard = ({
  day,
  fullDate,
  isSunday,
  isCompanyHoliday,
  variant = "total",
  summary,
  checkIn,
  checkOut,
}: Props) => {
  const navigate = useNavigate();
  const { companyCode } = useParams();

  return (
    <Card
      onClick={() => {
        if (variant === "total" && companyCode) {
          const formattedDate = format(fullDate, "yyyy-MM-dd");
          navigate(`/${companyCode}/manager/todayatt?date=${formattedDate}`);
        }
      }}
      className="flex h-[120px] cursor-pointer flex-col justify-between rounded-none border-[0.5px] border-solid border-white-border-sub p-2 text-sm hover:bg-white-hover dark:border-dark-border-sub dark:hover:bg-white-border sm:h-[140px] md:h-[160px] lg:h-[120px]"
    >
      {/* 상단 날짜 */}
      <div className="mb-1 flex items-center justify-between text-[15px] font-medium">
        <span
          className={
            isSunday
              ? "flex h-6 w-6 items-center justify-center rounded-full bg-red-500 pt-0.5 text-[15px] text-dark-text dark:bg-red-500"
              : isCompanyHoliday
                ? "flex h-6 w-6 items-center justify-center rounded-full bg-yellow-400 pt-0.5 text-[15px] text-dark-text dark:bg-yellow-500"
                : "text-muted-foreground"
          }
        >
          {day < 10 ? `0${day}` : day}
        </span>
        {variant === "total" && (
          <span className="whitespace-nowrap text-muted-foreground">총원 {summary?.총원 ?? 0}</span>
        )}
      </div>

      {/* 총괄 요약 (관리자 탭) */}
      {variant === "total" ? (
        <div className="grid grid-cols-1 gap-1 lg:grid-cols-2">
          {[
            { label: "출근", color: "bg-green-300 dark:bg-green-500", value: summary?.출근 ?? 0 },
            { label: "외근", color: "bg-orange-300 dark:bg-orange-500", value: summary?.외근 ?? 0 },
            { label: "휴가", color: "bg-cyan-300 dark:bg-cyan-500", value: summary?.휴가 ?? 0 },
          ].map(item => (
            <div
              key={item.label}
              className="flex items-center gap-1 overflow-hidden text-ellipsis whitespace-nowrap rounded border-2 border-solid border-white-border-sub px-2 py-1 text-[13px] dark:border-dark-border-sub"
            >
              <span className={`h-1.5 w-1.5 rounded-full ${item.color}`} />
              <span className="truncate">{item.label}</span>
              <span className="ml-auto font-semibold">{item.value}</span>
            </div>
          ))}
        </div>
      ) : (
        // 직원 탭: 출근/퇴근/휴가 표시
        <div className="flex flex-col items-center py-5 text-sm text-muted-foreground">
          {summary?.휴가 && !checkIn && !checkOut ? (
            // 휴가만 있는 경우에만 표시
            <div className="flex items-center gap-2 text-sm font-semibold text-blue-500">
              <span>휴가</span>
            </div>
          ) : (
            <>
              {checkIn && (
                <div className="flex items-center gap-2">
                  <span
                    className={`h-2 w-2 rounded-full ${
                      checkIn.workplace === "외근"
                        ? "bg-[#f3c78c]"
                        : "bg-green-300 dark:bg-green-500"
                    }`}
                  />
                  <span>{`${checkIn.workplace} 출근 ${checkIn.time}`}</span>
                </div>
              )}
              {checkOut && (
                <div className="flex items-center gap-2">
                  <span
                    className={`h-2 w-2 rounded-full ${
                      checkOut.workplace === "외근"
                        ? "bg-[#f3c78c]"
                        : "bg-gray-400 dark:bg-gray-300"
                    }`}
                  />
                  <span>{`${checkOut.workplace} 퇴근 ${checkOut.time}`}</span>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </Card>
  );
};

export default PeriodAttCalendarDayCard;
