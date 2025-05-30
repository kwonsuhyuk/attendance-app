import { MapPin, CalendarDays, PlaneTakeoff, Briefcase, LogIn, LogOut } from "lucide-react";
import { TCommuteData } from "@/model/types/commute.type";
import { TRegisteredVacation } from "@/model/types/vacation.type";
import { useCompanyStore } from "@/store/company.store";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import DetailModal from "./commonModalLayout/DetailModal";

dayjs.extend(isBetween);

interface CommuteDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedDate: string | null;
  commuteData: Record<string, TCommuteData>;
  vacationList: TRegisteredVacation[];
}

const CommuteDetailModal = ({
  open,
  onOpenChange,
  selectedDate,
  commuteData,
  vacationList = [],
}: CommuteDetailModalProps) => {
  const workPlaceList = useCompanyStore(state => state.currentCompany?.workPlacesList || []);
  const getWorkplaceNameById = (id?: string) =>
    id ? workPlaceList.find(w => w.id === id)?.name : undefined;

  const commute = selectedDate ? commuteData[selectedDate] : null;
  const vacation = vacationList.find(v =>
    dayjs(selectedDate).isBetween(v.startDate, v.endDate, null, "[]"),
  );
  const isOutworking = commute?.startWorkplaceId === "외근";

  return (
    <DetailModal
      open={open}
      onClose={() => onOpenChange(false)}
      title={
        <span className="flex items-center gap-2">
          <CalendarDays className="h-5 w-5" />
          {selectedDate}
        </span>
      }
      icon={null}
      maxWidthClass="max-w-xs"
    >
      {/* 외근 */}
      {isOutworking && (
        <div className="rounded-md border border-yellow-300 bg-yellow-50 p-3 text-sm dark:border-yellow-400 dark:bg-yellow-900/30">
          <p className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <Briefcase className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
              <strong className="text-yellow-600 dark:text-yellow-400">외근</strong>
            </div>
            <span>{commute?.outworkingMemo || "내용 없음"}</span>
          </p>
        </div>
      )}

      {/* 휴가 */}
      {vacation && (
        <div className="rounded-md border border-blue-300 bg-blue-50 p-3 text-sm dark:border-blue-400 dark:bg-blue-900/30">
          <p className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <PlaneTakeoff className="h-4 w-4 text-blue-700 dark:text-blue-300" />
              <strong className="text-blue-700 dark:text-blue-300">휴가</strong>
            </div>
            <span>
              {vacation.startDate} ~ {vacation.endDate}
            </span>
          </p>
        </div>
      )}

      {/* 출근 정보 (외근 아니고 출근 기록이 있을 때) */}
      {commute?.startTime && !isOutworking && (
        <div className="rounded-md border border-gray-300 bg-white px-3 py-4 text-sm dark:border-zinc-500 dark:bg-zinc-800/30">
          <div className="flex flex-col gap-2">
            <p className="flex items-center gap-2">
              <LogIn className="h-4 w-4 text-green-500" />
              출근 : {dayjs(commute.startTime).format("HH:mm:ss")}
            </p>
            <p className="flex items-center gap-2">
              <LogOut className="h-4 w-4 text-gray-500" />
              퇴근 : {commute.endTime ? dayjs(commute.endTime).format("HH:mm:ss") : "-"}
            </p>
          </div>
          <div className="flex items-center gap-2 pt-5">
            <MapPin className="h-4 w-4" />
            <p>근무지 : {getWorkplaceNameById(commute?.startWorkplaceId) || "-"}</p>
          </div>
        </div>
      )}
    </DetailModal>
  );
};

export default CommuteDetailModal;
