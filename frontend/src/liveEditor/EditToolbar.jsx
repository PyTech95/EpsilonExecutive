import React, { useEffect, useState, useRef, useCallback } from 'react';
import { X, Check, Upload, Loader2, Type, Palette, AlignLeft, AlignCenter, AlignRight, Bold, RotateCcw } from 'lucide-react';
import { useEditMode } from './EditModeContext';

const SIZE_PRESETS = [
  { label: 'XS', value: '0.75rem' },
  { label: 'SM', value: '0.875rem' },
  { label: 'Base', value: '1rem' },
  { label: 'LG', value: '1.25rem' },
  { label: 'XL', value: '1.5rem' },
  { label: '2XL', value: '2rem' },
  { label: '3XL', value: '2.5rem' },
  { label: '4XL', value: '3.5rem' },
];

const WEIGHT_PRESETS = [
  { label: 'Light', value: '300' },
  { label: 'Regular', value: '400' },
  { label: 'Medium', value: '500' },
  { label: 'Semibold', value: '600' },
  { label: 'Bold', value: '700' },
];

const ui = {
  bar: {
    position: 'fixed',
    zIndex: 9999,
    background: '#0b1733',
    color: '#f5efe6',
    border: '1px solid rgba(201,162,39,0.4)',
    borderRadius: '10px',
    boxShadow: '0 14px 40px rgba(0,0,0,0.35)',
    padding: '10px',
    minWidth: '320px',
    maxWidth: '420px',
    fontFamily: 'Inter, system-ui, sans-serif',
    fontSize: '12px',
  },
  row: { display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px', flexWrap: 'wrap' },
  pill: {
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    padding: '5px 8px', borderRadius: '6px',
    background: 'rgba(255,255,255,0.06)',
    color: '#f5efe6', border: '1px solid rgba(255,255,255,0.1)',
    fontSize: '11px', cursor: 'pointer', minWidth: '28px',
  },
  pillActive: { background: '#c9a227', color: '#0b1733', borderColor: '#c9a227' },
  divider: { width: '1px', height: '20px', background: 'rgba(255,255,255,0.1)', margin: '0 4px' },
  label: {
    fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.12em',
    color: 'rgba(245,239,230,0.55)', marginRight: '6px', minWidth: '46px',
  },
  input: {
    background: 'rgba(255,255,255,0.06)',
    color: '#f5efe6',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '6px',
    padding: '6px 8px',
    fontSize: '12px',
    flex: 1,
    minWidth: 0,
    fontFamily: 'inherit',
  },
  textarea: {
    background: 'rgba(255,255,255,0.06)',
    color: '#f5efe6',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '6px',
    padding: '8px',
    fontSize: '12px',
    width: '100%',
    fontFamily: 'inherit',
    resize: 'vertical',
    minHeight: '60px',
  },
  btnPrimary: {
    background: '#c9a227', color: '#0b1733', border: 'none',
    borderRadius: '6px', padding: '7px 12px', fontSize: '12px', fontWeight: 600,
    cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px',
  },
  btnGhost: {
    background: 'transparent', color: '#f5efe6',
    border: '1px solid rgba(255,255,255,0.18)', borderRadius: '6px',
    padding: '6px 10px', fontSize: '11px',
    cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '5px',
  },
  closeBtn: {
    position: 'absolute', top: '6px', right: '6px',
    background: 'transparent', color: 'rgba(245,239,230,0.7)',
    border: 'none', cursor: 'pointer', padding: '4px', lineHeight: 0,
  },
  title: {
    fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.14em',
    color: '#c9a227', fontWeight: 600, marginBottom: '8px',
  },
};

function computeBarPosition(rect) {
  // Position toolbar below the active element if there's room; above otherwise.
  const TB_HEIGHT = 280;
  const margin = 12;
  const viewportH = window.innerHeight;
  const viewportW = window.innerWidth;
  const absTop = rect.top + rect.height - window.scrollY;
  const spaceBelow = viewportH - absTop;
  const placeBelow = spaceBelow >= TB_HEIGHT;
  const top = placeBelow ? (rect.top + rect.height + margin) : (rect.top - TB_HEIGHT - margin);
  const left = Math.min(
    Math.max(rect.left, 12 + window.scrollX),
    window.scrollX + viewportW - 432
  );
  return { top, left };
}

export default function EditToolbar({ target, currentStyle, onClose }) {
  const { saveText, uploadAndSaveImage, saveImage, saveStyle } = useEditMode();
  const { el, path, type, rect } = target;

  const [textValue, setTextValue] = useState(() => (type === 'text' ? el.innerText : ''));
  const [imageUrl, setImageUrl] = useState(() => (type === 'image' ? (el.getAttribute('src') || '') : ''));
  const [style, setStyle] = useState(() => ({ ...(currentStyle || {}) }));
  const [busy, setBusy] = useState('');
  const [msg, setMsg] = useState('');
  const fileRef = useRef(null);

  // Reset when target changes
  useEffect(() => {
    setTextValue(type === 'text' ? el.innerText : '');
    setImageUrl(type === 'image' ? (el.getAttribute('src') || '') : '');
    setStyle({ ...(currentStyle || {}) });
    setMsg('');
  }, [el, type, path]); // eslint-disable-line react-hooks/exhaustive-deps

  // Live-preview style changes by writing inline style on the element
  useEffect(() => {
    if (!el) return;
    const prev = el.getAttribute('style') || '';
    const cssDecl = Object.entries(style || {})
      .filter(([, v]) => v != null && v !== '')
      .map(([k, v]) => `${camelToDash(k)}: ${v}`)
      .join('; ');
    el.setAttribute('style', cssDecl);
    return () => { el.setAttribute('style', prev); };
  }, [el, style]);

  const pos = computeBarPosition(rect);
  const flash = (m) => { setMsg(m); setTimeout(() => setMsg(''), 1800); };

  const onSaveText = useCallback(async () => {
    setBusy('text');
    try {
      await saveText(path, textValue);
      el.textContent = textValue; // reflect immediately
      flash('Saved');
    } catch (e) { flash('Save failed'); }
    finally { setBusy(''); }
  }, [path, textValue, saveText, el]);

  const onSaveImageUrl = useCallback(async () => {
    setBusy('image');
    try {
      await saveImage(path, imageUrl);
      if (el.tagName === 'IMG') el.setAttribute('src', imageUrl);
      flash('Saved');
    } catch (e) { flash('Save failed'); }
    finally { setBusy(''); }
  }, [path, imageUrl, saveImage, el]);

  const onUploadFile = useCallback(async (file) => {
    if (!file) return;
    setBusy('upload');
    try {
      const url = await uploadAndSaveImage(path, file);
      setImageUrl(url);
      if (el.tagName === 'IMG') el.setAttribute('src', url);
      flash('Uploaded');
    } catch (e) { flash('Upload failed'); }
    finally { setBusy(''); }
  }, [path, uploadAndSaveImage, el]);

  const onSaveStyle = useCallback(async () => {
    setBusy('style');
    try {
      await saveStyle(path, style);
      flash('Style saved');
    } catch (e) { flash('Save failed'); }
    finally { setBusy(''); }
  }, [path, style, saveStyle]);

  const onResetStyle = useCallback(async () => {
    setBusy('style');
    try {
      await saveStyle(path, {});
      setStyle({});
      flash('Style reset');
    } catch (e) { flash('Reset failed'); }
    finally { setBusy(''); }
  }, [path, saveStyle]);

  const setS = (key, value) =>
    setStyle((s) => ({ ...s, [key]: s[key] === value ? '' : value }));

  return (
    <div
      data-live-editor-ui="1"
      style={{ ...ui.bar, top: pos.top, left: pos.left, width: '400px' }}
      onClick={(e) => e.stopPropagation()}
      data-testid="live-editor-toolbar"
    >
      <button onClick={onClose} style={ui.closeBtn} data-testid="live-editor-close-btn" aria-label="Close">
        <X size={14} />
      </button>

      <div style={ui.title}>
        {type === 'image' ? 'Image' : 'Text'} · <span style={{ color: 'rgba(245,239,230,0.6)' }}>{path}</span>
      </div>

      {/* Text edit */}
      {type === 'text' && (
        <>
          <textarea
            data-testid="live-editor-text-input"
            value={textValue}
            onChange={(e) => setTextValue(e.target.value)}
            style={ui.textarea}
            rows={3}
            placeholder="Edit text…"
          />
          <div style={{ ...ui.row, justifyContent: 'space-between' }}>
            <span style={{ fontSize: '10px', color: 'rgba(245,239,230,0.55)' }}>{textValue.length} chars</span>
            <button onClick={onSaveText} disabled={busy === 'text'} style={ui.btnPrimary} data-testid="live-editor-save-text-btn">
              {busy === 'text' ? <Loader2 size={12} className="animate-spin" /> : <Check size={12} />} Save text
            </button>
          </div>
        </>
      )}

      {/* Image edit */}
      {type === 'image' && (
        <>
          <div style={ui.row}>
            <button
              onClick={() => fileRef.current?.click()}
              disabled={busy === 'upload'}
              style={ui.btnPrimary}
              data-testid="live-editor-upload-btn"
            >
              {busy === 'upload' ? <Loader2 size={12} className="animate-spin" /> : <Upload size={12} />}
              {busy === 'upload' ? 'Uploading…' : 'Upload new image'}
            </button>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={(e) => { const f = e.target.files?.[0]; e.target.value = ''; onUploadFile(f); }}
            />
          </div>
          <div style={ui.row}>
            <input
              style={ui.input}
              placeholder="…or paste image URL"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              data-testid="live-editor-image-url-input"
            />
            <button onClick={onSaveImageUrl} disabled={busy === 'image'} style={ui.btnPrimary} data-testid="live-editor-save-image-btn">
              {busy === 'image' ? <Loader2 size={12} className="animate-spin" /> : <Check size={12} />}
            </button>
          </div>
        </>
      )}

      {/* Divider */}
      <div style={{ height: '1px', background: 'rgba(255,255,255,0.08)', margin: '10px 0' }} />

      <div style={{ ...ui.title, display: 'flex', alignItems: 'center', gap: '6px' }}>
        <Palette size={11} /> Style
      </div>

      {/* Text color */}
      <div style={ui.row}>
        <span style={ui.label}>Color</span>
        <input
          type="color"
          value={style.color || '#000000'}
          onChange={(e) => setStyle((s) => ({ ...s, color: e.target.value }))}
          style={{ width: '34px', height: '28px', border: 'none', background: 'transparent', cursor: 'pointer' }}
          data-testid="live-editor-color-input"
        />
        <input
          style={{ ...ui.input, flex: 1 }}
          placeholder="#hex or css"
          value={style.color || ''}
          onChange={(e) => setStyle((s) => ({ ...s, color: e.target.value }))}
        />
        {style.color && (
          <button onClick={() => setStyle((s) => ({ ...s, color: '' }))} style={ui.btnGhost} title="Clear color">
            <X size={11} />
          </button>
        )}
      </div>

      {/* Background color */}
      <div style={ui.row}>
        <span style={ui.label}>BG</span>
        <input
          type="color"
          value={style.backgroundColor || '#ffffff'}
          onChange={(e) => setStyle((s) => ({ ...s, backgroundColor: e.target.value }))}
          style={{ width: '34px', height: '28px', border: 'none', background: 'transparent', cursor: 'pointer' }}
          data-testid="live-editor-bg-input"
        />
        <input
          style={{ ...ui.input, flex: 1 }}
          placeholder="background color"
          value={style.backgroundColor || ''}
          onChange={(e) => setStyle((s) => ({ ...s, backgroundColor: e.target.value }))}
        />
        {style.backgroundColor && (
          <button onClick={() => setStyle((s) => ({ ...s, backgroundColor: '' }))} style={ui.btnGhost} title="Clear bg">
            <X size={11} />
          </button>
        )}
      </div>

      {/* Font size */}
      <div style={ui.row}>
        <span style={ui.label}>Size</span>
        {SIZE_PRESETS.map((p) => (
          <button
            key={p.value}
            onClick={() => setS('fontSize', p.value)}
            style={{ ...ui.pill, ...(style.fontSize === p.value ? ui.pillActive : {}) }}
            title={p.value}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Font weight */}
      <div style={ui.row}>
        <span style={ui.label}>Weight</span>
        {WEIGHT_PRESETS.map((p) => (
          <button
            key={p.value}
            onClick={() => setS('fontWeight', p.value)}
            style={{ ...ui.pill, ...(style.fontWeight === p.value ? ui.pillActive : {}) }}
            title={p.value}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Alignment */}
      <div style={ui.row}>
        <span style={ui.label}>Align</span>
        {[
          { v: 'left', I: AlignLeft },
          { v: 'center', I: AlignCenter },
          { v: 'right', I: AlignRight },
        ].map(({ v, I }) => (
          <button
            key={v}
            onClick={() => setS('textAlign', v)}
            style={{ ...ui.pill, ...(style.textAlign === v ? ui.pillActive : {}) }}
            title={v}
          >
            <I size={12} />
          </button>
        ))}
      </div>

      {/* Style actions */}
      <div style={{ ...ui.row, justifyContent: 'space-between', marginTop: '8px' }}>
        <button onClick={onResetStyle} style={ui.btnGhost} data-testid="live-editor-reset-style-btn">
          <RotateCcw size={11} /> Reset
        </button>
        <button onClick={onSaveStyle} disabled={busy === 'style'} style={ui.btnPrimary} data-testid="live-editor-save-style-btn">
          {busy === 'style' ? <Loader2 size={12} className="animate-spin" /> : <Check size={12} />} Save style
        </button>
      </div>

      {msg && (
        <p style={{ marginTop: '8px', fontSize: '11px', color: '#c9a227', textAlign: 'center' }}>{msg}</p>
      )}
    </div>
  );
}

function camelToDash(k) {
  return k.replace(/([A-Z])/g, '-$1').toLowerCase();
}
