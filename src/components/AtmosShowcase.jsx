'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import clsx from 'clsx'

const ATMOS_SLATE = '#334155'
const ATMOS_SKY = '#0EA5E9'
const STEP_MS = 3800

// Each step is a frame in the migration lifecycle. Component progress, traffic
// split, and the status pill are all driven by the active step so the panels
// move in lockstep, like watching a real cutover progress.
const COMPONENTS = [
  { id: 'api', label: 'api gateway', kind: 'service' },
  { id: 'postgres', label: 'postgres-primary', kind: 'database' },
  { id: 'redis', label: 'redis-cache', kind: 'cache' },
  { id: 'objects', label: 'object-store', kind: 'storage' },
  { id: 'secrets', label: 'secrets', kind: 'config' },
]

const STEPS = [
  {
    id: 'plan',
    status: 'plan · mapping target',
    statusKind: 'plan',
    decision: 'aws us-east-1 → gcp us-central1 · 5 components · diff ok',
    progress: { api: 0, postgres: 0, redis: 0, objects: 0, secrets: 0 },
    traffic: { source: 100, target: 0 },
    health: { source: 'live', target: 'idle' },
  },
  {
    id: 'mirror',
    status: 'mirror · streaming changes',
    statusKind: 'work',
    decision: 'wal stream open · cdc lag 0.4s · objects 38% copied',
    progress: { api: 100, postgres: 64, redis: 100, objects: 38, secrets: 100 },
    traffic: { source: 100, target: 0 },
    health: { source: 'live', target: 'syncing' },
  },
  {
    id: 'cutover',
    status: 'cutover · shifting traffic',
    statusKind: 'route',
    decision: 'dns weight 50 / 50 · drain 30s · checks green',
    progress: { api: 100, postgres: 100, redis: 100, objects: 100, secrets: 100 },
    traffic: { source: 50, target: 50 },
    health: { source: 'draining', target: 'live' },
  },
  {
    id: 'live',
    status: 'live on target',
    statusKind: 'live',
    decision: 'gcp us-central1 · p95 142ms · source quiesced',
    progress: { api: 100, postgres: 100, redis: 100, objects: 100, secrets: 100 },
    traffic: { source: 0, target: 100 },
    health: { source: 'idle', target: 'live' },
  },
]

function CloudGlyph({ provider, className, style }) {
  // Stylized cloud silhouette so AWS/GCP read distinctly without logos.
  const path =
    provider === 'aws'
      ? 'M3 14 A6 6 0 0 1 9 8 A7 7 0 0 1 22 9 A5 5 0 0 1 26 16 H6 A4 4 0 0 1 3 14 Z'
      : 'M4 15 A5 5 0 0 1 9 10 A6 6 0 0 1 16 7 A7 7 0 0 1 24 14 A4 4 0 0 1 22 18 H7 A4 4 0 0 1 4 15 Z'
  return (
    <svg
      viewBox="0 0 28 22"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <path d={path} fill="currentColor" />
    </svg>
  )
}

function HealthDot({ state }) {
  const map = {
    live: { color: ATMOS_SKY, pulse: true },
    syncing: { color: ATMOS_SLATE, pulse: true },
    draining: { color: '#F59E0B', pulse: true },
    idle: { color: '#A3A3A3', pulse: false },
  }
  const cfg = map[state] ?? map.idle
  return (
    <span className="relative inline-flex h-1.5 w-1.5">
      {cfg.pulse && (
        <span
          className="absolute inset-0 animate-ping rounded-full opacity-70"
          style={{ background: cfg.color }}
        />
      )}
      <span
        className="relative inline-block h-1.5 w-1.5 rounded-full"
        style={{ background: cfg.color }}
      />
    </span>
  )
}

