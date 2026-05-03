'use client'

import clsx from 'clsx'
import { motion, useReducedMotion } from 'framer-motion'

function MetricBar({ value, delay, accent = false, invert = false }) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <div
      className={clsx(
        'h-[3px] w-full overflow-hidden',
        invert ? 'bg-white/15' : 'bg-neutral-950/10',
      )}
    >
      <motion.div
        className={
          accent
            ? 'h-full bg-orange-600'
            : invert
              ? 'h-full bg-white'
              : 'h-full bg-neutral-950'
        }
        initial={{ width: shouldReduceMotion ? value : 0 }}
        whileInView={{ width: value }}
        viewport={{ once: true, margin: '0px 0px -50px' }}
        transition={{ duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  )
}

export function HeroSnapshot({ invert = false }) {
  const surface = invert
    ? 'border-white/25 bg-neutral-900'
    : 'border-neutral-950/15 bg-white'
  const subtleBorder = invert ? 'border-white/15' : 'border-neutral-950/15'
  const muted = invert ? 'text-white/55' : 'text-neutral-500'
  const ink = invert ? 'text-white' : 'text-neutral-950'
  const dim = invert ? 'text-white/65' : 'text-neutral-700'

  return (
    <div className="relative w-full max-w-md">
      {/* offset shadow card behind */}
      <div
        aria-hidden="true"
        className={clsx(
          'absolute -bottom-3 -right-3 left-3 top-3 -z-10 border',
          invert
            ? 'border-white/10 bg-white/[0.03]'
            : 'border-neutral-950/10 bg-neutral-50',
        )}
      />

      <article className={clsx('relative border p-7 sm:p-8', surface)}>
        <header className={clsx('flex items-baseline justify-between border-b pb-3 eyebrow', subtleBorder, muted)}>
          <span className="flex items-baseline gap-2">
            <span className={clsx(ink, 'wdth-narrow')}>Sprint</span>
            <span className="font-mono tabular">047</span>
          </span>
          <span className="flex items-center gap-2">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-600 opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-orange-600" />
            </span>
            Live · day 5/5
          </span>
        </header>

        <div className="mt-6">
          <p className={clsx('eyebrow', muted, 'wdth-narrow')}>Test scope</p>
          <p className={clsx('mt-2 font-display text-2xl font-medium tracking-tight', ink)}>
            Onboarding redesign
          </p>
          <p className={clsx('mt-1 text-sm', muted)}>
            Activation rate vs. existing flow
          </p>
        </div>

        <dl className="mt-7 space-y-5">
          <Metric
            label="Activation"
            value="62%"
            delta="+18 pp"
            barValue="62%"
            barAccent
            barDelay={0.6}
            invert={invert}
          />
          <Metric
            label="Time to value"
            value="−38%"
            delta="vs. control"
            barValue="38%"
            barDelay={0.85}
            invert={invert}
          />
          <Metric
            label="7-day retention"
            value="+14%"
            delta="vs. control"
            barValue="48%"
            barDelay={1.1}
            invert={invert}
          />
        </dl>

        <footer className={clsx('mt-8 flex items-center justify-between border-t pt-4', subtleBorder)}>
          <span className={clsx('eyebrow', muted, 'wdth-narrow')}>Recommendation</span>
          <span className={clsx('font-mono tabular text-sm font-semibold', ink)}>
            Ship it →
          </span>
        </footer>
      </article>

      <p className={clsx('mt-3 flex items-baseline justify-between eyebrow', muted)}>
        <span className="wdth-narrow">Sample sprint</span>
        <span className="font-mono">one of 47</span>
      </p>
    </div>
  )
}

function Metric({ label, value, delta, barValue, barAccent, barDelay, invert }) {
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <dt
          className={clsx(
            'eyebrow wdth-narrow',
            invert ? 'text-white/75' : 'text-neutral-700',
          )}
        >
          {label}
        </dt>
        <dd className="flex items-baseline gap-2">
          <span
            className={clsx(
              'font-mono tabular text-xl font-semibold',
              invert ? 'text-white' : 'text-neutral-950',
            )}
          >
            {value}
          </span>
          <span
            className={clsx(
              'eyebrow',
              invert ? 'text-white/45' : 'text-neutral-400',
            )}
          >
            {delta}
          </span>
        </dd>
      </div>
      <div className="mt-2">
        <MetricBar value={barValue} delay={barDelay} accent={barAccent} invert={invert} />
      </div>
    </div>
  )
}
