const nodemailer = require('nodemailer');

let transporter;

if (process.env.SMTP_HOST) {
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '465'),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

async function sendContactMail({ vehicle, service, name, email, phone, message, attachment }) {
  const subject = `Neue Anfrage: ${service} — ${vehicle.brand} ${vehicle.model}`;

  const text = [
    '=== NEUE ANFRAGE ÜBER VMAX-SUED.COM ===',
    '',
    'FAHRZEUG',
    `  Marke:    ${vehicle.brand}`,
    `  Modell:   ${vehicle.model}`,
    `  Baujahr:  ${vehicle.year}`,
    `  Motor:    ${vehicle.engine}`,
    '',
    'GEWÜNSCHTER SERVICE',
    `  ${service}`,
    '',
    'KONTAKTDATEN',
    `  Name:     ${name}`,
    `  E-Mail:   ${email}`,
    `  Telefon:  ${phone || '—'}`,
    '',
    'NACHRICHT',
    `  ${message || '—'}`,
    '',
    '=========================================',
  ].join('\n');

  const html = `
    <div style="font-family: -apple-system, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: #0A0A0A; color: #F5F5F5; padding: 24px 32px;">
        <h1 style="font-size: 18px; margin: 0; font-weight: 500;">Neue Anfrage über vmax-sued.com</h1>
      </div>
      <div style="padding: 32px; background: #141414; color: #F5F5F5;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td colspan="2" style="padding: 8px 0; color: #F59E0B; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; font-weight: 500;">Fahrzeug</td>
          </tr>
          <tr><td style="padding: 4px 0; color: #A8A8A8; width: 120px;">Marke</td><td style="padding: 4px 0;">${vehicle.brand}</td></tr>
          <tr><td style="padding: 4px 0; color: #A8A8A8;">Modell</td><td style="padding: 4px 0;">${vehicle.model}</td></tr>
          <tr><td style="padding: 4px 0; color: #A8A8A8;">Baujahr</td><td style="padding: 4px 0;">${vehicle.year}</td></tr>
          <tr><td style="padding: 4px 0; color: #A8A8A8;">Motor</td><td style="padding: 4px 0;">${vehicle.engine}</td></tr>
          <tr><td colspan="2" style="padding: 16px 0 8px 0; color: #F59E0B; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; font-weight: 500;">Service</td></tr>
          <tr><td colspan="2" style="padding: 4px 0;">${service}</td></tr>
          <tr><td colspan="2" style="padding: 16px 0 8px 0; color: #F59E0B; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; font-weight: 500;">Kontakt</td></tr>
          <tr><td style="padding: 4px 0; color: #A8A8A8;">Name</td><td style="padding: 4px 0;">${name}</td></tr>
          <tr><td style="padding: 4px 0; color: #A8A8A8;">E-Mail</td><td style="padding: 4px 0;"><a href="mailto:${email}" style="color: #F59E0B;">${email}</a></td></tr>
          <tr><td style="padding: 4px 0; color: #A8A8A8;">Telefon</td><td style="padding: 4px 0;">${phone || '—'}</td></tr>
          ${message ? `
          <tr><td colspan="2" style="padding: 16px 0 8px 0; color: #F59E0B; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; font-weight: 500;">Nachricht</td></tr>
          <tr><td colspan="2" style="padding: 4px 0; white-space: pre-wrap;">${message}</td></tr>
          ` : ''}
        </table>
      </div>
      <div style="padding: 16px 32px; background: #0A0A0A; color: #6B6B6B; font-size: 12px; text-align: center;">
        Gesendet über vmax-sued.com Kontaktformular
      </div>
    </div>
  `;

  if (!transporter) {
    console.log('SMTP not configured — logging mail to console:');
    console.log(text);
    if (attachment) {
      console.log(`(Anhang: ${attachment.filename}, ${attachment.contentType}, ${attachment.content.length} bytes)`);
    }
    return { messageId: 'dev-' + Date.now() };
  }

  return transporter.sendMail({
    from: process.env.MAIL_FROM,
    to: process.env.MAIL_TO,
    replyTo: email,
    subject,
    text,
    html,
    attachments: attachment ? [attachment] : undefined,
  });
}

module.exports = { sendContactMail };
