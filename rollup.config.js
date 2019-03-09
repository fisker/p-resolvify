import babel from 'rollup-plugin-babel'
import {terser} from 'rollup-plugin-terser'

const plugins = [babel(), terser()]

const DEST = './lib/'

export default {
  input: './src/index.js',
  output: [
    {
      format: 'umd',
      name: 'resolvify',
      file: '.js',
    },
    {
      format: 'cjs',
      file: '.common.js',
    },
    {
      format: 'esm',
      file: '.mjs',
    },
  ].map(config => ({
    ...config,
    file: `${DEST}index${config.file}`,
  })),
  plugins,
}
