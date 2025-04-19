'use client';

import { useEffect } from 'react';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // No more warning

export default function BootstrapClient() {
  useEffect(() => {
    console.log('Bootstrap bundle loaded');
  }, []);

  return null;
}



