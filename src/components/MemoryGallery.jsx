import { useState, useCallback } from 'react';
import { memoryCategories } from '../data/memories';
import useSupabaseData from '../hooks/useSupabaseData';

export default function MemoryGallery({ refreshKey }) {
  const [activeCategory, setActiveCategory] = useState('us');
  const [selectedImage, setSelectedImage] = useState(null);
  const [favorites, setFavorites] = useState(new Set());

  const {
    data: memoriesData = [],
    loading: memoriesLoading,
    error: memoriesError,
  } = useSupabaseData('memories', { orderBy: 'id', refreshKey });

  const filtered = memoriesData.filter((m) => m.category === activeCategory);

  const toggleFavorite = useCallback((id, e) => {
    e.stopPropagation();
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const currentIndex = selectedImage ? filtered.findIndex((m) => m.id === selectedImage.id) : -1;

  const navigate = (dir) => {
    const newIndex = currentIndex + dir;
    if (newIndex >= 0 && newIndex < filtered.length) {
      setSelectedImage(filtered[newIndex]);
    }
  };

  return (
    <section className="section-padding">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <p className="text-script" style={{ marginBottom: '10px' }}>Our Little Universe</p>
          <h2 className="heading-lg">Our Memories 📸</h2>
        </div>

        {/* Category Tabs */}
        <div
          style={{
            display: 'flex',
            gap: '10px',
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginBottom: '40px',
          }}
        >
          {memoryCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              style={{
                padding: '10px 20px',
                borderRadius: '30px',
                border: '1px solid',
                borderColor: activeCategory === cat.id ? 'var(--gold)' : 'rgba(255,255,255,0.2)',
                background: activeCategory === cat.id ? 'rgba(212,175,55,0.15)' : 'transparent',
                color: activeCategory === cat.id ? 'var(--gold)' : 'rgba(250,250,250,0.7)',
                cursor: 'pointer',
                fontSize: '0.9rem',
                fontWeight: 500,
                transition: 'all 0.3s',
                whiteSpace: 'nowrap',
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="gallery-grid">
          {filtered.map((memory) => (
            <div
              key={memory.id}
              className="gallery-item reveal"
              onClick={() => setSelectedImage(memory)}
            >
              <img src={memory.src} alt={memory.caption} loading="lazy" />
              <div className="gallery-overlay">
                <h4 style={{ fontFamily: 'var(--font-serif)', marginBottom: '5px' }}>{memory.caption}</h4>
                <p style={{ fontSize: '0.85rem', opacity: 0.8 }}>{memory.date}</p>
                <p style={{ fontSize: '0.8rem', opacity: 0.7, marginTop: '5px' }}>{memory.description}</p>
              </div>
              <button
                onClick={(e) => toggleFavorite(memory.id, e)}
                style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  background: 'rgba(0,0,0,0.5)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '36px',
                  height: '36px',
                  cursor: 'pointer',
                  fontSize: '1.2rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backdropFilter: 'blur(5px)',
                }}
              >
                {favorites.has(memory.id) ? '❤️' : '🤍'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Fullscreen Viewer */}
      {selectedImage && (
        <div className="fullscreen-viewer" onClick={() => setSelectedImage(null)}>
          <button
            onClick={(e) => { e.stopPropagation(); navigate(-1); }}
            style={{
              position: 'absolute',
              left: '20px',
              background: 'rgba(0,0,0,0.5)',
              border: 'none',
              color: 'white',
              fontSize: '2rem',
              cursor: 'pointer',
              padding: '10px 20px',
              borderRadius: '8px',
              display: currentIndex > 0 ? 'block' : 'none',
            }}
          >
            ‹
          </button>
          <div style={{ textAlign: 'center' }} onClick={(e) => e.stopPropagation()}>
            <img src={selectedImage.src} alt={selectedImage.caption} />
            <div style={{ marginTop: '20px', color: 'white' }}>
              <h3 style={{ fontFamily: 'var(--font-serif)', marginBottom: '8px' }}>{selectedImage.caption}</h3>
              <p style={{ opacity: 0.8 }}>{selectedImage.description}</p>
            </div>
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); navigate(1); }}
            style={{
              position: 'absolute',
              right: '20px',
              background: 'rgba(0,0,0,0.5)',
              border: 'none',
              color: 'white',
              fontSize: '2rem',
              cursor: 'pointer',
              padding: '10px 20px',
              borderRadius: '8px',
              display: currentIndex < filtered.length - 1 ? 'block' : 'none',
            }}
          >
            ›
          </button>
          <button
            onClick={() => setSelectedImage(null)}
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              background: 'rgba(0,0,0,0.5)',
              border: 'none',
              color: 'white',
              fontSize: '1.5rem',
              cursor: 'pointer',
              padding: '8px 16px',
              borderRadius: '8px',
            }}
          >
            ✕
          </button>
        </div>
      )}
    </section>
  );
}