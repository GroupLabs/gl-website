import { Button } from '@/components/Button'
import { BridgeShowcase } from '@/components/BridgeShowcase'
import { ContactCTA } from '@/components/ContactCTA'
import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { Faqs } from '@/components/Faqs'
import { SectionHead } from '@/components/SectionHead'

const BRIDGE_FOREST = '#14532D'
const BRIDGE_EMERALD = '#10B981'

function CheckIcon({ className, style }) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className={className} style={style}>
      <path
        fillRule="evenodd"
        d="M16.704 5.295a1 1 0 0 1 .001 1.414l-7.5 7.5a1 1 0 0 1-1.415 0l-3.5-3.5a1 1 0 1 1 1.414-1.414L8.5 12.086l6.79-6.79a1 1 0 0 1 1.414 0z"
        clipRule="evenodd"
      />
    </svg>
  )
}

function BridgeBackdrop() {
  // Atmospheric backdrop for the hero. Forest-green spotlight + a faint
  // vertical waveform reading like an oscilloscope or a column-store scan.
  // Distinct from Nudge's dot grid and Tell's horizontal scanlines.
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute -top-24 bottom-0 left-0 right-0 -z-10"
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 55% at 80% 14%, rgba(20,83,45,0.16), transparent 60%), radial-gradient(ellipse 55% 40% at 14% 92%, rgba(16,185,129,0.10), transparent 65%)',
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'repeating-linear-gradient(90deg, rgba(20,83,45,0.10) 0px, rgba(20,83,45,0.10) 1px, transparent 1px, transparent 9px)',
          maskImage:
            'radial-gradient(ellipse at center, black 0%, transparent 78%)',
          WebkitMaskImage:
            'radial-gradient(ellipse at center, black 0%, transparent 78%)',
          opacity: 0.5,
        }}
      />
    </div>
  )
}

function Intro() {
  return (
    <section className="relative isolate">
      <BridgeBackdrop />
      <Container className="pt-24 sm:pt-28 lg:pt-36">
        <FadeIn>
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-b border-neutral-950/15 pb-3 eyebrow text-neutral-500">
            <span className="flex items-center gap-3">
              <span
                className="block h-1.5 w-1.5 rounded-full"
                style={{ background: BRIDGE_FOREST }}
              />
              <span className="text-neutral-950">Bridge</span>
              <span className="opacity-50">/</span>
              <span>A product from GroupLabs</span>
            </span>
            <span>Hybrid search engine</span>
          </div>
        </FadeIn>

        <div className="mt-14 grid grid-cols-1 gap-x-12 gap-y-16 lg:mt-20 lg:grid-cols-12 lg:items-start">
          <FadeIn className="lg:col-span-7">
            <h1 className="font-display text-5xl font-medium leading-[1.04] tracking-tight text-neutral-950 [text-wrap:balance] sm:text-6xl lg:text-[5.25rem] lg:leading-[1.0]">
              Hybrid search,{' '}
              <span style={{ color: BRIDGE_FOREST }}>under a millisecond</span>.
            </h1>

            <p className="mt-8 max-w-xl text-lg leading-relaxed text-neutral-700">
              Bridge runs keyword and vector retrieval in the same query, on the
              same machine, in microseconds. Written close to the metal so you
              don&apos;t pay for a search cluster to find four results.
            </p>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-neutral-700">
              One binary. A small RAM footprint. Sub-millisecond p50. It&apos;s
              what you wish your search bar was.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Button
                href="/contact"
                className="text-white hover:opacity-90"
                style={{ background: BRIDGE_FOREST }}
              >
                Get a benchmark
              </Button>
              <Button href="#how-it-works" variant="outline">
                See how it works →
              </Button>
              <span className="ml-2 inline-flex items-center gap-2 eyebrow text-neutral-500">
                <span
                  className="h-1.5 w-1.5 animate-pulse-dot rounded-full"
                  style={{ background: BRIDGE_EMERALD }}
                />
                v1.4 · in production
              </span>
            </div>
          </FadeIn>

          <FadeIn className="lg:col-span-5 lg:flex lg:justify-end">
            <BridgeShowcase />
          </FadeIn>
        </div>

        {/* mono spec strip */}
        <FadeIn>
          <dl className="mt-20 grid grid-cols-2 gap-y-8 border-y border-neutral-950/15 py-8 sm:grid-cols-4">
            <div>
              <dt className="eyebrow text-neutral-500">p50 latency</dt>
              <dd className="mt-2 font-mono tabular text-2xl font-medium tracking-tight text-neutral-950">
                0.4 ms
              </dd>
            </div>
            <div>
              <dt className="eyebrow text-neutral-500">p99 latency</dt>
              <dd className="mt-2 font-mono tabular text-2xl font-medium tracking-tight text-neutral-950">
                1.1 ms
              </dd>
            </div>
            <div>
              <dt className="eyebrow text-neutral-500">Footprint</dt>
              <dd className="mt-2 font-mono tabular text-base font-medium leading-snug text-neutral-950">
                one static binary
              </dd>
            </div>
            <div>
              <dt className="eyebrow text-neutral-500">Indexes</dt>
              <dd className="mt-2 font-mono tabular text-base font-medium leading-snug text-neutral-950">
                bm25 + hnsw, in-process
              </dd>
            </div>
          </dl>
        </FadeIn>
      </Container>
    </section>
  )
}

