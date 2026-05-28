const express = require('express');
const router = express.Router();

// Startseite
router.get('/', (req, res) => {
  res.render('pages/index', {
    title: 'Vmax Sued — Chiptuning & Leistungssteigerung in Westendorf bei Augsburg',
    description: 'Einzelabstimmung am Prüfstand und komplette TÜV-Eintragung aus einer Hand. Chiptuning bei Vmax Sued in Westendorf bei Augsburg.',
    schema: null,
    breadcrumbs: null,
    faq: null,
  });
});

// Leistungsseiten
router.get('/chiptuning', (req, res) => {
  res.render('pages/chiptuning', {
    title: 'Chiptuning ab 699 € · Einzelabstimmung am Prüfstand — Vmax Sued',
    description: 'Stage 1 ab 699 €. Einzelabstimmung statt Software-Datei am Prüfstand. TÜV-Eintragung komplett übernommen.',
    schema: {
      name: 'Chiptuning & Kennfeldoptimierung',
      description: 'Professionelle Einzelabstimmung auf dem Prüfstand. Stage 1, Stage 2 und individuelle Kennfeldoptimierung für alle gängigen Fahrzeuge.',
      price: '699',
    },
    breadcrumbs: [{ name: 'Chiptuning', path: '/chiptuning' }],
    faq: [
      { q: 'Ist Chiptuning schädlich für den Motor?', a: 'Bei einer professionellen Einzelabstimmung innerhalb der Sicherheitsreserven des Motors: Nein. Wir bewegen uns immer im Rahmen dessen, was die Mechanik und Thermik sicher verträgt.' },
      { q: 'Verliere ich meine Herstellergarantie?', a: 'Bei einem Neuwagen kann die Herstellergarantie betroffen sein. Allerdings muss der Hersteller im Schadensfall nachweisen, dass die Optimierung ursächlich war. Eine TÜV-Eintragung schafft zusätzliche Rechtssicherheit.' },
      { q: 'Kann das Tuning rückgängig gemacht werden?', a: 'Ja, jederzeit. Vor jeder Optimierung sichern wir die Original-Software. Eine Rückrüstung auf den Serienzustand ist problemlos möglich.' },
      { q: 'Wie lange dauert eine Abstimmung?', a: 'Eine Stage-1-Abstimmung dauert in der Regel 2–4 Stunden. Bei Stage 2 oder individuellen Umbauten planen wir einen ganzen Tag ein.' },
      { q: 'Steigt der Verbrauch nach dem Tuning?', a: 'Nicht zwangsläufig. Bei zurückhaltendem Fahrstil kann der Verbrauch sogar leicht sinken. Wer die Mehrleistung regelmäßig abruft, wird naturgemäß einen höheren Verbrauch feststellen.' },
    ],
  });
});

router.get('/tuev-eintragung', (req, res) => {
  res.render('pages/tuev-eintragung', {
    title: 'TÜV-Eintragung komplett übernommen — Vmax Sued',
    description: 'Wir übernehmen die komplette TÜV-Eintragung für Sie: Vorbereitung, Fahrt zum Sachverständigen, Termin und Eintrag. Sie geben Ihr Fahrzeug ab — und holen es eingetragen wieder ab.',
    schema: {
      name: 'TÜV-Eintragung · Komplettübernahme',
      description: 'Komplette Abwicklung der TÜV-Eintragung von Tuning-Teilen. Die Eintragung selbst erfolgt durch einen amtlich anerkannten Sachverständigen (GTÜ, Dekra, TÜV).',
      price: '89',
    },
    breadcrumbs: [{ name: 'TÜV-Eintragung', path: '/tuev-eintragung' }],
    faq: [
      { q: 'Muss ich mein Chiptuning eintragen lassen?', a: 'Ja. Jede leistungsverändernde Maßnahme am Fahrzeug erfordert eine Eintragung, um die Betriebserlaubnis aufrechtzuerhalten. Die Eintragung erfolgt durch einen amtlich anerkannten Sachverständigen.' },
      { q: 'Was ist der Unterschied zwischen ABE, Teilegutachten und Einzelabnahme?', a: 'Eine ABE gilt bundesweit für ein bestimmtes Teil. Ein Teilegutachten erfordert eine Abnahme durch einen Sachverständigen. Die Einzelabnahme ist für Umbauten ohne vorhandenes Gutachten.' },
      { q: 'Wie lange dauert der Eintragungsprozess?', a: 'Eine kleine Eintragung mit vorhandenem Gutachten ist in 1–2 Stunden erledigt. Einzelabnahmen dauern je nach Umfang einen halben bis ganzen Tag — sie wird durch den Sachverständigen vor Ort durchgeführt.' },
      { q: 'Wer führt die Eintragung tatsächlich durch?', a: 'Die Eintragung selbst erfolgt ausschließlich durch einen amtlich anerkannten Sachverständigen (GTÜ, Dekra oder TÜV Süd). Wir bereiten Ihr Fahrzeug fachgerecht vor und begleiten Sie zum Termin.' },
    ],
  });
});

