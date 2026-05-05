'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import clsx from 'clsx'

const TESSERA_INDIGO = '#4338CA'
const TESSERA_VIOLET = '#818CF8'
const STEP_MS = 3400

// The scheduler view cycles through a unikernel lifecycle:
//   spawn → run → snapshot → retire
// Each frame updates one slot in the grid so the running fleet always
// looks alive. Others stay steady, one tile changes state per beat.
const SLOTS = [
  { id: 'auth',  name: 'auth-jwt',    mem: '1.8M', img: 'unik:0x4a' },
  { id: 'thumb', name: 'img-thumb',   mem: '2.4M', img: 'unik:0x91' },
  { id: 'sql',   name: 'sql-eval',    mem: '3.1M', img: 'unik:0x12' },
  { id: 'py',    name: 'py-sandbox',  mem: '4.2M', img: 'unik:0xc7' },
  { id: 'rate',  name: 'rate-limit',  mem: '0.9M', img: 'unik:0x33' },
  { id: 'pdf',   name: 'pdf-extract', mem: '5.6M', img: 'unik:0x6e' },
]

const STEPS = [
  { focus: 'auth',  state: 'spawn',    boot: '1.2 ms', note: 'cold spawn · hot snapshot' },
  { focus: 'thumb', state: 'run',      boot: null,     note: 'single address space · no syscalls' },
  { focus: 'sql',   state: 'snapshot', boot: '0.4 ms', note: 'forked from warm pool' },
  { focus: 'py',    state: 'retire',   boot: null,     note: 'reaped · pages zeroed' },
  { focus: 'rate',  state: 'spawn',    boot: '0.9 ms', note: 'cold spawn · hot snapshot' },
  { focus: 'pdf',   state: 'run',      boot: null,     note: 'isolated VM · no shared kernel' },
]

const STATE_LABEL = {
  spawn: 'spawn',
  run: 'running',
  snapshot: 'fork',
  retire: 'retire',
}

function StateGlyph({ state }) {
  const glyph =
    state === 'spawn' ? '↑' :
    state === 'snapshot' ? '⌥' :
    state === 'retire' ? '↓' : '·'
  return (
    <span
      className="inline-block w-2 text-center font-mono text-[8px] leading-none"
      style={{
        color: state === 'retire' ? '#9CA3AF' : TESSERA_INDIGO,
      }}
    >
      {glyph}
    </span>
  )
}

