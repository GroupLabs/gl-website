'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import clsx from 'clsx'

const TELL_GREEN = '#166534'
const TELL_LIME = '#4ADE80'
const STEP_MS = 3800

const PROVIDERS = [
  { id: 'openai', name: 'openai', model: 'gpt-5', region: 'us-east', share: 47 },
  { id: 'anthropic', name: 'anthropic', model: 'sonnet-4', region: 'us-east', share: 28 },
  { id: 'bedrock', name: 'bedrock', model: 'haiku-4', region: 'us-west', share: 16 },
  { id: 'vertex', name: 'vertex', model: 'gemini-2', region: 'eu-west', share: 9 },
]

// Each step is a frame in the gateway's request lifecycle. The board reflects
// the current state (feasibility filter, chosen lane, cache use) so the
// status, decision line, and provider rows stay in sync.
const STEPS = [
  {
    id: 'in',
    status: 'request received',
    statusKind: 'in',
    decision: 'POST /v1/chat/completions · json_mode · ctx 32k · region us',
    feasible: ['openai', 'anthropic', 'bedrock', 'vertex'],
    chosen: null,
    streaming: false,
    cacheHit: false,
    latency: '·· ms',
  },
  {
    id: 'solve',
    status: 'solver · feasibility + bandit',
    statusKind: 'work',
    decision: 'vertex dropped (region eu) · 3 feasible · scoring',
    feasible: ['openai', 'anthropic', 'bedrock'],
    chosen: null,
    streaming: false,
    cacheHit: false,
    latency: '0.3 ms',
  },
  {
    id: 'route',
    status: 'routed · streaming',
    statusKind: 'route',
    decision: 'anthropic / sonnet-4 · cost 0.03 · obj 0.87',
    feasible: ['openai', 'anthropic', 'bedrock'],
    chosen: 'anthropic',
    streaming: true,
    cacheHit: false,
    latency: '312 ms',
  },
  {
    id: 'cache',
    status: 'next request · semantic cache',
    statusKind: 'cache',
    decision: 'similarity 0.94 · served from vector cache · $0.00',
    feasible: ['openai', 'anthropic', 'bedrock'],
    chosen: null,
    streaming: false,
    cacheHit: true,
    latency: '0.8 ms',
  },
]

const STATS = [
  { label: 'rps', value: '62.3k' },
  { label: 'p50', value: '4.3 ms' },
  { label: 'cache', value: '58%' },
  { label: 'err', value: '0.00%' },
]

function StatusDot({ kind }) {
  // tiny inline glyph keyed by step type, reads as a log icon
  const glyph =
    kind === 'in' ? '↘' : kind === 'work' ? '·' : kind === 'route' ? '→' : '◆'
  return (
    <span
      className="grid h-3 w-3 place-items-center rounded-sm font-mono text-[8px] font-bold"
      style={{
        background: 'rgba(22,101,52,0.10)',
        color: TELL_GREEN,
      }}
    >
      {glyph}
    </span>
  )
}

function ProviderRow({ provider, isFeasible, isChosen, isStreaming }) {
  const dotColor = isChosen
    ? TELL_LIME
    : isFeasible
      ? '#94a3b8'
      : '#e5e7eb'

  const barColor = isChosen ? TELL_LIME : isFeasible ? '#94a3b8' : '#e2e8f0'

  return (
    <motion.div
      animate={{
        backgroundColor: isChosen
          ? 'rgba(74,222,128,0.10)'
          : 'rgba(0,0,0,0)',
        opacity: isFeasible ? 1 : 0.45,
      }}
      transition={{ duration: 0.35 }}
      className="relative flex items-center gap-2 overflow-hidden border-b border-neutral-950/5 px-2.5 py-1.5 last:border-b-0"
      style={{
        boxShadow: isChosen
          ? `inset 2px 0 0 ${TELL_LIME}`
          : 'inset 2px 0 0 transparent',
      }}
    >
      <motion.span
        animate={{ background: dotColor }}
        transition={{ duration: 0.3 }}
        className="h-1.5 w-1.5 flex-shrink-0 rounded-full"
      />
      <span className="w-[58px] truncate font-mono text-[9px] font-semibold text-neutral-950">
        {provider.name}
      </span>
      <span className="w-[52px] truncate font-mono text-[8.5px] text-neutral-600">
        {provider.model}
      </span>
      <span className="w-[44px] truncate font-mono text-[8px] text-neutral-400">
        {provider.region}
      </span>
      <span className="relative ml-auto h-1.5 w-14 overflow-hidden rounded-full bg-neutral-100">
        <motion.span
          className="absolute inset-y-0 left-0 rounded-full"
          animate={{
            width: `${provider.share}%`,
            background: barColor,
          }}
          transition={{ duration: 0.45 }}
        />
      </span>
      <span className="w-7 text-right font-mono tabular text-[8.5px] text-neutral-500">
        {provider.share}%
      </span>

      {/* flowing traffic glint when chosen + streaming */}
      {isStreaming && (
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 -mt-[3px] h-1.5 w-6 rounded-full"
          style={{
            background: `linear-gradient(90deg, transparent, ${TELL_LIME}, transparent)`,
            filter: 'blur(0.5px)',
          }}
          initial={{ left: '-15%' }}
          animate={{ left: '115%' }}
          transition={{ duration: 1.3, repeat: Infinity, ease: 'linear' }}
        />
      )}
    </motion.div>
  )
}

