import { RootLayout } from '@/components/RootLayout'
import Script from 'next/script'

import '@/styles/tailwind.css'

export const metadata = {
  metadataBase: new URL('https://grouplabs.ca'),
  title: {
    template: '%s - GroupLabs',
    default: 'ML Infrastructure & Model Acceleration',
  },
  description:
    'GroupLabs builds scalable ML infrastructure and accelerates model inference. 2–10× faster, 30–70% lower costs. Production-ready ML systems.',
  keywords: [
    'ML infrastructure',
    'model acceleration',
    'inference optimization',
    'MLOps',
    'GPU optimization',
    'LLM serving',
    'model deployment',
    'GroupLabs',
  ],
  openGraph: {
    title: 'ML Infrastructure & Model Acceleration - GroupLabs',
    description:
      'GroupLabs builds scalable ML infrastructure and accelerates model inference. 2–10× faster, 30–70% lower costs.',
    url: 'https://grouplabs.ca',
    siteName: 'GroupLabs',
    locale: 'en_CA',
    type: 'website',
    images: 'https://placehold.co/1200x630/png?text=GroupLabs',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ML Infrastructure & Model Acceleration - GroupLabs',
    description:
      'GroupLabs builds scalable ML infrastructure and accelerates model inference. 2–10× faster, 30–70% lower costs.',
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
