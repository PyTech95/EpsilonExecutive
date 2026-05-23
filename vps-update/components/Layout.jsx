import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import WhatsAppFloat from './WhatsAppFloat';
import MobileBottomBar from './MobileBottomBar';
import PopupEnquiry from './PopupEnquiry';
import SEOHead from './SEOHead';
import { EditModeProvider } from '../liveEditor/EditModeContext';
import LiveEditor from '../liveEditor/LiveEditor';
import EditModeButton from '../liveEditor/EditModeButton';
import StyleInjector from '../liveEditor/StyleInjector';

export default function Layout() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }); }, [pathname]);
  return (
    <EditModeProvider>
      <div className="min-h-screen flex flex-col bg-cream">
        <SEOHead />
        <StyleInjector />
        <Navbar />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
        {/* Desktop-only floating WhatsApp; mobile uses MobileBottomBar */}
        <div className="hidden lg:block">
          <WhatsAppFloat />
        </div>
        <MobileBottomBar />
        <PopupEnquiry />
        <EditModeButton />
        <LiveEditor />
      </div>
    </EditModeProvider>
  );
}
