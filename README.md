# VMAX Süd — vmax-sued.com

Professionelle Website für VMAX Süd, Chiptuning & Leistungssteigerung in Westendorf bei Augsburg.

## Stack

- **Server:** Node.js 20+ / Express
- **Views:** EJS (Server-Side Rendering)
- **Styling:** Tailwind CSS
- **Deployment:** Railway
- **Domain:** vmax-sued.com (Ionos)

## Schnellstart

```bash
# Dependencies installieren
npm install

# Tailwind CSS builden
npm run build:css

# Sitemap generieren
npm run generate:sitemap

# Dev-Server starten
npm run dev
```

Der Server läuft auf `http://localhost:3000`.

## Befehle

| Befehl | Beschreibung |
|--------|-------------|
| `npm run dev` | Dev-Server mit Nodemon (auto-reload) |
| `npm start` | Production-Server |
| `npm run build:css` | Tailwind CSS kompilieren + minifizieren |
| `npm run watch:css` | Tailwind CSS im Watch-Modus |
| `npm run generate:sitemap` | sitemap.xml aus Routen + Daten generieren |
| `npm run generate:vehicles` | Fahrzeug-Seiten generieren (Phase 2) |
| `npm run generate:cities` | Stadt-Seiten generieren (Phase 2) |

## Seitenstruktur

### Statische Seiten
- `/` — Startseite (10 Sektionen)
- `/chiptuning` — Chiptuning & Kennfeldoptimierung
- `/tuev-eintragung` — TÜV-Eintragung & Einzelabnahme
- `/komplettumbauten` — Komplettumbauten mit StVO-Abnahme
- `/b2b` — B2B-Prüftechnik für Unternehmen
- `/galerie` — Fahrzeug-Galerie mit Filter + Lightbox
- `/team` — Über Stefan Jung & VMAX Süd
- `/kontakt` — Multi-Step-Kontaktformular
- `/impressum`, `/datenschutz`, `/agb` — Rechtliches

### Dynamische Seiten
- `/tuning/:brand/:model` — 15 Fahrzeug-Detailseiten (aus `data/vehicles.json`)
- `/tuning/:city` — 20 regionale SEO-Seiten (aus `data/cities.json`)

## Deployment auf Railway

### 1. Projekt erstellen
```bash
# Railway CLI installieren (falls nicht vorhanden)
npm i -g @railway/cli

# Einloggen
railway login

# Projekt erstellen
railway init
```

### 2. Environment Variables setzen
In Railway Dashboard → Variables:

```
NODE_ENV=production
PORT=3000
SITE_URL=https://vmax-sued.com
SMTP_HOST=smtp.ionos.de
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=info@vmax-sued.com
SMTP_PASS=<passwort>
MAIL_FROM=info@vmax-sued.com
MAIL_TO=stefan_jung@vmax-sued.com
```

### 3. Deployen
```bash
railway up
```

### 4. Domain verbinden
1. Railway Dashboard → Settings → Custom Domain → `vmax-sued.com`
2. Ionos DNS: CNAME-Record auf Railway-Domain setzen
3. SSL wird automatisch über Railway provisioniert

## Daten erweitern

### Neues Fahrzeug hinzufügen
In `data/vehicles.json` einen Eintrag ergänzen:
```json
{
  "slug": "marke-modell",
  "brand": "Marke",
  "model": "Modell",
  "engine": "Motor",
  "year": "2020–",
  "stock": { "ps": 200, "nm": 300 },
  "stage1": { "ps": 260, "nm": 380 },
  "image": "/images/vehicles/marke-modell.webp"
}
```
Server-Neustart → Seite ist unter `/tuning/marke/marke-modell` erreichbar.

### Neue Stadt hinzufügen
In `data/cities.json` einen Eintrag ergänzen:
```json
{
  "slug": "stadtname",
  "name": "Stadtname",
  "distance": "30 km",
  "driveTime": "25 Min."
}
```
Server-Neustart → Seite ist unter `/tuning/stadtname` erreichbar.

Nach Änderungen: `npm run generate:sitemap` für aktuelle Sitemap.

## Design-System

- **Farben:** Fast-Schwarz (#0A0A0A) + Signalrot (#E63946) — Rot sparsam als Akzent
- **Fonts:** Inter (Body), JetBrains Mono (Zahlen/Daten)
- **Ästhetik:** Editorial/Magazin, kein Werkstatt-Look

## Vor dem Launch

- [ ] Echte Fahrzeugfotos einpflegen (Hero, Galerie, Fahrzeug-Cards)
- [ ] Stefan Jung Portraitfoto + Werkstattfotos
- [ ] SMTP-Zugangsdaten in Railway Variables
- [ ] Impressum: USt-ID von Stefan
- [ ] Datenschutz + AGB: Anwalt prüfen lassen
- [ ] Google Analytics Measurement ID
- [ ] Meta Pixel ID
- [ ] reCAPTCHA v3 Keys (Kontaktformular)
- [ ] Google Maps Embed mit korrekten Koordinaten
- [ ] Cookie-Banner implementieren
- [ ] `npm run generate:sitemap` ausführen
- [ ] Google Search Console: Sitemap einreichen
