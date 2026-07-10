'use client';

import { useEffect } from 'react';

export function PWAInstallPrompt() {
  useEffect(() => {
    const isProduction = process.env.NODE_ENV === 'production';

    if ('serviceWorker' in navigator) {
      if (isProduction) {
        navigator.serviceWorker.register('/sw.js').catch((error) => {
          console.log('Service Worker registration failed:', error);
        });
      } else {
        navigator.serviceWorker.getRegistrations().then((registrations) => {
          registrations.forEach((registration) => {
            if (registration.active?.scriptURL.endsWith('/sw.js')) {
              registration.unregister();
            }
          });
        });
      }
    }

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  return null;
}
