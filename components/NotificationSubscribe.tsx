'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
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

interface NotificationPromptState {
  firstVisitedAt: string
  lastPromptedAt?: string
  promptCount: number
  deniedAt?: string
}

const PROMPT_DB_NAME = 'agomoni-notifications'
const PROMPT_STORE_NAME = 'prompt-state'
const PROMPT_STATE_KEY = 'fcm-permission'

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

const openPromptDatabase = () =>
  new Promise<IDBDatabase>((resolve, reject) => {
    const request = indexedDB.open(PROMPT_DB_NAME, 1)

    request.onupgradeneeded = () => {
      request.result.createObjectStore(PROMPT_STORE_NAME)
    }
    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })

const readPromptState = async () => {
  const database = await openPromptDatabase()

  return new Promise<NotificationPromptState | undefined>((resolve, reject) => {
    const transaction = database.transaction(PROMPT_STORE_NAME, 'readonly')
    const store = transaction.objectStore(PROMPT_STORE_NAME)
    const request = store.get(PROMPT_STATE_KEY)

    request.onsuccess = () => resolve(request.result as NotificationPromptState | undefined)
    request.onerror = () => reject(request.error)
    transaction.oncomplete = () => database.close()
  })
}

const writePromptState = async (state: NotificationPromptState) => {
  const database = await openPromptDatabase()

  return new Promise<void>((resolve, reject) => {
    const transaction = database.transaction(PROMPT_STORE_NAME, 'readwrite')
    const store = transaction.objectStore(PROMPT_STORE_NAME)
    const request = store.put(state, PROMPT_STATE_KEY)

    request.onerror = () => reject(request.error)
    transaction.oncomplete = () => {
      database.close()
      resolve()
    }
    transaction.onerror = () => reject(transaction.error)
  })
}

const trackPromptAttempt = async (permission: NotificationPermission) => {
  const now = new Date().toISOString()
  const currentState = await readPromptState()

  await writePromptState({
    firstVisitedAt: currentState?.firstVisitedAt || now,
    lastPromptedAt: permission === 'default' ? now : currentState?.lastPromptedAt,
    promptCount: permission === 'default' ? (currentState?.promptCount || 0) + 1 : currentState?.promptCount || 0,
    deniedAt: permission === 'denied' ? now : currentState?.deniedAt,
  })
}

const safelyTrackPromptAttempt = async (permission: NotificationPermission) => {
  try {
    await trackPromptAttempt(permission)
  } catch (error) {
    console.error('Unable to track notification prompt state', error)
  }
}

export function NotificationSubscribe() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'enabled' | 'unsupported' | 'error'>(
    'idle'
  )
  const autoPromptStarted = useRef(false)

  const enableNotifications = useCallback(async () => {
    if (!hasFirebaseConfig() || !('Notification' in window) || !('serviceWorker' in navigator)) {
      setStatus('unsupported')
      return
    }

    if (Notification.permission === 'denied') {
      await safelyTrackPromptAttempt('denied')
      setStatus('unsupported')
      return
    }

    setStatus('loading')

    try {
      await safelyTrackPromptAttempt(Notification.permission)
      const permission = await Notification.requestPermission()

      if (permission === 'denied') {
        await safelyTrackPromptAttempt('denied')
      }

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
  }, [])

  useEffect(() => {
    if (autoPromptStarted.current || !hasFirebaseConfig() || !('Notification' in window)) {
      return
    }

    if (Notification.permission === 'denied') {
      autoPromptStarted.current = true
      void safelyTrackPromptAttempt('denied')
      setStatus('unsupported')
      return
    }

    if (Notification.permission === 'granted') {
      autoPromptStarted.current = true
      void enableNotifications()
      return
    }

    autoPromptStarted.current = true
    void enableNotifications()
  }, [enableNotifications])

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
