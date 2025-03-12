import { Button } from "@/components/ui/button";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "destructive", "outline", "secondary", "ghost", "link"],
    },
    size: {
      control: "select",
      options: ["default", "sm", "lg", "icon"],
    },
    disabled: {
      control: "boolean",
    },
    asChild: {
      control: "boolean",
    },
    children: {
      control: "text",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

// ✅ Light/Dark 모드 버튼을 한 화면에 동시에 보여주기
export const LightAndDark: Story = {
  args: {
    variant: "default",
    size: "default",
    disabled: false,
    children: "Click Me",
  },
  parameters: {
    docs: {
      description: {
        story: `
### 🌗 우측 상단에 다크/라이트 모드를 클릭해서 모드별 디자인 확인 가능.
#### 👍 variant 사용하는 곳
- \`default\` 는 **강조되는 부분**에 사용하기 ("저장" 등)
- \`outline\` 는 **기본**으로 강조 되는 부분 이외 부분에 사용하기
- \`secondary\` 는 **포인트 색깔 버튼**으로 포인트 줄 곳에 사용하기 (많이사용x)

위의 세가지 variant만 사용하는 것 권장합니다.
        `,
      },
    },
  },
  render: args => (
    <div className="rounded-md bg-white-bg p-6 text-black shadow-md dark:bg-dark-card-bg dark:text-dark-text">
      <p className="mb-2 text-lg font-semibold dark:hidden">☀️ Light Mode</p>
      <p className="mb-2 hidden text-lg font-semibold dark:block">🌙 Dark Mode</p>
      <Button {...args} />
    </div>
  ),
};
