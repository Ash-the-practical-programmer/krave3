// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite"
export default defineNuxtConfig({
  runtimeConfig: {
    geminiapikey: process.env.OPEN_API_KEY,
  },
  vite: {
      plugins: [tailwindcss()],
      build: {
          rollupOptions: {
              external: ['@ai-sdk/vue', '@ai-sdk/google'],
          },
      },
  },
  css: ['~/assets/main.css'],
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
    modules: [
        '@pinia/nuxt',
    ]
})
