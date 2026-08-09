import { useEffect } from 'react';
import LoveLetters from '../components/LoveLetters';
import BirthdayLetter from '../components/BirthdayLetter';
import Footer from '../components/Footer';

export default function Letters() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main style={{ paddingTop: '100px' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <p className="text-script" style={{ marginBottom: '10px' }}>Words From My Heart</p>
        <h1 className="heading-xl">My Letters To You</h1>
      </div>
      <LoveLetters />
      <BirthdayLetter />
      <Footer />
    </main>
  );
}