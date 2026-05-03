import clsx from 'clsx'

/**
 * ImagePlaceholder — a grey-bg image stand-in that displays the AI image
 * generation prompt inline. Drop in where a real photo will eventually live;
 * swap out by replacing with <Image> later.
 *
 *   <ImagePlaceholder
 *     id="IMG-01"
 *     aspect="16/9"
 *     prompt="..."
 *   />
 */
export function ImagePlaceholder({
  id,
  prompt,
  aspect = '16/9',
  caption,
  className,
  invert = false,
}) {
  return (
    <figure
      className={clsx(
        'relative w-full overflow-hidden border',
        invert
          ? 'border-white/15 bg-white/[0.03]'
          : 'border-neutral-300 bg-neutral-100',
        className,
      )}
      style={{ aspectRatio: aspect }}
    >
      {/* diagonal hatch */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: invert
            ? 'repeating-linear-gradient(45deg, transparent 0 9px, rgba(255,255,255,0.04) 9px 10px)'
            : 'repeating-linear-gradient(45deg, transparent 0 9px, rgba(10,10,10,0.05) 9px 10px)',
        }}
      />

      {/* top-left tag */}
      <div
        className={clsx(
          'absolute left-3 top-3 right-3 flex items-baseline gap-2 font-mono text-[10px] uppercase tracking-[0.18em]',
          invert ? 'text-white/55' : 'text-neutral-500',
        )}
      >
        <svg
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className="self-center"
        >
          <rect x="3" y="5" width="18" height="14" rx="1" />
          <circle cx="8.5" cy="10.5" r="1.5" />
          <path d="m21 16-5.5-5.5L8 18" />
        </svg>
        <span className={invert ? 'text-white' : 'text-neutral-950'}>{id}</span>
        <span className="opacity-50">·</span>
        <span>placeholder</span>
        <span className="ml-auto opacity-50">aspect {aspect.replace('/', ':')}</span>
      </div>

      {/* center: prompt */}
      <div className="absolute inset-0 flex items-center justify-center px-6 pb-6 pt-12 sm:px-10">
        <p
          className={clsx(
            'max-w-3xl text-center font-mono text-[12px] leading-relaxed sm:text-[13px]',
            invert ? 'text-white/80' : 'text-neutral-700',
          )}
        >
          <span className="text-orange-600">›</span>{' '}
          <span>{prompt}</span>
        </p>
      </div>

      {caption && (
        <figcaption
          className={clsx(
            'absolute bottom-3 left-3 right-3 flex items-baseline justify-between gap-3 font-mono text-[10px] uppercase tracking-[0.18em]',
            invert ? 'text-white/55' : 'text-neutral-500',
          )}
        >
          <span>{caption}</span>
          <span className="opacity-50">supplied later</span>
        </figcaption>
      )}
    </figure>
  )
}
