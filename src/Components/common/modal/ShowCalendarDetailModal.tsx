import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { TCommuteData } from "@/model/types/commute.type";
import { useCompanyStore } from "@/store/company.store";
import dayjs from "dayjs";
import { CalendarDays, MapPin } from "lucide-react";

interface CommuteDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedDate: string | null;
  commuteData: Record<string, TCommuteData>;
  vacationDates: string[];
}

const CommuteDetailModal = ({
  open,
  onOpenChange,
  selectedDate,
  commuteData,
  vacationDates,
}: CommuteDetailModalProps) => {
  const workPlaceList = useCompanyStore(state => state.currentCompany?.workPlacesList || []);

  const getWorkplaceNameById = (id?: string) =>
    id ? workPlaceList.find(w => w.id === id)?.name : undefined;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xs">
        <DialogHeader>
          {selectedDate && (
            <DialogTitle className="flex items-center justify-between text-xl">
              <span className="flex items-center gap-2">
                <CalendarDays className="h-5 w-5" />
                {selectedDate}
              </span>
              {vacationDates.includes(selectedDate) && (
                <span className="text-base font-semibold text-blue-500">휴가</span>
              )}
              {commuteData[selectedDate]?.outworkingMemo && (
                <span className="text-base font-semibold text-yellow-500">외근</span>
              )}
            </DialogTitle>
          )}
        </DialogHeader>

        {selectedDate && (
          <div className="mt-3 flex flex-col gap-2 text-base">
            <p className="ml-1 flex items-center gap-2">
              {commuteData[selectedDate]?.startTime && (
                <div className="h-2 w-2 rounded-full bg-green-500" />
              )}
              출근 :{" "}
              {commuteData[selectedDate]?.startTime
                ? dayjs(commuteData[selectedDate]?.startTime).format("HH:mm:ss")
                : "-"}
            </p>
            <p className="ml-1 flex items-center gap-2">
              {commuteData[selectedDate]?.endTime && (
                <div className="h-2 w-2 rounded-full bg-gray-500" />
              )}
              퇴근 :{" "}
              {commuteData[selectedDate]?.endTime
                ? dayjs(commuteData[selectedDate]?.endTime).format("HH:mm:ss")
                : "-"}
            </p>

            <div className="mb-3 mt-3 flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <p>
                근무지 : {getWorkplaceNameById(commuteData[selectedDate]?.startWorkplaceId) || "-"}
              </p>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CommuteDetailModal;
