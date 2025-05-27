// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite"
export default defineNuxtConfig({
  runtimeConfig: {
    geminiapikey: process.env.GOOGLE_GENERATIVE_API_KEY,
  },
  vite: {
    plugins: [tailwindcss()],
  },
  css: ['~/assets/main.css'],
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
    modules: [
        '@pinia/nuxt',
    ]
})
