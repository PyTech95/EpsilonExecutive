import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { api } from './api';
import { Trash2, Mail, Phone, Clock, Briefcase } from 'lucide-react';

const TABS = [
  { key: 'apply', label: 'Applications' },
  { key: 'contact', label: 'Contact' },
  { key: 'schedule', label: 'Schedule a Call' },
  { key: 'corporate', label: 'Corporate' },
  { key: 'brochure', label: 'Brochure Leads' },
  { key: 'subscribe', label: 'Subscribers' },
];

export default function SubmissionsInbox() {
  const [sp, setSp] = useSearchParams();
  const initial = sp.get('tab') || 'apply';
  const [tab, setTab] = useState(initial);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.listSubmissions(tab).then(setItems).finally(() => setLoading(false));
    setSp({ tab });
  }, [tab]);

  const remove = async (id) => {
    if (!window.confirm('Delete this submission?')) return;
    await api.removeSubmission(tab, id);
    setItems((xs) => xs.filter((x) => x._id !== id));
  };

  return (
    <div>
      <h1 className="font-display text-navy text-[2rem]">Submissions</h1>
      <p className="font-editorial text-navy/70 mt-2">All form submissions from the public site.</p>

      <div className="flex gap-3 mt-8 border-b border-navy/10">
        {TABS.map((t) => (
          <button key={t.key} onClick={() => setTab(t.key)}
                  className={`font-caps text-[0.65rem] tracking-[0.22em] px-4 py-3 border-b-2 ${
                    tab === t.key ? 'border-gold text-gold' : 'border-transparent text-navy/60 hover:text-navy'
                  }`}>
            {t.label}
          </button>
        ))}
      </div>

      <div className="mt-6 space-y-4">
        {loading ? <p>Loading…</p> : items.length === 0 ? (
          <p className="font-editorial text-navy/60 py-10 text-center">No submissions yet.</p>
        ) : items.map((it) => (
          <div key={it._id} className="bg-white border border-navy/10 p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-3 flex-wrap">
                  <p className="font-display text-navy text-lg">
                    {it.fullName || it.name || it.email}
                  </p>
                  {it.createdAt && (
                    <span className="font-caps text-[0.58rem] text-navy/50 inline-flex items-center gap-1">
                      <Clock size={11} /> {new Date(it.createdAt).toLocaleString()}
                    </span>
                  )}
                </div>
                <div className="mt-2 flex flex-wrap gap-4 text-sm text-navy/80">
                  {it.email && <span className="inline-flex items-center gap-1.5"><Mail size={13} className="text-gold" /> {it.email}</span>}
                  {it.phone && <span className="inline-flex items-center gap-1.5"><Phone size={13} className="text-gold" /> {it.phone}</span>}
                  {(it.company || it.role) && <span className="inline-flex items-center gap-1.5"><Briefcase size={13} className="text-gold" /> {[it.role, it.company].filter(Boolean).join(' · ')}</span>}
                </div>
                {it.programme && <p className="font-caps text-[0.6rem] text-gold mt-3">Programme: {it.programme}</p>}
                {it.course && <p className="font-caps text-[0.6rem] text-gold mt-3">Course: {it.course}</p>}
                {it.topic && <p className="font-caps text-[0.6rem] text-gold mt-3">Topic: {it.topic}</p>}
                {it.experience && <p className="font-caps text-[0.6rem] text-navy/60 mt-1">Experience: {it.experience}</p>}
                {it.why && <p className="font-editorial italic text-navy/80 mt-3 text-sm">&ldquo;{it.why}&rdquo;</p>}
                {it.message && <p className="font-editorial italic text-navy/80 mt-3 text-sm">&ldquo;{it.message}&rdquo;</p>}
                {it.heard && <p className="font-sans text-navy/60 text-xs mt-2">Heard via: {it.heard}</p>}
              </div>
              <button onClick={() => remove(it._id)} className="p-2.5 border border-navy/20 text-navy hover:border-red-400 hover:text-red-500">
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
