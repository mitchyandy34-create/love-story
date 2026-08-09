import futureDreamsData from '../data/futureDreams';

export default function FutureDreams() {
  return (
    <section className="section-padding">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <p className="text-script" style={{ marginBottom: '10px' }}>Our Tomorrow</p>
          <h2 className="heading-lg">Things I Still Want To Do With You...</h2>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '25px',
            maxWidth: '1200px',
            margin: '0 auto',
          }}
        >
          {futureDreamsData.map((dream) => (
            <div
              key={dream.id}
              className="reveal"
              style={{
                background: 'linear-gradient(135deg, rgba(107,15,26,0.2), rgba(10,10,10,0.9))',
                borderRadius: '20px',
                padding: '35px',
                border: '1px solid rgba(255,255,255,0.08)',
                transition: 'all 0.4s ease',
                cursor: 'default',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.borderColor = 'rgba(212,175,55,0.3)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{ fontSize: '2.5rem', marginBottom: '15px' }}>{dream.icon}</div>
              <h3
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.2rem',
                  marginBottom: '12px',
                  color: 'var(--white)',
                }}
              >
                {dream.title}
              </h3>
              <p className="text-body" style={{ fontSize: '0.9rem' }}>
                {dream.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}