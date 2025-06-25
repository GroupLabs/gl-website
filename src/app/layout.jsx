import { RootLayout } from '@/components/RootLayout'
import Script from 'next/script'

import '@/styles/tailwind.css'

export const metadata = {
  metadataBase: new URL('https://grouplabs.ca'),
  title: {
    template: '%s - GroupLabs',
    default: 'Machine Learning Consulting in Calgary',
  },
  description:
    'GroupLabs is a Calgary-based machine learning and data science consulting firm delivering practical solutions.',
  keywords: [
    'machine learning consulting',
    'data science consulting',
    'AI consulting',
    'Calgary machine learning',
    'GroupLabs',
  ],
  openGraph: {
    title: 'Machine Learning Consulting in Calgary - GroupLabs',
    description:
      'GroupLabs is a Calgary-based machine learning and data science consulting firm delivering practical solutions.',
    url: 'https://grouplabs.ca',
    siteName: 'GroupLabs',
    locale: 'en_CA',
    type: 'website',
    images: 'https://placehold.co/1200x630/png?text=GroupLabs',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Machine Learning Consulting in Calgary - GroupLabs',
    description:
      'GroupLabs is a Calgary-based machine learning and data science consulting firm delivering practical solutions.',
    images: 'https://placehold.co/1200x630/png?text=GroupLabs',
  },
  alternates: {
    canonical: '/',
  },
}

export default function Layout({ children }) {
  return (
    <html lang="en" className="h-full bg-neutral-950 text-base antialiased">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <Script
          id="organization-schema"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              url: 'https://grouplabs.ca',
              name: 'GroupLabs',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Calgary',
                addressRegion: 'AB',
                addressCountry: 'CA',
              },
              contactPoint: {
                '@type': 'ContactPoint',
                telephone: '+1-587-700-9968',
                contactType: 'customer service',
              },
              sameAs: ['https://www.linkedin.com/company/grouplabs-canada/'],
            }),
          }}
        />
      </head>
      <body className="flex min-h-full flex-col">
        <RootLayout>{children}</RootLayout>
      </body>
    </html>
  )
}
