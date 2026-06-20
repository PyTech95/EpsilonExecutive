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

/* ---------- DOM helpers ---------- */
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

function setLink(rel, href) {
  if (!href) return;
  let tag = document.querySelector(`link[rel="${rel}"]`);
  if (!tag) {
    tag = document.createElement('link');
    tag.setAttribute('rel', rel);
    document.head.appendChild(tag);
  }
  tag.setAttribute('href', href);
}

function setJsonLd(id, data) {
  if (!data) return;
  let tag = document.getElementById(id);
  if (!tag) {
    tag = document.createElement('script');
    tag.type = 'application/ld+json';
    tag.id = id;
    document.head.appendChild(tag);
  }
  tag.textContent = JSON.stringify(data);
}

// Inject Google Analytics 4 (gtag.js) once — keyed by measurement ID
function injectGA(measurementId) {
  if (!measurementId || typeof window === 'undefined') return;
  if (window.__gaInjected === measurementId) {
    if (window.gtag) window.gtag('config', measurementId, { page_path: window.location.pathname });
    return;
  }
  window.__gaInjected = measurementId;
  const loader = document.createElement('script');
  loader.async = true;
  loader.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(loader);
  const inline = document.createElement('script');
  inline.id = 'ga-init';
  inline.textContent = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','${measurementId}');`;
  document.head.appendChild(inline);
}

// Inject custom raw HTML into <head> (for FB Pixel, Hotjar, GTM, etc.) — once
function injectHeadHtml(html) {
  if (!html || typeof window === 'undefined') return;
  if (document.getElementById('custom-head-scripts')) return; // only once per session
  const wrapper = document.createElement('div');
  wrapper.id = 'custom-head-scripts';
  wrapper.style.display = 'none';
  wrapper.innerHTML = html;
  // Promote inline scripts so they actually execute
  wrapper.querySelectorAll('script').forEach((oldS) => {
    const s = document.createElement('script');
    [...oldS.attributes].forEach((a) => s.setAttribute(a.name, a.value));
    s.text = oldS.text;
    document.head.appendChild(s);
  });
  // Append non-script nodes (meta, link, noscript) too
  wrapper.querySelectorAll('meta, link, noscript').forEach((el) => document.head.appendChild(el));
}

/**
 * Per-route SEO + site-wide tracking injector.
 */
export default function SEOHead() {
  const { pathname } = useLocation();
  const ctx = useSiteContent();
  const seoMap = ctx?.home?.seo || {};
  const tracking = ctx?.home?.tracking || {};
  const home = ctx?.home || {};

  const cfg =
    seoMap[pathname] ||
    seoMap[pathname.replace(/\/$/, '')] ||
    seoMap._default ||
    {};

  const title = cfg.title || DEFAULTS.title;
  const description = cfg.description || DEFAULTS.description;
  const keywords = cfg.keywords || DEFAULTS.keywords;
  const ogImage = cfg.image || seoMap._default?.image || '';
  const robots = cfg.robots || tracking.defaultRobots || 'index, follow';

  // canonical URL — admin can override per-page, else derive from current origin + path
  const siteOrigin = (tracking.siteOrigin || (typeof window !== 'undefined' ? window.location.origin : '')).replace(/\/$/, '');
  const canonical = cfg.canonical || `${siteOrigin}${pathname}`;

  useEffect(() => {
    document.title = title;
    setMeta('description', description);
    setMeta('keywords', keywords);
    setMeta('robots', robots);
    setLink('canonical', canonical);
    // Open Graph
    setMeta('og:title', title, 'property');
    setMeta('og:description', description, 'property');
    setMeta('og:type', pathname.startsWith('/insights/') ? 'article' : 'website', 'property');
    setMeta('og:url', canonical, 'property');
    setMeta('og:site_name', 'Epsilon Executive Education', 'property');
    // Twitter
    setMeta('twitter:title', title);
    setMeta('twitter:description', description);
    if (ogImage) {
      setMeta('og:image', ogImage, 'property');
      setMeta('twitter:image', ogImage);
      setMeta('twitter:card', 'summary_large_image');
    } else {
      setMeta('twitter:card', 'summary');
    }
    // Google Search Console verification
    if (tracking.gscVerification) {
      setMeta('google-site-verification', tracking.gscVerification);
    }
    // Organization JSON-LD (site-wide)
    setJsonLd('jsonld-organization', {
      '@context': 'https://schema.org',
      '@type': 'EducationalOrganization',
      name: 'Epsilon Executive Education',
      url: siteOrigin || 'https://epsilonexec.com',
      logo: home.logoUrl || undefined,
      sameAs: Object.values(home.social || {}).filter((u) => u && u !== '#'),
      contactPoint: home.contact?.email ? {
        '@type': 'ContactPoint',
        email: home.contact.email,
        telephone: home.contact.phone || undefined,
        contactType: 'Admissions',
      } : undefined,
    });
    // Page-type structured data
    if (pathname.startsWith('/insights/')) {
      setJsonLd('jsonld-page', {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: title,
        description,
        image: ogImage || undefined,
        url: canonical,
        publisher: { '@type': 'Organization', name: 'Epsilon Executive Education', logo: home.logoUrl || undefined },
      });
    } else {
      setJsonLd('jsonld-page', {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: title,
        description,
        url: canonical,
      });
    }
  }, [title, description, keywords, ogImage, canonical, robots, pathname, tracking.gscVerification, home.logoUrl, home.contact?.email, home.contact?.phone, siteOrigin]);

  // Tracking scripts — site-wide, injected once
  useEffect(() => {
    if (tracking.gaMeasurementId) injectGA(tracking.gaMeasurementId);
    if (tracking.headHtml) injectHeadHtml(tracking.headHtml);
  }, [tracking.gaMeasurementId, tracking.headHtml]);

  // GA page-view on route change
  useEffect(() => {
    if (tracking.gaMeasurementId && window.gtag) {
      window.gtag('event', 'page_view', { page_path: pathname, page_title: title });
    }
  }, [pathname, title, tracking.gaMeasurementId]);

  return null;
}
