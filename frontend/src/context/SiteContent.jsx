import React, { createContext, useContext, useEffect, useState } from 'react';
import { api } from '../admin/api';
import * as mock from '../mock';

const Ctx = createContext(null);

/**
 * Fetch all site content from backend on mount.
 * Falls back to static mock data on any fetch failure so the site never goes blank.
 */
export function SiteContentProvider({ children }) {
  const [state, setState] = useState({
    loaded: false,
    home: null,
    beliefs: [],
    programs: mock.programs,
    cohorts: mock.cohorts,
    testimonials: mock.testimonials,
    leadFaculty: mock.leadFaculty,
    guestLecturers: mock.guestLecturers,
    insights: mock.insights,
    events: mock.events,
    logoUrl: mock.LOGO_URL,
    navbar: null,
    footer: null,
  });

  useEffect(() => {
    let cancel = false;
    (async () => {
      try {
        const [home, beliefs, programs, cohorts, testimonials, leadFaculty, guestLecturers, insights, events] =
          await Promise.all([
            api.getHome().catch(() => null),
            api.getBeliefs().catch(() => mock.beliefs),
            api.list('programs').catch(() => mock.programs),
            api.list('cohorts').catch(() => mock.cohorts),
            api.list('testimonials').catch(() => mock.testimonials),
            api.list('lead-faculty').catch(() => mock.leadFaculty),
            api.list('guest-lecturers').catch(() => mock.guestLecturers),
            api.list('insights').catch(() => mock.insights),
            api.list('events').catch(() => mock.events),
          ]);
        if (cancel) return;
        setState({
          loaded: true,
          home: home && Object.keys(home).length ? home : null,
          beliefs: beliefs?.length ? beliefs : mock.beliefs,
          programs: programs?.length ? programs : mock.programs,
          cohorts: cohorts?.length ? cohorts : mock.cohorts,
          testimonials: testimonials?.length ? testimonials : mock.testimonials,
          leadFaculty: leadFaculty?.length ? leadFaculty : mock.leadFaculty,
          guestLecturers: guestLecturers?.length ? guestLecturers : mock.guestLecturers,
          insights: insights?.length ? insights : mock.insights,
          events: events?.length ? events : mock.events,
          logoUrl: home?.logoUrl || mock.LOGO_URL,
          navbar: home?.navbar || null,
          footer: home?.footer || null,
        });
      } catch {
        setState((s) => ({ ...s, loaded: true }));
      }
    })();
    return () => { cancel = true; };
  }, []);

  return <Ctx.Provider value={state}>{children}</Ctx.Provider>;
}

export const useSiteContent = () => useContext(Ctx);
