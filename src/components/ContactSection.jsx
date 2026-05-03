import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'

/**
 * ContactSection — quiet colophon. Address, email, phone. No CTAs.
 * The page's closer reads as a record, not a sales funnel. Optional `title`
 * is supported for backward compatibility but ignored by default.
 */
export function ContactSection() {
  return (
    <section className="mt-32 sm:mt-40 lg:mt-52">
      <div className="relative isolate overflow-hidden bg-neutral-950">
        <div
          aria-hidden="true"
          className="grid-paper-dark pointer-events-none absolute inset-0 -z-10 opacity-50 [mask-image:radial-gradient(ellipse_at_bottom,white,transparent_75%)]"
        />

        <Container className="py-24 sm:py-32 lg:py-40">
          <FadeIn>
            <div className="flex items-center gap-4 border-b border-white/15 pb-3">
              <p className="eyebrow text-white/55 wdth-narrow">Address</p>
              <span aria-hidden="true" className="h-px flex-1 bg-white/15" />
              <p className="eyebrow text-white/55 wdth-narrow">
                Calgary, AB · Montreal, QC
              </p>
            </div>
          </FadeIn>

          <FadeIn>
            <a href="mailto:noel@grouplabs.ca" className="group block pt-12">
              <p className="font-mono tabular text-white tracking-tight transition-colors group-hover:text-orange-500
                            text-[clamp(1.75rem,7vw,5.25rem)] leading-[0.96]">
                noel@grouplabs.ca
              </p>
            </a>
          </FadeIn>

          <FadeIn>
            <dl className="mt-16 grid grid-cols-1 gap-y-8 border-t border-white/15 pt-8 sm:grid-cols-3 sm:gap-x-8">
              <div>
                <dt className="eyebrow text-white/45 wdth-narrow">Calgary</dt>
                <dd className="mt-2 font-mono text-sm text-white/85">
                  +1 (587) 700-9968
                </dd>
              </div>
              <div>
                <dt className="eyebrow text-white/45 wdth-narrow">Montreal</dt>
                <dd className="mt-2 font-mono text-sm text-white/85">
                  +1 (825) 365-9891
                </dd>
              </div>
              <div>
                <dt className="eyebrow text-white/45 wdth-narrow">Hours</dt>
                <dd className="mt-2 font-mono text-sm text-white/85">
                  09:00 – 17:00 · MT
                </dd>
              </div>
            </dl>
          </FadeIn>
        </Container>
      </div>
    </section>
  )
}
