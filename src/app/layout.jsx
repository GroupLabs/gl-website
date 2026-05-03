import { RootLayout } from '@/components/RootLayout'
import Script from 'next/script'
import { JetBrains_Mono } from 'next/font/google'

import '@/styles/tailwind.css'

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})

export const metadata = {
  metadataBase: new URL('https://grouplabs.ca'),
  title: {
    template: '%s - GroupLabs',
    default: 'GroupLabs — A Calgary engineering studio',
  },
  description:
    'GroupLabs is a Calgary engineering studio. Production ML systems, custom model development, and pre-build product validation for serious teams in energy, healthcare, robotics, and education.',
  keywords: [
    'ML infrastructure',
    'MLOps',
    'production ML',
    'custom model development',
    'engineering consultancy',
    'GroupLabs',
    'Calgary',
    'BuildLess',
    'product validation',
  ],
  openGraph: {
    title: 'GroupLabs — A Calgary engineering studio',
    description:
      'Production ML systems, custom model development, and pre-build product validation for serious teams.',
    url: 'https://grouplabs.ca',
    siteName: 'GroupLabs',
    locale: 'en_CA',
    type: 'website',
    images: 'https://placehold.co/1200x630/png?text=GroupLabs',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GroupLabs — A Calgary engineering studio',
    description:
      'Production ML systems, custom model development, and pre-build product validation for serious teams.',
    images: 'https://placehold.co/1200x630/png?text=GroupLabs',
  },
  alternates: {
    canonical: '/',
  },
}

export default function Layout({ children }) {
  return (
    <html
      lang="en"
      className={`${jetbrainsMono.variable} h-full bg-neutral-950 text-base antialiased`}
    >
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
