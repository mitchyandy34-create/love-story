import { useEffect, useState } from 'react';
import useSupabaseData from '../hooks/useSupabaseData';
import { supabase } from '../lib/supabaseClient';
import { memoryCategories } from '../data/memories';

const storageBucket = 'media';

async function uploadFileToStorage(file, folder) {
  if (!file) return null;

  if (!supabase || !supabase.storage) {
    throw new Error('Supabase storage is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.');
  }

  const filePath = `${folder}/${Date.now()}_${file.name}`;
  const { error: uploadError } = await supabase.storage.from(storageBucket).upload(filePath, file);
  if (uploadError) {
    throw uploadError;
  }

  const { data } = await supabase.storage.from(storageBucket).getPublicUrl(filePath);
  return data?.publicUrl || null;
}

const initialSongForm = {
  selectedId: null,
  title: '',
  artist: '',
  playlist: 'love',
  coverUrl: '',
  audioUrl: '',
  description: '',
  note: '',
  coverFile: null,
  audioFile: null,
};

const initialMemoryForm = {
  selectedId: null,
  category: 'us',
  caption: '',
  date: '',
  srcUrl: '',
  description: '',
  imageFile: null,
};

const initialVideoForm = {
  selectedId: null,
  title: '',
  description: '',
  videoUrl: '',
  thumbnailUrl: '',
  date: '',
  videoFile: null,
  thumbnailFile: null,
};

