import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://idontwantnoneofthat.lol',
  trailingSlash: 'ignore',
  integrations: [sitemap()],
});
