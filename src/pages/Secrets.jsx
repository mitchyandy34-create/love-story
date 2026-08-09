import { useEffect } from 'react';
import SecretSection from '../components/SecretSection';
import Footer from '../components/Footer';

export default function Secrets() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main style={{ paddingTop: '100px' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <p className="text-script" style={{ marginBottom: '10px' }}>Shhh...</p>
        <h1 className="heading-xl">Secrets & Hidden Surprises</h1>
      </div>
      <SecretSection />
      <Footer />
    </main>
  );
}