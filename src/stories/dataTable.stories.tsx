import { DataTable } from "@/components/ui/data-table";
import { DUMMY_EMPLOYEES } from "@/constants/dummyEmployees";
import { getEmployeeColumns } from "@/components/company/table/EmployeeColumns";
import type { Meta, StoryObj } from "@storybook/react";
import { EmployeeInfo } from "@/model/types/user.type";
import { ColumnDef } from "@tanstack/react-table";
import { MemoryRouter } from "react-router-dom";

const meta: Meta<typeof DataTable<EmployeeInfo>> = {
  title: "Components/DataTable",
  component: DataTable,
  tags: ["autodocs"],
  args: {
    columns: getEmployeeColumns(() => {}) as ColumnDef<EmployeeInfo>[],
    data: DUMMY_EMPLOYEES.slice(0, 10), // 더미 데이터 적용
  },
};

export default meta;

type Story = StoryObj<typeof DataTable<EmployeeInfo>>;

export const LightAndDark: Story = {
  args: {
    columns: getEmployeeColumns(() => {}),
    data: DUMMY_EMPLOYEES,
  },
  parameters: {
    docs: {
      description: {
        story: `
        `,
      },
    },
  },
  render: args => (
    <MemoryRouter>
      <div className="rounded-md bg-white p-6 text-black shadow-md dark:bg-dark-card-bg dark:text-dark-text">
        <p className="mb-2 text-lg font-semibold dark:hidden">☀️ Light Mode</p>
        <p className="mb-2 hidden text-lg font-semibold dark:block">🌙 Dark Mode</p>
        <DataTable {...args} />
      </div>
    </MemoryRouter>
  ),
};
