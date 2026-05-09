import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Briefcase, Users, Target, BarChart3, Mail } from 'lucide-react';
import { useSiteContent } from '../context/SiteContent';
import { api } from '../admin/api';

const ICONS = [Briefcase, Users, Target, BarChart3];

export default function Corporate() {
  const ctx = useSiteContent();
  const c = ctx?.home?.corporate || {};
  const contact = ctx?.home?.contact || {};

  const [form, setForm] = useState({
    name: '', email: '', phone: '', company: '', role: '',
    teamSize: '10–25', interest: 'C-Suite & Boards', message: ''
  });
  const [sent, setSent] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    try { await api.submitCorporate(form); } catch {}
    setSent(true);
  };

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-navy-deep text-cream pt-[180px] md:pt-[200px] pb-24 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 starfield opacity-40" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] rounded-full glow-gold pointer-events-none" />
        <div className="container-x relative">
          <p className="eyebrow mb-5">{c.eyebrow || 'Corporate Education'}</p>
          <span className="gold-rule-lg" />
          <h1 className="font-display uppercase text-[2.4rem] md:text-[4.2rem] leading-[1.04] mt-7 max-w-4xl">
            {c.heroTitle || 'Built for your team. Run for your business.'}
          </h1>
          <p className="font-editorial text-cream/85 text-[1.2rem] md:text-[1.4rem] leading-relaxed mt-7 max-w-3xl">
            {c.heroSubtitle || 'Custom cohorts that turn your senior team into evidence-based decision-makers.'}
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a href="#corporate-form" className="btn-gold">Talk to Us <ArrowRight size={16} /></a>
            <Link to="/schedule" className="btn-outline-gold">Schedule a Call</Link>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="bg-cream py-24">
        <div className="container-x grid grid-cols-1 md:grid-cols-2 gap-14 items-start">
          <div>
            <p className="eyebrow mb-4">Why Epsilon for Corporate</p>
            <span className="gold-rule-lg" />
            <h2 className="font-display text-navy text-[2rem] md:text-[2.8rem] leading-[1.05] mt-6">
              Bespoke programs <span className="italic font-editorial text-gold">that ship.</span>
            </h2>
          </div>
          <p className="font-editorial text-navy/85 text-[1.2rem] leading-relaxed">
            {c.intro || 'We design and deliver private cohorts for companies that want their senior leadership to think clearly about AI, data, and modern decision systems. Programs are bespoke, evidence-anchored, and led by practitioner-educators.'}
          </p>
        </div>
      </section>

      {/* Why */}
      {c.whyItems?.length > 0 && (
        <section className="bg-bone py-12 md:py-24">
          <div className="container-x">
            <p className="eyebrow mb-4">{c.whyTitle || 'Why companies partner with Epsilon'}</p>
            <span className="gold-rule-lg" />
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {c.whyItems.map((it, i) => {
                const Icon = ICONS[i % ICONS.length];
                return (
                  <div key={it.title} className="bg-white p-8 lift-card border border-transparent hover:border-gold/40">
                    <Icon size={22} className="text-gold mb-5" />
                    <h3 className="font-display text-navy text-[1.25rem] leading-tight">{it.title}</h3>
                    <p className="font-editorial text-navy/75 leading-relaxed mt-3">{it.body}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Audiences */}
      {c.audiences?.length > 0 && (
        <section className="bg-cream py-12 md:py-24">
          <div className="container-x">
            <p className="eyebrow mb-4">{c.audiencesTitle || 'Who we run cohorts for'}</p>
            <span className="gold-rule-lg" />
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
              {c.audiences.map((a) => (
                <div key={a.title} className="bg-navy-deep text-cream p-9 relative overflow-hidden lift-card group">
                  <div className="absolute -top-16 -right-16 w-44 h-44 rounded-full opacity-25 group-hover:opacity-40 transition-opacity"
                       style={{ background: 'radial-gradient(circle, rgba(194,152,76,0.5) 0%, transparent 70%)' }} />
                  <h3 className="font-display text-cream text-[1.5rem] leading-tight relative">{a.title}</h3>
                  <div className="w-10 h-px bg-gold/50 my-4 relative" />
                  <p className="font-editorial text-cream/80 leading-relaxed relative">{a.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA + form */}
      <section id="corporate-form" className="bg-bone py-12 md:py-24">
        <div className="container-x grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-14">
          <div>
            <p className="eyebrow mb-4">Get in Touch</p>
            <span className="gold-rule-lg" />
            <h2 className="font-display text-navy text-[2rem] md:text-[3rem] leading-[1.05] mt-6">
              {c.ctaTitle || 'Talk to us about a private cohort.'}
            </h2>
            <p className="font-editorial text-navy/80 text-[1.2rem] leading-relaxed mt-6 max-w-md">
              {c.ctaSubtitle || 'Tell us about your team and what you want them to be able to do. We will design a program around it.'}
            </p>
            <div className="mt-8 flex gap-3 items-center">
              <Mail size={16} className="text-gold" />
              <span className="font-display text-navy">{contact.email || 'admissions@epsilonexec.com'}</span>
            </div>
          </div>

          <div className="bg-white p-8 md:p-10 border border-navy/10">
            {sent ? (
              <div className="py-10 text-center">
                <CheckCircle2 size={48} className="text-gold mx-auto mb-4" />
                <h3 className="font-display text-navy text-[1.7rem]">Thank you.</h3>
                <p className="font-editorial text-navy/75 mt-3 max-w-md mx-auto">
                  A member of our corporate team will reach out within two working days.
                </p>
                <button onClick={() => setSent(false)} className="link-gold mt-7 inline-flex">Send another →</button>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="fld-label">Your Name</label>
                    <input required className="fld-input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                  </div>
                  <div>
                    <label className="fld-label">Work Email</label>
                    <input required type="email" className="fld-input" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                  </div>
                  <div>
                    <label className="fld-label">Phone</label>
                    <input className="fld-input" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                  </div>
                  <div>
                    <label className="fld-label">Role</label>
                    <input className="fld-input" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} />
                  </div>
                </div>
                <div>
                  <label className="fld-label">Company</label>
                  <input required className="fld-input" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="fld-label">Team Size</label>
                    <select className="fld-input" value={form.teamSize} onChange={(e) => setForm({ ...form, teamSize: e.target.value })}>
                      {['Under 10', '10–25', '25–50', '50–100', '100+'].map((s) => <option key={s}>{s}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="fld-label">Cohort Interest</label>
                    <select className="fld-input" value={form.interest} onChange={(e) => setForm({ ...form, interest: e.target.value })}>
                      {(c.audiences || []).map((a) => <option key={a.title}>{a.title}</option>)}
                      <option>Other / Bespoke</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="fld-label">What do you want your team to be able to do?</label>
                  <textarea rows={4} className="fld-input" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
                </div>
                <button type="submit" className="btn-gold">Send Inquiry <ArrowRight size={16} /></button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
