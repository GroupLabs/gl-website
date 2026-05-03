import clsx from 'clsx'

import { FadeIn, FadeInStagger } from '@/components/FadeIn'

export function Faqs({ items, className }) {
  return (
    <FadeInStagger faster>
      <ul role="list" className={clsx('border-t border-neutral-950/15', className)}>
        {items.map((item, idx) => (
          <FadeIn as="li" key={idx} className="border-b border-neutral-950/15">
            <details className="group/q">
              <summary className="flex cursor-pointer list-none items-baseline justify-between gap-6 py-7 marker:hidden sm:py-8">
                <span className="flex items-baseline gap-5">
                  <span className="font-mono tabular text-base font-semibold text-neutral-500 transition group-hover/q:text-orange-600 group-open/q:text-orange-600">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <span className="font-display text-lg font-medium tracking-tight text-neutral-950 sm:text-xl lg:text-2xl">
                    {item.question}
                  </span>
                </span>
                <span
                  aria-hidden="true"
                  className="mt-1 flex-shrink-0 font-mono text-2xl leading-none text-neutral-400 transition-transform duration-300 group-open/q:rotate-45"
                >
                  +
                </span>
              </summary>
              <div className="grid grid-cols-12 gap-x-5 pb-8 sm:pb-10">
                <div className="col-span-12 sm:col-span-1" />
                <p className="col-span-12 max-w-3xl text-base leading-relaxed text-neutral-700 sm:col-span-11 sm:text-lg">
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
