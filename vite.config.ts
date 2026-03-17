import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    VitePWA({
    includeAssets: ["**/*.{png}"],
    registerType: 'prompt',
    injectRegister: false,

    pwaAssets: {
      disabled: false,
      config: true,
    },

    manifest: {
      name: 'MyCardGame',
      short_name: 'MyCardGame',
      description: 'Beast card game',
      theme_color: '#2a2828',
      background_color: '#2a2828',
      display: 'standalone',
      orientation: 'landscape-primary',
      icons: [
        {
          src: '/assets/favicons/192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: '/assets/favicons/512x512.png',
          sizes: '512x512',
          type: 'image/png',
        },
      ],
    },

    workbox: {
      globPatterns: ['**/*.{js,css,html,svg,png,ico}'],
      cleanupOutdatedCaches: true,
      clientsClaim: true,
      maximumFileSizeToCacheInBytes: 10 * 1024 * 1024, 
    },

    devOptions: {
      enabled: true,
      navigateFallback: 'index.html',
      suppressWarnings: true,
      type: 'module',
    },
  })],
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
  }
})