# idontwantnoneofthat.lol

A bilingual (English / Tiếng Việt) relationship-advice blog. Built with [Astro](https://astro.build), hosted free on Cloudflare, edited through Pages CMS.

## Writing a post

**Easiest: Pages CMS.** Go to [app.pagescms.org](https://app.pagescms.org), sign in with GitHub, open this repository, and pick *Posts (English)* or *Bài viết (Tiếng Việt)*. New posts start as **drafts**; untick *Draft* when it's ready, save, and the site updates in a minute or two.

**Or edit files directly.** Posts are Markdown files in `src/content/posts/en/` or `src/content/posts/vi/`. The folder sets the language, the file name becomes the URL.

```md
---
title: He flaked three times. Now he wants a fourth?
description: One or two sentences for cards and link previews.
date: 2026-10-19
series: none-of-that        # or some-of-this
tags: [dating, situationships]
authors: [you]              # you, co-author, or both
illustrator: co-author
translationKey: flaked      # same word on the translation links the two
contentNote: grief          # optional warning for heavy posts
quote: One standout line for the Instagram story card.
draft: false
---

Your post here. Use `## ` for subheadings and `> ` for a big pull quote.
```

- **R18 posts** (`series: r18`) only appear on the R18 page, behind an 18+ confirmation. They're left out of the homepage, topic pages, RSS feeds, the sitemap and search engines, and their link previews never show the title.
- **Translations are optional.** Give both versions the same `translationKey` and each shows a link to the other.
- **Topics** are listed in `src/data/taxonomy.ts` with an English and Vietnamese label. Add new ones there (and in `.pages.yml`).
- **Share images** are generated automatically for every post. Posts with a `quote` also get a 1080×1350 story card, downloadable from the post page.

## Site settings

`src/site.ts`: Instagram handle and the Tally form ID for the anonymous question box.
`src/content/authors/`: names and bios.
`src/styles/global.css` (top of file): the Daylight and Đèn mờ palettes.
`src/i18n.ts`: all interface text in both languages.

## Before launch

- [ ] Replace the sample posts in `src/content/posts/` with real ones.
- [ ] Fill in names and bios in `src/content/authors/`.
- [ ] Write the about page text (`src/components/AboutPage.astro`).
- [ ] Add verified hotlines to `src/components/SupportPage.astro`.
- [ ] Create the Tally form and add its ID and the Instagram handle to `src/site.ts`.

## Deploying (one-time setup)

1. **Cloudflare:** Workers & Pages → Create → import this repo. Build command `npm run build`, deploy command `npx wrangler deploy`. The deploy settings (serve `dist/` as a static site) live in `wrangler.jsonc`, and the Node version comes from `.node-version`. Every push to `main` redeploys.
2. **Domain:** add `idontwantnoneofthat.lol` as a site in Cloudflare, then at Name.com replace the nameservers with the two Cloudflare shows. Back in the project → Domains → add `idontwantnoneofthat.lol` and `www.idontwantnoneofthat.lol`. HTTPS is automatic.
3. **Analytics (optional):** project → Metrics → enable Web Analytics.

## Running it on a computer

```sh
npm install
npm run dev      # preview at http://localhost:4321 (drafts are visible here)
npm run build    # production build into dist/
```
