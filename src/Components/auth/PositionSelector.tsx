import { TPosition } from "@/model";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Briefcase, User } from "lucide-react";
import { cn } from "@/util/cn.util";

interface IPositionSelectorProps {
  position: TPosition | undefined;
  onPositionChange: (value: TPosition) => void;
}

export const PositionSelector = ({ position, onPositionChange }: IPositionSelectorProps) => {
  return (
    <div className="p-4 bg-white shadow-md rounded-lg border border-gray-300">
      <Label className="block mb-3 text-lg font-semibold text-gray-700">가입 포지션</Label>

      <Tabs
        value={position}
        onValueChange={value => onPositionChange(value as TPosition)}
        className="w-full"
      >
        <TabsList className="grid grid-cols-2 gap-2 bg-white p-1 rounded-lg h-auto">
          {/* 관리자 선택 */}
          <TabsTrigger
            value="manager"
            className={cn(
              "flex flex-col items-center space-y-1 p-4 border rounded-lg transition-all ",
              position === "manager"
                ? "bg-blue-200 border-blue-500"
                : "bg-white border-gray-0 hover:bg-blue-200",
            )}
          >
            <Briefcase className="w-6 h-6 text-blue-600" />
            <span className="text-sm font-medium text-gray-700">관리자</span>
          </TabsTrigger>

          {/* 직원 선택 */}
          <TabsTrigger
            value="employee"
            className={cn(
              "flex flex-col items-center space-y-1 p-4 border rounded-lg transition-all ",
              position === "employee"
                ? "bg-green-500 border-green-500"
                : "bg-white border-gray-0 hover:bg-green-200",
            )}
          >
            <User className="w-6 h-6 text-green-600" />
            <span className="text-sm font-medium text-gray-700">직원</span>
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};
