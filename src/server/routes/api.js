const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const multer = require('multer');
const { sendContactMail } = require('../utils/mailer');

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { error: 'Zu viele Anfragen. Bitte versuchen Sie es in 15 Minuten erneut.' },
});

// Multer: Memory-Storage damit wir die Datei direkt als Mail-Anhang weiterreichen können.
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 8 * 1024 * 1024 }, // 8 MB
  fileFilter: (req, file, cb) => {
    const allowed = ['image/jpeg', 'image/png', 'image/heic', 'image/heif', 'application/pdf'];
    if (allowed.includes(file.mimetype)) return cb(null, true);
    cb(new Error('Nur JPG, PNG, HEIC oder PDF erlaubt.'));
  },
});

router.post('/contact', contactLimiter, (req, res, next) => {
  upload.single('fahrzeugschein')(req, res, (err) => {
    if (err) {
      const message = err.code === 'LIMIT_FILE_SIZE'
        ? 'Fahrzeugschein-Datei zu groß (max. 8 MB).'
        : (err.message || 'Datei konnte nicht verarbeitet werden.');
      return res.status(400).json({ errors: [message] });
    }
    handleContact(req, res).catch(next);
  });
});

async function handleContact(req, res) {
  try {
    const {
      vehicle_brand, vehicle_model, vehicle_year, vehicle_engine,
      service, name, email, phone, message, privacy,
    } = req.body;

    // Validation
    const errors = [];
    if (!vehicle_brand) errors.push('Bitte wählen Sie eine Marke.');
    if (!vehicle_model) errors.push('Bitte geben Sie ein Modell an.');
    if (!req.file) errors.push('Bitte laden Sie ein Foto des Fahrzeugscheins hoch.');
    if (!service) errors.push('Bitte wählen Sie einen Service.');
    if (!name || name.trim().length < 2) errors.push('Bitte geben Sie Ihren Namen an.');
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push('Bitte geben Sie eine gültige E-Mail-Adresse an.');
    if (privacy !== 'true' && privacy !== true) errors.push('Bitte stimmen Sie der Datenschutzerklärung zu.');

    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    // Sanitize
    const sanitized = {
      vehicle: {
        brand: String(vehicle_brand).slice(0, 100),
        model: String(vehicle_model).slice(0, 100),
        year: String(vehicle_year || '').slice(0, 10),
        engine: String(vehicle_engine || '').slice(0, 100),
      },
      service: String(service).slice(0, 200),
      name: String(name).trim().slice(0, 200),
      email: String(email).trim().slice(0, 200),
      phone: String(phone || '').trim().slice(0, 50),
      message: String(message || '').trim().slice(0, 2000),
      attachment: req.file ? {
        filename: req.file.originalname || 'fahrzeugschein',
        content: req.file.buffer,
        contentType: req.file.mimetype,
      } : null,
    };

    await sendContactMail(sanitized);

    res.json({ success: true, message: 'Ihre Anfrage wurde erfolgreich gesendet. Wir melden uns zeitnah bei Ihnen.' });
  } catch (err) {
    console.error('Contact form error:', err);
    res.status(500).json({ error: 'Beim Senden ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut oder rufen Sie uns direkt an.' });
  }
}

module.exports = router;
