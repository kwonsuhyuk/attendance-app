import { Card } from "@/components/ui/card";
import { useNavigate, useParams } from "react-router-dom";

interface Props {
  day: number;
  isSunday: boolean;
  isSaturday: boolean;
  variant?: "total" | "employee";
}

const PeriodAttCalendarDayCard = ({ day, isSunday, isSaturday, variant = "total" }: Props) => {
  const navigate = useNavigate();
  const { companyCode } = useParams();

  return (
    <Card
      onClick={() => {
        if (variant === "total" && companyCode) {
          navigate(`/${companyCode}/todayatt`);
        }
      }}
      className="hover:bg-white-hover flex h-[120px] cursor-pointer flex-col justify-between rounded-none border-[0.5px] border-solid border-white-border-sub p-2 text-sm dark:border-dark-border-sub dark:hover:bg-white-border sm:h-[140px] md:h-[160px] lg:h-[120px]"
    >
      {/* 상단 날짜 */}
      <div className="mb-1 flex items-center justify-between text-[15px] font-medium">
        <span
          className={
            isSunday
              ? "flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-[15px] text-dark-text dark:bg-red-500"
              : isSaturday
                ? "flex h-6 w-6 items-center justify-center rounded-full bg-yellow-400 text-[15px] text-dark-text dark:bg-yellow-500"
                : "text-muted-foreground"
          }
        >
          {day < 10 ? `0${day}` : day}
        </span>

        {variant === "total" && (
          <span className="whitespace-nowrap text-muted-foreground">총원 12</span>
        )}
      </div>

      {variant === "total" ? (
        <div className="grid grid-cols-1 gap-1 lg:grid-cols-2">
          {[
            { label: "출근", color: "bg-green-300 dark:bg-green-500", value: 3 },
            { label: "외근", color: "bg-orange-300 dark:bg-orange-500", value: 0 },
            { label: "휴가", color: "bg-cyan-300 dark:bg-cyan-500", value: 0 },
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
        <div className="flex flex-col items-center py-5 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-green-300 dark:bg-green-500" />
            <span>근무지A 출근 09:00</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-gray-400 dark:bg-gray-300" />
            <span>근무지B 퇴근 21:00</span>
          </div>
        </div>
      )}
    </Card>
  );
};

export default PeriodAttCalendarDayCard;
