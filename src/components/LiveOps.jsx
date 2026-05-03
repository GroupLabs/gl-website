'use client'

import { motion, useReducedMotion } from 'framer-motion'

const ENTRIES = [
  { year: '2024', month: '10', client: 'Cenovus Energy',  kind: 'deploy',   tag: 'forecast pipeline' },
  { year: '2024', month: '08', client: 'Hotchkiss B.I.',  kind: 'hand-off', tag: 'neural decoding' },
  { year: '2024', month: '05', client: 'SMART Tech.',     kind: 'deploy',   tag: 'edge inference' },
  { year: '2023', month: '12', client: 'OrthoFoodie',     kind: 'sprint',   tag: 'pre-build test' },
  { year: '2023', month: '08', client: 'MHHC',            kind: 'deploy',   tag: 'habitat models' },
  { year: '2023', month: '03', client: 'Univ. of Calgary',kind: 'research', tag: 'evaluations' },
]

export function LiveOps() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <div className="relative w-full">
      {/* offset shadow card behind for depth */}
      <div
        aria-hidden="true"
        className="absolute -bottom-2 -right-2 left-2 top-2 -z-10 border border-neutral-950/10 bg-neutral-950/[0.02]"
      />

      <article className="relative border border-neutral-950/15 bg-white">
        {/* header */}
        <header className="flex items-baseline justify-between border-b border-neutral-950/15 px-5 py-3 eyebrow text-neutral-500">
          <span className="flex items-baseline gap-2">
            <span className="relative flex h-1.5 w-1.5 self-center">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-600 opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-orange-600" />
            </span>
            <span className="text-neutral-950">Recent ops</span>
          </span>
          <span>last 18 mo</span>
        </header>

        {/* table */}
        <ol className="divide-y divide-neutral-950/10">
          {ENTRIES.map((e, i) => (
            <motion.li
              key={`${e.year}-${e.month}-${e.client}`}
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.55,
                delay: 0.6 + i * 0.07,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group/op grid grid-cols-12 items-baseline gap-x-3 px-5 py-2.5 transition-colors hover:bg-neutral-950/[0.025]"
            >
              {/* date */}
              <span className="col-span-3 font-mono tabular text-[11px] text-neutral-500">
                {e.year}.{e.month}
              </span>
              {/* client */}
              <span className="col-span-5 truncate font-mono tabular text-[12px] font-medium text-neutral-950">
                {e.client}
              </span>
              {/* tag (hidden until hover for density) */}
              <span className="col-span-3 truncate font-mono text-[10px] uppercase tracking-[0.16em] text-neutral-400 transition-colors group-hover/op:text-neutral-700">
                {e.kind}
              </span>
              {/* status dot */}
              <span className="col-span-1 flex items-center justify-end">
                <span
                  className={
                    'dot ' +
                    (i === 0
                      ? 'text-orange-600 animate-pulse-dot'
                      : 'text-neutral-400')
                  }
                />
              </span>
            </motion.li>
          ))}
        </ol>

        {/* footer summary */}
        <footer className="grid grid-cols-3 border-t border-neutral-950/15 divide-x divide-neutral-950/10">
          <Stat label="Yrs ops" value="05" />
          <Stat label="In prod" value="12" />
          <Stat label="Sprints" value="047" />
        </footer>

        {/* terminal cue */}
        <div className="border-t border-neutral-950/15 px-5 py-2.5">
          <p className="font-mono text-[11px] text-neutral-500">
            <span className="text-orange-600">›</span>{' '}
            <span className="text-neutral-950">studio</span> ready for next engagement
            <span aria-hidden="true" className="ml-1 inline-block h-3 w-[6px] translate-y-[1px] bg-neutral-950 animate-blink-caret align-middle" />
          </p>
        </div>
      </article>

      {/* under-card meta */}
      <p className="mt-3 flex items-baseline justify-between eyebrow text-neutral-500">
        <span>Operations record</span>
        <span className="font-mono normal-case tracking-normal">a fragment</span>
      </p>
    </div>
  )
}

function Stat({ label, value }) {
  return (
    <div className="px-5 py-3">
      <p className="eyebrow text-neutral-500">{label}</p>
      <p className="mt-1 font-mono tabular text-xl font-medium tracking-tight text-neutral-950">
        {value}
      </p>
    </div>
  )
}
