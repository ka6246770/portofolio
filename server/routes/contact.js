import { Router } from 'express'
import nodemailer from 'nodemailer'
import config from '../config.js'

const router = Router()

// Build the SMTP transport once. Created lazily so the server can start
// even when credentials aren't configured yet.
let transporter = null
function getTransporter() {
  if (transporter) return transporter
  transporter = nodemailer.createTransport(config.smtp)
  return transporter
}

// Validate the incoming form payload.
function validate({ name, email, message }) {
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

// POST /api/contact — accept a message and email it to the owner.
router.post('/contact', async (req, res) => {
  const { name, email, message } = req.body || {}

  // Server-side validation mirrors the frontend.
  const errors = validate({ name, email, message })
  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ success: false, errors })
  }

  // Rate-limit defence: basic check for overly long/frequent input is
  // intentionally light here; add a proper rate limiter (e.g. express-rate-limit)
  // before deploying publicly.

  const mailOptions = {
    to: config.toEmail,
    replyTo: email,
    subject: `New portfolio message from ${name}`,
    text: [
      `Name: ${name}`,
      `Email: ${email}`,
      '',
      'Message:',
      message,
    ].join('\n'),
    html: `
      <div style="font-family:Arial,sans-serif;max-width:560px;margin:auto;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden">
        <div style="background:#0b0f16;color:#2dd4bf;padding:18px 24px;font-weight:bold;font-size:18px">
          New Portfolio Message
        </div>
        <div style="padding:24px;color:#1f2937">
          <p style="margin:0 0 16px">You received a new message from the contact form.</p>
          <table style="width:100%;border-collapse:collapse">
            <tr>
              <td style="padding:6px 0;font-weight:600;width:90px;color:#4b5563">Name</td>
              <td style="padding:6px 0">${escapeHtml(name)}</td>
            </tr>
            <tr>
              <td style="padding:6px 0;font-weight:600;width:90px;color:#4b5563">Email</td>
              <td style="padding:6px 0"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td>
            </tr>
          </table>
          <hr style="border:none;border-top:1px solid #e5e7eb;margin:20px 0" />
          <p style="margin:0 0 8px;font-weight:600;color:#4b5563">Message</p>
          <p style="margin:0;white-space:pre-wrap;line-height:1.6">${escapeHtml(message)}</p>
        </div>
      </div>
    `,
  }

  try {
    await getTransporter().sendMail(mailOptions)
    return res.status(200).json({ success: true })
  } catch (error) {
    // Distinguish between missing-config and real SMTP failures.
    if (!config.smtp.auth.user || !config.smtp.auth.pass) {
      return res.status(500).json({
        success: false,
        message:
          'Email is not configured on the server. Set SMTP_USER and SMTP_PASS in the .env file.',
      })
    }
    console.error('Email send failed:', error)
    return res.status(500).json({
      success: false,
      message: 'Failed to send the message. Please try again later.',
    })
  }
})

// Escape user input before injecting into HTML.
function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export default router
