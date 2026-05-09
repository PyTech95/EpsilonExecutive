import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSiteContent } from '../context/SiteContent';

const DEFAULTS = {
  title: 'Epsilon Executive Education',
  description:
    'Epsilon Executive Education — turning technical fluency into strategic value. Live online cohorts for senior professionals.',
  keywords:
    'executive education, AI, machine learning, leadership, online cohort, Epsilon',
};

function setMeta(name, content, attr = 'name') {
  if (content === undefined || content === null || content === '') return;
  let tag = document.querySelector(`meta[${attr}="${name}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attr, name);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
}

/**
 * Per-route SEO injector.
 * Looks up `home.seo[pathname]` from site content, falls back to defaults.
 */
export default function SEOHead() {
  const { pathname } = useLocation();
  const ctx = useSiteContent();
  const seoMap = ctx?.home?.seo || {};

  // Try exact path, then trimmed (no trailing slash), then defaults from `home.seo._default`.
  const cfg =
    seoMap[pathname] ||
    seoMap[pathname.replace(/\/$/, '')] ||
    seoMap._default ||
    {};

  const title = cfg.title || DEFAULTS.title;
  const description = cfg.description || DEFAULTS.description;
  const keywords = cfg.keywords || DEFAULTS.keywords;

  useEffect(() => {
    document.title = title;
    setMeta('description', description);
    setMeta('keywords', keywords);
    setMeta('og:title', title, 'property');
    setMeta('og:description', description, 'property');
    setMeta('twitter:title', title);
    setMeta('twitter:description', description);
  }, [title, description, keywords]);

  return null;
}
