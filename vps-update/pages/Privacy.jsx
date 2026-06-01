import React from 'react';
import PageHero from '../components/PageHero';

const SECTIONS = [
  {
    n: '1',
    title: 'Personal data we collect',
    body: ['We may collect personal data that you voluntarily provide through website forms, enquiry forms, callback requests, information requests, admissions communications or similar interactions. This may include:'],
    bullets: [
      'Your name',
      'Email address',
      'Phone number',
      'City, location or other contact details',
      'Professional, educational or program-interest information that you choose to provide',
      'Preferred program, course or area of interest',
      'Message content submitted through forms',
      'Preferred time or method of contact',
      'Communications with our admissions or enrolment team',
      'Internal notes made by our admissions and enrolment staff while responding to your enquiry',
    ],
    after: 'We may also collect limited technical and usage information through analytics tools, including Google Analytics. This may include browser type, device information, approximate location, pages visited, referral source, session information and similar website usage data. We do not collect payment card information through this website. Payments, if applicable, are handled separately and off-site through admissions and enrolment processes.',
  },
  {
    n: '2',
    title: 'How we use personal data',
    body: ['We may use personal data for the following purposes:'],
    bullets: [
      'To respond to enquiries, information requests and callback requests',
      'To contact prospective learners by email, phone, SMS or WhatsApp',
      'To provide information about programs, admissions, enrolment and related educational services',
      'To manage admissions and enrolment communications',
      'To maintain CRM records and internal follow-up notes',
      'To improve the website, user experience and marketing effectiveness',
      'To analyse website traffic and engagement through tools such as Google Analytics',
      'To comply with legal, regulatory, accounting and business record-keeping obligations',
      'To protect our rights, users, systems and services',
    ],
    after: 'By submitting a form or enquiry through the website, you acknowledge that we may contact you in relation to your request using the contact details you provide.',
  },
  {
    n: '3',
    title: 'CRM and admissions records',
    body: ['We may use CRM and admissions-management tools to organise enquiry information, follow-up activity and admissions communications. The data stored in these systems is limited to information submitted by prospective learners, related communication records and notes made by our admissions and enrolment staff while attempting outreach or responding to enquiries.'],
  },
  {
    n: '4',
    title: 'Cookies and analytics',
    body: ['We use Google Analytics and similar technologies to understand how visitors use our website. These tools may use cookies or similar identifiers to collect usage information. You can manage or disable cookies through your browser settings. Disabling cookies may affect some website functionality.'],
  },
  {
    n: '5',
    title: 'How we share personal data',
    body: ['We may share personal data with:'],
    bullets: [
      'Admissions, enrolment and support personnel working with us',
      'CRM, website hosting, analytics, email, communications and technology service providers',
      'Professional advisers, auditors or consultants where necessary',
      'Government, regulatory, law enforcement or legal authorities where required by law',
      'Other parties where necessary to protect our rights, users, systems or services',
    ],
    after: 'We do not sell personal data.',
  },
  {
    n: '6',
    title: 'Storage and processing',
    body: ['Personal data may be stored or processed in India or in other jurisdictions where our service providers operate. Where we use third-party service providers, we take reasonable steps to ensure that personal data is handled appropriately and in accordance with applicable law.'],
  },
  {
    n: '7',
    title: 'Retention',
    body: ['We retain enquiry and admissions-related data for as long as necessary to respond to the request, manage admissions, maintain business records and comply with legal obligations. We may retain limited records where necessary for audit, legal, regulatory, dispute-resolution or legitimate business purposes.'],
  },
  {
    n: '8',
    title: 'Your rights',
    body: ['Subject to applicable law, you may request access to information about your personal data, correction of inaccurate or incomplete personal data, deletion of personal data where applicable, withdrawal of consent where processing is based on consent and grievance redressal. To exercise these rights, please contact us using the details below. We may need to verify your identity before acting on certain requests.'],
  },
  {
    n: '9',
    title: 'Marketing and follow-up communications',
    body: ['If you submit an enquiry, callback request or information request, we may contact you about relevant programs and educational services by email, phone, SMS or WhatsApp. You may ask us to stop sending promotional or follow-up communications at any time by contacting us at epsilonexeceduc@gmail.com. We may still send necessary administrative or transactional communications where required.'],
  },
  {
    n: '10',
    title: 'Children',
    body: ['This website and our services are intended for working professionals and are not directed at children or individuals under 18 years of age. We do not knowingly collect personal data from children through this website.'],
  },
  {
    n: '11',
    title: 'Security',
    body: ['We use reasonable administrative, technical and organisational measures to protect personal data. However, no website, system or transmission method is completely secure. You should avoid submitting unnecessary sensitive information through website forms.'],
  },
  {
    n: '12',
    title: 'Third-party links',
    body: ['Our website may contain links to third-party websites, tools or services. We are not responsible for the privacy practices, content or security of third-party websites. You should review their privacy policies before using them.'],
  },
  {
    n: '13',
    title: 'Grievance Officer and contact details',
    body: ['For privacy questions, data requests or grievances, you may contact:'],
    contact: { role: 'Grievance Officer', name: 'EPSILON EXECUTIVE EDUCATION PRIVATE LIMITED', email: 'epsilonexeceduc@gmail.com' },
  },
  {
    n: '14',
    title: 'Changes to this Privacy Policy',
    body: ['We may update this Privacy Policy from time to time. The updated version will be posted on this page with a revised "Last updated" date. Continued use of the website after updates means that you acknowledge the revised Privacy Policy.'],
  },
];

export default function Privacy() {
  return (
    <div>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        subtitle="How we collect, use, store and share personal data through this website."
        pathPrefix="legal.privacy.hero"
      />

      <section data-cms-section="privacy-content" className="bg-cream py-10 md:py-16">
        <div className="container-x max-w-4xl">
          <p className="font-caps text-[0.6rem] text-gold tracking-[0.22em] mb-8">Last updated: June 1, 2026</p>

          <p className="font-editorial text-navy/85 text-[1.1rem] md:text-[1.15rem] leading-relaxed mb-10">
            This Privacy Policy explains how <strong>EPSILON EXECUTIVE EDUCATION PRIVATE LIMITED</strong>, operating through <a href="https://epsilonexec.com/" className="text-gold underline">https://epsilonexec.com/</a> ("Epsilon", "we", "us" or "our"), collects, uses, stores and shares personal data through this website and related enquiry, admissions and enrolment activities. This website is intended for working professionals in India who are interested in non-degree professional learning, training, upskilling, executive education and related educational services.
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
                    {s.contact.role && <p className="font-caps text-[0.6rem] text-gold tracking-[0.22em] mb-1.5">{s.contact.role}</p>}
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
