import React, { useEffect, useState } from 'react';
import { api } from './api';
import { Save, Plus, Trash2, ChevronDown, ChevronUp, GripVertical } from 'lucide-react';
import ImageField from './ImageField';

// Inline-safe field components (defined at module scope to prevent
// re-creation on every render, which causes cursor-jump bugs).
const F = ({ label, value, onChange, textarea, placeholder, help }) => (
  <label className="block">
    <span className="fld-label">{label}</span>
    {textarea ? (
      <textarea
        rows={3}
        className="fld-input"
        value={value || ''}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    ) : (
      <input
        type="text"
        className="fld-input"
        value={value || ''}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    )}
    {help && <span className="block text-xs text-navy/50 mt-1">{help}</span>}
  </label>
);

const Section = ({ title, expanded, onToggle, children, accent }) => (
  <section className="bg-white border border-navy/10 mb-6 overflow-hidden">
    <button
      onClick={onToggle}
      className="w-full flex items-center justify-between p-6 hover:bg-bone/40 transition-colors text-left"
      data-testid={`corporate-section-${title.replace(/\s+/g, '-').toLowerCase()}`}
    >
      <div>
        <p className="font-caps text-[0.65rem] text-gold tracking-[0.22em]">{title}</p>
        {accent && <p className="font-editorial text-navy/60 text-sm mt-1">{accent}</p>}
      </div>
      {expanded ? <ChevronUp size={18} className="text-navy" /> : <ChevronDown size={18} className="text-navy" />}
    </button>
    {expanded && <div className="px-6 pb-6 space-y-5 border-t border-navy/10 pt-5">{children}</div>}
  </section>
);

