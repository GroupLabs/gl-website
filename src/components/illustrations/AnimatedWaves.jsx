'use client'

import { motion, useReducedMotion } from 'framer-motion'

export function AnimatedWaves({ className = '' }) {
  const shouldReduceMotion = useReducedMotion()

  // Create multiple wave paths with different phases
  const waves = [
    { d: 'M0 40 Q10 30 20 40 T40 40 T60 40 T80 40', delay: 0, opacity: 1, strokeWidth: 1.5 },
    { d: 'M0 40 Q10 25 20 40 T40 40 T60 40 T80 40', delay: 0.15, opacity: 0.7, strokeWidth: 1.2 },
    { d: 'M0 40 Q10 20 20 40 T40 40 T60 40 T80 40', delay: 0.3, opacity: 0.4, strokeWidth: 0.8 },
  ]

  return (
    <motion.svg
      className={className}
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {waves.map((wave, i) => (
        <motion.path
          key={i}
          d={wave.d}
          stroke="currentColor"
          strokeWidth={wave.strokeWidth}
          strokeLinecap="round"
          fill="none"
          opacity={wave.opacity}
          initial={{ pathLength: 0, pathOffset: 0 }}
          animate={
            shouldReduceMotion
              ? { pathLength: 1 }
              : {
                  pathLength: 1,
                  pathOffset: [0, -1],
                  d: [
                    'M0 40 Q10 30 20 40 T40 40 T60 40 T80 40',
                    'M0 40 Q10 50 20 40 T40 40 T60 40 T80 40',
                    'M0 40 Q10 30 20 40 T40 40 T60 40 T80 40',
                  ],
                }
          }
          transition={
            shouldReduceMotion
              ? { duration: 0.8, delay: wave.delay }
              : {
                  pathLength: { duration: 0.8, delay: wave.delay },
                  pathOffset: {
                    duration: 2,
                    repeat: Infinity,
                    ease: 'linear',
                    delay: wave.delay,
                  },
                  d: {
                    duration: 1.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: wave.delay,
                  },
                }
          }
        />
      ))}
      {/* Signal dots that travel along the wave */}
      {!shouldReduceMotion && (
        <>
          <motion.circle
            r="2.5"
            fill="currentColor"
            initial={{ cx: 0, cy: 40, opacity: 0 }}
            animate={{
              cx: [0, 80],
              cy: [40, 35, 45, 35, 45, 40],
              opacity: [0, 1, 1, 1, 1, 0],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: 'linear',
              delay: 0.5,
            }}
          />
          <motion.circle
            r="2"
            fill="currentColor"
            opacity={0.6}
            initial={{ cx: 0, cy: 40 }}
            animate={{
              cx: [0, 80],
              cy: [40, 35, 45, 35, 45, 40],
              opacity: [0, 0.6, 0.6, 0.6, 0.6, 0],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: 'linear',
              delay: 1.5,
            }}
          />
        </>
      )}
    </motion.svg>
  )
}
