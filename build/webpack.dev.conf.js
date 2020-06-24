const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const notifier = require('node-notifier');
const baseWebpackConfig = require('./webpack.base.conf');

const resolve = dir => path.join(__dirname, '..', dir);

const config = {
  devtool: 'cheap-module-eval-source-map',
  entry: ['react-hot-loader/patch', './src'],
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DllReferencePlugin({
      // context: resolve('dlls'),
      manifest: resolve('dlls/common-manifest.json'),
    }),
    new webpack.NamedModulesPlugin(),
    new FriendlyErrorsWebpackPlugin({
      clearConsole: false,
      onErrors: (severity, errors) => {
        if (severity !== 'error') {
          return;
        }
        const error = errors[0];
        notifier.notify({
          title: 'Webpack error',
          message: `${severity}: ${error.name}`,
          subtitle: error.file || '',
        });
      },
    }),
  ],
  optimization: {
    splitChunks: false,
    removeAvailableModules: false,
    removeEmptyChunks: false,
    noEmitOnErrors: true,
  },
  cache: true,
  devServer: {
    hot: true,
    liveReload: false,
    compress: true,
    serveIndex: true,
    // contentBase: [resolve('/static/'), resolve('/dlls/')],
    watchContentBase: true,
    watchOptions: {
      ignored: /node_modules/,
    },
    writeToDisk: false,
    index: 'index.html',
    publicPath: '/',
    open: false,
    inline: true,
    overlay: true,
    quiet: true,
    stats: 'errors-only',
    historyApiFallback: true,
    port: 3000,
    proxy: {
      // '/api': 'http://localhost:3001/api',
    },
  },
};

module.exports = merge(baseWebpackConfig, config);
