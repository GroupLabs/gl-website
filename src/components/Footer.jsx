import Link from 'next/link'

import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { Logo } from '@/components/Logo'
import { socialMediaProfiles } from '@/components/SocialMedia'

const COMMIT_SHA =
  process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA ??
  process.env.NEXT_PUBLIC_COMMIT_REF ??
  process.env.NEXT_PUBLIC_GIT_COMMIT_SHA ??
  process.env.COMMIT_REF

const navigation = [
  {
    title: 'Practices',
    links: [
      { title: 'Production ML', href: '/work' },
      { title: 'Custom models', href: '/process' },
      { title: 'BuildLess', href: '/buildless' },
    ],
  },
  {
    title: 'Studio',
    links: [
      { title: 'About', href: '/about' },
      { title: 'Process', href: '/process' },
      { title: 'Work', href: '/work' },
      { title: 'Blog', href: '/blog' },
    ],
  },
  {
    title: 'Elsewhere',
    links: socialMediaProfiles,
  },
]

function Navigation() {
  return (
    <nav>
      <ul role="list" className="grid grid-cols-3 gap-x-8">
        {navigation.map((section) => (
          <li key={section.title}>
            <p className="eyebrow text-neutral-500 wdth-narrow">{section.title}</p>
            <ul role="list" className="mt-5 space-y-3">
              {section.links.map((link, i) => (
                <li key={i}>
                  <Link
                    href={link.href}
                    className="text-sm text-neutral-700 transition hover:text-orange-600"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export function Footer() {
  return (
    <footer className="mt-24 border-t border-neutral-950/15 bg-white sm:mt-32">
      <Container className="pb-10 pt-12 sm:pb-12 sm:pt-16">
        <FadeIn>
          <div className="grid grid-cols-1 gap-y-10 lg:grid-cols-12 lg:gap-x-16">
            <div className="lg:col-span-5">
              <Link href="/" aria-label="Home" className="inline-flex items-center">
                <Logo className="h-7" fillOnHover />
              </Link>
              <p className="mt-6 max-w-sm font-mono text-xs leading-relaxed text-neutral-500">
                A small engineering studio in Calgary &amp; Montreal.
                <br />
                Production ML, custom models, pre-build product validation.
              </p>
            </div>
            <div className="lg:col-span-7">
              <Navigation />
            </div>
          </div>
        </FadeIn>

        <FadeIn>
          <div className="mt-12 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3 border-t border-neutral-950/10 pt-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-neutral-500">
              © GroupLabs Inc. {new Date().getFullYear()}
              {COMMIT_SHA ? ` · ${COMMIT_SHA.slice(0, 7)}` : ''}
            </p>
            <a
              href="mailto:noel@grouplabs.ca"
              className="font-mono text-[11px] uppercase tracking-[0.18em] text-neutral-500 hover:text-orange-600"
            >
              noel@grouplabs.ca
            </a>
          </div>
        </FadeIn>
      </Container>
    </footer>
  )
}
