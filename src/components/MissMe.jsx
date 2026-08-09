import { useState } from 'react';
import { CONFIG } from '../data/config';
import romanticQuotes from '../data/quotes';

export default function MissMe() {
  const [revealed, setRevealed] = useState(false);

  return (
    <section className="section-padding">
      <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <p className="text-script" style={{ marginBottom: '10px' }}>For The Hard Days</p>
          <h2 className="heading-lg">For The Days You Miss Me ❤️</h2>
        </div>

        <div
          className="glass"
          style={{
            padding: '50px',
            borderRadius: '24px',
            textAlign: 'center',
            border: '1px solid rgba(212,175,55,0.15)',
          }}
        >
          {!revealed ? (
            <>
              <div style={{ fontSize: '4rem', marginBottom: '20px' }}>💭</div>
              <p className="text-body" style={{ marginBottom: '30px', fontSize: '1.1rem' }}>
                "If you're here because you miss me, close your eyes for a second..."
              </p>
              <button onClick={() => setRevealed(true)} className="btn-primary">
                I'm Ready ❤️
              </button>
            </>
          ) : (
            <div style={{ animation: 'fadeIn 2s ease' }}>
              <p
                className="text-body"
                style={{
                  fontSize: '1.1rem',
                  lineHeight: 2,
                  marginBottom: '30px',
                  fontStyle: 'italic',
                }}
              >
                "I know distance is hard. I know missing someone hurts in a way that words can't fix. 
                But I want you to know that every mile between us is temporary, and my love for you is permanent.
                
                When you miss me, look at the moon. We're under the same one. 
                When you miss me, play our song. I'm singing it too.
                When you miss me, remember that I am missing you more.
                
                This distance is just a chapter. Our story is much longer. 
                And every day apart is one day closer to being together again.
                
                I love you. I miss you. And I'm counting the moments until I can hold you again."
              </p>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                  gap: '15px',
                  margin: '30px 0',
                }}
              >
                {romanticQuotes.slice(0, 4).map((quote, i) => (
                  <div
                    key={i}
                    className="glass"
                    style={{
                      padding: '20px',
                      borderRadius: '12px',
                      fontSize: '0.85rem',
                      fontStyle: 'italic',
                      textAlign: 'left',
                    }}
                  >
                    "{quote}"
                  </div>
                ))}
              </div>

              <div style={{ marginTop: '30px' }}>
                <p className="text-script" style={{ color: 'var(--gold)' }}>
                  "I'm always with you, even when I'm not."
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}