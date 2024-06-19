// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,
  css: ["@/assets/main.scss"],
  modules: ["@nuxt/ui", "nuxt-lucide-icons", "@vueuse/nuxt"],
  lucide: {
    namePrefix: "I",
  },
});
