'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import clsx from 'clsx'

const MESH_RED = '#EF4444'

// Heterogeneous fleet. Position is (x, y) in percent of the body.
// One node (NEWCOMER) joins during the discover phase each cycle.
const NODES = [
  { id: 'n0', label: 'A100', kind: 'gpu', x: 22, y: 26 },
  { id: 'n1', label: 'H100', kind: 'gpu', x: 78, y: 22 },
  { id: 'n2', label: '64c',  kind: 'cpu', x: 14, y: 52 },
  { id: 'n3', label: 'L4',   kind: 'gpu', x: 50, y: 48 },
  { id: 'n4', label: '32c',  kind: 'cpu', x: 86, y: 56 },
  { id: 'n5', label: 'A10',  kind: 'gpu', x: 26, y: 80 },
  { id: 'n6', label: 'L40',  kind: 'gpu', x: 74, y: 82 },
]
const NEWCOMER = 6

// Topology — center node is hub-ish, plus a few peripheral edges.
const EDGES = [
  [0, 3], [1, 3], [2, 3], [3, 4], [3, 5], [3, 6],
  [0, 1], [2, 5], [4, 6], [0, 2], [1, 4],
]

// Scheduler routes shards to GPU class only. CPUs stay idle.
const SHARDS = [
  { id: 's0', target: 0 },
  { id: 's1', target: 1 },
  { id: 's2', target: 3 },
  { id: 's3', target: 6 },
]

const STEPS = [
  { id: 'discover',  label: 'Discover',   caption: 'Peer-6 joined · GPU · L40' },
  { id: 'partition', label: 'Partition',  caption: 'ResNet-50 split · 4 shards' },
  { id: 'dispatch',  label: 'Dispatch',   caption: 'Routed to GPU class · CPUs idle' },
  { id: 'execute',   label: 'Execute',    caption: '4 workers training · all-reduce' },
]
const STEP_MS = 4400

const JOB = { x: 50, y: 9 }

function Node({ node, lit, idle, fadingIn, executing }) {
  return (
    <motion.div
      className="absolute -translate-x-1/2 -translate-y-1/2"
      style={{ left: `${node.x}%`, top: `${node.y}%` }}
      initial={
        fadingIn ? { opacity: 0, scale: 0.4 } : { opacity: 1, scale: 1 }
      }
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        animate={{
          borderColor: lit ? MESH_RED : 'rgba(0,0,0,0.18)',
          boxShadow: lit
            ? '0 0 0 3px rgba(239,68,68,0.16), 0 0 14px 1px rgba(239,68,68,0.35)'
            : '0 0 0 0 rgba(239,68,68,0)',
          backgroundColor: lit ? MESH_RED : '#FFFFFF',
          color: lit
            ? '#FFFFFF'
            : node.kind === 'gpu'
              ? '#0a0a0a'
              : '#737373',
          opacity: idle ? 0.45 : 1,
        }}
        transition={{ duration: 0.4 }}
        className="rounded-md border px-1.5 py-0.5 font-mono text-[9px] font-semibold tracking-tight"
      >
        {node.label}
      </motion.div>

      {/* device-class chip beneath, only for GPU */}
      {node.kind === 'gpu' && (
        <motion.span
          className="absolute left-1/2 top-full mt-0.5 -translate-x-1/2 whitespace-nowrap font-mono text-[7px] uppercase tracking-[0.16em] text-neutral-400"
          animate={{ opacity: idle ? 0.4 : 1 }}
        >
          gpu
        </motion.span>
      )}
      {node.kind === 'cpu' && (
        <span className="absolute left-1/2 top-full mt-0.5 -translate-x-1/2 whitespace-nowrap font-mono text-[7px] uppercase tracking-[0.16em] text-neutral-400">
          cpu · idle
        </span>
      )}

      {executing && node.kind === 'gpu' && (
        <div className="absolute left-1/2 top-[140%] mt-0.5 -translate-x-1/2">
          <span className="relative block h-1 w-9 overflow-hidden rounded-full bg-neutral-200">
            <motion.span
              className="absolute inset-y-0 left-0 rounded-full"
              style={{ background: MESH_RED }}
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 2.4, ease: 'easeOut' }}
            />
          </span>
        </div>
      )}
    </motion.div>
  )
}

