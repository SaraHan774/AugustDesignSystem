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
        // Prioritize .web.tsx/.web.ts extensions for web builds
        extensions: ['.web.tsx', '.web.ts', '.web.js', '.tsx', '.ts', '.js', '.jsx', '.json'],
        alias: {
          // Mock React Native internal modules not available in react-native-web
          // codegenNativeComponent는 함수를 default export로 제공해야 함 (react-native-safe-area-context가 사용)
          'react-native/Libraries/Utilities/codegenNativeComponent': path.resolve(__dirname, './mocks/codegenNativeComponent.ts'),
          // ReactNativeViewConfigRegistry는 객체를 default export로 제공
          'react-native/Libraries/Renderer/shims/ReactNativeViewConfigRegistry': path.resolve(__dirname, './mocks/ReactNativeViewConfigRegistry.ts'),
          // PressabilityDebug는 react-native-internals.ts 사용 (객체 export)
          'react-native/Libraries/Pressability/PressabilityDebug': path.resolve(__dirname, './mocks/react-native-internals.ts'),
          // Mock react-native-gesture-handler for web
          'react-native-gesture-handler': path.resolve(__dirname, './mocks/react-native-gesture-handler.tsx'),
          // Mock react-native-reanimated for web
          'react-native-reanimated': path.resolve(__dirname, './mocks/react-native-reanimated.ts'),
          // Mock react-native-safe-area-context for web
          'react-native-safe-area-context': path.resolve(__dirname, './mocks/react-native-safe-area-context.tsx'),
          // react-native-web를 확장한 버전 사용 (TurboModuleRegistry 포함)
          'react-native': path.resolve(__dirname, './mocks/react-native-web-extended.ts'),
          'react-native-vector-icons/MaterialIcons': path.resolve(__dirname, './mocks/react-native-vector-icons.tsx'),
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
      optimizeDeps: {
        // react-native-web-extended를 포함하여 TurboModuleRegistry가 제대로 인식되도록 함
        include: ['react-native-web'],
        esbuildOptions: {
          loader: {
            '.js': 'jsx',
          },
          // react-native-svg의 fabric 모듈들이 사용하는 TurboModuleRegistry를 처리
          define: {
            'process.env.NODE_ENV': '"development"',
          },
        },
      },
    });
  },
};

export default config;
