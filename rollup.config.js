import {babel} from '@rollup/plugin-babel'
import {terser} from 'rollup-plugin-terser'
import cartesianProduct from 'fast-cartesian-product'

const DEST = './dist/'

export default cartesianProduct([
  [
    {
      format: 'umd',
      name: 'resolvify',
      file: '.js',
    },
    {
      format: 'cjs',
      file: '.cjs',
    },
    {
      format: 'esm',
      file: '.mjs',
    },
  ],
  [true, false],
]).map(([config, minify]) => ({
  input: './src/index.js',
  output: [
    {
      ...config,
      file: `${DEST}index${minify ? '.min' : ''}${config.file}`,
    },
  ],
  plugins: [babel(), minify && terser()],
}))
