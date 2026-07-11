import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { PWAInstallPrompt } from '@/components/PWAInstallPrompt'
import './globals.css'

const siteTitle = 'মা আসছেন | Durga Puja 2026 Countdown'
const siteDescription =
  'A sweet, festive countdown to Durga Puja 2026 and Mahalaya — feel the dhak, devotion, lights, and joy as Maa Durga comes home. মা আসছেন।'
const siteImage = '/icon.png'

export const metadata: Metadata = {
  metadataBase: new URL('https://agomoni.vercel.app'),
  title: {
    default: siteTitle,
    template: '%s | মা আসছেন',
  },
  description: siteDescription,
  applicationName: 'মা আসছেন',
  generator: 'Next.js',
  manifest: '/manifest.json',
  keywords: [
    'Durga Puja 2026',
    'Durga Puja countdown',
    'Mahalaya 2026',
    'মা আসছেন',
    'দুর্গাপূজা ২০২৬',
    'Bengali festival countdown',
  ],
  authors: [{ name: 'মা আসছেন' }],
  creator: 'মা আসছেন',
  publisher: 'মা আসছেন',
  category: 'festival countdown',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    url: '/',
    siteName: 'মা আসছেন',
    title: siteTitle,
    description: siteDescription,
    locale: 'bn_BD',
    images: [
      {
        url: siteImage,
        width: 1024,
        height: 1024,
        alt: 'মা আসছেন - Durga Puja 2026 Countdown',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description: siteDescription,
    images: [siteImage],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'মা আসছেন',
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: siteImage,
    shortcut: siteImage,
    apple: siteImage,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
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
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteTitle,
    alternateName: ['মা আসছেন', 'Durga Puja 2026 Countdown'],
    description: siteDescription,
    url: 'https://agomoni.vercel.app',
    image: siteImage,
    inLanguage: ['bn', 'en'],
  }

  return (
    <html lang="bn" className="bg-background scroll-smooth">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.addEventListener('beforeinstallprompt', function (event) {
                event.preventDefault();
              });
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <link rel="manifest" href="/manifest.json" />
        <link rel="canonical" href="https://agomoni.vercel.app" />
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
