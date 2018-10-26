module.exports = {
  plugins: [],
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: '0.8'
        }
      }
    ],
    'babel-preset-minify'
  ]
}
