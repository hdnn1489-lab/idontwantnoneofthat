import type { APIContext } from 'astro';
import { getPosts, postLang, postSlug, type Post } from '../../../lib/posts';
import { linkPreview, png } from '../../../lib/og';
import { SERIES, type SeriesKey } from '../../../data/taxonomy';

export async function getStaticPaths() {
  return (await getPosts()).map((post) => ({
    params: { lang: postLang(post), slug: postSlug(post) },
    props: { post },
  }));
}

export async function GET({ props }: APIContext) {
  const post = props.post as Post;
  const lang = postLang(post);
  const series = post.data.series as SeriesKey | undefined;
  return png(await linkPreview({ title: post.data.title, series, seriesLabel: series && SERIES[series][lang], lang }));
}
