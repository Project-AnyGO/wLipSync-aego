import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    open: 'example/index.html',
  },
  build: {
    target: 'esnext',
    minify: true,
    lib: {
      entry: resolve(__dirname, 'www/index.ts'),
      fileName: (format) => `wlipsync.${format}.js`,
      formats: ['es', 'cjs'],
    },
  },
  publicDir: 'www/public/'
})