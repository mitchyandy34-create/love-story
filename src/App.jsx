import { Routes, Route, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import IntroScreen from './components/IntroScreen';
import ParticleBackground from './components/ParticleBackground';
import FloatingHearts from './components/FloatingHearts';
import Home from './pages/Home';
import Memories from './pages/Memories';
import Music from './pages/Music';
import Videos from './pages/Videos';
import Admin from './pages/Admin';
import Letters from './pages/Letters';
import Birthday from './pages/Birthday';
import Secrets from './pages/Secrets';
import MissMePage from './pages/MissMePage';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  const [introComplete, setIntroComplete] = useState(() => {
    return sessionStorage.getItem('introComplete') === 'true';
  });

  const handleIntroComplete = () => {
    setIntroComplete(true);
    sessionStorage.setItem('introComplete', 'true');
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      <ParticleBackground />
      <FloatingHearts />
      
      {!introComplete && <IntroScreen onComplete={handleIntroComplete} />}
      
      <Navbar />
      <ScrollToTop />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/memories" element={<Memories />} />
        <Route path="/music" element={<Music />} />
        <Route path="/videos" element={<Videos />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/letters" element={<Letters />} />
        <Route path="/birthday" element={<Birthday />} />
        <Route path="/secrets" element={<Secrets />} />
        <Route path="/miss-me" element={<MissMePage />} />
      </Routes>
    </div>
  );
}