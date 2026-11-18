export type Locale = 'de' | 'en';

export function localeFor(pathname: string): Locale {
  return pathname.startsWith('/en/') ? 'en' : 'de';
}

export function localPath(locale: Locale, path: string): string {
  return locale === 'en' ? `/en${path}` : path;
}

export function otherLanguage(pathname: string, locale: Locale): string {
  return locale === 'en' ? pathname.slice(3) : localPath('en', pathname);
}
