import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    open: 'example/index.html',
  },
  build: {
    emptyOutDir: false,
    target: 'esnext',
    minify: 'terser',
    lib: {
      entry: resolve(__dirname, 'www/index-single.ts'),
      fileName: (format) => `wlipsync-single.${format}.js`,
      formats: ['es', 'cjs'],
    },
  }
})