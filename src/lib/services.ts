export const services = [
  {
    id: 'web',
    title: 'Websites & Software',
    description:
      'Konzeption, Umsetzung und Weiterentwicklung von Websites, Web-Apps und individuellen Lösungen.',
    brief:
      'Worum geht es? Was soll entstehen, und welchen Zeitrahmen hast du im Kopf?',
  },
  {
    id: 'technik',
    title: 'Technische Unterstützung',
    description:
      'Unterstützung bei technischen Projekten, Prototypen, Automatisierung und kniffligen Aufgaben.',
    brief:
      'Welche technische Aufgabe steht an? Welche Systeme oder Materialien sind bereits vorhanden?',
  },
  {
    id: 'messe',
    title: 'Messe & Host',
    description:
      'Produkte präsentieren, Technik erklären, Besucher betreuen – vor Ort auf Messen und Events.',
    brief:
      'Welche Veranstaltung, welcher Ort und welche Termine? Welche Aufgaben soll ich vor Ort übernehmen?',
  },
] as const;
export function getService(id: string | null) {
  return services.find((service) => service.id === id);
}
export function createEnquiryHref(email: string, id: string | null): string {
  const service = getService(id);
  const subject = service
    ? `Anfrage: ${service.title}`
    : 'Anfrage zur Zusammenarbeit';
  const body = `Hallo Karl,\n\n${service?.brief ?? 'Ich möchte mit dir über eine Zusammenarbeit sprechen.'}\n\n`;
  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
