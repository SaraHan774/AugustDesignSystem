import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    index: 'src/design-system/index.ts',
    'tokens/index': 'src/design-system/tokens/index.ts',
    'theme/index': 'src/design-system/theme/index.ts',
    'components/index': 'src/design-system/components/index.ts',
    'hooks/index': 'src/design-system/hooks/index.ts',
  },
  format: ['cjs', 'esm'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  external: [
    'react',
    'react-native',
    'react-native-web',
    'react-native-safe-area-context',
  ],
  esbuildOptions(options) {
    options.alias = {
      '@theme': './src/design-system/theme',
      '@tokens': './src/design-system/tokens',
      '@hooks': './src/design-system/hooks',
      '@components': './src/design-system/components',
      '@types': './src/design-system/types',
      '@utils': './src/design-system/utils',
      '@constants': './src/design-system/constants',
    };
  },
  treeshake: true,
  minify: false,
  target: 'es2020',
});
