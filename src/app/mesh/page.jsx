import { Button } from '@/components/Button'
import { ContactCTA } from '@/components/ContactCTA'
import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { Faqs } from '@/components/Faqs'
import { MeshShowcase } from '@/components/MeshShowcase'
import { SectionHead } from '@/components/SectionHead'

const MESH_RED = '#EF4444'

function CheckIcon({ className, style }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
      className={className}
      style={style}
    >
      <path
        fillRule="evenodd"
        d="M16.704 5.295a1 1 0 0 1 .001 1.414l-7.5 7.5a1 1 0 0 1-1.415 0l-3.5-3.5a1 1 0 1 1 1.414-1.414L8.5 12.086l6.79-6.79a1 1 0 0 1 1.414 0z"
        clipRule="evenodd"
      />
    </svg>
  )
}

function MeshBackdrop() {
  // Atmospheric backdrop. Crossed diagonal hatch reads as woven fabric — a
  // mesh — and is distinct from Nudge's dots, Tell's scanlines, and Atmos's
  // isobars. Two faint red spotlights anchor the corners. Extends above the
  // section so the gradient runs behind the page wrapper's pt-14 + pt-9.
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute -top-24 bottom-0 left-0 right-0 -z-10"
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 55% at 80% 14%, rgba(239,68,68,0.13), transparent 60%), radial-gradient(ellipse 60% 45% at 12% 92%, rgba(239,68,68,0.08), transparent 65%)',
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'repeating-linear-gradient(45deg, rgba(239,68,68,0.10) 0 1px, transparent 1px 22px), repeating-linear-gradient(-45deg, rgba(239,68,68,0.10) 0 1px, transparent 1px 22px)',
          maskImage:
            'radial-gradient(ellipse at center, black 0%, transparent 78%)',
          WebkitMaskImage:
            'radial-gradient(ellipse at center, black 0%, transparent 78%)',
          opacity: 0.55,
        }}
      />
    </div>
  )
}

