import { useState } from 'react';

export default function LoveMeter() {
  const [calculating, setCalculating] = useState(false);
  const [percentage, setPercentage] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const calculate = () => {
    setCalculating(true);
    setShowResult(false);
    setPercentage(0);
    
    const steps = [0, 50, 100, 200, 500, 999, 1000];
    let stepIndex = 0;
    
    const interval = setInterval(() => {
      if (stepIndex < steps.length) {
        setPercentage(steps[stepIndex]);
        stepIndex++;
      } else {
        clearInterval(interval);
        setCalculating(false);
        setShowResult(true);
      }
    }, 600);
  };

  return (
    <section className="section-padding">
      <div className="container" style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
        <p className="text-script" style={{ marginBottom: '10px' }}>Let's Find Out</p>
        <h2 className="heading-lg" style={{ marginBottom: '40px' }}>How Much Do I Love You?</h2>

        <div
          style={{
            background: 'linear-gradient(135deg, rgba(107,15,26,0.3), rgba(10,10,10,0.9))',
            borderRadius: '24px',
            padding: '50px',
            border: '1px solid rgba(212,175,55,0.15)',
          }}
        >
          {/* Meter */}
          <div
            style={{
              height: '40px',
              background: 'rgba(255,255,255,0.05)',
              borderRadius: '20px',
              overflow: 'hidden',
              marginBottom: '30px',
              position: 'relative',
            }}
          >
            <div
              className="love-meter-fill"
              style={{
                height: '100%',
                width: `${Math.min(percentage / 10, 100)}%`,
                background: 'linear-gradient(to right, var(--burgundy), var(--rose), var(--gold))',
                borderRadius: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                paddingRight: '15px',
              }}
            >
              {percentage > 50 && (
                <span style={{ color: 'white', fontWeight: 700, fontSize: '0.9rem' }}>
                  {percentage > 999 ? '∞' : `${percentage}%`}
                </span>
              )}
            </div>
          </div>

          <div style={{ fontSize: '3rem', marginBottom: '20px' }}>
            {percentage === 0 && '🤍'}
            {percentage > 0 && percentage < 100 && '💗'}
            {percentage >= 100 && percentage < 500 && '💖'}
            {percentage >= 500 && percentage < 1000 && '💝'}
            {percentage >= 1000 && '💕'}
          </div>

          {!calculating && !showResult && (
            <button onClick={calculate} className="btn-primary" style={{ fontSize: '1.1rem' }}>
              Calculate My Love ❤️
            </button>
          )}

          {calculating && (
            <p style={{ color: 'var(--gold)', fontFamily: 'var(--font-serif)', fontSize: '1.3rem' }}>
              Calculating... {percentage > 999 ? '∞' : `${percentage}%`}
            </p>
          )}

          {showResult && (
            <div style={{ animation: 'fadeInUp 1s ease' }}>
              <p
                className="text-script"
                style={{ fontSize: '2rem', color: 'var(--gold)', marginBottom: '15px' }}
              >
                ∞%
              </p>
              <p className="text-body" style={{ fontSize: '1.1rem' }}>
                "Yeah... apparently JavaScript doesn't have a number big enough."
              </p>
              <p className="text-script" style={{ marginTop: '15px', fontSize: '1.3rem' }}>
                I love you more than words, numbers, or code can express.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}