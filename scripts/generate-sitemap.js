/**
 * Generates sitemap.xml from static routes + dynamic data files.
 * Run: node scripts/generate-sitemap.js
 */
const fs = require('fs');
const path = require('path');

const SITE_URL = process.env.SITE_URL || 'https://vmax-sued.com';

// Static pages with priority and change frequency
const staticPages = [
  { path: '/',                priority: '1.0', changefreq: 'weekly' },
  { path: '/chiptuning',      priority: '0.9', changefreq: 'monthly' },
  { path: '/tuev-eintragung', priority: '0.9', changefreq: 'monthly' },
  { path: '/b2b',             priority: '0.9', changefreq: 'monthly' },
  { path: '/galerie',         priority: '0.6', changefreq: 'weekly' },
  { path: '/team',            priority: '0.7', changefreq: 'monthly' },
  { path: '/kontakt',         priority: '0.8', changefreq: 'monthly' },
  { path: '/impressum',       priority: '0.2', changefreq: 'yearly' },
  { path: '/datenschutz',     priority: '0.2', changefreq: 'yearly' },
  { path: '/agb',             priority: '0.2', changefreq: 'yearly' },
];

// Load dynamic data
const dataDir = path.join(__dirname, '..', 'data');

let vehiclePages = [];
try {
  const vehicles = JSON.parse(fs.readFileSync(path.join(dataDir, 'vehicles.json'), 'utf-8'));
  vehiclePages = vehicles.map(v => ({
    path: `/tuning/${v.brand.toLowerCase().replace(/\s+/g, '-').replace(/š/g, 's')}/${v.slug}`,
    priority: '0.7',
    changefreq: 'monthly',
  }));
} catch (e) { /* no vehicles data yet */ }

let cityPages = [];
try {
  const cities = JSON.parse(fs.readFileSync(path.join(dataDir, 'cities.json'), 'utf-8'));
  cityPages = cities.map(c => ({
    path: `/tuning/${c.slug}`,
    priority: '0.6',
    changefreq: 'monthly',
  }));
} catch (e) { /* no cities data yet */ }

const allPages = [...staticPages, ...vehiclePages, ...cityPages];
const today = new Date().toISOString().split('T')[0];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(p => `  <url>
    <loc>${SITE_URL}${p.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

const outPath = path.join(__dirname, '..', 'public', 'sitemap.xml');
fs.writeFileSync(outPath, xml, 'utf-8');
console.log(`Sitemap generated: ${allPages.length} URLs → ${outPath}`);
