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
          <p className="eyebrow mb-5">Schedule a Call</p>
          <span className="gold-rule-lg" />
          <h1 className="font-display uppercase text-[2.4rem] md:text-[4rem] leading-[1.04] mt-7">
            Talk to admissions
          </h1>
          <h2 className="font-editorial italic text-gold text-[1.8rem] md:text-[2.6rem] leading-[1.05] mt-2">
            on your time.
          </h2>
          <p className="font-editorial text-cream/85 text-[1.15rem] md:text-[1.3rem] leading-relaxed mt-7 max-w-2xl">
            Pick a time that works for you. We will send a calendar invite within one working day with the meeting link.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="bg-cream py-20 md:py-24">
        <div className="container-x grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-12">
          <aside>
            <p className="eyebrow mb-4">What to Expect</p>
            <span className="gold-rule" />
            <ul className="mt-6 space-y-5 font-editorial text-navy/80 text-[1.05rem]">
              <li className="flex gap-3"><Clock size={16} className="text-gold mt-1 flex-shrink-0" /><span><b className="font-display text-navy">25–30 minutes</b><br />A focused conversation, not a sales call.</span></li>
              <li className="flex gap-3"><Globe size={16} className="text-gold mt-1 flex-shrink-0" /><span><b className="font-display text-navy">Video, by default</b><br />Zoom or Google Meet — your choice.</span></li>
              <li className="flex gap-3"><Calendar size={16} className="text-gold mt-1 flex-shrink-0" /><span><b className="font-display text-navy">Confirmed within 24h</b><br />We will send a calendar invite by email.</span></li>
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
