import express from 'express'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import config from './server/config.js'
import contactRouter from './server/routes/contact.js'

const app = express()
const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Parse JSON request bodies.
app.use(express.json({ limit: '64kb' }))

// Health check — handy for confirming the API is alive.
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' })
})

// Contact form endpoint.
app.use('/api', contactRouter)

// In production, serve the built frontend from /dist.
const dist = path.join(__dirname, 'dist')
app.use(express.static(dist))

// SPA fallback: any non-API route gets the app shell.
app.use((req, res, next) => {
  if (req.path.startsWith('/api')) return next()
  res.sendFile(path.join(dist, 'index.html'))
})

// Global error handler so a thrown error never crashes the process silently.
app.use((err, _req, res, _next) => {
  console.error(err)
  res.status(500).json({ success: false, message: 'Internal server error.' })
})

app.listen(config.port, () => {
  console.log(`Backend listening on http://localhost:${config.port}`)
  if (!config.smtp.auth.user || !config.smtp.auth.pass) {
    console.warn(
      'WARNING: SMTP credentials not set. Add SMTP_USER and SMTP_PASS to .env to enable email sending.',
    )
  }
})
