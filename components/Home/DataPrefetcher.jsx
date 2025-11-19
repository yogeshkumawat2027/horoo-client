"use client";
import { useEffect } from 'react';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export default function DataPrefetcher() {
  useEffect(() => {
    let cancelled = false;
    const TS_KEY = 'horoo:prefetch_timestamp';

    async function prefetchAll() {
      try {
        const ts = localStorage.getItem(TS_KEY);
        const MAX_AGE = 24 * 60 * 60 * 1000; // 24 hours
        if (ts && (Date.now() - new Date(ts).getTime()) < MAX_AGE) {
          console.log('DataPrefetcher: cache fresh, skipping prefetch');
          return;
        }

        console.log('DataPrefetcher: starting background prefetch');

        // Rooms
        try {
          const res = await fetch(`${API}/rooms`);
          if (res.ok) {
            const data = await res.json();
            localStorage.setItem('horoo:rooms', JSON.stringify(data.rooms || []));
          }
        } catch (e) {
          console.error('DataPrefetcher: rooms fetch failed', e);
        }

        // States
        let states = [];
        try {
          const res = await fetch(`${API}/states`);
          if (res.ok) {
            const data = await res.json();
            states = data.states || data || [];
            localStorage.setItem('horoo:states', JSON.stringify(states));
          }
        } catch (e) {
          console.error('DataPrefetcher: states fetch failed', e);
        }

        // Cities (accumulate progressively)
        const allCities = [];
        for (const s of states) {
          if (cancelled) break;
          try {
            const res = await fetch(`${API}/cities/${s._id}`);
            if (res.ok) {
              const data = await res.json();
              const cities = data.cities || data || [];
              // annotate with state id for easy filtering
              cities.forEach(c => { c.stateId = s._id; });
              allCities.push(...cities);
              localStorage.setItem('horoo:cities', JSON.stringify(allCities));
            }
          } catch (e) {
            console.error(`DataPrefetcher: cities fetch for state ${s._id} failed`, e);
          }
        }

        // Areas (accumulate progressively)
        const allAreas = [];
        for (const c of allCities) {
          if (cancelled) break;
          try {
            const res = await fetch(`${API}/areas/${c._id}`);
            if (res.ok) {
              const data = await res.json();
              const areas = data.areas || data || [];
              areas.forEach(a => { a.cityId = c._id; });
              allAreas.push(...areas);
              localStorage.setItem('horoo:areas', JSON.stringify(allAreas));
            }
          } catch (e) {
            console.error(`DataPrefetcher: areas fetch for city ${c._id} failed`, e);
          }
        }

        localStorage.setItem(TS_KEY, new Date().toISOString());
        console.log('DataPrefetcher: prefetch finished');
      } catch (err) {
        console.error('DataPrefetcher: unexpected error', err);
      }
    }

    prefetchAll();

    return () => {
      cancelled = true;
    };
  }, []);

  return null;
}
