'use client'

import { motion, useReducedMotion } from 'framer-motion'

export function AnimatedGyroscope({ className = '' }) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.svg
      className={className}
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer ring - rotates on Y axis (appears as width change) */}
      <motion.ellipse
        cx="40"
        cy="40"
        ry="30"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        initial={{ rx: 30 }}
        animate={
          shouldReduceMotion
            ? { rx: 30 }
            : {
                rx: [30, 8, 30, 8, 30],
              }
        }
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Middle ring - rotates opposite direction */}
      <motion.ellipse
        cx="40"
        cy="40"
        ry="24"
        stroke="currentColor"
        strokeWidth="1.2"
        fill="none"
        opacity={0.8}
        initial={{ rx: 8 }}
        animate={
          shouldReduceMotion
            ? { rx: 24 }
            : {
                rx: [8, 24, 8, 24, 8],
              }
        }
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Inner ring - tilted, rotates on different axis */}
      <motion.g
        style={{ originX: '50%', originY: '50%' }}
        animate={
          shouldReduceMotion
            ? {}
            : {
                rotate: [0, 360],
              }
        }
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        <motion.ellipse
          cx="40"
          cy="40"
          rx="18"
          ry="18"
          stroke="currentColor"
          strokeWidth="1"
          fill="none"
          opacity={0.6}
          initial={{ ry: 18 }}
          animate={
            shouldReduceMotion
              ? { ry: 18 }
              : {
                  ry: [18, 6, 18, 6, 18],
                }
          }
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </motion.g>

      {/* Horizontal equator ring */}
      <motion.ellipse
        cx="40"
        cy="40"
        rx="30"
        stroke="currentColor"
        strokeWidth="0.8"
        fill="none"
        opacity={0.5}
        initial={{ ry: 10 }}
        animate={
          shouldReduceMotion
            ? { ry: 10 }
            : {
                ry: [10, 4, 10, 16, 10],
              }
        }
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Center sphere */}
      <motion.circle
        cx="40"
        cy="40"
        r="4"
        fill="currentColor"
        opacity={0.9}
        animate={
          shouldReduceMotion
            ? {}
            : {
                scale: [1, 1.2, 1],
                opacity: [0.9, 0.6, 0.9],
              }
        }
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Orbiting dot */}
      {!shouldReduceMotion && (
        <motion.circle
          r="2"
          fill="currentColor"
          animate={{
            cx: [40, 70, 40, 10, 40],
            cy: [10, 40, 70, 40, 10],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      )}
    </motion.svg>
  )
}