function CacheRow({ active }) {
  return (
    <motion.div
      animate={{
        backgroundColor: active ? 'rgba(74,222,128,0.10)' : 'rgba(0,0,0,0)',
      }}
      transition={{ duration: 0.35 }}
      className="relative flex items-center gap-2 border-t border-neutral-950/10 px-2.5 py-1.5"
      style={{
        boxShadow: active
          ? `inset 2px 0 0 ${TELL_LIME}`
          : 'inset 2px 0 0 transparent',
      }}
    >
      <motion.span
        animate={{ background: active ? TELL_LIME : '#94a3b8' }}
        transition={{ duration: 0.3 }}
        className="h-1.5 w-1.5 flex-shrink-0 rounded-full"
      />
      <span className="font-mono text-[9px] font-semibold text-neutral-950">
        semantic cache
      </span>
      <span className="font-mono text-[8.5px] text-neutral-500">
        823 keys
      </span>
      <span className="ml-auto font-mono tabular text-[8.5px] text-neutral-500">
        hit 58%
      </span>
    </motion.div>
  )
}

export function TellShowcase({ className }) {
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
              tell.gateway / v1
            </span>
          </span>
          <span className="flex items-center gap-1.5">
            <span
              className="relative inline-flex h-1.5 w-1.5 rounded-full animate-pulse-dot"
              style={{ background: TELL_LIME }}
            />
            Live
          </span>
        </header>

        {/* stats strip */}
        <div className="grid grid-cols-4 border-b border-neutral-950/10">
          {STATS.map((s, i) => (
            <div
              key={s.label}
              className={clsx(
                'flex flex-col gap-0.5 px-2.5 py-2',
                i > 0 && 'border-l border-neutral-950/5',
              )}
            >
              <span className="font-mono text-[7px] uppercase tracking-wider text-neutral-500">
                {s.label}
              </span>
              <span className="font-mono tabular text-[11px] font-medium text-neutral-950">
                {s.value}
              </span>
            </div>
          ))}
        </div>

        {/* status line · what the gateway is doing right now */}
        <div className="flex items-center gap-2 border-b border-neutral-950/10 bg-neutral-50/60 px-2.5 py-1.5">
          <StatusDot kind={step.statusKind} />
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={step.id}
              initial={{ opacity: 0, y: -3 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 3 }}
              transition={{ duration: 0.25 }}
              className="font-mono text-[9px] tracking-tight text-neutral-950"
            >
              {step.status}
            </motion.span>
          </AnimatePresence>
          <span className="ml-auto font-mono tabular text-[8.5px] text-neutral-500">
            {step.latency}
          </span>
        </div>

        {/* providers heading */}
        <div className="flex items-baseline justify-between border-b border-neutral-950/10 px-2.5 py-1.5">
          <span className="font-mono text-[7px] uppercase tracking-wider text-neutral-500">
            providers
          </span>
          <span className="font-mono text-[7px] text-neutral-400">
            {step.feasible.length}/4 feasible
          </span>
        </div>

        {/* provider lanes */}
        <div className="flex-1 overflow-hidden">
          {PROVIDERS.map((p) => (
            <ProviderRow
              key={p.id}
              provider={p}
              isFeasible={step.feasible.includes(p.id)}
              isChosen={step.chosen === p.id}
              isStreaming={step.chosen === p.id && step.streaming}
            />
          ))}

          <CacheRow active={step.cacheHit} />

          {/* decision log · cycles with each step */}
          <div className="border-t border-neutral-950/10 bg-neutral-50/70 px-2.5 py-2">
            <div className="flex items-baseline gap-2">
              <span
                className="font-mono text-[7px] uppercase tracking-wider"
                style={{ color: TELL_GREEN }}
              >
                decision
              </span>
              <span className="font-mono text-[7px] text-neutral-400">
                step {active + 1}/{STEPS.length}
              </span>
            </div>
            <AnimatePresence mode="wait" initial={false}>
              <motion.p
                key={step.id}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.3 }}
                className="mt-1 font-mono text-[9px] leading-tight text-neutral-950"
              >
                {step.decision}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>

        {/* spec footer */}
        <footer className="flex items-baseline justify-between border-t border-neutral-950/10 px-3 py-2 eyebrow text-neutral-500">
          <span className="wdth-narrow">Live gateway · last 60s</span>
          <span className="font-mono">routes · cache · audit</span>
        </footer>
      </article>
    </div>
  )
}
