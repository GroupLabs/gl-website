import { Container } from '@/components/Container'
import { ContactCTA } from '@/components/ContactCTA'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { ProcessHero } from '@/components/ProcessHero'

const PHASES = [
  {
    n: '01',
    label: 'Discovery',
    duration: '1–2 weeks',
    title: 'Discover',
    intent:
      'We work closely with our clients to understand their needs and goals, embedding ourselves in everyday operations to understand what makes the business tick. Our team conducts in-depth consultations with stakeholders and performs thorough assessments of business processes.',
    outcome:
      'Once the audit is complete, we report back with a comprehensive plan on how to effectively implement the work. The plan is the deliverable, and it is written, not slideware.',
    metric: ['Output', 'Build plan', 'written, scoped, costed'],
    tags: 'Feasibility studies · Employee surveys · Proofs of concept',
  },
  {
    n: '02',
    label: 'Construction',
    duration: 'Project length',
    title: 'Build',
    intent:
      'Based on the discovery phase, we develop a comprehensive roadmap for each product and work toward delivery. The roadmap outlines clear technical steps and timelines, so progression is structured and efficient.',
    outcome:
      'Each client is assigned a dedicated key account manager to maintain open lines of communication and provide regular updates on progress. They serve as the liaison between the client and the development team, ensuring inquiries and feedback are addressed promptly.',
    metric: ['Cadence', 'Weekly', 'demoed builds, written updates'],
    tags: 'Roadmap · Account manager · Iteration reviews',
  },
  {
    n: '03',
    label: 'Delivery',
    duration: 'Ongoing',
    title: 'Deliver',
    intent:
      'During the build phase, we meticulously review and adapt to changes in requirements, ensuring the project timeline and budget are adjusted accordingly for optimal outcomes. Dedicated development time is utilized efficiently to ship high-quality, impactful features.',
    outcome:
      'We hand over a system that runs in production, instrumented and supported. Testing, infrastructure, and continued support are part of the deliverable, not a separate engagement.',
    metric: ['Output', 'In production', 'tested, instrumented, supported'],
    tags: 'Testing · Infrastructure · Support',
  },
]

const VALUES = [
  {
    n: '01',
    title: 'Meticulous',
    body: 'Careful work begins with the details. We treat every artifact (code, schemas, diagrams, copy) as something a future engineer will read.',
  },
  {
    n: '02',
    title: 'Efficient',
    body: 'We meet deadlines by leveraging extensive experience and pre-developed resources. We do not pad estimates with discovery work that has already happened.',
  },
  {
    n: '03',
    title: 'Adaptable',
    body: 'Every business has unique needs. We tailor solutions to fit them, and we revise the plan when reality disagrees with it.',
  },
  {
    n: '04',
    title: 'Honest',
    body: 'We maintain transparency in all our processes. If a path is not working, we say so before the budget is spent finding out.',
  },
  {
    n: '05',
    title: 'Loyal',
    body: 'We foster long-term relationships with our clients, providing ongoing support and value beyond the initial delivery.',
  },
  {
    n: '06',
    title: 'Innovative',
    body: 'We continuously evolve with the technological landscape, actively seeking new and proven solutions to incorporate into our work.',
  },
]

