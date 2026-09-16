import { ImageResponse } from 'next/og'
import site from '../data/site'

export const alt = 'Khaled Waleed — Frontend Developer & Next.js Specialist'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  const [firstName, ...rest] = site.name.split(' ')
  const lastName = rest.join(' ')
  const tagline = `${site.roles[0]} · ${site.roles[2]} · Next.js & React`

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 72,
          background: '#0a0a0a',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ fontSize: 28, fontWeight: 800, color: '#39ff14' }}>
            KW_
          </div>
          <div
            style={{
              width: 160,
              height: 2,
              background: '#39ff14',
              opacity: 0.7,
            }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', fontSize: 84, fontWeight: 800, color: '#e8e8e8' }}>
            {firstName}
            <span style={{ color: '#39ff14' }}>{lastName}</span>
          </div>
          <div style={{ display: 'flex', fontSize: 32, color: '#a0a0a0', marginTop: 24 }}>
            {tagline}
          </div>
        </div>
      </div>
    ),
    size,
  )
}