# Redesign der persönlichen Website

## Ausgangspunkt

Die Live-Seite vom 18. November 2026 und die Git-Historie zeigen zwei frühere Richtungen: ein technisches Case-basiertes Portfolio und einen Auftritt für Freelance- und Messearbeit in Waldgrün. Die neue Startseite stellt Studium und konkrete Projekte an den Anfang. Kooperation, Berufseinstieg und bezahlte Aufträge erhalten eigene Wege.

## Drei Richtungen

| Richtung             | Idee                                                                            | Bewertung                                                                                      |
| -------------------- | ------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| Technische Werkstatt | Helles Papier, Serifentitel, dunkler HaptIQ-Viewer und beschriftete Abbildungen | Zeigt echte Arbeit sofort und gibt unterschiedlichen Medien einen gemeinsamen Rahmen           |
| Nachtlabor           | Dunkler Vollbildentwurf mit dichtem Telemetrieraster                            | Passt zur Robotik, macht das Porträt und die anderen Arbeiten aber zu Nebenfiguren             |
| Reiseheft            | Breite Fotostrecken und eine biografische Eröffnung                             | Persönlicher Einstieg, setzt jedoch verfügbare und freigegebene Reise- und Porträtfotos voraus |

Gewählt ist die technische Werkstatt. Die Signatur ist eine Abbildungsleiste, die Ansicht, Herkunft und Aussagekraft des Bildes direkt zusammenführt. Im Hero koppelt sie das Handmodell an den zugehörigen Mess- und Auswertungskontext. Helles Steinpapier und ein säuerliches Gelbgrün unterstützen die Bildhierarchie. Instrument Serif und DM Sans stammen aus dem vorhandenen Paketbestand.

## Recherche und Auswahl

