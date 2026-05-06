'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'

const CYCLE = 9 // seconds per full sprint loop

const PHASES = [
  { key: '01', label: 'Scope risk',    day: 'd 01',     start: 0.0,  end: 0.25 },
  { key: '02', label: 'Build test',    day: 'd 02–05',  start: 0.25, end: 0.5  },
  { key: '03', label: 'Observe users', day: 'd 05–09',  start: 0.5,  end: 0.75 },
  { key: '04', label: 'Make the call', day: 'd 10',     start: 0.75, end: 1.0  },
]

const OUTCOMES = [
  { word: 'Ship it', tone: 'text-emerald-400' },
  { word: 'Iterate', tone: 'text-orange-400'  },
  { word: 'Kill it', tone: 'text-rose-400'    },
]

function clamp01(v) {
  return Math.max(0, Math.min(1, v))
}

// --- per-phase visuals ---------------------------------------------------

function ScopeVisual({ phase, reduce }) {
  // Five candidate risks. Each fades in as the scanner reaches it; the
  // chosen one locks in orange as the riskiest assumption to test.
  const candidates = [0, 1, 2, 3, 4]
  const chosen = 2
  const span = phase.end - phase.start
  const enterFrom = phase.start + 0.005
  const enterTo = phase.start + span * 0.55
  const enterStep = (enterTo - enterFrom) / candidates.length
  const lockAt = phase.start + span * 0.62
  const lockSettled = lockAt + 0.025

  return (
    <div className="relative w-fit">
      <div className="relative flex items-center gap-1.5">
        {candidates.map((i) => {
          const isChosen = i === chosen
          const inAt = enterFrom + i * enterStep
          const inSettled = inAt + 0.018
          return (
            <motion.span
              key={i}
              className="relative block h-3 w-3 border border-white/35 bg-white/[0.06]"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={
                reduce
                  ? { opacity: 1, scale: 1 }
                  : { opacity: [0, 0, 1, 1], scale: [0.6, 0.6, 1, 1] }
              }
              transition={
                reduce
                  ? {}
                  : {
                      duration: CYCLE,
                      times: [
                        0,
                        clamp01(inAt),
                        clamp01(inSettled),
                        1,
                      ],
                      ease: [0.22, 1, 0.36, 1],
                      repeat: Infinity,
                    }
              }
            >
              {isChosen && (
                <motion.span
                  aria-hidden="true"
                  className="absolute -inset-[3px] border-2 border-orange-500 bg-orange-500/30"
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={
                    reduce
                      ? { opacity: 1, scale: 1 }
                      : {
                          opacity: [0, 0, 1, 1],
                          scale: [0.6, 0.6, 1, 1],
                        }
                  }
                  transition={
                    reduce
                      ? {}
                      : {
                          duration: CYCLE,
                          times: [
                            0,
                            clamp01(lockAt),
                            clamp01(lockSettled),
                            1,
                          ],
                          ease: [0.22, 1, 0.36, 1],
                          repeat: Infinity,
                        }
                  }
                />
              )}
            </motion.span>
          )
        })}

        {/* scanner bar sweeping across the candidate row */}
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute -top-1 -bottom-1 block w-0.5 bg-orange-500"
          style={{ boxShadow: '0 0 12px rgba(249,115,22,0.85)' }}
          initial={{ left: '0%', opacity: 0 }}
          animate={
            reduce
              ? { left: '100%', opacity: 0 }
              : {
                  left: ['0%', '0%', '100%', '100%'],
                  opacity: [0, 1, 1, 0],
                }
          }
          transition={
            reduce
              ? {}
              : {
                  duration: CYCLE,
                  times: [
                    0,
                    clamp01(enterFrom),
                    clamp01(enterTo),
                    clamp01(enterTo + 0.012),
                  ],
                  ease: 'linear',
                  repeat: Infinity,
                }
          }
        />
      </div>
    </div>
  )
}

