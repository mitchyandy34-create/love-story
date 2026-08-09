import { useState, useRef, useEffect } from 'react';
import useSupabaseData from '../hooks/useSupabaseData';

const playlists = [
  { id: 'remind', name: 'Songs That Remind Me Of You', icon: '💭' },
  { id: 'latenight', name: 'Late Night Us', icon: '🌙' },
  { id: 'love', name: 'Our Love Songs', icon: '❤️' },
  { id: 'missyou', name: 'When I Miss You', icon: '😢' },
  { id: 'birthday', name: 'Birthday Playlist', icon: '🎂' },
];

export default function MusicPlayer() {
  const [activePlaylist, setActivePlaylist] = useState('love');
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [showVisualizer, setShowVisualizer] = useState(false);
  const audioRef = useRef(null);
  const progressInterval = useRef(null);

  const {
    data: songsData = [],
    loading: songsLoading,
    error: songsError,
  } = useSupabaseData('songs', { orderBy: 'id' });

  const filteredSongs = songsData.filter((s) => {
    if (!s.playlist) return false;
    if (Array.isArray(s.playlist)) return s.playlist.includes(activePlaylist);
    return String(s.playlist).split(',').map((item) => item.trim()).includes(activePlaylist);
  });

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume, currentSong]);

  useEffect(() => {
    if (filteredSongs.length > 0 && !filteredSongs.some((song) => song.id === currentSong?.id)) {
      setCurrentSong(filteredSongs[0]);
      setIsPlaying(false);
      setProgress(0);
    }
  }, [filteredSongs, currentSong]);

  useEffect(() => {
    return () => {
      if (progressInterval.current) clearInterval(progressInterval.current);
    };
  }, []);

  const playSong = (song) => {
    if (currentSong?.id === song.id) {
      togglePlay();
      return;
    }
    setCurrentSong(song);
    setIsPlaying(true);
    setProgress(0);
    setShowVisualizer(true);
    
    // Simulate progress since we don't have real audio files
    if (progressInterval.current) clearInterval(progressInterval.current);
    progressInterval.current = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(progressInterval.current);
          return 100;
        }
        return p + 0.5;
      });
    }, 100);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying && progressInterval.current) {
      progressInterval.current = setInterval(() => {
        setProgress((p) => (p >= 100 ? 0 : p + 0.5));
      }, 100);
    } else {
      clearInterval(progressInterval.current);
    }
  };

  const playNext = () => {
    if (!currentSong) return;
    const idx = filteredSongs.findIndex((s) => s.id === currentSong.id);
    const next = filteredSongs[(idx + 1) % filteredSongs.length];
    playSong(next);
  };

  const playPrev = () => {
    if (!currentSong) return;
    const idx = filteredSongs.findIndex((s) => s.id === currentSong.id);
    const prev = filteredSongs[(idx - 1 + filteredSongs.length) % filteredSongs.length];
    playSong(prev);
  };

  return (
    <section className="section-padding">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <p className="text-script" style={{ marginBottom: '10px' }}>Songs That Sound Like Us</p>
          <h2 className="heading-lg">Our Music 🎵</h2>
          <p className="text-body" style={{ maxWidth: '500px', margin: '15px auto 0' }}>
            "Some songs are just songs. Others become memories. These became us."
          </p>
        </div>

        <div
          style={{
            maxWidth: '900px',
            margin: '0 auto',
            background: 'linear-gradient(135deg, rgba(107,15,26,0.2), rgba(10,10,10,0.9))',
            borderRadius: '24px',
            border: '1px solid rgba(212,175,55,0.15)',
            overflow: 'hidden',
          }}
        >
          {/* Player Header */}
          <div
            style={{
              padding: '30px',
              display: 'flex',
              gap: '30px',
              alignItems: 'center',
              flexWrap: 'wrap',
            }}
          >
            <div
              style={{
                width: '180px',
                height: '180px',
                borderRadius: '16px',
                overflow: 'hidden',
                position: 'relative',
                flexShrink: 0,
                boxShadow: '0 10px 40px rgba(0,0,0,0.4)',
              }}
            >
              <img
                src={currentSong?.cover || filteredSongs[0]?.cover}
                alt="Album"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              {isPlaying && (
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'rgba(0,0,0,0.3)',
                    display: 'flex',
                    alignItems: 'flex-end',
                    justifyContent: 'center',
                    padding: '20px',
                  }}
                >
                  <div className="music-visualizer">
                    {[...Array(8)].map((_, i) => (
                      <div
                        key={i}
                        className="visualizer-bar"
                        style={{ animationDelay: `${i * 0.1}s`, height: `${20 + Math.random() * 80}%` }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div style={{ flex: 1, minWidth: '250px' }}>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', marginBottom: '5px' }}>
                {currentSong?.title || 'Select a song'}
              </h3>
              <p style={{ color: 'var(--rose)', marginBottom: '15px' }}>{currentSong?.artist || '—'}</p>
              <p className="text-body" style={{ fontSize: '0.9rem', marginBottom: '20px' }}>
                {currentSong?.note || 'Choose a song to begin'}
              </p>

              {/* Progress */}
              <div style={{ marginBottom: '15px' }}>
                <div
                  style={{
                    height: '4px',
                    background: 'rgba(255,255,255,0.1)',
                    borderRadius: '2px',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      height: '100%',
                      width: `${progress}%`,
                      background: 'linear-gradient(to right, var(--burgundy), var(--gold))',
                      borderRadius: '2px',
                      transition: 'width 0.1s linear',
                    }}
                  />
                </div>
              </div>

              {/* Controls */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
                <button
                  onClick={playPrev}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--white)',
                    fontSize: '1.5rem',
                    cursor: 'pointer',
                    opacity: 0.7,
                  }}
                >
                  ⏮
                </button>
                <button
                  onClick={() => currentSong && togglePlay()}
                  style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, var(--burgundy), var(--gold))',
                    border: 'none',
                    color: 'white',
                    fontSize: '1.2rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {isPlaying ? '⏸' : '▶'}
                </button>
                <button
                  onClick={playNext}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--white)',
                    fontSize: '1.5rem',
                    cursor: 'pointer',
                    opacity: 0.7,
                  }}
                >
                  ⏭
                </button>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginLeft: 'auto' }}>
                  <span style={{ fontSize: '0.8rem', opacity: 0.6 }}>🔊</span>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={volume}
                    onChange={(e) => setVolume(parseFloat(e.target.value))}
                    style={{ width: '80px', accentColor: 'var(--gold)' }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Playlist Tabs */}
          <div
            style={{
              display: 'flex',
              gap: '5px',
              padding: '0 30px 20px',
              overflowX: 'auto',
              flexWrap: 'wrap',
            }}
          >
            {playlists.map((pl) => (
              <button
                key={pl.id}
                onClick={() => setActivePlaylist(pl.id)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '20px',
                  border: 'none',
                  background: activePlaylist === pl.id ? 'rgba(212,175,55,0.2)' : 'transparent',
                  color: activePlaylist === pl.id ? 'var(--gold)' : 'rgba(250,250,250,0.6)',
                  cursor: 'pointer',
                  fontSize: '0.85rem',
                  whiteSpace: 'nowrap',
                }}
              >
                {pl.icon} {pl.name}
              </button>
            ))}
          </div>

          {/* Song List */}
          <div style={{ maxHeight: '300px', overflowY: 'auto', padding: '0 30px 30px' }}>
            {filteredSongs.map((song) => (
              <div
                key={song.id}
                onClick={() => playSong(song)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '15px',
                  padding: '12px',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  background: currentSong?.id === song.id ? 'rgba(212,175,55,0.1)' : 'transparent',
                  border: currentSong?.id === song.id ? '1px solid rgba(212,175,55,0.2)' : '1px solid transparent',
                  transition: 'all 0.3s',
                  marginBottom: '8px',
                }}
              >
                <img
                  src={song.cover}
                  alt={song.title}
                  style={{ width: '50px', height: '50px', borderRadius: '8px', objectFit: 'cover' }}
                />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, color: currentSong?.id === song.id ? 'var(--gold)' : 'var(--white)' }}>
                    {song.title}
                  </div>
                  <div style={{ fontSize: '0.8rem', opacity: 0.6 }}>{song.artist}</div>
                </div>
                {currentSong?.id === song.id && isPlaying && (
                  <div className="music-visualizer" style={{ height: '20px' }}>
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="visualizer-bar" style={{ width: '3px', animationDelay: `${i * 0.1}s` }} />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}