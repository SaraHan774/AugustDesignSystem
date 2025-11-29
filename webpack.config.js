const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const appDirectory = path.resolve(__dirname);

// babel.config.js 로드하여 module-resolver 플러그인 가져오기
const babelConfig = require('./babel.config.js');
const moduleResolverPlugin = babelConfig.plugins.find(
  (plugin) => Array.isArray(plugin) && plugin[0] === 'module-resolver'
);

// Packages that need to be transpiled
const compileNodeModules = [
  'react-native',
  'react-native-web',
  'react-native-reanimated',
  'react-native-gesture-handler',
  'react-native-safe-area-context',
  'react-native-svg',
  'react-native-vector-icons',
  '@react-native',
  'react-native-worklets',
].map((moduleName) => path.resolve(appDirectory, `node_modules/${moduleName}`));

const babelLoaderConfiguration = {
  test: /\.(js|jsx|ts|tsx)$/,
  include: [
    path.resolve(appDirectory, 'index.web.js'),
    path.resolve(appDirectory, 'App.tsx'),
    path.resolve(appDirectory, 'src'),
    ...compileNodeModules,
  ],
  use: {
    loader: 'babel-loader',
    options: {
      cacheDirectory: true,
      // 웹 환경에 맞는 presets 사용
      presets: [
        ['@babel/preset-env', { modules: false }],
        ['@babel/preset-react', { runtime: 'automatic' }],
        '@babel/preset-typescript',
      ],
      plugins: [
        // module-resolver 플러그인 유지 (path aliases를 위해 필요)
        ...(moduleResolverPlugin ? [moduleResolverPlugin] : []),
        // 웹 환경을 위한 플러그인
        'react-native-web',
        // Reanimated babel plugin for web
        'react-native-reanimated/plugin',
      ],
    },
  },
};

const imageLoaderConfiguration = {
  test: /\.(gif|jpe?g|png|svg)$/,
  type: 'asset/resource',
};

// Font loader for react-native-vector-icons ttf files
const fontLoaderConfiguration = {
  test: /\.ttf$/,
  type: 'asset/resource',
  include: [
    path.resolve(appDirectory, 'node_modules/react-native-vector-icons'),
  ],
};

module.exports = {
  // Suppress expected warnings from react-native-worklets
  ignoreWarnings: [
    {
      module: /react-native-worklets/,
      message: /Critical dependency/,
    },
  ],
  entry: path.resolve(appDirectory, 'index.web.js'),
  output: {
    filename: 'bundle.js',
    path: path.resolve(appDirectory, 'dist'),
    clean: true,
  },
  module: {
    rules: [
      babelLoaderConfiguration,
      imageLoaderConfiguration,
      fontLoaderConfiguration,
    ],
  },
  resolve: {
    alias: {
      'react-native$': 'react-native-web',
      // Reanimated web alias
      'react-native-reanimated': path.resolve(
        appDirectory,
        'node_modules/react-native-reanimated'
      ),
    },
    extensions: ['.web.tsx', '.web.ts', '.tsx', '.ts', '.web.js', '.js'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(appDirectory, 'public/index.html'),
    }),
    // Define process.env for browser compatibility
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env),
      __DEV__: process.env.NODE_ENV !== 'production',
    }),
  ],
  devServer: {
    static: {
      directory: path.resolve(appDirectory, 'public'),
    },
    hot: true,
    port: 3000,
    open: false,
    compress: true,
    historyApiFallback: true,
  },
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  devtool: 'source-map',
};
