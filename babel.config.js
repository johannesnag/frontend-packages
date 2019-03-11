module.exports = {
  presets: [
    ['@babel/preset-env', { modules: false }],
    '@babel/preset-react',
    '@emotion/babel-preset-css-prop',
  ],
  plugins: [
    'emotion',
    'polished',
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-syntax-dynamic-import',
  ],
  env: {
    test: {
      presets: [
        [
          '@babel/preset-env',
          {
            targets: {
              node: 'current',
            },
          },
        ],
      ],
    },
    commonjs: {
      plugins: [['transform-es2015-modules-commonjs']],
    },
  },
};
