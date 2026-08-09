import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SecretSection() {
  const [clickCount, setClickCount] = useState(0);
  const [secretRevealed, setSecretRevealed] = useState(false);
  const [konami, setKonami] = useState([]);
  const navigate = useNavigate();

  // Konami code: "love"
  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key.toLowerCase();
      setKonami((prev) => {
        const next = [...prev, key].slice(-4);
        if (next.join('') === 'love') {
          setSecretRevealed(true);
        }
        return next;
      });
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleHeartClick = () => {
    const next = clickCount + 1;
    setClickCount(next);
    if (next >= 5) {
      setSecretRevealed(true);
    }
  };

  return (
    <section className="section-padding" style={{ position: 'relative', minHeight: '80vh' }}>
      {/* Hidden heart - click 5 times */}
      <div
        className={`secret-heart ${clickCount > 0 ? 'active' : ''}`}
        onClick={handleHeartClick}
        style={{ bottom: '20px', right: '20px' }}
        title="Hmm... what happens if you click me?"
      >
        {clickCount > 0 ? '❤️' : '🤍'}
      </div>

      <div className="container" style={{ textAlign: 'center' }}>
        <p className="text-script" style={{ marginBottom: '10px' }}>Shhh...</p>
        <h2 className="heading-lg" style={{ marginBottom: '30px' }}>Secrets & Surprises</h2>
        <p className="text-body" style={{ marginBottom: '40px', maxWidth: '500px', margin: '0 auto 40px' }}>
          There are hidden surprises throughout this website. Can you find them all?
          <br /><br />
          <em style={{ opacity: 0.6, fontSize: '0.9rem' }}>Hint: Try typing "love" anywhere, or look for hidden hearts...</em>
        </p>

        {secretRevealed && (
          <div
            className="glass"
            style={{
              maxWidth: '600px',
              margin: '0 auto',
              padding: '40px',
              borderRadius: '20px',
              border: '1px solid var(--gold)',
              animation: 'fadeInUp 1s ease',
            }}
          >
            <div style={{ fontSize: '3rem', marginBottom: '20px' }}>🎉</div>
            <h3
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.5rem',
                color: 'var(--gold)',
                marginBottom: '15px',
              }}
            >
              You Found Something That Wasn't Supposed To Be Easy To Find 👀❤️
            </h3>
            <p className="text-body" style={{ lineHeight: 2 }}>
              "You are the most beautiful surprise life ever gave me. 
              Every day with you feels like discovering something new and wonderful about the world.
              Thank you for being my favorite secret, my best surprise, and my greatest adventure."
            </p>
            <button
              onClick={() => navigate('/miss-me')}
              className="btn-primary"
              style={{ marginTop: '25px' }}
            >
              There's More... 💌
            </button>
          </div>
        )}
      </div>
    </section>
  );
}