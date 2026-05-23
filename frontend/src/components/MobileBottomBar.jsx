import React from 'react';
import { Phone } from 'lucide-react';
import { useSiteContent } from '../context/SiteContent';

/**
 * Sticky bottom action bar — mobile only.
 * Two CTA pills side-by-side: tap-to-call (gold) + WhatsApp (green).
 * Reads from home.contact.phone and home.contact.whatsapp (admin editable).
 * Hidden if BOTH numbers are missing.
 */
export default function MobileBottomBar() {
  const ctx = useSiteContent();
  const contact = ctx?.home?.contact || {};
  const phone = String(contact.phone || '').trim();
  const waRaw = String(contact.whatsapp || contact.phone || '').replace(/\D/g, '');
  const showCall = phone.replace(/\D/g, '').length >= 8;
  const showWa = waRaw.length >= 8;
  if (!showCall && !showWa) return null;

  const telHref = `tel:${phone.replace(/[^\d+]/g, '')}`;
  const waMessage = encodeURIComponent("Hi Epsilon team, I'd like to know more about your programs.");
  const waHref = `https://wa.me/${waRaw}?text=${waMessage}`;

  return (
    <>
      {/* Safe-area spacer to prevent content overlap */}
      <div className="lg:hidden h-[72px]" aria-hidden="true" />

      <div
        data-testid="mobile-bottom-bar"
        className="lg:hidden fixed bottom-0 left-0 right-0 z-[99996]"
        style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
      >
        {/* Subtle gold accent line */}
        <div className="h-px bg-gradient-to-r from-transparent via-gold/70 to-transparent" />

        <div className="bg-navy-deep/95 backdrop-blur-md border-t border-gold/25 px-3 py-2.5 shadow-[0_-8px_28px_rgba(0,0,0,0.35)]">
          <div className="flex items-stretch gap-2.5">
            {showCall && (
              <a
                href={telHref}
                data-testid="mobile-bar-call-btn"
                className="group flex-1 inline-flex items-center justify-center gap-2 h-12 bg-gold text-navy-deep border border-gold hover:bg-cream hover:border-cream transition-colors duration-200 font-caps text-[0.7rem] tracking-[0.22em] font-semibold active:scale-[0.98]"
              >
                <Phone size={16} strokeWidth={2} className="group-hover:rotate-[-6deg] transition-transform" />
                Call Now
              </a>
            )}
            {showWa && (
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat on WhatsApp"
                data-testid="mobile-bar-whatsapp-btn"
                className="group flex-1 inline-flex items-center justify-center gap-2 h-12 bg-[#25D366] text-white border border-[#25D366] hover:bg-[#1ebd5b] hover:border-[#1ebd5b] transition-colors duration-200 font-caps text-[0.7rem] tracking-[0.22em] font-semibold active:scale-[0.98]"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="18" height="18" aria-hidden="true">
                  <path fill="currentColor" d="M19.11 17.205c-.372 0-1.088 1.39-1.518 1.39a.63.63 0 0 1-.315-.1c-.802-.402-1.504-.817-2.163-1.447-.545-.516-1.146-1.29-1.46-1.963a.426.426 0 0 1-.073-.215c0-.33.99-.945.99-1.49 0-.143-.73-2.09-.832-2.335-.143-.372-.214-.487-.6-.487-.187 0-.36-.043-.53-.043-.302 0-.53.115-.746.315-.688.645-1.032 1.318-1.06 2.264v.114c-.015.99.472 1.977 1.017 2.78 1.23 1.82 2.506 3.41 4.554 4.34.616.287 2.035.945 2.722.945.817 0 2.15-.515 2.478-1.318.144-.36.144-.673.044-.974-.13-.27-2.32-1.78-2.578-1.78zM16.42 26.99c-1.748 0-3.469-.46-4.974-1.346l-3.58.94.96-3.475a9.785 9.785 0 0 1-1.346-4.96c0-5.435 4.42-9.855 9.855-9.855 5.435 0 9.855 4.42 9.855 9.855 0 5.435-4.42 9.84-9.77 9.84zm0-21.708c-6.547 0-11.853 5.305-11.853 11.853 0 2.092.546 4.13 1.59 5.92L4 30l7.057-2.292a11.872 11.872 0 0 0 5.605 1.42h.005c6.55 0 11.886-5.328 11.886-11.875 0-3.176-1.232-6.157-3.474-8.4-2.244-2.252-5.225-3.572-8.4-3.572z" />
                </svg>
                WhatsApp
              </a>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
