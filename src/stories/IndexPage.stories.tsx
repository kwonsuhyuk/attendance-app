import type { Meta, StoryObj } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import IndexPage from "@/pages/common/IndexPage";

const meta: Meta<typeof IndexPage> = {
  title: "Pages/IndexPage",
  component: IndexPage,
  decorators: [
    Story => (
      <MemoryRouter>
        <HelmetProvider>
          <Story />
        </HelmetProvider>
      </MemoryRouter>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof IndexPage>;

export const Default: Story = {};
