const express = require('express');
const router = express.Router();

// Startseite
router.get('/', (req, res) => {
  res.render('pages/index', {
    title: 'VMAX Süd — Chiptuning & Leistungssteigerung in Westendorf bei Augsburg',
    description: 'Einzelabstimmung statt Softwarepaket. Chiptuning, TÜV-Eintragung und Komplettumbauten bei VMAX Süd in Westendorf. Partner der VMAX Performance Gruppe seit 1997.',
    schema: null,
    breadcrumbs: null,
    faq: null,
  });
});

// Leistungsseiten
router.get('/chiptuning', (req, res) => {
  res.render('pages/chiptuning', {
    title: 'Chiptuning & Leistungssteigerung — VMAX Süd',
    description: 'Professionelles Chiptuning mit Einzelabstimmung auf dem Prüfstand. Stage 1, Stage 2 und individuelle Kennfeldoptimierung bei VMAX Süd in Westendorf.',
    schema: {
      name: 'Chiptuning & Kennfeldoptimierung',
      description: 'Professionelle Einzelabstimmung auf dem Prüfstand. Stage 1, Stage 2 und individuelle Kennfeldoptimierung für alle gängigen Fahrzeuge.',
      price: '499',
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
    title: 'TÜV-Eintragung & Einzelabnahme — VMAX Süd',
    description: 'TÜV-Eintragung für Tuning-Teile und Umbauten. Teilegutachten, Einzelabnahme und Begleitung bis zur Zulassung bei VMAX Süd.',
    schema: {
      name: 'TÜV-Eintragung & Einzelabnahme',
      description: 'Vollständige Begleitung bei TÜV-Eintragung und Einzelabnahme. Teilegutachten-Erstellung und Kooperation mit GTÜ, Dekra, TÜV.',
      price: '89',
    },
    breadcrumbs: [{ name: 'TÜV-Eintragung', path: '/tuev-eintragung' }],
    faq: [
      { q: 'Muss ich mein Chiptuning eintragen lassen?', a: 'Ja. Jede leistungsverändernde Maßnahme am Fahrzeug erfordert eine Eintragung, um die Betriebserlaubnis aufrechtzuerhalten.' },
      { q: 'Was ist der Unterschied zwischen ABE, Teilegutachten und Einzelabnahme?', a: 'Eine ABE gilt bundesweit für ein bestimmtes Teil. Ein Teilegutachten erfordert eine Abnahme durch einen Sachverständigen. Die Einzelabnahme ist für Umbauten ohne vorhandenes Gutachten.' },
      { q: 'Wie lange dauert der Eintragungsprozess?', a: 'Eine kleine Eintragung mit vorhandenem Gutachten ist in 1–2 Stunden erledigt. Einzelabnahmen dauern je nach Umfang einen halben bis ganzen Tag.' },
      { q: 'Kann ich auch Teile eintragen lassen, die woanders verbaut wurden?', a: 'Ja. Wir prüfen den Verbau, kontrollieren die Gutachten und begleiten Sie zur Abnahme — unabhängig davon, wo der Einbau stattfand.' },
    ],
  });
});

router.get('/komplettumbauten', (req, res) => {
  res.render('pages/komplettumbauten', {
    title: 'Komplettumbauten mit StVO-Abnahme — VMAX Süd',
    description: 'Vom Konzept bis zur Straßenzulassung. Komplettumbauten, Einzelstücke und Eigenbauten mit Abnahme nach StVO bei VMAX Süd.',
    schema: {
      name: 'Komplettumbauten mit StVO-Abnahme',
      description: 'Vom Konzept bis zur Straßenzulassung. Motortausch, Fahrwerksumbauten, Karosserie und Eigenbauten mit vollständiger Abnahme.',
    },
    breadcrumbs: [{ name: 'Komplettumbauten', path: '/komplettumbauten' }],
    faq: [
      { q: 'Kann jeder Umbau abgenommen werden?', a: 'Nein, nicht jeder. Manche Umbauten sind technisch oder regulatorisch nicht genehmigungsfähig. Genau deshalb prüfen wir die Machbarkeit vorab.' },
      { q: 'Was kostet ein Komplettumbau?', a: 'Das hängt stark vom Umfang ab. Ein einfacher Fahrwerksumbau mit Eintragung beginnt im dreistelligen Bereich. Ein Motorswap kann im fünfstelligen Bereich liegen.' },
      { q: 'Ich habe den Umbau selbst gemacht — könnt ihr trotzdem die Abnahme begleiten?', a: 'Ja. Wir prüfen den Umbau, identifizieren eventuelle Nacharbeiten und begleiten Sie dann zum Prüftermin.' },
    ],
  });
});

router.get('/b2b', (req, res) => {
  res.render('pages/b2b', {
    title: 'B2B-Prüftechnik für Unternehmen — VMAX Süd',
    description: 'Betriebsfestigkeits-Ermittlung, Abgastests und Teilegutachten für Tuninghersteller und Werkstätten. B2B-Services von VMAX Süd.',
    schema: {
      name: 'B2B-Prüftechnik & Gutachten',
      description: 'Betriebsfestigkeits-Ermittlung, Abgastests und Teilegutachten für Tuninghersteller, Importeure und Werkstätten.',
    },
    breadcrumbs: [{ name: 'B2B-Prüftechnik', path: '/b2b' }],
    faq: [
      { q: 'Wie läuft ein B2B-Projekt typischerweise ab?', a: 'Erstkontakt, Sichtung der Unterlagen, Angebotserstellung, Prüfung/Messung vor Ort, Dokumentation und Einreichung bei der Prüforganisation.' },
      { q: 'Arbeitet ihr auch mit Unternehmen außerhalb Bayerns?', a: 'Ja. Unser B2B-Service ist bundesweit verfügbar. Die Prüfungen finden an unserem Standort in Westendorf statt.' },
      { q: 'Ist Vertraulichkeit bei Produktentwicklungen gewährleistet?', a: 'Selbstverständlich. Wir unterzeichnen auf Wunsch NDAs und behandeln alle Projektdetails vertraulich.' },
    ],
  });
});

// Weitere Seiten
router.get('/galerie', (req, res) => {
  res.render('pages/galerie', {
    title: 'Galerie — VMAX Süd',
    description: 'Kundenfahrzeuge, Projekte und Prüfstands-Ergebnisse von VMAX Süd in Westendorf.',
    schema: null, breadcrumbs: [{ name: 'Galerie', path: '/galerie' }], faq: null,
  });
});

router.get('/team', (req, res) => {
  res.render('pages/team', {
    title: 'Über uns — Stefan Jung & VMAX Süd',
    description: 'Stefan Jung und das VMAX Süd Team. Erfahrung, Philosophie und Werkstatt in Westendorf bei Augsburg.',
    schema: null, breadcrumbs: [{ name: 'Über uns', path: '/team' }], faq: null,
  });
});

router.get('/kontakt', (req, res) => {
  res.render('pages/kontakt', {
    title: 'Kontakt & Termin anfragen — VMAX Süd',
    description: 'Termin für Chiptuning, TÜV-Eintragung oder Beratung anfragen. VMAX Süd in Westendorf bei Augsburg.',
    schema: null, breadcrumbs: [{ name: 'Kontakt', path: '/kontakt' }], faq: null,
  });
});

// Rechtliches
router.get('/impressum', (req, res) => {
  res.render('pages/impressum', {
    title: 'Impressum — VMAX Süd',
    description: 'Impressum der VMAX Süd, Westendorf.',
    schema: null, breadcrumbs: null, faq: null,
  });
});

router.get('/datenschutz', (req, res) => {
  res.render('pages/datenschutz', {
    title: 'Datenschutzerklärung — VMAX Süd',
    description: 'Datenschutzerklärung der VMAX Süd, Westendorf.',
    schema: null, breadcrumbs: null, faq: null,
  });
});

router.get('/agb', (req, res) => {
  res.render('pages/agb', {
    title: 'AGB — VMAX Süd',
    description: 'Allgemeine Geschäftsbedingungen der VMAX Süd, Westendorf.',
    schema: null, breadcrumbs: null, faq: null,
  });
});

module.exports = router;
