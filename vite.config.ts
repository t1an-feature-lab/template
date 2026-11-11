import {fileURLToPath, URL} from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import {defineConfig, loadEnv} from 'vite'

export default defineConfig(({mode}) => {
  const port = loadEnv(mode, process.cwd(), 'PORT').PORT || '8080'

  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {'@': fileURLToPath(new URL('./src', import.meta.url))},
    },
    server: {
      proxy: {'/api': `http://127.0.0.1:${port}`},
    },
  }
})
