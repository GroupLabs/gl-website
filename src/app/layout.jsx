import { RootLayout } from '@/components/RootLayout'

import '@/styles/tailwind.css'
import 'katex/dist/katex.min.css'

export const metadata = {
  title: {
    template: '%s - GroupLabs',
    default: 'Machine Learning Studio',
  },
}

export default function Layout({ children }) {
  return (
    <html lang="en" className="h-full bg-neutral-950 text-base antialiased">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="flex min-h-full flex-col">
        <RootLayout>{children}</RootLayout>
      </body>
    </html>
  )
}
