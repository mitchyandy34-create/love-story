import { useCountdown } from '../hooks/useCountdown';
import { CONFIG } from '../data/config';

export default function BirthdayCountdown() {
  const { timeLeft, isBirthday } = useCountdown();

  const TimeBox = ({ value, label }) => (
    <div
      className="glass"
      style={{
        padding: '20px 30px',
        borderRadius: '16px',
        textAlign: 'center',
        minWidth: '100px',
        border: '1px solid rgba(212,175,55,0.2)',
      }}
    >
      <div
        style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(2rem, 4vw, 3.5rem)',
          fontWeight: 700,
          color: 'var(--gold)',
          lineHeight: 1,
        }}
      >
        {String(value).padStart(2, '0')}
      </div>
      <div
        style={{
          fontSize: '0.8rem',
          color: 'rgba(250,250,250,0.6)',
          marginTop: '8px',
          textTransform: 'uppercase',
                   letterSpacing: '2px',
        }}
      >
        {label}
      </div>
    </div>
  );

  if (isBirthday) {
    return (
      <section
        className="section-padding"
        style={{
          background: 'linear-gradient(135deg, #6b0f1a, #9e1b32, #d4af37)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>
          <div className="heartbeat" style={{ fontSize: '4rem', marginBottom: '20px' }}>🎉</div>
          <h2 className="heading-lg" style={{ marginBottom: '10px' }}>TODAY IS YOUR DAY ❤️</h2>
          <p className="text-script" style={{ fontSize: '2rem' }}>
            Happy Birthday, {CONFIG.herName}!
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="section-padding" style={{ position: 'relative' }}>
      <div className="container" style={{ textAlign: 'center' }}>
        <p
          className="text-script"
          style={{ marginBottom: '10px', opacity: 0.8 }}
        >
          Until I Get To Celebrate You Again...
        </p>
        <h2 className="heading-md" style={{ marginBottom: '40px' }}>
          {CONFIG.herNickname}'s Next Birthday
        </h2>
        <div
          style={{
            display: 'flex',
            gap: '16px',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          <TimeBox value={timeLeft.days} label="Days" />
          <TimeBox value={timeLeft.hours} label="Hours" />
          <TimeBox value={timeLeft.minutes} label="Minutes" />
          <TimeBox value={timeLeft.seconds} label="Seconds" />
        </div>
      </div>
    </section>
  );
}