import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { TCommuteData } from "@/model/types/commute.type";
import { TRegisteredVacation } from "@/model/types/vacation.type";
import { useCompanyStore } from "@/store/company.store";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import { Briefcase, CalendarDays, MapPin, PlaneTakeoff } from "lucide-react";

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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xs">
        <DialogHeader>
          {selectedDate && (
            <DialogTitle className="flex items-center justify-between text-xl">
              <span className="flex items-center gap-2 dark:text-white-text">
                <CalendarDays className="h-5 w-5" />
                {selectedDate}
              </span>
              {vacation && <span className="text-base font-semibold text-blue-500">휴가</span>}
              {isOutworking && (
                <span className="text-base font-semibold text-yellow-500">외근</span>
              )}
            </DialogTitle>
          )}
        </DialogHeader>

        {selectedDate && (
          <div className="flex flex-col gap-2 rounded-md border border-gray-200 p-3 text-base dark:border-zinc-600">
            {/* 외근 */}
            {isOutworking && (
              <p className="flex items-center gap-1 text-sm">
                <Briefcase className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                <strong className="text-yellow-600 dark:text-yellow-400">외근 :</strong>
                <span>{commute?.outworkingMemo || "내용 없음"}</span>
              </p>
            )}

            {/* 휴가 */}
            {vacation && (
              <p className="mb-3 flex items-center gap-2 text-sm">
                <PlaneTakeoff className="h-4 w-4 text-blue-700 dark:text-blue-300" />
                <strong className="text-blue-700 dark:text-blue-300">휴가 :</strong>
                <span>
                  {vacation.startDate} ~ {vacation.endDate}
                </span>
              </p>
            )}

            {/* 출퇴근/근무지: 출근 기록이 있고 외근이 아닐 때만 표시 */}
            {commute?.startTime && !isOutworking && (
              <>
                <p className="ml-1.5 flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-500" />
                  출근 : {dayjs(commute.startTime).format("HH:mm:ss")}
                </p>
                <p className="ml-1.5 flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-gray-500" />
                  퇴근 : {commute.endTime ? dayjs(commute.endTime).format("HH:mm:ss") : "-"}
                </p>
                <div className="flex items-center gap-1 py-2 text-sm">
                  <MapPin className="h-4 w-4" />
                  <p>근무지 : {getWorkplaceNameById(commute?.startWorkplaceId) || "-"}</p>
                </div>
              </>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CommuteDetailModal;
