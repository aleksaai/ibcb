

# Redesign der Event-Karten und Trennung des Church Service

## Übersicht

Wir werden drei Hauptänderungen vornehmen:
1. **Verbessertes Dropdown-Design** - Die aufklappbare Inhaltsbox wird nahtlos mit der Hauptkarte verbunden
2. **Neue "Church Service Information" Karte** - Eine separate aufklappbare Karte mit Google Maps Integration
3. **Neuer Beschreibungstext** - Der Footer-Text wird durch den neuen Community-Text ersetzt

---

## Änderungen im Detail

### 1. Verbessertes Dropdown-Design (EventCard.tsx)

**Problem:** Der aufklappbare Bereich sieht wie ein separates Element aus - nicht als Teil der Hauptkarte.

**Lösung:**
- Die Hauptkarte bekommt **abgerundete Ecken nur oben**, wenn geöffnet
- Der aufklappbare Inhalt hat **abgerundete Ecken nur unten**
- Gleiche Hintergrundfarbe und Schatten für ein einheitliches Aussehen
- Sanfte Übergangs-Animation beim Öffnen/Schließen
- Kein sichtbarer Rand zwischen Trigger und Content

### 2. Neue ChurchServiceCard Komponente

**Neue Datei:** `src/components/ChurchServiceCard.tsx`

Diese Karte enthält:
- Titel: "Church Service Information"
- Das gleiche Calendar-Icon wie die Event-Karte
- Beim Aufklappen:
  - **Zeit:** Sundays 10:30am
  - **Adresse:** Budapest, Törökvész út 48/54, 1025
  - **Google Maps Embed:** Ein eingebetteter Kartenausschnitt der Adresse
  - **"Get in touch" Button**

### 3. Aktualisierte EventCard

- "Church Service" wird aus der Event-Liste entfernt
- Nur noch "Bible Studies" und "Monthly Evening Hangout" werden angezeigt
- Das verbesserte, nahtlose Design wird angewendet

### 4. Neuer Beschreibungstext (Index.tsx)

Der alte Footer-Text:
> "Die DestinyMedia GmbH, Pengoro UG, Voico AI GmbH..."

Wird ersetzt durch:
> "We are an international christian community of young adults living in Budapest. We are part of the International Baptist Church of Budapest (IBCB)"

---

## Technische Details

### Dateien die geändert werden:

| Datei | Änderung |
|-------|----------|
| `src/components/EventCard.tsx` | Redesign für nahtloses Dropdown, "Church Service" entfernen |
| `src/components/ChurchServiceCard.tsx` | **Neu erstellen** - Separate Karte mit Google Maps |
| `src/pages/Index.tsx` | Neue ChurchServiceCard hinzufügen, Footer-Text aktualisieren |

### Google Maps Embed

Für die Adresse "Budapest, Törökvész út 48/54, 1025" wird ein Google Maps iframe eingebettet:

```text
+------------------------------------------+
|  Church Service Information        [▼]   |
+------------------------------------------+
|  📍 Sundays 10:30am                      |
|  Budapest, Törökvész út 48/54, 1025      |
|                                          |
|  +------------------------------------+  |
|  |                                    |  |
|  |      [Google Maps Embed]           |  |
|  |                                    |  |
|  +------------------------------------+  |
|                                          |
|  [        Get in touch        ]          |
+------------------------------------------+
```

### CSS-Verbesserungen für nahtloses Design

- Trigger-Button: `rounded-t-lg rounded-b-none` wenn geöffnet, `rounded-lg` wenn geschlossen
- Content: `rounded-b-lg border-t-0` - verbindet sich nahtlos mit dem Trigger
- Gleiche `bg-white/80 backdrop-blur-md` Styles für beide Teile

---

## Finale Kartenreihenfolge auf der Seite

1. **Join our Whatsapp Group** (bestehende LinkCard)
2. **Church Service Information** (neue aufklappbare Karte mit Maps)
3. **Event and Service Information** (aktualisierte EventCard ohne Church Service)

