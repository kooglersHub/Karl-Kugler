export function formatMonthYear(date: Date): string {
  return date
    .toLocaleDateString('de-DE', {
      month: 'short',
      year: 'numeric',
      timeZone: 'UTC',
    })
    .replace('.', '')
    .toUpperCase();
}
