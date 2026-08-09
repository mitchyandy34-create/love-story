import { useState, useEffect } from 'react';
import { CONFIG } from '../data/config';

export default function IntroScreen({ onComplete }) {
  const [step, setStep] = useState(0);
  const [fadeState, setFadeState] = useState('in');

  const messages = [
    "Hey Beautiful...",
    "I made something for you.",
    "Something no gift shop could sell.",
    "Something only I could give you.",
    `Happy Birthday, My Love ❤️`,
    "Welcome to our story.",
  ];

  useEffect(() => {
    if (step >= messages.length) return;
    
    const fadeInTimer = setTimeout(() => setFadeState('in'), 100);
    const fadeOutTimer = setTimeout(() => setFadeState('out'), 2500);
    const nextTimer = setTimeout(() => setStep((s) => s + 1), 3200);

    return () => {
      clearTimeout(fadeInTimer);
      clearTimeout(fadeOutTimer);
      clearTimeout(nextTimer);
    };
  }, [step]);

  if (step >= messages.length) {
    return (
      <div
        style={{
          position: 'fixed',
          inset: 0,
          background: 'linear-gradient(135deg, #0a0a0a, #1a0a0e, #0a0a0a)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          animation: 'fadeIn 1s ease',
        }}
      >
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <h1
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2rem, 5vw, 4rem)',
              color: 'var(--white)',
              marginBottom: '20px',
              animation: 'fadeInUp 1s ease 0.5s both',
            }}
          >
            {messages[4]}
          </h1>
          <p
            style={{
              fontFamily: 'var(--font-script)',
              fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
              color: 'var(--rose)',
              marginBottom: '40px',
              animation: 'fadeInUp 1s ease 1s both',
            }}
          >
            {messages[5]}
          </p>
          <button
            onClick={onComplete}
            className="btn-primary"
            style={{
              animation: 'fadeInUp 1s ease 1.5s both',
              fontSize: '1.1rem',
              padding: '18px 40px',
            }}
          >
            Enter My Heart ❤️
          </button>
        </div>
        
        {/* Floating hearts background */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              fontSize: `${20 + i * 10}px`,
              left: `${10 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
              opacity: 0.15,
              animation: `float ${4 + i}s ease-in-out infinite`,
              animationDelay: `${i * 0.5}s`,
            }}
          >
            ❤️
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'linear-gradient(135deg, #0a0a0a, #1a0a0e, #0a0a0a)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
      }}
    >
      <h1
        style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(1.8rem, 5vw, 3.5rem)',
          color: 'var(--white)',
          textAlign: 'center',
          padding: '20px',
          opacity: fadeState === 'in' ? 1 : 0,
          transform: fadeState === 'in' ? 'translateY(0)' : 'translateY(-20px)',
          transition: 'all 0.8s ease',
        }}
      >
        {messages[step]}
      </h1>
    </div>
  );
}