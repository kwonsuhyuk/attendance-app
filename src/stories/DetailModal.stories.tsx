import DetailModal from "@/components/common/modal/commonModalLayout/DetailModal";
import type { Meta, StoryObj } from "@storybook/react";
import { CalendarDays } from "lucide-react";

const meta: Meta<typeof DetailModal> = {
  title: "Components/Modal/DetailModal",
  component: DetailModal,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof DetailModal>;

export const Default: Story = {
  args: {
    open: true,
    onClose: () => alert("닫기"),
    title: "휴가 상세 정보",
    subtitle: "3일",
    icon: <CalendarDays className="h-5 w-5 text-blue-500" />,
    children: (
      <div className="space-y-3">
        <div className="rounded-lg border p-4 dark:border-zinc-700 dark:bg-zinc-700">
          <div className="mb-2 flex justify-between">
            <span className="font-semibold text-gray-800 dark:text-white">김영희</span>
            <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs text-blue-700 dark:bg-blue-800 dark:text-blue-200">
              연차
            </span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300">2024.05.01 ~ 2024.05.03</p>
          <p className="mt-1 text-sm text-gray-800 dark:text-white">개인 사유로 인한 연차</p>
        </div>
      </div>
    ),
  },
};
