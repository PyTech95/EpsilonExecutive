import React, { useEffect, useState } from 'react';
import { api } from './api';
import { Save, Plus, Trash2 } from 'lucide-react';
import ImageField from './ImageField';

const F = ({ label, value, onChange, textarea, type = 'text' }) => (
  <label className="block">
    <span className="fld-label">{label}</span>
    {textarea ? (
      <textarea rows={3} className="fld-input" value={value || ''} onChange={(e) => onChange(e.target.value)} />
    ) : (
      <input type={type} className="fld-input" value={value || ''} onChange={(e) => onChange(e.target.value)} />
    )}
  </label>
);

const Section = ({ title, children }) => (
  <section className="bg-white p-6 md:p-8 border border-navy/10 mb-6">
    <p className="font-caps text-[0.65rem] text-gold tracking-[0.22em] mb-4">{title}</p>
    <div className="space-y-4">{children}</div>
  </section>
);

export default function HomeEditor() {
  const [data, setData] = useState(null);
  const [beliefs, setBeliefs] = useState([]);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState('');

  useEffect(() => {
    api.getHome().then(setData);
    api.getBeliefs().then(setBeliefs);
  }, []);

  if (!data) return <p>Loading…</p>;

  const update = (path, value) => {
    const d = JSON.parse(JSON.stringify(data));
    const keys = path.split('.');
    let cur = d;
    for (let i = 0; i < keys.length - 1; i++) cur = cur[keys[i]];
    cur[keys[keys.length - 1]] = value;
    setData(d);
  };

  const updateStat = (i, key, value) => {
    const d = JSON.parse(JSON.stringify(data));
    d.hero.stats[i][key] = value;
    setData(d);
  };

  const addStat = () => {
    const d = JSON.parse(JSON.stringify(data));
    d.hero.stats.push({ value: '', label: '' });
    setData(d);
  };
  const removeStat = (i) => {
    const d = JSON.parse(JSON.stringify(data));
    d.hero.stats.splice(i, 1);
    setData(d);
  };

  const updateBelief = (i, key, value) => {
    const copy = [...beliefs];
    copy[i] = { ...copy[i], [key]: value };
    setBeliefs(copy);
  };

  const save = async () => {
    setSaving(true);
    try {
      await api.putHome(data);
      await api.putBeliefs(beliefs);
      setToast('Saved');
      setTimeout(() => setToast(''), 2000);
    } finally { setSaving(false); }
  };

  return (
    <div>
      <div className="flex items-center justify-between sticky top-0 bg-cream py-3 -mx-8 px-8 z-10">
        <h1 className="font-display text-navy text-[2rem]">Home Page Content</h1>
        <button onClick={save} disabled={saving} className="btn-gold">
          <Save size={14} /> {saving ? 'Saving…' : 'Save Changes'}
        </button>
      </div>
      {toast && <p className="text-green-700 text-sm my-2">{toast}</p>}

      <Section title="Hero">
        <F label="Eyebrow" value={data.hero.eyebrow} onChange={(v) => update('hero.eyebrow', v)} />
        <F label="Title Line 1" value={data.hero.titleLine1} onChange={(v) => update('hero.titleLine1', v)} />
        <F label="Title Line 2 (italic gold)" value={data.hero.titleLine2} onChange={(v) => update('hero.titleLine2', v)} />
        <F label="Subtitle" textarea value={data.hero.subtitle} onChange={(v) => update('hero.subtitle', v)} />
        <div className="grid grid-cols-2 gap-4">
          <F label="Primary CTA text" value={data.hero.primaryCtaText} onChange={(v) => update('hero.primaryCtaText', v)} />
          <F label="Primary CTA href" value={data.hero.primaryCtaHref} onChange={(v) => update('hero.primaryCtaHref', v)} />
          <F label="Secondary CTA text" value={data.hero.secondaryCtaText} onChange={(v) => update('hero.secondaryCtaText', v)} />
          <F label="Secondary CTA href" value={data.hero.secondaryCtaHref} onChange={(v) => update('hero.secondaryCtaHref', v)} />
        </div>
        <ImageField label="Hero background image" value={data.hero.heroImage} onChange={(v) => update('hero.heroImage', v)} />

        <div>
          <p className="font-caps text-[0.65rem] text-gold tracking-[0.22em] mt-6 mb-3">Hero Stats</p>
          {data.hero.stats.map((s, i) => (
            <div key={i} className="grid grid-cols-[1fr_1fr_auto] gap-3 items-end mb-3">
              <F label="Value" value={s.value} onChange={(v) => updateStat(i, 'value', v)} />
              <F label="Label" value={s.label} onChange={(v) => updateStat(i, 'label', v)} />
              <button onClick={() => removeStat(i)} className="p-2.5 border border-navy/20 text-navy hover:border-red-400 hover:text-red-500"><Trash2 size={14} /></button>
            </div>
          ))}
          <button onClick={addStat} className="btn-outline-gold border-navy/30 text-navy"><Plus size={14} /> Add stat</button>
        </div>
      </Section>

      <Section title="Brochure Section">
        <F label="Eyebrow" value={data.brochure?.eyebrow} onChange={(v) => update('brochure.eyebrow', v)} />
        <F label="Title" value={data.brochure?.title} onChange={(v) => update('brochure.title', v)} />
        <F label="Description" textarea value={data.brochure?.description} onChange={(v) => update('brochure.description', v)} />
        <F label="PDF URL" value={data.brochure?.pdfUrl} onChange={(v) => update('brochure.pdfUrl', v)} />
      </Section>

      <Section title="About / Philosophy">
        <F label="Eyebrow" value={data.about?.eyebrow} onChange={(v) => update('about.eyebrow', v)} />
        <F label="Title" value={data.about?.title} onChange={(v) => update('about.title', v)} />
        <F label="Paragraph 1" textarea value={data.about?.paragraph1} onChange={(v) => update('about.paragraph1', v)} />
        <F label="Paragraph 2" textarea value={data.about?.paragraph2} onChange={(v) => update('about.paragraph2', v)} />
      </Section>

      <Section title="What we believe (3 cards)">
        {beliefs.map((b, i) => (
          <div key={b._id || i} className="grid grid-cols-[70px_1fr] gap-3 mb-4">
            <F label="#" value={b.n} onChange={(v) => updateBelief(i, 'n', v)} />
            <div className="space-y-3">
              <F label="Title" value={b.title} onChange={(v) => updateBelief(i, 'title', v)} />
              <F label="Body" textarea value={b.body} onChange={(v) => updateBelief(i, 'body', v)} />
            </div>
          </div>
        ))}
      </Section>

      <Section title="Final CTA band">
        <F label="Eyebrow" value={data.cta?.eyebrow} onChange={(v) => update('cta.eyebrow', v)} />
        <F label="Title" value={data.cta?.title} onChange={(v) => update('cta.title', v)} />
        <F label="Subtitle" textarea value={data.cta?.subtitle} onChange={(v) => update('cta.subtitle', v)} />
      </Section>

      <Section title="Contact Details (used across the site)">
        <F label="Email" value={data.contact?.email} onChange={(v) => update('contact.email', v)} />
        <F label="Phone" value={data.contact?.phone} onChange={(v) => update('contact.phone', v)} />
        <F label="WhatsApp number (with country code, e.g. +919876543210)" value={data.contact?.whatsapp} onChange={(v) => update('contact.whatsapp', v)} />
        <F label="Address / Location" value={data.contact?.address} onChange={(v) => update('contact.address', v)} />
        <F label="Contact page subtext" textarea value={data.contact?.subtext} onChange={(v) => update('contact.subtext', v)} />
      </Section>

      <Section title="Footer">
        <F label="Tagline" textarea value={data.footer?.tagline} onChange={(v) => update('footer.tagline', v)} />
        <F label="Copyright line" value={data.footer?.copyright} onChange={(v) => update('footer.copyright', v)} />
        <F label="Subscribe heading" value={data.footer?.subscribeHeading} onChange={(v) => update('footer.subscribeHeading', v)} />
        <F label="Sign-in URL (Moodle)" value={data.footer?.signInUrl} onChange={(v) => update('footer.signInUrl', v)} />
      </Section>

      <Section title="Section Headers (home page)">
        <F label="Flagship program eyebrow" value={data.sections?.flagshipEyebrow} onChange={(v) => update('sections.flagshipEyebrow', v)} />
        <F label="Testimonials eyebrow" value={data.sections?.testimonialsEyebrow} onChange={(v) => update('sections.testimonialsEyebrow', v)} />
        <F label="Testimonials title" value={data.sections?.testimonialsTitle} onChange={(v) => update('sections.testimonialsTitle', v)} />
        <F label="Admissions eyebrow" value={data.sections?.admissionsEyebrow} onChange={(v) => update('sections.admissionsEyebrow', v)} />
        <F label="Admissions title" value={data.sections?.admissionsTitle} onChange={(v) => update('sections.admissionsTitle', v)} />
        <F label="Admissions subtitle" textarea value={data.sections?.admissionsSubtitle} onChange={(v) => update('sections.admissionsSubtitle', v)} />
      </Section>

      <Section title="Corporate Education Page">
        <p className="text-sm text-navy/70">
          The Corporate page now has its own dedicated editor with full support for
          Why-cards, Audiences, hero image, and CTA copy.
        </p>
        <a href="/admin/corporate" className="btn-outline-gold border-navy/30 text-navy inline-flex" data-testid="home-go-corporate-editor">
          Open Corporate Editor →
        </a>
      </Section>

      <Section title="Site">
        <ImageField label="Logo" value={data.logoUrl} onChange={(v) => update('logoUrl', v)} help="Recommended: PNG with transparent background." />
        <ImageField
          label="Favicon / Browser Tab Icon"
          value={data.faviconUrl}
          onChange={(v) => update('faviconUrl', v)}
          help="Square PNG (e.g. 512×512). Shown in browser tabs and bookmarks. Updates live across the site."
        />
      </Section>

      <Section title="Section Images (across the site)">
        <p className="text-xs text-navy/60 -mt-2 mb-4">
          Upload a new photo or paste a URL. Each image controls a specific block on the public site. Leave blank to use the default.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ImageField
            label="About — Philosophy block"
            value={data.siteImages?.aboutPhilosophy}
            onChange={(v) => update('siteImages.aboutPhilosophy', v)}
            help="Shown on /about beside 'Turning technical fluency into strategic value.'"
          />
          <ImageField
            label="Admissions — Process block"
            value={data.siteImages?.admissionsProcess}
            onChange={(v) => update('siteImages.admissionsProcess', v)}
            help="Sticky portrait on /admissions next to the four-step process."
          />
          <ImageField
            label="Schedule — Sidebar"
            value={data.siteImages?.scheduleSidebar}
            onChange={(v) => update('siteImages.scheduleSidebar', v)}
            help="Sidebar portrait on /schedule above 'What to Expect'."
          />
          <ImageField
            label="Contact — Sidebar"
            value={data.siteImages?.contactSidebar}
            onChange={(v) => update('siteImages.contactSidebar', v)}
            help="Portrait above the email/phone/where info on /contact."
          />
          <ImageField
            label="Apply — Sidebar"
            value={data.siteImages?.applyHero}
            onChange={(v) => update('siteImages.applyHero', v)}
            help="Portrait beside the Apply form. Defaults to the home hero image if blank."
          />
          <ImageField
            label="Corporate — Hero"
            value={data.siteImages?.corporateHero}
            onChange={(v) => update('siteImages.corporateHero', v)}
            help="Optional banner image for /corporate. Leave blank for the default dark hero."
          />
        </div>
      </Section>

      <div className="flex justify-end">
        <button onClick={save} disabled={saving} className="btn-gold">
          <Save size={14} /> {saving ? 'Saving…' : 'Save Changes'}
        </button>
      </div>
    </div>
  );
}
