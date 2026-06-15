import React, { useEffect, useState } from 'react';
import { api } from './api';
import { Save, Plus, Trash2, ChevronLeft } from 'lucide-react';
import ImageField from './ImageField';

/**
 * Generic list + edit form for any collection.
 * schema: [{ key, label, type: 'text'|'textarea'|'number'|'boolean'|'list'|'tags'|'curriculum'|'credentials'|'affiliations', help? }]
 */
export default function CollectionEditor({ title, path, schema, newItemDefaults, displayKey = 'title' }) {
  const [items, setItems] = useState([]);
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState(null);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState('');

  const load = () => api.list(path).then(setItems);
  useEffect(() => { load(); }, [path]);

  const beginCreate = () => { setSelected('__new'); setForm({ ...newItemDefaults }); };
  const beginEdit = (item) => { setSelected(item._id); setForm(JSON.parse(JSON.stringify(item))); };

  const back = () => { setSelected(null); setForm(null); };

  const setField = (key, value) => setForm((f) => ({ ...f, [key]: value }));

  const save = async () => {
    setSaving(true);
    try {
      if (selected === '__new') {
        await api.create(path, form);
      } else {
        await api.update(path, selected, form);
      }
      await load();
      back();
    } catch (e) {
      setToast(e?.response?.data?.detail || 'Save failed');
    } finally { setSaving(false); }
  };

  const remove = async (id) => {
    if (!window.confirm('Delete this item?')) return;
    await api.remove(path, id);
    await load();
  };

  if (selected !== null && form) {
    return (
      <div>
        <button onClick={back} className="link-gold mb-6 inline-flex"><ChevronLeft size={14} /> Back to list</button>
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-display text-navy text-[2rem]">
            {selected === '__new' ? `New ${title}` : `Edit ${title}`}
          </h1>
          <button onClick={save} disabled={saving} className="btn-gold">
            <Save size={14} /> {saving ? 'Saving…' : 'Save'}
          </button>
        </div>
        {toast && <p className="text-red-600 text-sm">{toast}</p>}

        <div className="bg-white p-8 border border-navy/10 space-y-5">
          {schema.map((s) => (
            <FieldInput key={s.key} schema={s} value={form[s.key]} onChange={(v) => setField(s.key, v)} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-navy text-[2rem]">{title}</h1>
        <button onClick={beginCreate} className="btn-gold"><Plus size={14} /> Add new</button>
      </div>

      <div className="space-y-3">
        {items.length === 0 && <p className="font-editorial text-navy/60">No items yet.</p>}
        {items.map((it) => (
          <div key={it._id} className="bg-white border border-navy/10 p-5 flex items-center justify-between gap-4">
            <div className="flex items-center gap-4 min-w-0">
              {it.image && <img src={it.image} alt="" className="w-14 h-14 object-cover flex-shrink-0" />}
              {it.avatar && <img src={it.avatar} alt="" className="w-12 h-12 rounded-full object-cover flex-shrink-0" />}
              <div className="min-w-0">
                <p className="font-display text-navy truncate">{it[displayKey] || it.name || it.title || it.label || it._id}</p>
                <p className="font-caps text-[0.6rem] text-navy/60 truncate">
                  {it.subtitle || it.role || it.date || it.quote || it.tagline || it.excerpt || ''}
                </p>
              </div>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <button onClick={() => beginEdit(it)} className="btn-outline-gold border-navy/30 text-navy text-xs px-4 py-2">Edit</button>
              <button onClick={() => remove(it._id)} className="p-2.5 border border-navy/20 text-navy hover:border-red-400 hover:text-red-500"><Trash2 size={14} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function FieldInput({ schema, value, onChange }) {
  const { key, label, type = 'text', help } = schema;

  if (type === 'image') {
    return <ImageField label={label} value={value} onChange={onChange} help={help} />;
  }

  if (type === 'textarea') {
    return (
      <label className="block">
        <span className="fld-label">{label}</span>
        <textarea rows={4} className="fld-input" value={value || ''} onChange={(e) => onChange(e.target.value)} />
        {help && <span className="block text-xs text-navy/50 mt-1">{help}</span>}
      </label>
    );
  }
  if (type === 'number') {
    return (
      <label className="block">
        <span className="fld-label">{label}</span>
        <input type="number" className="fld-input" value={value ?? ''} onChange={(e) => onChange(Number(e.target.value))} />
      </label>
    );
  }
  if (type === 'boolean') {
    return (
      <label className="flex items-center gap-3">
        <input type="checkbox" checked={!!value} onChange={(e) => onChange(e.target.checked)} />
        <span className="font-sans text-navy">{label}</span>
      </label>
    );
  }
  if (type === 'tags') {
    const str = Array.isArray(value) ? value.join(', ') : (value || '');
    return (
      <label className="block">
        <span className="fld-label">{label}</span>
        <input className="fld-input" value={str}
               onChange={(e) => onChange(e.target.value.split(',').map((s) => s.trim()).filter(Boolean))} />
        <span className="block text-xs text-navy/50 mt-1">Comma-separated</span>
      </label>
    );
  }
  if (type === 'markdown') {
    // Markdown body editor — handles legacy arrays of paragraphs OR a single string.
    const str = Array.isArray(value) ? value.join('\n\n') : (value || '');
    return (
      <label className="block">
        <span className="fld-label">{label}</span>
        <textarea
          rows={14}
          className="fld-input font-mono text-[0.9rem] leading-relaxed"
          value={str}
          placeholder={'Write the article body here. Use markdown for formatting:\n\n## A Big Heading\n### A Smaller Heading\n\nThis is a normal paragraph. Use **bold** or *italic* for emphasis.\n\n- A bullet point\n- Another bullet point\n\n1. A numbered item\n2. Another numbered item\n\n> A pull quote shown with a gold left border.\n\n[Click here](https://example.com) for a link.\n\n---\n\nA horizontal divider above this line.'}
          onChange={(e) => onChange(e.target.value)}
        />
        <div className="mt-2 bg-bone border border-navy/10 p-3 text-xs text-navy/75">
          <p className="font-caps text-[0.6rem] text-gold tracking-[0.22em] mb-2">Formatting Cheatsheet</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 font-mono leading-relaxed">
            <span><code className="bg-white border border-navy/10 px-1">## Heading</code> — large heading</span>
            <span><code className="bg-white border border-navy/10 px-1">### Heading</code> — smaller heading</span>
            <span><code className="bg-white border border-navy/10 px-1">**bold**</code> — bold text</span>
            <span><code className="bg-white border border-navy/10 px-1">*italic*</code> — italic text</span>
            <span><code className="bg-white border border-navy/10 px-1">- item</code> — bullet list</span>
            <span><code className="bg-white border border-navy/10 px-1">1. item</code> — numbered list</span>
            <span><code className="bg-white border border-navy/10 px-1">{'>'} quote</code> — pull quote</span>
            <span><code className="bg-white border border-navy/10 px-1">[text](url)</code> — link</span>
            <span><code className="bg-white border border-navy/10 px-1">---</code> — horizontal divider</span>
            <span className="opacity-0">spacer</span>
          </div>
          <p className="mt-2 text-navy/60">Leave a blank line between paragraphs.</p>
        </div>
        {help && <span className="block text-xs text-navy/50 mt-1">{help}</span>}
      </label>
    );
  }

  if (type === 'list-lines') {
    const str = Array.isArray(value) ? value.join('\n') : (value || '');
    return (
      <label className="block">
        <span className="fld-label">{label}</span>
        <textarea rows={5} className="fld-input" value={str}
                  onChange={(e) => onChange(e.target.value.split('\n').map((s) => s.trim()).filter(Boolean))} />
        <span className="block text-xs text-navy/50 mt-1">One item per line</span>
      </label>
    );
  }
  if (type === 'curriculum') {
    const items = Array.isArray(value) ? value : [];
    const update = (i, key2, v) => { const c = [...items]; c[i] = { ...c[i], [key2]: v }; onChange(c); };
    const add = () => onChange([...items, { week: '', topic: '' }]);
    const rm = (i) => onChange(items.filter((_, idx) => idx !== i));
    return (
      <div>
        <p className="fld-label">{label}</p>
        {items.map((row, i) => (
          <div key={i} className="grid grid-cols-[120px_1fr_auto] gap-3 mb-2">
            <input className="fld-input" placeholder="Week" value={row.week || ''} onChange={(e) => update(i, 'week', e.target.value)} />
            <input className="fld-input" placeholder="Topic" value={row.topic || ''} onChange={(e) => update(i, 'topic', e.target.value)} />
            <button onClick={() => rm(i)} className="p-2.5 border border-navy/20 text-navy hover:text-red-500"><Trash2 size={14} /></button>
          </div>
        ))}
        <button onClick={add} type="button" className="btn-outline-gold border-navy/30 text-navy"><Plus size={14} /> Add week</button>
      </div>
    );
  }
  if (type === 'credentials') {
    const items = Array.isArray(value) ? value : [];
    const update = (i, key2, v) => { const c = [...items]; c[i] = { ...c[i], [key2]: v }; onChange(c); };
    const add = () => onChange([...items, { institution: '', detail: '' }]);
    const rm = (i) => onChange(items.filter((_, idx) => idx !== i));
    return (
      <div>
        <p className="fld-label">{label}</p>
        {items.map((row, i) => (
          <div key={i} className="grid grid-cols-[1fr_1fr_auto] gap-3 mb-2">
            <input className="fld-input" placeholder="Institution" value={row.institution || ''} onChange={(e) => update(i, 'institution', e.target.value)} />
            <input className="fld-input" placeholder="Detail" value={row.detail || ''} onChange={(e) => update(i, 'detail', e.target.value)} />
            <button onClick={() => rm(i)} className="p-2.5 border border-navy/20 text-navy hover:text-red-500"><Trash2 size={14} /></button>
          </div>
        ))}
        <button onClick={add} type="button" className="btn-outline-gold border-navy/30 text-navy"><Plus size={14} /> Add credential</button>
      </div>
    );
  }
  if (type === 'modules') {
    const items = Array.isArray(value) ? value : [];
    const update = (i, key2, v) => { const c = [...items]; c[i] = { ...c[i], [key2]: v }; onChange(c); };
    const updateTopics = (i, str) => update(i, 'topics', str.split('\n').map((s) => s.trim()).filter(Boolean));
    const add = () => onChange([...items, { n: String(items.length + 1).padStart(2, '0'), title: '', description: '', topics: [] }]);
    const rm = (i) => onChange(items.filter((_, idx) => idx !== i));
    return (
      <div>
        <p className="fld-label">{label}</p>
        {items.map((row, i) => (
          <div key={i} className="bg-bone/40 p-4 mb-3 border border-navy/10">
            <div className="grid grid-cols-[80px_1fr_auto] gap-3 items-end">
              <input className="fld-input" placeholder="#" value={row.n || ''} onChange={(e) => update(i, 'n', e.target.value)} />
              <input className="fld-input" placeholder="Title" value={row.title || ''} onChange={(e) => update(i, 'title', e.target.value)} />
              <button onClick={() => rm(i)} className="p-2.5 border border-navy/20 text-navy hover:text-red-500"><Trash2 size={14} /></button>
            </div>
            <textarea rows={2} placeholder="Description" className="fld-input mt-2" value={row.description || ''} onChange={(e) => update(i, 'description', e.target.value)} />
            <textarea rows={3} placeholder="Topics (one per line)" className="fld-input mt-2"
                      value={(row.topics || []).join('\n')} onChange={(e) => updateTopics(i, e.target.value)} />
          </div>
        ))}
        <button onClick={add} type="button" className="btn-outline-gold border-navy/30 text-navy"><Plus size={14} /> Add module</button>
      </div>
    );
  }
  if (type === 'experience-items') {
    const items = Array.isArray(value) ? value : [];
    const update = (i, key2, v) => { const c = [...items]; c[i] = { ...c[i], [key2]: v }; onChange(c); };
    const add = () => onChange([...items, { title: '', body: '' }]);
    const rm = (i) => onChange(items.filter((_, idx) => idx !== i));
    return (
      <div>
        <p className="fld-label">{label}</p>
        {items.map((row, i) => (
          <div key={i} className="bg-bone/40 p-4 mb-3 border border-navy/10">
            <div className="grid grid-cols-[1fr_auto] gap-3 items-end">
              <input className="fld-input" placeholder="Title (e.g. Live Learning)"
                value={row.title || ''} onChange={(e) => update(i, 'title', e.target.value)} />
              <button onClick={() => rm(i)} type="button"
                className="p-2.5 border border-navy/20 text-navy hover:text-red-500"><Trash2 size={14} /></button>
            </div>
            <textarea rows={3} placeholder="Description" className="fld-input mt-2"
              value={row.body || ''} onChange={(e) => update(i, 'body', e.target.value)} />
          </div>
        ))}
        <button onClick={add} type="button" className="btn-outline-gold border-navy/30 text-navy"><Plus size={14} /> Add item</button>
      </div>
    );
  }
  if (type === 'faqs') {
    const items = Array.isArray(value) ? value : [];
    const update = (i, key2, v) => { const c = [...items]; c[i] = { ...c[i], [key2]: v }; onChange(c); };
    const add = () => onChange([...items, { q: '', a: '' }]);
    const rm = (i) => onChange(items.filter((_, idx) => idx !== i));
    return (
      <div>
        <p className="fld-label">{label}</p>
        {items.map((row, i) => (
          <div key={i} className="bg-bone/40 p-4 mb-3 border border-navy/10">
            <div className="grid grid-cols-[1fr_auto] gap-3 items-end">
              <input className="fld-input" placeholder="Question" value={row.q || ''} onChange={(e) => update(i, 'q', e.target.value)} />
              <button onClick={() => rm(i)} className="p-2.5 border border-navy/20 text-navy hover:text-red-500"><Trash2 size={14} /></button>
            </div>
            <textarea rows={3} placeholder="Answer" className="fld-input mt-2" value={row.a || ''} onChange={(e) => update(i, 'a', e.target.value)} />
          </div>
        ))}
        <button onClick={add} type="button" className="btn-outline-gold border-navy/30 text-navy"><Plus size={14} /> Add FAQ</button>
      </div>
    );
  }
  return (
    <label className="block">
      <span className="fld-label">{label}</span>
      <input type="text" className="fld-input" value={value || ''} onChange={(e) => onChange(e.target.value)} />
      {help && <span className="block text-xs text-navy/50 mt-1">{help}</span>}
    </label>
  );
}
