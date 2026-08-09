import { useEffect } from 'react';
import MissMe from '../components/MissMe';
import Footer from '../components/Footer';

export default function MissMePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main style={{ paddingTop: '100px' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <p className="text-script" style={{ marginBottom: '10px' }}>For The Lonely Moments</p>
        <h1 className="heading-xl">For The Days You Miss Me ❤️</h1>
      </div>
      <MissMe />
      <Footer />
    </main>
  );
}