- [Jaime Rebollar](https://www.jaimerebollar.com/) zeigt technische Artefakte neben dem jeweils eigenen Beitrag. [Industrial Facility](https://www.industrialfacility.co.uk/) gibt den Arbeiten breite Bildflächen. [Josh W. Comeau](https://www.joshwcomeau.com/) bindet Interaktion dort ein, wo sie eine Erklärung verbessert.
- HaptIQ hat einen öffentlichen Quellstand und einen vorhandenen Viewer-Screenshot. EvoLab ergänzt den Software- und Experimentanteil. Picture to Print zeigt eine überprüfbare Verarbeitungskette mit öffentlichem Code. little detours zeigt die Verbindung von Gestaltung und Webentwicklung anhand der öffentlichen Vorschau.
- DealRadar, Uni Knowledge Hub und Website Generator wurden geprüft. Die Auswahl fiel auf vier Arbeiten, deren Aufbau und aktueller Stand sich mit zeigbarem Material erklären lassen.
- Studium, Neuseeland und persönliche Interessen kommen aus dem Briefing. Ein zur Veröffentlichung freigegebener Lebenslauf oder ein Porträt fand sich nicht. Private Repo-Links und Informationen aus interner Infrastruktur bleiben aus den Website-Inhalten.

## Umsetzung und Prüfung

1. Gemeinsame Hülle, visuelles System und Startseite entwickeln.
2. Ausgewählte Projekte als belegte Fallstudien, persönliche Seite und drei Kontaktwege ausarbeiten.
3. Statische englische Entsprechungen, SEO-Metadaten und bestehende Interaktionen verifizieren.
4. Produktionsbuild bei vier Breiten, Lighthouse und funktionale Browserprüfungen durchführen. Ergebnis und Vorschau auf dem Redesign-Branch dokumentieren.

## Sichtprüfung

- **Personalverantwortliche:** Name und Studiengang sind im ersten Bildschirm sichtbar. Bei HaptIQ steht der eigene Beitrag neben dem Projektstatus. Die Kontaktseite bietet einen eigenen Weg für Werkstudium und Praktikum.
- **Auftraggeber:** Websites, Automatisierung, KI-Integration und Prototypen stehen kompakt zusammen. Die Anfrage für Messearbeit ist weiterhin erreichbar, einschließlich des vorbereiteten Betreffs.
- **Gestaltung:** Die Abbildungsleiste unterscheidet Testdaten, Simulationszustand, Ablaufskizze und Druckentwurf. Die Desktop-Ansicht stellt die HaptIQ-Abbildung neben den Namen. Mobil folgt die Abbildung nach den beiden Einstiegen. Die Footer-Beschriftung erhielt bei der Sichtprüfung eine eigene Zeile.

## Vorschau und Freigabe

Vom Branch `redesign/personal-portfolio` aus `npm ci`, `npm run build` und `npm run preview` ausführen. Die Preview hört auf [localhost:4321](http://127.0.0.1:4321/). Die Sprachumschaltung nutzt statische Zielseiten. Mit JavaScript bleiben zusätzlich der Anfrageparameter und der Abschnittsanker erhalten. Screenshot-Dateien aus dem Browsertest liegen in `test-results/`.

Ein freigegebenes Porträt, ein öffentlich teilbarer Lebenslauf und ein Bild von einem realen 3D-Druck würden das Portfolio ergänzen. Die LinkedIn-Adresse ist vorgegeben, der automatisierte Abruf wurde mit Status 999 blockiert. Die anderen externen Projekt- und Profilziele antworteten mit HTTP 200.

Für eine geschäftliche Veröffentlichung bitte die freigegebenen Anbieterangaben und Angaben zur Verarbeitung bei Hosting und E-Mail-Kontakt klären. Grundlage für die Prüfung sind [§ 5 DDG](https://www.gesetze-im-internet.de/ddg/__5.html) und [Art. 13 DSGVO](https://eur-lex.europa.eu/eli/reg/2016/679/oj). Die Website bindet keine Tracking-Dienste ein. Der Farbmodus speichert lokal eine Einstellung. Kontaktlinks öffnen den E-Mail-Client. Die rechtlichen Veröffentlichungsdaten müssen vom Betreiber kommen.

## Messungen vom 19. November 2026

Der Produktionsbuild erzeugte 26 HTML-Seiten. Astro Check meldete keine Diagnosen. Alle 9 Node-Tests und 15 Playwright-Tests bestanden, einschließlich der vier Bildschirmbreiten, Tastaturbedienung, Navigation ohne JavaScript und automatisierter axe-Prüfungen für beide Sprachen und Farbschemata. Die internen Links und Assets wurden gegen den Build geprüft.

Lighthouse 13.6.0 im mobilen Simulationsprofil gegen die lokale Produktionsvorschau mit gesetzter SITE_URL. Jede Zeile ist ein Messlauf auf demselben lokalen System. Die Bewertung der öffentlichen Website hängt auch von Hosting, Verbindung und Endgerät ab.

| Seite       | Performance | Accessibility | Best Practices | SEO |    LCP |   CLS |
| ----------- | ----------: | ------------: | -------------: | --: | -----: | ----: |
| Startseite  |         100 |           100 |            100 | 100 | 1,68 s | 0,005 |
| HaptIQ Hand |         100 |           100 |            100 | 100 | 1,52 s | 0,001 |
| Signallabor |         100 |           100 |            100 | 100 | 0,82 s | 0,009 |

Der erste mobile Lauf fand auf der Startseite Performance 92. Bei der Einzelmessung ohne parallel laufende Browserprüfungen lag der Wert bei 100. Für den finalen Stand wurde zusätzlich die Farn-Abbildung auf 27 bis 133 KB je nach Auflösung reduziert.

Gzip der inline und per Modul eingebundenen Skripte ergab 443 Bytes auf der Startseite, 775 Bytes im Projektindex, 1.653 Bytes beim Kontakt und 1.342 Bytes im Labor. Das Laborskript wird ausschließlich auf der Laborseite eingebunden.
