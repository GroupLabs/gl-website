'use client'

import clsx from 'clsx'
import { motion, useReducedMotion } from 'framer-motion'

/**
 * TopoField — an atmospheric SVG of layered topographic contour lines drawn
 * across a dark surface. One contour is highlighted in orange. The whole
 * field very slowly drifts, giving the hero quiet motion. Designed to sit
 * full-bleed behind a dark hero.
 */
export function TopoField({ className }) {
  const shouldReduceMotion = useReducedMotion()

  // 8 hand-tuned bezier paths — concentric contours of a rolling terrain.
  // Each is a long, sweeping S-curve that fills the viewBox. The accent
  // contour is the 4th line.
  const lines = [
    'M -50 220 C 220 110, 520 280, 820 160 S 1340 80, 1700 200',
    'M -50 270 C 240 170, 540 320, 840 210 S 1340 140, 1700 250',
    'M -50 320 C 260 230, 560 360, 860 260 S 1360 200, 1700 300',
    'M -50 370 C 280 290, 580 400, 880 310 S 1360 260, 1700 350', // accent
    'M -50 420 C 300 350, 600 440, 900 360 S 1380 320, 1700 400',
    'M -50 470 C 320 410, 620 480, 920 410 S 1380 380, 1700 450',
    'M -50 520 C 340 470, 640 520, 940 460 S 1400 440, 1700 500',
    'M -50 570 C 360 530, 660 560, 960 510 S 1400 500, 1700 550',
  ]

  return (
    <div
      aria-hidden="true"
      className={clsx('pointer-events-none absolute inset-0 overflow-hidden', className)}
    >
      {/* warm radial glow biased to the upper right */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 78% 18%, rgba(234,88,12,0.15), transparent 60%), radial-gradient(ellipse 60% 50% at 18% 80%, rgba(234,88,12,0.08), transparent 65%)',
        }}
      />

      {/* SVG turbulence noise — quiet film grain over the whole thing */}
      <svg className="absolute inset-0 h-full w-full opacity-[0.13] mix-blend-overlay">
        <filter id="topo-noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.85"
            numOctaves="2"
            stitchTiles="stitch"
          />
          <feColorMatrix values="0 0 0 0 1   0 0 0 0 1   0 0 0 0 1   0 0 0 0.6 0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#topo-noise)" />
      </svg>

      {/* the contour field */}
      <motion.svg
        viewBox="0 0 1600 800"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        style={{
          maskImage:
            'radial-gradient(ellipse 90% 80% at center, black 60%, transparent 100%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 90% 80% at center, black 60%, transparent 100%)',
        }}
      >
        {/* mirror set in upper half so the contours feel topographic, not striped */}
        <g transform="translate(0,-220)">
          {lines.map((d, i) => {
            const isAccent = i === 3
            const baseDelay = 0.15 + i * 0.08
            return (
              <motion.path
                key={`top-${i}`}
                d={d}
                fill="none"
                stroke={isAccent ? '#EA580C' : '#ffffff'}
                strokeWidth={isAccent ? 1.1 : 0.8}
                strokeOpacity={isAccent ? 0.55 : 0.18 - i * 0.012}
                strokeLinecap="round"
                initial={{ pathLength: shouldReduceMotion ? 1 : 0 }}
                animate={{ pathLength: 1 }}
                transition={{
                  duration: 2.2,
                  delay: baseDelay,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />
            )
          })}
        </g>

        {/* main contour set */}
        <g>
          {lines.map((d, i) => {
            const isAccent = i === 3
            const baseDelay = 0.4 + i * 0.08
            return (
              <motion.path
                key={`mid-${i}`}
                d={d}
                fill="none"
                stroke={isAccent ? '#EA580C' : '#ffffff'}
                strokeWidth={isAccent ? 1.4 : 0.9}
                strokeOpacity={isAccent ? 0.85 : 0.22 - i * 0.014}
                strokeLinecap="round"
                initial={{ pathLength: shouldReduceMotion ? 1 : 0 }}
                animate={{ pathLength: 1 }}
                transition={{
                  duration: 2.4,
                  delay: baseDelay,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />
            )
          })}
        </g>

        {/* mirror set in lower half */}
        <g transform="translate(0,220)">
          {lines.map((d, i) => {
            const isAccent = i === 3
            const baseDelay = 0.65 + i * 0.08
            return (
              <motion.path
                key={`bot-${i}`}
                d={d}
                fill="none"
                stroke={isAccent ? '#EA580C' : '#ffffff'}
                strokeWidth={isAccent ? 1.1 : 0.8}
                strokeOpacity={isAccent ? 0.45 : 0.16 - i * 0.011}
                strokeLinecap="round"
                initial={{ pathLength: shouldReduceMotion ? 1 : 0 }}
                animate={{ pathLength: 1 }}
                transition={{
                  duration: 2.2,
                  delay: baseDelay,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />
            )
          })}
        </g>

        {/* slow drift over time (after lines have drawn in) */}
        <animateTransform
          xlinkHref="#topo-drift"
          attributeName="transform"
          type="translate"
          from="0 0"
          to="-40 6"
          dur="40s"
          repeatCount="indefinite"
        />
      </motion.svg>

      {/* tiny pinpoint glow at the accent contour intersection */}
      <motion.span
        className="absolute"
        style={{ top: '47%', left: '52%' }}
        initial={{ opacity: 0, scale: 0.4 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 1.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-500 opacity-70" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-orange-500 shadow-[0_0_24px_4px_rgba(234,88,12,0.55)]" />
        </span>
      </motion.span>
    </div>
  )
}