function UnikernelTile({ slot, focus, state, tilt }) {
  const isFocus = slot.id === focus
  const dim = isFocus && state === 'retire'
  const bright = isFocus && (state === 'spawn' || state === 'snapshot')

  return (
    <motion.div
      animate={{
        rotate: tilt ? -6 : 0,
        opacity: dim ? 0.35 : 1,
        scale: bright ? 1.02 : 1,
      }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className={clsx(
        'relative flex flex-col gap-1 rounded-sm border bg-white p-1.5',
        isFocus ? 'border-[color:var(--accent)]' : 'border-neutral-950/15',
      )}
      style={{ '--accent': TESSERA_INDIGO }}
    >
      {/* corner index */}
      <span className="absolute right-1 top-0.5 font-mono text-[6px] font-medium uppercase tracking-wider text-neutral-400">
        {slot.img}
      </span>

      <div className="flex items-center gap-1">
        <motion.span
          aria-hidden="true"
          className="block h-1 w-1 rounded-full"
          animate={{
            backgroundColor: dim
              ? '#D4D4D4'
              : isFocus
                ? TESSERA_INDIGO
                : '#A5B4FC',
            opacity: dim ? 0.5 : 1,
          }}
          transition={{ duration: 0.3 }}
        />
        <span className="font-mono text-[8.5px] font-medium text-neutral-950">
          {slot.name}
        </span>
      </div>

      <div className="flex items-baseline justify-between font-mono text-[7px] tabular text-neutral-500">
        <span>{slot.mem}</span>
        {isFocus && (
          <motion.span
            key={state}
            initial={{ opacity: 0, y: 2 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-medium"
            style={{
              color: state === 'retire' ? '#9CA3AF' : TESSERA_INDIGO,
            }}
          >
            {STATE_LABEL[state]}
          </motion.span>
        )}
      </div>

      {/* spawn flash */}
      {bright && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-sm"
          initial={{
            boxShadow: `0 0 0 0px ${TESSERA_INDIGO}, 0 0 0 0px rgba(67,56,202,0)`,
          }}
          animate={{
            boxShadow: [
              `0 0 0 0px ${TESSERA_INDIGO}, 0 0 0 0px rgba(67,56,202,0)`,
              `0 0 0 1.5px ${TESSERA_INDIGO}, 0 0 12px 2px rgba(67,56,202,0.35)`,
              `0 0 0 0px ${TESSERA_INDIGO}, 0 0 0 0px rgba(67,56,202,0)`,
            ],
          }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
        />
      )}
    </motion.div>
  )
}

function HypervisorBar({ ctxSwitches, p50 }) {
  return (
    <div className="border-b border-neutral-950/10 px-2.5 py-1.5">
      <div className="flex items-center justify-between font-mono text-[8px] uppercase tracking-wider text-neutral-500">
        <span className="flex items-center gap-1.5">
          <svg
            viewBox="0 0 12 12"
            className="h-2 w-2"
            fill="none"
            stroke={TESSERA_INDIGO}
            strokeWidth="1.4"
          >
            <rect x="1.5" y="1.5" width="3.5" height="3.5" />
            <rect x="7" y="1.5" width="3.5" height="3.5" />
            <rect x="1.5" y="7" width="3.5" height="3.5" />
            <rect x="7" y="7" width="3.5" height="3.5" />
          </svg>
          hypervisor
        </span>
        <div className="flex items-baseline gap-3 normal-case tracking-normal">
          <span className="text-neutral-400">
            ctx&nbsp;<span className="font-medium tabular text-neutral-950">{ctxSwitches}</span>
          </span>
          <span className="text-neutral-400">
            boot&nbsp;p50&nbsp;<span className="font-medium tabular text-neutral-950">{p50}</span>
          </span>
        </div>
      </div>
    </div>
  )
}

function EventTicker({ step }) {
  return (
    <div className="border-t border-neutral-950/10 bg-neutral-50/60 px-2.5 py-1.5">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={step.focus + step.state}
          initial={{ opacity: 0, y: 3 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -3 }}
          transition={{ duration: 0.25 }}
          className="flex items-center gap-1.5 font-mono text-[9px]"
        >
          <StateGlyph state={step.state} />
          <span className="text-neutral-700">{step.note}</span>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export function TesseraShowcase({ className }) {
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
  const p50Cycle = ['1.2 ms', '1.1 ms', '0.4 ms', '1.3 ms', '0.9 ms', '1.0 ms']
  const p50 = p50Cycle[active]

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
              tessera · scheduler
            </span>
          </span>
          <span className="flex items-center gap-1.5">
            <span
              className="relative inline-flex h-1.5 w-1.5 rounded-full"
              style={{ background: TESSERA_INDIGO }}
            />
            Live
          </span>
        </header>

        <HypervisorBar ctxSwitches={0} p50={p50} />

        {/* fleet grid */}
        <div className="relative flex-1 overflow-hidden bg-white p-2.5">
          {/* faint grid backdrop, echoes the tile motif */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.4]"
            style={{
              backgroundImage:
                'linear-gradient(to right, rgba(67,56,202,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(67,56,202,0.06) 1px, transparent 1px)',
              backgroundSize: '14px 14px',
            }}
          />

          <div className="relative grid grid-cols-2 gap-1.5">
            {SLOTS.map((slot, i) => (
              <UnikernelTile
                key={slot.id}
                slot={slot}
                focus={step.focus}
                state={step.state}
                tilt={i === 5}
              />
            ))}
          </div>

          {/* isolated VM caption (bottom-right floating tag) */}
          <div className="absolute bottom-3 right-3 flex items-center gap-1.5">
            <span
              className="block h-1 w-1 rounded-full"
              style={{ background: TESSERA_VIOLET }}
            />
            <span className="font-mono text-[7.5px] uppercase tracking-[0.18em] text-neutral-500">
              one&nbsp;addr&nbsp;space&nbsp;·&nbsp;per&nbsp;tile
            </span>
          </div>
        </div>

        <EventTicker step={step} />

        {/* spec footer */}
        <footer className="flex items-baseline justify-between border-t border-neutral-950/10 px-3 py-2 eyebrow text-neutral-500">
          <span className="wdth-narrow">Unikernel fleet</span>
          <span className="font-mono">
            {SLOTS.length} VMs · {step.boot ? `boot ${step.boot}` : 'idle'}
          </span>
        </footer>
      </article>
    </div>
  )
}
