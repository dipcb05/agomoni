import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { PWAInstallPrompt } from '@/components/PWAInstallPrompt'
import './globals.css'

export const metadata: Metadata = {
  title: 'মা আসছেন - Durga Puja 2026 Countdown',
  description: 'Experience the divine celebration of Durga Puja 2026. Count down to the most awaited festival with live countdown and immersive Bengali cultural experience.',
  generator: 'v0.app',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'মা আসছেন',
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#d4a574' },
  ],
  width: 'device-width',
  initialScale: 1,
  userScalable: true,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="bn" className="bg-background scroll-smooth">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="মা আসছেন" />
        <meta name="theme-color" content="#d4a574" />
      </head>
      <body className="antialiased overflow-x-hidden">
        <PWAInstallPrompt />
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
