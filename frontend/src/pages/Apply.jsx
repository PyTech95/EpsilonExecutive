import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { programs } from '../mock';

const EXP = ['0–3 years','3–5 years','5–10 years','10–15 years','15+ years'];

export default function Apply() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    programme: programs[0].title,
    fullName: '', email: '', phone: '',
    role: '', company: '', experience: EXP[2],
    why: '', heard: ''
  });

  const onSubmit = (e) => {
    e.preventDefault();
    try { localStorage.setItem('epsilon_application_'+Date.now(), JSON.stringify(form)); } catch {}
    setSent(true);
  };

  return (
    <div>
      {/* Hero with right-side bullets */}
      <section className="relative bg-navy-deep text-cream pt-[180px] md:pt-[200px] pb-20 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 starfield opacity-40 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full glow-gold pointer-events-none" />
        <div className="container-x relative grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-12 items-start">
          <div>
            <p className="eyebrow mb-5">Apply</p>
            <span className="gold-rule-lg" />
            <h1 className="font-display uppercase text-[2.4rem] md:text-[4rem] leading-[1.04] mt-7">
              Begin your<br />
              <span className="font-editorial italic normal-case text-gold">conversation with Epsilon.</span>
            </h1>
            <p className="font-editorial text-cream/80 text-[1.15rem] md:text-[1.3rem] leading-relaxed mt-8 max-w-2xl">
              Applications are reviewed personally by our admissions team. Tell us a little about you and what you want to learn &mdash; we will reach out to discuss fit, expectations, and next steps.
            </p>
          </div>
          <ul className="space-y-6 mt-2 lg:mt-20">
            {[
              '12-week, live online cohort',
              'Roughly 15–20 hours per week',
              'Practitioner-led, capstone-anchored',
              'Personal conversation before admission',
            ].map((item) => (
              <li key={item} className="flex items-start gap-4 font-editorial text-cream/90 text-[1.2rem]">
                <span className="text-gold text-2xl leading-none">◆</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Form */}
      <section className="bg-cream py-20 md:py-24">
        <div className="container-x max-w-5xl">
          {sent ? (
            <div className="bg-white border border-navy/10 p-12 md:p-16 text-center">
              <CheckCircle2 size={56} className="text-gold mx-auto mb-5" />
              <h3 className="font-display text-navy text-[1.8rem] md:text-[2.4rem]">Application received.</h3>
              <p className="font-editorial text-navy/75 text-lg mt-4 max-w-md mx-auto">
                Thank you. A member of our admissions team will reach out within two working days to schedule a conversation.
              </p>
              <Link to="/" className="link-gold mt-10 inline-flex">Return home →</Link>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-14">
              <div>
                <p className="font-caps text-[0.7rem] text-gold tracking-[0.22em] mb-5">Programme</p>
                <span className="gold-rule" />
                <select className="fld-input mt-6" value={form.programme} onChange={(e)=>setForm({...form,programme:e.target.value})}>
                  {programs.map(p => <option key={p.slug} value={p.title}>{p.title}</option>)}
                </select>
              </div>

              <div>
                <p className="font-caps text-[0.7rem] text-gold tracking-[0.22em] mb-5">About You</p>
                <span className="gold-rule" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div>
                    <label className="fld-label">Full Name</label>
                    <input required className="fld-input" value={form.fullName} onChange={(e)=>setForm({...form,fullName:e.target.value})} />
                  </div>
                  <div>
                    <label className="fld-label">Email</label>
                    <input required type="email" className="fld-input" value={form.email} onChange={(e)=>setForm({...form,email:e.target.value})} />
                  </div>
                  <div>
                    <label className="fld-label">Phone</label>
                    <input className="fld-input" value={form.phone} onChange={(e)=>setForm({...form,phone:e.target.value})} />
                  </div>
                </div>
              </div>

              <div>
                <p className="font-caps text-[0.7rem] text-gold tracking-[0.22em] mb-5">Your Work</p>
                <span className="gold-rule" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div>
                    <label className="fld-label">Role</label>
                    <input className="fld-input" value={form.role} onChange={(e)=>setForm({...form,role:e.target.value})} />
                  </div>
                  <div>
                    <label className="fld-label">Company</label>
                    <input className="fld-input" value={form.company} onChange={(e)=>setForm({...form,company:e.target.value})} />
                  </div>
                  <div className="md:col-span-2">
                    <label className="fld-label">Years of experience</label>
                    <select className="fld-input" value={form.experience} onChange={(e)=>setForm({...form,experience:e.target.value})}>
                      {EXP.map(x => <option key={x} value={x}>{x}</option>)}
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <p className="font-caps text-[0.7rem] text-gold tracking-[0.22em] mb-5">Your Why</p>
                <span className="gold-rule" />
                <label className="fld-label mt-6">What do you want to be able to do after twelve weeks?</label>
                <textarea rows={5} className="fld-input" value={form.why} onChange={(e)=>setForm({...form,why:e.target.value})} />

                <label className="fld-label mt-6">How did you hear about Epsilon? (optional)</label>
                <input className="fld-input" value={form.heard} onChange={(e)=>setForm({...form,heard:e.target.value})} />
              </div>

              <button type="submit" className="btn-navy">Submit Application <ArrowRight size={16} /></button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
