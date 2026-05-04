import React from 'react';
import CollectionEditor from './CollectionEditor';

const schema = [
  { key: 'slug', label: 'Slug (URL id)', help: 'e.g. applied-ai-ml' },
  { key: 'title', label: 'Full Title' },
  { key: 'subtitle', label: 'Short title (Subtitle)' },
  { key: 'tagline', label: 'Tagline' },
  { key: 'level', label: 'Level key', help: 'mid / senior' },
  { key: 'levelLabel', label: 'Level label' },
  { key: 'weeks', label: 'Weeks', type: 'number' },
  { key: 'audience', label: 'Audience' },
  { key: 'fee', label: 'Fee' },
  { key: 'nextCohort', label: 'Next cohort' },
  { key: 'image', label: 'Image URL' },
  { key: 'short', label: 'Short description', type: 'textarea' },
  { key: 'long', label: 'Long description', type: 'textarea' },
  { key: 'outcomes', label: 'Outcomes', type: 'list-lines' },
  { key: 'curriculum', label: 'Week-by-Week Curriculum', type: 'curriculum' },
  { key: 'modules', label: 'Modules (detailed cards)', type: 'modules' },
  { key: 'faqs', label: 'FAQs', type: 'faqs' },
  { key: 'featured', label: 'Featured on home', type: 'boolean' },
  { key: 'order', label: 'Order', type: 'number' },
];

export default function ProgramsEditor() {
  return (
    <CollectionEditor
      title="Programmes"
      path="programs"
      schema={schema}
      displayKey="subtitle"
      newItemDefaults={{
        slug: '', title: '', subtitle: '', tagline: '', level: 'mid', levelLabel: 'Mid Career',
        weeks: 12, audience: '', fee: '', nextCohort: '', image: '', short: '', long: '',
        outcomes: [], curriculum: [], modules: [], faqs: [], featured: false, order: 999,
      }}
    />
  );
}
