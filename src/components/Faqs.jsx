import clsx from 'clsx'

import { FadeIn, FadeInStagger } from '@/components/FadeIn'

export function Faqs({ items, className, invert = false }) {
  return (
    <FadeInStagger faster>
      <ul
        role="list"
        className={clsx(
          'border-t',
          invert ? 'border-white/15' : 'border-neutral-950/15',
          className,
        )}
      >
        {items.map((item, idx) => (
          <FadeIn
            as="li"
            key={idx}
            className={clsx(
              'border-b',
              invert ? 'border-white/15' : 'border-neutral-950/15',
            )}
          >
            <details className="group/q">
              <summary className="flex cursor-pointer list-none items-baseline justify-between gap-6 py-7 marker:hidden sm:py-8">
                <span className="flex items-baseline gap-5">
                  <span
                    className={clsx(
                      'font-mono tabular text-base font-semibold transition',
                      invert
                        ? 'text-neutral-400 group-hover/q:text-orange-500 group-open/q:text-orange-500'
                        : 'text-neutral-500 group-hover/q:text-orange-600 group-open/q:text-orange-600',
                    )}
                  >
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <span
                    className={clsx(
                      'font-display text-lg font-medium tracking-tight sm:text-xl lg:text-2xl',
                      invert ? 'text-white' : 'text-neutral-950',
                    )}
                  >
                    {item.question}
                  </span>
                </span>
                <span
                  aria-hidden="true"
                  className={clsx(
                    'mt-1 flex-shrink-0 font-mono text-2xl leading-none transition-transform duration-300 group-open/q:rotate-45',
                    invert ? 'text-neutral-500' : 'text-neutral-400',
                  )}
                >
                  +
                </span>
              </summary>
              <div className="grid grid-cols-12 gap-x-5 pb-8 sm:pb-10">
                <div className="col-span-12 sm:col-span-1" />
                <p
                  className={clsx(
                    'col-span-12 max-w-3xl text-base leading-relaxed sm:col-span-11 sm:text-lg',
                    invert ? 'text-neutral-300' : 'text-neutral-700',
                  )}
                >
                  {item.answer}
                </p>
              </div>
            </details>
          </FadeIn>
        ))}
      </ul>
    </FadeInStagger>
  )
}