export function MeshShowcase({ className }) {
  const reduceMotion = useReducedMotion()
  const [active, setActive] = useState(0)
  const [cycle, setCycle] = useState(0)

  useEffect(() => {
    if (reduceMotion) return
    const id = setInterval(() => {
      setActive((i) => (i + 1) % STEPS.length)
    }, STEP_MS)
    return () => clearInterval(id)
  }, [reduceMotion])

  useEffect(() => {
    if (active === 0) setCycle((c) => c + 1)
  }, [active])

  const step = STEPS[active]
  const phase = step.id

  const targetSet = new Set(SHARDS.map((s) => s.target))

  function edgeStyle(a, b) {
    const involvesNew = a === NEWCOMER || b === NEWCOMER
    const involvesTarget = targetSet.has(a) || targetSet.has(b)

    if (phase === 'discover' && involvesNew) {
      return { stroke: MESH_RED, opacity: 0.7, dash: '2 2', isNew: true }
    }
    if ((phase === 'dispatch' || phase === 'execute') && involvesTarget) {
      return { stroke: MESH_RED, opacity: 0.55, dash: undefined, isNew: false }
    }
    return {
      stroke: 'rgba(10,10,10,0.22)',
      opacity: phase === 'discover' && involvesNew ? 0 : 0.85,
      dash: undefined,
      isNew: false,
    }
  }

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
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={phase}
                initial={{ opacity: 0, y: -2 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 2 }}
                transition={{ duration: 0.25 }}
                className="ml-3 font-mono text-[9px] tracking-tight text-neutral-700"
              >
                mesh.cluster · {phase === 'discover' ? '6→7' : '7'} nodes
              </motion.span>
            </AnimatePresence>
          </span>
          <span className="flex items-center gap-1.5">
            <span
              className="relative inline-flex h-1.5 w-1.5 rounded-full"
              style={{ background: MESH_RED }}
            />
            Live
          </span>
        </header>

        {/* body */}
        <div className="relative flex-1 overflow-hidden">
          {/* faint dot grid backdrop */}
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              backgroundImage:
                'radial-gradient(rgba(10,10,10,0.10) 1px, transparent 1px)',
              backgroundSize: '14px 14px',
              opacity: 0.45,
            }}
          />

          {/* edges */}
          <svg
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            {EDGES.map(([a, b], i) => {
              const A = NODES[a]
              const B = NODES[b]
              const involvesNew = a === NEWCOMER || b === NEWCOMER
              const s = edgeStyle(a, b)
              const lineKey = involvesNew && phase === 'discover'
                ? `e-${i}-c${cycle}`
                : `e-${i}`
              return (
                <motion.line
                  key={lineKey}
                  x1={A.x}
                  y1={A.y}
                  x2={B.x}
                  y2={B.y}
                  stroke={s.stroke}
                  strokeWidth={1}
                  vectorEffect="non-scaling-stroke"
                  strokeDasharray={s.dash}
                  initial={
                    s.isNew ? { opacity: 0 } : { opacity: s.opacity }
                  }
                  animate={{ opacity: s.opacity }}
                  transition={{ duration: s.isNew ? 0.9 : 0.4 }}
                />
              )
            })}
          </svg>

          {/* job card — visible during partition / dispatch / execute */}
          <AnimatePresence>
            {(phase === 'partition' ||
              phase === 'dispatch' ||
              phase === 'execute') && (
              <motion.div
                key="job"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.32 }}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${JOB.x}%`, top: `${JOB.y}%` }}
              >
                <div className="rounded-md border border-neutral-950/15 bg-white px-2 py-1.5 shadow-[0_2px_6px_rgba(0,0,0,0.06)]">
                  <div className="font-mono text-[7px] uppercase tracking-[0.18em] text-neutral-500">
                    Job · ResNet-50
                  </div>
                  <div className="mt-1 flex gap-0.5">
                    {SHARDS.map((s, i) => (
                      <motion.span
                        key={`${s.id}-${cycle}`}
                        className="h-1.5 w-3 rounded-sm"
                        initial={{
                          backgroundColor: 'rgba(239,68,68,0.20)',
                          scale: 0.85,
                        }}
                        animate={{
                          backgroundColor:
                            phase === 'execute'
                              ? 'rgba(239,68,68,0.20)'
                              : MESH_RED,
                          scale: phase === 'partition' ? [0.85, 1.1, 1] : 1,
                          opacity:
                            phase === 'dispatch'
                              ? [1, 1, 0.15]
                              : phase === 'execute'
                                ? 0.4
                                : 1,
                        }}
                        transition={{
                          duration: phase === 'dispatch' ? 1.4 : 0.5,
                          delay:
                            phase === 'dispatch'
                              ? 0.4 + i * 0.18
                              : phase === 'partition'
                                ? i * 0.08
                                : 0,
                        }}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* shards in flight from job to assigned GPU node */}
          <AnimatePresence>
            {phase === 'dispatch' &&
              SHARDS.map((s, i) => {
                const target = NODES[s.target]
                return (
                  <motion.span
                    key={`shard-${s.id}-c${cycle}`}
                    className="absolute h-1.5 w-3 -translate-x-1/2 -translate-y-1/2 rounded-sm"
                    style={{
                      background: MESH_RED,
                      boxShadow: '0 0 10px rgba(239,68,68,0.55)',
                    }}
                    initial={{
                      left: `${JOB.x}%`,
                      top: `${JOB.y}%`,
                      opacity: 0,
                      scale: 0.6,
                    }}
                    animate={{
                      left: [`${JOB.x}%`, `${target.x}%`],
                      top: [`${JOB.y}%`, `${target.y}%`],
                      opacity: [0, 1, 1, 0],
                      scale: [0.6, 1, 1, 0.6],
                    }}
                    transition={{
                      duration: 1.7,
                      delay: 0.35 + i * 0.18,
                      ease: [0.5, 0.05, 0.2, 1],
                      times: [0, 0.15, 0.85, 1],
                    }}
                  />
                )
              })}
          </AnimatePresence>

          {/* nodes */}
          {NODES.map((n, idx) => {
            const isNew = idx === NEWCOMER
            const fadingIn = phase === 'discover' && isNew
            const lit =
              (phase === 'dispatch' || phase === 'execute') &&
              targetSet.has(idx)
            const idle =
              (phase === 'dispatch' || phase === 'execute') && n.kind === 'cpu'
            const nodeKey = isNew ? `${n.id}-c${cycle}` : n.id
            return (
              <Node
                key={nodeKey}
                node={n}
                lit={lit}
                idle={idle}
                fadingIn={fadingIn}
                executing={phase === 'execute' && lit}
              />
            )
          })}

          {/* phase label, bottom-left of body */}
          <div className="pointer-events-none absolute bottom-2 left-2 flex flex-col items-start gap-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={phase}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.28 }}
                className="flex flex-col items-start gap-1"
              >
                <span
                  className="rounded-sm px-1.5 py-0.5 font-mono text-[8px] font-bold uppercase tracking-[0.18em] text-white"
                  style={{ background: MESH_RED }}
                >
                  {step.label}
                </span>
                <span className="rounded-sm border border-neutral-950/15 bg-white/95 px-2 py-1 font-mono text-[10px] text-neutral-950 shadow-sm backdrop-blur-sm">
                  {step.caption}
                </span>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* spec footer */}
        <footer className="flex items-baseline justify-between border-t border-neutral-950/10 px-3 py-2 eyebrow text-neutral-500">
          <span className="wdth-narrow">Mesh runtime</span>
          <span className="font-mono">
            phase {active + 1} / {STEPS.length}
          </span>
        </footer>
      </article>
    </div>
  )
}
