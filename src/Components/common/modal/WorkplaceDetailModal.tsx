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
      icon={<MapPin className="h-5 w-5 text-vacation-dark-color" />}
      maxWidthClass="max-w-2xl"
    >
      {/* 주소 & 메모 */}
      <div className="space-y-3 text-sm text-zinc-700 dark:text-zinc-200">
        <div className="font-semibold">
          <strong className="text-zinc-600 dark:text-zinc-300"></strong>{" "}
          {place.address || "주소 정보 없음"}
        </div>
        {place.memo && (
          <div className="border-point-color-sub bg-point-color-sub/10 dark:border-point-color-sub rounded-md border border-dashed px-4 py-3 text-sm text-vacation-dark-color dark:text-point-color">
            {place.memo}
          </div>
        )}
      </div>

      {/* 직원 목록 */}
      <div className="mt-6">
        <h4 className="mb-2 flex justify-between text-sm font-semibold text-vacation-dark-color">
          출근 직원{" "}
          <span className="text-sm font-medium text-vacation-dark-color dark:text-gray-300">
            {place.employees.length > 0 ? `${place.employees.length}명` : ""}
          </span>
        </h4>
        {place.employees.length > 0 ? (
          <ul className="max-h-80 space-y-2 overflow-y-auto pr-1">
            {place.employees.map(emp => (
              <li
                key={emp.userId}
                className="flex items-start gap-3 rounded-md bg-white px-3 py-2 shadow-sm dark:bg-[#1f2b26]"
              >
                <div className="bg-point-color-sub dark:bg-point-color-sub/40 flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold text-vacation-dark-color dark:text-white">
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
                  <p className="text-xs text-vacation-color">
                    출근:{" "}
                    {emp.startTime && isValid(new Date(emp.startTime))
                      ? getKSTDateInfo(emp.startTime)
                      : "-"}
                  </p>
                  <p className="text-xs text-vacation-dark-color">
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
