import React, { useEffect, useState } from 'react';
import { api } from './api';
import { Save, Plus, Trash2, ChevronUp, ChevronDown } from 'lucide-react';
import ImageField from './ImageField';

// Module-scope helpers (defined outside component to avoid cursor-jump bug).
const F = ({ label, value, onChange, textarea, placeholder, help }) => (
  <label className="block">
    <span className="fld-label">{label}</span>
    {textarea ? (
      <textarea rows={3} className="fld-input" value={value || ''} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />
    ) : (
      <input type="text" className="fld-input" value={value || ''} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />
    )}
    {help && <span className="block text-xs text-navy/50 mt-1">{help}</span>}
  </label>
);

const Block = ({ title, children, accent }) => (
  <section className="bg-white p-6 md:p-8 border border-navy/10 mb-6">
    <p className="font-caps text-[0.65rem] text-gold tracking-[0.22em] mb-1">{title}</p>
    {accent && <p className="font-editorial text-navy/60 text-sm mb-4">{accent}</p>}
    <div className="space-y-4 mt-4">{children}</div>
  </section>
);

const ArrayEditor = ({ label, items, onChange, fields, defaults, addLabel = 'Add item', testid }) => {
  const add = () => onChange([...(items || []), { ...defaults }]);
  const update = (i, key, value) => {
    const next = [...items];
    next[i] = { ...next[i], [key]: value };
    onChange(next);
  };
  const remove = (i) => onChange(items.filter((_, idx) => idx !== i));
  const move = (i, dir) => {
    const next = [...items];
    const j = i + dir;
    if (j < 0 || j >= next.length) return;
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <span className="fld-label">{label}</span>
        <button type="button" onClick={add} className="btn-outline-sm flex items-center gap-1" data-testid={testid}>
          <Plus size={14} /> {addLabel}
        </button>
      </div>
      {(items || []).length === 0 && <p className="font-editorial text-navy/50 text-sm py-3">No items yet.</p>}
      {(items || []).map((it, i) => (
        <div key={i} className="border border-navy/10 p-4 mb-3 bg-bone/30">
          <div className="flex items-start justify-between gap-3 mb-3">
            <span className="font-caps text-[0.6rem] tracking-[0.22em] text-navy/50">#{i + 1}</span>
            <div className="flex items-center gap-1">
              <button type="button" onClick={() => move(i, -1)} disabled={i === 0} className="p-1.5 border border-navy/20 text-navy hover:border-gold disabled:opacity-30"><ChevronUp size={14} /></button>
              <button type="button" onClick={() => move(i, 1)} disabled={i === items.length - 1} className="p-1.5 border border-navy/20 text-navy hover:border-gold disabled:opacity-30"><ChevronDown size={14} /></button>
              <button type="button" onClick={() => remove(i)} className="p-1.5 border border-navy/20 text-navy hover:border-red-400 hover:text-red-500"><Trash2 size={14} /></button>
            </div>
          </div>
          <div className="space-y-3">
            {fields.map((f) => (
              <F key={f.key} label={f.label} textarea={f.textarea} placeholder={f.placeholder} value={it[f.key]} onChange={(v) => update(i, f.key, v)} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

const TABS = [
  { key: 'about', label: 'About' },
  { key: 'admissions', label: 'Admissions' },
  { key: 'schedule', label: 'Schedule' },
  { key: 'contact', label: 'Contact' },
  { key: 'apply', label: 'Apply' },
];

const DEFAULTS = {
  about: {
    hero: { eyebrow: 'About Epsilon', title: 'A school for the people who decide.', subtitle: 'Epsilon Executive Education exists to bridge the gap between technical possibility and credible business action.' },
    philosophy: { eyebrow: 'Our Philosophy', title: 'Turning technical fluency into', titleItalic: 'strategic value.', paragraph1: '', paragraph2: '' },
    beliefsEyebrow: 'What we believe',
    cta: { title: 'Build the judgement your', titleItalic: 'next decade', titleSuffix: 'demands.', primaryText: 'Explore Programs', primaryHref: '/programs', secondaryText: 'Talk to Us', secondaryHref: '/contact' },
  },
  admissions: {
    hero: { eyebrow: 'Admissions', title: 'A personal conversation. Not a funnel.', subtitle: 'Every applicant speaks with an admissions lead before a seat is offered.' },
    processEyebrow: 'The Process',
    imageCaption: { line1: 'A 25-min conversation', line2: 'Reviewed by a person, not an algorithm.' },
    steps: [
      { n: '01', title: 'Application', body: 'Tell us about your work and what you want to learn.' },
      { n: '02', title: 'Conversation', body: 'A personal call with admissions to discuss fit and expectations.' },
      { n: '03', title: 'Decision', body: 'A seat is offered based on fit, not first-come-first-served.' },
      { n: '04', title: 'Onboarding', body: 'Pre-work, cohort introductions, and access to Moodle.' },
    ],
    cohortsEyebrow: 'Upcoming Cohorts',
    feesEyebrow: 'Fees & Investment',
    feesTitle: 'A clear, transparent investment.',
    fees: [
      { label: 'Program Fee', amount: '₹1,25,000', note: 'All-inclusive of materials, sessions, and certificate' },
      { label: 'Early Bird (4 weeks before start)', amount: '₹1,10,000', note: 'Subject to seat availability' },
      { label: 'Group Discount (3+)', amount: '15% off', note: 'For corporate cohorts of three or more' },
    ],
    programsEyebrow: 'Programs',
    cta: { title: 'Start your', titleItalic: 'admissions conversation.' },
  },
  schedule: {
    hero: { eyebrow: 'Schedule a Call', title: 'Talk to admissions', titleItalic: 'on your time.', subtitle: 'Pick a time that works for you. We will send a calendar invite within one working day with the meeting link.' },
    imageCaption: { line1: 'A personal call', line2: 'Not a sales funnel.' },
    expectEyebrow: 'What to Expect',
    expectItems: [
      { title: '25–30 minutes', body: 'A focused conversation, not a sales call.' },
      { title: 'Video, by default', body: 'Zoom or Google Meet — your choice.' },
      { title: 'Confirmed within 24h', body: 'We will send a calendar invite by email.' },
    ],
  },
  contact: {
    hero: { eyebrow: 'Contact', title: 'Talk to admissions.' },
    topics: ['General Inquiry', 'Admissions Question', 'Program Fit', 'Corporate / Cohort Partnerships', 'Press & Media'],
  },
  apply: {
    hero: { titleLine1: 'Begin your', titleItalic: 'conversation with Epsilon.', subtitle: 'Applications are reviewed personally by our admissions team. Tell us about you and what you want to learn — we will reach out to discuss fit, expectations, and next steps.' },
    deadlineLabel: 'Application Deadline',
    formEyebrow: 'Apply',
    formTitle: 'Start your application.',
    formSubtitle: 'A short form — about ninety seconds. We read every submission personally.',
    finalCtaEyebrow: 'Take the next step',
  },
};

const mergeDefaults = (page, fromServer) => {
  const base = JSON.parse(JSON.stringify(DEFAULTS[page]));
  if (!fromServer) return base;
  // Shallow + 1-level merge so missing fields fall back to defaults.
  const merged = { ...base, ...fromServer };
  Object.keys(base).forEach((k) => {
    if (base[k] && typeof base[k] === 'object' && !Array.isArray(base[k])) {
      merged[k] = { ...base[k], ...(fromServer[k] || {}) };
    }
  });
  return merged;
};

export default function PagesEditor() {
  const [tab, setTab] = useState('about');
  const [home, setHome] = useState(null);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState('');

  useEffect(() => {
    api.getHome().then((h) => {
      const next = { ...h };
      TABS.forEach(({ key }) => {
        next[key] = mergeDefaults(key, h?.[key]);
      });
      // Preserve existing contact subtext etc.
      next.contact = { ...(h?.contact || {}), ...next.contact };
      setHome(next);
    });
  }, []);

  if (!home) return <p className="font-editorial text-navy/60">Loading…</p>;

  const setPage = (key, value) => setHome((h) => ({ ...h, [key]: { ...h[key], ...value } }));
  const setSiteImage = (key, value) => setHome((h) => ({ ...h, siteImages: { ...(h.siteImages || {}), [key]: value } }));

  const save = async () => {
    setSaving(true);
    try {
      await api.putHome(home);
      setToast('✓ Pages saved');
      setTimeout(() => setToast(''), 2500);
    } catch (e) {
      setToast(e?.response?.data?.detail || 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div data-testid="pages-editor">
      <div className="flex items-center justify-between sticky top-0 bg-cream py-3 -mx-8 px-8 z-10">
        <div>
          <h1 className="font-display text-navy text-[2rem]">Pages</h1>
          <p className="font-editorial text-navy/60 text-sm">Edit hero text, body copy, and key sections of every static page.</p>
        </div>
        <button onClick={save} disabled={saving} className="btn-gold" data-testid="pages-save-btn">
          <Save size={14} /> {saving ? 'Saving…' : 'Save Changes'}
        </button>
      </div>

      {toast && <div className="mb-4 p-4 bg-green-50 border border-green-200 text-green-800 font-sans text-sm">{toast}</div>}

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-navy/15 mb-6 -mt-2">
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`px-5 py-3 font-caps text-[0.7rem] tracking-[0.22em] transition-colors border-b-2 -mb-px ${
              tab === t.key ? 'border-gold text-navy' : 'border-transparent text-navy/55 hover:text-navy'
            }`}
            data-testid={`pages-tab-${t.key}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'about' && (
        <>
          <Block title="Hero" accent="Top of /about">
            <F label="Eyebrow" value={home.about.hero.eyebrow} onChange={(v) => setPage('about', { hero: { ...home.about.hero, eyebrow: v } })} />
            <F label="Title" value={home.about.hero.title} onChange={(v) => setPage('about', { hero: { ...home.about.hero, title: v } })} />
            <F label="Subtitle" textarea value={home.about.hero.subtitle} onChange={(v) => setPage('about', { hero: { ...home.about.hero, subtitle: v } })} />
          </Block>
          <Block title="Philosophy block" accent="Two-column section with image">
            <F label="Eyebrow" value={home.about.philosophy.eyebrow} onChange={(v) => setPage('about', { philosophy: { ...home.about.philosophy, eyebrow: v } })} />
            <F label="Title (regular part)" value={home.about.philosophy.title} onChange={(v) => setPage('about', { philosophy: { ...home.about.philosophy, title: v } })} />
            <F label="Title (italic gold accent)" value={home.about.philosophy.titleItalic} onChange={(v) => setPage('about', { philosophy: { ...home.about.philosophy, titleItalic: v } })} />
            <F label="Paragraph 1" textarea value={home.about.philosophy.paragraph1 || home.about?.paragraph1} onChange={(v) => setPage('about', { philosophy: { ...home.about.philosophy, paragraph1: v } })} />
            <F label="Paragraph 2" textarea value={home.about.philosophy.paragraph2 || home.about?.paragraph2} onChange={(v) => setPage('about', { philosophy: { ...home.about.philosophy, paragraph2: v } })} />
            <ImageField label="Philosophy image" value={home.siteImages?.aboutPhilosophy} onChange={(v) => setSiteImage('aboutPhilosophy', v)} />
          </Block>
          <Block title="Beliefs section" accent="The 3 cards (managed in Home Editor)">
            <F label="Eyebrow" value={home.about.beliefsEyebrow} onChange={(v) => setPage('about', { beliefsEyebrow: v })} />
            <p className="text-xs text-navy/55">The 3 belief cards are edited in <span className="text-gold">Home Page → What we believe</span>.</p>
          </Block>
          <Block title="Final CTA band" accent="Dark navy section at the bottom">
            <F label="Title (start)" value={home.about.cta.title} onChange={(v) => setPage('about', { cta: { ...home.about.cta, title: v } })} />
            <F label="Title (italic gold)" value={home.about.cta.titleItalic} onChange={(v) => setPage('about', { cta: { ...home.about.cta, titleItalic: v } })} />
            <F label="Title (suffix)" value={home.about.cta.titleSuffix} onChange={(v) => setPage('about', { cta: { ...home.about.cta, titleSuffix: v } })} />
            <div className="grid grid-cols-2 gap-4">
              <F label="Primary CTA text" value={home.about.cta.primaryText} onChange={(v) => setPage('about', { cta: { ...home.about.cta, primaryText: v } })} />
              <F label="Primary CTA link" value={home.about.cta.primaryHref} onChange={(v) => setPage('about', { cta: { ...home.about.cta, primaryHref: v } })} />
              <F label="Secondary CTA text" value={home.about.cta.secondaryText} onChange={(v) => setPage('about', { cta: { ...home.about.cta, secondaryText: v } })} />
              <F label="Secondary CTA link" value={home.about.cta.secondaryHref} onChange={(v) => setPage('about', { cta: { ...home.about.cta, secondaryHref: v } })} />
            </div>
          </Block>
        </>
      )}

      {tab === 'admissions' && (
        <>
          <Block title="Hero" accent="Top of /admissions">
            <F label="Eyebrow" value={home.admissions.hero.eyebrow} onChange={(v) => setPage('admissions', { hero: { ...home.admissions.hero, eyebrow: v } })} />
            <F label="Title" value={home.admissions.hero.title} onChange={(v) => setPage('admissions', { hero: { ...home.admissions.hero, title: v } })} />
            <F label="Subtitle" textarea value={home.admissions.hero.subtitle} onChange={(v) => setPage('admissions', { hero: { ...home.admissions.hero, subtitle: v } })} />
          </Block>
          <Block title="Process steps" accent="The 4-step grid">
            <F label="Section eyebrow" value={home.admissions.processEyebrow} onChange={(v) => setPage('admissions', { processEyebrow: v })} />
            <ImageField label="Process image" value={home.siteImages?.admissionsProcess} onChange={(v) => setSiteImage('admissionsProcess', v)} />
            <div className="grid grid-cols-2 gap-4">
              <F label="Image caption (small gold)" value={home.admissions.imageCaption.line1} onChange={(v) => setPage('admissions', { imageCaption: { ...home.admissions.imageCaption, line1: v } })} />
              <F label="Image caption (large)" value={home.admissions.imageCaption.line2} onChange={(v) => setPage('admissions', { imageCaption: { ...home.admissions.imageCaption, line2: v } })} />
            </div>
            <ArrayEditor
              label="Steps"
              items={home.admissions.steps}
              onChange={(v) => setPage('admissions', { steps: v })}
              fields={[
                { key: 'n', label: 'Number (e.g. 01)' },
                { key: 'title', label: 'Step title' },
                { key: 'body', label: 'Step description', textarea: true },
              ]}
              defaults={{ n: '', title: '', body: '' }}
              addLabel="Add step"
              testid="adm-add-step"
            />
          </Block>
          <Block title="Fees & Investment cards" accent="The 3-card pricing block">
            <F label="Section eyebrow" value={home.admissions.feesEyebrow} onChange={(v) => setPage('admissions', { feesEyebrow: v })} />
            <F label="Section title" value={home.admissions.feesTitle} onChange={(v) => setPage('admissions', { feesTitle: v })} />
            <ArrayEditor
              label="Fee cards"
              items={home.admissions.fees}
              onChange={(v) => setPage('admissions', { fees: v })}
              fields={[
                { key: 'label', label: 'Label (small gold)' },
                { key: 'amount', label: 'Amount (e.g. ₹1,25,000)' },
                { key: 'note', label: 'Note', textarea: true },
              ]}
              defaults={{ label: '', amount: '', note: '' }}
              addLabel="Add card"
              testid="adm-add-fee"
            />
          </Block>
          <Block title="Section eyebrows">
            <F label="Cohorts eyebrow" value={home.admissions.cohortsEyebrow} onChange={(v) => setPage('admissions', { cohortsEyebrow: v })} />
            <F label="Programs eyebrow" value={home.admissions.programsEyebrow} onChange={(v) => setPage('admissions', { programsEyebrow: v })} />
          </Block>
          <Block title="Final CTA band">
            <F label="CTA title (start)" value={home.admissions.cta.title} onChange={(v) => setPage('admissions', { cta: { ...home.admissions.cta, title: v } })} />
            <F label="CTA title (italic gold)" value={home.admissions.cta.titleItalic} onChange={(v) => setPage('admissions', { cta: { ...home.admissions.cta, titleItalic: v } })} />
          </Block>
        </>
      )}

      {tab === 'schedule' && (
        <>
          <Block title="Hero" accent="Top of /schedule">
            <F label="Eyebrow" value={home.schedule.hero.eyebrow} onChange={(v) => setPage('schedule', { hero: { ...home.schedule.hero, eyebrow: v } })} />
            <F label="Title" value={home.schedule.hero.title} onChange={(v) => setPage('schedule', { hero: { ...home.schedule.hero, title: v } })} />
            <F label="Title (italic gold)" value={home.schedule.hero.titleItalic} onChange={(v) => setPage('schedule', { hero: { ...home.schedule.hero, titleItalic: v } })} />
            <F label="Subtitle" textarea value={home.schedule.hero.subtitle} onChange={(v) => setPage('schedule', { hero: { ...home.schedule.hero, subtitle: v } })} />
          </Block>
          <Block title="Sidebar image">
            <ImageField label="Sidebar portrait" value={home.siteImages?.scheduleSidebar} onChange={(v) => setSiteImage('scheduleSidebar', v)} />
            <div className="grid grid-cols-2 gap-4">
              <F label="Image caption (small gold)" value={home.schedule.imageCaption.line1} onChange={(v) => setPage('schedule', { imageCaption: { ...home.schedule.imageCaption, line1: v } })} />
              <F label="Image caption (large)" value={home.schedule.imageCaption.line2} onChange={(v) => setPage('schedule', { imageCaption: { ...home.schedule.imageCaption, line2: v } })} />
            </div>
          </Block>
          <Block title="What to Expect">
            <F label="Eyebrow" value={home.schedule.expectEyebrow} onChange={(v) => setPage('schedule', { expectEyebrow: v })} />
            <ArrayEditor
              label="Items"
              items={home.schedule.expectItems}
              onChange={(v) => setPage('schedule', { expectItems: v })}
              fields={[
                { key: 'title', label: 'Title' },
                { key: 'body', label: 'Description', textarea: true },
              ]}
              defaults={{ title: '', body: '' }}
              addLabel="Add item"
              testid="sch-add-expect"
            />
          </Block>
        </>
      )}

      {tab === 'contact' && (
        <>
          <Block title="Hero" accent="Top of /contact">
            <F label="Eyebrow" value={home.contact.hero?.eyebrow} onChange={(v) => setPage('contact', { hero: { ...(home.contact.hero || {}), eyebrow: v } })} />
            <F label="Title" value={home.contact.hero?.title} onChange={(v) => setPage('contact', { hero: { ...(home.contact.hero || {}), title: v } })} />
            <F label="Subtitle (also stored as 'subtext')" textarea value={home.contact.subtext} onChange={(v) => setPage('contact', { subtext: v })} />
          </Block>
          <Block title="Sidebar image">
            <ImageField label="Sidebar portrait" value={home.siteImages?.contactSidebar} onChange={(v) => setSiteImage('contactSidebar', v)} />
          </Block>
          <Block title="Form topics" accent="Dropdown options for 'Topic' field">
            <ArrayEditor
              label="Topics"
              items={(home.contact.topics || []).map((t) => (typeof t === 'string' ? { label: t } : t))}
              onChange={(v) => setPage('contact', { topics: v.map((x) => x.label).filter(Boolean) })}
              fields={[{ key: 'label', label: 'Topic' }]}
              defaults={{ label: '' }}
              addLabel="Add topic"
              testid="con-add-topic"
            />
          </Block>
          <Block title="Contact details" accent="Email, phone, address (managed in Home Editor)">
            <p className="text-xs text-navy/55">Email, phone, WhatsApp, and address are edited in <span className="text-gold">Home Page → Contact Details</span>.</p>
          </Block>
        </>
      )}

      {tab === 'apply' && (
        <>
          <Block title="Hero" accent="Top of /apply">
            <F label="Title (line 1)" value={home.apply.hero.titleLine1} onChange={(v) => setPage('apply', { hero: { ...home.apply.hero, titleLine1: v } })} />
            <F label="Title (italic gold accent line)" value={home.apply.hero.titleItalic} onChange={(v) => setPage('apply', { hero: { ...home.apply.hero, titleItalic: v } })} />
            <F label="Subtitle" textarea value={home.apply.hero.subtitle} onChange={(v) => setPage('apply', { hero: { ...home.apply.hero, subtitle: v } })} />
          </Block>
          <Block title="Sidebar image">
            <ImageField label="Apply sidebar portrait" value={home.siteImages?.applyHero} onChange={(v) => setSiteImage('applyHero', v)} help="Defaults to home hero image if blank." />
          </Block>
          <Block title="Other labels">
            <F label="Application Deadline label" value={home.apply.deadlineLabel} onChange={(v) => setPage('apply', { deadlineLabel: v })} />
            <F label="Form section eyebrow" value={home.apply.formEyebrow} onChange={(v) => setPage('apply', { formEyebrow: v })} />
            <F label="Form title" value={home.apply.formTitle} onChange={(v) => setPage('apply', { formTitle: v })} />
            <F label="Form subtitle" textarea value={home.apply.formSubtitle} onChange={(v) => setPage('apply', { formSubtitle: v })} />
            <F label="Final CTA eyebrow" value={home.apply.finalCtaEyebrow} onChange={(v) => setPage('apply', { finalCtaEyebrow: v })} />
          </Block>
        </>
      )}

      <div className="flex justify-end pt-4">
        <button onClick={save} disabled={saving} className="btn-gold" data-testid="pages-save-btn-bottom">
          <Save size={14} /> {saving ? 'Saving…' : 'Save Changes'}
        </button>
      </div>
    </div>
  );
}
