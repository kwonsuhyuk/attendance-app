import { Card } from "@/components/ui/card";

interface Props {
  day: number;
  isSunday: boolean;
  variant?: "total" | "employee"; // default는 total
}

const PeriodAttCalendarDayCard = ({ day, isSunday, variant = "total" }: Props) => {
  return (
    <Card className="flex h-[120px] flex-col justify-between rounded-none border-[0.5px] border-solid border-white-border-sub p-2 text-sm dark:border-dark-border-sub">
      {/* 상단 날짜 */}
      <div className="mb-1 flex items-center justify-between text-[15px] font-medium">
        <span
          className={
            isSunday
              ? "flex h-5 w-5 items-center justify-center rounded-full bg-red-100 text-[15px] text-red-500"
              : "text-muted-foreground"
          }
        >
          {day < 10 ? `0${day}` : day}
        </span>
        {variant === "total" && <span className="text-muted-foreground">총원 12</span>}
      </div>

      {/* total: 상태별 정보, employee: 내용 없음 */}
      {variant === "total" ? (
        <div className="grid grid-cols-2 gap-1">
          {[
            { label: "출근", color: "bg-cyan-300", value: 3 },
            { label: "휴가", color: "bg-green-400", value: 0 },
            { label: "외근", color: "bg-lime-300", value: 0 },
          ].map(item => (
            <div
              key={item.label}
              className="flex items-center gap-1 rounded border-2 border-solid border-white-border-sub px-2 py-1 text-[13px] dark:border-dark-border-sub"
            >
              <span className={`h-3 w-1.5 rounded-full ${item.color}`} />
              <span>{item.label}</span>
              <span className="ml-auto font-semibold">{item.value}</span>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col text-base text-muted-foreground">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-blue-400" />
            <span>근무지A 출근 09:00</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-orange-400" />
            <span>근무지B 퇴근 21:00</span>
          </div>
          {/* <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-yellow-400" />
            <span>휴가 (오전)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-green-400" />
            <span>외근 - 고객 미팅</span>
          </div> */}
        </div>
      )}
    </Card>
  );
};

export default PeriodAttCalendarDayCard;
