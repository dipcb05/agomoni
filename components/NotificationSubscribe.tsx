'use client'

import { useState } from 'react'
import { Bell, BellRing } from 'lucide-react'

declare global {
  interface Window {
    firebase?: {
      initializeApp: (config: Record<string, string>) => unknown
      apps: unknown[]
      messaging: () => {
        getToken: (options: {
          vapidKey: string
          serviceWorkerRegistration: ServiceWorkerRegistration
        }) => Promise<string | null>
      }
    }
  }
}

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || '',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || '',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || '',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '',
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || '',
}

const loadScript = (src: string) =>
  new Promise<void>((resolve, reject) => {
    const existingScript = document.querySelector<HTMLScriptElement>(`script[src="${src}"]`)

    if (existingScript) {
      resolve()
      return
    }

    const script = document.createElement('script')
    script.src = src
    script.async = true
    script.onload = () => resolve()
    script.onerror = () => reject(new Error(`Unable to load ${src}`))
    document.head.appendChild(script)
  })

const hasFirebaseConfig = () =>
  Boolean(
    firebaseConfig.apiKey &&
      firebaseConfig.projectId &&
      firebaseConfig.messagingSenderId &&
      firebaseConfig.appId &&
      process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY
  )

export function NotificationSubscribe() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'enabled' | 'unsupported' | 'error'>(
    'idle'
  )

  const enableNotifications = async () => {
    if (!hasFirebaseConfig() || !('Notification' in window) || !('serviceWorker' in navigator)) {
      setStatus('unsupported')
      return
    }

    setStatus('loading')

    try {
      const permission = await Notification.requestPermission()

      if (permission !== 'granted') {
        setStatus('unsupported')
        return
      }

      await loadScript('https://www.gstatic.com/firebasejs/10.14.1/firebase-app-compat.js')
      await loadScript('https://www.gstatic.com/firebasejs/10.14.1/firebase-messaging-compat.js')

      if (!window.firebase) {
        throw new Error('Firebase messaging is not available')
      }

      if (!window.firebase.apps.length) {
        window.firebase.initializeApp(firebaseConfig)
      }

      const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js')
      const token = await window.firebase.messaging().getToken({
        vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY || '',
        serviceWorkerRegistration: registration,
      })

      if (!token) {
        throw new Error('Firebase did not return a messaging token')
      }

      const response = await fetch('/api/notifications/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      })

      if (!response.ok) {
        throw new Error('Unable to save notification subscription')
      }

      setStatus('enabled')
    } catch (error) {
      console.error('Notification subscription failed', error)
      setStatus('error')
    }
  }

  return (
    <div className="fixed bottom-8 left-8 z-50 max-w-[calc(100vw-8rem)]">
      <button
        type="button"
        onClick={enableNotifications}
        disabled={status === 'loading' || status === 'enabled'}
        className="group flex items-center gap-2 rounded-full border border-primary/30 bg-card/70 px-4 py-3 text-sm font-medium text-primary shadow-lg backdrop-blur-md transition-colors hover:border-primary hover:bg-card/90 disabled:cursor-not-allowed disabled:opacity-80"
        aria-live="polite"
      >
        {status === 'enabled' ? <BellRing className="h-5 w-5" /> : <Bell className="h-5 w-5" />}
        <span>
          {status === 'loading' && 'Enabling...'}
          {status === 'enabled' && 'Reminders on'}
          {status === 'unsupported' && 'Notifications unavailable'}
          {status === 'error' && 'Try reminders again'}
          {status === 'idle' && 'Puja reminders'}
        </span>
      </button>
    </div>
  )
}
