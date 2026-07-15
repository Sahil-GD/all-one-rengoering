import { ImageResponse } from 'next/og';

export const alt = 'All One Rengoering - Your Mess. Our Mission.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          padding: '80px',
          background: '#0d3155',
          color: '#ffffff',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            fontSize: 26,
            letterSpacing: 2,
            textTransform: 'uppercase',
            color: '#a8d4b8',
          }}
        >
          <span>All One Rengoering</span>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            marginTop: 28,
            fontSize: 104,
            fontWeight: 700,
            lineHeight: 1.02,
            letterSpacing: -3,
          }}
        >
          <span>YOUR MESS.</span>
          <span>OUR MISSION.</span>
        </div>
        <div
          style={{
            display: 'flex',
            marginTop: 36,
            fontSize: 30,
            color: 'rgba(255,255,255,0.75)',
          }}
        >
          <span>Professionel rengoering - Hele Sjaelland</span>
        </div>
      </div>
    ),
    size,
  );
}
