import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { PWAInstallPrompt } from '@/components/PWAInstallPrompt'
import './globals.css'

const siteUrl = 'https://agomoni.vercel.app'
const siteTitle = 'আগমনী - Durga Puja 2026 Countdown'
const siteDescription =
  'আগমনীতে দেখুন Durga Puja 2026 ও Mahalaya 2026 countdown, পূজার দিনপঞ্জি, পুষ্পাঞ্জলির মন্ত্র এবং মহালয়ার চণ্ডীপাঠ।'
const siteImage = '/icon.png'
const absoluteSiteImage = `${siteUrl}${siteImage}`

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: '%s | আগমনী',
  },
  description: siteDescription,
  applicationName: 'আগমনী',
  generator: 'Next.js',
  manifest: '/manifest.json',
  keywords: [
    'agomoni',
    'আগমনী',
    'Durga Puja 2026',
    'Durga Puja countdown',
    'Mahalaya 2026',
    'Mahalaya countdown',
    'মা আসছেন',
    'দুর্গাপূজা ২০২৬',
    'দুর্গাপূজা কাউন্টডাউন',
    'মহালয়া ২০২৬',
    'পূজার দিনপঞ্জি',
    'পুষ্পাঞ্জলির মন্ত্র',
    'Bengali festival countdown',
  ],
  authors: [{ name: 'Dip Chakraborty', url: siteUrl }],
  creator: 'Dip Chakraborty',
  publisher: 'Dip Chakraborty',
  category: 'festival countdown',
  alternates: {
    canonical: '/',
    languages: {
      bn: '/',
      en: '/',
    },
  },
  openGraph: {
    type: 'website',
    url: siteUrl,
    siteName: 'আগমনী',
    title: siteTitle,
    description: siteDescription,
    locale: 'bn_BD',
    alternateLocale: ['en_US'],
    images: [
      {
        url: absoluteSiteImage,
        secureUrl: absoluteSiteImage,
        width: 1536,
        height: 1024,
        alt: 'আগমনী Durga Puja 2026 countdown with Maa Durga artwork',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description: siteDescription,
    images: [
      {
        url: absoluteSiteImage,
        alt: 'আগমনী Durga Puja 2026 countdown with Maa Durga artwork',
      },
    ],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'আগমনী',
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
    name: 'আগমনী',
    alternateName: ['Agomoni', 'আগমনী', 'Durga Puja 2026 Countdown'],
    description: siteDescription,
    url: siteUrl,
    image: absoluteSiteImage,
    inLanguage: ['bn', 'en'],
    publisher: {
      '@type': 'Person',
      name: 'Dip Chakraborty',
    },
    potentialAction: {
      '@type': 'ViewAction',
      target: siteUrl,
    },
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
        <link rel="canonical" href={siteUrl} />
        <link rel="preload" as="image" href="/bg_image.png" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="আগমনী" />
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
