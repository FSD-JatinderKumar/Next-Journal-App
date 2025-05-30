'use client';

import { useEffect } from 'react';

export default function BootstrapClient() {
  useEffect(() => {
    // @ts-ignore - no types for bootstrap.bundle.min.js
    import('bootstrap/dist/js/bootstrap.bundle.min.js')
      .then(() => {
        console.log('✅ Bootstrap JS loaded on client');
      })
      .catch((err) => {
        console.error('❌ Failed to load Bootstrap JS:', err);
      });
  }, []);

  return null;
}
