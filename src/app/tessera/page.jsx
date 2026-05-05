import { Button } from '@/components/Button'
import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { Faqs } from '@/components/Faqs'
import { SectionHead } from '@/components/SectionHead'
import { TesseraShowcase } from '@/components/TesseraShowcase'

const TESSERA_INDIGO = '#4338CA'
const TESSERA_VIOLET = '#818CF8'

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

function TesseraBackdrop() {
  // Atmospheric backdrop: indigo spotlight + tile lattice.
  // The lattice echoes Tessera's icon (four squares, one tilted) and reads
  // as a kernel/page grid, distinct from Nudge's dot field and Tell's scanlines.
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute -top-24 bottom-0 left-0 right-0 -z-10"
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 55% at 78% 14%, rgba(67,56,202,0.16), transparent 60%), radial-gradient(ellipse 55% 40% at 14% 90%, rgba(129,140,248,0.10), transparent 65%)',
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(67,56,202,0.10) 1px, transparent 1px), linear-gradient(to bottom, rgba(67,56,202,0.10) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          maskImage:
            'radial-gradient(ellipse at center, black 0%, transparent 80%)',
          WebkitMaskImage:
            'radial-gradient(ellipse at center, black 0%, transparent 80%)',
          opacity: 0.55,
        }}
      />
    </div>
  )
}

