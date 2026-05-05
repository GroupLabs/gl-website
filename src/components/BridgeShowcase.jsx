'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import clsx from 'clsx'

const BRIDGE_FOREST = '#14532D'
const BRIDGE_EMERALD = '#10B981'
const STEP_MS = 3200

// Each step is a frame in a single query's lifecycle. Both lanes (sparse +
// dense) advance together so the latency counter, lane progress, and result
// list stay coherent. The whole thing wraps in well under 1ms.
const STEPS = [
  {
    id: 'idle',
    status: 'idle · listening',
    statusKind: 'idle',
    note: '12.4M docs · 1.2 GB resident',
    sparse: { active: false, scanned: 0, hits: 0, us: 0 },
    dense:  { active: false, scanned: 0, hits: 0, us: 0 },
    fusion: null,
    totalUs: 0,
  },
  {
    id: 'parse',
    status: 'parse · tokenize + embed',
    statusKind: 'work',
    note: 'tokens 6 · query vec 384d · simd avx2',
    sparse: { active: false, scanned: 0, hits: 0, us: 12 },
    dense:  { active: false, scanned: 0, hits: 0, us: 38 },
    fusion: null,
    totalUs: 50,
  },
  {
    id: 'scan',
    status: 'scan · bm25 ∥ hnsw',
    statusKind: 'work',
    note: 'sparse skiplist + dense hnsw · ef=64',
    sparse: { active: true, scanned: 18420, hits: 24, us: 142 },
    dense:  { active: true, scanned: 4096,  hits: 32, us: 268 },
    fusion: null,
    totalUs: 410,
  },
  {
    id: 'fuse',
    status: 'fuse · reciprocal rank',
    statusKind: 'route',
    note: 'rrf k=60 · top-10 from 56 candidates',
    sparse: { active: false, scanned: 18420, hits: 24, us: 142 },
    dense:  { active: false, scanned: 4096,  hits: 32, us: 268 },
    fusion: { merged: 56, returned: 10, us: 31 },
    totalUs: 472,
  },
  {
    id: 'done',
    status: 'returned · 472 µs',
    statusKind: 'live',
    note: 'p50 0.4 ms · p99 1.1 ms · zero alloc on hot path',
    sparse: { active: false, scanned: 18420, hits: 24, us: 142 },
    dense:  { active: false, scanned: 4096,  hits: 32, us: 268 },
    fusion: { merged: 56, returned: 10, us: 31 },
    totalUs: 472,
  },
]

const STATUS_COLOR = {
  idle: '#9CA3AF',
  work: BRIDGE_EMERALD,
  route: BRIDGE_EMERALD,
  live: BRIDGE_FOREST,
}

const RESULTS = [
  { id: '0x9a4c', title: 'red leather wallet · vintage', sparse: 8.4, dense: 0.92, kind: 'product' },
  { id: '0x4ee1', title: 'leather card holder · slim',   sparse: 6.1, dense: 0.88, kind: 'product' },
  { id: '0x71b3', title: 'wallet care guide',             sparse: 5.7, dense: 0.71, kind: 'doc'     },
  { id: '0x2c08', title: 'crimson coin purse',            sparse: 2.3, dense: 0.84, kind: 'product' },
]

function pad(n, width) {
  const s = String(n)
  return s.length >= width ? s : ' '.repeat(width - s.length) + s
}

