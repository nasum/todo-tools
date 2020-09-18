import resolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import builtins from 'builtin-modules'

import pkg from './package.json'

const moduleName = pkg.name.replace(/^@.*\//, '')

export default [
  {
    input: './src/index.ts',
    output: {
      banner: '#!/usr/bin/env node',
      name: moduleName,
      file: pkg.bin.todo,
      format: 'cjs',
      sourcemap: 'inline',
      extend: true,
      exports: 'default',
    },
    external: [...Object.keys(pkg.devDependencies || {}), ...builtins],
    plugins: [resolve({ externalBuiltins: true }), typescript(), commonjs({ extensions: ['.ts', '.js'] }), json()],
  },
]
