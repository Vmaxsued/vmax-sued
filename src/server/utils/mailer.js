const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY || 're_BFmQ16LM_EwMHNo1hsNGw7QsxL9QzUfZz');
const TO_EMAIL = 'stefan_jung@vmax-sued.com';
const FROM_EMAIL = 'kontakt@vmax-sued.com';

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

async function sendContactMail({ vehicle, service, name, email, phone, message, attachment }) {
  const subject = `Neue Anfrage: ${service} — ${vehicle.brand} ${vehicle.model}`;

  const htmlBody = `
    <div style="font-family: -apple-system, sans-serif; max-width: 600px; margin: 0 auto; background: #141414; color: #F5F5F5;">
      <div style="background: #0A0A0A; padding: 24px 32px; border-bottom: 2px solid #C87533;">
        <h1 style="font-size: 18px; margin: 0; font-weight: 500; color: #F5F5F5;">Neue Anfrage über vmax-sued.com</h1>
      </div>
      <div style="padding: 32px;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td colspan="2" style="padding: 8px 0; color: #C87533; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; font-weight: 500;">Fahrzeug</td></tr>
          <tr><td style="padding: 4px 0; color: #A8A8A8; width: 120px;">Marke</td><td style="padding: 4px 0;">${escapeHtml(vehicle.brand)}</td></tr>
          <tr><td style="padding: 4px 0; color: #A8A8A8;">Modell</td><td style="padding: 4px 0;">${escapeHtml(vehicle.model)}</td></tr>
          <tr><td style="padding: 4px 0; color: #A8A8A8;">Baujahr</td><td style="padding: 4px 0;">${escapeHtml(vehicle.year || '—')}</td></tr>
          <tr><td style="padding: 4px 0; color: #A8A8A8;">Motor</td><td style="padding: 4px 0;">${escapeHtml(vehicle.engine || '—')}</td></tr>
          <tr><td colspan="2" style="padding: 16px 0 8px 0; color: #C87533; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; font-weight: 500;">Service</td></tr>
          <tr><td colspan="2" style="padding: 4px 0;">${escapeHtml(service)}</td></tr>
          <tr><td colspan="2" style="padding: 16px 0 8px 0; color: #C87533; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; font-weight: 500;">Kontakt</td></tr>
          <tr><td style="padding: 4px 0; color: #A8A8A8;">Name</td><td style="padding: 4px 0;">${escapeHtml(name)}</td></tr>
          <tr><td style="padding: 4px 0; color: #A8A8A8;">E-Mail</td><td style="padding: 4px 0;"><a href="mailto:${escapeHtml(email)}" style="color: #C87533;">${escapeHtml(email)}</a></td></tr>
          <tr><td style="padding: 4px 0; color: #A8A8A8;">Telefon</td><td style="padding: 4px 0;"><a href="tel:${escapeHtml(phone)}" style="color: #C87533;">${escapeHtml(phone || '—')}</a></td></tr>
          ${message ? `
          <tr><td colspan="2" style="padding: 16px 0 8px 0; color: #C87533; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; font-weight: 500;">Nachricht</td></tr>
          <tr><td colspan="2" style="padding: 4px 0; white-space: pre-wrap;">${escapeHtml(message)}</td></tr>
          ` : ''}
          ${attachment ? `
          <tr><td colspan="2" style="padding: 16px 0 8px 0; color: #C87533; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; font-weight: 500;">Anhang</td></tr>
          <tr><td colspan="2" style="padding: 4px 0; color: #4ADE80;">📎 Fahrzeugschein: ${escapeHtml(attachment.filename)}</td></tr>
          ` : ''}
        </table>
      </div>
      <div style="padding: 16px 32px; background: #0A0A0A; color: #6B6B6B; font-size: 12px; text-align: center;">
        Gesendet über vmax-sued.com Kontaktformular
      </div>
    </div>
  `;

  const payload = {
    from: `Vmax Sued Kontaktformular <${FROM_EMAIL}>`,
    to: TO_EMAIL,
    reply_to: email,
    subject,
    html: htmlBody,
  };

  if (attachment && attachment.content && attachment.content.length > 0) {
    payload.attachments = [{
      filename: attachment.filename || 'fahrzeugschein',
      content: attachment.content,
    }];
  }

  const { data, error } = await resend.emails.send(payload);

  if (error) {
    console.error('[mailer] Resend-Fehler:', error);
    throw new Error('Versand fehlgeschlagen. Bitte später erneut versuchen.');
  }

  return { messageId: data.id };
}

module.exports = { sendContactMail };
