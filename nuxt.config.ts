// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@nuxt/eslint'
  ],

  tailwindcss: {
    exposeConfig: true,
    cssPath: '~/assets/css/main.css',
    config: {
      darkMode: 'class'
    }
  },

  app: {
    head: {
      title: 'Nuxt 3 Dashboard',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Modern Nuxt 3 Dashboard with Tailwind CSS' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  },

  runtimeConfig: {
    // Private keys (only available on server)
    apiSecret: process.env.API_SECRET || '',
    
    // Public keys (exposed to client)
    public: {
      apiBase: process.env.API_BASE_URL || 'https://api.example.com'
    }
  }
})
