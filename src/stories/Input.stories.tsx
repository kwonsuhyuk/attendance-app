import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "@/components/ui/input";

const meta: Meta<typeof Input> = {
  title: "Components/Input",
  component: Input,
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: ["text", "password", "email", "number", "search", "tel"],
    },
    placeholder: {
      control: "text",
    },
    disabled: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

// ✅ Light/Dark 모드에서 Input을 동시에 확인할 수 있는 스토리
export const LightAndDark: Story = {
  args: {
    type: "text",
    placeholder: "Enter text...",
    disabled: false,
  },
  parameters: {
    docs: {
      description: {
        story: `
### 🌗 우측 상단 다크/라이트 모드 토글로 모드별 디자인 확인 가능.
#### 👍 Input 사용 가이드
- **텍스트 입력**: 기본적으로 사용 (\`text\`)
- **비밀번호 입력**: \`password\` 타입 활용
- **이메일 입력**: \`email\` 타입 활용
- **숫자 입력**: \`number\` 타입 활용
- **검색 입력 필드**: \`search\` 타입 활용
        `,
      },
    },
  },
  render: args => (
    <div className="rounded-md bg-white-bg p-6 text-black shadow-md dark:bg-dark-card-bg dark:text-dark-text">
      <p className="mb-2 text-lg font-semibold dark:hidden">☀️ Light Mode</p>
      <p className="mb-2 hidden text-lg font-semibold dark:block">🌙 Dark Mode</p>
      <Input
        {...args}
        className="dark:bg-dark-border-sub dark:text-white-bg dark:placeholder-dark-border"
      />
    </div>
  ),
};
