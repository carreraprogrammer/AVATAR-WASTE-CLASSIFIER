import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'avatar.riv', 'audio/*.mp3', 'icons/*.png'],
      manifest: {
        name: 'EcoAssistant Kiosk',
        short_name: 'EcoAssist',
        description: 'AI-powered waste classification kiosk with emotional avatar',
        start_url: '/',
        display: 'fullscreen',
        orientation: 'portrait',
        theme_color: '#28a745',
        background_color: '#ffffff',
        icons: [
          {
            src: '/icons/icon-192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any maskable'
          },
          {
            src: '/icons/icon-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,riv,mp3}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/api\./,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 300 // 5 minutes
              },
              networkTimeoutSeconds: 10
            }
          },
          {
            urlPattern: /^https:\/\/.*\.amazonaws\.com/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'aws-assets-cache',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 86400 // 24 hours
              }
            }
          }
        ]
      },
      devOptions: {
        enabled: true,
        type: 'module'
      }
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@/atoms': path.resolve(__dirname, './src/atoms'),
      '@/molecules': path.resolve(__dirname, './src/molecules'),
      '@/organisms': path.resolve(__dirname, './src/organisms'),
      '@/templates': path.resolve(__dirname, './src/templates'),
      '@/pages': path.resolve(__dirname, './src/pages'),
      '@/services': path.resolve(__dirname, './src/services'),
      '@/store': path.resolve(__dirname, './src/store'),
      '@/hooks': path.resolve(__dirname, './src/hooks'),
      '@/utils': path.resolve(__dirname, './src/utils'),
      '@/types': path.resolve(__dirname, './src/types'),
      '@/constants': path.resolve(__dirname, './src/constants'),
      '@/config': path.resolve(__dirname, './src/config'),
      '@/assets': path.resolve(__dirname, './src/assets')
    }
  },
  build: {
    target: 'esnext',
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', '@ionic/react'],
          ai: ['@tensorflow/tfjs', '@tensorflow-models/coco-ssd'],
          rive: ['@rive-app/react-canvas'],
          state: ['zustand']
        }
      }
    },
    chunkSizeWarningLimit: 1000
  },
  optimizeDeps: {
    include: [
      '@tensorflow/tfjs',
      '@tensorflow-models/coco-ssd',
      '@rive-app/react-canvas'
    ]
  },
  server: {
    port: 3000,
    host: true
  }
});
