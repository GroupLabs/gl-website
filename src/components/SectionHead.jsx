import clsx from 'clsx'

import { FadeIn } from '@/components/FadeIn'

export function SectionHead({
  kicker,
  title,
  dek,
  className,
  invert = false,
  align = 'left',
  size = 'lg',
  rightMeta,
}) {
  return (
    <div className={clsx('w-full', className)}>
      <FadeIn>
        {(kicker || rightMeta) && (
          <div
            className={clsx(
              'flex w-full items-center gap-4 border-b pb-3',
              invert ? 'border-white/15' : 'border-neutral-950/15',
            )}
          >
            {kicker && (
              <p
                className={clsx(
                  'eyebrow',
                  invert ? 'text-white/65' : 'text-neutral-950/65',
                )}
              >
                {kicker}
              </p>
            )}
            <span
              aria-hidden="true"
              className={clsx(
                'h-px flex-1',
                invert ? 'bg-white/15' : 'bg-neutral-950/15',
              )}
            />
            {rightMeta && (
              <p
                className={clsx(
                  'eyebrow',
                  invert ? 'text-white/55' : 'text-neutral-950/55',
                )}
              >
                {rightMeta}
              </p>
            )}
          </div>
        )}

        {title && (
          <h2
            className={clsx(
              'mt-8 font-display tracking-tight [text-wrap:balance]',
              size === 'xl' &&
                'text-5xl font-medium sm:text-7xl lg:text-[5.25rem] lg:leading-[0.98]',
              size === 'lg' &&
                'text-4xl font-medium sm:text-5xl lg:text-6xl lg:leading-[1.02]',
              size === 'md' &&
                'text-2xl font-medium sm:text-3xl lg:text-4xl',
              align === 'center' && 'mx-auto text-center',
              invert ? 'text-white' : 'text-neutral-950',
            )}
          >
            {title}
          </h2>
        )}

        {dek && (
          <p
            className={clsx(
              'mt-6 max-w-2xl text-lg leading-relaxed sm:text-xl',
              align === 'center' && 'mx-auto text-center',
              invert ? 'text-white/70' : 'text-neutral-700',
            )}
          >
            {dek}
          </p>
        )}
      </FadeIn>
    </div>
  )
}
