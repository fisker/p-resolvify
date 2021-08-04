module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        debug: true,
        targets: {
          node: '0.8',
        },
        exclude: ['transform-typeof-symbol', 'proposal-object-rest-spread'],
      },
    ],
  ],
  plugins: [
    'babel-plugin-transform-async-to-promises',
    [
      '@babel/plugin-proposal-object-rest-spread',
      {loose: true, useBuiltIns: true},
    ],
  ],
}
