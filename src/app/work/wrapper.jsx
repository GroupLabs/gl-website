import Image from 'next/image'

import { ContactCTA } from '@/components/ContactCTA'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { PageLinks } from '@/components/PageLinks'
import { loadCaseStudies } from '@/lib/mdx'

function paragraphs(field) {
  if (!field) return []
  return Array.isArray(field) ? field : [field]
}

function MetaRow({ label, value }) {
  if (!value) return null
  return (
    <div className="flex items-baseline justify-between gap-6 border-t border-neutral-950/10 pt-3">
      <dt className="eyebrow wdth-narrow text-neutral-500">{label}</dt>
      <dd className="text-right font-mono text-sm text-neutral-800">
        {value}
      </dd>
    </div>
  )
}

function StoryBlock({ index, eyebrow, heading, body }) {
  if (!body) return null
  const padded = String(index).padStart(2, '0')
  return (
    <section className="mt-20 sm:mt-24">
      <Container>
        <FadeIn>
          <div className="border-neutral-950/15 flex items-baseline gap-4 border-b pb-3">
            <span className="tabular font-mono text-2xl font-medium tracking-tight text-neutral-950">
              {padded}
            </span>
            <p className="eyebrow wdth-narrow text-neutral-500">{eyebrow}</p>
            <span aria-hidden="true" className="bg-neutral-950/15 h-px flex-1" />
          </div>
          <div className="mt-10 grid grid-cols-1 gap-x-12 gap-y-8 lg:grid-cols-12">
            <h2 className="wdth-wide font-display text-[clamp(1.75rem,3.6vw,2.75rem)] font-medium leading-[1.04] tracking-tight text-neutral-950 lg:col-span-5">
              {heading}
            </h2>
            <div className="space-y-5 text-base leading-relaxed text-neutral-700 sm:text-lg lg:col-span-7">
              {paragraphs(body).map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  )
}

export default async function CaseStudyLayout({ caseStudy }) {
  const allCaseStudies = await loadCaseStudies()
  const moreCaseStudies = allCaseStudies
    .filter(({ metadata }) => metadata !== caseStudy)
    .slice(0, 2)

  const year = caseStudy.date?.split('-')[0]
  const seqNum = caseStudy.n ?? '01'
  const sector = caseStudy.sector ?? caseStudy.service

  return (
    <>
      <article className="mt-24 sm:mt-32 lg:mt-40">
        <Container>
          <FadeIn>
            <div className="border-neutral-950/15 flex items-center gap-4 border-b pb-3">
              <p className="eyebrow wdth-narrow text-orange-600">
                <span
                  aria-hidden="true"
                  className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-orange-600 align-middle"
                />
                §&nbsp;{seqNum} &nbsp;·&nbsp; Case study &nbsp;·&nbsp; {year}
              </p>
              <span aria-hidden="true" className="bg-neutral-950/15 h-px flex-1" />
              <p className="eyebrow wdth-narrow text-neutral-500">
                {caseStudy.service}
              </p>
            </div>
          </FadeIn>
        </Container>

        <Container className="mt-12 sm:mt-16 lg:mt-20">
          <FadeIn>
            {sector && (
              <p className="eyebrow wdth-narrow text-neutral-500">{sector}</p>
            )}
            <h1 className="wdth-wide mt-4 font-display text-[clamp(2.5rem,6.5vw,5rem)] font-medium leading-[0.98] tracking-tight text-neutral-950 [text-wrap:balance]">
              {caseStudy.client}
            </h1>
            {caseStudy.title && (
              <p className="wdth-wide mt-6 max-w-3xl font-display text-xl leading-relaxed text-neutral-700 sm:text-2xl">
                {caseStudy.title}.
              </p>
            )}
          </FadeIn>
        </Container>

        <Container className="mt-12 sm:mt-16">
          <FadeIn>
            <figure
              className="relative w-full overflow-hidden border border-neutral-950/10"
              style={{ aspectRatio: '16/9' }}
            >
              <Image
                src={caseStudy.image}
                alt={caseStudy.image?.alt ?? ''}
                fill
                sizes="(min-width: 1024px) 1100px, 100vw"
                className="object-cover"
                placeholder="blur"
                priority
              />
              {caseStudy.image?.caption && (
                <figcaption className="text-white/85 absolute bottom-3 left-3 right-3 flex items-baseline justify-between gap-3 font-mono text-[10px] uppercase tracking-[0.18em] mix-blend-difference">
                  <span>{caseStudy.image.caption}</span>
                  {caseStudy.image.id && (
                    <span className="opacity-50">{caseStudy.image.id}</span>
                  )}
                </figcaption>
              )}
            </figure>
          </FadeIn>
        </Container>

        <Container className="mt-16 sm:mt-20 lg:mt-24">
          <FadeIn>
            <div className="grid grid-cols-1 gap-x-12 gap-y-12 lg:grid-cols-12">
              <dl className="lg:col-span-5">
                <p className="eyebrow wdth-narrow text-neutral-500">
                  At a glance
                </p>
                <div className="mt-6 space-y-3">
                  <MetaRow label="Client" value={caseStudy.client} />
                  <MetaRow label="Service" value={caseStudy.service} />
                  <MetaRow label="Year" value={year} />
                  <MetaRow label="Stack" value={caseStudy.stack} />
                </div>
              </dl>
              <div className="lg:col-span-7">
                <p className="eyebrow wdth-narrow text-neutral-500">Synopsis</p>
                <div className="mt-6 space-y-5 text-base leading-relaxed text-neutral-700 sm:text-lg">
                  {paragraphs(caseStudy.summary).map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        </Container>

        <StoryBlock
          index={1}
          eyebrow="The problem"
          heading="What was in the way."
          body={caseStudy.problem}
        />
        <StoryBlock
          index={2}
          eyebrow="The approach"
          heading="How we built it."
          body={caseStudy.approach}
        />
        <StoryBlock
          index={3}
          eyebrow="The outcome"
          heading="What it does now."
          body={caseStudy.outcome}
        />

        {caseStudy.metric && (
          <section className="relative isolate mt-24 overflow-hidden bg-neutral-950 sm:mt-32">
            <Container className="py-20 sm:py-28">
              <FadeIn>
                <div className="border-white/15 flex items-center gap-4 border-b pb-3">
                  <p className="eyebrow wdth-narrow text-white/65">Result</p>
                  <span aria-hidden="true" className="bg-white/15 h-px flex-1" />
                  <p className="eyebrow wdth-narrow text-white/55">
                    §&nbsp;{seqNum}
                  </p>
                </div>
                <div className="mt-12 grid grid-cols-1 gap-x-12 gap-y-10 lg:grid-cols-12">
                  <div className="lg:col-span-7">
                    <p className="eyebrow wdth-narrow text-white/65">
                      {caseStudy.metric.label}
                    </p>
                    <p className="tabular mt-4 font-mono text-[clamp(3rem,8vw,6rem)] font-medium leading-none tracking-tight text-white">
                      {caseStudy.metric.value}
                    </p>
                    {caseStudy.metric.sub && (
                      <p className="mt-4 max-w-md font-mono text-sm text-white/65">
                        {caseStudy.metric.sub}
                      </p>
                    )}
                  </div>
                  {caseStudy.stack && (
                    <div className="lg:col-span-5 lg:border-l lg:border-white/15 lg:pl-12">
                      <p className="eyebrow wdth-narrow text-white/65">Stack</p>
                      <p className="mt-4 font-mono text-base leading-relaxed text-white/85">
                        {caseStudy.stack}
                      </p>
                    </div>
                  )}
                </div>
              </FadeIn>
            </Container>
          </section>
        )}

        {caseStudy.tags?.length ? (
          <Container className="mt-20 sm:mt-24">
            <FadeIn>
              <div className="border-neutral-950/15 flex items-baseline gap-4 border-b pb-3">
                <p className="eyebrow wdth-narrow text-neutral-500">
                  What we did
                </p>
                <span aria-hidden="true" className="bg-neutral-950/15 h-px flex-1" />
              </div>
              <ul className="mt-8 flex flex-wrap gap-2">
                {caseStudy.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full border border-neutral-950/20 px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-neutral-700"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </FadeIn>
          </Container>
        ) : null}

        {caseStudy.quote && (
          <Container className="mt-20 sm:mt-24">
            <FadeIn>
              <figure className="border-l border-orange-600 pl-6 sm:pl-10">
                <blockquote className="wdth-wide font-display text-2xl font-medium leading-snug tracking-tight text-neutral-950 sm:text-3xl lg:text-4xl [text-wrap:balance]">
                  &ldquo;{caseStudy.quote.text}&rdquo;
                </blockquote>
                {caseStudy.quote.attribution && (
                  <figcaption className="mt-6 font-mono text-xs uppercase tracking-[0.22em] text-neutral-500">
                    {caseStudy.quote.attribution}
                  </figcaption>
                )}
              </figure>
            </FadeIn>
          </Container>
        )}
      </article>

      {moreCaseStudies.length > 0 && (
        <PageLinks
          className="mt-24 sm:mt-32 lg:mt-40"
          title="More case studies"
          pages={moreCaseStudies}
        />
      )}

      <ContactCTA />
    </>
  )
}
