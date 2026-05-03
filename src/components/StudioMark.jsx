import clsx from 'clsx'

/**
 * StudioMark — a small circular monogram for GroupLabs. Outer hairline ring,
 * a large "GL" centered, a small orange dot below it, and curved metadata
 * along the bottom arc. Sized via the `size` prop. Uses currentColor for
 * the ring, "GL", and curved text — set color via Tailwind text-* classes.
 */
export function StudioMark({
  size = 200,
  className,
  bottom = 'EST · MMXX · CALGARY',
}) {
  return (
    <svg
      viewBox="0 0 200 200"
      width={size}
      height={size}
      role="img"
      aria-label="GroupLabs studio mark"
      className={clsx('inline-block', className)}
    >
      <defs>
        {/* arc for curved text along the bottom of the ring */}
        <path
          id="studio-mark-arc-bottom"
          d="M 22 100 a 78 78 0 0 0 156 0"
          fill="none"
        />
      </defs>

      {/* outer ring */}
      <circle
        cx="100"
        cy="100"
        r="90"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
      />
      <circle
        cx="100"
        cy="100"
        r="86"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.5"
        opacity="0.5"
      />

      {/* tick marks at cardinal points (subtle compass cue) */}
      {[0, 90, 180, 270].map((deg) => {
        const rad = (deg * Math.PI) / 180
        const x1 = 100 + Math.cos(rad) * 90
        const y1 = 100 + Math.sin(rad) * 90
        const x2 = 100 + Math.cos(rad) * 84
        const y2 = 100 + Math.sin(rad) * 84
        return (
          <line
            key={deg}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="currentColor"
            strokeWidth="1"
          />
        )
      })}

      {/* GL monogram */}
      <text
        x="100"
        y="92"
        textAnchor="middle"
        dominantBaseline="central"
        fill="currentColor"
        style={{
          fontFamily: '"Mona Sans", system-ui, sans-serif',
          fontWeight: 600,
          fontSize: '64px',
          fontVariationSettings: '"wdth" 125',
          letterSpacing: '-3px',
        }}
      >
        GL
      </text>

      {/* orange centre dot */}
      <circle cx="100" cy="128" r="3.5" fill="#EA580C" />

      {/* curved bottom text */}
      <text
        fill="currentColor"
        style={{
          fontFamily: 'var(--font-jetbrains-mono), ui-monospace, monospace',
          fontWeight: 700,
          fontSize: '8.5px',
          letterSpacing: '3.4px',
        }}
      >
        <textPath
          href="#studio-mark-arc-bottom"
          startOffset="50%"
          textAnchor="middle"
        >
          {bottom}
        </textPath>
      </text>
    </svg>
  )
}
