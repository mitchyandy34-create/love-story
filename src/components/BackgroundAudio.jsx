import { useEffect, useRef, useState } from 'react';
// Use Vite's `?url` importer so the MP3 is emitted and referenced by URL at build time
import bgAudio from '../assets/Indila_-_Love_Story__Official_Music_Video_(256k).mp3?url';

export default function BackgroundAudio() {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    // enable inline playback on mobile and allow cross-origin fetching if necessary
    try {
      audio.playsInline = true;
      audio.crossOrigin = 'anonymous';
    } catch (e) {}
    audio.loop = true;
    audio.preload = 'auto';

    const isChrome = typeof navigator !== 'undefined' && /Chrome/.test(navigator.userAgent) && !/Edg|OPR/.test(navigator.userAgent);

    const tryAutoplay = async () => {
      try {
        // First try to play unmuted (best-effort)
        await audio.play();
        setPlaying(true);
        setBlocked(false);
        return;
      } catch (err) {
        // If blocked, attempt muted autoplay (allowed by browsers)
        try {
          audio.muted = true;
          audio.volume = 0;
          await audio.play();
          setPlaying(true);
          setBlocked(true); // still blocked for audible playback
        } catch (err2) {
          console.warn('Autoplay completely blocked:', err2?.message || err2);
          setBlocked(true);
        }
      }
    };

    tryAutoplay();

    // On first real user interaction, unmute and fade in volume (best-effort workaround)
    const handleUserGesture = async () => {
      try {
        if (!audio) return;
        // If audio is paused, try to play first
        if (audio.paused) {
          try {
            await audio.play();
          } catch (e) {
            // ignore
          }
        }

        // Unmute and fade volume in smoothly
        audio.muted = false;
        const target = 0.7;
        const stepMs = 50;
        const steps = 20;
        audio.volume = 0;
        let currentStep = 0;
        const fade = setInterval(() => {
          currentStep += 1;
          audio.volume = Math.min(target, (currentStep / steps) * target);
          if (currentStep >= steps) {
            clearInterval(fade);
            setBlocked(false);
          }
        }, stepMs);
      } catch (e) {
        console.error('Failed to unmute on gesture:', e);
      }
    };

    window.addEventListener('pointerdown', handleUserGesture, { once: true, passive: true });
    window.addEventListener('keydown', handleUserGesture, { once: true, passive: true });

    const onPlayErr = (e) => console.debug('audio element error', e);
    const onPlay = () => console.debug('audio play event');
    audio.addEventListener('error', onPlayErr);
    audio.addEventListener('play', onPlay);

    return () => {
      try {
        window.removeEventListener('pointerdown', handleUserGesture);
        window.removeEventListener('keydown', handleUserGesture);
        audio.removeEventListener('error', onPlayErr);
        audio.removeEventListener('play', onPlay);
        audio.pause();
        audio.src = '';
      } catch (e) {}
    };
  }, []);

  const handleEnable = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    try {
      // Unmute and set volume before play to ensure audible playback on user gesture
      audio.muted = false;
      audio.volume = 0.7;
      await audio.play();
      setPlaying(true);
      setBlocked(false);
    } catch (err) {
      console.error('Enable play failed:', err);
    }
  };

  if (!bgAudio) return null;

  return (
    <>
      <audio ref={audioRef} src={bgAudio} />

      {blocked && (
        <div style={{ position: 'fixed', right: 18, bottom: 18, zIndex: 9999 }}>
          <button onClick={handleEnable} className="btn-primary" style={{ padding: '10px 14px' }}>
            Enable music
          </button>
        </div>
      )}
    </>
  );
}
