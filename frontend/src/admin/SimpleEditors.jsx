import React from 'react';
import CollectionEditor from './CollectionEditor';

export function TestimonialsEditor() {
  return (
    <CollectionEditor
      title="Testimonials"
      path="testimonials"
      displayKey="name"
      schema={[
        { key: 'quote', label: 'Quote', type: 'textarea' },
        { key: 'name', label: 'Name' },
        { key: 'role', label: 'Role / Title' },
        { key: 'avatar', label: 'Avatar', type: 'image' },
        { key: 'order', label: 'Order', type: 'number' },
      ]}
      newItemDefaults={{ quote: '', name: '', role: '', avatar: '', order: 999 }}
    />
  );
}

export function CohortsEditor() {
  return (
    <CollectionEditor
      title="Cohorts"
      path="cohorts"
      displayKey="label"
      schema={[
        { key: 'label', label: 'Label (Cohort 04)' },
        { key: 'date', label: 'Date' },
        { key: 'status', label: 'Status' },
        { key: 'order', label: 'Order', type: 'number' },
      ]}
      newItemDefaults={{ label: '', date: '', status: 'coming soon', order: 999 }}
    />
  );
}

export function InsightsEditor() {
  return (
    <CollectionEditor
      title="Insights"
      path="insights"
      displayKey="title"
      schema={[
        { key: 'slug', label: 'Slug' },
        { key: 'title', label: 'Title' },
        { key: 'category', label: 'Category' },
        { key: 'author', label: 'Author' },
        { key: 'date', label: 'Date' },
        { key: 'readTime', label: 'Read time' },
        { key: 'image', label: 'Cover image', type: 'image' },
        { key: 'excerpt', label: 'Excerpt', type: 'textarea' },
        { key: 'body', label: 'Body (paragraphs)', type: 'list-lines' },
        { key: 'featured', label: 'Featured', type: 'boolean' },
        { key: 'order', label: 'Order', type: 'number' },
      ]}
      newItemDefaults={{ slug: '', title: '', category: '', author: '', date: '', readTime: '5 min read', image: '', excerpt: '', body: [], featured: false, order: 999 }}
    />
  );
}

export function EventsEditor() {
  return (
    <CollectionEditor
      title="Events"
      path="events"
      displayKey="title"
      schema={[
        { key: 'type', label: 'Type' },
        { key: 'title', label: 'Title' },
        { key: 'description', label: 'Description', type: 'textarea' },
        { key: 'date', label: 'Date' },
        { key: 'time', label: 'Time' },
        { key: 'duration', label: 'Duration' },
        { key: 'platform', label: 'Platform' },
        { key: 'cta', label: 'CTA Text' },
        { key: 'image', label: 'Cover image', type: 'image' },
        { key: 'order', label: 'Order', type: 'number' },
      ]}
      newItemDefaults={{ type: 'Live Webinar', title: '', description: '', date: '', time: '', duration: '60 min', platform: 'Zoom', cta: 'Register', image: '', order: 999 }}
    />
  );
}
