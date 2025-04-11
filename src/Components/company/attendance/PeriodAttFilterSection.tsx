import CustomCalendarHeader from "@/components/company/attendance/CustomCalendarHeader";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

interface Props {
  type: "total" | "employee";
  currentDate: Date;
  onChangeDate: (date: Date) => void;
  workplaceFilter: string;
  setWorkplaceFilter: (v: string) => void;
  workTypeFilter?: string;
  setWorkTypeFilter?: (v: string) => void;
  employeeName?: string;
  setEmployeeName?: (v: string) => void;
}

const PeriodAttFilterSection = ({
  type,
  currentDate,
  onChangeDate,
  workplaceFilter,
  setWorkplaceFilter,
  workTypeFilter,
  setWorkTypeFilter,
  employeeName,
  setEmployeeName,
}: Props) => {
  return (
    <div className="flex flex-col gap-4 px-4 sm:flex-row sm:flex-wrap sm:items-end sm:justify-start">
      <div className="flex justify-center py-2 sm:justify-start">
        <CustomCalendarHeader onChangeMonth={onChangeDate} />
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
        {/* 근무지 필터 - total에서만 */}
        {type === "total" && (
          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3">
            <label className="mb-1 text-sm font-medium text-muted-foreground">근무지</label>
            <Select value={workplaceFilter} onValueChange={setWorkplaceFilter}>
              <SelectTrigger className="w-full min-w-[140px] sm:w-[160px]">
                <SelectValue placeholder="근무지 선택" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="전체">전체</SelectItem>
                <SelectItem value="본사">본사</SelectItem>
                <SelectItem value="지점A">지점 A</SelectItem>
                <SelectItem value="지점B">지점 B</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}

        {/* 사원 이름 필터 - employee에서만 */}
        {type === "employee" && employeeName !== undefined && setEmployeeName && (
          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3">
            <label className="mb-1 whitespace-nowrap text-sm font-medium text-muted-foreground sm:mb-0">
              직원 검색
            </label>
            <Input
              className="h-[40px] w-full min-w-[140px] sm:w-[180px]"
              placeholder="이름 입력"
              value={employeeName}
              onChange={e => setEmployeeName(e.target.value)}
            />
          </div>
        )}
      </div>

      {/* 범례 - total */}
      {type === "total" && (
        <div className="mx-1 mb-2 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <span>※</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="h-3 w-3 rounded-full bg-red-300" />
            <span>공휴일</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="h-3 w-3 rounded-full bg-yellow-300" />
            <span>회사 공휴일</span>
          </div>
        </div>
      )}

      {/* 범례 - employee */}
      {type === "employee" && (
        <div className="mx-1 mb-2 flex flex-1 flex-wrap items-center gap-3 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <span>※</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="h-3 w-3 rounded-full bg-green-400" />
            <span>출근</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="h-3 w-3 rounded-full bg-gray-300" />
            <span>퇴근</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="h-3 w-3 rounded-full bg-blue-300" />
            <span>휴가</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="h-3 w-3 rounded-full bg-orange-300" />
            <span>외근</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default PeriodAttFilterSection;
