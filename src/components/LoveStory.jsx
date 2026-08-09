import { useEffect, useRef } from 'react';
import useSupabaseData from '../hooks/useSupabaseData';

export default function LoveStory() {
  const sectionRef = useRef(null);

  const { data: timelineData = [] } = useSupabaseData('timeline', { orderBy: 'id' });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    const items = sectionRef.current?.querySelectorAll('.timeline-item');
    items?.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="section-padding" style={{ position: 'relative' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <p className="text-script" style={{ marginBottom: '10px' }}>Our Journey</p>
          <h2 className="heading-lg">Our Love Story</h2>
        </div>

        <div style={{ position: 'relative', maxWidth: '1000px', margin: '0 auto' }}>
          <div className="timeline-line" />

          {timelineData.map((item, index) => (
            <div
              key={item.id}
              className="timeline-item reveal"
              style={{
                display: 'flex',
                justifyContent: index % 2 === 0 ? 'flex-start' : 'flex-end',
                marginBottom: '60px',
                position: 'relative',
              }}
            >
              <div
                style={{
                  width: '45%',
                  padding: '30px',
                  background: 'linear-gradient(135deg, rgba(107,15,26,0.3), rgba(10,10,10,0.8))',
                  borderRadius: '16px',
                  border: '1px solid rgba(212,175,55,0.15)',
                  position: 'relative',
                  backdropFilter: 'blur(10px)',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: '50%',
                    [index % 2 === 0 ? 'right' : 'left']: '-50px',
                    transform: 'translateY(-50%)',
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, var(--burgundy), var(--gold))',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.2rem',
                    boxShadow: '0 0 20px rgba(212,175,55,0.3)',
                    zIndex: 2,
                  }}
                >
                  {item.icon}
                </div>

                <span
                  style={{
                    color: 'var(--gold)',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                  }}
                >
                  {item.date}
                </span>
                <h3
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.5rem',
                    margin: '10px 0 15px',
                    color: 'var(--white)',
                  }}
                >
                  {item.title}
                </h3>
                <p className="text-body" style={{ fontSize: '0.95rem', marginBottom: '15px' }}>
                  {item.description}
                </p>
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.title}
                    style={{
                      width: '100%',
                      borderRadius: '8px',
                      marginTop: '10px',
                      opacity: 0.9,
                    }}
                    loading="lazy"
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .timeline-item { justify-content: flex-end !important; }
          .timeline-item > div { width: calc(100% - 50px) !important; }
          .timeline-item > div > div:first-child { left: -45px !important; right: auto !important; }
        }
      `}</style>
    </section>
  );
}