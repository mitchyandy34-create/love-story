import { useState, useEffect } from 'react';

const statements = [
  "I'd give you every sunrise.",
  "Every peaceful night.",
  "Every reason to smile.",
  "Every dream your heart has ever whispered.",
];

export default function GiveWorld() {
  const [visibleCount, setVisibleCount] = useState(0);
  const [showConclusion, setShowConclusion] = useState(false);

  useEffect(() => {
    if (visibleCount < statements.length) {
      const timer = setTimeout(() => setVisibleCount((c) => c + 1), 1500);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => setShowConclusion(true), 2000);
      return () => clearTimeout(timer);
    }
  }, [visibleCount]);

  return (
    <section
      className="section-padding"
      style={{
        background: 'linear-gradient(to bottom, #0a0a0a, #1a0a0e, #0a0a0a)',
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <div className="container" style={{ textAlign: 'center' }}>
        <h2 className="heading-lg" style={{ marginBottom: '50px' }}>
          If I Could Give You The World...
        </h2>

        <div style={{ marginBottom: '40px', minHeight: '200px' }}>
          {statements.slice(0, visibleCount).map((stmt, i) => (
            <p
              key={i}
              className="text-script"
              style={{
                fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
                marginBottom: '20px',
                animation: 'fadeInUp 1s ease both',
                animationDelay: `${i * 0.1}s`,
              }}
            >
              {stmt}
            </p>
          ))}
        </div>

        {visibleCount >= statements.length && (
          <div style={{ animation: 'fadeIn 2s ease 1s both' }}>
            <p className="text-body" style={{ fontSize: '1.1rem', marginBottom: '20px' }}>
              But since I can't give you the world...
            </p>
            {showConclusion && (
              <p
                className="text-script"
                style={{
                  fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
                  color: 'var(--gold)',
                  animation: 'fadeInUp 1.5s ease both',
                }}
              >
                I'll spend my time trying to make your little corner of it beautiful.
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}