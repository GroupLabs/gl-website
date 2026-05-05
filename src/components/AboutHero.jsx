'use client'

import { motion, useReducedMotion } from 'framer-motion'

import { Container } from '@/components/Container'

export function AboutHero() {
  const shouldReduceMotion = useReducedMotion()

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: shouldReduceMotion ? 0 : 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] },
  })

  return (
    <section className="relative isolate overflow-hidden bg-white text-neutral-950">
      <Container className="relative pb-6 pt-10 sm:pb-8 sm:pt-14 lg:pb-10 lg:pt-16">
        <div className="relative flex min-h-[55vh] flex-col items-start justify-center overflow-hidden rounded-[2rem] px-5 py-12 sm:px-10 sm:py-16 lg:px-14 lg:py-20">
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
            §&nbsp;00 &nbsp;·&nbsp; About GroupLabs
          </motion.p>

          <motion.h1
            className="wdth-wide mt-6 max-w-4xl font-display text-[clamp(2rem,5.5vw,4rem)] font-medium leading-[1.04] tracking-tight text-neutral-950 [text-wrap:balance]"
            {...fadeUp(0.4)}
          >
            A small studio of engineers, building systems
            <span className="italic text-neutral-500"> that hold up.</span>
          </motion.h1>

          <motion.div
            className="mt-8 max-w-2xl space-y-5 text-base leading-relaxed text-neutral-700 sm:text-lg"
            {...fadeUp(0.6)}
          >
            <p>
              GroupLabs is a Calgary engineering studio. We lead with BuildLess,
              our pre-build product validation practice that turns an idea into
              a live test in days. We also run deeper engagements in ML
              infrastructure, custom models, and production systems for teams
              who already know what they need to ship.
            </p>
            <p className="text-neutral-500">
              We started GroupLabs because we kept seeing teams overbuild.
              Too much engineering committed to ideas that had not earned it
              yet. The work below is our answer.
            </p>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
