import type { Meta, StoryObj } from "@storybook/react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

const meta: Meta<typeof Select> = {
  title: "Components/Select",
  component: Select,
  tags: ["autodocs"],
  argTypes: {
    disabled: {
      control: "boolean",
      description: "선택박스를 비활성화합니다.",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

// ✅ Light/Dark 모드에서 Select 컴포넌트를 확인할 수 있는 스토리
export const LightAndDark: Story = {
  args: {
    disabled: false,
  },
  parameters: {
    docs: {
      description: {
        story: `
### 🌗 다크/라이트 모드 토글을 통해 모드별 디자인 확인 가능.
#### 👍 Select 사용 가이드
- **기본 선택 박스**: 일반적인 선택 기능 제공
- **비활성화 옵션**: \`disabled\` 속성을 활용하여 사용 가능
        `,
      },
    },
  },
  render: args => (
    <div className="rounded-md bg-white-bg p-6 text-black shadow-md dark:bg-dark-card-bg dark:text-dark-text">
      <p className="mb-2 text-lg font-semibold dark:hidden">☀️ Light Mode</p>
      <p className="mb-2 hidden text-lg font-semibold dark:block">🌙 Dark Mode</p>
      <Select {...args}>
        <SelectTrigger>
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="option1">Option 1</SelectItem>
          <SelectItem value="option2">Option 2</SelectItem>
          <SelectItem value="option3">Option 3</SelectItem>
        </SelectContent>
      </Select>
    </div>
  ),
};