router.get('/b2b', (req, res) => {
  res.render('pages/b2b', {
    title: 'B2B-Prüftechnik für Unternehmen — Vmax Sued',
    description: 'Prüfstandsmessungen und Datenaufbereitung für Tuninghersteller und Partnerwerkstätten. B2B-Service von Vmax Sued in Kooperation mit zugelassenen Sachverständigen.',
    schema: {
      name: 'B2B-Prüfstandsmessungen',
      description: 'Prüfstandsmessungen, Abgasmessungen und Datenaufbereitung in Kooperation mit zugelassenen Sachverständigen.',
    },
    breadcrumbs: [{ name: 'B2B-Prüftechnik', path: '/b2b' }],
    faq: [
      { q: 'Wie läuft ein B2B-Projekt typischerweise ab?', a: 'Erstkontakt, Sichtung der Unterlagen, Angebotserstellung, Prüfstandsmessung vor Ort, Datenaufbereitung. Die Erstellung der finalen Gutachten erfolgt durch unsere Partner-Sachverständigen.' },
      { q: 'Arbeitet ihr auch mit Unternehmen außerhalb Bayerns?', a: 'Ja. Unser B2B-Service ist bundesweit verfügbar. Die Messungen finden an unserem Standort in Westendorf statt.' },
      { q: 'Ist Vertraulichkeit bei Produktentwicklungen gewährleistet?', a: 'Selbstverständlich. Wir unterzeichnen auf Wunsch NDAs und behandeln alle Projektdetails vertraulich.' },
    ],
  });
});

// Weitere Seiten
router.get('/galerie', (req, res) => {
  res.render('pages/galerie', {
    title: 'Galerie — Vmax Sued',
    description: 'Kundenfahrzeuge, Projekte und Prüfstands-Ergebnisse von Vmax Sued in Westendorf.',
    schema: null, breadcrumbs: [{ name: 'Galerie', path: '/galerie' }], faq: null,
  });
});

router.get('/team', (req, res) => {
  res.render('pages/team', {
    title: 'Über uns — Stefan Jung & Vmax Sued',
    description: 'Stefan Jung und Vmax Sued. Erfahrung, Philosophie und Tuning-Studio in Westendorf bei Augsburg.',
    schema: null, breadcrumbs: [{ name: 'Über uns', path: '/team' }], faq: null,
  });
});

router.get('/kontakt', (req, res) => {
  res.render('pages/kontakt', {
    title: 'Kontakt & Termin anfragen — Vmax Sued',
    description: 'Termin für Chiptuning, TÜV-Eintragung oder Beratung anfragen. Vmax Sued in Westendorf bei Augsburg.',
    schema: null, breadcrumbs: [{ name: 'Kontakt', path: '/kontakt' }], faq: null,
  });
});

// Rechtliches
router.get('/impressum', (req, res) => {
  res.render('pages/impressum', {
    title: 'Impressum — Vmax Sued',
    description: 'Impressum der Vmax Sued, Westendorf.',
    schema: null, breadcrumbs: null, faq: null,
  });
});

router.get('/datenschutz', (req, res) => {
  res.render('pages/datenschutz', {
    title: 'Datenschutzerklärung — Vmax Sued',
    description: 'Datenschutzerklärung der Vmax Sued, Westendorf.',
    schema: null, breadcrumbs: null, faq: null,
  });
});

router.get('/agb', (req, res) => {
  res.render('pages/agb', {
    title: 'AGB — Vmax Sued',
    description: 'Allgemeine Geschäftsbedingungen der Vmax Sued, Westendorf.',
    schema: null, breadcrumbs: null, faq: null,
  });
});

module.exports = router;
