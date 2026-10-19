import { linkPreview, png } from '../../lib/og';
export const GET = async () => png(await linkPreview({}));
