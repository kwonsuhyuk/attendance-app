import { CalendarDays, StickyNote } from "lucide-react";
import { format } from "date-fns";
import clsx from "clsx";
import DetailModal from "./commonModalLayout/DetailModal";

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
  연차: "bg-blue-100 text-blue-700 dark:bg-blue-800 dark:text-blue-200",
  반차: "bg-yellow-100 text-yellow-800 dark:bg-yellow-700 dark:text-yellow-100",
  "특별 휴가": "bg-purple-100 text-purple-700 dark:bg-purple-700 dark:text-purple-100",
};

const VacationChartModal = ({ open, onClose, label, details }: IVacationDetailModalProps) => {
  return (
    <DetailModal
      open={open}
      onClose={onClose}
      title="휴가 상세 정보"
      subtitle={`${label}일`}
      icon={<CalendarDays className="h-5 w-5 text-blue-500" />}
    >
      {details.length > 0 ? (
        details.map((item, idx) => (
          <div
            key={idx}
            className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md dark:border-zinc-700 dark:bg-zinc-700"
          >
            <div className="mb-2 flex items-center justify-between">
              <p className="text-base font-medium text-gray-800 dark:text-white">{item.name}</p>
              <span
                className={clsx(
                  "rounded-full px-3 py-1 text-xs font-semibold",
                  typeColorMap[item.vacationType] ||
                    "bg-gray-100 text-gray-700 dark:bg-zinc-600 dark:text-gray-200",
                )}
              >
                {item.vacationType}
              </span>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
              <CalendarDays className="h-4 w-4" />
              <span className="font-medium">{format(new Date(item.startDate), "yyyy.MM.dd")}</span>
              <span>~</span>
              <span className="font-medium">{format(new Date(item.endDate), "yyyy.MM.dd")}</span>
            </div>

            <div className="mt-2 flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
              <StickyNote className="h-4 w-4" />
              <span className="text-gray-800 dark:text-white">
                {item.reason?.trim() ? item.reason : "-"}
              </span>
            </div>
          </div>
        ))
      ) : (
        <p className="flex h-40 items-center justify-center text-center text-sm text-gray-500 dark:text-gray-400">
          해당 날짜에 휴가 정보가 없습니다.
        </p>
      )}
    </DetailModal>
  );
};

export default VacationChartModal;
