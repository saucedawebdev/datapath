import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import { resolve } from 'path';

const base = process.env.BASE_PATH || '/';

export default defineConfig({
  base,
  root: '.',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
    },
  },
  server: {
    port: 5173,
    open: true,
  },
  plugins: [
    VitePWA({
      registerType: 'prompt',
      includeAssets: ['icons/*.png', 'icons/*.svg'],
      manifest: {
        name: 'DATApath — Job Ready Edition',
        short_name: 'DATApath',
        description: '114 job-ready data analytics lessons',
        theme_color: '#22d3ee',
        background_color: '#0a0f1a',
        display: 'standalone',
        start_url: base,
        icons: [
          { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png' },
        ],
      },
      workbox: {
        cacheId: 'datapath-job-ready-v1',
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2,wasm}'],
        globIgnores: ['**/sql-asm*.js', '**/*-debug*.js', '**/worker.sql*.js'],
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
        navigateFallback: `${base}index.html`.replace('//', '/'),
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 },
            },
          },
          {
            urlPattern: /^https:\/\/cdn\.jsdelivr\.net\/pyodide\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'pyodide-cache',
              expiration: { maxEntries: 20, maxAgeSeconds: 60 * 60 * 24 * 30 },
            },
          },
        ],
      },
    }),
  ],
  optimizeDeps: {
    include: ['sql.js/dist/sql-wasm.js'],
  },
});
