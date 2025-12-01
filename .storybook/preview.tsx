import React, { useEffect } from 'react';
import type { Preview } from '@storybook/react';
import { ThemeProvider } from '../src/design-system';

// Load Material Icons font for icon rendering
const loadMaterialIconsFont = () => {
  if (typeof document !== 'undefined') {
    const existingLink = document.getElementById('material-icons-font');
    if (!existingLink) {
      const link = document.createElement('link');
      link.id = 'material-icons-font';
      link.rel = 'stylesheet';
      link.href = 'https://fonts.googleapis.com/icon?family=Material+Icons';
      document.head.appendChild(link);
    }
  }
};

// Font loader decorator
const FontLoaderDecorator = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    loadMaterialIconsFont();
  }, []);
  return <>{children}</>;
};

const preview: Preview = {
  decorators: [
    (Story) => (
      <FontLoaderDecorator>
        <ThemeProvider>
          <Story />
        </ThemeProvider>
      </FontLoaderDecorator>
    ),
  ],
  parameters: {
    controls: {
      expanded: true,
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      toc: true,
    },
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#FFFFFF' },
        { name: 'dark', value: '#000000' },
        { name: 'gray', value: '#F2F2F7' },
      ],
    },
    layout: 'centered',
  },
  globalTypes: {
    theme: {
      description: 'Global theme for components',
      defaultValue: 'light',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: ['light', 'dark'],
        dynamicTitle: true,
      },
    },
  },
};

export default preview;