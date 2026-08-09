import { useEffect } from 'react';
import MusicPlayer from '../components/MusicPlayer';
import Footer from '../components/Footer';

export default function Music() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main style={{ paddingTop: '100px' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <p className="text-script" style={{ marginBottom: '10px' }}>Our Soundtrack</p>
        <h1 className="heading-xl">Our Music</h1>
      </div>
      <MusicPlayer />
      <Footer />
    </main>
  );
}