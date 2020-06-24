const path = require('path');
const webpack = require('webpack');
const WebpackBar = require('webpackbar');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const eslintFriendlyFormatter = require('eslint-friendly-formatter');

const { NODE_ENV } = process.env;
const isDev = NODE_ENV === 'development';

const resolve = dir => path.join(__dirname, '..', dir);

const config = {
  mode: NODE_ENV,
  target: 'web',
  output: {
    publicPath: '/',
    filename: 'static/js/[name].js',
    chunkFilename: 'static/js/[name].js',
    pathinfo: false,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        enforce: 'pre',
        include: /src/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          cache: true,
          formatter: eslintFriendlyFormatter,
        },
      },
      {
        test: /\.jsx?$/,
        include: /src/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
          cacheCompression: true,
        },
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: isDev,
            },
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: isDev,
              importLoaders: 2,
              modules: {
                mode: 'local',
                localIdentName: isDev ? '[path][name]_[local]' : '[hash:base64]',
                context: resolve('src'),
              },
              esModule: true,
            },
          },
          !isDev && {
            loader: 'postcss-loader',
            options: {
              sourceMap: isDev,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: isDev,
            },
          },
        ].filter(Boolean),
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name]-[hash].[ext]',
          outputPath: 'static/images',
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    modules: [resolve('src'), 'node_modules'],
    alias: {
      src: resolve('src'),
      assets: resolve('src/assets'),
      components: resolve('src/components'),
      constants: resolve('src/constants'),
      locales: resolve('src/locales'),
      routes: resolve('src/routes'),
      stores: resolve('src/stores'),
      utils: resolve('src/utils'),
      views: resolve('src/views'),
      'react-dom': isDev ? '@hot-loader/react-dom' : 'react-dom',
    },
  },
  stats: {
    assetsSort: '!size',
    children: false,
    chunks: false,
    colors: true,
    entrypoints: false,
    warnings: true,
    modules: false,
  },
  plugins: [
    new webpack.EnvironmentPlugin(['NODE_ENV']),
    new WebpackBar({
      name: NODE_ENV,
      color: 'green',
      // reporters: ['profile'],
      profile: !isDev,
    }),
    new CircularDependencyPlugin({
      exclude: /node_modules/,
      failOnError: true,
      allowAsyncCycles: true,
      cwd: process.cwd(),
    }),
    new MiniCssExtractPlugin({
      path: resolve('dist'),
      publicPath: '/',
      filename: isDev ? 'css/[name].css' : 'css/[name].[contenthash].css',
      chunkFilename: isDev ? 'css/[id].css' : 'css/[id].[contenthash].css',
      ignoreOrder: false, // remove warnings about conflicting order.
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: resolve('src/index.html'),
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
      },
      chunksSortMode: 'auto',
      isDev,
    }),
  ],
  optimization: {
    runtimeChunk: false,
  },
  performance: {
    hints: false,
  },
};

if (process.env.npm_config_report) {
  config.plugins.push(new BundleAnalyzerPlugin({ analyzerPort: 3002 }));
}

module.exports = config;
