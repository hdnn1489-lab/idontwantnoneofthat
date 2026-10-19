import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { readdirSync, readFileSync } from 'node:fs';

// R18 posts stay out of the sitemap (they also carry a noindex tag).
const adultPaths = ['en', 'vi'].flatMap((lang) =>
  readdirSync(`./src/content/posts/${lang}`)
    .filter((f) => f.endsWith('.md'))
    .filter((f) => /^series:\s*['"]?r18['"]?\s*$/m.test(readFileSync(`./src/content/posts/${lang}/${f}`, 'utf8')))
    .map((f) => `/${lang}/${f.replace(/\.md$/, '')}/`),
);

export default defineConfig({
  site: 'https://idontwantnoneofthat.lol',
  trailingSlash: 'ignore',
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/series/r18/') && !adultPaths.some((p) => page.endsWith(p)),
    }),
  ],
});
