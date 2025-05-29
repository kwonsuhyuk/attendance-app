import type { Meta, StoryObj } from "@storybook/react";
import { CalendarDays } from "lucide-react";
import RegisterModal from "@/components/common/modal/commonModalLayout/RegisterModal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const meta: Meta<typeof RegisterModal> = {
  title: "Components/Modal/RegisterModal",
  component: RegisterModal,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof RegisterModal>;

export const Default: Story = {
  args: {
    open: true,
    onClose: () => alert("닫기"),
    title: "휴가 요청",
    submitLabel: "등록",
    onSubmit: () => alert("등록"),
    children: (
      <div className="space-y-4">
        <div>
          <p className="mb-1 text-sm font-medium">휴가 유형</p>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="선택하세요" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="연차">연차</SelectItem>
              <SelectItem value="반차">반차</SelectItem>
              <SelectItem value="특별">특별</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <p className="mb-1 text-sm font-medium">사유</p>
          <textarea className="min-h-[200px] w-full border p-2" />
        </div>
      </div>
    ),
  },
};
