import React from 'react';
import PageHero from '../components/PageHero';

const SECTIONS = [
  {
    n: '1',
    title: 'About Epsilon',
    body: [
      'Epsilon provides non-degree professional learning, training, upskilling, executive education and related educational services for working professionals. The website provides information about our programmes, services, admissions process and related offerings. Unless expressly stated otherwise, our programmes do not constitute university degrees, statutory qualifications or regulated professional licences.',
    ],
  },
  {
    n: '2',
    title: 'Website information',
    body: [
      'The information on this website is provided for general informational and promotional purposes. We try to keep website information accurate and current, but we do not guarantee that all information will always be complete, accurate or up to date. Programme details, curriculum, faculty, schedules, fees, availability, admissions criteria and other information may change from time to time.',
    ],
  },
  {
    n: '3',
    title: 'Enquiries and admissions',
    body: [
      'Submitting a form, enquiry, callback request or information request does not guarantee admission, enrolment, seat availability, pricing, scholarship eligibility or access to any programme. Admissions, enrolment, fees, payment arrangements and programme participation are subject to separate communications, documentation, eligibility review and applicable terms provided during the admissions or enrolment process.',
    ],
  },
  {
    n: '4',
    title: 'Payments',
    body: [
      'Payments are not processed directly through this website. Any applicable fees, payment timelines or payment methods will be communicated separately by our admissions or enrolment team. You are responsible for reviewing all applicable payment and enrolment terms before making any payment.',
    ],
  },
  {
    n: '5',
    title: 'Refunds and cancellations',
    body: [
      'Refunds and cancellations are handled case by case. Any refund decision may depend on the relevant programme, timing of the request, services already provided, administrative processing and the applicable admissions or enrolment terms. Submitting a refund request does not guarantee that a refund will be approved.',
    ],
  },
  {
    n: '6',
    title: 'Communications',
    body: [
      'When you submit an enquiry, callback request or information request, you agree that we may contact you using the details you provide, including by email, phone, SMS or WhatsApp, in relation to your enquiry, admissions, enrolment or relevant educational services. You may ask us to stop promotional or follow-up communications by contacting epsilonexeceduc@gmail.com.',
    ],
  },
  {
    n: '7',
    title: 'User responsibilities',
    body: ['You agree not to:'],
    bullets: [
      'Use the website for unlawful, misleading, fraudulent or harmful purposes',
      'Submit false, incomplete or misleading information',
      'Attempt to interfere with the security, functionality or availability of the website',
      'Copy, scrape, reproduce or misuse website content without permission',
      'Upload or transmit harmful code, spam or malicious content',
      'Misrepresent your identity, affiliation or eligibility',
    ],
    after: 'We may restrict or suspend access to the website where we believe these Terms have been violated.',
  },
  {
    n: '8',
    title: 'Intellectual property',
    body: [
      'All website content, including text, graphics, logos, design, programme descriptions, learning materials, images, videos, documents and other materials, is owned by Epsilon or its licensors unless otherwise stated. You may view and use website content for personal, non-commercial informational purposes only. You may not copy, reproduce, modify, distribute, publish, sell or exploit any website content without our prior written permission.',
    ],
  },
  {
    n: '9',
    title: 'Programme materials',
    body: [
      'Where you enrol in or access any programme, course, workshop, session, recording, document, assessment, certificate, digital badge or related learning material, additional programme-specific terms may apply. Unless expressly authorised, programme materials are for your personal learning use only and may not be shared, resold, copied, uploaded, recorded, distributed or used for commercial purposes.',
    ],
  },
  {
    n: '10',
    title: 'Certificates and outcomes',
    body: [
      'We may issue certificates of completion, certificates of participation, skill credentials, digital badges or other non-degree recognitions where applicable and subject to programme requirements. We do not guarantee employment, promotion, salary increase, admission to any further programme or any specific professional outcome.',
    ],
  },
  {
    n: '11',
    title: 'Third-party services and links',
    body: [
      'The website may contain links to third-party websites, platforms, tools or services. We do not control and are not responsible for third-party content, policies, availability, security or practices. Your use of third-party services may be governed by their own terms and policies.',
    ],
  },
  {
    n: '12',
    title: 'Privacy',
    body: [
      'Our collection and use of personal data is described in our Privacy Policy. By using the website or submitting information through it, you acknowledge that your personal data will be handled in accordance with that Privacy Policy.',
    ],
  },
  {
    n: '13',
    title: 'Disclaimer',
    body: [
      'The website and its content are provided on an "as is" and "as available" basis. To the fullest extent permitted by law, we disclaim warranties of accuracy, completeness, fitness for a particular purpose, uninterrupted availability and non-infringement. Nothing on this website should be treated as legal, financial, career, professional licensing or regulatory advice.',
    ],
  },
  {
    n: '14',
    title: 'Limitation of liability',
    body: [
      'To the fullest extent permitted by law, Epsilon will not be liable for any indirect, incidental, consequential, special, punitive or exemplary loss or damage arising from or related to your use of the website, reliance on website content, inability to access the website or interactions with third-party services. Nothing in these Terms excludes liability that cannot be excluded under applicable law.',
    ],
  },
  {
    n: '15',
    title: 'Indemnity',
    body: [
      'You agree to indemnify and hold harmless Epsilon, its officers, employees, consultants, service providers and affiliates from claims, losses, liabilities, damages, costs and expenses arising from your misuse of the website, breach of these Terms or violation of applicable law.',
    ],
  },
  {
    n: '16',
    title: 'Changes to these Terms',
    body: [
      'We may update these Terms of Use from time to time. The updated version will be posted on this page with a revised "Last updated" date. Continued use of the website after updates means that you accept the revised Terms.',
    ],
  },
  {
    n: '17',
    title: 'Governing law and jurisdiction',
    body: [
      'These Terms are governed by the laws of India. Subject to applicable law, the courts at New Delhi, India will have jurisdiction over disputes arising from or relating to these Terms, the website or related services.',
    ],
  },
  {
    n: '18',
    title: 'Contact',
    body: ['For questions about these Terms, please contact:'],
    contact: { name: 'EPSILON EXECUTIVE EDUCATION PRIVATE LIMITED', email: 'epsilonexeceduc@gmail.com' },
  },
];

