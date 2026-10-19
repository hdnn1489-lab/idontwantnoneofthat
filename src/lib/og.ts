// Share images (link previews) and Instagram story cards, drawn at build time.
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { SITE } from '../site';

const require = createRequire(import.meta.url);
const file = (path: string) => readFileSync(require.resolve(`@expo-google-fonts/${path}`));

type Font = { name: string; data: Buffer; weight: 400 | 500 | 600; style: 'normal' | 'italic' };
let fonts: Font[] | undefined;
// Full Google Fonts files, so every Vietnamese diacritic is covered.
function loadFonts(): Font[] {
  return (fonts ??= [
    { name: 'Fraunces', data: file('fraunces/400Regular/Fraunces_400Regular.ttf'), weight: 400, style: 'normal' },
    { name: 'Fraunces', data: file('fraunces/400Regular_Italic/Fraunces_400Regular_Italic.ttf'), weight: 400, style: 'italic' },
    { name: 'Fraunces', data: file('fraunces/600SemiBold/Fraunces_600SemiBold.ttf'), weight: 600, style: 'normal' },
    { name: 'Fraunces', data: file('fraunces/600SemiBold_Italic/Fraunces_600SemiBold_Italic.ttf'), weight: 600, style: 'italic' },
    { name: 'Be Vietnam Pro', data: file('be-vietnam-pro/500Medium/BeVietnamPro_500Medium.ttf'), weight: 500, style: 'normal' },
    { name: 'Be Vietnam Pro', data: file('be-vietnam-pro/600SemiBold/BeVietnamPro_600SemiBold.ttf'), weight: 600, style: 'normal' },
  ]);
}

// Đèn mờ palette
const C = { bg: '#241A24', ink: '#F3E6EE', muted: '#B9A3B1', line: '#45343F', lip: '#FF5C93', onLip: '#2A0E1A', gold: '#E8C27A', goldBg: '#3B2F24' };

type Node = { type: string; props: Record<string, unknown> };
const h = (type: string, style: Record<string, unknown>, ...children: (Node | string | false | undefined)[]): Node => ({
  type,
  props: { style: { display: 'flex', ...style }, children: children.filter((c) => c !== false && c !== undefined) },
});

const wordmark = (size: number) =>
  h('div', { fontFamily: 'Fraunces', fontWeight: 600, fontSize: size, color: C.ink },
    SITE.name,
    h('span', { fontStyle: 'italic', color: C.lip }, SITE.tld));

const pill = (label: string, series: string | undefined, size: number) =>
  h('div', {
    fontFamily: 'Be Vietnam Pro', fontWeight: 600, fontSize: size,
    padding: `${size * 0.4}px ${size * 1.1}px`, borderRadius: 999, flexShrink: 0,
    background: series === 'some-of-this' ? C.goldBg : C.lip,
    color: series === 'some-of-this' ? C.gold : C.onLip,
  }, label);

async function toPng(node: Node, width: number, height: number) {
  const svg = await satori(node as any, { width, height, fonts: loadFonts() });
  return new Resvg(svg, { fitTo: { mode: 'width', value: width } }).render().asPng();
}

export async function linkPreview(opts: { title?: string; seriesLabel?: string; series?: string; lang?: string }) {
  const { title, seriesLabel, series, lang } = opts;
  const titleSize = !title ? 0 : title.length > 70 ? 54 : title.length > 45 ? 64 : 74;
  const node = h('div', { width: 1200, height: 630, background: C.bg, padding: 72, boxSizing: 'border-box', flexDirection: 'column', justifyContent: 'space-between' },
    h('div', { width: 1056, justifyContent: 'space-between', alignItems: 'center' },
      wordmark(34),
      seriesLabel ? pill(seriesLabel, series, 24) : false),
    title
      ? h('div', { fontFamily: 'Fraunces', fontSize: titleSize, lineHeight: 1.08, color: C.ink, letterSpacing: -1 }, title)
      : h('div', { flexDirection: 'column' },
          h('div', { fontFamily: 'Fraunces', fontSize: 92, lineHeight: 1.02, color: C.ink, flexWrap: 'wrap' },
            'Know what you',
            h('span', { fontStyle: 'italic', color: C.lip, padding: '0 24px' }, 'don’t'),
            'want.')),
    h('div', { justifyContent: 'space-between', alignItems: 'center', borderTop: `2px solid ${C.line}`, paddingTop: 28, fontFamily: 'Be Vietnam Pro', fontWeight: 500, fontSize: 24, color: C.muted },
      lang === 'vi' ? 'Chuyện tình cảm, nói thẳng.' : 'Relationship advice with boundaries.',
      h('span', { fontFamily: 'Fraunces', fontStyle: 'italic', color: C.gold }, 'Thôi, khỏi nha.')));
  return toPng(node, 1200, 630);
}

export async function storyCard(opts: { quote: string; seriesLabel?: string; series?: string }) {
  const { quote, seriesLabel, series } = opts;
  const size = quote.length > 120 ? 72 : quote.length > 80 ? 84 : 96;
  const node = h('div', { width: 1080, height: 1350, background: C.bg, padding: 96, boxSizing: 'border-box', flexDirection: 'column', justifyContent: 'space-between' },
    h('div', { width: 888, justifyContent: 'space-between', alignItems: 'center' },
      wordmark(40),
      seriesLabel ? pill(seriesLabel, series, 26) : false),
    h('div', { flexDirection: 'column' },
      h('div', { fontFamily: 'Fraunces', fontSize: 260, lineHeight: 0.8, height: 140, color: C.lip }, '“'),
      h('div', { fontFamily: 'Fraunces', fontStyle: 'italic', fontSize: size, lineHeight: 1.12, color: C.ink, letterSpacing: -1.5 }, quote)),
    h('div', { justifyContent: 'space-between', alignItems: 'center', borderTop: `2px solid ${C.line}`, paddingTop: 40, fontFamily: 'Be Vietnam Pro', fontWeight: 500, fontSize: 28, color: C.muted },
      SITE.instagram ? `@${SITE.instagram}` : `${SITE.name}${SITE.tld}`,
      h('span', { fontFamily: 'Fraunces', fontStyle: 'italic', color: C.gold }, 'Thôi, khỏi nha.')));
  return toPng(node, 1080, 1350);
}

export const png = (data: Uint8Array) =>
  new Response(data as unknown as BodyInit, { headers: { 'Content-Type': 'image/png' } });
