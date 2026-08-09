import { Link } from 'react-router-dom';
import { CONFIG } from '../data/config';

export default function FinalSection() {
  return (
    <section
      className="section-padding"
      style={{
        background: 'linear-gradient(to bottom, #0a0a0a, #1a0a0e)',
        textAlign: 'center',
      }}
    >
      <div className="container" style={{ maxWidth: '800px' }}>
        <div style={{ fontSize: '4rem', marginBottom: '20px' }}>❤️</div>
        
        <h2 className="heading-lg" style={{ marginBottom: '15px' }}>
          And That's Our Story... So Far.
        </h2>
        
        <p className="text-body" style={{ marginBottom: '15px', fontSize: '1.1rem' }}>
          "Thank you for being one of the most beautiful chapters of my life."
        </p>
        
        <p className="text-body" style={{ marginBottom: '30px', fontSize: '1.1rem' }}>
          "But I don't want this website to end here..."
        </p>
        
        <p
          className="text-script"
          style={{
            fontSize: 'clamp(1.3rem, 2.5vw, 1.8rem)',
            marginBottom: '40px',
          }}
        >
          "Because I want us to keep adding memories."
        </p>

        <Link to="/memories" className="btn-primary" style={{ marginBottom: '50px' }}>
          Add Another Memory ❤️
        </Link>

        <div style={{ marginTop: '60px', paddingTop: '40px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <p className="text-script" style={{ fontSize: '2rem', color: 'var(--gold)', marginBottom: '10px' }}>
            Happy Birthday, My Beautiful Girl.
          </p>
          <p className="text-body" style={{ fontSize: '1.1rem', fontStyle: 'italic' }}>
            "Here's to you. Here's to us. Here's to every memory we haven't made yet."
          </p>
          <div style={{ marginTop: '30px', fontSize: '2rem' }}>❤️</div>
        </div>
      </div>
    </section>
  );
}