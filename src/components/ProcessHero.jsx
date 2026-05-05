'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'

import { Container } from '@/components/Container'

export function ProcessHero() {
  const shouldReduceMotion = useReducedMotion()

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: shouldReduceMotion ? 0 : 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] },
  })

  return (
    <section className="relative isolate overflow-hidden bg-white text-neutral-950">
      <Container className="relative pb-6 pt-10 sm:pb-8 sm:pt-14 lg:pb-10 lg:pt-16">
        <div className="relative flex min-h-[50vh] flex-col items-center justify-center overflow-hidden rounded-[2rem] px-5 py-8 sm:px-10 sm:py-12 lg:px-14 lg:py-14">
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10"
            initial={{ opacity: shouldReduceMotion ? 1 : 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.8,
              delay: shouldReduceMotion ? 0 : 0.2,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{
              maskImage:
                'radial-gradient(ellipse at center, black 0%, transparent 85%)',
              WebkitMaskImage:
                'radial-gradient(ellipse at center, black 0%, transparent 85%)',
            }}
          >
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  'linear-gradient(to right, rgba(234,88,12,0.10) 1px, transparent 1px), linear-gradient(to bottom, rgba(234,88,12,0.10) 1px, transparent 1px)',
                backgroundSize: '20px 20px',
                backgroundPosition: '0 -2px',
              }}
            />
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  'linear-gradient(to right, rgba(234,88,12,0.20) 1px, transparent 1px), linear-gradient(to bottom, rgba(234,88,12,0.20) 1px, transparent 1px)',
                backgroundSize: '100px 100px',
                backgroundPosition: '0 -2px',
              }}
            />
          </motion.div>

          <motion.p
            className="eyebrow wdth-narrow text-orange-600"
            {...fadeUp(0.2)}
          >
            <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-orange-600 align-middle" />
            §&nbsp;00 &nbsp;·&nbsp; Process
          </motion.p>

          <motion.h1
            className="wdth-wide mt-6 text-center font-display text-3xl font-medium leading-[1.1] tracking-tight text-neutral-950 sm:text-4xl"
            {...fadeUp(0.5)}
          >
            How we work.
            <span className="block font-normal italic text-neutral-500">
              Three phases, one written deliverable each.
            </span>
          </motion.h1>

          <motion.p
            className="mx-auto mt-8 max-w-xl text-center text-base leading-relaxed text-neutral-700"
            {...fadeUp(0.7)}
          >
            We deliver practical solutions that clients use to address
            real-world, impactful problems. For pre-build validation sprints,
            see{' '}
            <Link
              href="/buildless"
              className="underline decoration-orange-600/50 underline-offset-4 hover:text-orange-600"
            >
              how BuildLess works
            </Link>
            .
          </motion.p>
        </div>
      </Container>
    </section>
  )
}