function WhenThisMatters() {
  const triggers = [
    {
      label: 'Your search bar is the bottleneck',
      body:
        'Every query hits a remote cluster. Cold caches, queue waits, JSON over the wire. Users feel the spinner before they see a result.',
    },
    {
      label: 'Vector-only retrieval misses obvious matches',
      body:
        "Semantic search nails fuzzy intent and faceplants on exact terms. Users type a SKU or a name. Embeddings shrug. The right item is on page three.",
    },
    {
      label: 'You\'re paying for a cluster to find ten rows',
      body:
        "A managed search service is the third-largest line on the bill. Most queries return small result sets that fit in L2. The cluster is bored.",
    },
    {
      label: 'Latency budget is already spent',
      body:
        'You have a 50ms budget for the whole page. Search took 38. There is nothing left for the rest of the request.',
    },
  ]

  return (
    <section className="mt-32 sm:mt-40 lg:mt-52">
      <Container>
        <SectionHead
          kicker="When this matters"
          title="If search is slow, costly, or only half-right."
          dek="Bridge is for teams whose products live or die on retrieval, and whose latency budget can't spare a network hop."
        />

        <FadeInStagger faster>
          <ol className="mt-16 grid grid-cols-1 gap-y-2 lg:grid-cols-12">
            {triggers.map((t, i) => (
              <FadeIn
                as="li"
                key={t.label}
                className="group col-span-12 grid grid-cols-12 items-baseline gap-x-6 gap-y-3 border-t border-neutral-950/10 py-8 transition-colors hover:border-neutral-950/40 sm:py-10"
              >
                <span
                  className="col-span-2 font-mono tabular text-3xl font-medium tracking-tight text-neutral-500 transition-colors sm:col-span-1 sm:text-4xl"
                  style={{ '--hover-color': BRIDGE_FOREST }}
                >
                  <span className="group-hover:text-[color:var(--hover-color)]">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </span>
                <h3 className="col-span-10 font-display text-xl font-medium tracking-tight text-neutral-950 sm:col-span-5 sm:text-2xl lg:text-3xl">
                  {t.label}
                </h3>
                <p className="col-span-12 text-base leading-relaxed text-neutral-700 sm:col-span-6 sm:text-lg">
                  {t.body}
                </p>
              </FadeIn>
            ))}
          </ol>
        </FadeInStagger>
      </Container>
    </section>
  )
}

