import { Copy, MapPin, User } from "lucide-react";
import { isValid } from "date-fns";
import DetailModal from "./commonModalLayout/DetailModal";
import { TPlaceData } from "@/hooks/manager/useFilterWork";
import { getKSTDateInfo } from "@/util/time.util";
import { toast } from "@/hooks/use-toast";
import dayjs from "dayjs";

interface WorkplaceDetailModalProps {
  open: boolean;
  onClose: () => void;
  place: TPlaceData;
  selectedDate: Date;
}

const WorkplaceDetailModal = ({
  open,
  onClose,
  place,
  selectedDate,
}: WorkplaceDetailModalProps) => {
  const formatTimeByDate = (time?: string) => {
    if (!time || !isValid(new Date(time))) return "-";
    const isSameDay = dayjs(time).isSame(dayjs(selectedDate), "day");
    return dayjs(time).format(isSameDay ? "HH:mm" : "MM/DD HH:mm");
  };
  return (
    <DetailModal
      open={open}
      onClose={onClose}
      title={place.name}
      icon={<MapPin className="h-5 w-5" />}
      maxWidthClass="max-w-2xl"
    >
      {/* 주소 & 메모 */}
      <div className="space-y-3 text-sm text-zinc-700 dark:text-zinc-200">
        <div className="text-xs text-gray-700 dark:text-gray-500">{place?.address}</div>

        {place.memo && (
          <div className="rounded-md border border-dashed border-point-color-sub bg-point-color-sub/10 px-4 py-3 text-sm text-vacation-dark-color dark:border-point-color-sub dark:text-point-color">
            {place.memo}
          </div>
        )}
      </div>

      {/* 직원 목록 */}
      <div className="mt-6">
        <h4 className="mb-2 flex justify-between text-sm font-semibold text-white-text">
          출근·퇴근 직원{" "}
          <span className="text-sm font-medium text-white-text dark:text-gray-300">
            {place.employees.length > 0 ? `${place.employees.length}명` : ""}
          </span>
        </h4>
        {place.employees.length > 0 ? (
          <ul className="max-h-80 space-y-2 overflow-y-auto pr-1">
            {place.employees
              .slice()
              .sort((a, b) => {
                const aTime =
                  a.startTime && isValid(new Date(a.startTime))
                    ? new Date(a.startTime).getTime()
                    : Infinity;
                const bTime =
                  b.startTime && isValid(new Date(b.startTime))
                    ? new Date(b.startTime).getTime()
                    : Infinity;
                return aTime - bTime;
              })
              .map(emp => (
                <li
                  key={emp.userId}
                  className="flex items-start gap-3 rounded-md bg-white px-3 py-2 shadow-sm dark:bg-[#1f2b26]"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-point-color-sub text-sm font-bold text-vacation-dark-color dark:bg-point-color-sub/40 dark:text-white">
                    <User className="h-4 w-4" />
                  </div>
                  <div className="flex flex-1 flex-col gap-0.5 overflow-hidden text-sm">
                    <p className="truncate font-semibold text-black dark:text-white">{emp.name}</p>
                    <p className="truncate text-xs text-gray-500 dark:text-gray-400">
                      {emp.jobName} · {emp.employmentType}
                    </p>
                    {emp.phoneNumber && (
                      <p className="text-xs text-gray-500 dark:text-gray-400">{emp.phoneNumber}</p>
                    )}
                    <div className="flex flex-wrap gap-1">
                      {emp.startTime && emp.startTime !== "-" && (
                        <p className="w-fit rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-700 dark:bg-emerald-900 dark:text-emerald-200">
                          출근 {formatTimeByDate(emp.startTime)}
                        </p>
                      )}
                      {emp.endTime && emp.endTime !== "-" && (
                        <p className="w-fit rounded-full bg-rose-100 px-2 py-0.5 text-xs font-medium text-rose-700 dark:bg-rose-900 dark:text-rose-200">
                          퇴근 {formatTimeByDate(emp.endTime)}
                        </p>
                      )}
                    </div>
                  </div>
                  {emp.phoneNumber && (
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(emp.phoneNumber);
                        toast({ title: "전화번호가 복사되었습니다." });
                      }}
                      className="ml-auto text-gray-400 hover:text-gray-600 dark:text-zinc-300 dark:hover:text-white"
                    >
                      <Copy className="h-4 w-4" />
                    </button>
                  )}
                </li>
              ))}
          </ul>
        ) : (
          <div className="flex h-24 items-center justify-center text-sm text-zinc-400 dark:text-zinc-500">
            금일 출근한 직원이 없습니다.
          </div>
        )}
      </div>
    </DetailModal>
  );
};

export default WorkplaceDetailModal;
