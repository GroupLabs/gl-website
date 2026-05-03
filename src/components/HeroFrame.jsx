'use client'

/**
 * HeroFrame — a single rounded rectangle drawn around the hero content.
 * Uses SVG `pathLength="1"` to normalize the perimeter, then a CSS keyframe
 * animates `stroke-dashoffset` from 1 → 0 to draw the stroke around the
 * whole shape (including the curved corners).
 *
 * `radius` should match the wrapper's border-radius.
 */
export function HeroFrame({
  delay = 0.4,
  duration = 1,
  radius = 32,
  invert = false,
}) {
  const color = invert ? 'rgba(255,255,255,0.40)' : 'rgba(10,10,10,0.40)'
  const inset = 1
  const r = Math.max(0, radius - inset)

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      <svg
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="none"
      >
        <rect
          x={inset}
          y={inset}
          width={`calc(100% - ${inset * 2}px)`}
          height={`calc(100% - ${inset * 2}px)`}
          rx={r}
          ry={r}
          fill="none"
          stroke={color}
          strokeWidth="1"
          pathLength="1"
          strokeDasharray="1 1"
          className="animate-frame-draw"
          style={{
            ['--draw-duration']: `${duration}s`,
            ['--draw-delay']: `${delay}s`,
          }}
        />
      </svg>
    </div>
  )
}
