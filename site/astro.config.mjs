// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // The full site URL. Canonical tags, the sitemap, robots.txt and schema
  // all read it from here. Change it when a custom domain is connected.
  site: 'https://matt-g20.github.io',
  integrations: [sitemap()],
});
