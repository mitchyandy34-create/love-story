import { CONFIG } from '../data/config';

export default function Footer() {
  return (
    <footer
      style={{
        padding: '40px 20px',
        textAlign: 'center',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        background: '#0a0a0a',
      }}
    >
      <p
        style={{
          fontFamily: 'var(--font-script)',
          color: 'var(--rose)',
          fontSize: '1.2rem',
          marginBottom: '10px',
        }}
      >
        Made with endless love for {CONFIG.herName}
      </p>
      <p style={{ fontSize: '0.8rem', color: 'rgba(250,250,250,0.3)' }}>
        "Someone actually put serious effort into making this." ❤️
      </p>
    </footer>
  );
}