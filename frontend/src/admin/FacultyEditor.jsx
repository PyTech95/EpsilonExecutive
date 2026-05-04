import React, { useState } from 'react';
import CollectionEditor from './CollectionEditor';

const leadSchema = [
  { key: 'slug', label: 'Slug' },
  { key: 'name', label: 'Name' },
  { key: 'role', label: 'Role' },
  { key: 'badge', label: 'Badge (Lead Instructor)' },
  { key: 'heroHeading', label: 'Hero Heading ("Academic Excellence")' },
  { key: 'heroBlurb', label: 'Hero Blurb', type: 'textarea' },
  { key: 'credentials', label: 'Credentials (NYU / Columbia)', type: 'credentials' },
  { key: 'affiliations', label: 'Affiliations', type: 'list-lines' },
  { key: 'image', label: 'Photo URL' },
  { key: 'bio', label: 'Bio paragraph 1', type: 'textarea' },
  { key: 'bio2', label: 'Bio paragraph 2', type: 'textarea' },
  { key: 'bio3', label: 'Bio paragraph 3', type: 'textarea' },
  { key: 'tags', label: 'Tags', type: 'tags' },
  { key: 'order', label: 'Order', type: 'number' },
];

const guestSchema = [
  { key: 'slug', label: 'Slug' },
  { key: 'name', label: 'Name' },
  { key: 'expertise', label: 'Expertise Label', help: 'Short label under portrait' },
  { key: 'role', label: 'Role / Title' },
  { key: 'image', label: 'Photo URL' },
  { key: 'bio', label: 'Bio', type: 'textarea' },
  { key: 'tags', label: 'Tags', type: 'tags' },
  { key: 'order', label: 'Order', type: 'number' },
];

export default function FacultyEditor() {
  const [tab, setTab] = useState('lead');
  return (
    <div>
      <div className="flex gap-3 mb-8 border-b border-navy/10">
        {['lead', 'guest'].map((t) => (
          <button key={t} onClick={() => setTab(t)}
                  className={`font-caps text-[0.65rem] tracking-[0.22em] px-4 py-3 border-b-2 ${
                    tab === t ? 'border-gold text-gold' : 'border-transparent text-navy/60 hover:text-navy'
                  }`}>
            {t === 'lead' ? 'Lead Faculty' : 'Guest Lecturers'}
          </button>
        ))}
      </div>
      {tab === 'lead' ? (
        <CollectionEditor
          title="Lead Faculty"
          path="lead-faculty"
          schema={leadSchema}
          displayKey="name"
          newItemDefaults={{
            slug: '', name: '', role: '', badge: 'Lead Instructor',
            heroHeading: 'Academic Excellence', heroBlurb: '',
            credentials: [], affiliations: [], image: '', bio: '', bio2: '', tags: [], order: 999,
          }}
        />
      ) : (
        <CollectionEditor
          title="Guest Lecturers"
          path="guest-lecturers"
          schema={guestSchema}
          displayKey="name"
          newItemDefaults={{
            slug: '', name: '', expertise: '', role: '', image: '', bio: '', tags: [], order: 999,
          }}
        />
      )}
    </div>
  );
}
