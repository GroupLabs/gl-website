import Image from 'next/image'
import Link from 'next/link'

import { AboutHero } from '@/components/AboutHero'
import { CaliperModel } from '@/components/CaliperModel'
import { Container } from '@/components/Container'
import { ContactCTA } from '@/components/ContactCTA'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'

const TEAM = [
  {
    n: '01',
    name: 'Eugene Paulia',
    role: 'Founder',
    focus: 'Systems · infrastructure',
    image: '/images/team/eugene-paulia.jpg',
  },
  {
    n: '02',
    name: 'Noel Thomas',
    role: 'Founder',
    focus: 'Product · applied ML',
    image: '/images/team/noel-thomas.jpg',
  },
  {
    n: '03',
    name: 'Sam Moses',
    role: 'Intern',
    focus: 'Research · prototyping',
    image: '/images/team/sam-moses.jpg',
  },
]

const PRINCIPLES = [
  {
    n: '01',
    title: 'Small teams, senior people.',
    body: 'Every engagement is staffed by the people doing the work. No layered account managers, no junior pass-throughs. The person on the call is the person on the keyboard.',
    meta: 'Staffing model',
  },
  {
    n: '02',
    title: 'Scoped by phase, ended in writing.',
    body: 'Each phase has a defined output and a written deliverable at the end. We do not sell hours. We do not sell decks. We sell decisions and systems that hold up.',
    meta: 'Engagement shape',
  },
  {
    n: '03',
    title: 'Reliability is demonstrated, not assumed.',
    body: 'Correctness, performance, and operability are measured under the conditions the system has to live in. If we cannot show the number, we do not claim it.',
    meta: 'Engineering bar',
  },
]

const STATS = [
  ['Founded', '2022', 'Calgary, AB'],
  ['Studio size', '12+', 'Engineers and contributors'],
  ['Practice areas', '02', 'BuildLess · ML infrastructure'],
  ['Offices', '02', 'Calgary · Montreal'],
]

function Stats() {
  return (
    <Container className="mt-2 sm:mt-3 lg:mt-4">
      <FadeIn>
        <figure className="border-neutral-950/15 relative isolate w-full overflow-hidden rounded-3xl border bg-neutral-950">
          <div className="relative flex flex-col px-6 pb-6 pt-12 sm:px-10 sm:pb-8 sm:pt-14 lg:px-14 lg:pb-10 lg:pt-12">
            <p className="eyebrow wdth-narrow text-white/55 text-center">
              §&nbsp;01 &nbsp;·&nbsp; Studio at a glance
            </p>
            <h2 className="wdth-wide mx-auto mt-4 text-center font-display text-[clamp(1.375rem,2.6vw,2.25rem)] font-medium leading-[1.08] tracking-tight text-white">
              Four years, two practices,
              <span className="text-white/85 block font-normal italic">
                one bar.
              </span>
            </h2>
            <span
              aria-hidden="true"
              className="mx-auto mt-6 block h-px w-16 bg-white/25"
            />
            <ul
              role="list"
              className="mt-10 grid grid-cols-2 items-stretch gap-x-0 gap-y-12 lg:grid-cols-4 lg:gap-y-8 lg:divide-x lg:divide-white/25"
            >
              {STATS.map(([label, value, sub]) => (
                <li
                  key={label}
                  className="flex flex-col items-center px-4 text-center lg:px-8"
                >
                  <p className="eyebrow wdth-narrow text-white/55">{label}</p>
                  <p className="tabular mt-3 font-mono text-4xl font-medium leading-none tracking-tight text-white sm:text-5xl">
                    {value}
                  </p>
                  <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.18em] text-white/55">
                    {sub}
                  </p>
                </li>
              ))}
            </ul>
            <div className="text-white/45 mt-10 flex items-baseline justify-between gap-3 font-mono text-[10px] uppercase tracking-[0.18em]">
              <span>Calgary · Studio HQ</span>
              <span className="tabular text-white/35">§&nbsp;01</span>
            </div>
          </div>
        </figure>
      </FadeIn>
    </Container>
  )
}

