import Image from 'next/image'
import Link from 'next/link'

import { ContactCTA } from '@/components/ContactCTA'
import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { SectionHead } from '@/components/SectionHead'
import { formatDate } from '@/lib/formatDate'
import { loadCaseStudies } from '@/lib/mdx'

function WorkHero({ count }) {
  return (
    <section className="relative isolate overflow-hidden bg-white text-neutral-950">
      <Container className="relative pb-6 pt-10 sm:pb-8 sm:pt-14 lg:pb-10 lg:pt-16">
        <div className="relative flex min-h-[50vh] flex-col items-center justify-center overflow-hidden rounded-[2rem] px-5 py-8 sm:px-10 sm:py-12 lg:px-14 lg:py-14">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10"
            style={{
              maskImage:
                'radial-gradient(ellipse at center, black 0%, transparent 85%)',
              WebkitMaskImage:
                'radial-gradient(ellipse at center, black 0%, transparent 85%)',
            }}
          >
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  'linear-gradient(to right, rgba(234,88,12,0.10) 1px, transparent 1px), linear-gradient(to bottom, rgba(234,88,12,0.10) 1px, transparent 1px)',
                backgroundSize: '20px 20px',
                backgroundPosition: '0 -2px',
              }}
            />
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  'linear-gradient(to right, rgba(234,88,12,0.20) 1px, transparent 1px), linear-gradient(to bottom, rgba(234,88,12,0.20) 1px, transparent 1px)',
                backgroundSize: '100px 100px',
                backgroundPosition: '0 -2px',
              }}
            />
          </div>

          <FadeIn immediate>
            <p className="eyebrow wdth-narrow text-center text-orange-600">
              <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-orange-600 align-middle" />
              §&nbsp;01 &nbsp;·&nbsp; Selected work
            </p>
          </FadeIn>

          <FadeIn immediate delay={0.15}>
            <h1 className="wdth-wide mt-5 max-w-3xl text-center font-display text-3xl font-medium leading-[1.08] tracking-tight text-neutral-950 sm:text-4xl lg:text-5xl">
              Real systems,{' '}
              <span className="italic text-neutral-700">on the record.</span>
              <br />
              Built and shipped.
            </h1>
          </FadeIn>

          <FadeIn immediate delay={0.3}>
            <p className="mt-6 max-w-xl text-center text-base leading-relaxed text-neutral-700 sm:text-lg">
              What clients had before, what they have now, and how it got built.
              Each engagement runs in production.
            </p>
          </FadeIn>

          <FadeIn immediate delay={0.45}>
            <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.22em] text-neutral-500">
              <span className="tabular text-neutral-950">
                {String(count).padStart(2, '0')}
              </span>{' '}
              engagements documented
            </p>
          </FadeIn>
        </div>
      </Container>
    </section>
  )
}

