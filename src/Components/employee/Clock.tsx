import { useCurrentTime } from "@/hooks/useCurrentTime";
import { format } from "date-fns";
import { ko } from "date-fns/locale";

const Clock = () => {
  const rawTime = useCurrentTime(true);

  const currentDate = format(new Date(rawTime), "yyyy년 MM월 dd일", { locale: ko });
  const currentHour = format(new Date(rawTime), "a hh:mm:ss", { locale: ko });

  return (
    <div>
      <p className="text-sm text-muted-foreground">{currentDate}</p>
      <p className="mt-1 text-2xl font-bold">{currentHour}</p>
    </div>
  );
};

export default Clock;
