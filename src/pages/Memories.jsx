import { useEffect, useState } from 'react';
import MemoryGallery from '../components/MemoryGallery';
import MemoryUpload from '../components/MemoryUpload';
import PolaroidGallery from '../components/PolaroidGallery';
import MemoryReveal from '../components/MemoryReveal';
import Footer from '../components/Footer';

export default function Memories() {
  const [refreshKey, setRefreshKey] = useState(Date.now());

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main style={{ paddingTop: '100px' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <p className="text-script" style={{ marginBottom: '10px' }}>Every Moment Matters</p>
        <h1 className="heading-xl">Our Memories</h1>
      </div>
      <MemoryUpload onUploaded={() => setRefreshKey(Date.now())} />
      <MemoryGallery refreshKey={refreshKey} />
      <PolaroidGallery />
      <MemoryReveal />
      <Footer />
    </main>
  );
}