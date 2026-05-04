'use client'

import { motion, useReducedMotion } from 'framer-motion'

import { Container } from '@/components/Container'

export function HeroSection() {
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
          {/* Layered grid — minor 20px + major 100px lines, radially faded
              from the center so the field softens toward the edges. */}
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

          {/* Headline — one substantive sentence. A definition, not a slogan. */}
          <motion.h1
            className="wdth-wide font-display text-3xl font-medium leading-[1.1] tracking-tight text-neutral-950 sm:text-4xl"
            {...fadeUp(0.5)}
          >
            We build systems that are provably
            <br />
            correct, reliable, and&nbsp;fast.
          </motion.h1>
        </div>
      </Container>
    </section>
  )
}