export default function Terms() {
  return (
    <div>
      <PageHero
        eyebrow="Legal"
        title="Terms of Use"
        subtitle="The terms that govern your access to and use of this website."
        pathPrefix="legal.terms.hero"
      />

      <section data-cms-section="terms-content" className="bg-cream py-10 md:py-16">
        <div className="container-x max-w-4xl">
          <p className="font-caps text-[0.6rem] text-gold tracking-[0.22em] mb-8">Last updated: June 1, 2026</p>

          <p className="font-editorial text-navy/85 text-[1.1rem] md:text-[1.15rem] leading-relaxed mb-10">
            These Terms of Use govern your access to and use of <a href="https://epsilonexec.com/" className="text-gold underline">https://epsilonexec.com/</a> and related website content operated by <strong>EPSILON EXECUTIVE EDUCATION PRIVATE LIMITED</strong> ("Epsilon", "we", "us" or "our"). By accessing or using this website, you agree to these Terms of Use. If you do not agree, you should not use this website.
          </p>

          <div className="space-y-10">
            {SECTIONS.map((s) => (
              <article key={s.n} className="border-l-2 border-gold/40 pl-5 md:pl-7">
                <p className="font-caps text-[0.6rem] text-gold tracking-[0.22em] mb-2">Section {String(s.n).padStart(2, '0')}</p>
                <h2 className="font-display text-navy text-[1.4rem] md:text-[1.7rem] leading-tight mb-4">{s.title}</h2>
                {s.body.map((p, i) => (
                  <p key={i} className="font-editorial text-navy/85 text-[1.05rem] leading-relaxed mb-3">{p}</p>
                ))}
                {s.bullets && (
                  <ul className="list-disc pl-5 space-y-2 my-4 font-editorial text-navy/85 text-[1.05rem] leading-relaxed">
                    {s.bullets.map((b, i) => <li key={i}>{b}</li>)}
                  </ul>
                )}
                {s.after && <p className="font-editorial text-navy/85 text-[1.05rem] leading-relaxed mt-3">{s.after}</p>}
                {s.contact && (
                  <div className="mt-4 bg-bone border border-navy/10 p-5">
                    <p className="font-display text-navy text-[1rem] leading-tight">{s.contact.name}</p>
                    <p className="font-editorial text-navy/75 mt-1.5">
                      Email: <a href={`mailto:${s.contact.email}`} className="text-gold hover:underline">{s.contact.email}</a>
                    </p>
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
