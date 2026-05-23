import React, { useState } from 'react';
import { Play } from 'lucide-react';
import { useSiteContent } from '../context/SiteContent';

/**
 * Embed a YouTube/Vimeo URL, or play a direct mp4.
 * Data lives under home.video = { url, type, title, subtitle, poster, eyebrow }
 *   - type: "youtube" | "vimeo" | "mp4" (auto-detected if blank)
 *
 * Until a URL is set, a tasteful placeholder thumbnail is shown.
 */
function detectType(url) {
  if (!url) return 'mp4';
  const u = url.toLowerCase();
  if (u.includes('youtube.com') || u.includes('youtu.be')) return 'youtube';
  if (u.includes('vimeo.com')) return 'vimeo';
  return 'mp4';
}

function toYouTubeEmbed(url) {
  try {
    if (url.includes('youtu.be/')) {
      const id = url.split('youtu.be/')[1].split(/[?&]/)[0];
      return `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`;
    }
    const m = url.match(/[?&]v=([^&]+)/);
    if (m) return `https://www.youtube.com/embed/${m[1]}?autoplay=1&rel=0`;
    if (url.includes('/embed/')) return url + (url.includes('?') ? '&autoplay=1' : '?autoplay=1');
    return url;
  } catch { return url; }
}

function toVimeoEmbed(url) {
  try {
    const m = url.match(/vimeo\.com\/(\d+)/);
    if (m) return `https://player.vimeo.com/video/${m[1]}?autoplay=1`;
    return url;
  } catch { return url; }
}

const DEFAULT_POSTER = 'https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=1600&q=70&auto=format&fit=crop';

export default function VideoShowcase() {
  const ctx = useSiteContent();
  const video = ctx?.home?.video || {};
  const sections = ctx?.home?.sections || {};
  const [playing, setPlaying] = useState(false);

  const url = video.url || '';
  const type = (video.type || detectType(url));
  const poster = video.poster || DEFAULT_POSTER;
  const hasUrl = !!url;

  let embedSrc = '';
  if (hasUrl) {
    if (type === 'youtube') embedSrc = toYouTubeEmbed(url);
    else if (type === 'vimeo') embedSrc = toVimeoEmbed(url);
  }

  return (
    <section data-cms-section="home-video" className="bg-cream py-12 md:py-20 relative overflow-hidden">
      <div className="container-x">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <p className="eyebrow mb-3" data-cms-path="sections.videoEyebrow">
            {sections.videoEyebrow || video.eyebrow || 'Inside Epsilon'}
          </p>
          <span className="gold-rule-lg" />
          <h2 className="font-display text-navy text-[1.9rem] md:text-[2.8rem] leading-tight mt-4" data-cms-path="video.title">
            {video.title || 'Hear from our faculty and learners.'}
          </h2>
          <p className="font-editorial text-navy/75 text-[1.1rem] md:text-[1.25rem] leading-relaxed mt-4" data-cms-path="video.subtitle">
            {video.subtitle || 'A two-minute look at how cohorts work, what the capstone looks like, and the kind of conversations our learners walk away with.'}
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Gold corner frame */}
          <span className="absolute -top-2 -left-2 w-10 h-10 border-t-2 border-l-2 border-gold z-10 pointer-events-none" />
          <span className="absolute -top-2 -right-2 w-10 h-10 border-t-2 border-r-2 border-gold z-10 pointer-events-none" />
          <span className="absolute -bottom-2 -left-2 w-10 h-10 border-b-2 border-l-2 border-gold z-10 pointer-events-none" />
          <span className="absolute -bottom-2 -right-2 w-10 h-10 border-b-2 border-r-2 border-gold z-10 pointer-events-none" />

          <div className="relative aspect-video bg-navy-deep overflow-hidden">
            {!playing && (
              <>
                <img
                  src={poster}
                  alt={video.title || 'Video poster'}
                  className="absolute inset-0 w-full h-full object-cover opacity-90"
                  data-cms-path="video.poster"
                  data-cms-type="image"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-navy-deep/55 via-navy-deep/25 to-navy-deep/65" />

                <button
                  type="button"
                  onClick={() => setPlaying(true)}
                  data-testid="video-play-btn"
                  className="absolute inset-0 m-auto w-20 h-20 md:w-24 md:h-24 rounded-full bg-gold text-navy-deep flex items-center justify-center shadow-[0_18px_40px_rgba(0,0,0,0.45)] hover:scale-105 transition-transform duration-300 group"
                  aria-label="Play video"
                >
                  <span className="absolute inset-0 rounded-full bg-gold/30 animate-ping" />
                  <Play size={32} strokeWidth={1.8} className="relative ml-1 group-hover:scale-110 transition-transform" />
                </button>

                <div className="absolute bottom-5 left-5 right-5 md:bottom-7 md:left-7 md:right-7 text-cream">
                  <p className="font-caps text-[0.6rem] text-gold tracking-[0.22em] mb-1.5">Featured Video</p>
                  <p className="font-display text-[1.05rem] md:text-[1.3rem] leading-tight" data-cms-path="video.posterLabel">
                    {video.posterLabel || 'A short introduction to Epsilon Executive Education.'}
                  </p>
                </div>
              </>
            )}

            {playing && hasUrl && type === 'mp4' && (
              <video
                src={url}
                autoPlay
                controls
                playsInline
                className="absolute inset-0 w-full h-full object-cover bg-black"
              />
            )}
            {playing && hasUrl && (type === 'youtube' || type === 'vimeo') && (
              <iframe
                title={video.title || 'Video'}
                src={embedSrc}
                className="absolute inset-0 w-full h-full"
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
              />
            )}
            {playing && !hasUrl && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-navy-deep text-cream p-8 text-center gap-3">
                <p className="font-caps text-[0.6rem] text-gold tracking-[0.22em]">Coming Soon</p>
                <p className="font-display text-[1.3rem] md:text-[1.6rem] max-w-md">
                  Our showcase film is being produced. Check back shortly.
                </p>
                <button
                  type="button"
                  onClick={() => setPlaying(false)}
                  className="btn-outline-gold mt-3 border-cream/30 text-cream"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
