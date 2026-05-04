import Image from 'next/image'
import Link from 'next/link'

import { Container } from '@/components/Container'
import { ContactCTA } from '@/components/ContactCTA'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { HeroSection } from '@/components/HeroSection'
import { ImagePlaceholder } from '@/components/ImagePlaceholder'
import { MugModel } from '@/components/MugModel'
import { productIcons } from '@/components/ProductIcons'
import { ScrollableRow } from '@/components/ScrollableRow'
import { SectionHead } from '@/components/SectionHead'
import logoCenovus from '@/images/clients/cenovus/cenovus.png'
import logoHBI from '@/images/clients/hbi/hbi.png'
import logoObrien from '@/images/clients/obrien/obrien.png'
import logoSmart from '@/images/clients/smart/smart-logo.png'
import logoIvado from '@/images/programs/ivado.png'
import logoMcGillDobson from '@/images/programs/mcgill-dobson.png'
import logoMicrosoftStartups from '@/images/programs/microsoft-for-startups.png'
import logoOvh from '@/images/programs/ovh.png'
import workBowRiver from '@/images/work/bow-river.jpg'
import workCenovus from '@/images/work/cenovus.jpg'
import workHotchkiss from '@/images/work/hotchkiss.jpg'
import workSmart from '@/images/work/smart.jpg'

const clients = [
  ['Cenovus Energy', logoCenovus, 'energy', 40],
  ['Hotchkiss Brain Institute', logoHBI, 'healthcare', 32],
  ["O'Brien Institute for Public Health", logoObrien, 'public health', 60],
  ['SMART', logoSmart, 'education', 104],
]

const programs = [
  [
    'Microsoft for Startups',
    'https://www.microsoft.com/en-us/startups',
    logoMicrosoftStartups,
    144,
  ],
  ['OVH Startup Program', 'https://startup.ovhcloud.com', logoOvh, 80],
  [
    'McGill Dobson Centre',
    'https://www.mcgill.ca/dobson/',
    logoMcGillDobson,
    128,
  ],
  ['IVADO Scientist in Residence', 'https://ivado.ca/', logoIvado, 52],
]

