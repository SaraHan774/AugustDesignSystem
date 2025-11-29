module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['.'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@design-system': './src/design-system',
          '@tokens': './src/design-system/tokens',
          '@theme': './src/design-system/theme',
          '@hooks': './src/design-system/hooks',
          '@components': './src/design-system/components',
          '@types': './src/design-system/types',
          '@utils': './src/design-system/utils',
          '@constants': './src/design-system/constants',
        },
      },
    ],
  ],
};
