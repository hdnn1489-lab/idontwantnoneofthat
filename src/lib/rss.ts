import rss from '@astrojs/rss';
import { getPosts, postLang, postUrl } from './posts';
import { SITE } from '../site';
import type { Lang } from '../i18n';

// One feed per language, so readers subscribe to the language they read.
export async function feed(lang: Lang, site: URL | undefined) {
  const posts = (await getPosts()).filter((p) => postLang(p) === lang);
  return rss({
    title: `${SITE.name}${SITE.tld}${lang === 'vi' ? ' (Tiếng Việt)' : ''}`,
    description:
      lang === 'vi'
        ? 'Chuyện tình cảm, nói thẳng.'
        : 'Relationship advice with boundaries.',
    site: site ?? SITE.url,
    items: posts.map((p) => ({
      title: p.data.title,
      description: p.data.description,
      pubDate: p.data.date,
      link: postUrl(p),
    })),
    customData: `<language>${lang === 'vi' ? 'vi-vn' : 'en-us'}</language>`,
  });
}
