import React from 'react';
import { NavLink, Outlet, useNavigate, Navigate } from 'react-router-dom';
import {
  LayoutDashboard, Home, BookOpen, Users, Calendar, MessageSquare,
  FileText, Inbox, LogOut, Lock, GraduationCap, Menu, Search,
  Building2, FileEdit
} from 'lucide-react';
import { useAuth } from './AuthContext';

const navGroups = [
  {
    label: 'Overview',
    items: [
      { to: '/admin', icon: LayoutDashboard, label: 'Dashboard', end: true },
    ],
  },
  {
    label: 'Pages',
    items: [
      { to: '/admin/home', icon: Home, label: 'Home Page' },
      { to: '/admin/pages', icon: FileEdit, label: 'About / Admissions / Apply' },
      { to: '/admin/corporate', icon: Building2, label: 'Corporate Page' },
      { to: '/admin/header-footer', icon: Menu, label: 'Header & Footer' },
      { to: '/admin/seo', icon: Search, label: 'SEO & Meta' },
    ],
  },
  {
    label: 'Content',
    items: [
      { to: '/admin/programs', icon: BookOpen, label: 'Programs' },
      { to: '/admin/faculty', icon: Users, label: 'Faculty' },
      { to: '/admin/testimonials', icon: MessageSquare, label: 'Testimonials' },
      { to: '/admin/cohorts', icon: GraduationCap, label: 'Cohorts' },
      { to: '/admin/insights', icon: FileText, label: 'Insights' },
      { to: '/admin/events', icon: Calendar, label: 'Events' },
    ],
  },
  {
    label: 'Operations',
    items: [
      { to: '/admin/submissions', icon: Inbox, label: 'Submissions' },
      { to: '/admin/password', icon: Lock, label: 'Password' },
    ],
  },
];

export default function AdminLayout() {
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-cream text-navy">Loading…</div>;
  if (!user) return <Navigate to="/admin/login" replace />;

  return (
    <div className="min-h-screen flex bg-[#F5EFE0] text-navy">
      <aside className="w-64 bg-navy-deep text-cream min-h-screen flex flex-col">
        <div className="p-6 border-b border-gold/15">
          <p className="font-caps text-[0.65rem] text-gold tracking-[0.22em]">Epsilon</p>
          <h1 className="font-display text-cream text-[1.3rem] mt-1">Admin</h1>
          <p className="text-xs text-cream/60 mt-2 truncate">{user.email}</p>
        </div>

        <nav className="flex-1 py-4 overflow-y-auto">
          {navGroups.map((group) => (
            <div key={group.label} className="mb-4">
              <p className="px-6 mb-1.5 font-caps text-[0.55rem] tracking-[0.22em] text-gold/60">{group.label}</p>
              {group.items.map((n) => (
                <NavLink
                  key={n.to}
                  to={n.to}
                  end={n.end}
                  data-testid={`nav-${n.label.replace(/[^a-z0-9]+/gi, '-').toLowerCase()}`}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-6 py-2.5 text-sm transition-colors ${
                      isActive ? 'bg-navy text-gold border-l-2 border-gold' : 'text-cream/80 hover:bg-navy hover:text-gold'
                    }`
                  }
                >
                  <n.icon size={16} /> {n.label}
                </NavLink>
              ))}
            </div>
          ))}
        </nav>

        <button
          onClick={() => { logout(); navigate('/admin/login'); }}
          className="flex items-center gap-3 px-6 py-4 text-sm text-cream/70 hover:text-gold border-t border-gold/15"
        >
          <LogOut size={16} /> Log out
        </button>
      </aside>

      <main className="flex-1 overflow-auto">
        <div className="max-w-6xl mx-auto px-8 py-10">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
