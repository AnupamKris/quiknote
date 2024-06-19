// https://github.com/pi0/storyblok-nuxt
import { defineNuxtModule, addImports, createResolver } from "@nuxt/kit";

export default defineNuxtModule({
  setup(options, nuxt) {
    const names = ["appWindow"];

    names.forEach((name) =>
      addImports({ name, as: name, from: "@tauri-apps/api/window" })
    );
  },
});