export default function CorporateEditor() {
  const [home, setHome] = useState(null);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState('');
  const [expanded, setExpanded] = useState({
    hero: true,
    intro: false,
    why: true,
    audiences: true,
    cta: false,
  });

  useEffect(() => {
    api.getHome().then((h) => {
      const corp = h?.corporate || {};
      setHome({
        ...h,
        corporate: {
          eyebrow: corp.eyebrow || 'Corporate Education',
          heroTitle: corp.heroTitle || 'Built for your team. Run for your business.',
          heroSubtitle: corp.heroSubtitle || 'Custom cohorts that turn your senior team into evidence-based decision-makers.',
          heroPrimaryCtaText: corp.heroPrimaryCtaText || 'Talk to Us',
          heroSecondaryCtaText: corp.heroSecondaryCtaText || 'Schedule a Call',
          introEyebrow: corp.introEyebrow || 'Why Epsilon for Corporate',
          introTitle: corp.introTitle || 'Bespoke programs that ship.',
          intro: corp.intro || 'We design and deliver private cohorts for companies that want their senior leadership to think clearly about AI, data, and modern decision systems.',
          whyTitle: corp.whyTitle || 'Why companies partner with Epsilon',
          whyItems: Array.isArray(corp.whyItems) ? corp.whyItems : [],
          audiencesTitle: corp.audiencesTitle || 'Who we run cohorts for',
          audiences: Array.isArray(corp.audiences) ? corp.audiences : [],
          ctaEyebrow: corp.ctaEyebrow || 'Get in Touch',
          ctaTitle: corp.ctaTitle || 'Talk to us about a private cohort.',
          ctaSubtitle: corp.ctaSubtitle || 'Tell us about your team and what you want them to be able to do. We will design a program around it.',
        },
      });
    });
  }, []);

  if (!home) return <p className="font-editorial text-navy/60">Loading…</p>;

  const c = home.corporate;

  const toggle = (k) => setExpanded((s) => ({ ...s, [k]: !s[k] }));

  const updateCorp = (key, value) => {
    setHome((h) => ({ ...h, corporate: { ...h.corporate, [key]: value } }));
  };

  const updateImage = (key, value) => {
    setHome((h) => ({
      ...h,
      siteImages: { ...(h.siteImages || {}), [key]: value },
    }));
  };

  const addWhy = () => {
    const items = [...(c.whyItems || []), { title: '', body: '' }];
    updateCorp('whyItems', items);
  };
  const updateWhy = (i, key, value) => {
    const items = [...c.whyItems];
    items[i] = { ...items[i], [key]: value };
    updateCorp('whyItems', items);
  };
  const removeWhy = (i) => updateCorp('whyItems', c.whyItems.filter((_, idx) => idx !== i));
  const moveWhy = (i, dir) => {
    const items = [...c.whyItems];
    const j = i + dir;
    if (j < 0 || j >= items.length) return;
    [items[i], items[j]] = [items[j], items[i]];
    updateCorp('whyItems', items);
  };

  const addAud = () => updateCorp('audiences', [...(c.audiences || []), { title: '', body: '' }]);
  const updateAud = (i, key, value) => {
    const items = [...c.audiences];
    items[i] = { ...items[i], [key]: value };
    updateCorp('audiences', items);
  };
  const removeAud = (i) => updateCorp('audiences', c.audiences.filter((_, idx) => idx !== i));
  const moveAud = (i, dir) => {
    const items = [...c.audiences];
    const j = i + dir;
    if (j < 0 || j >= items.length) return;
    [items[i], items[j]] = [items[j], items[i]];
    updateCorp('audiences', items);
  };

  const save = async () => {
    setSaving(true);
    try {
      await api.putHome(home);
      setToast('✓ Corporate page saved');
      setTimeout(() => setToast(''), 2500);
    } catch (e) {
      setToast(e?.response?.data?.detail || 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div data-testid="corporate-editor">
      <div className="flex items-center justify-between sticky top-0 bg-cream py-3 -mx-8 px-8 z-10">
        <div>
          <h1 className="font-display text-navy text-[2rem]">Corporate Page</h1>
          <p className="font-editorial text-navy/60 text-sm">Edit every section of <span className="text-gold">/corporate</span></p>
        </div>
        <button onClick={save} disabled={saving} className="btn-gold" data-testid="corporate-save-btn">
          <Save size={14} /> {saving ? 'Saving…' : 'Save Changes'}
        </button>
      </div>

      {toast && (
        <div className="mb-4 p-4 bg-green-50 border border-green-200 text-green-800 font-sans text-sm">
          {toast}
        </div>
      )}

      {/* Hero */}
      <Section
        title="1. Hero Section"
        accent="The dark banner at the top of the page"
        expanded={expanded.hero}
        onToggle={() => toggle('hero')}
      >
        <F label="Eyebrow (small label above title)" value={c.eyebrow} onChange={(v) => updateCorp('eyebrow', v)} placeholder="Corporate Education" />
        <F label="Hero Title" value={c.heroTitle} onChange={(v) => updateCorp('heroTitle', v)} placeholder="Built for your team. Run for your business." />
        <F label="Hero Subtitle" textarea value={c.heroSubtitle} onChange={(v) => updateCorp('heroSubtitle', v)} />
        <div className="grid grid-cols-2 gap-4">
          <F label="Primary CTA text" value={c.heroPrimaryCtaText} onChange={(v) => updateCorp('heroPrimaryCtaText', v)} />
          <F label="Secondary CTA text" value={c.heroSecondaryCtaText} onChange={(v) => updateCorp('heroSecondaryCtaText', v)} />
        </div>
        <ImageField
          label="Hero background image (optional)"
          value={home.siteImages?.corporateHero}
          onChange={(v) => updateImage('corporateHero', v)}
          help="If blank, the default dark navy gradient is shown."
        />
      </Section>

      {/* Intro */}
      <Section
        title="2. Intro / Why Epsilon"
        accent="Two-column intro paragraph below the hero"
        expanded={expanded.intro}
        onToggle={() => toggle('intro')}
      >
        <F label="Eyebrow" value={c.introEyebrow} onChange={(v) => updateCorp('introEyebrow', v)} />
        <F label="Title" value={c.introTitle} onChange={(v) => updateCorp('introTitle', v)} help="Use 'that ship.' to keep the gold italic accent at the end." />
        <F label="Intro paragraph" textarea value={c.intro} onChange={(v) => updateCorp('intro', v)} />
      </Section>

      {/* Why items */}
      <Section
        title="3. Why companies partner with Epsilon"
        accent={`${(c.whyItems || []).length} feature card${(c.whyItems || []).length === 1 ? '' : 's'}`}
        expanded={expanded.why}
        onToggle={() => toggle('why')}
      >
        <F label="Section title" value={c.whyTitle} onChange={(v) => updateCorp('whyTitle', v)} />
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="fld-label">Cards</span>
            <button onClick={addWhy} className="btn-outline-sm flex items-center gap-1" data-testid="corp-add-why">
              <Plus size={14} /> Add card
            </button>
          </div>
          {(c.whyItems || []).length === 0 && (
            <p className="font-editorial text-navy/50 text-sm py-4">No cards yet. Click "Add card".</p>
          )}
          {(c.whyItems || []).map((it, i) => (
            <div key={i} className="border border-navy/10 p-4 mb-3 bg-bone/30">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-2 text-navy/40">
                  <GripVertical size={14} />
                  <span className="font-caps text-[0.6rem] tracking-[0.22em]">Card {i + 1}</span>
                </div>
                <div className="flex items-center gap-1">
                  <button onClick={() => moveWhy(i, -1)} disabled={i === 0} className="p-1.5 border border-navy/20 text-navy hover:border-gold disabled:opacity-30" title="Move up"><ChevronUp size={14} /></button>
                  <button onClick={() => moveWhy(i, 1)} disabled={i === c.whyItems.length - 1} className="p-1.5 border border-navy/20 text-navy hover:border-gold disabled:opacity-30" title="Move down"><ChevronDown size={14} /></button>
                  <button onClick={() => removeWhy(i)} className="p-1.5 border border-navy/20 text-navy hover:border-red-400 hover:text-red-500" title="Delete"><Trash2 size={14} /></button>
                </div>
              </div>
              <div className="space-y-3">
                <F label="Title" value={it.title} onChange={(v) => updateWhy(i, 'title', v)} placeholder="Bespoke design" />
                <F label="Body" textarea value={it.body} onChange={(v) => updateWhy(i, 'body', v)} placeholder="A short description of this benefit." />
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Audiences */}
      <Section
        title="4. Who we run cohorts for"
        accent={`${(c.audiences || []).length} audience card${(c.audiences || []).length === 1 ? '' : 's'}`}
        expanded={expanded.audiences}
        onToggle={() => toggle('audiences')}
      >
        <F label="Section title" value={c.audiencesTitle} onChange={(v) => updateCorp('audiencesTitle', v)} />
        <p className="text-xs text-navy/55">Audience titles also populate the "Cohort Interest" dropdown in the form below.</p>
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="fld-label">Audience cards</span>
            <button onClick={addAud} className="btn-outline-sm flex items-center gap-1" data-testid="corp-add-audience">
              <Plus size={14} /> Add audience
            </button>
          </div>
          {(c.audiences || []).length === 0 && (
            <p className="font-editorial text-navy/50 text-sm py-4">No audiences yet. Click "Add audience".</p>
          )}
          {(c.audiences || []).map((it, i) => (
            <div key={i} className="border border-navy/10 p-4 mb-3 bg-bone/30">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-2 text-navy/40">
                  <GripVertical size={14} />
                  <span className="font-caps text-[0.6rem] tracking-[0.22em]">Audience {i + 1}</span>
                </div>
                <div className="flex items-center gap-1">
                  <button onClick={() => moveAud(i, -1)} disabled={i === 0} className="p-1.5 border border-navy/20 text-navy hover:border-gold disabled:opacity-30"><ChevronUp size={14} /></button>
                  <button onClick={() => moveAud(i, 1)} disabled={i === c.audiences.length - 1} className="p-1.5 border border-navy/20 text-navy hover:border-gold disabled:opacity-30"><ChevronDown size={14} /></button>
                  <button onClick={() => removeAud(i)} className="p-1.5 border border-navy/20 text-navy hover:border-red-400 hover:text-red-500"><Trash2 size={14} /></button>
                </div>
              </div>
              <div className="space-y-3">
                <F label="Title" value={it.title} onChange={(v) => updateAud(i, 'title', v)} placeholder="C-Suite & Boards" />
                <F label="Body" textarea value={it.body} onChange={(v) => updateAud(i, 'body', v)} placeholder="A short description of who this is for." />
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section
        title="5. CTA / Inquiry Form"
        accent="Copy above the inquiry form"
        expanded={expanded.cta}
        onToggle={() => toggle('cta')}
      >
        <F label="Eyebrow" value={c.ctaEyebrow} onChange={(v) => updateCorp('ctaEyebrow', v)} />
        <F label="CTA title" value={c.ctaTitle} onChange={(v) => updateCorp('ctaTitle', v)} />
        <F label="CTA subtitle" textarea value={c.ctaSubtitle} onChange={(v) => updateCorp('ctaSubtitle', v)} />
        <p className="text-xs text-navy/55">The contact email shown next to the form is pulled from <span className="text-gold">Home → Contact Details</span>.</p>
      </Section>

      <div className="flex justify-end pt-4">
        <button onClick={save} disabled={saving} className="btn-gold" data-testid="corporate-save-btn-bottom">
          <Save size={14} /> {saving ? 'Saving…' : 'Save Changes'}
        </button>
      </div>
    </div>
  );
}
