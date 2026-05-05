'use client'

import { OrbitControls, Stage, useGLTF } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { Suspense, useEffect, useRef } from 'react'

const CALIPER_PATH = '/models/studio/caliper.glb'
const TARGET_RAD_PER_SEC = 0.5
const RAMP_MS = 1200

// Model ships lying sideways. Tilt it up so it stands ~25° off vertical
// (i.e. rotate ~65° from the side-lying baseline toward upright).
const TILT_RAD = Math.PI / 2 - (25 * Math.PI) / 180

function Caliper() {
  const { scene } = useGLTF(CALIPER_PATH)
  return <primitive object={scene} rotation={[0, 0, -TILT_RAD]} />
}

function ScrollEasedSpin({ children }) {
  const groupRef = useRef(null)
  const lastScrollAt = useRef(-Infinity)

  useEffect(() => {
    const onScroll = () => {
      lastScrollAt.current = performance.now()
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useFrame((_, delta) => {
    if (!groupRef.current) return
    const since = performance.now() - lastScrollAt.current
    const t = Math.min(Math.max(since / RAMP_MS, 0), 1)
    const eased = 1 - Math.pow(1 - t, 3)
    groupRef.current.rotation.y += TARGET_RAD_PER_SEC * eased * delta
  })

  return <group ref={groupRef}>{children}</group>
}

export function CaliperModel({ className }) {
  return (
    <div className={className}>
      <Canvas
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 2]}
        camera={{ fov: 30 }}
      >
        <Suspense fallback={null}>
          <Stage
            intensity={0.4}
            environment="studio"
            preset="soft"
            shadows={false}
            adjustCamera={1.4}
          >
            <ScrollEasedSpin>
              <Caliper />
            </ScrollEasedSpin>
          </Stage>
        </Suspense>
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableDamping
          dampingFactor={0.08}
          minPolarAngle={Math.PI / 2 - 0.3}
          maxPolarAngle={Math.PI / 2 + 0.15}
        />
      </Canvas>
    </div>
  )
}
