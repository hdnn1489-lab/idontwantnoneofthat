export type Lang = 'en' | 'vi';
export const LANGS: Lang[] = ['en', 'vi'];

// Interface text. Posts themselves are written in whichever language you like.
export const UI = {
  en: {
    tagline: 'Relationship advice · English and Tiếng Việt',
    heroLead: 'Know what you',
    heroEm: "don't",
    heroTail: 'want.',
    heroBody:
      'Honest, psychology-grounded takes on dating, situationships, and the people who keep you guessing. From two friends with zero patience for flakes.',
    readLatest: 'Read the latest',
    askCta: 'Ask us anonymously',
    navPosts: 'Posts',
    navAsk: 'Ask anonymously',
    navAbout: 'About',
    recent: 'Recent',
    all: 'All',
    readIt: 'Read it →',
    minRead: 'min read',
    by: 'By',
    and: 'and',
    illustrationBy: 'Illustration by',
    alsoIn: 'Đọc bằng Tiếng Việt →',
    contentNote: 'Content note',
    furtherReading: 'Further reading',
    notTherapy:
      "This isn't therapy. If a situation feels unsafe or too heavy to carry alone, talking to a professional can help.",
    supportResources: 'Support resources',
    whosTalking: "Who's talking",
    keepReading: 'Keep reading',
    share: 'Share',
    storyCard: 'Get the story card',
    linkCopied: 'Link copied',
    askTitle: 'Got a situation?',
    askEm: 'Ask anonymously.',
    askBody: 'No names, no email, no judgment. We change identifying details before anything gets published.',
    askBoth: 'English or Tiếng Việt, both welcome.',
    askPlaceholder: 'The question form is coming soon.',
    madeWith: 'Made with boundaries.',
    themeToggle: 'Switch between light and dark mode',
    menu: 'Menu',
    topics: 'Topics',
    noPosts: 'Nothing here yet. Soon.',
    postsIn: 'Posts in',
    tagged: 'Tagged',
  },
  vi: {
    tagline: 'Chuyện tình cảm · Tiếng Việt và English',
    heroLead: 'Biết rõ mình',
    heroEm: 'không',
    heroTail: 'muốn gì.',
    heroBody:
      'Những góc nhìn thẳng thắn, có cơ sở tâm lý học, về hẹn hò, mập mờ, và những người cứ khiến bạn phải đoán. Từ hai người bạn hết kiên nhẫn với kiểu hứa rồi lặn.',
    readLatest: 'Đọc bài mới nhất',
    askCta: 'Hỏi ẩn danh',
    navPosts: 'Bài viết',
    navAsk: 'Hỏi ẩn danh',
    navAbout: 'Giới thiệu',
    recent: 'Mới đây',
    all: 'Tất cả',
    readIt: 'Đọc bài →',
    minRead: 'phút đọc',
    by: 'Viết bởi',
    and: 'và',
    illustrationBy: 'Minh họa:',
    alsoIn: 'Read in English →',
    contentNote: 'Lưu ý nội dung',
    furtherReading: 'Đọc thêm',
    notTherapy:
      'Đây không phải là trị liệu. Nếu một tình huống khiến bạn thấy không an toàn hoặc quá nặng nề để tự gánh, hãy tìm đến chuyên gia.',
    supportResources: 'Nguồn hỗ trợ',
    whosTalking: 'Người viết',
    keepReading: 'Đọc tiếp',
    share: 'Chia sẻ',
    storyCard: 'Tải ảnh story',
    linkCopied: 'Đã sao chép link',
    askTitle: 'Có chuyện muốn hỏi?',
    askEm: 'Hỏi ẩn danh nhé.',
    askBody: 'Không tên, không email, không phán xét. Mọi chi tiết nhận dạng đều được thay đổi trước khi đăng.',
    askBoth: 'Tiếng Việt hay English đều được.',
    askPlaceholder: 'Form đặt câu hỏi sắp có.',
    madeWith: 'Made with boundaries.',
    themeToggle: 'Chuyển chế độ sáng / tối',
    menu: 'Menu',
    topics: 'Chủ đề',
    noPosts: 'Chưa có gì ở đây. Sắp có.',
    postsIn: 'Bài trong',
    tagged: 'Chủ đề',
  },
} as const;

export const t = (lang: Lang) => UI[lang];

// URL helpers: English lives at the root, Vietnamese under /vi/.
export const home = (lang: Lang) => (lang === 'en' ? '/' : '/vi/');
export const page = (lang: Lang, path: string) => (lang === 'en' ? `/${path}/` : `/vi/${path}/`);
export const other = (lang: Lang): Lang => (lang === 'en' ? 'vi' : 'en');

export function formatDate(date: Date, lang: Lang) {
  return date.toLocaleDateString(lang === 'vi' ? 'vi-VN' : 'en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'Asia/Ho_Chi_Minh',
  });
}
