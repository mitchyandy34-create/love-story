import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CONFIG } from '../data/config';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/memories', label: 'Memories' },
    { to: '/music', label: 'Music' },
    { to: '/videos', label: 'Videos' },
    { to: '/admin', label: 'Admin' },
    { to: '/letters', label: 'Letters' },
    { to: '/birthday', label: 'Birthday' },
    { to: '/secrets', label: 'Secrets' },
  ];

  return (
    <nav
      className="glass-strong"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: scrolled ? '12px 20px' : '20px',
        transition: 'all 0.4s ease',
        borderBottom: scrolled ? '1px solid rgba(212,175,55,0.2)' : '1px solid transparent',
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link
          to="/"
          style={{
            fontFamily: 'var(--font-script)',
            fontSize: '1.5rem',
            color: 'var(--rose)',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <span className="heartbeat">❤️</span> For {CONFIG.herNickname}
        </Link>

        {/* Desktop Nav */}
        <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }} className="desktop-nav">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              style={{
                color: location.pathname === link.to ? 'var(--gold)' : 'rgba(250,250,250,0.7)',
                textDecoration: 'none',
                fontSize: '0.9rem',
                fontWeight: 500,
                transition: 'color 0.3s',
                position: 'relative',
              }}
              onMouseEnter={(e) => (e.target.style.color = 'var(--gold)')}
              onMouseLeave={(e) => (e.target.style.color = location.pathname === link.to ? 'var(--gold)' : 'rgba(250,250,250,0.7)')}
            >
              {link.label}
              {location.pathname === link.to && (
                <span
                  style={{
                    position: 'absolute',
                    bottom: '-6px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '20px',
                    height: '2px',
                    background: 'var(--gold)',
                    borderRadius: '1px',
                  }}
                />
              )}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--white)',
            fontSize: '1.5rem',
            cursor: 'pointer',
            display: 'none',
          }}
          className="mobile-menu-btn"
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Nav */}
      {menuOpen && (
        <div
          className="mobile-nav"
          style={{
            display: 'none',
            flexDirection: 'column',
            gap: '20px',
            padding: '20px',
            borderTop: '1px solid var(--glass-border)',
            marginTop: '10px',
          }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              style={{
                color: location.pathname === link.to ? 'var(--gold)' : 'var(--white)',
                textDecoration: 'none',
                fontSize: '1.1rem',
                padding: '8px 0',
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
          .mobile-nav { display: flex !important; }
        }
      `}</style>
    </nav>
  );
}