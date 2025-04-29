// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    "@unocss/nuxt",
    "shadcn-nuxt",
    "@vueuse/nuxt",
    "@nuxt/eslint",
    "@nuxt/icon",
    "@pinia/nuxt",
    "@nuxtjs/color-mode",
  ],

  plugins: ['~/plugins/ofetch', '~/plugins/antd'],

  css: [
    '@unocss/reset/tailwind.css',
    'ant-design-vue/dist/reset.css'
  ],

  build: {
    transpile: ['ant-design-vue']
  },

  vite: {
    ssr: {
      noExternal: ['ant-design-vue']
    }
  },

  colorMode: {
    classSuffix: "",
  },

  runtimeConfig: {
    public: {
      apiBase: process.env.APP_SERVER_URL || '',
    },
  },

  features: {
    // For UnoCSS
    inlineStyles: false,
  },

  eslint: {
    config: {
      standalone: false,
    },
  },

  routeRules: {
    "/components": { redirect: "/components/accordion" },
    "/settings": { redirect: "/settings/profile" },
  },

  imports: {
    dirs: ["./lib"],
  },

  compatibilityDate: "2024-12-14",
});
