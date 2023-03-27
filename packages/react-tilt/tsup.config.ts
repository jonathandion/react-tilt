import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.tsx'],
  format: 'esm',
  dts: false,
  external: ['react', 'react-dom'],
  outExtension: () => ({ js: '.js' }),
  target: 'es2016',
})
