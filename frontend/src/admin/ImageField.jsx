import React, { useRef, useState } from 'react';
import { Upload, X, Loader2 } from 'lucide-react';
import { api } from './api';

/**
 * Image field with two modes:
 *  1) Upload a file from the computer (POST /api/admin/upload).
 *  2) Paste an existing URL (e.g. an Unsplash link or /generated/xxx.png).
 *
 * Stores the resolved URL string (relative for uploads, absolute for external).
 */
export default function ImageField({ label, value, onChange, help }) {
  const inputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const onPick = () => inputRef.current?.click();

  const onFile = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setError('Please choose an image file.');
      return;
    }
    if (file.size > 8 * 1024 * 1024) {
      setError('Image is too large (max 8 MB).');
      return;
    }
    setError('');
    setUploading(true);
    try {
      const res = await api.uploadImage(file);
      onChange(res.url);
    } catch (err) {
      setError(err?.response?.data?.detail || 'Upload failed.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <span className="fld-label">{label}</span>

      <div className="flex items-start gap-4 mt-1">
        {/* Preview */}
        <div className="w-28 h-28 flex-shrink-0 bg-bone border border-navy/10 overflow-hidden flex items-center justify-center">
          {value ? (
            <img src={value} alt="" className="w-full h-full object-cover" data-testid={`image-field-preview-${label}`} />
          ) : (
            <span className="font-caps text-[0.55rem] text-navy/40 tracking-[0.22em]">No image</span>
          )}
        </div>

        {/* Controls */}
        <div className="flex-1 min-w-0 space-y-2">
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={onPick}
              disabled={uploading}
              data-testid={`image-field-upload-btn-${label}`}
              className="btn-outline-gold border-navy/30 text-navy hover:text-gold text-xs px-4 py-2 disabled:opacity-50"
            >
              {uploading ? <Loader2 size={13} className="animate-spin" /> : <Upload size={13} />}
              {uploading ? 'Uploading…' : 'Upload Image'}
            </button>
            {value && (
              <button
                type="button"
                onClick={() => onChange('')}
                className="border border-navy/20 text-navy/70 hover:text-red-500 hover:border-red-300 text-xs px-3 py-2 inline-flex items-center gap-1"
              >
                <X size={13} /> Clear
              </button>
            )}
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              onChange={onFile}
              className="hidden"
              data-testid={`image-field-input-${label}`}
            />
          </div>

          <input
            type="text"
            className="fld-input text-sm"
            placeholder="…or paste an image URL"
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            data-testid={`image-field-url-${label}`}
          />

          {error && <p className="text-red-600 text-xs">{error}</p>}
          {help && <p className="text-xs text-navy/50">{help}</p>}
        </div>
      </div>
    </div>
  );
}
