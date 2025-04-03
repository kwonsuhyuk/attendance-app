import { Button } from "@/components/ui/button";
import { TVacationStatus } from "@/model/types/vacation.type";

interface Props {
  filterStatus: "전체" | TVacationStatus;
  setFilterStatus: (status: "전체" | TVacationStatus) => void;
  resetPage: () => void;
}

const VacationFilterButtons = ({ filterStatus, setFilterStatus, resetPage }: Props) => {
  return (
    <div className="flex gap-2 text-sm font-medium">
      {["전체", "대기중", "승인", "거절"].map(status => (
        <Button
          key={status}
          size="sm"
          variant={filterStatus === status ? "default" : "outline"}
          onClick={() => {
            setFilterStatus(status as any);
            resetPage();
          }}
        >
          {status}
        </Button>
      ))}
    </div>
  );
};

export default VacationFilterButtons;
