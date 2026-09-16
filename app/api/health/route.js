import { NextResponse } from 'next/server'

// GET /api/health — handy for confirming the API is alive.
export function GET() {
  return NextResponse.json({ status: 'ok' })
}