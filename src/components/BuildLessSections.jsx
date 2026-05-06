'use client'

import clsx from 'clsx'
import { useEffect, useRef, useState } from 'react'
import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
  animate,
} from 'framer-motion'

// ─────────────────────────────────────────────────────────────────────────────
// Live counter that ticks up the first time it enters the viewport.
// Used in the hero readout.
// ─────────────────────────────────────────────────────────────────────────────

export function LiveCount({
  to,
  duration = 1.6,
  format = (n) => n.toString(),
  className,
}) {
  const reduce = useReducedMotion()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -80px' })
  const value = useMotionValue(0)
  const display = useTransform(value, (v) => format(Math.round(v)))
  const [out, setOut] = useState(format(0))

  useEffect(() => {
    if (!inView) return
    if (reduce) {
      setOut(format(to))
      return
    }
    const controls = animate(value, to, {
      duration,
      ease: [0.22, 1, 0.36, 1],
    })
    const unsub = display.on('change', (v) => setOut(v))
    return () => {
      controls.stop()
      unsub()
    }
  }, [inView, to, duration, reduce, value, display, format])

  return (
    <span ref={ref} className={className}>
      {out}
    </span>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Outcome ticker — "Ship it / Iterate / Kill it" flipping in place.
// ─────────────────────────────────────────────────────────────────────────────

const OUTCOMES = [
  { word: 'Ship it.',  tone: 'text-emerald-400' },
  { word: 'Iterate.',  tone: 'text-orange-400'  },
  { word: 'Kill it.',  tone: 'text-rose-400'    },
]

export function OutcomeTicker({ className }) {
  const reduce = useReducedMotion()
  const [i, setI] = useState(0)

  useEffect(() => {
    if (reduce) return
    const id = setInterval(() => setI((x) => (x + 1) % OUTCOMES.length), 2400)
    return () => clearInterval(id)
  }, [reduce])

  const current = OUTCOMES[i]

  return (
    <span
      className={clsx(
        'relative inline-block overflow-hidden align-baseline',
        className,
      )}
      style={{ minWidth: '5.6ch' }}
    >
      <motion.span
        key={current.word}
        initial={{ y: '110%', opacity: 0 }}
        animate={{ y: '0%', opacity: 1 }}
        exit={{ y: '-110%', opacity: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className={clsx('inline-block tracking-tight', current.tone)}
      >
        {current.word}
      </motion.span>
    </span>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Sprint blueprint — anatomy of a validation sprint, hero side card.
// ─────────────────────────────────────────────────────────────────────────────

const BLUEPRINT_PHASES = [
  { key: '01', title: 'Define the risk',         note: 'd 01' },
  { key: '02', title: 'Build the smallest test', note: 'd 02 → 05' },
  { key: '03', title: 'Observe real behavior',   note: 'd 05 → 09' },
  { key: '04', title: 'Make the call',           note: 'd 10' },
]

export function HeroReadout() {
  const reduce = useReducedMotion()

  return (
    <div className="relative w-full">
      {/* offset shadow */}
      <div
        aria-hidden="true"
        className="absolute -bottom-3 -right-3 left-3 top-3 -z-10 border border-white/10 bg-white/[0.02]"
      />

      <div className="relative border border-white/25 bg-neutral-950/80 backdrop-blur-sm">
        {/* header */}
        <div className="flex items-center justify-between border-b border-white/15 px-5 py-3 eyebrow text-neutral-400">
          <span className="flex items-center gap-2 text-white">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-500 opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-orange-500" />
            </span>
            Anatomy of a sprint
          </span>
          <span className="font-mono tabular text-neutral-500">spec.01</span>
        </div>

        {/* phase list */}
        <ol className="px-5 py-5">
          {BLUEPRINT_PHASES.map((phase, idx) => (
            <motion.li
              key={phase.key}
              className="grid grid-cols-12 items-baseline gap-x-3 border-b border-white/10 py-3.5 last:border-b-0"
              initial={{ opacity: 0, x: reduce ? 0 : -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '0px 0px -40px' }}
              transition={{
                duration: 0.5,
                delay: 0.15 + idx * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <span className="col-span-2 font-mono tabular text-xs font-semibold text-orange-500">
                § {phase.key}
              </span>
              <span className="col-span-7 font-display text-[15px] font-medium leading-snug tracking-tight text-white">
                {phase.title}
              </span>
              <span className="col-span-3 text-right font-mono tabular text-[10px] uppercase tracking-[0.16em] text-neutral-400">
                {phase.note}
              </span>
            </motion.li>
          ))}
        </ol>

        {/* footer */}
        <div className="flex items-center justify-between border-t border-white/15 px-5 py-3 eyebrow text-neutral-400">
          <span>Ends in a call</span>
          <OutcomeTicker className="font-display text-sm font-semibold tracking-tight" />
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Animated scan line — used under the hero headline.
// ─────────────────────────────────────────────────────────────────────────────

export function ScanRule({ className }) {
  const reduce = useReducedMotion()

  return (
    <div className={clsx('relative h-px w-full overflow-hidden', className)}>
      <div className="absolute inset-0 bg-white/20" />
      <motion.div
        aria-hidden="true"
        className="absolute inset-y-0 left-0 w-[35%]"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, rgba(249,115,22,0.0) 5%, rgba(249,115,22,0.95) 50%, rgba(249,115,22,0.0) 95%, transparent 100%)',
          boxShadow: '0 0 12px rgba(249,115,22,0.55)',
        }}
        initial={{ x: '-50%' }}
        animate={reduce ? { x: '-50%' } : { x: ['-50%', '215%'] }}
        transition={
          reduce
            ? {}
            : {
                duration: 4.2,
                ease: [0.45, 0, 0.55, 1],
                repeat: Infinity,
                repeatDelay: 1.2,
              }
        }
      />
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Cost ledger — Build first vs BuildLess, animated bars + big numbers.
// ─────────────────────────────────────────────────────────────────────────────

function CostBar({ label, weeks, dollars, dollarLabel, weeksOf, accent, delay = 0 }) {
  const reduce = useReducedMotion()
  const widthPct = (weeks / 8) * 100

  return (
    <div className="grid grid-cols-12 items-baseline gap-x-4 gap-y-3 border-t border-white/10 py-7 sm:py-8">
      <div className="col-span-12 sm:col-span-3">
        <p className="eyebrow text-neutral-400">{label}</p>
        <p
          className={clsx(
            'mt-2 font-mono tabular text-3xl font-medium tracking-tight sm:text-4xl',
            accent ? 'text-orange-400' : 'text-white',
          )}
        >
          {dollarLabel}
        </p>
        <p className="mt-1 text-xs text-neutral-500">{dollars}</p>
      </div>

      <div className="col-span-12 sm:col-span-7">
        <div className="relative h-9 w-full overflow-hidden bg-white/[0.04] sm:h-10">
          {/* tick marks every week */}
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              backgroundImage:
                'linear-gradient(to right, rgba(255,255,255,0.10) 1px, transparent 1px)',
              backgroundSize: `${100 / 8}% 100%`,
            }}
          />
          <motion.div
            className={clsx(
              'absolute inset-y-0 left-0 origin-left',
              accent ? 'bg-orange-500' : 'bg-neutral-500',
            )}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: '0px 0px -60px' }}
            transition={
              reduce
                ? { duration: 0 }
                : { duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] }
            }
            style={{ width: `${widthPct}%` }}
          />
          <div className="absolute inset-y-0 left-0 flex items-center px-3">
            <span
              className={clsx(
                'font-mono text-[11px] uppercase tracking-[0.18em]',
                accent ? 'text-white' : 'text-white/85',
              )}
            >
              {weeksOf}
            </span>
          </div>
        </div>
      </div>

      <div className="col-span-12 sm:col-span-2 sm:text-right">
        <p
          className={clsx(
            'font-mono tabular text-xl font-semibold',
            accent ? 'text-orange-400' : 'text-neutral-200',
          )}
        >
          <LiveCount to={weeks} format={(n) => `${n} wk${n === 1 ? '' : 's'}`} />
        </p>
      </div>
    </div>
  )
}

export function CostLedger() {
  return (
    <div className="relative">
      {/* numbers row */}
      <div className="border-b border-white/15 pb-3 eyebrow text-neutral-400">
        <div className="flex items-baseline justify-between">
          <span className="text-white">Cost of being wrong</span>
          <span>Per validated assumption</span>
        </div>
      </div>

      <div className="mt-4">
        <CostBar
          label="Build first, learn later"
          weeks={6}
          weeksOf="Engineering · QA · launch · learn"
          dollars="≈ 6 wks of payroll on a hunch"
          dollarLabel="$84k"
        />
        <CostBar
          label="BuildLess sprint"
          weeks={1}
          weeksOf="Scope · build · ship · decide"
          dollars="One focused test in front of users"
          dollarLabel="$12k"
          accent
          delay={0.25}
        />
      </div>

      <div className="mt-8 grid grid-cols-1 items-baseline gap-x-10 gap-y-4 border-t border-white/15 pt-6 sm:grid-cols-12">
        <p className="col-span-12 font-display text-lg leading-snug tracking-tight text-white sm:col-span-7 sm:text-xl">
          For every idea you ship without testing, you bet six weeks of
          engineering on a hunch.{' '}
          <span className="text-neutral-400">
            We compress that bet into a sprint, with evidence on the other side.
          </span>
        </p>
        <p className="col-span-12 sm:col-span-5 sm:text-right">
          <span className="eyebrow text-neutral-400">Net difference</span>
          <span className="ml-3 font-mono tabular text-2xl font-semibold text-orange-400 sm:text-3xl">
            <LiveCount to={72} format={(n) => `−$${n}k`} duration={1.8} />
          </span>
        </p>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Phase pipeline — animated 4-stop pipeline replacing the static "How it works".
// A pulse travels from left to right, lighting up each stop as it arrives.
// ─────────────────────────────────────────────────────────────────────────────

const PHASES = [
  {
    key: '01',
    title: 'Define the risk',
    body: "Scope the riskiest assumption, the thing you can't answer from a doc, a Loom, or another internal debate.",
    note: 'd 01',
  },
  {
    key: '02',
    title: 'Build the smallest test',
    body: 'A lightweight version in days, plugged into your product or a standalone flow. Just enough to put the assumption in front of real users.',
    note: 'd 02 → 05',
  },
  {
    key: '03',
    title: 'Observe real behavior',
    body: 'Events, funnels, session replay. You see exactly where users convert, drop off, or get confused.',
    note: 'd 05 → 09',
  },
  {
    key: '04',
    title: 'Make the call',
    body: 'Build, iterate, or kill. Every sprint ends with a written recommendation backed by behavior data, not vibes.',
    note: 'd 10',
  },
]

const PIPELINE_DURATION = 12

function PhaseStop({ phase, index, reduce }) {
  const start = index / PHASES.length
  const settled = start + 0.04

  const fillTransition = reduce
    ? {}
    : {
        duration: PIPELINE_DURATION,
        times: [0, start, settled, 1],
        ease: [0.22, 1, 0.36, 1],
        repeat: Infinity,
      }

  return (
    <li className="relative flex flex-col">
      {/* node on the rail */}
      <div className="relative h-9 sm:h-11">
        <div className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-white/15" />

        {/* base node */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <span className="block h-3 w-3 rotate-45 border border-white/35 bg-neutral-950" />
        </div>

        {/* lit node — fades in when the playhead arrives */}
        <motion.div
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={
            reduce
              ? { opacity: 1, scale: 1 }
              : { opacity: [0, 0, 1, 1], scale: [0.6, 0.6, 1, 1] }
          }
          transition={fillTransition}
        >
          <span
            className="block h-3 w-3 rotate-45 border border-orange-500 bg-orange-500"
            style={{ boxShadow: '0 0 12px rgba(249,115,22,0.85)' }}
          />
        </motion.div>
      </div>

      {/* meta */}
      <div className="mt-5 flex items-baseline gap-2 eyebrow">
        <span className="text-orange-500">§ {phase.key}</span>
        <span className="text-neutral-500">·</span>
        <span className="font-mono tabular text-neutral-300">{phase.note}</span>
      </div>

      {/* title */}
      <motion.h3
        className="mt-3 font-display text-xl font-medium tracking-tight text-white sm:text-2xl"
        initial={{ opacity: 0.55 }}
        animate={
          reduce
            ? { opacity: 1 }
            : { opacity: [0.55, 0.55, 1, 1] }
        }
        transition={fillTransition}
      >
        {phase.title}
      </motion.h3>

      {/* body */}
      <p className="mt-3 max-w-xs text-sm leading-relaxed text-neutral-300">
        {phase.body}
      </p>
    </li>
  )
}

export function PhasePipeline() {
  const reduce = useReducedMotion()

  return (
    <div className="relative">
      <div className="mb-5 flex items-baseline justify-between border-b border-white/15 pb-3 eyebrow text-neutral-400">
        <span className="flex items-center gap-2">
          <span className="block h-1.5 w-1.5 rounded-full bg-orange-500" />
          <span className="text-white">Sprint pipeline</span>
        </span>
        <span className="font-mono tabular">d 01 → d 10 · decision</span>
      </div>

      <div className="relative pt-6">
        {/* the rail */}
        <div className="pointer-events-none absolute left-0 right-0 top-[2.6rem] h-px bg-white/12 sm:top-[3rem]" />
        {/* lit rail traced left → right */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-[2.6rem] h-px origin-left bg-orange-500 sm:top-[3rem]"
          style={{
            boxShadow: '0 0 10px rgba(249,115,22,0.65)',
            width: '100%',
          }}
          initial={{ scaleX: 0 }}
          animate={reduce ? { scaleX: 1 } : { scaleX: [0, 1, 1] }}
          transition={
            reduce
              ? {}
              : {
                  duration: PIPELINE_DURATION,
                  times: [0, 0.92, 1],
                  ease: [0.22, 1, 0.36, 1],
                  repeat: Infinity,
                }
          }
        />

        <ol className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-8 lg:grid-cols-4 lg:gap-x-10">
          {PHASES.map((phase, i) => (
            <PhaseStop key={phase.key} phase={phase} index={i} reduce={reduce} />
          ))}
        </ol>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Sample sprint carousel — auto-rotating snapshot card with three sprints.
// ─────────────────────────────────────────────────────────────────────────────

const SAMPLE_SPRINTS = [
  {
    tag: 'A',
    scope: 'Onboarding redesign',
    sub: 'Activation rate vs. existing flow',
    metrics: [
      { label: 'Activation',     value: '62%',  delta: 'illustrative', bar: 0.62, accent: true },
      { label: 'Time to value',  value: '−38%', delta: 'vs. control',  bar: 0.38 },
      { label: '7-day retention', value: '+14%', delta: 'vs. control',  bar: 0.48 },
    ],
    call: { word: 'Ship it', tone: 'text-emerald-400' },
  },
  {
    tag: 'B',
    scope: 'Pricing tier collapse',
    sub: 'Two plans vs. four plans',
    metrics: [
      { label: 'Trial → paid',     value: '+9%',  delta: 'illustrative',     bar: 0.42, accent: true },
      { label: 'Plan confusion',   value: '−47%', delta: 'support tickets', bar: 0.55 },
      { label: 'ARPU',             value: '−3%',  delta: 'vs. control',     bar: 0.30 },
    ],
    call: { word: 'Iterate', tone: 'text-orange-400' },
  },
  {
    tag: 'C',
    scope: 'AI summary feature',
    sub: 'Daily active engagement',
    metrics: [
      { label: 'Adoption',          value: '14%',  delta: 'of weekly users', bar: 0.14 },
      { label: 'Repeat use',        value: '4%',   delta: 'of adopters',     bar: 0.10 },
      { label: 'Value perception',  value: 'low',  delta: 'qual research',   bar: 0.18 },
    ],
    call: { word: 'Kill it', tone: 'text-rose-400' },
  },
]

function MetricRow({ m, delay, reduce }) {
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <span className="eyebrow text-white/70">{m.label}</span>
        <span className="flex items-baseline gap-2">
          <span className="font-mono tabular text-xl font-semibold text-white">
            {m.value}
          </span>
          <span className="eyebrow text-white/55">{m.delta}</span>
        </span>
      </div>
      <div className="mt-2 h-[3px] w-full overflow-hidden bg-white/10">
        <motion.div
          className={clsx('h-full', m.accent ? 'bg-orange-500' : 'bg-white')}
          initial={{ width: reduce ? `${m.bar * 100}%` : 0 }}
          animate={{ width: `${m.bar * 100}%` }}
          transition={{ duration: 1, delay, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  )
}

export function SampleSprintCarousel() {
  const reduce = useReducedMotion()
  const [i, setI] = useState(0)

  useEffect(() => {
    if (reduce) return
    const id = setInterval(() => setI((x) => (x + 1) % SAMPLE_SPRINTS.length), 5200)
    return () => clearInterval(id)
  }, [reduce])

  const s = SAMPLE_SPRINTS[i]

  return (
    <div className="relative w-full max-w-md">
      {/* offset card */}
      <div
        aria-hidden="true"
        className="absolute -bottom-3 -right-3 left-3 top-3 -z-10 border border-white/10 bg-white/[0.03]"
      />

      <article className="relative border border-white/25 bg-neutral-900 p-7 sm:p-8">
        <header className="flex items-baseline justify-between border-b border-white/15 pb-3 eyebrow text-white/70">
          <span className="flex items-baseline gap-2">
            <span className="text-white wdth-narrow">Example</span>
            <motion.span
              key={s.tag}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="font-mono tabular"
            >
              {s.tag}
            </motion.span>
          </span>
          <span>Illustrative</span>
        </header>

        <motion.div
          key={`${s.tag}-body`}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="mt-6">
            <p className="eyebrow text-white/70 wdth-narrow">Test scope</p>
            <p className="mt-2 font-display text-2xl font-medium tracking-tight text-white">
              {s.scope}
            </p>
            <p className="mt-1 text-sm text-white/60">{s.sub}</p>
          </div>

          <dl className="mt-7 space-y-5">
            {s.metrics.map((m, idx) => (
              <MetricRow
                key={`${s.tag}-${m.label}`}
                m={m}
                delay={0.15 + idx * 0.18}
                reduce={reduce}
              />
            ))}
          </dl>
        </motion.div>

        <footer className="mt-8 flex items-center justify-between border-t border-white/15 pt-4 eyebrow text-white/65">
          <span className="wdth-narrow">Recommendation</span>
          <motion.span
            key={`${s.tag}-call`}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className={clsx(
              'font-display text-base font-semibold tracking-tight',
              s.call.tone,
            )}
          >
            {s.call.word} →
          </motion.span>
        </footer>
      </article>

      {/* page dots */}
      <div className="mt-4 flex items-center justify-between eyebrow text-neutral-400">
        <span className="wdth-narrow">Hypothetical example</span>
        <div className="flex items-center gap-1.5">
          {SAMPLE_SPRINTS.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setI(idx)}
              aria-label={`Show example ${idx + 1}`}
              className={clsx(
                'h-1 w-6 transition-colors',
                idx === i ? 'bg-orange-500' : 'bg-white/20 hover:bg-white/40',
              )}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Section number — small "§ 0n / 09" tag used between sections.
// ─────────────────────────────────────────────────────────────────────────────

export function SectionMark({ n, total = 9, label, className }) {
  return (
    <div
      className={clsx(
        'flex items-center gap-3 eyebrow text-neutral-400',
        className,
      )}
    >
      <span className="text-orange-500">§ {n}</span>
      <span className="opacity-50">/</span>
      <span className="text-white">{label}</span>
      <span className="hidden flex-1 sm:block">
        <span className="block h-px w-full bg-white/15" />
      </span>
      <span className="hidden font-mono tabular sm:inline">
        {n} of {String(total).padStart(2, '0')}
      </span>
    </div>
  )
}

