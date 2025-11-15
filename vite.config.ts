import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import checker from 'vite-plugin-checker'
import { resolve } from 'path'

const ENV_PREFIX = 'REACT_APP_'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, 'env', ENV_PREFIX)
  return {
    base: '/weather/',
    plugins: [
      react(),
      svgr(),
      checker({
        terminal: false,
        overlay: {
          initialIsOpen: false,
        },
        eslint: {
          lintCommand: 'eslint ./**/*.{ts,tsx}',
        },
      }),
    ],
    server: {
      port: 3000,
      open: env.SERVER_OPEN_BROWSER === 'true',
      host: '0.0.0.0',
    },
    resolve: {
      alias: {
        '@assets': resolve(__dirname, './assets'),
      },
    },
    assetsInclude: ['**/*.lottie'],
  }
})
