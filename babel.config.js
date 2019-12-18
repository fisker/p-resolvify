module.exports = {
  plugins: ['babel-plugin-transform-async-to-promises'],
  presets: [
    [
      '@babel/preset-env',
      {
        debug: true,
        targets: {
          node: '0.8',
        },
        exclude: ['transform-typeof-symbol'],
      },
    ],
  ],
}
