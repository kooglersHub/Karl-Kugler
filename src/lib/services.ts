import type { Locale } from './locale';

export const services = [
  {
    id: 'web',
    title: 'Websites & Software',
    description:
      'Websites und Webanwendungen entwickeln, Abläufe automatisieren und KI in bestehende Software einbinden.',
    brief:
      'Worum geht es? Was soll entstehen, und welchen Zeitrahmen hast du im Kopf?',
    en: {
      title: 'Websites & software',
      description:
        'Build a website or web app, automate a workflow or integrate AI into existing software.',
      brief:
        'What are you working on? What should we build, and what timeframe do you have in mind?',
    },
  },
  {
    id: 'technik',
    title: 'Technische Unterstützung',
    description:
      'Prototypen aufbauen, Schnittstellen untersuchen oder einen technischen Versuch auswerten.',
    brief:
      'Welche technische Aufgabe steht an? Welche Systeme oder Materialien sind bereits vorhanden?',
    en: {
      title: 'Technical support',
      description:
        'Build prototypes, investigate interfaces or evaluate a technical experiment.',
      brief:
        'What technical task are you tackling? Which systems or materials are already in place?',
    },
  },
  {
    id: 'messe',
    title: 'Messe & Host',
    description:
      'Produkte präsentieren, Technik erklären und Besuchende auf Messen betreuen.',
    brief:
      'Welche Veranstaltung, welcher Ort und welche Termine? Welche Aufgaben soll ich vor Ort übernehmen?',
    en: {
      title: 'Trade fairs & events',
      description:
        'Present products, explain technology and help visitors at trade fairs.',
      brief:
        'Which event, location and dates? What would you like me to do on site?',
    },
  },
] as const;

export function getService(id: string | null) {
  return services.find((service) => service.id === id);
}

export function createEnquiryHref(
  email: string,
  id: string | null,
  locale: Locale = 'de',
): string {
  const service = getService(id);
  const en = locale === 'en';
  const copy = en ? service?.en : service;
  const subject = copy
    ? `${en ? 'Enquiry' : 'Anfrage'}: ${copy.title}`
    : en
      ? 'Working together'
      : 'Anfrage zur Zusammenarbeit';
  const greeting = en ? 'Hi Karl,' : 'Hallo Karl,';
  const fallback = en
    ? 'I would like to talk about working together.'
    : 'Ich möchte mit dir über eine Zusammenarbeit sprechen.';
  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`${greeting}\n\n${copy?.brief ?? fallback}\n\n`)}`;
}
