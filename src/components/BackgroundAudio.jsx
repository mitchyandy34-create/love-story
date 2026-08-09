import { useEffect, useRef, useState } from 'react';
import bgAudio from '../assets/background.mp3';

export default function BackgroundAudio() {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.loop = true;

    const tryPlay = async () => {
      try {
        await audio.play();
        setPlaying(true);
      } catch (err) {
        // Autoplay blocked by browser — show play button
        console.warn('Autoplay blocked:', err?.message || err);
        setBlocked(true);
      }
    };

    tryPlay();

    return () => {
      try {
        audio.pause();
        audio.src = '';
      } catch (e) {}
    };
  }, []);

  const handlePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    try {
      await audio.play();
      setPlaying(true);
      setBlocked(false);
    } catch (err) {
      console.error('Play failed:', err);
    }
  };

  if (!bgAudio) return null;

  return (
    <>
      <audio ref={audioRef} src={bgAudio} />

      {blocked && (
        <div style={{ position: 'fixed', right: 18, bottom: 18, zIndex: 9999 }}>
          <button onClick={handlePlay} className="btn-primary" style={{ padding: '10px 14px' }}>
            Play background music
          </button>
        </div>
      )}
    </>
  );
}
