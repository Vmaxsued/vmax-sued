const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

// Load data
const dataDir = path.join(__dirname, '..', '..', '..', 'data');
const vehicles = JSON.parse(fs.readFileSync(path.join(dataDir, 'vehicles.json'), 'utf-8'));
const cities = JSON.parse(fs.readFileSync(path.join(dataDir, 'cities.json'), 'utf-8'));

// Build lookup maps
const vehicleMap = {};
vehicles.forEach(v => {
  v.brandSlug = v.brand.toLowerCase().replace(/\s+/g, '-').replace(/š/g, 's');
  vehicleMap[`${v.brandSlug}/${v.slug}`] = v;
});

// Vehicle pages: /tuning/:brand/:model
router.get('/tuning/:brand/:model', (req, res, next) => {
  const key = `${req.params.brand}/${req.params.model}`;
  const vehicle = vehicleMap[key];

  if (!vehicle) return next();

  const otherVehicles = vehicles
    .filter(v => v.slug !== vehicle.slug)
    .slice(0, 6)
    .map(v => ({ ...v, brandSlug: v.brand.toLowerCase().replace(/\s+/g, '-').replace(/š/g, 's') }));

  const psGain = vehicle.stage1.ps - vehicle.stock.ps;
  const nmGain = vehicle.stage1.nm - vehicle.stock.nm;

  res.render('templates/vehicle-page', {
    title: `${vehicle.brand} ${vehicle.model} Chiptuning — +${psGain} PS | Vmax Sued`,
    description: `${vehicle.brand} ${vehicle.model} Chiptuning in Westendorf bei Augsburg. Einzelabstimmung auf dem Prüfstand: von ${vehicle.stock.ps} PS auf ${vehicle.stage1.ps} PS (Stage 1). TÜV-Eintragung möglich.`,
    vehicle,
    otherVehicles,
    schema: {
      name: `${vehicle.brand} ${vehicle.model} Chiptuning`,
      description: `Professionelle Einzelabstimmung für ${vehicle.brand} ${vehicle.model} (${vehicle.engine}). Stage 1: ${vehicle.stage1.ps} PS / ${vehicle.stage1.nm} Nm.`,
      price: '499',
    },
    breadcrumbs: [
      { name: 'Chiptuning', path: '/chiptuning' },
      { name: `${vehicle.brand} ${vehicle.model}`, path: `/tuning/${vehicle.brandSlug}/${vehicle.slug}` },
    ],
    faq: [
      { q: `Wie viel PS bringt ein Chiptuning beim ${vehicle.model}?`, a: `Bei einer Stage-1-Einzelabstimmung erzielen wir typischerweise +${psGain} PS und +${nmGain} Nm Drehmoment.` },
      { q: `Ist das Tuning für meinen ${vehicle.model} TÜV-fähig?`, a: `Ja. Wir bieten für den ${vehicle.brand} ${vehicle.model} die Möglichkeit der TÜV-Eintragung an.` },
      { q: `Was kostet das Chiptuning für den ${vehicle.model}?`, a: `Die Kosten für eine Stage-1-Abstimmung beginnen bei 499 €. Kontaktieren Sie uns für ein individuelles Angebot.` },
    ],
  });
});

// City pages: /tuning/:city
router.get('/tuning/:city', (req, res, next) => {
  const city = cities.find(c => c.slug === req.params.city);

  if (!city) return next();

  res.render('templates/city-page', {
    title: `Chiptuning ${city.name} — Vmax Sued | ${city.distance} entfernt`,
    description: `Chiptuning und Leistungssteigerung für ${city.name} und Umgebung. Vmax Sued in Westendorf — nur ${city.distance} (${city.driveTime}) von ${city.name} entfernt.`,
    city,
    vehicles: vehicles.slice(0, 6).map(v => ({ ...v, brandSlug: v.brand.toLowerCase().replace(/\s+/g, '-').replace(/š/g, 's') })),
    schema: {
      name: `Chiptuning ${city.name}`,
      description: `Professionelles Chiptuning für Kunden aus ${city.name}. Einzelabstimmung auf dem Prüfstand bei Vmax Sued in Westendorf — ${city.distance} entfernt.`,
    },
    breadcrumbs: [
      { name: 'Chiptuning', path: '/chiptuning' },
      { name: city.name, path: `/tuning/${city.slug}` },
    ],
    faq: null,
  });
});

module.exports = router;
