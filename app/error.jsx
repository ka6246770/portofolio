'use client'

import { useEffect } from 'react'
import StandaloneShell from '../components/StandaloneShell'
import ErrorScreen from '../components/ErrorScreen'

// Segment-level error route: catches anything thrown while rendering a
// page or the (site) layout. The ErrorBoundary inside the layout handles
// errors deeper in the page tree, so this is the outer safety net.
export default function ErrorRoute({ error, reset }) {
  useEffect(() => {
    console.error('[app/error]', error)
  }, [error])

  return (
    <StandaloneShell>
      <ErrorScreen
        code="// runtime error"
        title="This page"
        accent="broke"
        detail={
          error?.message
            ? `Details: ${error.message}. Try again — if it keeps happening, the contact form still works and I would genuinely like to know.`
            : 'Try again, or reach another page through the nav. The contact form still works.'
        }
        onRetry={reset}
      />
    </StandaloneShell>
  )
}
