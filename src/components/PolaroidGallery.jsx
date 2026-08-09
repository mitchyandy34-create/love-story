import { useState } from 'react';
import useSupabaseData from '../hooks/useSupabaseData';

export default function PolaroidGallery() {
  const [selected, setSelected] = useState(null);
  const { data: polaroids = [] } = useSupabaseData('polaroids', { orderBy: 'id' });

  return (
    <section className="section-padding">
      <div class="container">
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <p className="text-script" style={{ marginBottom: '10px' }}>Captured Moments</p>
          <h2 className="heading-lg">Our Memories — Polaroid Style</h2>
        </div>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '30px',
            padding: '20px',
          }}
        >
          {polaroids.map((p, i) => (
            <div
              key={p.id}
              className="polaroid"
              onClick={() => setSelected(selected === p.id ? null : p.id)}
              style={{
                '--rotation': `${-8 + i * 3}deg`,
                width: selected === p.id ? '320px' : '220px',
                transform: selected === p.id ? 'rotate(0deg) scale(1.1)' : undefined,
                zIndex: selected === p.id ? 10 : 1,
              }}
            >
              <img src={p.src} alt={p.caption} style={{ width: '100%', aspectRatio: '1', objectFit: 'cover' }} />
              <div style={{ padding: '10px 5px 0', textAlign: 'center', color: '#333' }}>
                <p style={{ fontFamily: 'var(--font-script)', fontSize: '1.1rem', marginBottom: '5px' }}>{p.caption}</p>
                <p style={{ fontSize: '0.75rem', color: '#666' }}>{p.date} • {p.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}