import Image from 'next/image'
import Link from 'next/link'

import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { HeroSection } from '@/components/HeroSection'
import { HeroSnapshot } from '@/components/HeroSnapshot'
import { ImagePlaceholder } from '@/components/ImagePlaceholder'
import { PracticeDiagram } from '@/components/PracticeDiagram'
import { SectionHead } from '@/components/SectionHead'
import { SparkLine } from '@/components/SparkLine'
import { StudioMark } from '@/components/StudioMark'
import logoSuncor from '@/images/clients/suncor-energy/suncor.png'
import logoHBI from '@/images/clients/hbi/hbi.png'
import logoCenovus from '@/images/clients/cenovus/cenovus.png'
import logoUcalgary from '@/images/clients/ucalgary/ucalgary.png'
import workBowRiver from '@/images/work/bow-river.png'
import workCenovus from '@/images/work/cenovus.png'
import workHotchkiss from '@/images/work/hotchkiss.png'
import workSmart from '@/images/work/smart.png'

const clients = [
  ['Suncor Energy', logoSuncor, 'energy', '2022'],
  ['Hotchkiss Brain Institute', logoHBI, 'healthcare', '2024'],
  ['Cenovus Energy', logoCenovus, 'energy', '2024'],
  ['University of Calgary', logoUcalgary, 'education', '2023'],
]