function Intro() {
  return (
    <section className="relative isolate">
      <MeshBackdrop />
      <Container className="pt-24 sm:pt-28 lg:pt-36">
        <FadeIn>
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-b border-neutral-950/15 pb-3 eyebrow text-neutral-500">
            <span className="flex items-center gap-3">
              <span
                className="block h-1.5 w-1.5 rounded-full"
                style={{ background: MESH_RED }}
              />
              <span className="text-neutral-950">Mesh</span>
              <span className="opacity-50">/</span>
              <span>A product from GroupLabs</span>
            </span>
            <span>Self-arranging compute fabric</span>
          </div>
        </FadeIn>

        <div className="mt-14 grid grid-cols-1 gap-x-12 gap-y-16 lg:mt-20 lg:grid-cols-12 lg:items-start">
          <FadeIn className="lg:col-span-7">
            <h1 className="font-display text-5xl font-medium leading-[1.04] tracking-tight text-neutral-950 [text-wrap:balance] sm:text-6xl lg:text-[5.25rem] lg:leading-[1.0]">
              Compute that{' '}
              <span style={{ color: MESH_RED }}>arranges itself</span>.
            </h1>

            <p className="mt-8 max-w-xl text-lg leading-relaxed text-neutral-700">
              Mesh is a low-level fabric for distributed batch work. Nodes
              find each other on their own, form a topology, and run jobs
              partitioned by a scheduler that knows what each device is.
            </p>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-neutral-700">
              Drop a binary on every box. No control plane. No SRE on call.
              Today it runs ML batch training. The runtime is the same shape
              for any data-parallel batch job.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Button
                href="/contact"
                className="text-white hover:opacity-90"
                style={{ background: MESH_RED }}
              >
                Talk to us
              </Button>
              <Button href="#how-it-works" variant="outline">
                See how it works →
              </Button>
              <span className="ml-2 inline-flex items-center gap-2 eyebrow text-neutral-500">
                <span
                  className="h-1.5 w-1.5 animate-pulse-dot rounded-full"
                  style={{ background: MESH_RED }}
                />
                v0.2 · in development
              </span>
            </div>
          </FadeIn>

          <FadeIn className="lg:col-span-5 lg:flex lg:justify-end">
            <MeshShowcase />
          </FadeIn>
        </div>

        {/* mono spec strip */}
        <FadeIn>
          <dl className="mt-20 grid grid-cols-2 gap-y-8 border-y border-neutral-950/15 py-8 sm:grid-cols-4">
            <div>
              <dt className="eyebrow text-neutral-500">Topology</dt>
              <dd className="mt-2 font-mono tabular text-base font-medium leading-snug text-neutral-950">
                self-arranging
              </dd>
            </div>
            <div>
              <dt className="eyebrow text-neutral-500">Discovery</dt>
              <dd className="mt-2 font-mono tabular text-base font-medium leading-snug text-neutral-950">
                built-in
              </dd>
            </div>
            <div>
              <dt className="eyebrow text-neutral-500">Devices</dt>
              <dd className="mt-2 font-mono tabular text-base font-medium leading-snug text-neutral-950">
                heterogeneous
              </dd>
            </div>
            <div>
              <dt className="eyebrow text-neutral-500">Runtime</dt>
              <dd className="mt-2 font-mono tabular text-base font-medium leading-snug text-neutral-950">
                custom · no JVM
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
      label: 'Your fleet is mixed',
      body:
        "A100s next to L4s next to 32-core CPUs. The scheduler you have today treats them all the same and routes the wrong work to the wrong silicon.",
    },
    {
      label: 'Bringing up a node is a project',
      body:
        'Manifest edits, manual cluster join, restarts, paged SREs. By the time the box is in service, the workload that needed it has finished.',
    },
    {
      label: 'The control plane is heavier than the workload',
      body:
        'Kubernetes, etcd, a service mesh, and a CNI plugin. For a batch job that runs once a day on six machines.',
    },
    {
      label: 'You want to run on whatever you have',
      body:
        'Old GPUs in a closet, a handful of cloud instances, a dev box. Mesh treats whatever is reachable as fabric and partitions by capability.',
    },
  ]

  return (
    <section className="mt-32 sm:mt-40 lg:mt-52">
      <Container>
        <SectionHead
          kicker="When this matters"
          title="If your hardware is uneven and your scheduler can't tell."
          dek="Mesh is for teams running batch work across machines that were never meant to be a cluster."
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
                  style={{ '--hover-color': MESH_RED }}
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
      title: 'Drop the binary',
      body:
        'One static binary on each node. No supervisor, no agent, no runtime to install. The binary is the cluster.',
    },
    {
      title: 'Nodes find each other',
      body:
        'Discovery runs on its own. Peers gossip capability info — device class, memory, free cycles. New nodes show up by joining the gossip.',
    },
    {
      title: 'The topology self-arranges',
      body:
        'The fabric forms without a coordinator. Nodes drop, the topology adjusts. Nothing pages anyone.',
    },
    {
      title: 'Scheduler partitions by device',
      body:
        'Jobs arrive, the scheduler reads per-node capability and shards accordingly. GPUs get the heavy work. CPUs get the parts that suit them.',
    },
  ]

  return (
    <section id="how-it-works" className="mt-32 sm:mt-40 lg:mt-52">
      <Container>
        <SectionHead
          kicker="How it works"
          title="From a binary on each box to a job split across them."
          dek="Mesh is four moving parts. Discovery, gossip, topology, and a device-aware scheduler. Everything else is your workload."
        />

        <FadeInStagger faster>
          <ol className="mt-16 grid grid-cols-1 gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <FadeIn as="li" key={step.title} className="group">
                <div
                  className="flex items-baseline gap-3 border-b border-neutral-950/15 pb-3 transition-colors group-hover:border-[color:var(--accent)]"
                  style={{ '--accent': MESH_RED }}
                >
                  <span
                    className="font-mono tabular text-5xl font-medium tracking-tight text-neutral-950 transition-colors sm:text-6xl group-hover:text-[color:var(--accent)]"
                    style={{ '--accent': MESH_RED }}
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

const TRACE_ROWS = [
  {
    t: 'T+0.000',
    kind: 'event',
    msg: 'peer-7 joined · GPU · L40 · 48GB',
    note: 'fabric size 6 → 7',
  },
  {
    t: 'T+0.412',
    kind: 'event',
    msg: 'job accepted · ResNet-50 · 4 shards',
    note: null,
  },
  {
    t: 'T+0.503',
    kind: 'route',
    msg: 'shard-0 → n0 · A100',
    note: 'score 0.96',
  },
  {
    t: 'T+0.511',
    kind: 'route',
    msg: 'shard-1 → n1 · H100',
    note: 'score 0.99',
  },
  {
    t: 'T+0.518',
    kind: 'route',
    msg: 'shard-2 → n3 · L4',
    note: 'score 0.84',
  },
  {
    t: 'T+0.524',
    kind: 'route',
    msg: 'shard-3 → n6 · L40',
    note: 'score 0.92',
  },
  {
    t: 'T+0.530',
    kind: 'idle',
    msg: 'n2, n4 → idle',
    note: 'cpu class · model FLOPs',
  },
]

function SchedulerTrace() {
  return (
    <div className="rounded-md border border-neutral-950/15 bg-white">
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-neutral-950/10 px-5 py-3">
        <span className="eyebrow text-neutral-500">Scheduler trace · last job</span>
        <span className="font-mono tabular text-sm text-neutral-500">
          <span className="font-medium text-neutral-950">7</span> nodes ·{' '}
          <span className="font-medium text-neutral-950">4</span> shards
        </span>
      </div>
      <ul role="list" className="font-mono">
        {TRACE_ROWS.map((row, i) => (
          <li
            key={i}
            className="grid grid-cols-12 items-baseline gap-x-3 border-t border-neutral-950/5 px-5 py-2 first:border-t-0"
          >
            <span className="col-span-3 text-[11px] tabular text-neutral-500 sm:col-span-2">
              {row.t}
            </span>
            <span
              className="col-span-2 text-[10px] uppercase tracking-[0.16em]"
              style={{
                color:
                  row.kind === 'route'
                    ? MESH_RED
                    : row.kind === 'idle'
                      ? '#737373'
                      : '#0a0a0a',
              }}
            >
              {row.kind}
            </span>
            <span className="col-span-7 text-[12px] text-neutral-950 sm:col-span-5">
              {row.msg}
            </span>
            {row.note && (
              <span className="col-span-12 text-[10px] text-neutral-500 sm:col-span-3 sm:text-right">
                {row.note}
              </span>
            )}
          </li>
        ))}
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
          title="A fabric, a scheduler, and a runtime that knows the silicon."
          dek="Three things drop into place the day Mesh goes live on your fleet."
        />

        <div className="mt-16 grid grid-cols-1 gap-y-14 lg:grid-cols-12 lg:gap-x-16">
          <FadeIn className="lg:col-span-7">
            <ul className="space-y-2">
              {[
                {
                  n: '01',
                  title: 'Discovery without manual config',
                  body:
                    "New nodes join the gossip and the fabric absorbs them. No DNS records, no static membership lists, no rolling restart of a control plane.",
                },
                {
                  n: '02',
                  title: 'Scheduling that reads the device',
                  body:
                    'Per-node capability — device class, memory, current load — is gossiped continuously. The scheduler scores each candidate before it routes a shard.',
                },
                {
                  n: '03',
                  title: 'A custom runtime, no Python tax',
                  body:
                    'No JVM, no kubelet sidecar, no language-tied executor. The runtime is purpose-built for partition / dispatch / reduce, and ML training is the first plugin on top.',
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
                  {d.n === '02' && (
                    <div className="col-span-12 mt-4 sm:col-start-2 sm:col-span-11">
                      <SchedulerTrace />
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </FadeIn>

          <FadeIn className="lg:col-span-5 lg:flex lg:items-start lg:justify-end lg:pt-2">
            <MeshShowcase />
          </FadeIn>
        </div>
      </Container>
    </section>
  )
}

function WhyMesh() {
  const items = [
    {
      n: '01',
      headline: 'Built for the fleet you actually have.',
      body:
        'Most schedulers assume identical workers. Mesh assumes the opposite. Heterogeneous is the default, and the scheduler is written for that case from the start.',
    },
    {
      n: '02',
      headline: 'No control plane to babysit.',
      body:
        "There is no head node. There is no etcd. The fabric is the cluster, and the cluster is what's running. When a node leaves, the topology adjusts. Nothing pages anyone.",
    },
  ]

  return (
    <section className="mt-32 sm:mt-40 lg:mt-52">
      <Container>
        <SectionHead
          kicker="Why Mesh"
          title="Most schedulers assume your fleet is identical. Most fleets aren't."
          dek="Mesh is built around the case where every box is different — and where there is no team to run a control plane for it."
        />

        <FadeInStagger faster>
          <ol className="mt-16 grid grid-cols-1 gap-x-16 gap-y-14 lg:grid-cols-2">
            {items.map((item) => (
              <FadeIn as="li" key={item.n}>
                <p
                  className="font-mono tabular text-xl"
                  style={{ color: MESH_RED }}
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
      title: 'Not Kubernetes',
      body:
        "No cluster bootstrap. No kubelet. No YAML to roll out a job. Mesh is a binary and a scheduler, not a platform. If you needed K8s, you'd already have it.",
    },
    {
      title: 'Not Ray',
      body:
        "Ray is a Python-native task framework with a head node. Mesh is lower-level: a fabric and a scheduler, not a programming model. ML training sits on top as a plugin.",
    },
    {
      title: 'Not Slurm',
      body:
        'Slurm assumes a static partition and a shared filesystem. Mesh assumes neither. Nodes come and go on their own, and the scheduler is built for mixed silicon.',
    },
  ]

  return (
    <section className="mt-32 sm:mt-40 lg:mt-52">
      <Container>
        <SectionHead
          kicker="What Mesh isn't"
          title="Three things people assume — and the actual answer."
          dek="The category is crowded. Here's how Mesh sits relative to the things it gets compared to."
        />

        <FadeInStagger faster>
          <ol className="mt-16 grid grid-cols-1 gap-x-12 gap-y-14 lg:grid-cols-3">
            {items.map((it, i) => (
              <FadeIn as="li" key={it.title} className="group">
                <div className="flex items-baseline gap-3 border-b border-neutral-950/15 pb-3">
                  <span
                    className="font-mono tabular text-4xl font-medium tracking-tight text-neutral-500 transition-colors group-hover:text-[color:var(--accent)]"
                    style={{ '--accent': MESH_RED }}
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
      question: 'What workloads does it run today?',
      answer:
        'ML batch training. Data-parallel training across heterogeneous GPUs is the live workload, with shard sizing handled by the device-aware scheduler. The runtime is workload-agnostic; training is the first plugin on top.',
    },
    {
      question: 'Can we run other things on it?',
      answer:
        'Yes, anything batch-shaped that fits the partition / dispatch / reduce pattern. Inference batches, simulation sweeps, large feature pipelines. The runtime is the same; only the plugin on top changes.',
    },
    {
      question: 'How do nodes discover each other?',
      answer:
        'Mesh ships with a peer-gossip discovery layer. On a flat L2 network, that is all you need. On segmented networks, you point new nodes at any existing peer and the rest happens on its own.',
    },
    {
      question: 'Is there a head node or a control plane?',
      answer:
        'No. The fabric is the scheduler. Coordination is gossip, consensus is local, and jobs run wherever they fit. There is no etcd to lose, no head to fail over.',
    },
    {
      question: 'When can we use it?',
      answer:
        'v0.2 is in development. We are piloting with a small number of teams running heterogeneous training. If that sounds like you, get in touch and we will scope a deployment together.',
    },
  ]

  return (
    <section className="mt-32 sm:mt-40 lg:mt-52">
      <Container>
        <SectionHead kicker="Common questions" title="What teams ask before they install." />
        <Faqs items={items} className="mt-12" />
      </Container>
    </section>
  )
}

function Pricing() {
  const plans = [
    {
      name: 'Pilot',
      price: 'Co-built',
      priceNote: 'No cost during v0',
      description:
        'We deploy Mesh on your fleet alongside your team. Direct line to the engineers building it, and pricing locked in at v1 release.',
      features: [
        'Up to one fleet, any size',
        'Co-built deployment and integration',
        'Direct line to the engineering team',
        'Locked-in v1 pricing',
      ],
      cta: 'Apply for pilot',
    },
    {
      name: 'Cluster',
      price: 'From $1,500/mo',
      priceNote: 'For production fleets',
      description:
        'Production install across your fleet. Fixed monthly fee sized to node count, no per-job billing, no per-GPU surcharges.',
      features: [
        'Unlimited jobs and shards',
        'Heterogeneous device support',
        'Scheduler trace and audit log',
        'SOC2-ready data handling',
        'Email + Slack support',
      ],
      cta: 'Talk to us',
      featured: true,
    },
    {
      name: 'Custom',
      price: 'Custom',
      priceNote: 'Self-hosted, integrated',
      description:
        'Self-hosted deployment, custom plugins, deep integration with your job submission and observability stack. For regulated environments and large fleets.',
      features: [
        'Self-hosted or air-gapped',
        'Custom plugins and runtime hooks',
        'SSO, SAML, audit retention',
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
          title="Pay for the fleet, not the workload."
          dek="Mesh is sized to nodes, not jobs. The more you put through the fabric, the cheaper each job becomes."
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
                  plan.featured ? { background: '#0A0A0A' } : undefined
                }
              >
                {plan.featured && (
                  <span
                    className="absolute -top-3 left-10 inline-block px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.18em] font-semibold text-white"
                    style={{ background: MESH_RED }}
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
                        style={{ color: MESH_RED }}
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
                      plan.featured ? 'text-white hover:opacity-90' : undefined
                    }
                    variant={plan.featured ? 'solid' : 'outline'}
                    style={
                      plan.featured ? { background: MESH_RED } : undefined
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
  title: 'Mesh — Self-arranging compute fabric for heterogeneous fleets',
  description:
    'Mesh is a low-level fabric for distributed batch work. Nodes self-discover, the topology forms on its own, and a device-aware scheduler partitions jobs across heterogeneous hardware. Currently runs ML batch training.',
  alternates: { canonical: '/mesh' },
}

export default function MeshPage() {
  return (
    <>
      <Intro />
      <WhenThisMatters />
      <HowItWorks />
      <WhatYouGet />
      <WhyMesh />
      <Differentiation />
      <FaqSection />
      <Pricing />

      <ContactCTA />
    </>
  )
}
