import { Card } from "@/components/ui/card";
import dayjs from "dayjs";

interface Props {
  date: string; // ISO: "2025-04-12"
  checkIn?: {
    time: string; // "09:00"
    workplace?: string; // 예: "근무지A"
  };
  checkOut?: {
    time: string;
    workplace?: string;
  };
}

const PeriodAttCalendarList = ({ date, checkIn, checkOut }: Props) => {
  return (
    <Card className="rounded-none border border-solid border-gray-200 p-4 text-sm">
      {/* 날짜 */}
      <div className="mb-2 text-base font-semibold">{dayjs(date).format("M월 D일 (dd)")}</div>

      {/* 출근/퇴근 */}
      <div className="space-y-1 text-muted-foreground">
        <div>
          * 출근:{" "}
          {checkIn
            ? `${checkIn.workplace ? `${checkIn.workplace} ` : ""}${checkIn.time}`
            : "기록 없음"}
        </div>
        <div>
          * 퇴근:{" "}
          {checkOut
            ? `${checkOut.workplace ? `${checkOut.workplace} ` : ""}${checkOut.time}`
            : "기록 없음"}
        </div>
      </div>
    </Card>
  );
};

export default PeriodAttCalendarList;
