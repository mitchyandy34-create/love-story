import { useEffect } from 'react';
import MediaAdmin from '../components/MediaAdmin';
import Footer from '../components/Footer';

export default function Admin() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main style={{ paddingTop: '100px' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <p className="text-script" style={{ marginBottom: '10px' }}>Admin Dashboard</p>
        <h1 className="heading-xl">Manage Media</h1>
      </div>
      <MediaAdmin />
      <Footer />
    </main>
  );
}
