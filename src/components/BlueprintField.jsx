import clsx from 'clsx'

/**
 * BlueprintField — atmospheric backdrop for the hero. Just two layers:
 * a soft warm radial glow + subtle film-grain noise. The structural
 * lines come from <HeroFrame /> instead.
 *
 * Pass `invert` for the dark-surface variant.
 */
export function BlueprintField({ className, invert = false }) {
  const glowBg = invert
    ? 'radial-gradient(ellipse 80% 60% at 78% 18%, rgba(234,88,12,0.10), transparent 60%), radial-gradient(ellipse 70% 50% at 18% 88%, rgba(255,255,255,0.04), transparent 65%)'
    : 'radial-gradient(ellipse 80% 60% at 78% 18%, rgba(234,88,12,0.06), transparent 60%), radial-gradient(ellipse 70% 50% at 18% 88%, rgba(10,10,10,0.025), transparent 65%)'

  return (
    <div
      aria-hidden="true"
      className={clsx(
        'pointer-events-none absolute inset-0 overflow-hidden',
        className,
      )}
    >
      {/* warm radial glow */}
      <div className="absolute inset-0" style={{ background: glowBg }} />

      {/* very subtle film grain — paper feel */}
      <svg
        className={clsx(
          'absolute inset-0 h-full w-full',
          invert
            ? 'opacity-[0.10] mix-blend-overlay'
            : 'opacity-[0.06] mix-blend-multiply',
        )}
      >
        <filter id="bp-noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.85"
            numOctaves="2"
            stitchTiles="stitch"
          />
          <feColorMatrix
            values={
              invert
                ? '0 0 0 0 1   0 0 0 0 1   0 0 0 0 1   0 0 0 0.55 0'
                : '0 0 0 0 0.07   0 0 0 0 0.07   0 0 0 0 0.07   0 0 0 0.55 0'
            }
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#bp-noise)" />
      </svg>
    </div>
  )
}