function Principles() {
  return (
    <section id="principles" className="mt-32 sm:mt-40 lg:mt-52">
      <Container>
        <FadeIn>
          <div className="border-neutral-950/15 flex items-center gap-4 border-b pb-3">
            <p className="eyebrow wdth-narrow text-neutral-600">
              How we work
            </p>
            <span
              aria-hidden="true"
              className="bg-neutral-950/15 h-px flex-1"
            />
            <p className="eyebrow wdth-narrow text-neutral-500">§&nbsp;02</p>
          </div>
        </FadeIn>

        <FadeIn>
          <h2 className="wdth-wide mt-10 max-w-4xl font-display text-[clamp(2rem,5vw,3.75rem)] font-medium leading-[1.04] tracking-tight text-neutral-950 [text-wrap:balance]">
            Three rules we keep coming back to.
          </h2>
        </FadeIn>

        <FadeInStagger faster>
          <ol className="mt-16 space-y-12 sm:space-y-16">
            {PRINCIPLES.map((p) => (
              <FadeIn as="li" key={p.n}>
                <article className="group">
                  <div className="border-neutral-950/15 flex items-baseline gap-4 border-b pb-3">
                    <span className="tabular font-mono text-2xl font-medium tracking-tight text-neutral-950">
                      {p.n}
                    </span>
                    <span className="eyebrow wdth-narrow text-neutral-500">
                      {p.meta}
                    </span>
                    <span
                      aria-hidden="true"
                      className="bg-neutral-950/15 h-px flex-1"
                    />
                  </div>

                  <div className="mt-8 grid grid-cols-1 gap-x-12 gap-y-6 lg:grid-cols-12">
                    <h3 className="wdth-wide font-display text-[clamp(1.5rem,3.2vw,2.5rem)] font-medium leading-[1.06] tracking-tight text-neutral-950 lg:col-span-5">
                      {p.title}
                    </h3>
                    <p className="text-base leading-relaxed text-neutral-700 sm:text-lg lg:col-span-7">
                      {p.body}
                    </p>
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

function Team() {
  return (
    <section id="team" className="mt-32 sm:mt-40 lg:mt-52">
      <Container>
        <FadeIn>
          <div className="border-neutral-950/15 flex items-center gap-4 border-b pb-3">
            <p className="eyebrow wdth-narrow text-neutral-600">Team</p>
            <span
              aria-hidden="true"
              className="bg-neutral-950/15 h-px flex-1"
            />
            <p className="eyebrow wdth-narrow text-neutral-500">§&nbsp;03</p>
          </div>
        </FadeIn>

        <FadeIn>
          <h2 className="wdth-wide mt-10 max-w-4xl font-display text-[clamp(2rem,5vw,3.75rem)] font-medium leading-[1.04] tracking-tight text-neutral-950 [text-wrap:balance]">
            The people who do the work.
          </h2>
        </FadeIn>

        <FadeInStagger faster>
          <ul
            role="list"
            className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8"
          >
            {TEAM.map((person) => (
              <FadeIn as="li" key={person.name}>
                <article className="border-neutral-950/15 group flex flex-col rounded-2xl border bg-neutral-50 p-3 transition-colors hover:border-neutral-950/30 hover:bg-white">
                  <div className="relative h-96 overflow-hidden rounded-xl bg-neutral-100">
                    <Image
                      alt={person.name}
                      src={person.image}
                      fill
                      sizes="(min-width: 1024px) 24rem, (min-width: 640px) 50vw, 100vw"
                      className="object-cover grayscale transition duration-500 motion-safe:group-hover:scale-105"
                      unoptimized
                    />
                  </div>

                  <div className="mt-5 px-2 pb-2">
                    <div className="flex items-baseline justify-between gap-3">
                      <p className="eyebrow wdth-narrow text-neutral-500">
                        {person.focus}
                      </p>
                      <span className="tabular font-mono text-sm font-medium text-neutral-400">
                        {person.n}
                      </span>
                    </div>

                    <h3 className="mt-3 font-display text-2xl font-medium tracking-tight text-neutral-950">
                      {person.name}
                    </h3>
                    <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.18em] text-neutral-500">
                      {person.role}
                    </p>
                  </div>
                </article>
              </FadeIn>
            ))}
          </ul>
        </FadeInStagger>
      </Container>
    </section>
  )
}

function Manifesto() {
  return (
    <section className="relative isolate mt-32 overflow-hidden bg-neutral-950 sm:mt-40 lg:mt-52">
      <Container className="py-24 sm:py-32 lg:py-40">
        <FadeIn>
          <div className="border-white/15 flex items-center gap-4 border-b pb-3">
            <p className="eyebrow wdth-narrow text-white/65">Working notes</p>
            <span aria-hidden="true" className="bg-white/15 h-px flex-1" />
            <p className="eyebrow wdth-narrow text-white/55">§&nbsp;04</p>
          </div>
        </FadeIn>

        <div className="mt-12 grid grid-cols-1 gap-x-16 gap-y-10 lg:grid-cols-12 lg:items-start">
          <FadeIn className="lg:col-span-5">
            <figure className="group relative">
              <div
                className="relative w-full overflow-hidden"
                style={{ aspectRatio: '4/5' }}
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0"
                  style={{
                    maskImage:
                      'radial-gradient(ellipse 85% 75% at 50% 45%, black 25%, transparent 90%)',
                    WebkitMaskImage:
                      'radial-gradient(ellipse 85% 75% at 50% 45%, black 25%, transparent 90%)',
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
                <CaliperModel className="absolute inset-0" />
              </div>
              <figcaption className="pointer-events-none absolute bottom-4 left-1/2 z-10 inline-flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-md border border-white/10 bg-white/10 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-white/80 opacity-0 backdrop-blur-md transition-opacity duration-300 group-hover:opacity-100">
                <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                Calipers · Every system measured
              </figcaption>
            </figure>
          </FadeIn>

          <FadeIn className="lg:col-span-7">
            <h2 className="wdth-wide font-display text-[clamp(2rem,5vw,3.75rem)] font-medium leading-[1.04] tracking-tight text-white [text-wrap:balance]">
              Why GroupLabs exists.
            </h2>

            <div className="mt-10 space-y-6 text-base leading-relaxed text-white/75 sm:text-lg">
              <p>
                GroupLabs began as a small group of people with an academic
                background, working on difficult technical problems. Over time,
                more of these problems came to us, and it became clear that the
                work needed structure. The company grew out of that.
              </p>
              <p>
                We kept seeing the same pattern in the teams around us. Weeks
                of engineering committed to ideas that had not earned it yet.
                Models trained on data nobody had checked. Systems shipped on
                hope. BuildLess, our Build Decision Sprint practice, is the
                direct response to that pattern.
              </p>
              <p>
                The rest of the work, ML infrastructure and custom models,
                comes from the same instinct. Designing for correctness,
                measuring performance, and treating reliability as something
                that has to be demonstrated.
              </p>
              <p>
                Much of what we do is shaped by repetition. Build something,
                see how it behaves, improve it. The goal is not to produce
                ideas, but to produce systems that work.
              </p>
              <p className="font-mono text-sm uppercase tracking-[0.18em] text-white">
                That is the work.
              </p>
            </div>

            <div className="mt-12 flex flex-wrap gap-3">
              <Link
                href="/buildless"
                className="group inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-medium text-neutral-950 transition-colors hover:bg-orange-600 hover:text-white"
              >
                See BuildLess
                <span
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:translate-x-0.5"
                >
                  →
                </span>
              </Link>
              <Link
                href="/work"
                className="group inline-flex items-center gap-2 rounded-full border border-white/30 bg-transparent px-5 py-3 text-sm font-medium text-white transition-colors hover:border-orange-500/60 hover:text-orange-500"
              >
                See the work
                <span
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:translate-x-0.5"
                >
                  →
                </span>
              </Link>
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  )
}

export const metadata = {
  title: 'About Us',
  description:
    'GroupLabs is an engineering firm. We lead with BuildLess for Build Decision Sprints, and run deeper engagements in ML infrastructure, custom models, and production systems.',
  alternates: { canonical: '/about' },
}

export default function About() {
  return (
    <>
      <AboutHero />
      <Stats />
      <Principles />
      <Team />
      <Manifesto />
      <ContactCTA />
    </>
  )
}
