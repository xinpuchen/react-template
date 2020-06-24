module.exports = {
  plugins: {
    'postcss-import': {},
    'postcss-preset-env': {
      stage: 0,
    },
    'css-mqpacker': {},
    'postcss-flexbugs-fixes': {},
    'postcss-nested': {},
    autoprefixer: {},
    cssnano: {
      safe: true,
      preset: [
        'default',
        {
          discardComments: {
            removeAll: true,
          },
          svgo: {
            plugins: [
              {
                removeDoctype: false,
              },
            ],
          },
        },
      ],
    },
  },
};
