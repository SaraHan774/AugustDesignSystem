const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const appDirectory = path.resolve(__dirname);

// babel.config.js 로드하여 module-resolver 플러그인 가져오기
const babelConfig = require('./babel.config.js');
const moduleResolverPlugin = babelConfig.plugins.find(
  (plugin) => Array.isArray(plugin) && plugin[0] === 'module-resolver'
);

const babelLoaderConfiguration = {
  test: /\.(js|jsx|ts|tsx)$/,
  exclude: /node_modules\/(?!(react-native|react-native-|@react-native|@unimodules)\/).*/,
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
      ],
    },
  },
};

const imageLoaderConfiguration = {
  test: /\.(gif|jpe?g|png|svg)$/,
  type: 'asset/resource',
};

module.exports = {
  entry: path.resolve(appDirectory, 'index.web.js'),
  output: {
    filename: 'bundle.js',
    path: path.resolve(appDirectory, 'dist'),
    clean: true,
  },
  module: {
    rules: [babelLoaderConfiguration, imageLoaderConfiguration],
  },
  resolve: {
    alias: {
      'react-native$': 'react-native-web',
    },
    extensions: ['.web.tsx', '.web.ts', '.tsx', '.ts', '.web.js', '.js'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(appDirectory, 'public/index.html'),
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
