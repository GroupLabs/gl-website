'use client'

import { motion, useReducedMotion } from 'framer-motion'

export function AnimatedScan({ className = '' }) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.svg
      className={className}
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Viewfinder frame */}
      <motion.path
        d="M15 25 L15 15 L25 15"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.4 }}
      />
      <motion.path
        d="M55 15 L65 15 L65 25"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      />
      <motion.path
        d="M65 55 L65 65 L55 65"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      />
      <motion.path
        d="M25 65 L15 65 L15 55"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      />

      {/* Scanning line */}
      <motion.line
        x1="20"
        x2="60"
        stroke="currentColor"
        strokeWidth="1.5"
        opacity={0.8}
        initial={{ y1: 20, y2: 20 }}
        animate={
          shouldReduceMotion
            ? { y1: 40, y2: 40 }
            : {
                y1: [20, 60, 20],
                y2: [20, 60, 20],
              }
        }
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Scan glow effect */}
      {!shouldReduceMotion && (
        <motion.rect
          x="20"
          width="40"
          height="8"
          fill="currentColor"
          opacity={0.1}
          initial={{ y: 16 }}
          animate={{ y: [16, 56, 16] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      )}

      {/* Grid dots that appear when scanned */}
      {[
        { x: 30, y: 30 },
        { x: 40, y: 28 },
        { x: 50, y: 32 },
        { x: 28, y: 42 },
        { x: 40, y: 40 },
        { x: 52, y: 44 },
        { x: 32, y: 52 },
        { x: 42, y: 54 },
        { x: 50, y: 50 },
      ].map((dot, i) => (
        <motion.circle
          key={i}
          cx={dot.x}
          cy={dot.y}
          r="1.5"
          fill="currentColor"
          initial={{ opacity: 0, scale: 0 }}
          animate={
            shouldReduceMotion
              ? { opacity: 0.6, scale: 1 }
              : {
                  opacity: [0, 0.8, 0.4, 0.8, 0],
                  scale: [0, 1.2, 1, 1.2, 0],
                }
          }
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: ((dot.y - 20) / 40) * 1, // Stagger based on Y position
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Center crosshair */}
      <motion.g opacity={0.5}>
        <motion.line
          x1="40"
          y1="35"
          x2="40"
          y2="45"
          stroke="currentColor"
          strokeWidth="0.75"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.3, delay: 0.5 }}
        />
        <motion.line
          x1="35"
          y1="40"
          x2="45"
          y2="40"
          stroke="currentColor"
          strokeWidth="0.75"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.3, delay: 0.6 }}
        />
      </motion.g>

      {/* Detection brackets that pulse */}
      {!shouldReduceMotion && (
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: 1,
          }}
        >
          <path
            d="M32 34 L32 32 L34 32"
            stroke="currentColor"
            strokeWidth="1"
            fill="none"
          />
          <path
            d="M46 32 L48 32 L48 34"
            stroke="currentColor"
            strokeWidth="1"
            fill="none"
          />
          <path
            d="M48 46 L48 48 L46 48"
            stroke="currentColor"
            strokeWidth="1"
            fill="none"
          />
          <path
            d="M34 48 L32 48 L32 46"
            stroke="currentColor"
            strokeWidth="1"
            fill="none"
          />
        </motion.g>
      )}
    </motion.svg>
  )
}