export default function MediaAdmin() {
  const { data: songs = [], refresh: refreshSongs } = useSupabaseData('songs', { orderBy: 'id' });
  const { data: memories = [], refresh: refreshMemories } = useSupabaseData('memories', { orderBy: 'id' });
  const { data: videos = [], refresh: refreshVideos } = useSupabaseData('videos', { orderBy: 'id' });

  const [songForm, setSongForm] = useState(initialSongForm);
  const [memoryForm, setMemoryForm] = useState(initialMemoryForm);
  const [videoForm, setVideoForm] = useState(initialVideoForm);
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (songForm.selectedId === null) return;
    const song = songs.find((item) => item.id === songForm.selectedId);
    if (song) {
      setSongForm((prev) => ({
        ...prev,
        title: song.title || '',
        artist: song.artist || '',
        playlist: Array.isArray(song.playlist) ? song.playlist.join(', ') : song.playlist || '',
        coverUrl: song.cover || '',
        audioUrl: song.audioUrl || '',
        description: song.description || '',
        note: song.note || '',
      }));
    }
  }, [songForm.selectedId, songs]);

  useEffect(() => {
    if (memoryForm.selectedId === null) return;
    const memory = memories.find((item) => item.id === memoryForm.selectedId);
    if (memory) {
      setMemoryForm((prev) => ({
        ...prev,
        category: memory.category || 'us',
        caption: memory.caption || '',
        date: memory.date || '',
        srcUrl: memory.src || '',
        description: memory.description || '',
      }));
    }
  }, [memoryForm.selectedId, memories]);

  useEffect(() => {
    if (videoForm.selectedId === null) return;
    const video = videos.find((item) => item.id === videoForm.selectedId);
    if (video) {
      setVideoForm((prev) => ({
        ...prev,
        title: video.title || '',
        description: video.description || '',
        videoUrl: video.videoUrl || '',
        thumbnailUrl: video.thumbnailUrl || '',
        date: video.date || '',
      }));
    }
  }, [videoForm.selectedId, videos]);

  const clearSongForm = () => setSongForm(initialSongForm);
  const clearMemoryForm = () => setMemoryForm(initialMemoryForm);
  const clearVideoForm = () => setVideoForm(initialVideoForm);

  const handleSongSubmit = async (e) => {
    e.preventDefault();
    setStatus('Saving song...');

    try {
      // For new uploads, require an audio file to be provided
      if (!songForm.selectedId && !songForm.audioFile) {
        setStatus('Please upload an audio file before submitting.');
        return;
      }
      let cover = songForm.coverUrl;
      if (songForm.coverFile) {
        cover = await uploadFileToStorage(songForm.coverFile, 'songs/covers');
      }

      let audioUrl = songForm.audioUrl;
      if (songForm.audioFile) {
        audioUrl = await uploadFileToStorage(songForm.audioFile, 'songs/audio');
      }

      const payload = {
        title: songForm.title,
        artist: songForm.artist,
        playlist: songForm.playlist,
        cover,
        audioUrl,
        description: songForm.description,
        note: songForm.note,
      };

      let error;
      if (songForm.selectedId) {
        ({ error } = await supabase.from('songs').update(payload).eq('id', songForm.selectedId));
      } else {
        ({ error } = await supabase.from('songs').insert(payload));
      }

      if (error) throw error;
      setStatus(`Song ${songForm.selectedId ? 'updated' : 'uploaded'} successfully.`);
      clearSongForm();
      refreshSongs();
    } catch (err) {
      setStatus(`Song error: ${err.message}`);
    }
  };

  const handleMemorySubmit = async (e) => {
    e.preventDefault();
    setStatus('Saving memory image...');

    try {
      // For new memories, require an uploaded image file
      if (!memoryForm.selectedId && !memoryForm.imageFile) {
        setStatus('Please upload an image file before submitting.');
        return;
      }

      let src = memoryForm.srcUrl;
      if (memoryForm.imageFile) {
        src = await uploadFileToStorage(memoryForm.imageFile, 'memories/images');
      }

      const payload = {
        category: memoryForm.category,
        caption: memoryForm.caption,
        date: memoryForm.date,
        src,
        description: memoryForm.description,
      };

      let error;
      if (memoryForm.selectedId) {
        ({ error } = await supabase.from('memories').update(payload).eq('id', memoryForm.selectedId));
      } else {
        ({ error } = await supabase.from('memories').insert(payload));
      }

      if (error) throw error;
      setStatus(`Memory ${memoryForm.selectedId ? 'updated' : 'uploaded'} successfully.`);
      clearMemoryForm();
      refreshMemories();
    } catch (err) {
      setStatus(`Memory error: ${err.message}`);
    }
  };

  const handleVideoSubmit = async (e) => {
    e.preventDefault();
    setStatus('Saving video...');

    try {
      // For new videos, require an uploaded video file
      if (!videoForm.selectedId && !videoForm.videoFile) {
        setStatus('Please upload a video file before submitting.');
        return;
      }
      let videoUrl = videoForm.videoUrl;
      if (videoForm.videoFile) {
        videoUrl = await uploadFileToStorage(videoForm.videoFile, 'videos/files');
      }

      let thumbnailUrl = videoForm.thumbnailUrl;
      if (videoForm.thumbnailFile) {
        thumbnailUrl = await uploadFileToStorage(videoForm.thumbnailFile, 'videos/thumbnails');
      }

      const payload = {
        title: videoForm.title,
        description: videoForm.description,
        videoUrl,
        thumbnailUrl,
        date: videoForm.date,
      };

      let error;
      if (videoForm.selectedId) {
        ({ error } = await supabase.from('videos').update(payload).eq('id', videoForm.selectedId));
      } else {
        ({ error } = await supabase.from('videos').insert(payload));
      }

      if (error) throw error;
      setStatus(`Video ${videoForm.selectedId ? 'updated' : 'uploaded'} successfully.`);
      clearVideoForm();
      refreshVideos();
    } catch (err) {
      setStatus(`Video error: ${err.message}`);
    }
  };

  return (
    <section className="section-padding" style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '24px', padding: '40px', marginBottom: '60px' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <p className="text-script" style={{ marginBottom: '10px' }}>Manage Media</p>
          <h2 className="heading-lg">Upload and Update Songs, Images, and Videos</h2>
          <p className="text-body" style={{ maxWidth: '700px', margin: '15px auto 0' }}>
            Use the forms below to add or update content in Supabase. Image uploads include a date field that will show on the website.
          </p>
        </div>

        {status && (
          <div style={{ marginBottom: '30px', padding: '15px 20px', borderRadius: '16px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)' }}>
            {status}
          </div>
        )}

        <div style={{ display: 'grid', gap: '40px' }}>
          <div>
            <h3 style={{ marginBottom: '20px' }}>Song Upload / Update</h3>
            <form onSubmit={handleSongSubmit}>
              <div style={{ display: 'grid', gap: '15px' }}>
                <label>
                  Select Song to Edit
                  <select
                    value={songForm.selectedId || ''}
                    onChange={(e) => setSongForm((prev) => ({ ...prev, selectedId: e.target.value ? Number(e.target.value) : null }))}
                    style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.03)', color: 'inherit' }}
                  >
                    <option value="">Create new song</option>
                    {songs.map((song) => (
                      <option key={song.id} value={song.id}>{`${song.title || 'Untitled'} — ${song.artist || 'Unknown'}`}</option>
                    ))}
                  </select>
                </label>

                <div style={{ display: 'grid', gap: '15px', gridTemplateColumns: '1fr 1fr' }}>
                  <label>
                    Title
                    <input
                      value={songForm.title}
                      onChange={(e) => setSongForm((prev) => ({ ...prev, title: e.target.value }))}
                      required
                      style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.03)', color: 'inherit' }}
                    />
                  </label>
                  <label>
                    Artist
                    <input
                      value={songForm.artist}
                      onChange={(e) => setSongForm((prev) => ({ ...prev, artist: e.target.value }))}
                      required
                      style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.03)', color: 'inherit' }}
                    />
                  </label>
                </div>

                <label>
                  Playlist tags (comma separated)
                  <input
                    value={songForm.playlist}
                    onChange={(e) => setSongForm((prev) => ({ ...prev, playlist: e.target.value }))}
                    placeholder="love, remind"
                    style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.03)', color: 'inherit' }}
                  />
                </label>

                <div style={{ display: 'grid', gap: '15px', gridTemplateColumns: '1fr' }}>
                  <label>
                    Cover file upload
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setSongForm((prev) => ({ ...prev, coverFile: e.target.files?.[0] || null }))}
                      style={{ width: '100%' }}
                    />
                  </label>
                </div>

                <div style={{ display: 'grid', gap: '15px', gridTemplateColumns: '1fr' }}>
                  <label>
                    Audio file upload
                    <input
                      type="file"
                      accept="audio/*"
                      onChange={(e) => setSongForm((prev) => ({ ...prev, audioFile: e.target.files?.[0] || null }))}
                      style={{ width: '100%' }}
                    />
                  </label>
                </div>

                <label>
                  Description
                  <textarea
                    value={songForm.description}
                    onChange={(e) => setSongForm((prev) => ({ ...prev, description: e.target.value }))}
                    rows={3}
                    style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.03)', color: 'inherit' }}
                  />
                </label>

                <label>
                  Note
                  <textarea
                    value={songForm.note}
                    onChange={(e) => setSongForm((prev) => ({ ...prev, note: e.target.value }))}
                    rows={2}
                    style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.03)', color: 'inherit' }}
                  />
                </label>

                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  <button type="submit" className="btn-primary" style={{ minWidth: '180px' }}>
                    {songForm.selectedId ? 'Update Song' : 'Upload Song'}
                  </button>
                  <button type="button" className="btn-secondary" onClick={clearSongForm} style={{ minWidth: '160px' }}>
                    Reset Form
                  </button>
                </div>
              </div>
            </form>
          </div>

          <div>
            <h3 style={{ marginBottom: '20px' }}>Memory Image Upload / Update</h3>
            <form onSubmit={handleMemorySubmit}>
              <div style={{ display: 'grid', gap: '15px' }}>
                <label>
                  Select Memory to Edit
                  <select
                    value={memoryForm.selectedId || ''}
                    onChange={(e) => setMemoryForm((prev) => ({ ...prev, selectedId: e.target.value ? Number(e.target.value) : null }))}
                    style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.03)', color: 'inherit' }}
                  >
                    <option value="">Create new memory</option>
                    {memories.map((memory) => (
                      <option key={memory.id} value={memory.id}>{`${memory.caption || 'Untitled'} — ${memory.category || ''}`}</option>
                    ))}
                  </select>
                </label>

                <div style={{ display: 'grid', gap: '15px', gridTemplateColumns: '1fr 1fr' }}>
                  <label>
                    Category
                    <select
                      value={memoryForm.category}
                      onChange={(e) => setMemoryForm((prev) => ({ ...prev, category: e.target.value }))}
                      style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.03)', color: 'inherit' }}
                    >
                      {memoryCategories.map((cat) => (
                        <option key={cat.id} value={cat.id}>{cat.label}</option>
                      ))}
                    </select>
                  </label>
                  <label>
                    Date Taken
                    <input
                      type="date"
                      value={memoryForm.date}
                      onChange={(e) => setMemoryForm((prev) => ({ ...prev, date: e.target.value }))}
                      style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.03)', color: 'inherit' }}
                    />
                  </label>
                </div>

                <label>
                  Caption
                  <input
                    value={memoryForm.caption}
                    onChange={(e) => setMemoryForm((prev) => ({ ...prev, caption: e.target.value }))}
                    required
                    style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.03)', color: 'inherit' }}
                  />
                </label>

                <label>
                  Image file upload
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setMemoryForm((prev) => ({ ...prev, imageFile: e.target.files?.[0] || null }))}
                    style={{ width: '100%' }}
                  />
                </label>

                <label>
                  Description
                  <textarea
                    value={memoryForm.description}
                    onChange={(e) => setMemoryForm((prev) => ({ ...prev, description: e.target.value }))}
                    rows={3}
                    style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.03)', color: 'inherit' }}
                  />
                </label>

                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  <button type="submit" className="btn-primary" style={{ minWidth: '180px' }}>
                    {memoryForm.selectedId ? 'Update Memory' : 'Upload Image'}
                  </button>
                  <button type="button" className="btn-secondary" onClick={clearMemoryForm} style={{ minWidth: '160px' }}>
                    Reset Form
                  </button>
                </div>
              </div>
            </form>
          </div>

          <div>
            <h3 style={{ marginBottom: '20px' }}>Video Upload / Update</h3>
            <form onSubmit={handleVideoSubmit}>
              <div style={{ display: 'grid', gap: '15px' }}>
                <label>
                  Select Video to Edit
                  <select
                    value={videoForm.selectedId || ''}
                    onChange={(e) => setVideoForm((prev) => ({ ...prev, selectedId: e.target.value ? Number(e.target.value) : null }))}
                    style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.03)', color: 'inherit' }}
                  >
                    <option value="">Create new video</option>
                    {videos.map((video) => (
                      <option key={video.id} value={video.id}>{video.title || 'Untitled Video'}</option>
                    ))}
                  </select>
                </label>

                <div style={{ display: 'grid', gap: '15px', gridTemplateColumns: '1fr 1fr' }}>
                  <label>
                    Title
                    <input
                      value={videoForm.title}
                      onChange={(e) => setVideoForm((prev) => ({ ...prev, title: e.target.value }))}
                      required
                      style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.03)', color: 'inherit' }}
                    />
                  </label>
                  <label>
                    Date
                    <input
                      type="date"
                      value={videoForm.date}
                      onChange={(e) => setVideoForm((prev) => ({ ...prev, date: e.target.value }))}
                      style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.03)', color: 'inherit' }}
                    />
                  </label>
                </div>

                <label>
                  Video file upload
                  <input
                    type="file"
                    accept="video/*"
                    onChange={(e) => setVideoForm((prev) => ({ ...prev, videoFile: e.target.files?.[0] || null }))}
                    style={{ width: '100%' }}
                  />
                </label>

                <label>
                  Thumbnail upload
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setVideoForm((prev) => ({ ...prev, thumbnailFile: e.target.files?.[0] || null }))}
                    style={{ width: '100%' }}
                  />
                </label>

                <label>
                  Description
                  <textarea
                    value={videoForm.description}
                    onChange={(e) => setVideoForm((prev) => ({ ...prev, description: e.target.value }))}
                    rows={3}
                    style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.03)', color: 'inherit' }}
                  />
                </label>

                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  <button type="submit" className="btn-primary" style={{ minWidth: '180px' }}>
                    {videoForm.selectedId ? 'Update Video' : 'Upload Video'}
                  </button>
                  <button type="button" className="btn-secondary" onClick={clearVideoForm} style={{ minWidth: '160px' }}>
                    Reset Form
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
