import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { CONFIG } from '../data/config';
import profileImage from '../assets/mm1.jpeg';

export default function Hero() {
  const heroRef = useRef(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = (clientX / innerWidth - 0.5) * 20;
      const y = (clientY / innerHeight - 0.5) * 20;
      hero.style.setProperty('--parallax-x', `${x}px`);
      hero.style.setProperty('--parallax-y', `${y}px`);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section
      ref={heroRef}
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        paddingTop: '80px',
      }}
    >
      {/* Background glow */}
      <div
        style={{
          position: 'absolute',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(107,15,26,0.3), transparent 70%)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          filter: 'blur(60px)',
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
        <div
          className="animate-fade-in"
          style={{
            width: '180px',
            height: '180px',
            borderRadius: '50%',
            margin: '0 auto 40px',
            overflow: 'hidden',
            border: '3px solid var(--gold)',
            boxShadow: '0 0 40px rgba(212,175,55,0.3)',
            position: 'relative',
          }}
        >
          <img
            src={profileImage}
            alt="Her"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transform: 'translate(var(--parallax-x, 0), var(--parallax-y, 0))',
              transition: 'transform 0.3s ease-out',
            }}
          />
        </div>

        <h1
          className="heading-xl animate-fade-in-up"
          style={{ marginBottom: '20px', animationDelay: '0.3s' }}
        >
          {CONFIG.heroTitle}
        </h1>

        <p
          className="text-body animate-fade-in-up"
          style={{
            maxWidth: '600px',
            margin: '0 auto 50px',
            fontSize: '1.1rem',
            animationDelay: '0.6s',
          }}
        >
          {CONFIG.heroSubtitle}
        </p>

        <div
          className="animate-fade-in-up"
          style={{
            display: 'flex',
            gap: '16px',
            justifyContent: 'center',
            flexWrap: 'wrap',
            animationDelay: '0.9s',
          }}
        >
          <Link to="/memories" className="btn-primary">
            Our Story ❤️
          </Link>
          <Link to="/memories" className="btn-secondary">
            Our Memories 📸
          </Link>
          <Link to="/music" className="btn-secondary">
            Our Music 🎵
          </Link>
          <Link to="/letters" className="btn-secondary">
            My Letters 💌
          </Link>
          <Link to="/birthday" className="btn-secondary">
            Your Birthday Wish 🎂
          </Link>
        </div>
      </div>
    </section>
  );
}