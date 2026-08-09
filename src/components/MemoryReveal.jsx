import { useState } from 'react';
import useSupabaseData from '../hooks/useSupabaseData';

export default function MemoryReveal() {
  const [revealed, setRevealed] = useState(new Set());

  const { data: hiddenMemories = [] } = useSupabaseData('hidden_memories', { orderBy: 'id' });

  const reveal = (id) => {
    setRevealed((prev) => new Set(prev).add(id));
  };

  return (
    <section className="section-padding">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <p className="text-script" style={{ marginBottom: '10px' }}>Hidden Treasures</p>
          <h2 className="heading-lg">Things I Never Want To Forget...</h2>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '30px',
            maxWidth: '1000px',
            margin: '0 auto',
          }}
        >
          {hiddenMemories.map((memory) => (
            <div
              key={memory.id}
              style={{
                textAlign: 'center',
                padding: '20px',
              }}
            >
              <div
                style={{
                  position: 'relative',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  marginBottom: '20px',
                  aspectRatio: '4/3',
                }}
              >
                <img
                  src={memory.src}
                  alt="Memory"
                  className={`reveal-image ${revealed.has(memory.id) ? 'revealed' : ''}`}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
                {!revealed.has(memory.id) && (
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'rgba(0,0,0,0.7)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backdropFilter: 'blur(10px)',
                    }}
                  >
                    <button
                      onClick={() => reveal(memory.id)}
                      className="btn-primary"
                      style={{ fontSize: '0.9rem', padding: '12px 24px' }}
                    >
                      Reveal Memory ❤️
                    </button>
                  </div>
                )}
              </div>
              {revealed.has(memory.id) && (
                <p
                  className="text-body"
                  style={{
                    fontStyle: 'italic',
                    animation: 'fadeInUp 0.8s ease',
                    fontSize: '0.95rem',
                  }}
                >
                  "{memory.description}"
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}