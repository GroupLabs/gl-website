'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import clsx from 'clsx'

const NORMA_AMBER = '#B45309'
const NORMA_AMBER_SOFT = 'rgba(180,83,9,0.10)'
const TICK_MS = 2200

// Each "trial" is one candidate preprocessing pipeline scored by 5-fold
// XGBoost cross-validation. The showcase animates the search loop: new
// trials slide in at the top, the leaderboard re-sorts, and the running
// best updates. The numbers are scripted so the user can read them.
const TRIALS = [
  {
    pipe: ['log(price)', 'target_enc(country)', 'bin(age, 5)'],
    auc: 0.847,
    sd: 0.012,
  },
  {
    pipe: ['log(price)', 'onehot(country)', 'age'],
    auc: 0.821,
    sd: 0.018,
  },
  {
    pipe: ['price', 'count_enc(country)', 'bin(age, 10)'],
    auc: 0.804,
    sd: 0.021,
  },
  {
    pipe: ['log(price)', 'freq_enc(country)', 'age², age'],
    auc: 0.852,
    sd: 0.009,
  },
  {
    pipe: ['box-cox(price)', 'target_enc(country)', 'bin(age, 5)'],
    auc: 0.858,
    sd: 0.011,
  },
  {
    pipe: ['log(price)', 'target_enc(country)·CV', 'bin(age, 8)'],
    auc: 0.861,
    sd: 0.008,
  },
  {
    pipe: ['log(price)', 'target_enc(country)', 'bin(age, 5)', 'price/age'],
    auc: 0.866,
    sd: 0.010,
  },
  {
    pipe: ['log(price)', 'mean_enc(country)', 'bin(age, 7)', 'price·tenure'],
    auc: 0.872,
    sd: 0.007,
  },
]

const SEARCH_SPACE = 1024

function PipelineChip({ children, accent }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-sm border px-1.5 py-[1px] font-mono text-[8.5px] tracking-tight',
        accent
          ? 'border-transparent text-white'
          : 'border-neutral-950/15 bg-white text-neutral-700',
      )}
      style={accent ? { background: NORMA_AMBER } : undefined}
    >
      {children}
    </span>
  )
}

function TrialRow({ trial, rank, isBest, isNew }) {
  return (
    <motion.li
      layout
      initial={isNew ? { opacity: 0, y: -12, scale: 0.98 } : false}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.98 }}
      transition={{
        layout: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
        opacity: { duration: 0.3 },
        y: { duration: 0.3 },
      }}
      className={clsx(
        'relative grid grid-cols-12 items-center gap-x-2 border-t border-neutral-950/5 px-2.5 py-2 first:border-t-0',
      )}
      style={isBest ? { background: NORMA_AMBER_SOFT } : undefined}
    >
      <div className="col-span-1 font-mono tabular text-[9px] text-neutral-500">
        #{String(rank).padStart(2, '0')}
      </div>
      <div className="col-span-7 flex flex-wrap items-center gap-1">
        {trial.pipe.map((step, i) => (
          <PipelineChip key={i} accent={isBest && i === 0}>
            {step}
          </PipelineChip>
        ))}
      </div>
      <div className="col-span-4 flex items-baseline justify-end gap-1.5">
        <span
          className="font-mono tabular text-[12px] font-semibold tracking-tight"
          style={{ color: isBest ? NORMA_AMBER : '#0A0A0A' }}
        >
          {trial.auc.toFixed(3)}
        </span>
        <span className="font-mono tabular text-[8px] text-neutral-500">
          ±{trial.sd.toFixed(3)}
        </span>
      </div>
      {isBest && (
        <span
          className="absolute -top-[1px] right-2 -translate-y-1/2 rounded-sm px-1.5 py-[1px] font-mono text-[7.5px] font-bold uppercase tracking-[0.18em] text-white"
          style={{ background: NORMA_AMBER }}
        >
          Best
        </span>
      )}
    </motion.li>
  )
}

function FoldStrip({ active }) {
  // Visualises the 5-fold split currently being scored.
  return (
    <div className="flex items-center gap-1">
      <span className="font-mono text-[8px] uppercase tracking-wider text-neutral-500">
        Fold
      </span>
      <div className="flex gap-[3px]">
        {Array.from({ length: 5 }).map((_, i) => {
          const isHeld = i === active
          return (
            <motion.span
              key={i}
              animate={{
                background: isHeld ? NORMA_AMBER : 'rgba(10,10,10,0.10)',
              }}
              transition={{ duration: 0.25 }}
              className="block h-2.5 w-3 rounded-[1px]"
            />
          )
        })}
      </div>
    </div>
  )
}

