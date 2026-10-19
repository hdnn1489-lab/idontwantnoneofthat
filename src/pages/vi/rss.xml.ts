import { feed } from '../../lib/rss';
export const GET = (context: { site: URL }) => feed('vi', context.site);
