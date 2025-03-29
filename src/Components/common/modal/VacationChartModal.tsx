import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { format } from "date-fns";
import clsx from "clsx";
import { XIcon } from "lucide-react";

interface IVacationDetailModalProps {
  open: boolean;
  onClose: () => void;
  label: string;
  details: {
    name: string;
    vacationType: string;
    startDate: string;
    endDate: string;
    reason?: string;
  }[];
}

const typeColorMap: Record<string, string> = {
  연차: "bg-blue-100 text-blue-700",
  반차: "bg-yellow-100 text-yellow-800",
  "특별 휴가": "bg-purple-100 text-purple-700",
};

const VacationChartModal = ({ open, onClose, label, details }: IVacationDetailModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md md:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold md:text-xl">
            📅 {label} 휴가 상세 정보
          </DialogTitle>
        </DialogHeader>
        <DialogClose asChild>
          <button
            type="button"
            className="absolute right-3 top-3 rounded-sm border-none bg-transparent p-1 text-gray-500 transition hover:bg-gray-100 hover:text-gray-700"
            aria-label="Close"
          >
            <XIcon className="h-5 w-5" />
          </button>
        </DialogClose>
        <div className="mt-4 space-y-4">
          {details.length > 0 ? (
            details.map((item, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md"
              >
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-base font-medium text-gray-800">{item.name}</p>
                  <span
                    className={clsx(
                      "rounded-full px-3 py-1 text-xs font-semibold",
                      typeColorMap[item.vacationType] || "bg-gray-100 text-gray-700",
                    )}
                  >
                    {item.vacationType}
                  </span>
                </div>

                <div className="text-sm text-gray-600">
                  🗓️{" "}
                  <span className="font-medium">
                    {format(new Date(item.startDate), "yyyy.MM.dd")}
                  </span>{" "}
                  ~{" "}
                  <span className="font-medium">
                    {format(new Date(item.endDate), "yyyy.MM.dd")}
                  </span>
                </div>

                <div className="mt-2 text-sm text-gray-600">
                  📝 사유:{" "}
                  <span className="text-gray-800">
                    {item.reason && item.reason.trim() !== "" ? item.reason : "-"}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-sm text-gray-500">해당 날짜에 휴가 정보가 없습니다.</p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VacationChartModal;