function LaneRow({ label, color, lane, totalScanned }) {
  // Lane progress bar fills proportionally to how far through the index it scanned.
  // Sparse lane runs the whole posting list; dense lane does a tiny HNSW walk.
  // Both should look fast. They finish their fill in under one beat.
  const pct = lane.scanned === 0 ? 0 : Math.min(100, (lane.scanned / totalScanned) * 100)
  return (
    <div className="grid grid-cols-12 items-center gap-x-2 px-2.5 py-1.5">
      <div className="col-span-3 flex items-center gap-1.5">
        <span
          className="h-1.5 w-1.5 rounded-full"
          style={{
            background: lane.active ? color : 'rgba(20,83,45,0.25)',
            boxShadow: lane.active ? `0 0 6px ${color}` : 'none',
          }}
        />
        <span className="font-mono text-[8.5px] uppercase tracking-wider text-neutral-700">
          {label}
        </span>
      </div>
      <div className="col-span-5 flex items-center gap-1.5">
        <span className="relative h-1 flex-1 overflow-hidden rounded-full bg-neutral-100">
          <motion.span
            className="absolute inset-y-0 left-0 rounded-full"
            initial={false}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            style={{ background: color }}
          />
        </span>
      </div>
      <div className="col-span-2 text-right font-mono tabular text-[8.5px] text-neutral-500">
        {lane.scanned.toLocaleString()}
      </div>
      <div className="col-span-2 text-right font-mono tabular text-[8.5px]"
           style={{ color: lane.us > 0 ? BRIDGE_FOREST : '#9CA3AF' }}>
        {lane.us > 0 ? `${lane.us} µs` : '··'}
      </div>
    </div>
  )
}

