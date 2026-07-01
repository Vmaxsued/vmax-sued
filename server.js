require('dotenv').config();
const express = require('express');
const path = require('path');
const compression = require('compression');
const helmet = require('helmet');

const app = express();
const PORT = process.env.PORT || 3000;

// www → non-www redirect
app.use((req, res, next) => {
  if (req.hostname.startsWith('www.')) {
    return res.redirect(301, `https://${req.hostname.slice(4)}${req.url}`);
  }
  next();
});

// Security
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "https://www.googletagmanager.com", "https://www.google-analytics.com", "https://www.google.com", "https://www.gstatic.com"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https:", "blob:"],
      frameSrc: ["'self'", "https://www.google.com", "https://maps.google.com"],
      connectSrc: ["'self'", "https://www.google-analytics.com"],
    },
  },
  crossOriginEmbedderPolicy: false,
}));

// Compression
app.use(compression());

// Body parsing
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static files with caching
app.use(express.static(path.join(__dirname, 'public'), {
  maxAge: process.env.NODE_ENV === 'production' ? '1y' : '0',
  etag: true,
}));

// Global template variables
app.use((req, res, next) => {
  res.locals.currentPath = req.path;
  res.locals.siteName = 'Vmax Sued';
  res.locals.siteUrl = process.env.SITE_URL || 'https://vmax-sued.com';
  res.locals.phone = '+49 1512 1858273';
  res.locals.phoneClean = '4915121858273';
  res.locals.email = 'stefan_jung@vmax-sued.com';
  res.locals.address = {
    street: 'Gartenstraße 8',
    access: 'Zufahrt über Bachstraße 7',
    zip: '86707',
    city: 'Westendorf',
    region: 'bei Augsburg',
  };
  res.locals.hours = {
    weekdays: 'Mo–Fr 08:00–17:30',
    saturday: 'Sa 08:30–12:00',
  };
  res.locals.social = {
    facebook: 'https://facebook.com/vmaxsued',
    instagram: 'https://instagram.com/vmax_sued',
  };
  next();
});

// Routes
const pageRoutes = require('./src/server/routes/pages');
const apiRoutes = require('./src/server/routes/api');
const dynamicRoutes = require('./src/server/routes/dynamic');

app.use('/', pageRoutes);
app.use('/api', apiRoutes);
app.use('/', dynamicRoutes);

// 404
app.use((req, res) => {
  res.status(404).render('pages/404', {
    title: 'Seite nicht gefunden — Vmax Sued',
    description: 'Die angeforderte Seite existiert nicht.',
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).render('pages/500', {
    title: 'Fehler — Vmax Sued',
    description: 'Ein Fehler ist aufgetreten.',
  });
});

app.listen(PORT, () => {
  console.log(`Vmax Sued running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

module.exports = app;
