import resolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
import commonjs from '@rollup/plugin-commonjs'

import pkg from './package.json'

const moduleName = pkg.name.replace(/^@.*\//, '')

export default [
  {
    input: 'index.ts',
    output: [
      {
        name: moduleName,
        file: pkg.browser,
        format: 'iife',
        sourcemap: 'inline',
      },
    ],
    external: [...Object.keys(pkg.devDependencies || {})],
    plugins: [
      resolve(),
      typescript(),
      commonjs({ extensions: ['.ts', '.js'] }),
    ],
  },
  {
    input: 'index.ts',
    output: [
      {
        file: pkg.main,
        format: 'cjs',
        sourcemap: 'inline',
      },
      {
        file: pkg.module,
        format: 'es',
        sourcemap: 'inline',
      },
    ],
    external: [
      ...Object.keys(pkg.dependencies || {}),
      ...Object.keys(pkg.devDependencies || {}),
    ],
    plugins: [
      resolve(),
      typescript(),
      commonjs({ extensions: ['.ts', '.js'] }),
    ],
  },
]
