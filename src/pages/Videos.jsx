import { useEffect } from 'react';
import useSupabaseData from '../hooks/useSupabaseData';
import Footer from '../components/Footer';

export default function Videos() {
  const { data: videos = [] } = useSupabaseData('videos', { orderBy: 'id' });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main style={{ paddingTop: '100px' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <p className="text-script" style={{ marginBottom: '10px' }}>Our Favorite Moments</p>
        <h1 className="heading-xl">Videos</h1>
      </div>

      <section className="section-padding">
        <div className="container">
          <div style={{ display: 'grid', gap: '40px' }}>
            {videos.map((video) => (
              <article key={video.id} style={{ borderRadius: '24px', overflow: 'hidden', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)', padding: '30px' }}>
                <div style={{ display: 'grid', gap: '20px' }}>
                  <div style={{ display: 'grid', gap: '15px' }}>
                    <p className="text-script">{video.date || 'Unknown date'}</p>
                    <h2 className="heading-md">{video.title}</h2>
                    <p className="text-body">{video.description}</p>
                  </div>
                  {video.videoUrl && (
                    <div style={{ position: 'relative', aspectRatio: '16/9', overflow: 'hidden', borderRadius: '20px' }}>
                      <video controls style={{ width: '100%', height: '100%', objectFit: 'cover' }} src={video.videoUrl} poster={video.thumbnailUrl || undefined} />
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
