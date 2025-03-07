import type { Preview } from "@storybook/react";

const preview: Preview = {
  parameters: {
    actions: {
      handles: ["onClick", "onSubmit", "onChange"],
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
