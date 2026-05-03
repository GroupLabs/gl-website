/**
 * PracticeDiagram — three SVG line drawings, one per practice. Quiet, technical,
 * monochrome. Used as a small visual signature beside each practice card.
 */
export function PracticeDiagram({ kind, className = '' }) {
  switch (kind) {
    case 'serving':
      return (
        <svg
          viewBox="0 0 200 80"
          fill="none"
          className={className}
          aria-hidden="true"
        >
          {/* clients */}
          <circle cx="14" cy="20" r="2.5" className="fill-current" />
          <circle cx="14" cy="40" r="2.5" className="fill-current" />
          <circle cx="14" cy="60" r="2.5" className="fill-current" />
          {/* lines into gateway */}
          <line x1="16" y1="20" x2="60" y2="40" stroke="currentColor" strokeWidth="0.75" />
          <line x1="16" y1="40" x2="60" y2="40" stroke="currentColor" strokeWidth="0.75" />
          <line x1="16" y1="60" x2="60" y2="40" stroke="currentColor" strokeWidth="0.75" />
          {/* gateway box */}
          <rect x="60" y="30" width="38" height="20" stroke="currentColor" strokeWidth="1" fill="white" />
          <text x="79" y="44" textAnchor="middle" className="fill-current font-mono" fontSize="8">GW</text>
          {/* pipe */}
          <line x1="98" y1="40" x2="118" y2="40" stroke="currentColor" strokeWidth="0.75" strokeDasharray="2 2" />
          {/* model boxes */}
          <rect x="118" y="22" width="32" height="14" stroke="currentColor" strokeWidth="1" fill="white" />
          <text x="134" y="32" textAnchor="middle" className="fill-current font-mono" fontSize="7">m₁</text>
          <rect x="118" y="44" width="32" height="14" stroke="currentColor" strokeWidth="1" fill="white" />
          <text x="134" y="54" textAnchor="middle" className="fill-current font-mono" fontSize="7">m₂</text>
          {/* connections out */}
          <line x1="150" y1="29" x2="180" y2="29" stroke="currentColor" strokeWidth="0.75" />
          <line x1="150" y1="51" x2="180" y2="51" stroke="currentColor" strokeWidth="0.75" />
          {/* output dots */}
          <circle cx="184" cy="29" r="2.5" className="fill-current text-orange-600" />
          <circle cx="184" cy="51" r="2.5" className="fill-current text-orange-600" />
        </svg>
      )

    case 'model':
      return (
        <svg
          viewBox="0 0 200 80"
          fill="none"
          className={className}
          aria-hidden="true"
        >
          {/* input layer */}
          {[18, 32, 46, 60].map((y) => (
            <circle key={`i${y}`} cx="18" cy={y} r="2" className="fill-current" />
          ))}
          {/* hidden layer 1 */}
          {[14, 28, 42, 56, 70].map((y) => (
            <circle key={`h1${y}`} cx="68" cy={y} r="2" className="fill-current" />
          ))}
          {/* hidden layer 2 */}
          {[14, 28, 42, 56, 70].map((y) => (
            <circle key={`h2${y}`} cx="118" cy={y} r="2" className="fill-current" />
          ))}
          {/* output layer */}
          {[28, 42, 56].map((y) => (
            <circle key={`o${y}`} cx="168" cy={y} r="2" className="fill-current text-orange-600" />
          ))}
          {/* connections */}
          {[18, 32, 46, 60].flatMap((y1) =>
            [14, 28, 42, 56, 70].map((y2) => (
              <line
                key={`l1-${y1}-${y2}`}
                x1="18"
                y1={y1}
                x2="68"
                y2={y2}
                stroke="currentColor"
                strokeWidth="0.4"
                opacity="0.5"
              />
            )),
          )}
          {[14, 28, 42, 56, 70].flatMap((y1) =>
            [14, 28, 42, 56, 70].map((y2) => (
              <line
                key={`l2-${y1}-${y2}`}
                x1="68"
                y1={y1}
                x2="118"
                y2={y2}
                stroke="currentColor"
                strokeWidth="0.4"
                opacity="0.4"
              />
            )),
          )}
          {[14, 28, 42, 56, 70].flatMap((y1) =>
            [28, 42, 56].map((y2) => (
              <line
                key={`l3-${y1}-${y2}`}
                x1="118"
                y1={y1}
                x2="168"
                y2={y2}
                stroke="currentColor"
                strokeWidth="0.4"
                opacity="0.5"
              />
            )),
          )}
          {/* layer captions */}
          <text x="18" y="78" textAnchor="middle" className="fill-current font-mono" fontSize="6" opacity="0.6">in</text>
          <text x="68" y="78" textAnchor="middle" className="fill-current font-mono" fontSize="6" opacity="0.6">h₁</text>
          <text x="118" y="78" textAnchor="middle" className="fill-current font-mono" fontSize="6" opacity="0.6">h₂</text>
          <text x="168" y="78" textAnchor="middle" className="fill-current font-mono" fontSize="6" opacity="0.6">out</text>
        </svg>
      )

    case 'tools':
      return (
        <svg
          viewBox="0 0 200 80"
          fill="none"
          className={className}
          aria-hidden="true"
        >
          {/* hub */}
          <circle cx="100" cy="40" r="6" className="fill-current text-orange-600" />
          <circle cx="100" cy="40" r="11" stroke="currentColor" strokeWidth="0.6" fill="none" opacity="0.5" />
          <circle cx="100" cy="40" r="18" stroke="currentColor" strokeWidth="0.4" fill="none" opacity="0.3" />
          {/* satellite tools — name, x, y */}
          {[
            { n: 'Tell',    x: 30,  y: 14 },
            { n: 'Atmos',   x: 170, y: 14 },
            { n: 'Tessera', x: 22,  y: 50 },
            { n: 'Norma',   x: 178, y: 50 },
            { n: 'Bridge',  x: 50,  y: 72 },
            { n: 'Mesh',    x: 150, y: 72 },
          ].map((t) => (
            <g key={t.n}>
              <line
                x1="100"
                y1="40"
                x2={t.x}
                y2={t.y}
                stroke="currentColor"
                strokeWidth="0.5"
                strokeDasharray="2 2"
                opacity="0.6"
              />
              <rect
                x={t.x - 16}
                y={t.y - 5}
                width="32"
                height="10"
                stroke="currentColor"
                strokeWidth="0.8"
                fill="white"
              />
              <text
                x={t.x}
                y={t.y + 2.5}
                textAnchor="middle"
                className="fill-current font-mono"
                fontSize="6.5"
              >
                {t.n}
              </text>
            </g>
          ))}
        </svg>
      )

    default:
      return null
  }
}
