const DATE_ONLY_PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/;

const FORMAT_VARIANTS = {
  short: {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  },
  long: {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  },
  full: {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  },
};

function normalizeDateOnlyString(value) {
  if (typeof value !== 'string') {
    return null;
  }

  const trimmed = value.trim();
  const match = DATE_ONLY_PATTERN.exec(trimmed);
  if (!match) {
    return null;
  }

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);

  const utcDate = new Date(Date.UTC(year, month - 1, day));
  const isValidDate =
    utcDate.getUTCFullYear() === year &&
    utcDate.getUTCMonth() === month - 1 &&
    utcDate.getUTCDate() === day;

  if (!isValidDate) {
    return null;
  }

  return trimmed;
}

export function formatEventDate(
  dateValue,
  { variant = 'short', locale, fallback = 'Date TBA' } = {}
) {
  const normalizedDate = normalizeDateOnlyString(dateValue);
  if (!normalizedDate) {
    return fallback;
  }

  const [yearRaw, monthRaw, dayRaw] = normalizedDate.split('-');
  const year = Number(yearRaw);
  const month = Number(monthRaw);
  const day = Number(dayRaw);

  const utcDate = new Date(Date.UTC(year, month - 1, day));
  const formatOptions = FORMAT_VARIANTS[variant] || FORMAT_VARIANTS.short;

  return new Intl.DateTimeFormat(locale, {
    ...formatOptions,
    timeZone: 'UTC',
  }).format(utcDate);
}
