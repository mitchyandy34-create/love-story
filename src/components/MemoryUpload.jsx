import { useState } from 'react';
import { memoryCategories } from '../data/memories';
import { supabase } from '../lib/supabaseClient';

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

export default function MemoryUpload({ onUploaded }) {
  const [category, setCategory] = useState('us');
  const [caption, setCaption] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [srcUrl, setSrcUrl] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Uploading memory...');

    try {
      let src = srcUrl;
      if (imageFile) {
        src = await uploadFileToStorage(imageFile, 'memories/images');
      }

      if (!src) {
        setStatus('Please provide an image URL or upload a file.');
        return;
      }

      const { error } = await supabase.from('memories').insert({
        category,
        caption,
        date,
        src,
        description,
      });

      if (error) {
        throw error;
      }

      setCategory('us');
      setCaption('');
      setDate('');
      setDescription('');
      setSrcUrl('');
      setImageFile(null);
      setStatus('Memory added successfully.');

      if (onUploaded) {
        onUploaded();
      }
    } catch (err) {
      setStatus(`Upload failed: ${err.message}`);
    }
  };

  return (
    <section className="section-padding" style={{ marginBottom: '60px', background: 'rgba(255,255,255,0.04)', borderRadius: '24px', padding: '30px' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <p className="text-script">Share a Memory</p>
          <h2 className="heading-lg">Upload Images</h2>
          <p className="text-body" style={{ maxWidth: '700px', margin: '15px auto 0' }}>
            Add a new memory image with the date it was taken so it appears in your memories gallery.
          </p>
        </div>

        {status && (
          <div style={{ marginBottom: '24px', padding: '18px 20px', borderRadius: '18px', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}>
            {status}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '18px' }}>
          <div style={{ display: 'grid', gap: '18px', gridTemplateColumns: '1fr 1fr' }}>
            <label>
              Category
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                style={{ width: '100%', padding: '14px', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.03)', color: 'inherit' }}
              >
                {memoryCategories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Date Taken
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                style={{ width: '100%', padding: '14px', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.03)', color: 'inherit' }}
                required
              />
            </label>
          </div>

          <label>
            Caption
            <input
              type="text"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Short title for this memory"
              required
              style={{ width: '100%', padding: '14px', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.03)', color: 'inherit' }}
            />
          </label>

          <label>
            Description
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              placeholder="Write a short description of the memory"
              style={{ width: '100%', padding: '14px', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.03)', color: 'inherit' }}
            />
          </label>

          <div style={{ display: 'grid', gap: '18px' }}>
            <label>
              Image URL
              <input
                type="url"
                value={srcUrl}
                onChange={(e) => setSrcUrl(e.target.value)}
                placeholder="https://example.com/image.jpg"
                style={{ width: '100%', padding: '14px', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.03)', color: 'inherit' }}
              />
            </label>

            <label>
              or upload image file
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                style={{ width: '100%' }}
              />
            </label>
          </div>

          <button type="submit" className="btn-primary" style={{ width: 'fit-content', padding: '14px 28px' }}>
            Upload Memory
          </button>
        </form>
      </div>
    </section>
  );
}