function BuildVisual({ phase, reduce }) {
  // A small "screen" being constructed: the outer frame fades in first, then
  // four uniform rows fill in left-to-right inside it. The last row is
  // orange — the interactive bit being put in front of real users.
  const span = phase.end - phase.start
  const frameAt = phase.start + 0.005
  const frameDone = phase.start + span * 0.1
  const rows = [
    { accent: false },
    { accent: false },
    { accent: false },
    { accent: true },
  ]
  const rowsStartAt = frameDone + 0.01
  const rowsEndBy = phase.start + span * 0.7
  const rowsSpan = rowsEndBy - rowsStartAt
  const rowStep = rowsSpan / rows.length

  return (
    <motion.div
      className="relative w-fit border border-white/35 px-2 py-1.5"
      initial={{ opacity: 0, scale: 0.94 }}
      animate={
        reduce
          ? { opacity: 1, scale: 1 }
          : { opacity: [0, 0, 1, 1], scale: [0.94, 0.94, 1, 1] }
      }
      transition={
        reduce
          ? {}
          : {
              duration: CYCLE,
              times: [0, clamp01(frameAt), clamp01(frameDone), 1],
              ease: [0.22, 1, 0.36, 1],
              repeat: Infinity,
            }
      }
    >
      <div className="space-y-1">
        {rows.map((row, i) => {
          const t0 = rowsStartAt + i * rowStep
          const t1 = t0 + 0.04
          return (
            <div
              key={i}
              className="relative bg-white/10"
              style={{ width: '64px', height: '6px' }}
            >
              <motion.div
                className={`absolute inset-0 ${
                  row.accent ? 'bg-orange-500' : 'bg-white/85'
                }`}
                style={{ transformOrigin: 'left' }}
                initial={{ scaleX: 0 }}
                animate={reduce ? { scaleX: 1 } : { scaleX: [0, 0, 1, 1] }}
                transition={
                  reduce
                    ? {}
                    : {
                        duration: CYCLE,
                        times: [0, clamp01(t0), clamp01(t1), 1],
                        ease: [0.22, 1, 0.36, 1],
                        repeat: Infinity,
                      }
                }
              />
            </div>
          )
        })}
      </div>
    </motion.div>
  )
}

function ObserveVisual({ phase, reduce }) {
  // Three live metric bars rising as we observe users. Each bar has a faint
  // baseline track behind it so the structure is visible before the playhead
  // arrives.
  const bars = [
    { h: 0.6, accent: false },
    { h: 0.95, accent: true },
    { h: 0.75, accent: false },
  ]
  return (
    <div className="flex h-12 items-end gap-2">
      {bars.map((b, i) => {
        const offset = i * 0.04
        return (
          <span
            key={i}
            className="relative block h-12 w-3 bg-white/10"
          >
            <motion.span
              className={`absolute bottom-0 left-0 right-0 block ${
                b.accent ? 'bg-orange-500' : 'bg-white/80'
              }`}
              style={{ height: `${b.h * 100}%`, transformOrigin: 'bottom' }}
              initial={{ scaleY: 0 }}
              animate={reduce ? { scaleY: 1 } : { scaleY: [0, 0, 1, 1] }}
              transition={
                reduce
                  ? {}
                  : {
                      duration: CYCLE,
                      times: [
                        0,
                        clamp01(phase.start + offset),
                        clamp01(phase.start + offset + 0.18),
                        1,
                      ],
                      ease: [0.22, 1, 0.36, 1],
                      repeat: Infinity,
                    }
              }
            />
          </span>
        )
      })}
    </div>
  )
}

function DecideVisual({ phase, reduce, outcome }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-neutral-400">
        Decision
      </span>
      <motion.div
        className="flex items-baseline gap-2"
        initial={{ opacity: 0, y: 6 }}
        animate={
          reduce
            ? { opacity: 1, y: 0 }
            : { opacity: [0, 0, 1, 1], y: [6, 6, 0, 0] }
        }
        transition={
          reduce
            ? {}
            : {
                duration: CYCLE,
                times: [
                  0,
                  clamp01(phase.start + 0.005),
                  clamp01(phase.start + 0.04),
                  1,
                ],
                ease: 'linear',
                repeat: Infinity,
              }
        }
      >
        <span
          className={`font-display text-lg font-medium tracking-tight ${outcome.tone}`}
        >
          {outcome.word}
        </span>
      </motion.div>
    </div>
  )
}

function PhaseVisual({ index, phase, reduce, outcome }) {
  if (index === 0) return <ScopeVisual phase={phase} reduce={reduce} />
  if (index === 1) return <BuildVisual phase={phase} reduce={reduce} />
  if (index === 2) return <ObserveVisual phase={phase} reduce={reduce} />
  return <DecideVisual phase={phase} reduce={reduce} outcome={outcome} />
}

// --- timeline ------------------------------------------------------------