function CaseStudies({ caseStudies }) {
  return (
    <section id="cases" className="mt-16 sm:mt-24 lg:mt-32">
      <Container>
        <SectionHead
          kicker="§ 02 · Case studies"
          title="Engagements, on the record."
          dek="What we did, how we did it, and what shipped. Open any one for the full report."
          rightMeta={`${String(caseStudies.length).padStart(2, '0')} entries`}
          size="lg"
        />

        <FadeInStagger faster>
          <ol className="mt-16 space-y-16 sm:space-y-24">
            {caseStudies.map((cs, idx) => {
              const n = String(idx + 1).padStart(2, '0')
              const year = cs.date.split('-')[0]
              return (
                <FadeIn as="li" key={cs.client}>
                  <article className="group">
                    <div className="border-neutral-950/15 flex items-baseline gap-4 border-b pb-3">
                      <span className="tabular font-mono text-2xl font-medium tracking-tight text-neutral-950">
                        {n}
                      </span>
                      <span className="eyebrow wdth-narrow text-neutral-500">
                        {year} · {cs.service}
                      </span>
                      <span
                        aria-hidden="true"
                        className="bg-neutral-950/15 h-px flex-1"
                      />
                      <Link
                        href={cs.href}
                        className="eyebrow wdth-narrow text-neutral-500 hover:text-orange-600"
                      >
                        Full report →
                      </Link>
                    </div>

                    <div className="mt-8">
                      <Link href={cs.href} aria-label={`Open ${cs.client} case study`}>
                        <figure
                          className="relative w-full overflow-hidden border border-neutral-950/10"
                          style={{ aspectRatio: '16/9' }}
                        >
                          <Image
                            src={cs.image}
                            alt={cs.image.alt ?? cs.client}
                            fill
                            sizes="(min-width: 1024px) 1100px, 100vw"
                            className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                            unoptimized
                            placeholder="blur"
                          />
                          <figcaption className="text-white/85 absolute bottom-3 left-3 right-3 flex items-baseline justify-between gap-3 font-mono text-[10px] uppercase tracking-[0.18em] mix-blend-difference">
                            <span>{cs.client}</span>
                            <span className="opacity-50">IMG-{n}</span>
                          </figcaption>
                        </figure>
                      </Link>
                    </div>

                    <div className="mt-10 grid grid-cols-1 gap-x-12 gap-y-10 lg:grid-cols-12">
                      <h3 className="wdth-wide font-display text-[clamp(2rem,5vw,3.75rem)] font-medium leading-[1.04] tracking-tight text-neutral-950 lg:col-span-5">
                        <Link href={cs.href} className="hover:text-orange-600">
                          {cs.client}
                        </Link>
                      </h3>

                      <div className="space-y-6 text-base leading-relaxed text-neutral-700 lg:col-span-7">
                        <p>
                          <span className="eyebrow wdth-narrow text-neutral-500">
                            Engagement &nbsp;·&nbsp;
                          </span>{' '}
                          {cs.title}
                        </p>
                        {cs.summary.map((paragraph) => (
                          <p key={paragraph}>
                            <span className="eyebrow wdth-narrow text-neutral-500">
                              Outcome &nbsp;·&nbsp;
                            </span>{' '}
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    </div>

                    <div className="mt-10 grid grid-cols-1 gap-x-12 gap-y-6 border-t border-neutral-950/10 pt-6 lg:grid-cols-12">
                      <div className="lg:col-span-5">
                        <p className="eyebrow wdth-narrow text-neutral-500">
                          Engaged
                        </p>
                        <p className="tabular mt-2 font-mono text-3xl font-medium leading-none tracking-tight text-neutral-950 sm:text-4xl">
                          {formatDate(cs.date)}
                        </p>
                        <p className="mt-2 font-mono text-xs text-neutral-500">
                          {cs.service}
                        </p>
                      </div>
                      <div className="lg:col-span-7">
                        <p className="eyebrow wdth-narrow text-neutral-500">
                          Read
                        </p>
                        <Link
                          href={cs.href}
                          className="tabular mt-2 inline-flex items-baseline gap-2 font-mono text-sm text-neutral-800 transition-colors hover:text-orange-600"
                        >
                          <span>{cs.href}</span>
                          <span
                            aria-hidden="true"
                            className="transition-transform duration-300 group-hover:translate-x-0.5"
                          >
                            →
                          </span>
                        </Link>
                      </div>
                    </div>
                  </article>
                </FadeIn>
              )
            })}
          </ol>
        </FadeInStagger>
      </Container>
    </section>
  )
}

export const metadata = {
  title: 'Our Work',
  description:
    'Production systems built by GroupLabs. Real engagements with operators in energy, healthcare, education, and humanitarian work.',
  alternates: { canonical: '/work' },
}

export default async function Work() {
  const caseStudies = await loadCaseStudies()

  return (
    <>
      <WorkHero count={caseStudies.length} />
      <CaseStudies caseStudies={caseStudies} />
      <ContactCTA />
    </>
  )
}