function Intro() {
  return (
    <section className="relative isolate">
      <TesseraBackdrop />
      <Container className="pt-24 sm:pt-28 lg:pt-36">
        <FadeIn>
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-b border-neutral-950/15 pb-3 eyebrow text-neutral-500">
            <span className="flex items-center gap-3">
              <span
                className="block h-1.5 w-1.5 rounded-full"
                style={{ background: TESSERA_INDIGO }}
              />
              <span className="text-neutral-950">Tessera</span>
              <span className="opacity-50">/</span>
              <span>A product from GroupLabs</span>
            </span>
            <span>Unikernel manager</span>
          </div>
        </FadeIn>

        <div className="mt-14 grid grid-cols-1 gap-x-12 gap-y-16 lg:mt-20 lg:grid-cols-12 lg:items-start">
          <FadeIn className="lg:col-span-7">
            <h1 className="font-display text-5xl font-medium leading-[1.04] tracking-tight text-neutral-950 [text-wrap:balance] sm:text-6xl lg:text-[5.25rem] lg:leading-[1.0]">
              Every workload, its{' '}
              <span style={{ color: TESSERA_INDIGO }}>own kernel</span>.{' '}
              Nothing else.
            </h1>

            <p className="mt-8 max-w-xl text-lg leading-relaxed text-neutral-700">
              Tessera is a unikernel manager. Each function ships as a single-purpose
              VM (your code and a minimal kernel fused into one image) and runs in
              its own address space, on the hypervisor, with no operating system
              underneath it.
            </p>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-neutral-700">
              No syscall boundary. No context switches. No shell, no init, no
              package manager. Nothing but the bytes the workload needs to run.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Button
                href="/contact"
                className="text-white hover:opacity-90"
                style={{ background: TESSERA_INDIGO }}
              >
                Get early access
              </Button>
              <Button href="#how-it-works" variant="outline">
                See how it works →
              </Button>
              <span className="ml-2 inline-flex items-center gap-2 eyebrow text-neutral-500">
                <span
                  className="h-1.5 w-1.5 animate-pulse-dot rounded-full"
                  style={{ background: TESSERA_VIOLET }}
                />
                Closed beta · v0.8
              </span>
            </div>
          </FadeIn>

          <FadeIn className="lg:col-span-5 lg:flex lg:justify-end">
            <TesseraShowcase />
          </FadeIn>
        </div>

        {/* mono spec strip: the runtime numbers */}
        <FadeIn>
          <dl className="mt-20 grid grid-cols-2 gap-y-8 border-y border-neutral-950/15 py-8 sm:grid-cols-4">
            <div>
              <dt className="eyebrow text-neutral-500">Cold boot p50</dt>
              <dd className="mt-2 font-mono tabular text-2xl font-medium tracking-tight text-neutral-950">
                1.2 ms
              </dd>
            </div>
            <div>
              <dt className="eyebrow text-neutral-500">Image size</dt>
              <dd className="mt-2 font-mono tabular text-2xl font-medium tracking-tight text-neutral-950">
                ~2 MB
              </dd>
            </div>
            <div>
              <dt className="eyebrow text-neutral-500">Context switches</dt>
              <dd className="mt-2 font-mono tabular text-2xl font-medium tracking-tight text-neutral-950">
                0
              </dd>
            </div>
            <div>
              <dt className="eyebrow text-neutral-500">Address spaces</dt>
              <dd className="mt-2 font-mono tabular text-base font-medium leading-snug text-neutral-950">
                one per workload
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
      label: 'You run code you did not write',
      body:
        "LLM-generated functions. Customer plugins. Agents that arrive with their own deps. A shared kernel under all of it is one kernel bug away from a multi-tenant breach.",
    },
    {
      label: 'Cold starts tax every request',
      body:
        'A container takes hundreds of milliseconds to come up: pull, unpack, init, network. By the time it answers, the user has retried. The fleet is paying for warmth nobody is using.',
    },
    {
      label: 'Your runtime ships with a userland it does not need',
      body:
        'Your function does one thing. The image carries a shell, a libc, a package manager, an init system, and a kernel built for a laptop. Every byte is attack surface someone signed for.',
    },
    {
      label: 'Compliance keeps asking what is on the box',
      body:
        'A regulator wants the SBOM. The team wants the patch list. The container has 412 packages, and 38 of them have CVEs nobody has gotten to yet. The audit is overdue.',
    },
  ]

  return (
    <section className="mt-32 sm:mt-40 lg:mt-52">
      <Container>
        <SectionHead
          kicker="When this matters"
          title="If your workloads share a kernel, they are sharing more than that."
          dek="Tessera is for teams running untrusted, ephemeral, or multi-tenant code, and for anyone who has read the cold-start line on a P95 chart and wished it were different."
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
                  style={{ '--hover-color': TESSERA_INDIGO }}
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
      title: 'Pack the workload',
      body:
        'Your function compiles into a unikernel image: your code, a minimal libos, and the device drivers it actually needs. No shell, no init, no userland. The image is tens of kilobytes to a few megabytes.',
    },
    {
      title: 'Boot on the hypervisor',
      body:
        'Tessera schedules each unikernel directly on the hypervisor. There is no host OS in the path. Boot is microseconds-to-low-milliseconds, because there is almost nothing to boot.',
    },
    {
      title: 'Run in one address space',
      body:
        'Inside the VM, kernel and application share an address space. There is no syscall boundary, no user/kernel context switch. Function calls all the way down. Faster, smaller, fewer corners for an attacker.',
    },
    {
      title: 'Snapshot, fork, retire',
      body:
        'Warm pools serve cold paths. Tessera forks new instances from a hot snapshot in microseconds, runs them, and reaps them when idle. Pages zeroed, image gone, no residue between tenants.',
    },
  ]

  return (
    <section id="how-it-works" className="mt-32 sm:mt-40 lg:mt-52">
      <Container>
        <SectionHead
          kicker="How it works"
          title="A unikernel per workload, scheduled like containers, isolated like VMs."
          dek="Tessera takes the isolation guarantee of a hypervisor and the ergonomics of a function runtime, without the operating system that usually sits between them."
        />

        <FadeInStagger faster>
          <ol className="mt-16 grid grid-cols-1 gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <FadeIn as="li" key={step.title} className="group">
                <div
                  className="flex items-baseline gap-3 border-b border-neutral-950/15 pb-3 transition-colors group-hover:border-[color:var(--accent)]"
                  style={{ '--accent': TESSERA_INDIGO }}
                >
                  <span
                    className="font-mono tabular text-5xl font-medium tracking-tight text-neutral-950 transition-colors sm:text-6xl group-hover:text-[color:var(--accent)]"
                    style={{ '--accent': TESSERA_INDIGO }}
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

const FLEET_ROWS = [
  {
    name: 'auth-jwt',
    image: 'unik:0x4a · 1.8 MB',
    boot: '0.9 ms',
    note: 'forked from hot pool',
    pct: 18,
  },
  {
    name: 'img-thumb',
    image: 'unik:0x91 · 2.4 MB',
    boot: '1.1 ms',
    note: null,
    pct: 41,
  },
  {
    name: 'py-sandbox',
    image: 'unik:0xc7 · 4.2 MB',
    boot: '1.7 ms',
    note: 'untrusted code · isolated VM',
    pct: 62,
  },
  {
    name: 'pdf-extract',
    image: 'unik:0x6e · 5.6 MB',
    boot: '2.0 ms',
    note: null,
    pct: 78,
  },
]

function TesseraFleetPanel() {
  return (
    <div className="rounded-md border border-neutral-950/15 bg-white">
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-neutral-950/10 px-5 py-3">
        <span className="eyebrow text-neutral-500">
          Fleet · last 60 seconds
        </span>
        <div className="flex items-baseline gap-5 font-mono tabular text-sm text-neutral-500">
          <span>
            <span className="font-medium text-neutral-950">2,184</span> VMs
          </span>
          <span>
            <span className="font-medium text-neutral-950">0</span> ctx switches
          </span>
          <span>
            <span className="font-medium text-neutral-950">1.4 ms</span> boot p50
          </span>
        </div>
      </div>
      <ul role="list">
        {FLEET_ROWS.map((row, i) => (
          <li
            key={i}
            className="grid grid-cols-12 items-center gap-x-4 gap-y-1 border-t border-neutral-950/5 px-5 py-3.5 first:border-t-0"
          >
            <div className="col-span-12 sm:col-span-6">
              <p className="font-mono text-sm text-neutral-950">
                {row.name}
              </p>
              {row.note && (
                <p
                  className="mt-1 font-mono text-xs"
                  style={{ color: TESSERA_INDIGO }}
                >
                  ↳ {row.note}
                </p>
              )}
            </div>
            <div className="col-span-7 font-mono tabular text-xs text-neutral-700 sm:col-span-3">
              {row.image}
            </div>
            <div className="col-span-2 text-right font-mono tabular text-xs text-neutral-700 sm:col-span-1">
              {row.boot}
            </div>
            <div className="col-span-3 flex items-center gap-2 sm:col-span-2">
              <span className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-neutral-100">
                <span
                  className="absolute inset-y-0 left-0 rounded-full"
                  style={{
                    width: `${row.pct}%`,
                    background: row.note
                      ? TESSERA_VIOLET
                      : TESSERA_INDIGO,
                    opacity: row.note ? 1 : 0.85,
                  }}
                />
              </span>
            </div>
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
          title="Smaller surface. Faster boots. Hard isolation by construction."
          dek="Three things drop into place the day Tessera takes over the runtime."
        />

        <div className="mt-16 grid grid-cols-1 gap-y-14 lg:grid-cols-12 lg:gap-x-16">
          <FadeIn className="lg:col-span-7">
            <ul className="space-y-2">
              {[
                {
                  n: '01',
                  title: 'A runtime with no operating system underneath',
                  body:
                    "Each workload is its own kernel: the smallest one that runs your code. No shared libc to exploit, no host kernel to escape into, no neighbour with a noisy sidecar. The blast radius is one VM.",
                },
                {
                  n: '02',
                  title: 'Cold starts measured in milliseconds',
                  body:
                    'Single address space, no userland to bring up, fork from a warm snapshot. Tessera serves the first request the way containers serve the thousandth, without the keep-warm fleet you were paying for.',
                },
                {
                  n: '03',
                  title: 'A fleet view that fits on one screen',
                  body:
                    'Image hash, memory, boot time, and lifetime, per VM, per tenant. SBOM is the image manifest. No agent to install, no sidecar to operate, no host metrics to correlate against.',
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
                      <TesseraFleetPanel />
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </FadeIn>

          <FadeIn className="lg:col-span-5 lg:flex lg:items-start lg:justify-end lg:pt-2">
            <TesseraShowcase />
          </FadeIn>
        </div>
      </Container>
    </section>
  )
}

function WhyTessera() {
  const items = [
    {
      n: '01',
      headline: 'It removes the layer most attacks aim at.',
      body:
        'No shared kernel, no userland, no syscall boundary to abuse. The thing an attacker usually pivots through is not in the image. The image is one address space, one purpose, one workload.',
    },
    {
      n: '02',
      headline: 'It runs faster because it does less.',
      body:
        'No context switch tax, no scheduler walking between user and kernel, no init pulling in a hundred things you do not call. Function calls instead of syscalls, every time.',
    },
  ]

  return (
    <section className="mt-32 sm:mt-40 lg:mt-52">
      <Container>
        <SectionHead
          kicker="Why Tessera"
          title="The cheapest layer is the one you do not ship."
          dek="A unikernel is the operating system you would build if you only had one program to run. Tessera is what that looks like as a fleet."
        />

        <FadeInStagger faster>
          <ol className="mt-16 grid grid-cols-1 gap-x-16 gap-y-14 lg:grid-cols-2">
            {items.map((item) => (
              <FadeIn as="li" key={item.n}>
                <p
                  className="font-mono tabular text-xl"
                  style={{ color: TESSERA_INDIGO }}
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
      title: 'Not a container runtime',
      body:
        "Containers share a host kernel. Tessera does not have a host kernel. Each workload is the kernel: fused with its application, scheduled on the hypervisor, isolated by hardware.",
    },
    {
      title: 'Not a sandbox SDK',
      body:
        "There is no in-process jail to escape. Untrusted code runs in its own VM, on its own pages, with its own MMU. Sandboxing is a side effect of the architecture, not a library you call.",
    },
    {
      title: 'Not a heavier microVM',
      body:
        'A microVM still runs Linux. Tessera ships the function and a libos. No userland, no shell, no package surface to inventory. The image is what executes; nothing extra came along for the ride.',
    },
  ]

  return (
    <section className="mt-32 sm:mt-40 lg:mt-52">
      <Container>
        <SectionHead
          kicker="What Tessera isn't"
          title="Three things people assume, and the actual answer."
          dek="The category overlaps three others. Here is what makes Tessera structurally different."
        />

        <FadeInStagger faster>
          <ol className="mt-16 grid grid-cols-1 gap-x-12 gap-y-14 lg:grid-cols-3">
            {items.map((it, i) => (
              <FadeIn as="li" key={it.title} className="group">
                <div className="flex items-baseline gap-3 border-b border-neutral-950/15 pb-3">
                  <span
                    className="font-mono tabular text-4xl font-medium tracking-tight text-neutral-500 transition-colors group-hover:text-[color:var(--accent)]"
                    style={{ '--accent': TESSERA_INDIGO }}
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
      question: 'Do we have to rewrite our code?',
      answer:
        'No. Tessera ships language runtimes (Node, Python, Go, JVM, Rust, WASM) packaged as unikernel base images. You bring a function or a binary; the manager fuses it with the libos and registers the image. The toolchain is a build step, not a project.',
    },
    {
      question: 'How is this different from Firecracker or microVMs?',
      answer:
        'Firecracker boots a Linux kernel inside the VM. Tessera does not. Each workload is its own kernel, with no userland, no shell, and no init. The result is a smaller image, a smaller surface, and a faster cold start, for the same isolation guarantee.',
    },
    {
      question: 'What about syscalls and devices?',
      answer:
        'There is no syscall boundary inside a unikernel. The libos is linked into your binary and called as a library. The hypervisor exposes virtio devices for network and storage; Tessera handles the wiring so workloads talk to the outside world like a normal service.',
    },
    {
      question: 'Where does it run?',
      answer:
        'Hosted on bare metal in our regions, or BYOC inside your data centre or VPC. Tessera needs a hypervisor (KVM or equivalent) and is otherwise self-contained. No Kubernetes, no host distro, no agent to maintain.',
    },
    {
      question: 'Is sandboxing the point?',
      answer:
        'Sandboxing is a property, not the pitch. You get it because each workload is its own VM with its own kernel. The reasons to use Tessera are speed, footprint, and a runtime that does only what your code needs.',
    },
  ]

  return (
    <section className="mt-32 sm:mt-40 lg:mt-52">
      <Container>
        <SectionHead
          kicker="Common questions"
          title="What teams ask before they put it in the runtime path."
        />
        <Faqs items={items} className="mt-12" />
      </Container>
    </section>
  )
}

function Pricing() {
  const plans = [
    {
      name: 'Pilot',
      price: 'Free · 90 days',
      priceNote: 'For closed-beta partners',
      description:
        'Run one workload type on Tessera in front of real traffic. Co-built migration, weekly check-ins, and pricing locked in for the first year.',
      features: [
        'One workspace · all base images',
        'Hot-pool snapshots + scheduler',
        'Direct line to the engineering team',
        'Pricing fixed at beta rate after launch',
      ],
      cta: 'Apply for beta',
    },
    {
      name: 'Team',
      price: 'From $499/mo',
      priceNote: 'For shipping product teams',
      description:
        'Hosted, multi-region, full feature set. Usage-based billing on VM-seconds. Idle pools are free until they boot.',
      features: [
        'Unlimited workloads and tenants',
        'Per-tenant isolation by construction',
        'Image registry · SBOM exports',
        'SOC2-ready data handling',
        'Email + Slack support',
      ],
      cta: 'Talk to us',
      featured: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      priceNote: 'BYOC hypervisor',
      description:
        'Single-tenant deployment on your bare metal or VPC. Air-gap supported, dedicated SRE, custom retention and audit.',
      features: [
        'Self-hosted on KVM bare metal',
        'Per-tenant KMS keys (BYOK)',
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
          title="Pay for VM-seconds, not host fleets."
          dek="Idle pools are free. Booted unikernels are billed by the millisecond. The incentive sits on the right side."
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
                    style={{ background: TESSERA_INDIGO }}
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
                        style={{ color: plan.featured ? TESSERA_VIOLET : TESSERA_INDIGO }}
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
                      plan.featured ? { background: TESSERA_INDIGO } : undefined
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
  title: 'Tessera · A unikernel manager for ephemeral workloads',
  description:
    'Tessera runs each workload as its own unikernel: single address space, no syscalls, no shared kernel. Millisecond cold starts, minimal attack surface, hard isolation by construction.',
  alternates: { canonical: '/tessera' },
}

export default function TesseraPage() {
  return (
    <>
      <Intro />
      <WhenThisMatters />
      <HowItWorks />
      <WhatYouGet />
      <WhyTessera />
      <Differentiation />
      <FaqSection />
      <Pricing />

      <ContactSection />
    </>
  )
}
