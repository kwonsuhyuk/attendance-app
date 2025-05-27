import { MapPin, User } from "lucide-react";
import { isValid } from "date-fns";
import DetailModal from "./commonModalLayout/DetailModal";
import { TPlaceData } from "@/hooks/manager/useFilterWork";
import { getKSTDateInfo } from "@/util/time.util";

interface WorkplaceDetailModalProps {
  open: boolean;
  onClose: () => void;
  place: TPlaceData;
}

const WorkplaceDetailModal = ({ open, onClose, place }: WorkplaceDetailModalProps) => {
  return (
    <DetailModal
      open={open}
      onClose={onClose}
      title={place.name}
      icon={<MapPin className="h-5 w-5 text-blue-500" />}
      maxWidthClass="max-w-2xl"
    >
      {/* 주소 & 메모 */}
      <div className="space-y-3 text-sm text-zinc-700 dark:text-zinc-200">
        <div className="font-semibold">
          <strong className="text-zinc-600 dark:text-zinc-300">주소:</strong>{" "}
          {place.address || "주소 정보 없음"}
        </div>
        {place.memo && (
          <div className="rounded-md border border-dashed border-zinc-300 bg-zinc-50 px-4 py-3 dark:border-zinc-600 dark:bg-zinc-800">
            {place.memo}
          </div>
        )}
      </div>

      {/* 직원 목록 */}
      <div className="mt-4">
        <h4 className="mb-2 text-sm font-semibold text-zinc-800 dark:text-white">
          출근 직원 {place.employees.length > 0 ? `(${place.employees.length})` : ""}
        </h4>
        {place.employees.length > 0 ? (
          <ul className="max-h-80 space-y-2 overflow-y-auto pr-1">
            {place.employees.map(emp => (
              <li
                key={emp.userId}
                className="flex items-center justify-between rounded-md bg-white px-3 py-2 shadow-sm dark:bg-zinc-700"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-200 text-zinc-800 dark:bg-zinc-600 dark:text-white">
                    <User className="h-4 w-4" />
                  </div>
                  <div className="text-sm">
                    <div className="font-medium text-zinc-800 dark:text-white">{emp.name}</div>
                    <div className="text-xs text-zinc-500 dark:text-zinc-400">
                      {emp.jobName} · {emp.employmentType}
                    </div>
                  </div>
                </div>
                <div className="flex-start flex flex-col gap-1 text-xs">
                  <p className="text-green-600 dark:text-green-400">
                    출근:{" "}
                    {emp.startTime && isValid(new Date(emp.startTime))
                      ? getKSTDateInfo(emp.startTime)
                      : "-"}
                  </p>
                  <p className="text-rose-500 dark:text-rose-400">
                    퇴근:{" "}
                    {emp.endTime && isValid(new Date(emp.endTime))
                      ? getKSTDateInfo(emp.endTime)
                      : "-"}
                  </p>
                </div>
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
