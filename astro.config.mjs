// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://studiomuadesign.it',
  i18n: {
    defaultLocale: "it",
    locales: ["it", "en"],
    routing: {
      prefixDefaultLocale: false
    }
  }
});
