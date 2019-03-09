module.exports = {
  plugins: [],
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: '0.8',
        },
        modules: false,
        exclude: ['transform-typeof-symbol'],
      },
    ],
    'babel-preset-minify',
  ],
  moduleId: 'resolvify',
}
