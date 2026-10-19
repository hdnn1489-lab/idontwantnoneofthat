// Series and topic tags. Each has one key (used in post files and URLs)
// and a label per language, so English and Vietnamese posts share topic pages.

export const SERIES = {
  'none-of-that': {
    en: 'None of that',
    vi: 'None of that',
    blurb: {
      en: 'Red flags, dealbreakers, and things you are allowed to walk away from.',
      vi: 'Dấu hiệu đáng lo, những điều không nên chấp nhận, và lúc nên rời đi.',
    },
  },
  'some-of-this': {
    en: 'Some of this',
    vi: 'Some of this',
    blurb: {
      en: 'Green flags and what healthy actually looks like.',
      vi: 'Dấu hiệu tốt, và một mối quan hệ lành mạnh thực sự trông như thế nào.',
    },
  },
} as const;

export const TAGS = {
  dating: { en: 'Dating', vi: 'Hẹn hò' },
  situationships: { en: 'Situationships', vi: 'Mập mờ' },
  breakups: { en: 'Breakups', vi: 'Chia tay' },
  communication: { en: 'Communication', vi: 'Giao tiếp' },
  boundaries: { en: 'Boundaries', vi: 'Ranh giới' },
  'self-respect': { en: 'Self-respect', vi: 'Tự trọng' },
  family: { en: 'Family', vi: 'Gia đình' },
  friendship: { en: 'Friendship', vi: 'Tình bạn' },
  'grief-and-loss': { en: 'Grief and loss', vi: 'Mất mát' },
} as const;

export type SeriesKey = keyof typeof SERIES;
export type TagKey = keyof typeof TAGS;
export const SERIES_KEYS = Object.keys(SERIES) as SeriesKey[];
export const TAG_KEYS = Object.keys(TAGS) as TagKey[];
