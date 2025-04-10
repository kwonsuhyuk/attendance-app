import { Card } from "@/components/ui/card";

interface Props {
  day: number;
  isSunday: boolean;
}

const PeriodAttCalendarDayCard = ({ day, isSunday }: Props) => {
  return (
    <Card className="flex h-[120px] flex-col justify-between rounded-none border-[0.5px] border-solid border-white-border-sub p-3 text-sm dark:border-dark-border-sub">
      <div className="mb-1 flex items-center justify-between text-[15px] font-medium">
        <span className={isSunday ? "text-red-500" : "text-muted-foreground"}>
          {day < 10 ? `0${day}` : day}
        </span>
        <span className="text-muted-foreground">총원 12</span>
      </div>

      <div className="grid grid-cols-2 gap-1">
        {[
          { label: "출근", color: "bg-cyan-300", value: 3 },
          { label: "휴가", color: "bg-green-400", value: 0 },
          { label: "외근", color: "bg-lime-300", value: 0 },
          { label: "미출근", color: "bg-yellow-400", value: 1 },
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
    </Card>
  );
};

export default PeriodAttCalendarDayCard;
