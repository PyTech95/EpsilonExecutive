import React, { useEffect, useMemo, useState } from 'react';
import { api } from './api';
import { Save, ChevronDown, ChevronUp, Search } from 'lucide-react';
import ImageField from './ImageField';

const STATIC_PAGES = [
  { path: '/', label: 'Home' },
  { path: '/programs', label: 'Programs (list)' },
  { path: '/faculty', label: 'Faculty' },
  { path: '/about', label: 'About' },
  { path: '/admissions', label: 'Admissions' },
  { path: '/schedule', label: 'Schedule' },
  { path: '/contact', label: 'Contact' },
  { path: '/apply', label: 'Apply' },
  { path: '/corporate', label: 'Corporate' },
  { path: '/insights', label: 'Insights (list)' },
  { path: '/events', label: 'Events' },
];

function PageRow({ page, value, onChange, expanded, onToggle }) {
  const v = value || {};
  return (
    <section className="bg-white border border-navy/10 mb-4 overflow-hidden">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between p-5 hover:bg-gray-50 transition-colors text-left"
        data-testid={`seo-row-${page.path}`}
      >
        <div className="flex-1 min-w-0">
          <p className="font-caps text-[0.62rem] text-gold tracking-[0.22em]">{page.label}</p>
          <p className="font-mono text-[0.78rem] text-navy/60 mt-0.5 truncate">
            {page.path}
          </p>
          {v.title && (
            <p className="font-sans text-[0.85rem] text-navy/80 mt-1 truncate">
              <span className="text-navy/50">Title:</span> {v.title}
            </p>
          )}
        </div>
        {expanded ? (
          <ChevronUp size={18} className="text-navy flex-shrink-0 ml-3" />
        ) : (
          <ChevronDown size={18} className="text-navy flex-shrink-0 ml-3" />
        )}
      </button>

      {expanded && (
        <div className="px-5 pb-5 space-y-4 border-t border-navy/5">
          <label className="block">
            <span className="fld-label flex items-center justify-between">
              <span>SEO Title</span>
              <span className="text-[0.65rem] text-navy/50 font-normal normal-case tracking-normal">
                {(v.title || '').length}/60 chars
              </span>
            </span>
            <input
              type="text"
              className="fld-input"
              placeholder="e.g. Applied AI & Machine Learning — Epsilon Executive Education"
              value={v.title || ''}
              onChange={(e) => onChange({ ...v, title: e.target.value })}
              data-testid={`seo-title-${page.path}`}
            />
          </label>

          <label className="block">
            <span className="fld-label flex items-center justify-between">
              <span>Meta Description</span>
              <span className="text-[0.65rem] text-navy/50 font-normal normal-case tracking-normal">
                {(v.description || '').length}/160 chars
              </span>
            </span>
            <textarea
              rows={3}
              className="fld-input"
              placeholder="A 1-2 sentence summary that appears under your title in Google results."
              value={v.description || ''}
              onChange={(e) => onChange({ ...v, description: e.target.value })}
              data-testid={`seo-desc-${page.path}`}
            />
          </label>

          <label className="block">
            <span className="fld-label">Keywords (comma-separated)</span>
            <input
              type="text"
              className="fld-input"
              placeholder="executive education, applied AI, machine learning, leadership"
              value={v.keywords || ''}
              onChange={(e) => onChange({ ...v, keywords: e.target.value })}
              data-testid={`seo-keywords-${page.path}`}
            />
          </label>

          <div>
            <span className="fld-label flex items-center justify-between">
              <span>Share Image (og:image)</span>
              <span className="text-[0.65rem] text-navy/50 font-normal normal-case tracking-normal">
                Shown when your page is shared on social media · 1200×630 recommended
              </span>
            </span>
            <ImageField
              value={v.image || ''}
              onChange={(url) => onChange({ ...v, image: url })}
              help="Used as og:image / twitter:image when this page is shared."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-navy/5">
            <label className="block">
              <span className="fld-label">Canonical URL</span>
              <input
                type="text"
                className="fld-input"
                placeholder="Leave blank to auto-generate from this page's URL"
                value={v.canonical || ''}
                onChange={(e) => onChange({ ...v, canonical: e.target.value })}
                data-testid={`seo-canonical-${page.path}`}
              />
            </label>
            <label className="block">
              <span className="fld-label">Robots Directive</span>
              <select
                className="fld-input"
                value={v.robots || ''}
                onChange={(e) => onChange({ ...v, robots: e.target.value })}
                data-testid={`seo-robots-${page.path}`}
              >
                <option value="">Default (inherit)</option>
                <option value="index, follow">index, follow (default — page is indexed)</option>
                <option value="noindex, follow">noindex, follow (hide from search; links still followed)</option>
                <option value="noindex, nofollow">noindex, nofollow (fully hidden)</option>
                <option value="index, nofollow">index, nofollow</option>
              </select>
            </label>
          </div>
        </div>
      )}
    </section>
  );
}

