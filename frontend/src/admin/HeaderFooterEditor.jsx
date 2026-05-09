import React, { useEffect, useState } from 'react';
import { api } from './api';
import { Save, Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import ImageField from './ImageField';

const F = ({ label, value, onChange, placeholder, type = 'text' }) => (
  <label className="block">
    <span className="fld-label">{label}</span>
    <input
      type={type}
      className="fld-input"
      value={value || ''}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
    />
  </label>
);

const Section = ({ title, expanded, onToggle, children }) => (
  <section className="bg-white border border-navy/10 mb-6 overflow-hidden">
    <button
      onClick={onToggle}
      className="w-full flex items-center justify-between p-6 hover:bg-gray-50 transition-colors"
    >
      <p className="font-caps text-[0.65rem] text-gold tracking-[0.22em]">{title}</p>
      {expanded ? <ChevronUp size={18} className="text-navy" /> : <ChevronDown size={18} className="text-navy" />}
    </button>
    {expanded && <div className="px-6 pb-6 space-y-4">{children}</div>}
  </section>
);

export default function HeaderFooterEditor() {
  const [data, setData] = useState(null);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState('');
  const [expandedSections, setExpandedSections] = useState({
    navbar: true,
    footer: true,
  });

  useEffect(() => {
    api.getHome().then((home) => {
      // Initialize with defaults if not present
      const navbar = home?.navbar || {
        logoUrl: '',
        menuItems: [
          { label: 'Faculty', link: '/faculty', type: 'link' },
          { label: 'About', link: '/about', type: 'link' },
        ],
        applyButtonText: 'Apply',
        signInButtonText: 'Sign In',
        signInUrl: 'https://moodle.org/login/index.php',
      };

      const footer = home?.footer || {};
      const programsColumn = footer.programsColumn || {
        title: 'Programs',
        links: [
          { label: 'All Programs', url: '/programs' },
        ],
      };
      const discoverColumn = footer.discoverColumn || {
        title: 'Discover',
        links: [
          { label: 'Home', url: '/' },
          { label: 'Faculty', url: '/faculty' },
          { label: 'About', url: '/about' },
        ],
      };
      const getTouchColumn = footer.getTouchColumn || {
        title: 'Get in Touch',
        links: [
          { label: 'Apply', url: '/apply' },
          { label: 'Contact', url: '/contact' },
        ],
      };

      const fullFooter = {
        programsColumn,
        discoverColumn,
        getTouchColumn,
        signInUrl: footer.signInUrl || navbar.signInUrl || 'https://moodle.org/login/index.php',
        copyright: footer.copyright || '© 2026 Epsilon Executive Education · All rights reserved',
        bottomLinks: footer.bottomLinks || [
          { label: 'Privacy', url: '/about' },
          { label: 'Terms', url: '/about' },
          { label: 'Press', url: '/contact' },
        ],
      };

      setData({ ...home, navbar, footer: fullFooter });
    });
  }, []);

  if (!data || !data.navbar || !data.footer) return <p>Loading…</p>;

  const toggleSection = (key) => {
    setExpandedSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const updateNavbar = (path, value) => {
    const navbar = JSON.parse(JSON.stringify(data.navbar));
    const keys = path.split('.');
    let cur = navbar;
    for (let i = 0; i < keys.length - 1; i++) {
      if (!cur[keys[i]]) cur[keys[i]] = {};
      cur = cur[keys[i]];
    }
    cur[keys[keys.length - 1]] = value;
    setData({ ...data, navbar });
  };

  const updateFooter = (path, value) => {
    const footer = JSON.parse(JSON.stringify(data.footer));
    const keys = path.split('.');
    let cur = footer;
    for (let i = 0; i < keys.length - 1; i++) {
      if (!cur[keys[i]]) cur[keys[i]] = {};
      cur = cur[keys[i]];
    }
    cur[keys[keys.length - 1]] = value;
    setData({ ...data, footer });
  };

  // Menu item helpers
  const addMenuItem = () => {
    const navbar = JSON.parse(JSON.stringify(data.navbar));
    navbar.menuItems.push({ label: 'New Link', link: '/', type: 'link' });
    setData({ ...data, navbar });
  };

  const removeMenuItem = (i) => {
    const navbar = JSON.parse(JSON.stringify(data.navbar));
    navbar.menuItems.splice(i, 1);
    setData({ ...data, navbar });
  };

  const updateMenuItem = (i, key, value) => {
    const navbar = JSON.parse(JSON.stringify(data.navbar));
    navbar.menuItems[i][key] = value;
    setData({ ...data, navbar });
  };

  // Footer link helpers
  const addFooterLink = (column) => {
    const footer = JSON.parse(JSON.stringify(data.footer));
    footer[column].links.push({ label: 'New Link', url: '/' });
    setData({ ...data, footer });
  };

  const removeFooterLink = (column, i) => {
    const footer = JSON.parse(JSON.stringify(data.footer));
    footer[column].links.splice(i, 1);
    setData({ ...data, footer });
  };

  const updateFooterLink = (column, i, key, value) => {
    const footer = JSON.parse(JSON.stringify(data.footer));
    footer[column].links[i][key] = value;
    setData({ ...data, footer });
  };

  // Bottom links helpers
  const addBottomLink = () => {
    const footer = JSON.parse(JSON.stringify(data.footer));
    footer.bottomLinks.push({ label: 'New Link', url: '/' });
    setData({ ...data, footer });
  };

  const removeBottomLink = (i) => {
    const footer = JSON.parse(JSON.stringify(data.footer));
    footer.bottomLinks.splice(i, 1);
    setData({ ...data, footer });
  };

  const updateBottomLink = (i, key, value) => {
    const footer = JSON.parse(JSON.stringify(data.footer));
    footer.bottomLinks[i][key] = value;
    setData({ ...data, footer });
  };

  const save = async () => {
    setSaving(true);
    try {
      await api.putHome(data);
      setToast('✓ Header & Footer saved');
      setTimeout(() => setToast(''), 2500);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-3xl text-navy">Header & Footer Settings</h1>
        <button onClick={save} disabled={saving} className="btn-gold flex items-center gap-2">
          <Save size={16} /> {saving ? 'Saving…' : 'Save Changes'}
        </button>
      </div>

      {toast && (
        <div className="mb-4 p-4 bg-green-50 border border-green-200 text-green-800 font-sans text-sm">
          {toast}
        </div>
      )}

      {/* ========== NAVBAR ========== */}
      <Section
        title="Header / Navigation Bar"
        expanded={expandedSections.navbar}
        onToggle={() => toggleSection('navbar')}
      >
        <ImageField
          label="Logo URL"
          value={data.navbar.logoUrl}
          onChange={(url) => updateNavbar('logoUrl', url)}
          helpText="Upload or paste URL for the navbar logo"
        />

        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="fld-label">Menu Items (non-Programs links)</span>
            <button onClick={addMenuItem} className="btn-outline-sm flex items-center gap-1">
              <Plus size={14} /> Add Item
            </button>
          </div>
          <p className="text-xs text-gray-600 mb-3">
            The "Programs" dropdown is auto-generated from your programs. Add other top-level links here.
          </p>
          {data.navbar.menuItems.map((item, i) => (
            <div key={i} className="border border-gray-200 p-4 mb-3 bg-gray-50">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex-1 grid grid-cols-2 gap-3">
                  <F label="Label" value={item.label} onChange={(v) => updateMenuItem(i, 'label', v)} placeholder="e.g., Faculty" />
                  <F label="Link" value={item.link} onChange={(v) => updateMenuItem(i, 'link', v)} placeholder="e.g., /faculty" />
                </div>
                <button onClick={() => removeMenuItem(i)} className="text-red-600 hover:text-red-800 mt-6">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <F
            label="Apply Button Text"
            value={data.navbar.applyButtonText}
            onChange={(v) => updateNavbar('applyButtonText', v)}
            placeholder="Apply"
          />
          <F
            label="Sign In Button Text"
            value={data.navbar.signInButtonText}
            onChange={(v) => updateNavbar('signInButtonText', v)}
            placeholder="Sign In"
          />
        </div>

        <F
          label="Sign In URL"
          value={data.navbar.signInUrl}
          onChange={(v) => updateNavbar('signInUrl', v)}
          placeholder="https://moodle.org/login/index.php"
        />
      </Section>

      {/* ========== FOOTER ========== */}
      <Section
        title="Footer Columns & Links"
        expanded={expandedSections.footer}
        onToggle={() => toggleSection('footer')}
      >
        {/* Column 1: Programs */}
        <div className="border border-gray-200 p-4 bg-blue-50">
          <F
            label="Column 1 Title"
            value={data.footer.programsColumn.title}
            onChange={(v) => updateFooter('programsColumn.title', v)}
            placeholder="Programs"
          />
          <p className="text-xs text-gray-600 mt-2 mb-3">
            "All Programs" link + dynamic program list are auto-generated. Add extra links below if needed.
          </p>
          <div className="flex items-center justify-between mb-2">
            <span className="fld-label text-xs">Extra Links</span>
            <button onClick={() => addFooterLink('programsColumn')} className="btn-outline-sm flex items-center gap-1">
              <Plus size={12} /> Add
            </button>
          </div>
          {data.footer.programsColumn.links.map((link, i) => (
            <div key={i} className="flex items-center gap-2 mb-2">
              <input
                type="text"
                className="fld-input flex-1"
                value={link.label}
                onChange={(e) => updateFooterLink('programsColumn', i, 'label', e.target.value)}
                placeholder="Label"
              />
              <input
                type="text"
                className="fld-input flex-1"
                value={link.url}
                onChange={(e) => updateFooterLink('programsColumn', i, 'url', e.target.value)}
                placeholder="URL"
              />
              <button onClick={() => removeFooterLink('programsColumn', i)} className="text-red-600">
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>

        {/* Column 2: Discover */}
        <div className="border border-gray-200 p-4 bg-green-50">
          <F
            label="Column 2 Title"
            value={data.footer.discoverColumn.title}
            onChange={(v) => updateFooter('discoverColumn.title', v)}
            placeholder="Discover"
          />
          <div className="flex items-center justify-between mb-2 mt-3">
            <span className="fld-label text-xs">Links</span>
            <button onClick={() => addFooterLink('discoverColumn')} className="btn-outline-sm flex items-center gap-1">
              <Plus size={12} /> Add
            </button>
          </div>
          {data.footer.discoverColumn.links.map((link, i) => (
            <div key={i} className="flex items-center gap-2 mb-2">
              <input
                type="text"
                className="fld-input flex-1"
                value={link.label}
                onChange={(e) => updateFooterLink('discoverColumn', i, 'label', e.target.value)}
                placeholder="Label"
              />
              <input
                type="text"
                className="fld-input flex-1"
                value={link.url}
                onChange={(e) => updateFooterLink('discoverColumn', i, 'url', e.target.value)}
                placeholder="URL"
              />
              <button onClick={() => removeFooterLink('discoverColumn', i)} className="text-red-600">
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>

        {/* Column 3: Get in Touch */}
        <div className="border border-gray-200 p-4 bg-purple-50">
          <F
            label="Column 3 Title"
            value={data.footer.getTouchColumn.title}
            onChange={(v) => updateFooter('getTouchColumn.title', v)}
            placeholder="Get in Touch"
          />
          <div className="flex items-center justify-between mb-2 mt-3">
            <span className="fld-label text-xs">Links</span>
            <button onClick={() => addFooterLink('getTouchColumn')} className="btn-outline-sm flex items-center gap-1">
              <Plus size={12} /> Add
            </button>
          </div>
          {data.footer.getTouchColumn.links.map((link, i) => (
            <div key={i} className="flex items-center gap-2 mb-2">
              <input
                type="text"
                className="fld-input flex-1"
                value={link.label}
                onChange={(e) => updateFooterLink('getTouchColumn', i, 'label', e.target.value)}
                placeholder="Label"
              />
              <input
                type="text"
                className="fld-input flex-1"
                value={link.url}
                onChange={(e) => updateFooterLink('getTouchColumn', i, 'url', e.target.value)}
                placeholder="URL"
              />
              <button onClick={() => removeFooterLink('getTouchColumn', i)} className="text-red-600">
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>

        {/* Column 4: Reach Us */}
        <div className="border border-gray-200 p-4 bg-yellow-50">
          <p className="fld-label mb-2">Column 4: Reach Us</p>
          <p className="text-xs text-gray-600">
            This column pulls email, phone, and address from the Contact section (Home Editor → Contact).
          </p>
        </div>

        <F
          label="Footer Sign In URL"
          value={data.footer.signInUrl}
          onChange={(v) => updateFooter('signInUrl', v)}
          placeholder="https://moodle.org/login/index.php"
        />

        <F
          label="Copyright Text"
          value={data.footer.copyright}
          onChange={(v) => updateFooter('copyright', v)}
          placeholder="© 2026 Epsilon Executive Education · All rights reserved"
        />

        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="fld-label">Bottom Bar Links</span>
            <button onClick={addBottomLink} className="btn-outline-sm flex items-center gap-1">
              <Plus size={12} /> Add Link
            </button>
          </div>
          {data.footer.bottomLinks.map((link, i) => (
            <div key={i} className="flex items-center gap-2 mb-2">
              <input
                type="text"
                className="fld-input flex-1"
                value={link.label}
                onChange={(e) => updateBottomLink(i, 'label', e.target.value)}
                placeholder="Label"
              />
              <input
                type="text"
                className="fld-input flex-1"
                value={link.url}
                onChange={(e) => updateBottomLink(i, 'url', e.target.value)}
                placeholder="URL"
              />
              <button onClick={() => removeBottomLink(i)} className="text-red-600">
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
      </Section>

      <div className="flex justify-end">
        <button onClick={save} disabled={saving} className="btn-gold flex items-center gap-2">
          <Save size={16} /> {saving ? 'Saving…' : 'Save All Changes'}
        </button>
      </div>
    </div>
  );
}
