import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { PWAInstallPrompt } from '@/components/PWAInstallPrompt'
import './globals.css'

const siteUrl = 'https://agomoni.vercel.app'
const siteTitle = 'agomoni'
const siteDescription =
  'agomoni is a fast Durga Puja 2026 countdown for Mahalaya and the main Puja day on October 18, 2026.'
const siteImage = '/icon.png'
const absoluteSiteImage = `${siteUrl}${siteImage}`

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: '%s | agomoni',
  },
  description: siteDescription,
  applicationName: 'agomoni',
  generator: 'Next.js',
  manifest: '/manifest.json',
  keywords: [
    'agomoni',
    'আগমনী',
    'Durga Puja 2026',
    'Durga Puja countdown',
    'Mahalaya 2026',
    'মা আসছেন',
    'দুর্গাপূজা ২০২৬',
    'Bengali festival countdown',
  ],
  authors: [{ name: 'Dip Chakraborty' }],
  creator: 'Dip Chakraborty',
  publisher: 'Dip Chakraborty',
  category: 'festival countdown',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    url: siteUrl,
    siteName: siteTitle,
    title: siteTitle,
    description: siteDescription,
    locale: 'bn_BD',
    images: [
      {
        url: absoluteSiteImage,
        secureUrl: absoluteSiteImage,
        width: 1536,
        height: 1024,
        alt: 'agomoni Durga Puja 2026 countdown',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description: siteDescription,
    images: [absoluteSiteImage],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'agomoni',
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
    alternateName: ['Agomoni', 'আগমনী'],
    description: siteDescription,
    url: siteUrl,
    image: absoluteSiteImage,
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
        <link rel="canonical" href={siteUrl} />
        <link rel="preload" as="image" href="/bg_image.png" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="agomoni" />
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
