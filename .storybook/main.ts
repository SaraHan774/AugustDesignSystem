import type { StorybookConfig } from '@storybook/react-vite';
import { mergeConfig } from 'vite';
import path from 'path';

const config: StorybookConfig = {
  stories: [
    '../src/design-system/**/*.stories.@(js|jsx|ts|tsx|mdx)',
    '../src/design-system/**/*.mdx',
  ],
  staticDirs: [],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-docs',
    '@storybook/addon-a11y',
    '@storybook/addon-react-native-web',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  async viteFinal(config) {
    return mergeConfig(config, {
      base: process.env.STORYBOOK_BASE || '/',
      publicDir: false,
      resolve: {
        alias: {
          'react-native': 'react-native-web',
          '@design-system': path.resolve(__dirname, '../src/design-system'),
          '@tokens': path.resolve(__dirname, '../src/design-system/tokens'),
          '@theme': path.resolve(__dirname, '../src/design-system/theme'),
          '@hooks': path.resolve(__dirname, '../src/design-system/hooks'),
          '@components': path.resolve(__dirname, '../src/design-system/components'),
          '@types': path.resolve(__dirname, '../src/design-system/types'),
          '@utils': path.resolve(__dirname, '../src/design-system/utils'),
          '@constants': path.resolve(__dirname, '../src/design-system/constants'),
        },
      },
      define: {
        'process.env': {},
      },
    });
  },
};

export default config;
