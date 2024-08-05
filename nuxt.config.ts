// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: ["vuetify-nuxt-module"],
  routeRules: {
    // Add cors headers on API routes
    "/api/**": { cors: true },
  },
  runtimeConfig: {
    public: {
      baseURL: "",
    },
  },
  vuetify: {
    moduleOptions: {
      /* module specific options */
    },
    vuetifyOptions: {
      /* vuetify options */
      theme: {
        themes: {
          light: {
            dark: false,
            colors: {},
          },
        },
      },
    },
  },
});
