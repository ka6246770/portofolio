import StandaloneShell from '../components/StandaloneShell'
import NotFoundView from '../components/NotFoundView'

// Unknown routes land here. It sits outside the (site) route group, so
// it borrows the chrome through StandaloneShell and skips the loader —
// there is no reason to make a 404 wait behind an intro animation.
export default function NotFound() {
  return (
    <StandaloneShell>
      <NotFoundView />
    </StandaloneShell>
  )
}
