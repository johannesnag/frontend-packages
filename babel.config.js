module.exports = {
  presets: [['@babel/preset-env', { modules: false }], '@babel/preset-react'],
  plugins: ['emotion', 'polished', '@babel/plugin-proposal-object-rest-spread'],
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
