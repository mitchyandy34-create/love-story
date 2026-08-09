import { useState } from 'react';
import lettersData from '../data/letters';

export default function LoveLetters() {
  const [openLetter, setOpenLetter] = useState(null);

  return (
    <section className="section-padding">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <p className="text-script" style={{ marginBottom: '10px' }}>Words From My Heart</p>
          <h2 className="heading-lg">Letters I Couldn't Fit Into A Text ❤️</h2>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '40px',
            justifyItems: 'center',
            maxWidth: '1200px',
            margin: '0 auto',
          }}
        >
          {lettersData.map((letter) => (
            <div
              key={letter.id}
              className={`envelope ${openLetter === letter.id ? 'open' : ''}`}
              onClick={() => setOpenLetter(openLetter === letter.id ? null : letter.id)}
              style={{ background: letter.color }}
            >
              <div className="envelope-flap" />
              <div className="envelope-body">
                <div style={{ textAlign: 'center', color: 'white' }}>
                  <div style={{ fontSize: '2rem', marginBottom: '10px' }}>💌</div>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', marginBottom: '5px' }}>
                    {letter.title}
                  </h3>
                  <p style={{ fontSize: '0.8rem', opacity: 0.8 }}>{letter.subtitle}</p>
                </div>
              </div>
              <div className="letter-content">
                <h3 style={{ fontFamily: 'var(--font-serif)', marginBottom: '15px', color: 'var(--burgundy)' }}>
                  {letter.title}
                </h3>
                <div style={{ whiteSpace: 'pre-line', color: '#333', fontSize: '0.9rem', lineHeight: 1.7 }}>
                  {letter.content}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}