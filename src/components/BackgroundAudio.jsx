import { useEffect, useRef, useState } from 'react';
// Use Vite's `?url` importer so the MP3 is emitted and referenced by URL at build time
import bgAudio from '../assets/background.mp3?url';

export default function BackgroundAudio() {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    // Use the HTMLAudioElement constructor to avoid any issues with a DOM <audio> tag
    const audio = new Audio(bgAudio);
    audioRef.current = audio;
    try {
      audio.playsInline = true;
      audio.crossOrigin = 'anonymous';
    } catch (e) {}
    audio.loop = true;
    audio.preload = 'auto';

    const tryAutoplay = async () => {
      try {
        await audio.play();
        setPlaying(true);
        setBlocked(false);
        return;
      } catch (err) {
        // If blocked, attempt muted autoplay
        try {
          audio.muted = true;
          audio.volume = 0;
          await audio.play();
          setPlaying(true);
          setBlocked(true);
        } catch (err2) {
          console.warn('Autoplay completely blocked:', err2?.message || err2);
          setBlocked(true);
        }
      }
    };

    tryAutoplay();

    const handleUserGesture = async () => {
      try {
        if (!audio) return;
        if (audio.paused) {
          try { await audio.play(); } catch (e) {}
        }
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
