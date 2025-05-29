"use client"
import { useEffect } from 'react'

export default function TrackQueryParams() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const source = params.get('source');
      const term = params.get('term');
      if (source) localStorage.setItem('paynix_source', source);
      if (term) localStorage.setItem('paynix_term', term);
    }
  }, []);
  return null;
} 