export default function SEOEditor() {
  const [data, setData] = useState(null);
  const [programs, setPrograms] = useState([]);
  const [insights, setInsights] = useState([]);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState('');
  const [filter, setFilter] = useState('');
  const [expanded, setExpanded] = useState({});

  useEffect(() => {
    Promise.all([
      api.getHome(),
      api.list('programs').catch(() => []),
      api.list('insights').catch(() => []),
    ]).then(([home, progs, ins]) => {
      setData(home || {});
      setPrograms(progs || []);
      setInsights(ins || []);
    });
  }, []);

  const allPages = useMemo(() => {
    const programPages = programs
      .filter((p) => p.slug)
      .map((p) => ({
        path: `/programs/${p.slug}`,
        label: `Program · ${p.title || p.subtitle || p.slug}`,
      }));
    const insightPages = insights
      .filter((i) => i.slug)
      .map((i) => ({
        path: `/insights/${i.slug}`,
        label: `Insight · ${i.title || i.slug}`,
      }));
    return [...STATIC_PAGES, ...programPages, ...insightPages];
  }, [programs, insights]);

  const filteredPages = useMemo(() => {
    if (!filter) return allPages;
    const q = filter.toLowerCase();
    return allPages.filter(
      (p) => p.path.toLowerCase().includes(q) || p.label.toLowerCase().includes(q),
    );
  }, [allPages, filter]);

  if (!data) return <p>Loading…</p>;

  const seo = data.seo || {};

  const updatePage = (path, value) => {
    const nextSeo = { ...seo, [path]: value };
    setData({ ...data, seo: nextSeo });
  };

  const save = async () => {
    setSaving(true);
    try {
      await api.putHome(data);
      setToast('✓ SEO settings saved across all pages');
      setTimeout(() => setToast(''), 2500);
    } finally {
      setSaving(false);
    }
  };

  const expandAll = () => {
    const next = {};
    filteredPages.forEach((p) => { next[p.path] = true; });
    setExpanded(next);
  };
  const collapseAll = () => setExpanded({});

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <h1 className="font-display text-3xl text-navy">SEO &amp; Meta Tags</h1>
        <button
          onClick={save}
          disabled={saving}
          className="btn-gold flex items-center gap-2"
          data-testid="seo-save-btn"
        >
          <Save size={16} /> {saving ? 'Saving…' : 'Save All'}
        </button>
      </div>
      <p className="text-sm text-navy/65 mb-6">
        Edit the <strong>title</strong>, <strong>meta description</strong>, and{' '}
        <strong>keywords</strong> shown to search engines for every page on your site.
        Changes go live immediately after saving.
      </p>

      {toast && (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-800 text-sm">
          {toast}
        </div>
      )}

      {/* Tracking & Verification — site-wide */}
      <section className="bg-white border border-navy/10 mb-6 p-5">
        <p className="font-caps text-[0.62rem] text-gold tracking-[0.22em] mb-1">Tracking &amp; Verification</p>
        <p className="font-display text-navy text-[1.15rem] mb-4">Google Analytics, Search Console & custom head scripts</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="block">
            <span className="fld-label">Google Analytics 4 — Measurement ID</span>
            <input
              type="text"
              className="fld-input font-mono"
              placeholder="G-XXXXXXXXXX"
              value={data?.tracking?.gaMeasurementId || ''}
              onChange={(e) => setData({ ...data, tracking: { ...(data?.tracking || {}), gaMeasurementId: e.target.value.trim() } })}
              data-testid="seo-ga-id"
            />
            <span className="block text-xs text-navy/55 mt-1">
              Get it from Google Analytics → Admin → Data Streams → your site → Measurement ID.
            </span>
          </label>

          <label className="block">
            <span className="fld-label">Google Search Console — Verification Content</span>
            <input
              type="text"
              className="fld-input font-mono"
              placeholder="paste the content= value here"
              value={data?.tracking?.gscVerification || ''}
              onChange={(e) => setData({ ...data, tracking: { ...(data?.tracking || {}), gscVerification: e.target.value.trim() } })}
              data-testid="seo-gsc-token"
            />
            <span className="block text-xs text-navy/55 mt-1">
              From Search Console → Settings → Ownership verification → HTML tag. Paste just the <code>content=&quot;...&quot;</code> value.
            </span>
          </label>

          <label className="block">
            <span className="fld-label">Site Origin (canonical base)</span>
            <input
              type="text"
              className="fld-input font-mono"
              placeholder="https://epsilonexec.com"
              value={data?.tracking?.siteOrigin || ''}
              onChange={(e) => setData({ ...data, tracking: { ...(data?.tracking || {}), siteOrigin: e.target.value.trim() } })}
              data-testid="seo-site-origin"
            />
            <span className="block text-xs text-navy/55 mt-1">
              Used to build canonical URLs and sitemap. Leave blank to auto-detect from the browser.
            </span>
          </label>

          <label className="block">
            <span className="fld-label">Default Robots Directive</span>
            <select
              className="fld-input"
              value={data?.tracking?.defaultRobots || 'index, follow'}
              onChange={(e) => setData({ ...data, tracking: { ...(data?.tracking || {}), defaultRobots: e.target.value } })}
              data-testid="seo-default-robots"
            >
              <option value="index, follow">index, follow (recommended)</option>
              <option value="noindex, follow">noindex, follow (hide all pages)</option>
              <option value="noindex, nofollow">noindex, nofollow (fully hidden)</option>
            </select>
            <span className="block text-xs text-navy/55 mt-1">
              Applied to every page unless overridden per-page below.
            </span>
          </label>
        </div>

        <label className="block mt-4">
          <span className="fld-label">Custom &lt;head&gt; HTML (Pixel, Hotjar, GTM, etc.)</span>
          <textarea
            rows={5}
            className="fld-input font-mono text-[0.85rem]"
            placeholder='<!-- e.g. Meta Pixel -->\n<script>!function(f,b,e,v,n,t,s){...}</script>'
            value={data?.tracking?.headHtml || ''}
            onChange={(e) => setData({ ...data, tracking: { ...(data?.tracking || {}), headHtml: e.target.value } })}
            data-testid="seo-head-html"
          />
          <span className="block text-xs text-navy/55 mt-1">
            Pasted as-is into &lt;head&gt;. Inline &lt;script&gt; tags are executed. Use carefully — broken HTML can break the site.
          </span>
        </label>
      </section>

      <div className="flex items-center gap-3 mb-5">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-navy/40" />
          <input
            type="text"
            placeholder="Filter by page name or path…"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="fld-input pl-10"
            data-testid="seo-filter-input"
          />
        </div>
        <button onClick={expandAll} className="btn-outline-sm" data-testid="seo-expand-all">
          Expand all
        </button>
        <button onClick={collapseAll} className="btn-outline-sm" data-testid="seo-collapse-all">
          Collapse all
        </button>
      </div>

      {/* Default fallback config */}
      <PageRow
        page={{ path: '_default', label: 'Default (used when a page has no override)' }}
        value={seo._default}
        onChange={(v) => updatePage('_default', v)}
        expanded={!!expanded._default}
        onToggle={() => setExpanded((e) => ({ ...e, _default: !e._default }))}
      />

      {filteredPages.map((p) => (
        <PageRow
          key={p.path}
          page={p}
          value={seo[p.path]}
          onChange={(v) => updatePage(p.path, v)}
          expanded={!!expanded[p.path]}
          onToggle={() => setExpanded((e) => ({ ...e, [p.path]: !e[p.path] }))}
        />
      ))}

      {filteredPages.length === 0 && (
        <p className="text-center py-8 text-navy/60">No pages match "{filter}".</p>
      )}

      <div className="flex justify-end mt-6">
        <button onClick={save} disabled={saving} className="btn-gold flex items-center gap-2">
          <Save size={16} /> {saving ? 'Saving…' : 'Save All Changes'}
        </button>
      </div>
    </div>
  );
}
