import type { APIContext } from 'astro';
import { getPosts, isAdult, postLang, postSlug, type Post } from '../../../lib/posts';
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
  // R18 previews never show the title, so shared links stay discreet.
  return png(await linkPreview({ title: isAdult(post) ? undefined : post.data.title, series, seriesLabel: series && SERIES[series][lang], lang }));
}
