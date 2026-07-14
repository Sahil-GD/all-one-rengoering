import { ImageResponse } from 'next/og';

export const alt = 'All One Rengøring — Your Mess. Our Mission.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/**
 * Site-wide social card, generated at build time from brand tokens — no
 * design file to keep in sync, and it can never drift from the palette.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          background: '#0d3155',
          color: '#ffffff',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            fontSize: 26,
            letterSpacing: 2,
            textTransform: 'uppercase',
            color: '#a8d4b8',
          }}
        >
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 999,
              background: '#2f8348',
            }}
          />
          All One Rengøring
        </div>

        <div
          style={{
            marginTop: 28,
            fontSize: 104,
            fontWeight: 700,
            lineHeight: 1.02,
            letterSpacing: -3,
          }}
        >
          YOUR MESS.
          <br />
          OUR MISSION.
        </div>

        <div style={{ marginTop: 36, fontSize: 30, color: 'rgba(255,255,255,0.75)' }}>
          Professionel rengøring · Hele Sjælland
        </div>
      </div>
    ),
    size,
  );
}