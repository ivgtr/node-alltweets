import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import json from 'rollup-plugin-json'
import babel from 'rollup-plugin-babel'
import typescript from 'rollup-plugin-typescript2'
import shebang from 'rollup-plugin-preserve-shebang'
import { terser } from 'rollup-plugin-terser'

const settings = ({ name }) => {
  return {
    input: `./src/${name}.ts`,
    output: {
      file: `./lib/${name}.js`,
      format: 'cjs'
    },
    external: [
      'fs',
      'path',
      'axios',
      'ora',
      'update-notifier',
      'chalk',
      'ditenv',
      'js-yaml',
      'meow',
      'twitter-d'
    ],
    plugins: [
      shebang(),
      typescript({
        tsconfigOverride: {
          compilerOptions: {
            module: 'es2015',
            moduleResolution: 'node',
            declaration: true
          }
        }
      }),
      nodeResolve({ jsnext: true }),
      commonjs(),
      json(),
      babel(),
      terser()
    ]
  }
}

export default [settings({ name: 'index' }), settings({ name: 'cli' })]
