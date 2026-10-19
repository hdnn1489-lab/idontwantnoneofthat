import { getCollection, type CollectionEntry } from 'astro:content';
import type { Lang } from '../i18n';

export type Post = CollectionEntry<'posts'>;

export const postLang = (p: Post): Lang => (p.id.startsWith('vi/') ? 'vi' : 'en');
export const postSlug = (p: Post) => p.id.split('/').slice(1).join('/');
export const postUrl = (p: Post) => `/${postLang(p)}/${postSlug(p)}/`;

export function readingTime(p: Post) {
  const words = (p.body ?? '').trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 220));
}

// Drafts show while you preview locally, never on the live site.
export async function getPosts() {
  const all = await getCollection('posts', (p) => import.meta.env.DEV || !p.data.draft);
  return all.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export function findTranslation(post: Post, all: Post[]) {
  const key = post.data.translationKey;
  if (!key) return undefined;
  return all.find((p) => p !== post && p.data.translationKey === key && postLang(p) !== postLang(post));
}

// For combined feeds: show one card per story, preferring the reader's language.
export function dedupeForLang(all: Post[], lang: Lang) {
  const seen = new Set<string>();
  const out: Post[] = [];
  const preferred = [...all].sort((a, b) => Number(postLang(b) === lang) - Number(postLang(a) === lang));
  const keep = new Set<Post>();
  for (const p of preferred) {
    const k = p.data.translationKey;
    if (k && seen.has(k)) continue;
    if (k) seen.add(k);
    keep.add(p);
  }
  for (const p of all) if (keep.has(p)) out.push(p);
  return out;
}
