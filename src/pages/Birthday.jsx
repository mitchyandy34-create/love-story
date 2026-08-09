import { useEffect } from 'react';
import BirthdayCountdown from '../components/BirthdayCountdown';
import BirthdaySection from '../components/BirthdaySection';
import BirthdayLetter from '../components/BirthdayLetter';
import Footer from '../components/Footer';

export default function Birthday() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main style={{ paddingTop: '100px' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <p className="text-script" style={{ marginBottom: '10px' }}>The Most Special Day</p>
        <h1 className="heading-xl">Happy Birthday, My Love 🎂</h1>
      </div>
      <BirthdayCountdown />
      <BirthdaySection />
      <BirthdayLetter />
      <Footer />
    </main>
  );
}