function HowItWorks() {
  const steps = [
    {
      title: 'One binary, in your process',
      body:
        'Bridge ships as a static binary or a library you link in. No Java runtime, no node coordinator, no cluster. It runs next to your application.',
    },
    {
      title: 'Two lanes, one query',
      body:
        'Every request fans out to a sparse lane (BM25 over a compressed posting list) and a dense lane (HNSW over your embeddings). Both lanes run in parallel, in the same address space.',
    },
    {
      title: 'Vectorized, zero-copy hot path',
      body:
        'The scanner is written in Rust with SIMD intrinsics. Posting lists, vectors, and result heaps live in arenas that don\'t allocate per query. Cache stays warm.',
    },
    {
      title: 'Reciprocal-rank fusion',
      body:
        'Results from both lanes merge with RRF, so an exact-match SKU and a semantically close phrase land in the same top ten. Tunable, or hand it your own scorer.',
    },
  ]

  return (
    <section id="how-it-works" className="mt-32 sm:mt-40 lg:mt-52">
      <Container>
        <SectionHead
          kicker="How it works"
          title="One process. Two indexes. Microseconds, not milliseconds."
          dek="Bridge keeps the whole query inside one machine, one address space, one cache line where it can."
        />

        <FadeInStagger faster>
          <ol className="mt-16 grid grid-cols-1 gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <FadeIn as="li" key={step.title} className="group">
                <div
                  className="flex items-baseline gap-3 border-b border-neutral-950/15 pb-3 transition-colors group-hover:border-[color:var(--accent)]"
                  style={{ '--accent': BRIDGE_FOREST }}
                >
                  <span
                    className="font-mono tabular text-5xl font-medium tracking-tight text-neutral-950 transition-colors sm:text-6xl group-hover:text-[color:var(--accent)]"
                    style={{ '--accent': BRIDGE_FOREST }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="eyebrow text-neutral-500">Step</span>
                </div>
                <h3 className="mt-6 font-display text-xl font-semibold tracking-tight text-neutral-950">
                  {step.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-neutral-700">
                  {step.body}
                </p>
              </FadeIn>
            ))}
          </ol>
        </FadeInStagger>
      </Container>
    </section>
  )
}

const BENCH_ROWS = [
  { engine: 'Bridge',          p50: 0.4,  p99: 1.1,  ram: '1.2 GB', kind: 'us'    },
  { engine: 'Vector DB · cloud', p50: 18.0, p99: 64.0, ram: '6 nodes', kind: 'them' },
  { engine: 'Search cluster',    p50: 22.0, p99: 90.0, ram: '8 nodes', kind: 'them' },
  { engine: 'Postgres + pgvector', p50: 11.0, p99: 38.0, ram: '4 GB',   kind: 'them' },
]