function DeployedAt() {
  return (
    <Container className="mt-2 sm:mt-3 lg:mt-4">
      <FadeIn immediate delay={0.8}>
        <figure className="relative isolate w-full overflow-hidden rounded-3xl border border-neutral-950/10 lg:max-h-[90vh]">
          <Image
            src={workBowRiver}
            alt="Aerial top-down view of the Bow River cutting through downtown Calgary at golden hour, with bridges, the downtown grid, and parkland visible."
            fill
            sizes="(min-width: 1024px) 1280px, 100vw"
            className="object-cover"
            unoptimized
            placeholder="blur"
            priority
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-neutral-950/75"
          />
          <div className="relative flex flex-col px-6 pb-6 pt-12 sm:px-10 sm:pb-8 sm:pt-14 lg:px-14 lg:pb-10 lg:pt-12">
            <p className="eyebrow wdth-narrow text-white/55 text-center">
              §&nbsp;01 &nbsp;·&nbsp; In production
            </p>
            <h3 className="wdth-wide mx-auto mt-4 text-center font-display text-[clamp(1.375rem,2.6vw,2.25rem)] font-medium leading-[1.08] tracking-tight text-white">
              Our work runs in the
              <span className="text-white/85 block font-normal italic">
                real world.
              </span>
            </h3>
            <span
              aria-hidden="true"
              className="mx-auto mt-6 block h-px w-16 bg-white/25"
            />
            <ul
              role="list"
              className="mt-8 grid grid-cols-2 items-stretch gap-x-0 gap-y-12 lg:grid-cols-4 lg:gap-y-8 lg:divide-x lg:divide-white/25"
            >
              {clients.map(([client, logo, sector, h]) => (
                <li
                  key={client}
                  className="group flex flex-col items-center px-4 text-center lg:px-8"
                >
                  <div className="flex h-24 items-center justify-center opacity-80 brightness-0 invert transition duration-300 group-hover:opacity-100">
                    <Image src={logo} height={h} alt={client} unoptimized />
                  </div>
                  <p className="group-hover:text-white/85 mt-3 font-mono text-[10px] uppercase tracking-[0.18em] text-white/50 transition-colors">
                    {sector}
                  </p>
                </li>
              ))}
            </ul>
            <div className="mt-10 flex flex-col items-center">
              <div className="flex w-full items-center gap-5">
                <span
                  aria-hidden="true"
                  className="h-px w-10 flex-none bg-white/25"
                />
                <p className="eyebrow wdth-narrow text-white/75 lg:whitespace-nowrap">
                  Selected for the following programs
                </p>
                <span aria-hidden="true" className="h-px flex-1 bg-white/25" />
              </div>
              <ul
                role="list"
                className="mt-8 grid w-full grid-cols-2 items-center gap-y-12 lg:mt-6 lg:grid-cols-4 lg:gap-y-8 lg:divide-x lg:divide-white/25"
              >
                {programs.map(([name, href, logo, h]) => (
                  <li
                    key={name}
                    className="flex items-center justify-center px-4 lg:px-8"
                  >
                    <a
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={name}
                      className="group flex h-36 items-center justify-center opacity-60 brightness-0 invert transition duration-500 hover:opacity-100"
                    >
                      <Image src={logo} height={h} alt={name} unoptimized />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="text-white/45 mt-8 flex items-baseline justify-between gap-3 font-mono text-[10px] uppercase tracking-[0.18em]">
              <span>Calgary · Bow River, top-down</span>
              <span className="tabular text-white/35">§&nbsp;01</span>
            </div>
          </div>
        </figure>
      </FadeIn>
    </Container>
  )
}

/**
 * Three featured cases — each presented with substance: client identity,
 * the actual problem, the actual outcome, the stack. No five-row table.
 */
const FEATURED_WORK = [
  {
    n: '01',
    year: '2024',
    client: 'Cenovus Energy',
    sector: 'Operational analytics · forecasting & predictive maintenance',
    problem:
      'Operational data from multiple Cenovus facilities (sensor readouts, raw logs) was arriving with irregular sampling, missing values, and inconsistent units, blocking any reliable forecasting or predictive-maintenance work.',
    outcome:
      'Built a secure end-to-end pipeline covering ingestion, feature engineering, model training and reporting, with gradient-boosted trees and recurrent neural networks evaluated per task. Models were containerised and deployed to cloud; daily dashboards now surface insights for engineers and automated reports replace manual rollups.',
    metric: [
      'Reporting cadence',
      'Daily',
      'automated dashboards across facilities',
    ],
    stack:
      'Python · gradient-boosted trees · RNNs · containerised cloud deploy',
    href: '/work/cenovus-energy',
    image: {
      id: 'IMG-02',
      caption: 'Cenovus operations · Alberta',
      src: workCenovus,
      alt: 'Aerial view of two drilling rigs on a prairie operational site in Alberta at golden hour, with service roads cutting through the landscape.',
      prompt:
        'Aerial documentary photograph in muted color, 16:9, of an oil and gas operational site in southern Alberta at golden hour. Visible: drilling pads, well heads, service roads cutting through prairie. Slight haze on the horizon, long shadows. Clean composed wide shot — no people, no equipment branding visible, no text overlays. Photographed in the style of a National Geographic operational landscape, not a corporate brochure.',
    },
  },
  {
    n: '02',
    year: '2024',
    client: 'Hotchkiss Brain Institute',
    sector: "Hyperspectral imaging · Alzheimer's detection",
    problem:
      "Detecting Alzheimer's disease from hyperspectral imaging on blood samples. A noisy time-series problem with real risks of data leakage and outlier-driven results that would invalidate the model.",
    outcome:
      'Built the pipeline with Gaussian smoothing, MinMax scaling and MiniRocket-style feature extraction, then benchmarked GRU, RNN, LSTM and HIVE-COTE 2.0 against XGBoost, LightGBM and Random Forest. Random Forest came out on top.',
    metric: [
      'Accuracy',
      '> 98%',
      'Random Forest on hyperspectral blood samples',
    ],
    stack: 'Random Forest · LSTM · HIVE-COTE 2.0 · XGBoost · LightGBM',
    href: '/work/hotchkiss-brain-institute',
    image: {
      id: 'IMG-03',
      caption: 'Neural decoding pipeline · clinical research',
      src: workHotchkiss,
      alt: 'Neural decoding waveforms on a clinical research display, with a gloved researcher’s hand reaching toward the screen.',
      prompt:
        'Photograph in cool muted color, 16:9, of a high-resolution medical research display showing abstract neural decoding waveforms — soft blue and amber traces against a near-black background. A researcher’s gloved hand reaches toward the screen in shallow depth of field, only fingers visible. Soft blur of clinical research lab equipment behind. No faces, no logos, no text overlays. Editorial scientific photography in the style of Nature magazine.',
    },
  },
  {
    n: '03',
    year: '2023',
    client: 'SMART Technologies',
    sector: 'K–12 education · teacher-facing AI tools',
    problem:
      'Teachers want interactive lessons but have almost no time to build them. Turning a topic line like "make a counting game for kindergarten" into a polished, classroom-ready activity is out of reach in a normal prep window.',
    outcome:
      'Shipped a generation pipeline: Claude 3 Sonnet decomposes the request and drafts the activity, a Rust Actix-Web service moderates, spell-checks and sanitises the output, and a Next.js frontend streams the activity live to the browser for preview and edits. Embeds directly into SMART Boards and LMSs.',
    metric: [
      'Activities generated',
      '300+',
      'across 5 schools · 150+ students · 8 months',
    ],
    stack:
      'Rust Actix-Web · Claude 3 Sonnet · Next.js + React · Prometheus + Grafana',
    href: '/work/smart-technologies',
    image: {
      id: 'IMG-04',
      caption: 'Generated interactive on a SMART board · classroom',
      src: workSmart,
      alt: 'A teacher at the front of a bright K–12 classroom using an interactive worksheet on a large SMART display, with students at their desks watching and engaged.',
      prompt:
        'Wide-angle documentary photograph in warm muted color, 16:9, of a modern bright K–12 classroom seen from the back of the room. A teacher stands at a large interactive SMART display at the front, mid-lesson, gesturing at the screen — the board shows a colourful, well-designed interactive worksheet (drag-and-drop shapes, a clear question prompt, playful but legible). Five or six students at their desks in soft focus in the foreground, leaning forward and engaged. Late morning natural light through tall windows on the right. No faces visible (teacher seen from behind, students from behind). No logos, no text overlays you can read. Editorial documentary photography — New York Times feature on K–12 ed-tech.',
    },
  },
]

function FeaturedWork() {
  return (
    <section id="work" className="mt-32 sm:mt-40 lg:mt-52">
      <Container>
        <SectionHead
          kicker="Selected work"
          title="Three engagements, on the record."
          dek="Real production deployments. What the system did before, what it does now, and the stack that took it there."
          rightMeta={
            <Link href="/work" className="hover:text-orange-600">
              See all
            </Link>
          }
          size="lg"
        />

        <FadeInStagger faster>
          <ol className="mt-16 space-y-16 sm:space-y-24">
            {FEATURED_WORK.map((w) => (
              <FadeIn as="li" key={w.n}>
                <article className="group">
                  {/* top line */}
                  <div className="border-neutral-950/15 flex items-baseline gap-4 border-b pb-3">
                    <span className="tabular font-mono text-2xl font-medium tracking-tight text-neutral-950">
                      {w.n}
                    </span>
                    <span className="eyebrow wdth-narrow text-neutral-500">
                      {w.year} · {w.sector}
                    </span>
                    <span
                      aria-hidden="true"
                      className="bg-neutral-950/15 h-px flex-1"
                    />
                    <Link
                      href={w.href}
                      className="eyebrow wdth-narrow text-neutral-500 hover:text-orange-600"
                    >
                      Full report →
                    </Link>
                  </div>

                  {/* image — real <Image> when supplied, placeholder otherwise */}
                  {w.image && (
                    <div className="mt-8">
                      {w.image.src ? (
                        <figure
                          className="relative w-full overflow-hidden border border-neutral-950/10"
                          style={{ aspectRatio: '16/9' }}
                        >
                          <Image
                            src={w.image.src}
                            alt={w.image.alt ?? ''}
                            fill
                            sizes="(min-width: 1024px) 1100px, 100vw"
                            className="object-cover"
                            unoptimized
                            placeholder="blur"
                          />
                          {w.image.caption && (
                            <figcaption className="text-white/85 absolute bottom-3 left-3 right-3 flex items-baseline justify-between gap-3 font-mono text-[10px] uppercase tracking-[0.18em] mix-blend-difference">
                              <span>{w.image.caption}</span>
                              <span className="opacity-50">{w.image.id}</span>
                            </figcaption>
                          )}
                        </figure>
                      ) : (
                        <ImagePlaceholder
                          id={w.image.id}
                          aspect="16/9"
                          caption={w.image.caption}
                          prompt={w.image.prompt}
                        />
                      )}
                    </div>
                  )}

                  {/* client + body */}
                  <div className="mt-10 grid grid-cols-1 gap-x-12 gap-y-10 lg:grid-cols-12">
                    <h3
                      className="wdth-wide font-display text-[clamp(2rem,5vw,3.75rem)] font-medium leading-[1.04] tracking-tight
                                   text-neutral-950 lg:col-span-5"
                    >
                      {w.client}
                    </h3>

                    <div className="space-y-6 text-base leading-relaxed text-neutral-700 lg:col-span-7">
                      <p>
                        <span className="eyebrow wdth-narrow text-neutral-500">
                          Problem &nbsp;·&nbsp;
                        </span>{' '}
                        {w.problem}
                      </p>
                      <p>
                        <span className="eyebrow wdth-narrow text-neutral-500">
                          Outcome &nbsp;·&nbsp;
                        </span>{' '}
                        {w.outcome}
                      </p>
                    </div>
                  </div>

                  {/* metric + stack */}
                  <div className="mt-10 grid grid-cols-1 gap-x-12 gap-y-6 border-t border-neutral-950/10 pt-6 lg:grid-cols-12">
                    <div className="lg:col-span-5">
                      <p className="eyebrow wdth-narrow text-neutral-500">
                        {w.metric[0]}
                      </p>
                      <p className="tabular mt-2 font-mono text-3xl font-medium leading-none tracking-tight text-neutral-950 sm:text-4xl">
                        {w.metric[1]}
                      </p>
                      <p className="mt-2 font-mono text-xs text-neutral-500">
                        {w.metric[2]}
                      </p>
                    </div>
                    <div className="lg:col-span-7">
                      <p className="eyebrow wdth-narrow text-neutral-500">
                        Stack
                      </p>
                      <p className="mt-2 font-mono text-sm leading-relaxed text-neutral-800">
                        {w.stack}
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

function Products() {
  const products = [
    {
      n: '01',
      name: 'BuildLess',
      tagline: 'Pre-build product validation',
      desc: 'A working idea taken to a live user test in under two weeks. Ends with a written build-or-kill recommendation, backed by behaviour data.',
      href: '/buildless',
      meta: 'Sprint · 1–2 wk',
    },
    {
      n: '02',
      name: 'Nudge',
      tagline: 'In-app walkthrough overlay',
      desc: 'End users ask Nudge how to do something, and it highlights the right elements on the page and walks them through, step by step.',
      href: '#',
      meta: 'In development',
    },
    {
      n: '03',
      name: 'Tell',
      tagline: 'High-throughput LLM gateway',
      desc: 'Caching, routing, and fallback for production-scale inference. Built for teams shipping LLM features at volume.',
      href: '#',
      meta: 'v1.0 · released',
    },
    {
      n: '04',
      name: 'Atmos',
      tagline: 'Multi-cloud ML orchestration',
      desc: 'Reproducible pipelines and model deployment across cloud providers.',
      href: '#',
      meta: 'v0.9 · beta',
    },
    {
      n: '05',
      name: 'Tessera',
      tagline: 'Sandboxed code runtime',
      desc: 'Safe execution environment for LLM-generated and user-submitted code.',
      href: '#',
      meta: 'v0.8 · beta',
    },
    {
      n: '06',
      name: 'Norma',
      tagline: 'Automated feature engineering',
      desc: 'Generate, evaluate, and select features for tabular ML at scale.',
      href: 'https://norma.grouplabs.ca',
      meta: 'v1.0 · released',
    },
    {
      n: '07',
      name: 'Bridge',
      tagline: 'Sub-ms multi-modal vector search',
      desc: 'Unified retrieval across text, image, and audio embeddings.',
      href: 'https://bridgeproductpage.netlify.app/',
      meta: 'v1.4 · released',
    },
    {
      n: '08',
      name: 'Mesh',
      tagline: 'Distributed compute orchestration',
      desc: 'Job scheduling and resource management for ML workloads at scale.',
      href: '#',
      meta: 'v0.2 · wip',
    },
  ]

  return (
    <section id="products" className="mt-12 sm:mt-16 lg:mt-20">
      <Container>
        <FadeIn>
          <div className="mb-6 flex items-center gap-4 border-b border-neutral-950/15 pb-3">
            <p className="eyebrow wdth-narrow text-neutral-600">Solutions</p>
            <span
              aria-hidden="true"
              className="h-px flex-1 bg-neutral-950/15"
            />
            <p className="eyebrow wdth-narrow text-neutral-400">
              Scroll&nbsp;→
            </p>
          </div>
          <ScrollableRow>
            <ul className="flex gap-4">
              {products.map((p) => {
                const Icon = productIcons[p.name]
                return (
                <li key={p.name} className="flex-shrink-0">
                  <Link
                    href={p.href}
                    className="group flex h-[24rem] w-[20rem] flex-col rounded-2xl border border-neutral-950/15 bg-neutral-50 p-8 transition-colors hover:border-neutral-950/30 hover:bg-white"
                  >
                    <div className="flex items-start justify-between">
                      {Icon && <Icon className="h-20 w-auto text-neutral-800" />}
                      <span className="tabular font-mono text-sm font-medium text-neutral-400">
                        {p.n}
                      </span>
                    </div>

                    <h3 className="mt-7 font-display text-3xl font-medium tracking-tight text-neutral-950">
                      {p.name}
                    </h3>
                    <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.18em] text-neutral-500">
                      {p.tagline}
                    </p>
                    <p className="mt-4 text-sm leading-relaxed text-neutral-700">
                      {p.desc}
                    </p>

                    <div className="mt-auto flex items-baseline justify-between gap-3 border-t border-neutral-950/10 pt-5">
                      <span className="eyebrow wdth-narrow text-neutral-500">
                        {p.meta}
                      </span>
                      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-orange-600 transition-transform group-hover:translate-x-0.5">
                        Open →
                      </span>
                    </div>
                  </Link>
                </li>
                )
              })}
            </ul>
          </ScrollableRow>
        </FadeIn>
      </Container>
    </section>
  )
}


function WhatIsHappening() {
  return (
    <section className="relative isolate mt-32 overflow-hidden bg-neutral-950 sm:mt-40 lg:mt-52">
      <Container className="py-24 sm:py-32 lg:py-40">
        <FadeIn>
          <div className="border-white/15 flex items-center gap-4 border-b pb-3">
            <p className="eyebrow wdth-narrow text-white/65">
              Working notes
            </p>
            <span aria-hidden="true" className="bg-white/15 h-px flex-1" />
            <p className="eyebrow wdth-narrow text-white/55">
              §&nbsp;02
            </p>
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
                <MugModel className="absolute inset-0" />
              </div>
              <figcaption className="pointer-events-none absolute bottom-4 left-1/2 z-10 inline-flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-md border border-white/10 bg-white/10 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-white/80 opacity-0 backdrop-blur-md transition-opacity duration-300 group-hover:opacity-100">
                <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                Coffee mug · zero downtime since 2020
              </figcaption>
            </figure>
          </FadeIn>

          <FadeIn className="lg:col-span-7">
            <h2 className="wdth-wide font-display text-[clamp(2rem,5vw,3.75rem)] font-medium leading-[1.04] tracking-tight text-white [text-wrap:balance]">
              What is happening at GroupLabs?
            </h2>

            <div className="mt-10 space-y-6 text-base leading-relaxed text-white/75 sm:text-lg">
              <p>
                GroupLabs began as a small group of people with an academic
                background, working on difficult technical problems. Over time,
                more of these problems came to us, and it became clear that the
                work needed structure. The company grew out of that.
              </p>
              <p>
                From the beginning, we&rsquo;ve been interested in systems that
                hold up outside the lab. That means designing for correctness,
                measuring performance, and treating reliability as something
                that must be demonstrated, not assumed.
              </p>
              <p>
                We work directly with real systems. We build, test, and refine
                them under the conditions they are meant to operate in.
                Simplicity is preferred where possible. Complexity is introduced
                only when necessary.
              </p>
              <p>
                Much of what we do is shaped by repetition. Build something,
                see how it behaves, improve it. The goal is not to produce
                ideas, but to produce systems that work.
              </p>
              <p>
                Over time, this has become a way of working. Careful,
                deliberate, and grounded in practice. We try to leave every
                system in a better state than we found it.
              </p>
              <p className="font-mono text-sm uppercase tracking-[0.18em] text-white">
                That is the work.
              </p>
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  )
}

export const metadata = {
  title: 'GroupLabs | Engineering Firm',
  description:
    'GroupLabs is a Calgary engineering studio. Production ML systems, custom models, and pre-build product validation for serious operators in energy, healthcare, robotics, and education.',
  alternates: { canonical: '/' },
}

export default async function Home() {
  return (
    <>
      <HeroSection />
      <DeployedAt />
      <Products />
      <FeaturedWork />
      <WhatIsHappening />
      <ContactCTA />
    </>
  )
}