function DeployedAt() {
  return (
    <Container className="mt-2 sm:mt-3 lg:mt-4">
      <FadeIn immediate delay={0.8}>
        <figure className="relative isolate w-full overflow-hidden rounded-3xl border border-neutral-950/10">
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
          <div className="relative px-6 py-10 sm:px-10 sm:py-14 lg:px-14 lg:py-16">
            <div className="flex items-center gap-4 border-b border-white/15 pb-3">
              <p className="eyebrow wdth-narrow text-white/70">
                In production at
              </p>
              <span aria-hidden="true" className="h-px flex-1 bg-white/15" />
              <p className="eyebrow wdth-narrow text-white/70">
                {clients.length} institutions · 4 sectors
              </p>
            </div>
            <ul
              role="list"
              className="mt-10 grid grid-cols-2 items-stretch gap-x-0 gap-y-6 lg:grid-cols-4 lg:divide-x lg:divide-white/10"
            >
              {clients.map(([client, logo, sector, since]) => (
                <li
                  key={client}
                  className="group flex flex-col items-center justify-between px-4 py-2 text-center lg:px-8"
                >
                  <div className="flex h-16 items-center justify-center opacity-80 brightness-0 invert transition duration-300 group-hover:opacity-100">
                    <Image src={logo} height={48} alt={client} unoptimized />
                  </div>
                  <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.18em] text-white/50 transition-colors group-hover:text-white/80">
                    {sector} · since {since}
                  </p>
                </li>
              ))}
            </ul>
            <figcaption className="mt-10 flex items-baseline justify-between gap-3 font-mono text-[10px] uppercase tracking-[0.18em] text-white/50">
              <span>Calgary · Bow River, top-down</span>
              <span className="opacity-60">IMG-01</span>
            </figcaption>
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
    stack: 'Python · gradient-boosted trees · RNNs · containerised cloud deploy',
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
    stack: 'Rust Actix-Web · Claude 3 Sonnet · Next.js + React · Prometheus + Grafana',
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

const EARLIER_WORK = [
  { year: '2023', client: 'OrthoFoodie', tag: 'pre-build sprint' },
  { year: '2022', client: 'MHHC', tag: 'habitat models' },
  { year: '2022', client: 'Suncor Energy', tag: 'serving infra' },
]

function FeaturedWork() {
  return (
    <section id="work" className="mt-32 sm:mt-40 lg:mt-52">
      <Container>
        <SectionHead
          kicker="Selected work"
          title="Three engagements, on the record."
          dek="Real production deployments. What the system did before, what it does now, and the stack that took it there."
          rightMeta="Earlier work, below"
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

        {/* earlier work — quiet list */}
        <FadeIn>
          <div className="border-neutral-950/15 mt-20 border-t pt-6">
            <p className="eyebrow wdth-narrow text-neutral-500">Earlier work</p>
            <ul
              role="list"
              className="mt-6 divide-y divide-neutral-950/10 border-y border-neutral-950/10"
            >
              {EARLIER_WORK.map((e) => (
                <li
                  key={e.client}
                  className="tabular grid grid-cols-12 items-baseline gap-x-6 py-4 font-mono text-sm text-neutral-700"
                >
                  <span className="col-span-2 text-xs text-neutral-500 sm:col-span-1">
                    {e.year}
                  </span>
                  <span className="col-span-7 text-neutral-950 sm:col-span-5">
                    {e.client}
                  </span>
                  <span className="col-span-3 text-xs uppercase tracking-[0.16em] text-neutral-500 sm:col-span-5">
                    {e.tag}
                  </span>
                  <span className="col-span-12 text-right text-xs text-neutral-400 sm:col-span-1">
                    archive
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-right font-mono text-[11px] uppercase tracking-[0.18em] text-neutral-500">
              Full archive at{' '}
              <Link
                href="/work"
                className="text-neutral-950 underline decoration-neutral-300 underline-offset-4 hover:decoration-orange-600"
              >
                /work
              </Link>
            </p>
          </div>
        </FadeIn>
      </Container>
    </section>
  )
}

function Practices() {
  const practices = [
    {
      n: '01',
      kind: 'serving',
      title: 'Production ML systems',
      body: 'Reliable, high-throughput serving stacks — registries, feature stores, observability, autoscaling. We build them to be operated by your team, not by us.',
      spec: 'p50 < 12ms · 99.9% SLO · k8s-native',
    },
    {
      n: '02',
      kind: 'model',
      title: 'Custom model development',
      body: 'Tailored models in PyTorch and JAX when off-the-shelf doesn’t fit, supported by reproducible benchmarks and rigorous evaluation. Every result, reconstructable.',
      spec: 'PyTorch · JAX · CUDA · vendored evals',
    },
    {
      n: '03',
      kind: 'tools',
      title: 'Internal R&D',
      body: 'Open and internal tools we build along the way: gateways, orchestration, vector search, feature engineering. Each one came out of a real engagement.',
      spec: 'Tell · Atmos · Tessera · Norma · Bridge · Mesh',
    },
  ]

  return (
    <section className="mt-32 sm:mt-40 lg:mt-52">
      <Container>
        <SectionHead
          kicker="Practice"
          title="Three lines of work."
          dek="Production-grade engagements, scoped by phase and quoted by phase. We staff small and senior."
          size="lg"
        />

        <FadeInStagger faster>
          <ol className="mt-16 grid grid-cols-1 gap-y-12 lg:grid-cols-3 lg:gap-x-0 lg:divide-x lg:divide-neutral-950/10">
            {practices.map((p) => (
              <FadeIn
                as="li"
                key={p.n}
                className="lift group lg:px-10 lg:first:pl-0 lg:last:pr-0"
              >
                <div className="border-neutral-950/15 flex items-baseline gap-3 border-b pb-3">
                  <span className="tabular font-mono text-3xl font-medium tracking-tight text-neutral-950">
                    {p.n}
                  </span>
                  <span className="eyebrow wdth-narrow text-neutral-500">
                    Practice
                  </span>
                </div>

                <PracticeDiagram
                  kind={p.kind}
                  className="mt-6 h-20 w-full text-neutral-700 transition-colors duration-500 group-hover:text-orange-600"
                />

                <h3 className="mt-6 font-display text-2xl font-medium tracking-tight text-neutral-950 sm:text-3xl">
                  {p.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-neutral-700">
                  {p.body}
                </p>
                <p className="mt-5 font-mono text-xs text-neutral-500">
                  {p.spec}
                </p>
              </FadeIn>
            ))}
          </ol>
        </FadeInStagger>
      </Container>
    </section>
  )
}

function BuildLessSection() {
  return (
    <section className="relative isolate mt-32 overflow-hidden bg-neutral-950 sm:mt-40 lg:mt-52">
      <div
        aria-hidden="true"
        className="grid-paper-dark pointer-events-none absolute inset-0 -z-10 opacity-70 [mask-image:radial-gradient(ellipse_at_top_right,white,transparent_70%)]"
      />

      <Container className="py-24 sm:py-32 lg:py-40">
        <FadeIn>
          <div className="border-white/15 flex items-center gap-4 border-b pb-3">
            <p className="eyebrow wdth-narrow text-orange-500">
              <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-orange-500 align-middle" />
              Practice 04 · BuildLess
            </p>
            <span aria-hidden="true" className="bg-white/15 h-px flex-1" />
            <p className="eyebrow text-white/55 wdth-narrow">
              Detail at{' '}
              <Link
                href="/buildless"
                className="text-white underline decoration-white/30 underline-offset-4 hover:decoration-orange-500"
              >
                /buildless
              </Link>
            </p>
          </div>
        </FadeIn>

        <div className="mt-12 grid grid-cols-1 gap-x-16 gap-y-12 lg:grid-cols-12">
          <FadeIn className="lg:col-span-7">
            <h2
              className="wdth-wide font-display text-[clamp(2.5rem,7vw,5.25rem)] font-medium leading-[0.98] tracking-tight text-white
                           [text-wrap:balance]"
            >
              Pre-build product validation.{' '}
              <span className="text-white/55">In days, not months.</span>
            </h2>
            <div className="mt-10 max-w-xl space-y-5 text-lg leading-relaxed text-white/75">
              <p>
                A working idea, taken to a live test in front of real users in
                under two weeks, instrumented end-to-end. The sprint ends with a
                written build-or-kill recommendation backed by behaviour data.
              </p>
              <p className="text-white/55">
                For founders and product teams who would rather spend a week
                finding out than a quarter committing.
              </p>
            </div>

            <p className="text-white/65 mt-10 font-mono text-sm">
              Sprint &nbsp;·&nbsp; 1–2 weeks &nbsp;·&nbsp; from{' '}
              <span className="text-white">$8k–$15k</span> &nbsp;·&nbsp; larger
              programs by phase
            </p>
          </FadeIn>

          <FadeIn className="lg:col-span-5 lg:flex lg:items-start lg:justify-end lg:pt-2">
            <HeroSnapshot invert />
          </FadeIn>
        </div>
      </Container>
    </section>
  )
}

function Tools() {
  const tools = [
    {
      name: 'Tell',
      tagline: 'High-throughput LLM gateway · caching · routing',
      version: 'v1.0',
      status: 'released',
      spark: [3, 5, 4, 7, 6, 9, 11, 13, 12, 14],
    },
    {
      name: 'Atmos',
      tagline: 'Multi-cloud ML orchestration',
      version: 'v0.9',
      status: 'beta',
      spark: [2, 3, 3, 5, 4, 6, 7, 8, 9, 11],
    },
    {
      name: 'Tessera',
      tagline: 'Sandboxed code runtime',
      version: 'v0.8',
      status: 'beta',
      spark: [1, 2, 4, 3, 5, 6, 5, 7, 8, 9],
    },
    {
      name: 'Norma',
      tagline: 'Automated feature engineering',
      version: 'v1.0',
      status: 'released',
      link: 'https://norma.grouplabs.ca',
      spark: [4, 5, 6, 6, 7, 9, 10, 12, 14, 16],
    },
    {
      name: 'Bridge',
      tagline: 'Sub-ms multi-modal vector search',
      version: 'v1.4',
      status: 'released',
      link: 'https://bridgeproductpage.netlify.app/',
      spark: [6, 7, 9, 11, 12, 14, 17, 18, 21, 24],
    },
    {
      name: 'Mesh',
      tagline: 'Distributed compute orchestration',
      version: 'v0.2',
      status: 'wip',
      spark: [1, 1, 2, 2, 2, 3, 3, 4, 4, 5],
    },
  ]

  return (
    <section id="tools" className="mt-32 sm:mt-40 lg:mt-52">
      <Container>
        <SectionHead
          kicker="Internal R&D"
          title="What came out of the work."
          dek="Tools and libraries we built to support the consulting practice. Each one started as something a client needed."
          rightMeta={`${tools.length} entries · 18-mo trend`}
          size="lg"
        />

        <FadeInStagger faster>
          <table className="mt-12 w-full border-collapse text-sm">
            <thead>
              <tr className="border-neutral-950/15 border-y">
                <th className="eyebrow wdth-narrow py-3 pr-4 text-left text-neutral-500">
                  Name
                </th>
                <th className="eyebrow wdth-narrow py-3 pr-4 text-left text-neutral-500">
                  What it does
                </th>
                <th className="eyebrow wdth-narrow hidden py-3 pr-4 text-left text-neutral-500 md:table-cell">
                  18-mo trend
                </th>
                <th className="eyebrow wdth-narrow py-3 pr-4 text-left text-neutral-500">
                  Ver
                </th>
                <th className="eyebrow wdth-narrow py-3 text-right text-neutral-500">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {tools.map((t) => (
                <tr
                  key={t.name}
                  className="group border-b border-neutral-950/10 transition-colors hover:bg-neutral-950/[0.025]"
                >
                  <td className="py-4 pr-4 align-baseline">
                    <span className="font-mono text-base font-semibold text-neutral-950 transition-colors group-hover:text-orange-600">
                      {t.name}
                    </span>
                    {t.link && (
                      <a
                        href={t.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-2 inline-block font-mono text-[10px] uppercase tracking-[0.18em] text-orange-600 hover:underline"
                      >
                        ↗
                      </a>
                    )}
                  </td>
                  <td className="py-4 pr-4 align-baseline text-sm text-neutral-700">
                    {t.tagline}
                  </td>
                  <td className="hidden py-4 pr-4 align-baseline md:table-cell">
                    <SparkLine
                      data={t.spark}
                      width={88}
                      height={22}
                      accent={t.status === 'released' || t.status === 'beta'}
                      className="opacity-80 transition-opacity group-hover:opacity-100"
                    />
                  </td>
                  <td className="py-4 pr-4 align-baseline font-mono text-xs text-neutral-500">
                    {t.version}
                  </td>
                  <td className="py-4 text-right align-baseline">
                    <StatusPill status={t.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </FadeInStagger>
      </Container>
    </section>
  )
}

function StatusPill({ status }) {
  const map = {
    released: { color: 'text-neutral-700', dot: 'bg-neutral-700' },
    beta: { color: 'text-orange-600', dot: 'bg-orange-600' },
    wip: { color: 'text-neutral-400', dot: 'bg-neutral-400' },
  }
  const s = map[status] ?? map.released
  return (
    <span
      className={`inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.18em] ${s.color}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />
      {status}
    </span>
  )
}

function TheStudio() {
  return (
    <section className="mt-32 sm:mt-40 lg:mt-52">
      <Container>
        <SectionHead
          kicker="The studio"
          title="Built like infrastructure. Operated like a research lab."
          size="lg"
        />

        <div className="mt-16 grid grid-cols-1 gap-x-16 gap-y-12 lg:grid-cols-12">
          <div className="space-y-6 text-lg leading-relaxed text-neutral-700 lg:col-span-7">
            <p>
              GroupLabs is an engineering studio, not an agency. We work
              directly with founders, product leadership, and engineering
              leadership — at most one degree of separation from the people
              who&rsquo;ll live with what we ship.
            </p>
            <p>
              We don&rsquo;t sell hours, decks, or strategy slides. We build
              production systems and write the runbooks that come with them. The
              work goes out under our name and we&rsquo;re available the day
              after we ship.
            </p>
            <p className="text-neutral-500">
              We staff small and senior. Engagements are scoped by phase, quoted
              by phase, and end on a written deliverable. If the fit isn&rsquo;t
              there, we say so on the first call.
            </p>
          </div>

          <div className="space-y-6 lg:col-span-5">
            {/* Studio mark — quiet identity element */}
            <div className="border-neutral-950/15 flex flex-col items-center justify-center border bg-neutral-50 px-6 py-12">
              <StudioMark size={200} className="text-neutral-950" />
              <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-neutral-500">
                Studio mark · est. MMXX
              </p>
            </div>

            <div className="border-neutral-950/15 border bg-neutral-50 p-6 sm:p-8">
              <p className="eyebrow wdth-narrow text-neutral-500">
                Team composition
              </p>
              <pre className="mt-4 whitespace-pre font-mono text-[12px] leading-relaxed text-neutral-700">
                {`Engineers              06
Researchers            02
Founders               02
─────────────────────────
Sectors served         04
Years operating        05
Deploys per year      ~03

Cities  Calgary, Alberta
        Montreal, Quebec`}
              </pre>
            </div>
            <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-neutral-500">
              More at{' '}
              <Link
                href="/about"
                className="text-neutral-950 underline decoration-neutral-300 underline-offset-4 hover:decoration-orange-600"
              >
                /about
              </Link>{' '}
              ·{' '}
              <Link
                href="/process"
                className="text-neutral-950 underline decoration-neutral-300 underline-offset-4 hover:decoration-orange-600"
              >
                /process
              </Link>{' '}
              ·{' '}
              <Link
                href="/blog"
                className="text-neutral-950 underline decoration-neutral-300 underline-offset-4 hover:decoration-orange-600"
              >
                /blog
              </Link>
            </p>
          </div>
        </div>
      </Container>
    </section>
  )
}

function Colophon() {
  return (
    <section className="mt-32 sm:mt-40 lg:mt-52">
      <div className="relative isolate overflow-hidden bg-neutral-950">
        <div
          aria-hidden="true"
          className="grid-paper-dark pointer-events-none absolute inset-0 -z-10 opacity-50 [mask-image:radial-gradient(ellipse_at_bottom,white,transparent_75%)]"
        />

        <Container className="py-24 sm:py-32 lg:py-40">
          <FadeIn>
            <div className="border-white/15 flex items-center gap-4 border-b pb-3">
              <p className="eyebrow text-white/55 wdth-narrow">Address</p>
              <span aria-hidden="true" className="bg-white/15 h-px flex-1" />
              <p className="eyebrow text-white/55 wdth-narrow">
                Calgary, AB · Montreal, QC
              </p>
            </div>
          </FadeIn>

          <div className="mt-12 grid grid-cols-1 gap-x-16 gap-y-12 lg:grid-cols-12 lg:items-start">
            <FadeIn className="lg:col-span-8">
              <a href="mailto:noel@grouplabs.ca" className="group block">
                <p
                  className="tabular font-mono text-[clamp(1.75rem,7vw,5.25rem)] leading-[0.96] tracking-tight text-white
                              transition-colors group-hover:text-orange-500"
                >
                  noel@grouplabs.ca
                </p>
              </a>
            </FadeIn>

            <FadeIn className="lg:col-span-4">
              <ImagePlaceholder
                id="SVG-01"
                aspect="10/7"
                invert
                caption="Calgary · Montreal · Canada"
                prompt="Minimalist line-art outline of Canada (country silhouette only, no province lines), drawn as a single 1px hairline stroke in currentColor so it can be styled. Two small filled dots inside: one at Calgary (~51°N, 114°W — upper-middle of the silhouette, slightly left of center) and one at Montreal (~45°N, 73°W — lower-right). Each dot 4px diameter, in #EA580C (orange-600). Optional thin connecting line between the two dots, dashed (3,3 stroke pattern), at 30% opacity. No labels, no text — the section already labels the cities."
              />
            </FadeIn>
          </div>

          <FadeIn>
            <div className="border-white/15 mt-16 grid grid-cols-1 gap-y-8 border-t pt-8 sm:grid-cols-2 sm:gap-x-12">
              <div>
                <p className="eyebrow text-white/45 wdth-narrow">
                  Calgary, Alberta
                </p>
                <p className="text-white/85 mt-2 font-mono text-sm">
                  +1 (587) 700-9968
                </p>
              </div>
              <div>
                <p className="eyebrow text-white/45 wdth-narrow">
                  Montreal, Quebec
                </p>
                <p className="text-white/85 mt-2 font-mono text-sm">
                  +1 (825) 365-9891
                </p>
              </div>
            </div>
          </FadeIn>
        </Container>
      </div>
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
      <FeaturedWork />
      <Practices />
      <BuildLessSection />
      <Tools />
      <TheStudio />
      <Colophon />
    </>
  )
}
