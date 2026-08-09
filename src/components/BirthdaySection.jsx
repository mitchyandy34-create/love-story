import { useState, useEffect } from 'react';
import { CONFIG } from '../data/config';

export default function BirthdaySection() {
  const [candlesLit, setCandlesLit] = useState([true, true, true, true, true]);
  const [showWish, setShowWish] = useState(false);
  const [confetti, setConfetti] = useState([]);

  const blowCandle = (index) => {
    setCandlesLit((prev) => {
      const next = [...prev];
      next[index] = false;
      return next;
    });
  };

  useEffect(() => {
    if (candlesLit.every((c) => !c) && !showWish) {
      setTimeout(() => setShowWish(true), 1000);
      // Launch confetti
      const newConfetti = [...Array(50)].map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 2,
        color: ['#d4af37', '#e8b4b8', '#6b0f1a', '#ffffff', '#ff69b4'][Math.floor(Math.random() * 5)],
      }));
      setConfetti(newConfetti);
    }
  }, [candlesLit, showWish]);

  return (
    <section className="section-padding" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Confetti */}
      {confetti.map((c) => (
        <div
          key={c.id}
          className="confetti"
          style={{
            left: `${c.left}%`,
            background: c.color,
            animationDelay: `${c.delay}s`,
            animationDuration: `${3 + Math.random() * 3}s`,
          }}
        />
      ))}

      <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>
        <p className="text-script" style={{ marginBottom: '10px' }}>Today Isn't Just Another Day...</p>
        <h2 className="heading-lg" style={{ marginBottom: '20px' }}>
          Today is the day the world got a little more beautiful because you were born.
        </h2>

        {/* Cake */}
        <div
          style={{
            width: '200px',
            height: '120px',
            margin: '40px auto',
            background: 'linear-gradient(to bottom, #f4a460, #d2691e)',
            borderRadius: '10px 10px 20px 20px',
            position: 'relative',
            boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
          }}
        >
          {/* Icing */}
          <div
            style={{
              position: 'absolute',
              top: '-10px',
              left: '0',
              right: '0',
              height: '20px',
              background: '#fff5e6',
              borderRadius: '10px 10px 0 0',
            }}
          />
          
          {/* Candles */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-around',
              position: 'absolute',
              top: '-30px',
              left: '20px',
              right: '20px',
            }}
          >
            {candlesLit.map((lit, i) => (
              <div
                key={i}
                className={`candle ${!lit ? 'extinguished' : ''}`}
                onClick={() => lit && blowCandle(i)}
                style={{ cursor: lit ? 'pointer' : 'default' }}
              />
            ))}
          </div>
        </div>

        <p className="text-body" style={{ marginBottom: '30px' }}>
          Click the candles to blow them out 🎂
        </p>

        {showWish && (
          <div style={{ animation: 'fadeInUp 1.5s ease both' }}>
            <h3
              className="heading-md"
              style={{ color: 'var(--gold)', marginBottom: '15px' }}
            >
              Make a Wish, Beautiful...
            </h3>
            <p className="text-script" style={{ fontSize: '1.5rem' }}>
              And whatever you wished for, I hope life gives you even more.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}