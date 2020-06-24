const path = require('path');
const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: false,
      },
    ],
    '@babel/preset-react',
  ],
  comments: false,
  plugins: [
    '@babel/plugin-transform-runtime',
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-syntax-import-meta',
    [
      '@babel/plugin-proposal-decorators',
      {
        legacy: true,
      },
    ],
    [
      '@babel/plugin-proposal-class-properties',
      {
        loose: true,
      },
    ],
    '@babel/plugin-proposal-json-strings',
    '@babel/plugin-proposal-function-sent',
    '@babel/plugin-proposal-export-namespace-from',
    '@babel/plugin-proposal-numeric-separator',
    '@babel/plugin-proposal-throw-expressions',
    '@babel/plugin-proposal-export-default-from',
    '@babel/plugin-proposal-logical-assignment-operators',
    '@babel/plugin-proposal-optional-chaining',
    [
      '@babel/plugin-proposal-pipeline-operator',
      {
        proposal: 'minimal',
      },
    ],
    '@babel/plugin-proposal-nullish-coalescing-operator',
    '@babel/plugin-proposal-do-expressions',
    [
      'lodash',
      {
        id: ['async', 'lodash-bound'],
      },
    ],
    [
      'react-css-modules',
      {
        context: path.resolve(__dirname, 'src'),
        generateScopedName: isDev ? '[path][name]_[local]' : '[hash:base64]',
        filetypes: {
          '.scss': {
            syntax: 'postcss-scss',
            plugins: ['postcss-nested'],
          },
        },
        exclude: 'node_modules',
        attributeNames: { activeStyleName: 'activeClassName' },
        webpackHotModuleReloading: isDev ? true : false,
      },
    ],
  ],
  env: {
    production: {
      plugins: [['transform-react-remove-prop-types']],
    },
    development: {
      plugins: [['react-hot-loader/babel']],
    },
    testing: {
      presets: ['@babel/preset-env', '@babel/preset-react'],
    },
  },
};
