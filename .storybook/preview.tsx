import React from 'react';
import type { Preview } from '@storybook/react';
import { Toaster } from 'sonner';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="p-4">
        <Story />
        <Toaster />
      </div>
    ),
  ],
};

export default preview;
