import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { DisableInstallPrompt } from '@/components/DisableInstallPrompt'
import './globals.css'

export const metadata: Metadata = {
  title: 'মা আসছেন - Durga Puja 2026 Countdown',
  description: 'Experience the divine celebration of Durga Puja 2026. Count down to the most awaited festival with live countdown and immersive Bengali cultural experience.',
  generator: 'v0.app',
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: '/icon.png',
    apple: '/icon.png',
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
        <meta name="theme-color" content="#d4a574" />
      </head>
      <body className="antialiased overflow-x-hidden">
        <DisableInstallPrompt />
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
