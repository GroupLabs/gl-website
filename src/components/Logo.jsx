import { useId } from 'react'
import clsx from 'clsx'

export function Logomark({ invert = false, filled = false, ...props }) {
  let id = useId()

  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" {...props}>
      <rect
        clipPath={`url(#${id}-clip)`}
        className={clsx(
          'h-8 transition-all duration-300',
          invert ? 'fill-white' : 'fill-neutral-950',
          filled ? 'w-8' : 'w-0 group-hover/logo:w-8',
        )}
      />
      <use
        href={`#${id}-path`}
        className={invert ? 'stroke-white' : 'stroke-neutral-950'}
        fill="none"
        strokeWidth="1.5"
      />
      <defs>
        <path
          id={`${id}-path`}
          d="M3.25 26v.75H7c1.305 0 2.384-.21 3.346-.627.96-.415 1.763-1.02 2.536-1.752.695-.657 1.39-1.443 2.152-2.306l.233-.263c.864-.975 1.843-2.068 3.071-3.266 1.209-1.18 2.881-1.786 4.621-1.786h5.791V5.25H25c-1.305 0-2.384.21-3.346.627-.96.415-1.763 1.02-2.536 1.751-.695.658-1.39 1.444-2.152 2.307l-.233.263c-.864.975-1.843 2.068-3.071 3.266-1.209 1.18-2.881 1.786-4.621 1.786H3.25V26Z"
        />
        <clipPath id={`${id}-clip`}>
          <use href={`#${id}-path`} />
        </clipPath>
      </defs>
    </svg>
  )
}

/**
 * Logo — displays "GL" by default, expanding to "GroupLabs" on hover via a
 * smooth max-width transition on the hidden middle letters.
 *
 * Sizing: pass via className (e.g. text-2xl, text-3xl). Default is text-2xl.
 */
export function Logo({
  className,
  invert = false,
  // legacy props from old SVG version — accepted but unused
  filled: _filled,
  fillOnHover: _fillOnHover,
  ...props
}) {
  const hidden =
    'inline-flex items-baseline max-w-0 overflow-hidden whitespace-nowrap transition-[max-width] duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/logo:max-w-[3em]'

  return (
    <span
      className={clsx(
        'group/logo inline-flex items-baseline whitespace-nowrap font-display text-2xl font-semibold leading-[1.2] tracking-tight wdth-wide',
        invert ? 'text-white' : 'text-neutral-950',
        className,
      )}
      {...props}
    >
      <span>G</span>
      <span className={hidden} aria-hidden="true">
        roup
      </span>
      <span>L</span>
      <span className={hidden} aria-hidden="true">
        abs
      </span>
      <span className="sr-only">GroupLabs</span>
    </span>
  )
}
