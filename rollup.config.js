const path = require('path')
const resolve = require('rollup-plugin-node-resolve')
const sourceMaps = require('rollup-plugin-sourcemaps')
const babel = require('rollup-plugin-babel')
const typescript = require('rollup-plugin-typescript2')

const packageJson = require('./package.json')
const babelConfig = require('./babel.config')

const input = packageJson.esnext

const buildCjs = {
  input,
  output: {
    file: path.resolve(__dirname, packageJson.main),
    format: 'cjs',
    exports: 'named',
    sourcemap: true,
  },
  plugins: [resolve(), typescript(), sourceMaps()],
}

const buildEsm = {
  input,
  output: {
    file: path.resolve(__dirname, packageJson.module),
    format: 'esm',
    sourcemap: true,
  },
  plugins: [resolve(), typescript(), babel(babelConfig), sourceMaps()],
}

module.exports = [buildCjs, buildEsm]
