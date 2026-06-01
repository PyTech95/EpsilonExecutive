import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Public
import Layout from './components/Layout';
import Home from './pages/Home';
import Programs from './pages/Programs';
import ProgramDetail from './pages/ProgramDetail';
import Faculty from './pages/Faculty';
import About from './pages/About';
import Admissions from './pages/Admissions';
import Contact from './pages/Contact';
import Apply from './pages/Apply';
import Insights from './pages/Insights';
import InsightDetail from './pages/InsightDetail';
import Events from './pages/Events';
import Corporate from './pages/Corporate';
import Schedule from './pages/Schedule';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';

// Admin
import { AdminAuthProvider } from './admin/AuthContext';
import AdminLayout from './admin/AdminLayout';
import AdminLogin from './admin/Login';
import Dashboard from './admin/Dashboard';
import HomeEditor from './admin/HomeEditor';
import HeaderFooterEditor from './admin/HeaderFooterEditor';
import ProgramsEditor from './admin/ProgramsEditor';
import FacultyEditor from './admin/FacultyEditor';
import {
  TestimonialsEditor,
  CohortsEditor,
  InsightsEditor,
  EventsEditor,
} from './admin/SimpleEditors';
import SubmissionsInbox from './admin/SubmissionsInbox';
import EmailSettings from './admin/EmailSettings';
import ThemeColors from './admin/ThemeColors';
import ChangePassword from './admin/ChangePassword';
import SEOEditor from './admin/SEOEditor';
import CorporateEditor from './admin/CorporateEditor';
import PagesEditor from './admin/PagesEditor';

// Site content provider for public pages
import { SiteContentProvider } from './context/SiteContent';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AdminAuthProvider>
          <Routes>
            {/* Admin */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="home" element={<HomeEditor />} />
              <Route path="pages" element={<PagesEditor />} />
              <Route path="corporate" element={<CorporateEditor />} />
              <Route path="header-footer" element={<HeaderFooterEditor />} />
              <Route path="programs" element={<ProgramsEditor />} />
              <Route path="faculty" element={<FacultyEditor />} />
              <Route path="testimonials" element={<TestimonialsEditor />} />
              <Route path="cohorts" element={<CohortsEditor />} />
              <Route path="insights" element={<InsightsEditor />} />
              <Route path="events" element={<EventsEditor />} />
              <Route path="seo" element={<SEOEditor />} />
              <Route path="submissions" element={<SubmissionsInbox />} />
              <Route path="email-settings" element={<EmailSettings />} />
              <Route path="theme-colors" element={<ThemeColors />} />
              <Route path="password" element={<ChangePassword />} />
            </Route>

            {/* Public */}
            <Route
              element={
                <SiteContentProvider>
                  <Layout />
                </SiteContentProvider>
              }
            >
              <Route path="/" element={<Home />} />
              <Route path="/programs" element={<Programs />} />
              <Route path="/programs/:slug" element={<ProgramDetail />} />
              <Route path="/faculty" element={<Faculty />} />
              <Route path="/about" element={<About />} />
              <Route path="/admissions" element={<Admissions />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/apply" element={<Apply />} />
              <Route path="/insights" element={<Insights />} />
              <Route path="/insights/:slug" element={<InsightDetail />} />
              <Route path="/events" element={<Events />} />
              <Route path="/corporate" element={<Corporate />} />
              <Route path="/schedule" element={<Schedule />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy" element={<Privacy />} />
            </Route>
          </Routes>
        </AdminAuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
