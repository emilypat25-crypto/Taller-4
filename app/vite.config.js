import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ['favicon.ico', 'robots.txt', 'logo-640x480.png', 'app-icon-512x512.png', 'logo-moneda192x192.png'],
      manifest: {
        name: 'Mis Gastos Diarios',                          // ← nombre completo
        short_name: 'MisGastos',                             // ← nombre corto (ícono)
        description: 'Controla tus gastos diarios de forma fácil y rápida',  // ← descripción
        start_url: '/',
        display: "standalone",
        background_color: "#1B4D36",                         // ← verde oscuro del proyecto
        theme_color: '#2E7D5A',                              // ← verde principal

        screenshots: [
          {
            src: '/img/logo-640x480.png',
            sizes: '640x480',
            type: 'image/png',
            form_factor: 'narrow',
          },
          {
            src: '/img/logo-640x480.png',
            sizes: '640x480',
            type: 'image/png',
            form_factor: 'wide',
          }
        ],
        icons: [
          {
            src: '/img/logo-moneda-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/img/app-icon-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
})