import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { format } from "date-fns";

interface IWorkType {
  type: "출근" | "휴가" | "외근";
  start?: string;
  end?: string;
  location?: string;
}

const dummyWorkData: Record<string, IWorkType> = {
  "2025-04-04": { type: "출근", start: "09:01", end: "18:03", location: "서울 강남구" },
  "2025-04-05": { type: "외근" },
  "2025-04-06": { type: "휴가" },
};

const getStatusDot = (type: string | undefined) => {
  if (type === "출근") return <div className="mx-auto mt-1 h-2 w-2 rounded-full bg-green-500" />;
  if (type === "외근") return <div className="mx-auto mt-1 h-2 w-2 rounded-full bg-blue-500" />;
  if (type === "휴가") return <div className="mx-auto mt-1 h-2 w-2 rounded-full bg-yellow-400" />;
  return null;
};

const MyCalendar = () => {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [open, setOpen] = useState(false);

  const handleDateSelect = (date: Date | undefined) => {
    if (!date) return;
    setSelectedDate(date);
    setOpen(true);
  };

  const formattedDate = selectedDate ? format(selectedDate, "yyyy-MM-dd") : "";
  const selectedData = dummyWorkData[formattedDate];

  return (
    <div className="flex w-full flex-col items-center">
      <div className="scale-110">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={handleDateSelect}
          modifiersClassNames={{}}
          classNames={{
            day: "w-8 font-normal text-sm text-black rounded-md",
            day_today: "bg-dark-bg text-white",
            day_selected: "bg-muted text-black",
          }}
          modifiers={{
            출근: date => dummyWorkData[format(date, "yyyy-MM-dd")]?.type === "출근",
            휴가: date => dummyWorkData[format(date, "yyyy-MM-dd")]?.type === "휴가",
            외근: date => dummyWorkData[format(date, "yyyy-MM-dd")]?.type === "외근",
          }}
          components={{
            DayContent: ({ date }) => {
              const key = format(date, "yyyy-MM-dd");
              const type = dummyWorkData[key]?.type;
              return (
                <div className="p-1 text-sm">
                  {format(date, "d")}
                  {getStatusDot(type)}
                </div>
              );
            },
          }}
        />
      </div>

      {/* 상세 정보 모달 */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{formattedDate} 상세기록</DialogTitle>
          </DialogHeader>
          {selectedData ? (
            <div className="space-y-2 text-sm">
              <p>유형: {selectedData.type}</p>
              {selectedData.start && <p>출근 시간: {selectedData.start}</p>}
              {selectedData.end && <p>퇴근 시간: {selectedData.end}</p>}
              {selectedData.location && <p>근무지: {selectedData.location}</p>}
            </div>
          ) : (
            <p>근무기록이 없습니다.</p>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MyCalendar;
