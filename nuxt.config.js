const i18nConfig = require("./i18n.config");
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/i18n', 'nuxt-swiper', '@pinia/nuxt', '@sidebase/nuxt-pdf'],
  css: [
    '~/assets/scss/main.scss',
  ],
  i18n: i18nConfig,

  app: { head: { charset: 'utf-16', viewport: 'width=500, initial-scale-1', title: 'Inout', meta: [{ name: 'reklama xizmatlari' }] } }


})