function PhaseColumn({ index, phase, reduce, outcome }) {
  const width = (phase.end - phase.start) * 100

  // lit only while the playhead is inside the phase
  const fillTransition = reduce
    ? {}
    : {
        duration: CYCLE,
        times: [
          0,
          clamp01(phase.start),
          clamp01(phase.start + 0.015),
          clamp01(phase.end - 0.01),
          clamp01(phase.end),
        ],
        ease: 'linear',
        repeat: Infinity,
      }

  // header / label brighten on enter and stay lit through the cycle
  const headerTransition = reduce
    ? {}
    : {
        duration: CYCLE,
        times: [
          0,
          clamp01(phase.start),
          clamp01(phase.start + 0.04),
          1,
        ],
        ease: 'linear',
        repeat: Infinity,
      }

  return (
    <div
      className="relative flex flex-col justify-between border-r border-white/15 last:border-r-0"
      style={{ width: `${width}%` }}
    >
      {/* live fill while playhead is inside */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-orange-500/[0.10]"
        initial={{ opacity: 0 }}
        animate={reduce ? { opacity: 1 } : { opacity: [0, 0, 1, 1, 0] }}
        transition={fillTransition}
      />

      {/* phase header */}
      <div className="relative px-3 pt-3 sm:px-4 sm:pt-4">
        <motion.div
          className="flex items-baseline gap-2 font-mono text-[10px] uppercase tracking-[0.18em]"
          initial={{ opacity: 0.85 }}
          animate={reduce ? { opacity: 1 } : { opacity: [0.85, 0.85, 1, 1] }}
          transition={headerTransition}
        >
          <span className="text-orange-500">§ {phase.key}</span>
          <span className="tabular text-neutral-300">{phase.day}</span>
        </motion.div>
      </div>

      {/* phase visual */}
      <div className="relative flex flex-1 items-center px-3 sm:px-4">
        <PhaseVisual index={index} phase={phase} reduce={reduce} outcome={outcome} />
      </div>

      {/* phase label */}
      <div className="relative px-3 pb-3 sm:px-4 sm:pb-4">
        <motion.p
          className="font-display text-base font-medium leading-tight tracking-tight text-white sm:text-lg"
          initial={{ opacity: 0.85 }}
          animate={reduce ? { opacity: 1 } : { opacity: [0.85, 0.85, 1, 1] }}
          transition={headerTransition}
        >
          {phase.label}
        </motion.p>
      </div>
    </div>
  )
}

function SprintCycle({ reduce, outcome }) {
  return (
    <div className="relative">
      {/* axis */}
      <div className="mb-3 flex items-baseline justify-between gap-3 font-mono text-[10px] uppercase tracking-[0.18em] text-neutral-400">
        <span className="flex items-center gap-2">
          <span className="block h-1.5 w-1.5 rounded-full bg-orange-500" />
          Sprint cycle · 1 to 2 weeks
        </span>
        <span className="tabular hidden sm:inline">d 01 → d 14 · decision</span>
      </div>

      {/* track */}
      <div className="relative h-[200px] overflow-hidden rounded-xl border border-white/20 bg-white/[0.04] sm:h-[220px]">
        {/* faint grid */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(255,255,255,0.10) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        {/* phases */}
        <div className="absolute inset-0 flex">
          {PHASES.map((p, i) => (
            <PhaseColumn
              key={p.key}
              index={i}
              phase={p}
              reduce={reduce}
              outcome={outcome}
            />
          ))}
        </div>

        {/* playhead */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute top-0 bottom-0 w-px bg-orange-500"
          style={{ boxShadow: '0 0 18px rgba(249,115,22,0.55)' }}
          initial={{ left: '0%' }}
          animate={reduce ? { left: '100%' } : { left: ['0%', '100%'] }}
          transition={
            reduce
              ? { duration: 0 }
              : { duration: CYCLE, ease: 'linear', repeat: Infinity }
          }
        >
          <span className="absolute -top-1 left-1/2 block h-2 w-2 -translate-x-1/2 rounded-full bg-orange-500" />
          <span className="absolute -bottom-1 left-1/2 block h-2 w-2 -translate-x-1/2 rounded-full bg-orange-500" />
        </motion.div>
      </div>

      {/* footer scale */}
      <div className="mt-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.18em] text-neutral-400">
        <span>Idea in</span>
        <span className="flex flex-1 items-center px-3">
          <span aria-hidden="true" className="block h-px flex-1 bg-white/20" />
        </span>
        <span className="tabular text-neutral-200">Decision out</span>
      </div>
    </div>
  )
}

// --- mobile (compact, static) -------------------------------------------

function SprintCycleMobile({ reduce, outcome }) {
  return (
    <div className="relative">
      <div className="mb-3 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-neutral-400">
        <span className="block h-1.5 w-1.5 rounded-full bg-orange-500" />
        Sprint cycle · 1 to 2 weeks
      </div>

      <ol className="overflow-hidden rounded-xl border border-white/20 bg-white/[0.04] divide-y divide-white/10">
        {PHASES.map((p) => {
          const span = p.end - p.start
          const fillStart = p.start + 0.005
          const fillEnd = p.start + span * 0.85
          return (
            <li
              key={p.key}
              className="relative flex items-baseline gap-3 overflow-hidden px-4 py-3"
            >
              <motion.span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 origin-left bg-orange-500/20"
                initial={{ scaleX: 0 }}
                animate={
                  reduce
                    ? { scaleX: 1 }
                    : { scaleX: [0, 0, 1, 1, 0] }
                }
                transition={
                  reduce
                    ? {}
                    : {
                        duration: CYCLE,
                        times: [
                          0,
                          clamp01(fillStart),
                          clamp01(fillEnd),
                          0.99,
                          1,
                        ],
                        ease: [0.22, 1, 0.36, 1],
                        repeat: Infinity,
                      }
                }
              />
              <span className="tabular relative font-mono text-[10px] uppercase tracking-[0.18em] text-orange-500">
                § {p.key}
              </span>
              <span className="relative font-display text-base font-medium leading-tight tracking-tight text-white">
                {p.label}
              </span>
              <span className="tabular relative ml-auto font-mono text-[10px] uppercase tracking-[0.18em] text-neutral-300">
                {p.day}
              </span>
            </li>
          )
        })}
      </ol>

      <div className="mt-3 flex items-baseline justify-between font-mono text-[10px] uppercase tracking-[0.18em] text-neutral-400">
        <span>Idea in</span>
        <span
          className={`tabular font-display text-sm font-medium tracking-tight ${outcome.tone}`}
        >
          → {outcome.word}
        </span>
      </div>
    </div>
  )
}

// --- card ----------------------------------------------------------------

export function BuildLessCard() {
  const reduce = useReducedMotion()
  const [outcomeIdx, setOutcomeIdx] = useState(0)

  useEffect(() => {
    if (reduce) return
    const id = setInterval(
      () => setOutcomeIdx((i) => (i + 1) % OUTCOMES.length),
      CYCLE * 1000,
    )
    return () => clearInterval(id)
  }, [reduce])

  const outcome = OUTCOMES[outcomeIdx]

  return (
    <section
      id="buildless-feature"
      className="mt-12 sm:mt-16 lg:mt-20"
      aria-labelledby="buildless-feature-title"
    >
      <Container>
        <FadeIn>
          <div className="relative isolate flex flex-col overflow-hidden rounded-3xl border border-neutral-950/10 bg-neutral-950 p-6 sm:p-10 lg:min-h-[58vh] lg:p-14">
            {/* eyebrow */}
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-2 border-b border-white/20 pb-3 font-mono text-[10px] uppercase tracking-[0.18em] text-neutral-300">
              <span className="flex items-center gap-2 text-white">
                <span className="block h-1.5 w-1.5 rounded-full bg-orange-500" />
                BuildLess
              </span>
              <span className="text-neutral-500">/</span>
              <span className="text-neutral-300">Build Decision Sprint</span>
              <span className="ml-auto hidden text-neutral-400 sm:inline">
                Headline practice · §&nbsp;02
              </span>
            </div>

            {/* headline + copy */}
            <div className="mt-10 grid grid-cols-1 gap-x-12 gap-y-8 sm:mt-14 lg:grid-cols-12">
              <h2
                id="buildless-feature-title"
                className="wdth-wide font-display text-[clamp(2rem,5.4vw,4.25rem)] font-medium leading-[1.04] tracking-tight text-white [text-wrap:balance] lg:col-span-7"
              >
                Before you build,{' '}
                <span className="text-neutral-400">know it matters.</span>
              </h2>

              <div className="lg:col-span-5 lg:pt-3">
                <p className="text-base leading-relaxed text-neutral-200 sm:text-lg">
                  We turn product ideas into live tests in days, put them in
                  front of real users, and end with a clear build-or-kill
                  decision grounded in evidence.
                </p>

                <ul className="mt-6 space-y-2 font-mono text-[11px] uppercase tracking-[0.18em] text-neutral-300">
                  {[
                    'Fixed-scope validation sprint',
                    'Starting at $8k',
                    'Managed end-to-end',
                  ].map((item) => (
                    <li key={item} className="flex items-baseline gap-2.5">
                      <span
                        aria-hidden="true"
                        className="block h-1 w-1 shrink-0 translate-y-[-1px] rounded-full bg-orange-500/80"
                      />
                      <span className="tabular">{item}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/buildless"
                  className="group mt-7 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-orange-500 transition hover:text-orange-300"
                >
                  Open BuildLess
                  <span
                    aria-hidden="true"
                    className="transition-transform group-hover:translate-x-0.5"
                  >
                    →
                  </span>
                </Link>
              </div>
            </div>

            {/* sprint cycle: simple stacked list on mobile, animated timeline from sm+ */}
            <div className="mt-10 sm:mt-14 lg:mt-auto lg:pt-14">
              <div className="sm:hidden">
                <SprintCycleMobile reduce={reduce} outcome={outcome} />
              </div>
              <div className="hidden sm:block">
                <SprintCycle reduce={reduce} outcome={outcome} />
              </div>
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  )
}