function Phases() {
  return (
    <section id="phases" className="mt-32 sm:mt-40 lg:mt-52">
      <Container>
        <FadeIn>
          <div className="border-neutral-950/15 flex items-center gap-4 border-b pb-3">
            <p className="eyebrow wdth-narrow text-neutral-600">Phases</p>
            <span aria-hidden="true" className="bg-neutral-950/15 h-px flex-1" />
            <p className="eyebrow wdth-narrow text-neutral-500">§&nbsp;01</p>
          </div>
        </FadeIn>

        <FadeIn>
          <h2 className="wdth-wide mt-12 max-w-3xl font-display text-[clamp(2rem,5vw,3.75rem)] font-medium leading-[1.04] tracking-tight text-neutral-950 [text-wrap:balance]">
            Three phases, on the record.
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-neutral-700">
            Each phase ends on a named, written deliverable. No phase ends on a
            meeting.
          </p>
        </FadeIn>

        <FadeInStagger faster>
          <ol className="mt-16 space-y-16 sm:space-y-24">
            {PHASES.map((p) => (
              <FadeIn as="li" key={p.n}>
                <article className="group">
                  <div className="border-neutral-950/15 flex items-baseline gap-4 border-b pb-3">
                    <span className="tabular font-mono text-2xl font-medium tracking-tight text-neutral-950">
                      {p.n}
                    </span>
                    <span className="eyebrow wdth-narrow text-neutral-500">
                      {p.label} · {p.duration}
                    </span>
                    <span
                      aria-hidden="true"
                      className="bg-neutral-950/15 h-px flex-1"
                    />
                    <span className="eyebrow wdth-narrow text-neutral-500">
                      Phase {p.n}
                    </span>
                  </div>

                  <div className="mt-10 grid grid-cols-1 gap-x-12 gap-y-10 lg:grid-cols-12">
                    <h3 className="wdth-wide font-display text-[clamp(2rem,5vw,3.75rem)] font-medium leading-[1.04] tracking-tight text-neutral-950 lg:col-span-5">
                      {p.title}
                    </h3>

                    <div className="space-y-6 text-base leading-relaxed text-neutral-700 lg:col-span-7">
                      <p>
                        <span className="eyebrow wdth-narrow text-neutral-500">
                          Intent &nbsp;·&nbsp;
                        </span>{' '}
                        {p.intent}
                      </p>
                      <p>
                        <span className="eyebrow wdth-narrow text-neutral-500">
                          Outcome &nbsp;·&nbsp;
                        </span>{' '}
                        {p.outcome}
                      </p>
                    </div>
                  </div>

                  <div className="mt-10 grid grid-cols-1 gap-x-12 gap-y-6 border-t border-neutral-950/10 pt-6 lg:grid-cols-12">
                    <div className="lg:col-span-5">
                      <p className="eyebrow wdth-narrow text-neutral-500">
                        {p.metric[0]}
                      </p>
                      <p className="tabular mt-2 font-mono text-3xl font-medium leading-none tracking-tight text-neutral-950 sm:text-4xl">
                        {p.metric[1]}
                      </p>
                      <p className="mt-2 font-mono text-xs text-neutral-500">
                        {p.metric[2]}
                      </p>
                    </div>
                    <div className="lg:col-span-7">
                      <p className="eyebrow wdth-narrow text-neutral-500">
                        Included
                      </p>
                      <p className="mt-2 font-mono text-sm leading-relaxed text-neutral-800">
                        {p.tags}
                      </p>
                    </div>
                  </div>
                </article>
              </FadeIn>
            ))}
          </ol>
        </FadeInStagger>
      </Container>
    </section>
  )
}

function Values() {
  return (
    <section className="relative isolate mt-32 overflow-hidden bg-neutral-950 sm:mt-40 lg:mt-52">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          maskImage:
            'radial-gradient(ellipse 70% 60% at 50% 0%, black 20%, transparent 85%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 70% 60% at 50% 0%, black 20%, transparent 85%)',
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(255,255,255,0.10) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.10) 1px, transparent 1px)',
            backgroundSize: '20px 20px',
            backgroundPosition: '0 -2px',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(255,255,255,0.20) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.20) 1px, transparent 1px)',
            backgroundSize: '100px 100px',
            backgroundPosition: '0 -2px',
          }}
        />
      </div>

      <Container className="py-24 sm:py-32 lg:py-40">
        <FadeIn>
          <div className="border-white/15 flex items-center gap-4 border-b pb-3">
            <p className="eyebrow wdth-narrow text-white/65">Values</p>
            <span aria-hidden="true" className="bg-white/15 h-px flex-1" />
            <p className="eyebrow wdth-narrow text-white/55">§&nbsp;02</p>
          </div>
        </FadeIn>

        <div className="mt-12 grid grid-cols-1 gap-x-16 gap-y-10 lg:grid-cols-12 lg:items-start">
          <FadeIn className="lg:col-span-7">
            <h2 className="wdth-wide font-display text-[clamp(2rem,5vw,3.75rem)] font-medium leading-[1.04] tracking-tight text-white [text-wrap:balance]">
              Reliability and innovation, balanced.
            </h2>
          </FadeIn>

          <FadeIn className="lg:col-span-5">
            <p className="text-base leading-relaxed text-white/75 sm:text-lg">
              We aim to stay at the forefront of emerging technologies, balancing
              innovation with the stability of proven solutions. The values
              below guide tooling choices on every project.
            </p>
          </FadeIn>
        </div>

        <FadeInStagger faster>
          <ul className="mt-16 grid grid-cols-1 gap-x-12 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {VALUES.map((v) => (
              <FadeIn as="li" key={v.n}>
                <div className="border-white/15 flex items-baseline gap-3 border-b pb-3">
                  <span className="tabular font-mono text-sm font-medium text-white">
                    {v.n}
                  </span>
                  <p className="eyebrow wdth-narrow text-white/85">{v.title}</p>
                  <span aria-hidden="true" className="bg-white/15 h-px flex-1" />
                </div>
                <p className="mt-5 text-base leading-relaxed text-white/70">
                  {v.body}
                </p>
              </FadeIn>
            ))}
          </ul>
        </FadeInStagger>
      </Container>
    </section>
  )
}

export const metadata = {
  title: 'Our Process',
  description:
    'How GroupLabs delivers software, ML, and product validation engagements. From discovery through build to delivery.',
  alternates: { canonical: '/process' },
}

export default function Process() {
  return (
    <>
      <ProcessHero />
      <Phases />
      <Values />
      <ContactCTA />
    </>
  )
}
