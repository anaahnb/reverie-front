// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  plugins: [
    { src: '~/plugins/axios.js', ssr: false },
  ],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @import "@/assets/scss/_colors.scss";
            @import "@/assets/scss/_mixins.scss";
            @import "@/assets/scss/_base.scss";
          `,
        },
      },
    },
  }
})

