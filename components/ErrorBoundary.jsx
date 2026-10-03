'use client'

import { Component } from 'react'
import ErrorScreen from './ErrorScreen'

// ============================================================
// ERROR BOUNDARY
// Wraps the routed page tree so a crash in one section cannot
// blank the whole site — the nav and footer stay alive because
// the boundary sits below the chrome. Class component because
// componentDidCatch has no hook equivalent.
// ============================================================
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { error: null }
    this.handleReset = this.handleReset.bind(this)
  }

  static getDerivedStateFromError(error) {
    return { error }
  }

  componentDidCatch(error, info) {
    // Keep it visible in the console for debugging; never throw here.
    console.error('[ErrorBoundary]', error, info?.componentStack)
  }

  handleReset() {
    this.setState({ error: null })
  }

  render() {
    if (this.state.error) {
      return (
        <ErrorScreen
          detail={
            this.state.error.message
              ? `Details: ${this.state.error.message}. The rest of the site still works — retry, or reach another page through the nav.`
              : undefined
          }
          onRetry={this.handleReset}
        />
      )
    }
    return this.props.children
  }
}
