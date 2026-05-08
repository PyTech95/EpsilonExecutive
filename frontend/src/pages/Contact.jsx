import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Mail, Phone, MapPin } from 'lucide-react';
import PageHero from '../components/PageHero';
import { api } from '../admin/api';
import { useSiteContent } from '../context/SiteContent';

const TOPICS = ['General Inquiry','Admissions Question','Program Fit','Corporate / Cohort Partnerships','Press & Media'];

export default function Contact() {
  const ctx = useSiteContent();
  const contact = ctx?.home?.contact || {};
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', topic: TOPICS[0], message: '' });

  const onSubmit = async (e) => {
    e.preventDefault();
    try { await api.submitContact(form); } catch {}
    try { localStorage.setItem('epsilon_contact_'+Date.now(), JSON.stringify(form)); } catch {}
    setSent(true);
  };

  return (
    <div>
      <PageHero
        eyebrow="Contact"
        title="Talk to admissions."
        subtitle={contact.subtext || 'Questions about a program, fit, fees, or partnerships? Drop us a line and a member of the team will write back personally.'}
      />

      <section className="bg-cream py-24">
        <div className="container-x grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-14">
          <div>
            <div className="relative aspect-[4/5] overflow-hidden bg-navy-deep mb-9">
              <img
                src={ctx?.home?.siteImages?.contactSidebar || "/generated/online-class-collaboration.png"}
                alt="Senior professional in conversation with admissions"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-navy-deep/30 to-transparent" />
              <span className="absolute top-3 left-3 w-8 h-8 border-t border-l border-gold/70" />
              <span className="absolute bottom-3 right-3 w-8 h-8 border-b border-r border-gold/70" />
            </div>
            <div className="space-y-8">
              <div className="flex gap-4">
              <Mail size={18} className="text-gold mt-1" />
              <div>
                <p className="font-caps text-[0.65rem] text-navy/60">Email</p>
                <p className="font-display text-navy mt-1">{contact.email || 'admissions@epsilonexec.com'}</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Phone size={18} className="text-gold mt-1" />
              <div>
                <p className="font-caps text-[0.65rem] text-navy/60">Phone</p>
                <p className="font-display text-navy mt-1">{contact.phone || '+91 · on request'}</p>
              </div>
            </div>
            <div className="flex gap-4">
              <MapPin size={18} className="text-gold mt-1" />
              <div>
                <p className="font-caps text-[0.65rem] text-navy/60">Where</p>
                <p className="font-display text-navy mt-1">{contact.address || 'Live online · cohorts based in India'}</p>
              </div>
            </div>
          </div>
          </div>

          <div className="bg-white p-8 md:p-12 border border-navy/10">
            {sent ? (
              <div className="py-10 text-center">
                <CheckCircle2 size={48} className="text-gold mx-auto mb-4" />
                <h3 className="font-display text-navy text-[1.8rem]">Message sent.</h3>
                <p className="font-editorial text-navy/75 mt-3">We’ll write back personally within two working days.</p>
                <button onClick={() => { setSent(false); setForm({ name:'', email:'', topic: TOPICS[0], message:'' }); }} className="link-gold mt-8 inline-flex">Send another →</button>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="fld-label">Your Name</label>
                    <input required type="text" className="fld-input" value={form.name} onChange={(e)=>setForm({...form,name:e.target.value})} />
                  </div>
                  <div>
                    <label className="fld-label">Email</label>
                    <input required type="email" className="fld-input" value={form.email} onChange={(e)=>setForm({...form,email:e.target.value})} />
                  </div>
                </div>
                <div>
                  <label className="fld-label">Topic</label>
                  <select className="fld-input" value={form.topic} onChange={(e)=>setForm({...form,topic:e.target.value})}>
                    {TOPICS.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="fld-label">Message</label>
                  <textarea required rows={6} className="fld-input" value={form.message} onChange={(e)=>setForm({...form,message:e.target.value})} />
                </div>
                <button type="submit" className="btn-gold">Send Message <ArrowRight size={16} /></button>
                <p className="font-editorial text-navy/70 text-base">
                  Or skip ahead and <Link to="/apply" className="text-gold underline underline-offset-4">apply directly</Link>.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
