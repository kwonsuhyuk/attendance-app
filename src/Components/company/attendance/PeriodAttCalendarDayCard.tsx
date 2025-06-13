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
              ? "font-bold text-red-500"
              : isCompanyHoliday
                ? "font-bold text-yellow-400"
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
              <span className={`h-2 w-2 rounded-full ${item.color}`} />
              <span className="truncate">{item.label}</span>
              <span className="ml-auto font-semibold">{item.value}</span>
            </div>
          ))}
        </div>
      ) : (
        // 직원 탭: 출근/퇴근/휴가 표시
        <div className="flex h-full w-full flex-col items-center justify-start gap-2 px-1 py-3 text-sm text-muted-foreground">
          {summary?.휴가 && !checkIn && !checkOut ? (
            <div className="w-full rounded-lg border border-blue-300 bg-blue-50 px-3 py-1 text-center text-blue-500 shadow-md dark:border-blue-500 dark:bg-blue-900/10">
              휴가
            </div>
          ) : (
            <>
              {checkIn && (
                <div className="flex w-full items-center gap-3 rounded-lg bg-white px-3 py-1 shadow-sm dark:bg-[#1f1f1f]">
                  <div
                    className={`h-4 w-1.5 rounded-full ${
                      checkIn.workplace === "외근"
                        ? "bg-[#f3c78c]"
                        : "bg-green-300 dark:bg-green-500"
                    }`}
                  />
                  <span className="text-xs font-medium text-muted-foreground">
                    {`${checkIn.time} · ${checkIn.workplace} 출근`}
                  </span>
                </div>
              )}
              {checkOut && (
                <div className="flex w-full items-center gap-3 rounded-lg bg-white px-3 py-1 shadow-sm dark:bg-[#1f1f1f]">
                  <div
                    className={`h-4 w-1.5 rounded-full ${
                      checkOut.workplace === "외근"
                        ? "bg-[#f3c78c]"
                        : "bg-gray-400 dark:bg-gray-300"
                    }`}
                  />
                  <span className="text-xs font-medium text-muted-foreground">
                    {`${checkOut.time} · ${checkOut.workplace} 퇴근`}
                  </span>
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
