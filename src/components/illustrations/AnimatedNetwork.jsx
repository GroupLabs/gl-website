'use client'

import { motion, useReducedMotion } from 'framer-motion'

export function AnimatedNetwork({ className = '' }) {
  const shouldReduceMotion = useReducedMotion()

  // Node positions
  const nodes = [
    { x: 40, y: 15 },  // top
    { x: 15, y: 35 },  // top-left
    { x: 65, y: 35 },  // top-right
    { x: 40, y: 45 },  // center
    { x: 20, y: 60 },  // bottom-left
    { x: 60, y: 60 },  // bottom-right
    { x: 40, y: 72 },  // bottom
  ]

  // Connections between nodes (indices)
  const connections = [
    [0, 1], [0, 2], [0, 3],
    [1, 3], [1, 4],
    [2, 3], [2, 5],
    [3, 4], [3, 5], [3, 6],
    [4, 6], [5, 6],
  ]

  // Data packet paths (node index sequences)
  const packets = [
    { path: [0, 3, 6], delay: 0 },
    { path: [1, 3, 5], delay: 1 },
    { path: [2, 3, 4], delay: 2 },
    { path: [4, 3, 2], delay: 1.5 },
  ]

  return (
    <motion.svg
      className={className}
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Connection lines */}
      {connections.map(([from, to], i) => (
        <motion.line
          key={`line-${i}`}
          x1={nodes[from].x}
          y1={nodes[from].y}
          x2={nodes[to].x}
          y2={nodes[to].y}
          stroke="currentColor"
          strokeWidth="0.75"
          opacity={0.4}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay: i * 0.05 }}
        />
      ))}

      {/* Animated pulse along connections */}
      {!shouldReduceMotion &&
        connections.map(([from, to], i) => (
          <motion.line
            key={`pulse-${i}`}
            x1={nodes[from].x}
            y1={nodes[from].y}
            x2={nodes[to].x}
            y2={nodes[to].y}
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            initial={{ pathLength: 0, pathOffset: 0, opacity: 0 }}
            animate={{
              pathLength: [0, 0.3, 0],
              pathOffset: [0, 0.7, 1],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: (i % 4) * 0.5 + 1,
              ease: 'easeInOut',
            }}
          />
        ))}

      {/* Nodes */}
      {nodes.map((node, i) => (
        <motion.g key={`node-${i}`}>
          {/* Node glow */}
          <motion.circle
            cx={node.x}
            cy={node.y}
            r={i === 3 ? 6 : 4}
            fill="currentColor"
            opacity={0.15}
            animate={
              shouldReduceMotion
                ? {}
                : {
                    r: i === 3 ? [6, 10, 6] : [4, 7, 4],
                    opacity: [0.15, 0.05, 0.15],
                  }
            }
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.2,
              ease: 'easeInOut',
            }}
          />
          {/* Node core */}
          <motion.circle
            cx={node.x}
            cy={node.y}
            r={i === 3 ? 4 : 2.5}
            fill="currentColor"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3, delay: 0.5 + i * 0.08 }}
          />
        </motion.g>
      ))}

      {/* Data packets traveling between nodes */}
      {!shouldReduceMotion &&
        packets.map((packet, i) => {
          const pathNodes = packet.path.map((idx) => nodes[idx])
          const cxKeyframes = pathNodes.map((n) => n.x)
          const cyKeyframes = pathNodes.map((n) => n.y)

          return (
            <motion.circle
              key={`packet-${i}`}
              r="2"
              fill="currentColor"
              initial={{ opacity: 0 }}
              animate={{
                cx: cxKeyframes,
                cy: cyKeyframes,
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: packet.delay + 2,
                ease: 'easeInOut',
              }}
            />
          )
        })}
    </motion.svg>
  )
}
