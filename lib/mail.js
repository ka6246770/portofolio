import nodemailer from 'nodemailer'

// Centralised mail configuration, read from environment variables.
// Next.js loads `.env` automatically — never commit real credentials.

export const mailConfig = {
  // The address the contact-form messages are sent TO.
  toEmail: process.env.CONTACT_TO_EMAIL || 'ka6246770@gmail.com',

  // Nodemailer SMTP transport options for Gmail.
  // Requires a 16-character Google "App Password" — not your normal password.
  smtp: {
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: Number(process.env.SMTP_PORT) || 465,
    secure: true, // Gmail SMTP on 465 uses SSL
    auth: {
      user: process.env.SMTP_USER, // e.g. yourname@gmail.com
      pass: process.env.SMTP_PASS, // the App Password (16 chars, no spaces)
    },
  },
}

// Build the SMTP transport once. Created lazily so the server can start
// even when credentials aren't configured yet.
let transporter = null
export function getTransporter() {
  if (transporter) return transporter
  transporter = nodemailer.createTransport(mailConfig.smtp)
  return transporter
}

// Escape user input before injecting into HTML.
export function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

// Validate the incoming form payload.
export function validate({ name, email, message }) {
  const errors = {}
  if (!name || !name.trim()) errors.name = 'Please enter your name.'
  else if (name.trim().length > 120) errors.name = 'Name is too long.'

  if (!email || !email.trim()) errors.email = 'Please enter your email.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    errors.email = 'Enter a valid email.'

  if (!message || !message.trim()) errors.message = 'Please enter a message.'
  else if (message.trim().length < 5)
    errors.message = 'Message must be at least 5 characters.'
  else if (message.trim().length > 5000)
    errors.message = 'Message is too long (max 5000 characters).'

  return errors
}