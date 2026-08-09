import { useState } from 'react';
import reasonsData from '../data/reasons';

export default function Reasons() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);

  const nextReason = () => {
    if (isFlipping) return;
    setIsFlipping(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % reasonsData.length);
      setIsFlipping(false);
    }, 400);
  };

  const prevReason = () => {
    if (isFlipping) return;
    setIsFlipping(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + reasonsData.length) % reasonsData.length);
      setIsFlipping(false);
    }, 400);
  };

  return (
    <section className="section-padding">
      <div className="container" style={{ textAlign: 'center' }}>
        <p className="text-script" style={{ marginBottom: '10px' }}>Every Single One Is True</p>
        <h2 className="heading-lg" style={{ marginBottom: '50px' }}>
          100 Reasons Why You're My Favorite Person
        </h2>

        <div
          style={{
            maxWidth: '500px',
            margin: '0 auto 30px',
            perspective: '1000px',
          }}
        >
          <div
            style={{
              background: 'linear-gradient(135deg, rgba(107,15,26,0.4), rgba(10,10,10,0.9))',
              borderRadius: '24px',
              padding: '60px 40px',
              border: '1px solid rgba(212,175,55,0.2)',
              minHeight: '280px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              transform: isFlipping ? 'rotateY(90deg)' : 'rotateY(0)',
              transition: 'transform 0.4s ease',
              backfaceVisibility: 'hidden',
            }}
          >
            <div
              style={{
                fontSize: '4rem',
                marginBottom: '20px',
                opacity: 0.3,
              }}
            >
              ❤️
            </div>
            <div
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(1.3rem, 3vw, 1.8rem)',
                lineHeight: 1.5,
                color: 'var(--white)',
              }}
            >
              <span style={{ color: 'var(--gold)', fontWeight: 700 }}>
                {String(currentIndex + 1).padStart(2, '0')}
              </span>{' '}
              — {reasonsData[currentIndex]}
            </div>
          </div>
        </div>

        <p style={{ color: 'var(--rose)', marginBottom: '30px', fontSize: '0.9rem' }}>
          Reason {currentIndex + 1} of {reasonsData.length} ❤️
        </p>

        <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
          <button onClick={prevReason} className="btn-secondary">← Previous</button>
          <button onClick={nextReason} className="btn-primary">Next Reason →</button>
        </div>
      </div>
    </section>
  );
}