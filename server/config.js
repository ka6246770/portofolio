import dotenv from 'dotenv'
dotenv.config()

// Centralised server configuration, read from environment variables.
// Never commit real credentials — use the .env file (gitignored).
export default {
  port: process.env.PORT || 3001,

  // The address the contact-form messages are sent TO.
  // TODO: This is the Gmail inbox that receives submissions.
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