export function NormaShowcase({ className }) {
  const shouldReduceMotion = useReducedMotion()
  const [tick, setTick] = useState(0)

  useEffect(() => {
    if (shouldReduceMotion) return
    const id = setInterval(() => setTick((t) => t + 1), TICK_MS)
    return () => clearInterval(id)
  }, [shouldReduceMotion])

  // Build the visible leaderboard: take a rolling window of trials and sort
  // by AUC descending. The newest trial gets isNew=true so it slides in.
  const windowSize = 5
  const startIdx = tick % TRIALS.length
  const visible = Array.from({ length: windowSize }, (_, i) => {
    const idx = (startIdx + i) % TRIALS.length
    return { ...TRIALS[idx], key: `${tick}-${idx}`, isNewest: i === 0 }
  })
  const sorted = [...visible].sort((a, b) => b.auc - a.auc)
  const bestAuc = sorted[0].auc
  const trialsRun = 248 + tick * 7
  const pct = Math.min(99, Math.round((trialsRun / SEARCH_SPACE) * 100))
  const activeFold = tick % 5

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
              norma · search · churn_q3.parquet
            </span>
          </span>
          <span className="flex items-center gap-1.5">
            <span
              className="relative inline-flex h-1.5 w-1.5 rounded-full"
              style={{ background: NORMA_AMBER }}
            >
              <span
                className="absolute inset-0 animate-ping rounded-full"
                style={{ background: NORMA_AMBER, opacity: 0.5 }}
              />
            </span>
            Searching
          </span>
        </header>

        {/* progress strip */}
        <div className="border-b border-neutral-950/10 px-3 py-2.5">
          <div className="flex items-baseline justify-between">
            <span className="font-mono text-[9px] uppercase tracking-wider text-neutral-500">
              Trial budget
            </span>
            <span className="font-mono tabular text-[10px] text-neutral-700">
              <span className="font-semibold text-neutral-950">
                {trialsRun.toLocaleString()}
              </span>{' '}
              / {SEARCH_SPACE.toLocaleString()}
            </span>
          </div>
          <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-neutral-100">
            <motion.div
              className="h-full rounded-full"
              style={{ background: NORMA_AMBER }}
              animate={{ width: `${pct}%` }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
          <div className="mt-2 flex items-center justify-between">
            <FoldStrip active={activeFold} />
            <div className="flex items-baseline gap-1.5">
              <span className="font-mono text-[8px] uppercase tracking-wider text-neutral-500">
                Best AUC
              </span>
              <motion.span
                key={bestAuc}
                initial={{ opacity: 0, y: -3 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="font-mono tabular text-[12px] font-semibold tracking-tight"
                style={{ color: NORMA_AMBER }}
              >
                {bestAuc.toFixed(3)}
              </motion.span>
            </div>
          </div>
        </div>

        {/* leaderboard heading */}
        <div className="grid grid-cols-12 gap-x-2 border-b border-neutral-950/10 bg-neutral-50/60 px-2.5 py-1.5">
          <span className="col-span-1 font-mono text-[7.5px] uppercase tracking-wider text-neutral-500">
            #
          </span>
          <span className="col-span-7 font-mono text-[7.5px] uppercase tracking-wider text-neutral-500">
            Pipeline
          </span>
          <span className="col-span-4 text-right font-mono text-[7.5px] uppercase tracking-wider text-neutral-500">
            CV AUC ± σ
          </span>
        </div>

        {/* leaderboard */}
        <ul className="flex-1 overflow-hidden">
          <AnimatePresence initial={false}>
            {sorted.map((t, i) => (
              <TrialRow
                key={t.key}
                trial={t}
                rank={i + 1}
                isBest={i === 0}
                isNew={t.isNewest}
              />
            ))}
          </AnimatePresence>
        </ul>

        {/* spec footer */}
        <footer className="flex items-baseline justify-between border-t border-neutral-950/10 px-3 py-2 eyebrow text-neutral-500">
          <span className="wdth-narrow">XGBoost · 5-fold CV · stratified</span>
          <span className="font-mono">{pct}%</span>
        </footer>
      </article>
    </div>
  )
}
