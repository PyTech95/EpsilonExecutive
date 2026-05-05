import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from './api';
import { BookOpen, Users, MessageSquare, FileText, Calendar, Inbox, GraduationCap } from 'lucide-react';

const CARDS = [
  { key: 'programs', label: 'Programs', icon: BookOpen, to: '/admin/programs' },
  { key: 'lead_faculty', label: 'Lead Faculty', icon: Users, to: '/admin/faculty' },
  { key: 'guest_lecturers', label: 'Guest Lecturers', icon: Users, to: '/admin/faculty' },
  { key: 'testimonials', label: 'Testimonials', icon: MessageSquare, to: '/admin/testimonials' },
  { key: 'cohorts', label: 'Cohorts', icon: GraduationCap, to: '/admin/cohorts' },
  { key: 'insights', label: 'Insights', icon: FileText, to: '/admin/insights' },
  { key: 'events', label: 'Events', icon: Calendar, to: '/admin/events' },
];

export default function Dashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => { api.stats().then(setStats).catch(() => {}); }, []);

  return (
    <div>
      <p className="font-caps text-[0.65rem] text-gold tracking-[0.22em]">Overview</p>
      <h1 className="font-display text-navy text-[2.4rem] mt-2">Dashboard</h1>
      <p className="font-editorial text-navy/70 text-lg mt-2">Manage every section of your website from here.</p>

      {/* Submissions */}
      <div className="mt-10">
        <p className="font-caps text-[0.65rem] text-gold tracking-[0.22em] mb-4">Form Submissions</p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {['apply', 'contact', 'schedule', 'corporate', 'brochure', 'subscribe'].map((k) => (
            <Link to={`/admin/submissions?tab=${k}`} key={k} className="bg-white border border-navy/10 p-6 hover:border-gold/60 transition-colors">
              <Inbox size={18} className="text-gold mb-3" />
              <p className="font-caps text-[0.6rem] text-navy/60 tracking-[0.22em]">{k}</p>
              <p className="font-display text-navy text-[2rem] mt-1">{stats?.submissions?.[k] ?? '—'}</p>
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-10">
        <p className="font-caps text-[0.65rem] text-gold tracking-[0.22em] mb-4">Content</p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {CARDS.map((c) => (
            <Link to={c.to} key={c.key} className="bg-white border border-navy/10 p-6 hover:border-gold/60 transition-colors">
              <c.icon size={18} className="text-gold mb-3" />
              <p className="font-caps text-[0.6rem] text-navy/60 tracking-[0.22em]">{c.label}</p>
              <p className="font-display text-navy text-[2rem] mt-1">{stats?.[c.key] ?? '—'}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
