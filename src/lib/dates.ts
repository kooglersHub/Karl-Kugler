import type { Locale } from './locale';

export function formatMonthYear(date: Date, locale: Locale = 'de'): string {
  return date
    .toLocaleDateString(locale === 'en' ? 'en-GB' : 'de-DE', {
      month: 'short',
      year: 'numeric',
      timeZone: 'UTC',
    })
    .replace('.', '')
    .toUpperCase();
}