function ResultsPanel({ visible }) {
  return (
    <div className="border-t border-neutral-950/10 bg-neutral-50/60">
      <div className="flex items-baseline justify-between border-b border-neutral-950/10 px-2.5 py-1.5">
        <span className="font-mono text-[7.5px] uppercase tracking-wider text-neutral-500">
          top results
        </span>
        <span className="font-mono tabular text-[7.5px] text-neutral-500">
          rrf · k=60
        </span>
      </div>
      <ul className="divide-y divide-neutral-950/5">
        {RESULTS.map((r, i) => (
          <li
            key={r.id}
            className={clsx(
              'grid grid-cols-12 items-center gap-x-2 px-2.5 py-1.5 transition-opacity',
              visible ? 'opacity-100' : 'opacity-25',
            )}
            style={{ transitionDelay: visible ? `${i * 60}ms` : '0ms' }}
          >
            <span className="col-span-1 font-mono tabular text-[8px] text-neutral-400">
              {pad(i + 1, 2)}
            </span>
            <span className="col-span-2 font-mono text-[8px] text-neutral-500">
              {r.id}
            </span>
            <span className="col-span-6 truncate font-mono text-[9px] text-neutral-950">
              {r.title}
            </span>
            <span className="col-span-3 flex items-center justify-end gap-1.5 font-mono tabular text-[8px]">
              <span style={{ color: BRIDGE_FOREST }}>{r.sparse.toFixed(1)}</span>
              <span className="text-neutral-300">·</span>
              <span style={{ color: BRIDGE_EMERALD }}>{r.dense.toFixed(2)}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function StatusPill({ kind, children }) {
  const color = STATUS_COLOR[kind]
  const dot = kind === 'idle' ? '#9CA3AF' : color
  return (
    <span className="flex items-center gap-1.5">
      <motion.span
        className="h-1.5 w-1.5 rounded-full"
        animate={{ scale: kind === 'work' ? [1, 1.3, 1] : 1 }}
        transition={{ duration: 0.9, repeat: kind === 'work' ? Infinity : 0 }}
        style={{
          background: dot,
          boxShadow: kind === 'live' ? `0 0 6px ${color}` : 'none',
        }}
      />
      <span style={{ color }}>{children}</span>
    </span>
  )
}

const QUERY_TEXT = 'red leather wallet'

export function BridgeShowcase({ className }) {
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
  const showResults = step.id === 'fuse' || step.id === 'done'
  const queryTyping = step.id === 'idle' || step.id === 'parse'

  // Animate the latency counter so it ticks up as the query progresses, instead
  // of just snapping to a final number.
  const [displayUs, setDisplayUs] = useState(0)
  useEffect(() => {
    const target = step.totalUs
    const start = displayUs
    const duration = 380
    const t0 = performance.now()
    let raf = 0
    const tick = (t) => {
      const k = Math.min(1, (t - t0) / duration)
      const eased = 1 - Math.pow(1 - k, 3)
      setDisplayUs(Math.round(start + (target - start) * eased))
      if (k < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active])

  const totalScannedRef = 18420 + 4096

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
              bridge://index/products
            </span>
          </span>
          <StatusPill kind={step.statusKind}>{step.status}</StatusPill>
        </header>

        {/* query bar */}
        <div className="border-b border-neutral-950/10 bg-neutral-50/40 px-3 py-2.5">
          <div className="flex items-baseline justify-between">
            <span className="font-mono text-[7.5px] uppercase tracking-wider text-neutral-500">
              query
            </span>
            <span className="font-mono tabular text-[7.5px] text-neutral-500">
              hybrid · sparse + dense
            </span>
          </div>
          <div className="mt-1.5 flex items-center gap-2 rounded-sm border border-neutral-950/15 bg-white px-2 py-1.5">
            <span
              className="font-mono text-[8.5px] font-semibold uppercase tracking-wider"
              style={{ color: BRIDGE_FOREST }}
            >
              q&gt;
            </span>
            <span className="flex-1 truncate font-mono text-[10.5px] text-neutral-950">
              {QUERY_TEXT}
              {queryTyping && (
                <span className="ml-0.5 inline-block h-2.5 w-px bg-neutral-950 align-middle animate-blink-caret" />
              )}
            </span>
            <span
              className="ml-auto rounded-sm px-1.5 py-0.5 font-mono text-[8px] font-semibold tracking-wider"
              style={{ background: 'rgba(20,83,45,0.10)', color: BRIDGE_FOREST }}
            >
              ∥ 2 lanes
            </span>
          </div>
        </div>

        {/* lanes */}
        <div className="border-b border-neutral-950/10">
          <div className="grid grid-cols-12 items-baseline gap-x-2 border-b border-neutral-950/5 bg-neutral-50/40 px-2.5 py-1">
            <span className="col-span-3 font-mono text-[7px] uppercase tracking-wider text-neutral-400">
              lane
            </span>
            <span className="col-span-5 font-mono text-[7px] uppercase tracking-wider text-neutral-400">
              scan
            </span>
            <span className="col-span-2 text-right font-mono text-[7px] uppercase tracking-wider text-neutral-400">
              cmp
            </span>
            <span className="col-span-2 text-right font-mono text-[7px] uppercase tracking-wider text-neutral-400">
              t
            </span>
          </div>
          <LaneRow
            label="bm25"
            color={BRIDGE_FOREST}
            lane={step.sparse}
            totalScanned={totalScannedRef}
          />
          <LaneRow
            label="hnsw"
            color={BRIDGE_EMERALD}
            lane={step.dense}
            totalScanned={totalScannedRef}
          />
        </div>

        {/* fusion bar */}
        <div className="flex items-center justify-between border-b border-neutral-950/10 bg-neutral-50/40 px-2.5 py-1.5">
          <span className="font-mono text-[7.5px] uppercase tracking-wider text-neutral-500">
            fuse
          </span>
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={step.fusion ? 'on' : 'off'}
              initial={{ opacity: 0, y: 2 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -2 }}
              transition={{ duration: 0.25 }}
              className="font-mono tabular text-[8.5px]"
              style={{ color: step.fusion ? BRIDGE_FOREST : '#9CA3AF' }}
            >
              {step.fusion
                ? `${step.fusion.merged} → top ${step.fusion.returned} · ${step.fusion.us} µs`
                : 'awaiting candidates'}
            </motion.span>
          </AnimatePresence>
        </div>

        {/* results */}
        <div className="relative flex-1 overflow-hidden">
          <ResultsPanel visible={showResults} />
          {!showResults && (
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <span className="font-mono text-[9px] uppercase tracking-wider text-neutral-300">
                {step.note}
              </span>
            </div>
          )}
        </div>

        {/* spec footer · total latency, animated counter */}
        <footer className="flex items-baseline justify-between border-t border-neutral-950/10 px-3 py-2 eyebrow text-neutral-500">
          <span className="wdth-narrow">total latency</span>
          <span className="flex items-baseline gap-1.5 font-mono tabular text-neutral-700">
            <motion.span
              key={step.statusKind === 'live' ? 'final' : 'live'}
              initial={false}
              animate={{
                color: step.statusKind === 'live' ? BRIDGE_FOREST : '#404040',
              }}
              className="text-[12px] font-semibold"
            >
              {displayUs.toLocaleString()}
            </motion.span>
            <span className="text-[9px] text-neutral-500">µs</span>
          </span>
        </footer>
      </article>
    </div>
  )
}