function BenchmarkPanel() {
  // Reference latency on the same 1.2M document corpus, hybrid query.
  // Bar widths normalise off the slowest p99 so Bridge's bar reads as a sliver.
  const maxP99 = Math.max(...BENCH_ROWS.map((r) => r.p99))
  return (
    <div className="rounded-md border border-neutral-950/15 bg-white">
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-neutral-950/10 px-5 py-3">
        <span className="eyebrow text-neutral-500">
          Hybrid query · 1.2M docs · same hardware
        </span>
        <div className="flex items-baseline gap-5 font-mono tabular text-sm text-neutral-500">
          <span>
            <span className="font-medium text-neutral-950">p50</span> / p99 ms
          </span>
        </div>
      </div>
      <ul role="list">
        {BENCH_ROWS.map((row, i) => {
          const pct = (row.p99 / maxP99) * 100
          const isUs = row.kind === 'us'
          return (
            <li
              key={i}
              className="grid grid-cols-12 items-center gap-x-4 gap-y-1 border-t border-neutral-950/5 px-5 py-3.5 first:border-t-0"
            >
              <div className="col-span-12 sm:col-span-5">
                <p
                  className={`font-mono text-sm ${
                    isUs ? 'font-semibold' : ''
                  }`}
                  style={{ color: isUs ? BRIDGE_FOREST : '#0A0A0A' }}
                >
                  {row.engine}
                </p>
                <p className="mt-0.5 font-mono text-xs text-neutral-500">
                  {row.ram}
                </p>
              </div>
              <div className="col-span-3 font-mono tabular text-sm text-neutral-700 sm:col-span-2">
                {row.p50} / {row.p99}
              </div>
              <div className="col-span-9 flex items-center gap-2 sm:col-span-5">
                <span className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-neutral-100">
                  <span
                    className="absolute inset-y-0 left-0 rounded-full"
                    style={{
                      width: `${pct}%`,
                      background: isUs ? BRIDGE_FOREST : '#D4D4D4',
                    }}
                  />
                </span>
                <span
                  className="w-12 text-right font-mono tabular text-xs font-medium tracking-tight"
                  style={{ color: isUs ? BRIDGE_FOREST : '#737373' }}
                >
                  {row.p99} ms
                </span>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

function WhatYouGet() {
  return (
    <section className="mt-32 sm:mt-40 lg:mt-52">
      <Container>
        <SectionHead
          kicker="What ships"
          title="A small thing that does one job very fast."
          dek="Bridge is shaped like a library, priced like infrastructure, and benchmarked like a database."
        />

        <div className="mt-16 grid grid-cols-1 gap-y-14 lg:grid-cols-12 lg:gap-x-16">
          <FadeIn className="lg:col-span-7">
            <ul className="space-y-2">
              {[
                {
                  n: '01',
                  title: 'A binary you can drop next to your app',
                  body:
                    "Embed it as a library, run it as a sidecar, or call it over a Unix socket. No coordinator, no quorum, no rolling restarts.",
                },
                {
                  n: '02',
                  title: 'Hybrid retrieval that beats either lane alone',
                  body:
                    "BM25 catches the exact terms. HNSW catches the intent. Reciprocal-rank fusion gives you a top-10 that's right on both axes, without picking a side.",
                },
                {
                  n: '03',
                  title: 'Numbers you can put on a status page',
                  body:
                    'Sub-millisecond p50 on a million-doc corpus on commodity hardware. Hot path is allocation-free. RAM cost is a function of your data, not your traffic.',
                },
              ].map((d) => (
                <li
                  key={d.n}
                  className="grid grid-cols-12 items-baseline gap-x-6 gap-y-2 border-t border-neutral-950/10 py-7"
                >
                  <span className="col-span-2 font-mono tabular text-2xl font-medium tracking-tight text-neutral-500 sm:col-span-1 sm:text-3xl">
                    {d.n}
                  </span>
                  <h3 className="col-span-10 font-display text-lg font-semibold tracking-tight text-neutral-950 sm:col-span-5 sm:text-xl">
                    {d.title}
                  </h3>
                  <p className="col-span-12 text-base leading-relaxed text-neutral-700 sm:col-span-6">
                    {d.body}
                  </p>
                  {d.n === '03' && (
                    <div className="col-span-12 mt-4 sm:col-start-2 sm:col-span-11">
                      <BenchmarkPanel />
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </FadeIn>

          <FadeIn className="lg:col-span-5 lg:flex lg:items-start lg:justify-end lg:pt-2">
            <BridgeShowcase />
          </FadeIn>
        </div>
      </Container>
    </section>
  )
}

function WhyBridge() {
  const items = [
    {
      n: '01',
      headline: 'It runs where your code runs.',
      body:
        'No round trip to a search cluster, no JSON serialization tax. Bridge lives in your process, reads from mapped memory, and returns before a network call could even start.',
    },
    {
      n: '02',
      headline: 'It uses both signals at once.',
      body:
        "BM25 and embeddings answer different questions about the same query. Bridge runs them together so a SKU and a vibe both end up on the first page. No re-rank pipeline to glue together.",
    },
  ]

  return (
    <section className="mt-32 sm:mt-40 lg:mt-52">
      <Container>
        <SectionHead
          kicker="Why Bridge"
          title="Most search stacks are too big for the work they do."
          dek="Bridge does the same retrieval in less code, less RAM, and less time, because it's written that way on purpose."
        />

        <FadeInStagger faster>
          <ol className="mt-16 grid grid-cols-1 gap-x-16 gap-y-14 lg:grid-cols-2">
            {items.map((item) => (
              <FadeIn as="li" key={item.n}>
                <p
                  className="font-mono tabular text-xl"
                  style={{ color: BRIDGE_FOREST }}
                >
                  {item.n}
                </p>
                <h3 className="mt-4 font-display text-3xl font-medium tracking-tight text-neutral-950 sm:text-4xl lg:text-5xl">
                  {item.headline}
                </h3>
                <p className="mt-5 max-w-md text-lg leading-relaxed text-neutral-700">
                  {item.body}
                </p>
              </FadeIn>
            ))}
          </ol>
        </FadeInStagger>
      </Container>
    </section>
  )
}

function Differentiation() {
  const items = [
    {
      title: 'Not a vector database',
      body:
        "Vector-only stores collapse on exact-term queries. Bridge keeps a real keyword index alongside the vector one, and fuses them on every query. Neither lane is bolted on.",
    },
    {
      title: 'Not a search cluster',
      body:
        "No coordinators, no shards to rebalance, no JVM heap to tune. Bridge is a process. You scale it the way you scale your app, because it lives there.",
    },
    {
      title: 'Not multi-modal by default',
      body:
        "Text is the hot path. If you bring image or audio embeddings, Bridge will index them in the same dense lane and treat them like any other vector. We don't pretend it's the headline.",
    },
  ]

  return (
    <section className="mt-32 sm:mt-40 lg:mt-52">
      <Container>
        <SectionHead
          kicker="What Bridge isn't"
          title="Three things people assume, and the actual answer."
          dek="The category is crowded with bigger systems. Here's what makes Bridge structurally different."
        />

        <FadeInStagger faster>
          <ol className="mt-16 grid grid-cols-1 gap-x-12 gap-y-14 lg:grid-cols-3">
            {items.map((it, i) => (
              <FadeIn as="li" key={it.title} className="group">
                <div className="flex items-baseline gap-3 border-b border-neutral-950/15 pb-3">
                  <span
                    className="font-mono tabular text-4xl font-medium tracking-tight text-neutral-500 transition-colors group-hover:text-[color:var(--accent)]"
                    style={{ '--accent': BRIDGE_FOREST }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="mt-6 font-display text-xl font-semibold tracking-tight text-neutral-950 sm:text-2xl">
                  {it.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-neutral-700">
                  {it.body}
                </p>
              </FadeIn>
            ))}
          </ol>
        </FadeInStagger>
      </Container>
    </section>
  )
}

function FaqSection() {
  const items = [
    {
      question: 'What language is Bridge written in?',
      answer:
        'Rust on the hot path, with hand-tuned SIMD for vector distance and posting-list scans. The library exposes C, Python, Go, and Node bindings so you can call it from whatever your service is written in.',
    },
    {
      question: 'How do we feed it data?',
      answer:
        'Two write paths. A streaming ingest API for incremental updates, and an offline build for cold starts. Indexes are mmap files. Hot reloads are atomic and don\'t block readers.',
    },
    {
      question: 'Where do embeddings come from?',
      answer:
        'Bring your own. Bridge stores and searches vectors of any dimension. We ship reference adapters for OpenAI, Cohere, and a handful of self-hosted text encoders, but the engine is model-agnostic.',
    },
    {
      question: 'Can it index images or audio?',
      answer:
        'Yes, but it\'s not the headline. If your encoder produces a fixed-dim vector, Bridge will index it in the dense lane and search it the same way. Multi-modal is supported, not assumed.',
    },
    {
      question: 'How big does it scale?',
      answer:
        'A single Bridge process handles tens of millions of documents on a normal box. Above that, run multiple shards behind a thin router. There is no orchestration layer to operate.',
    },
    {
      question: 'Is it open source?',
      answer:
        'The core engine is. The managed build (replication, snapshots, observability, hosted control plane) is the commercial product.',
    },
  ]

  return (
    <section className="mt-32 sm:mt-40 lg:mt-52">
      <Container>
        <SectionHead kicker="Common questions" title="What teams ask before they wire it in." />
        <Faqs items={items} className="mt-12" />
      </Container>
    </section>
  )
}

function Pricing() {
  const plans = [
    {
      name: 'Core',
      price: 'Free · MIT',
      priceNote: 'The engine, on your hardware',
      description:
        'The Bridge library and CLI. Everything you need to embed hybrid search in your product. Self-hosted, no telemetry, no rate limits.',
      features: [
        'Rust + C / Python / Go / Node bindings',
        'BM25 + HNSW with RRF fusion',
        'mmap indexes, streaming ingest',
        'Community support',
      ],
      cta: 'Read the docs',
    },
    {
      name: 'Managed',
      price: 'From $299/mo',
      priceNote: 'For shipping product teams',
      description:
        'A hosted Bridge cluster with replication, snapshots, and a control plane. Usage-based on indexed documents, not queries.',
      features: [
        'Multi-node replication and failover',
        'Point-in-time snapshots and rebuilds',
        'Latency and recall dashboards',
        'SOC2-ready data handling',
        'Email + Slack support',
      ],
      cta: 'Talk to us',
      featured: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      priceNote: 'Single-tenant deployment',
      description:
        'Self-hosted in your VPC, on-prem, or air-gapped. For regulated environments and high-volume products that need a human on call.',
      features: [
        'VPC, on-prem, or air-gapped install',
        'Custom retention and audit',
        'SSO, SAML, SCIM',
        'Dedicated solutions engineer',
        'Procurement-friendly contracts',
      ],
      cta: 'Get in touch',
    },
  ]

  return (
    <section id="pricing" className="mt-32 sm:mt-40 lg:mt-52">
      <Container>
        <SectionHead
          kicker="Pricing"
          title="Free to embed. Paid when you want someone else to run it."
          dek="The library is open. The managed product is what you reach for the day pager duty starts to matter."
        />

        <FadeInStagger faster>
          <ul
            role="list"
            className="mt-16 grid grid-cols-1 items-stretch gap-x-0 gap-y-10 border-t border-neutral-950/15 lg:grid-cols-3 lg:divide-x lg:divide-neutral-950/15"
          >
            {plans.map((plan, i) => (
              <FadeIn
                as="li"
                key={plan.name}
                className={`relative flex flex-col px-0 pt-10 lg:px-10 ${
                  plan.featured ? 'text-white lg:-my-px' : ''
                }`}
                style={
                  plan.featured
                    ? { background: '#0A0A0A' }
                    : undefined
                }
              >
                {plan.featured && (
                  <span
                    className="absolute -top-3 left-10 inline-block px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.18em] font-semibold text-white"
                    style={{ background: BRIDGE_FOREST }}
                  >
                    Recommended
                  </span>
                )}

                <p
                  className={`eyebrow ${
                    plan.featured ? 'text-white/55' : 'text-neutral-500'
                  }`}
                >
                  Plan {String(i + 1).padStart(2, '0')}
                </p>
                <h3
                  className={`mt-3 font-display text-2xl font-medium tracking-tight sm:text-3xl ${
                    plan.featured ? 'text-white' : 'text-neutral-950'
                  }`}
                >
                  {plan.name}
                </h3>
                <p
                  className={`mt-6 font-mono tabular text-3xl font-medium tracking-tight sm:text-4xl ${
                    plan.featured ? 'text-white' : 'text-neutral-950'
                  }`}
                >
                  {plan.price}
                </p>
                <p
                  className={`mt-1 text-sm ${
                    plan.featured ? 'text-white/55' : 'text-neutral-500'
                  }`}
                >
                  {plan.priceNote}
                </p>
                <p
                  className={`mt-6 text-base leading-relaxed ${
                    plan.featured ? 'text-white/75' : 'text-neutral-700'
                  }`}
                >
                  {plan.description}
                </p>

                <ul
                  role="list"
                  className={`mt-8 space-y-3 text-sm leading-relaxed ${
                    plan.featured ? 'text-white/80' : 'text-neutral-700'
                  }`}
                >
                  {plan.features.map((f) => (
                    <li key={f} className="flex gap-x-3">
                      <CheckIcon
                        className="mt-1 h-3.5 w-3.5 flex-shrink-0"
                        style={{ color: plan.featured ? BRIDGE_EMERALD : BRIDGE_FOREST }}
                      />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <div
                  className={`mt-12 flex flex-auto items-end ${
                    plan.featured ? 'pb-10' : 'pb-2'
                  }`}
                >
                  <Button
                    href="/contact"
                    className={
                      plan.featured
                        ? 'text-white hover:opacity-90'
                        : undefined
                    }
                    variant={plan.featured ? 'solid' : 'outline'}
                    style={
                      plan.featured ? { background: BRIDGE_FOREST } : undefined
                    }
                  >
                    {plan.cta}
                    <span aria-hidden="true" className="ml-1.5">
                      →
                    </span>
                  </Button>
                </div>
              </FadeIn>
            ))}
          </ul>
        </FadeInStagger>
      </Container>
    </section>
  )
}

export const metadata = {
  title: 'Bridge · Sub-millisecond hybrid search',
  description:
    'Bridge runs keyword and vector retrieval together, in one process, in microseconds. Written close to the metal so you don\'t pay for a cluster to find ten rows.',
  alternates: { canonical: '/bridge' },
}

export default function BridgePage() {
  return (
    <>
      <Intro />
      <WhenThisMatters />
      <HowItWorks />
      <WhatYouGet />
      <WhyBridge />
      <Differentiation />
      <FaqSection />
      <Pricing />

      <ContactCTA />
    </>
  )
}
