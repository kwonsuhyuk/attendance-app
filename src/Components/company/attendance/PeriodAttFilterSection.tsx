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
    <div className="flex gap-3 pl-6">
      <CustomCalendarHeader onChangeMonth={onChangeDate} />
      <div className="flex flex-wrap gap-3">
        {/* 이 필터는 전체 탭만 사용 예정 */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-muted-foreground">근무지</span>
          <Select value={workplaceFilter} onValueChange={setWorkplaceFilter}>
            <SelectTrigger className="w-[160px]">
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

        {type === "total" && workTypeFilter && setWorkTypeFilter && (
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-muted-foreground">근무 형태</span>
            <Select value={workTypeFilter} onValueChange={setWorkTypeFilter}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="근로유형 선택" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="전체">전체</SelectItem>
                <SelectItem value="정규직">정규직</SelectItem>
                <SelectItem value="계약직">계약직</SelectItem>
                <SelectItem value="아르바이트">아르바이트</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}

        {type === "employee" && employeeName !== undefined && setEmployeeName && (
          <div className="flex items-center gap-2 whitespace-nowrap">
            <span className="text-sm font-medium text-muted-foreground">사원 이름</span>
            <Input
              className="h-[40px] w-[180px]"
              placeholder="이름 입력"
              value={employeeName}
              onChange={e => setEmployeeName(e.target.value)}
            />
          </div>
        )}
      </div>

      {type === "total" && (
        <div className="mt-2 flex items-center gap-4 pl-6 text-sm text-muted-foreground">
          <span>※</span>
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
    </div>
  );
};

export default PeriodAttFilterSection;
