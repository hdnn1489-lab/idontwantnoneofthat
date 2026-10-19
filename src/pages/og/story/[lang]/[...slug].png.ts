import type { APIContext } from 'astro';
import { getPosts, isAdult, postLang, postSlug, type Post } from '../../../../lib/posts';
import { storyCard, png } from '../../../../lib/og';
import { SERIES, type SeriesKey } from '../../../../data/taxonomy';

// Only posts with a `quote` get a story card.
export async function getStaticPaths() {
  return (await getPosts())
    .filter((post) => post.data.quote && !isAdult(post))
    .map((post) => ({ params: { lang: postLang(post), slug: postSlug(post) }, props: { post } }));
}

export async function GET({ props }: APIContext) {
  const post = props.post as Post;
  const series = post.data.series as SeriesKey | undefined;
  return png(await storyCard({ quote: post.data.quote!, series, seriesLabel: series && SERIES[series][postLang(post)] }));
}
