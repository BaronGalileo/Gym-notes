import type { Preview } from '@storybook/react-vite';

const preview: Preview = {
  parameters: {
    backgrounds: {
      defaults: 'light',
      values: { light: '#1a1a1a', dark: '#333333' },
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