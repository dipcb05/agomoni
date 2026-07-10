'use client';

import { useEffect } from 'react';

export function PWAInstallPrompt() {
  useEffect(() => {
    // Register service worker only
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch((error) => {
        console.log('Service Worker registration failed:', error);
      });
    }

    // Prevent the install prompt from showing
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  // Component returns null - just handles service worker registration
  return null;
}