function CloudPanel({ provider, region, health, weight, isTarget }) {
  const name = provider === 'aws' ? 'aws' : 'gcp'
  return (
    <div
      className={clsx(
        'flex flex-1 flex-col gap-1 rounded-md border bg-white px-2.5 py-2 transition-colors',
        isTarget && health === 'live'
          ? 'border-[color:var(--sky)]'
          : 'border-neutral-950/15',
      )}
      style={{ '--sky': ATMOS_SKY }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <CloudGlyph
            provider={provider}
            className="h-3 w-3"
            style={{ color: ATMOS_SLATE }}
          />
          <span className="font-mono text-[9px] font-semibold tracking-tight text-neutral-950">
            {name}
          </span>
        </div>
        <HealthDot state={health} />
      </div>
      <div className="font-mono text-[8px] text-neutral-500">{region}</div>
      <div className="mt-0.5 flex items-baseline gap-1">
        <motion.span
          key={weight}
          initial={{ opacity: 0, y: -2 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="font-mono tabular text-[14px] font-medium leading-none text-neutral-950"
        >
          {weight}
        </motion.span>
        <span className="font-mono text-[8px] text-neutral-500">% traffic</span>
      </div>
    </div>
  )
}

function ComponentRow({ component, progress, phase }) {
  const stateLabel =
    progress >= 100
      ? phase === 'live'
        ? 'cut over'
        : phase === 'cutover'
          ? 'mirrored'
          : 'mirrored'
      : progress > 0
        ? 'replicating'
        : 'queued'

  const isDone = progress >= 100
  const barColor =
    phase === 'live'
      ? ATMOS_SKY
      : phase === 'cutover'
        ? ATMOS_SKY
        : ATMOS_SLATE

  return (
    <div className="grid grid-cols-12 items-center gap-x-2 px-2.5 py-1.5">
      <div className="col-span-5 flex items-center gap-1.5">
        <span
          className="inline-block h-1 w-1 rounded-full"
          style={{
            background: isDone ? ATMOS_SKY : ATMOS_SLATE,
            opacity: isDone ? 1 : 0.45,
          }}
        />
        <span className="font-mono text-[9px] text-neutral-950">
          {component.label}
        </span>
      </div>
      <div className="col-span-5 flex items-center gap-1.5">
        <span className="relative h-1 flex-1 overflow-hidden rounded-full bg-neutral-100">
          <motion.span
            className="absolute inset-y-0 left-0 rounded-full"
            initial={false}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            style={{ background: barColor }}
          />
        </span>
      </div>
      <div className="col-span-2 text-right font-mono text-[8px] uppercase tracking-wider text-neutral-500">
        {stateLabel}
      </div>
    </div>
  )
}

function StatusPill({ kind, children }) {
  const styles = {
    plan: { bg: 'rgba(51,65,85,0.10)', fg: ATMOS_SLATE, label: 'plan' },
    work: { bg: 'rgba(51,65,85,0.14)', fg: ATMOS_SLATE, label: 'work' },
    route: { bg: 'rgba(245,158,11,0.16)', fg: '#B45309', label: 'route' },
    live: { bg: 'rgba(14,165,233,0.14)', fg: ATMOS_SKY, label: 'live' },
  }
  const s = styles[kind] ?? styles.plan
  return (
    <span
      className="rounded-sm px-1.5 py-0.5 font-mono text-[8px] font-bold uppercase tracking-[0.18em]"
      style={{ background: s.bg, color: s.fg }}
    >
      {children ?? s.label}
    </span>
  )
}

function TrafficBar({ source, target }) {
  return (
    <div className="flex items-center gap-2 px-2.5 py-2">
      <span className="font-mono text-[8px] uppercase tracking-wider text-neutral-500">
        traffic
      </span>
      <div className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-neutral-100">
        <motion.span
          className="absolute inset-y-0 left-0"
          initial={false}
          animate={{ width: `${source}%` }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{ background: ATMOS_SLATE }}
        />
        <motion.span
          className="absolute inset-y-0 right-0"
          initial={false}
          animate={{ width: `${target}%` }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{ background: ATMOS_SKY }}
        />
      </div>
      <span className="font-mono tabular text-[9px] text-neutral-950">
        {source}/{target}
      </span>
    </div>
  )
}

export function AtmosShowcase({ className }) {
  const shouldReduceMotion = useReducedMotion()
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (shouldReduceMotion) return
    const id = setInterval(() => {
      setActive((i) => (i + 1) % STEPS.length)
    }, STEP_MS)
    return () => clearInterval(id)
  }, [shouldReduceMotion])

  const step = STEPS[active]

  return (
    <div className={clsx('relative w-full max-w-md', className)}>
      <div
        aria-hidden="true"
        className="absolute -bottom-3 -right-3 left-3 top-3 -z-10 border border-neutral-950/10 bg-neutral-50"
      />

      <article className="relative flex aspect-[4/5] flex-col overflow-hidden border border-neutral-950/15 bg-white">
        {/* spec header */}
        <header className="flex items-center justify-between border-b border-neutral-950/10 px-3 py-2 eyebrow text-neutral-500">
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-neutral-300" />
            <span className="h-1.5 w-1.5 rounded-full bg-neutral-300" />
            <span className="h-1.5 w-1.5 rounded-full bg-neutral-300" />
            <span className="ml-3 font-mono text-[9px] tracking-tight text-neutral-700">
              atmos · workload migration
            </span>
          </span>
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={step.id}
              initial={{ opacity: 0, y: -2 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 2 }}
              transition={{ duration: 0.25 }}
            >
              <StatusPill kind={step.statusKind}>{step.status}</StatusPill>
            </motion.span>
          </AnimatePresence>
        </header>

        {/* clouds row */}
        <div className="flex items-stretch gap-2 px-3 pt-3">
          <CloudPanel
            provider="aws"
            region="us-east-1"
            health={step.health.source}
            weight={step.traffic.source}
            isTarget={false}
          />

          {/* arrow + cdc indicator */}
          <div className="flex flex-col items-center justify-center px-1">
            <svg
              viewBox="0 0 32 8"
              className="h-2 w-8"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="atmos-flow" x1="0" x2="1">
                  <stop offset="0%" stopColor={ATMOS_SLATE} />
                  <stop offset="100%" stopColor={ATMOS_SKY} />
                </linearGradient>
              </defs>
              <path
                d="M0 4 H26 M22 1 L26 4 L22 7"
                fill="none"
                stroke="url(#atmos-flow)"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="mt-1 font-mono text-[7px] uppercase tracking-wider text-neutral-500">
              cdc
            </span>
          </div>

          <CloudPanel
            provider="gcp"
            region="us-central1"
            health={step.health.target}
            weight={step.traffic.target}
            isTarget
          />
        </div>

        {/* decision line */}
        <div className="px-3 pt-3">
          <AnimatePresence mode="wait" initial={false}>
            <motion.p
              key={step.decision}
              initial={{ opacity: 0, y: 3 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -3 }}
              transition={{ duration: 0.3 }}
              className="truncate font-mono text-[9px] leading-snug text-neutral-700"
            >
              <span className="text-neutral-400">›</span> {step.decision}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* component table */}
        <div className="mx-3 mt-3 flex-1 overflow-hidden rounded-md border border-neutral-950/10 bg-white">
          <div className="flex items-center justify-between border-b border-neutral-950/10 px-2.5 py-1.5">
            <span className="font-mono text-[8px] uppercase tracking-wider text-neutral-500">
              components
            </span>
            <span className="font-mono text-[7px] text-neutral-400">
              5 mapped
            </span>
          </div>
          <div className="divide-y divide-neutral-950/5">
            {COMPONENTS.map((c) => (
              <ComponentRow
                key={c.id}
                component={c}
                progress={step.progress[c.id] ?? 0}
                phase={step.id}
              />
            ))}
          </div>
        </div>

        {/* traffic bar */}
        <div className="mx-3 mt-3 mb-3 rounded-md border border-neutral-950/10 bg-white">
          <TrafficBar
            source={step.traffic.source}
            target={step.traffic.target}
          />
        </div>

        {/* spec footer */}
        <footer className="flex items-baseline justify-between border-t border-neutral-950/10 px-3 py-2 eyebrow text-neutral-500">
          <span className="wdth-narrow">Live migration</span>
          <span className="font-mono">
            phase {active + 1} / {STEPS.length}
          </span>
        </footer>
      </article>
    </div>
  )
}
