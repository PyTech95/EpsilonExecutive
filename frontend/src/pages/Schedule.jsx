import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Calendar, Clock, Globe } from 'lucide-react';
import { useSiteContent } from '../context/SiteContent';
import { api } from '../admin/api';

const TIMES = ['09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'];
const TZS = ['Asia/Kolkata (IST)', 'Asia/Singapore (SGT)', 'Asia/Dubai (GST)', 'Europe/London (GMT/BST)', 'America/New_York (EST/EDT)'];

export default function Schedule() {
  const ctx = useSiteContent();
  const programs = ctx?.programs || [];
  const sch = ctx?.home?.schedule || {};
  const hero = sch.hero || {};
  const cap = sch.imageCaption || {};
  const expectItems = sch.expectItems?.length ? sch.expectItems : [
    { title: '25–30 minutes', body: 'A focused conversation, not a sales call.' },
    { title: 'Video, by default', body: 'Zoom or Google Meet — your choice.' },
    { title: 'Confirmed within 24h', body: 'We will send a calendar invite by email.' },
  ];
  const expectIcons = [Clock, Globe, Calendar];
  const interests = ['Program Fit Discussion', 'Admissions Conversation', 'Corporate / Cohort Partnership', 'General Inquiry'];

  const today = new Date();
  const minDate = today.toISOString().slice(0, 10);

  const [form, setForm] = useState({
    name: '', email: '', phone: '', company: '', role: '',
    preferredDate: minDate, preferredTime: '17:00', timezone: TZS[0],
    interest: interests[1], message: ''
  });
  const [sent, setSent] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    try { await api.submitSchedule(form); } catch {}
    setSent(true);
  };

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-navy-deep text-cream pt-[180px] md:pt-[200px] pb-20 overflow-hidden">
        <div className="absolute inset-0 starfield opacity-40" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full glow-gold pointer-events-none" />
        <div className="container-x relative max-w-4xl">
          <p className="eyebrow mb-5" data-cms-path="schedule.hero.eyebrow">{hero.eyebrow || 'Schedule a Call'}</p>
          <span className="gold-rule-lg" />
          <h1 className="font-display uppercase theme-hero-title text-[2.4rem] md:text-[4rem] leading-[1.04] mt-7" data-cms-path="schedule.hero.title">
            {hero.title || 'Talk to admissions'}
          </h1>
          <h2 className="font-editorial italic theme-hero-accent text-[1.8rem] md:text-[2.6rem] leading-[1.05] mt-2" data-cms-path="schedule.hero.titleItalic">
            {hero.titleItalic || 'on your time.'}
          </h2>
          <p className="font-editorial text-cream/85 text-[1.15rem] md:text-[1.3rem] leading-relaxed mt-7 max-w-2xl" data-cms-path="schedule.hero.subtitle">
            {hero.subtitle || 'Pick a time that works for you. We will send a calendar invite within one working day with the meeting link.'}
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="bg-cream py-12 md:py-24">
        <div className="container-x grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-12">
          <aside>
            <div className="relative aspect-[4/5] overflow-hidden bg-navy-deep mb-8">
              <img
                src={ctx?.home?.siteImages?.scheduleSidebar || "/generated/online-class-young-student.png"}
                alt="Indian professional preparing for an admissions call"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/80 via-navy-deep/20 to-transparent" />
              <span className="absolute top-3 left-3 w-7 h-7 border-t border-l border-gold/70" />
              <span className="absolute bottom-3 right-3 w-7 h-7 border-b border-r border-gold/70" />
              <div className="absolute bottom-5 left-5 right-5 text-cream">
                <p className="font-caps text-[0.55rem] tracking-[0.22em] text-gold">{cap.line1 || 'A personal call'}</p>
                <p className="font-display text-[1.05rem] leading-tight mt-1">{cap.line2 || 'Not a sales funnel.'}</p>
              </div>
            </div>
            <p className="eyebrow mb-4">{sch.expectEyebrow || 'What to Expect'}</p>
            <span className="gold-rule" />
            <ul className="mt-6 space-y-5 font-editorial text-navy/80 text-[1.05rem]">
              {expectItems.map((it, i) => {
                const Icon = expectIcons[i % expectIcons.length];
                return (
                  <li key={i} className="flex gap-3">
                    <Icon size={16} className="text-gold mt-1 flex-shrink-0" />
                    <span><b className="font-display text-navy">{it.title}</b><br />{it.body}</span>
                  </li>
                );
              })}
            </ul>
          </aside>

          <div className="bg-white p-8 md:p-12 border border-navy/10">
            {sent ? (
              <div className="py-10 text-center">
                <CheckCircle2 size={56} className="text-gold mx-auto mb-5" />
                <h3 className="font-display text-navy text-[1.8rem] md:text-[2.4rem]">Request received.</h3>
                <p className="font-editorial text-navy/75 text-lg mt-4 max-w-md mx-auto">
                  Thank you. We will send a calendar invite to <b>{form.email}</b> within one working day.
                </p>
                <Link to="/" className="link-gold mt-8 inline-flex">Return home →</Link>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-7">
                <div>
                  <p className="font-caps text-[0.7rem] text-gold tracking-[0.22em] mb-4">About You</p>
                  <span className="gold-rule" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
                    <div>
                      <label className="fld-label">Full Name</label>
                      <input required className="fld-input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                    </div>
                    <div>
                      <label className="fld-label">Email</label>
                      <input required type="email" className="fld-input" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                    </div>
                    <div>
                      <label className="fld-label">Phone (optional)</label>
                      <input className="fld-input" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                    </div>
                    <div>
                      <label className="fld-label">Company / Role</label>
                      <input className="fld-input" placeholder="VP, Strategy · Mumbai BFSI" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} />
                    </div>
                  </div>
                </div>

                <div>
                  <p className="font-caps text-[0.7rem] text-gold tracking-[0.22em] mb-4">Preferred Time</p>
                  <span className="gold-rule" />
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-5">
                    <div>
                      <label className="fld-label">Date</label>
                      <input required type="date" min={minDate} className="fld-input" value={form.preferredDate} onChange={(e) => setForm({ ...form, preferredDate: e.target.value })} />
                    </div>
                    <div>
                      <label className="fld-label">Time</label>
                      <select className="fld-input" value={form.preferredTime} onChange={(e) => setForm({ ...form, preferredTime: e.target.value })}>
                        {TIMES.map((t) => <option key={t}>{t}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="fld-label">Timezone</label>
                      <select className="fld-input" value={form.timezone} onChange={(e) => setForm({ ...form, timezone: e.target.value })}>
                        {TZS.map((t) => <option key={t}>{t}</option>)}
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="font-caps text-[0.7rem] text-gold tracking-[0.22em] mb-4">What's the conversation about?</p>
                  <span className="gold-rule" />
                  <div className="space-y-5 mt-5">
                    <div>
                      <label className="fld-label">Topic</label>
                      <select className="fld-input" value={form.interest} onChange={(e) => setForm({ ...form, interest: e.target.value })}>
                        {interests.map((i) => <option key={i}>{i}</option>)}
                        {programs.map((p) => <option key={p.slug}>{`Program: ${p.subtitle}`}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="fld-label">Anything you want us to know in advance? (optional)</label>
                      <textarea rows={4} className="fld-input" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
                    </div>
                  </div>
                </div>

                <button type="submit" className="btn-gold">Request a Time <ArrowRight size={16} /></button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
