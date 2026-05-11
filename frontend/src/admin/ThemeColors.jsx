import React, { useEffect, useState } from 'react';
import { Palette, Save, RotateCcw, CheckCircle2, AlertCircle } from 'lucide-react';
import { api } from './api';

const DEFAULTS = {
  heroTitle: '#0b1733',
  heroAccent: '#c9a227',
  programTitle: '#0b1733',
  moduleTitle: '#0b1733',
  navBrand: '#f5efe6',
};

const PICKERS = [
  {
    key: 'heroTitle',
    label: 'Page hero title',
    hint: 'Main heading on Home, About, Apply, Schedule, Corporate and other page heroes.',
  },
  {
    key: 'heroAccent',
    label: 'Accent / italic part of title',
    hint: 'The italic gold accent words (e.g. “strategic value.”) inside hero titles.',
  },
  {
    key: 'programTitle',
    label: 'Programme title',
    hint: 'The main programme name on programme detail pages.',
  },
  {
    key: 'moduleTitle',
    label: 'Module title',
    hint: 'Module names inside the Programme Modules accordion.',
  },
  {
    key: 'navBrand',
    label: 'Navbar brand / menu text',
    hint: 'Top navigation menu text colour.',
  },
];

export default function ThemeColors() {
  const [cfg, setCfg] = useState(DEFAULTS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    api.getThemeColors()
      .then((d) => setCfg({ ...DEFAULTS, ...d }))
      .finally(() => setLoading(false));
  }, []);

  const flash = (type, msg) => {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 3500);
  };

  const onChange = (k, v) => {
    setCfg((c) => ({ ...c, [k]: v }));
    // Live preview on root
    document.documentElement.style.setProperty(`--epsilon-${kebab(k)}`, v);
  };

  const onReset = () => {
    setCfg(DEFAULTS);
    Object.entries(DEFAULTS).forEach(([k, v]) =>
      document.documentElement.style.setProperty(`--epsilon-${kebab(k)}`, v)
    );
    flash('success', 'Reverted to defaults. Click Save to keep them.');
  };

  const onSave = async () => {
    setSaving(true);
    try {
      await api.putThemeColors(cfg);
      flash('success', 'Theme colours saved.');
    } catch (e) {
      flash('error', e?.response?.data?.detail || 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="font-editorial text-navy/60 py-10 text-center">Loading…</p>;

  return (
    <div className="space-y-8" data-testid="theme-colors-page">
      <header>
        <div className="flex items-center gap-3">
          <Palette className="text-gold" size={26} />
          <h1 className="font-display text-navy text-[2rem]">Theme Colors</h1>
        </div>
        <p className="font-editorial text-navy/70 mt-2 max-w-2xl">
          Customise the colour of titles across the site. Changes preview instantly, click <strong>Save</strong> to apply for every visitor.
        </p>
      </header>

      {toast && (
        <div
          className={`flex items-start gap-3 p-4 border ${
            toast.type === 'success' ? 'bg-green-50 border-green-300 text-green-900' : 'bg-red-50 border-red-300 text-red-900'
          }`}
          data-testid="theme-toast"
        >
          {toast.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
          <span className="text-sm">{toast.msg}</span>
        </div>
      )}

      <div className="bg-white border border-navy/10 p-8 space-y-6">
        {PICKERS.map(({ key, label, hint }) => (
          <div key={key} className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-4 items-center pb-5 border-b border-navy/10 last:border-0 last:pb-0">
            <div>
              <p className="font-display text-navy text-[1.05rem]">{label}</p>
              <p className="font-sans text-xs text-navy/55 mt-1">{hint}</p>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={cfg[key]}
                onChange={(e) => onChange(key, e.target.value)}
                className="h-11 w-16 border border-navy/15 cursor-pointer p-0 rounded"
                data-testid={`theme-color-${key}-picker`}
                aria-label={`${label} picker`}
              />
              <input
                type="text"
                value={cfg[key]}
                onChange={(e) => onChange(key, e.target.value)}
                className="w-28 border border-navy/15 px-3 py-2.5 font-mono text-sm focus:border-gold outline-none uppercase"
                data-testid={`theme-color-${key}-hex`}
                maxLength={7}
              />
            </div>
          </div>
        ))}

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            onClick={onSave}
            disabled={saving}
            className="inline-flex items-center justify-center gap-2 bg-navy text-cream px-6 py-3 font-caps text-[0.7rem] tracking-[0.24em] hover:bg-navy-deep disabled:opacity-50"
            data-testid="theme-save-btn"
          >
            <Save size={14} /> {saving ? 'Saving…' : 'Save Theme'}
          </button>
          <button
            onClick={onReset}
            className="inline-flex items-center justify-center gap-2 border border-navy/30 text-navy px-6 py-3 font-caps text-[0.7rem] tracking-[0.24em] hover:bg-navy hover:text-cream"
            data-testid="theme-reset-btn"
          >
            <RotateCcw size={14} /> Reset to Defaults
          </button>
        </div>
      </div>

      <div className="bg-bone border border-navy/10 p-6 text-sm text-navy/75 font-editorial leading-relaxed">
        <p className="font-caps text-[0.6rem] tracking-[0.22em] text-gold mb-3">Live preview</p>
        <p className="font-editorial">
          Open the public site in another tab — when you change a colour here you can hit <strong>Save</strong> and refresh that tab to see the change applied.
        </p>
      </div>
    </div>
  );
}

function kebab(s) {
  return s.replace(/([A-Z])/g, '-$1').toLowerCase();
}
