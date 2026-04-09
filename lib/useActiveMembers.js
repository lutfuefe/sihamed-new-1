'use client';

import { useEffect, useState } from 'react';

const DEFAULT_ACTIVE_MEMBERS = 478;

export function useActiveMembers(fallback = DEFAULT_ACTIVE_MEMBERS) {
  const [activeMembers, setActiveMembers] = useState(fallback);

  useEffect(() => {
    let cancelled = false;

    async function loadStats() {
      try {
        const response = await fetch('/api/site-stats', { cache: 'no-store' });
        if (!response.ok) return;
        const data = await response.json();
        const nextValue = Number(data?.activeMembers);
        if (!cancelled && Number.isInteger(nextValue) && nextValue >= 0) {
          setActiveMembers(nextValue);
        }
      } catch {
        // Fallback değeri korunur.
      }
    }

    loadStats();
    return () => {
      cancelled = true;
    };
  }, []);

  return activeMembers;
}
