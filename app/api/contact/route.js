import { NextResponse } from 'next/server'
import { getTransporter, mailConfig, validate, escapeHtml } from '@/lib/mail'

// POST /api/contact — accept a message and email it to the owner.
export async function POST(request) {
  const body = await request.json().catch(() => ({}))
  const { name, email, message } = body || {}

  // Server-side validation mirrors the frontend.
  const errors = validate({ name, email, message })
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ success: false, errors }, { status: 400 })
  }

  const mailOptions = {
    to: mailConfig.toEmail,
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
    return NextResponse.json({ success: true })
  } catch (error) {
    // Distinguish between missing-config and real SMTP failures.
    if (!mailConfig.smtp.auth.user || !mailConfig.smtp.auth.pass) {
      return NextResponse.json(
        {
          success: false,
          message:
            'Email is not configured on the server. Set SMTP_USER and SMTP_PASS in the .env file.',
        },
        { status: 500 },
      )
    }
    console.error('Email send failed:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to send the message. Please try again later.' },
      { status: 500 },
    )
  }
}