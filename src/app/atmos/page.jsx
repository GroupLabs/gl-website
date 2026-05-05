import { AtmosShowcase } from '@/components/AtmosShowcase'
import { Button } from '@/components/Button'
import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { Faqs } from '@/components/Faqs'
import { SectionHead } from '@/components/SectionHead'

const ATMOS_SLATE = '#334155'
const ATMOS_SKY = '#0EA5E9'

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

function AtmosBackdrop() {
  // Atmospheric backdrop. Slate haze + soft sky glow on the destination side,
  // suggesting a workload drifting from one cloud to another. Extends above
  // the section so the gradient runs behind the page wrapper's top whitespace.
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute -top-24 bottom-0 left-0 right-0 -z-10"
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 55% at 14% 18%, rgba(51,65,85,0.13), transparent 60%), radial-gradient(ellipse 65% 50% at 88% 22%, rgba(14,165,233,0.10), transparent 60%), radial-gradient(ellipse 60% 45% at 50% 95%, rgba(51,65,85,0.06), transparent 65%)',
        }}
      />
      {/* faint horizontal isobars, atmospheric chart feel */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, rgba(51,65,85,0.08) 0 1px, transparent 1px 38px)',
          maskImage:
            'radial-gradient(ellipse at 50% 30%, black 0%, transparent 75%)',
          WebkitMaskImage:
            'radial-gradient(ellipse at 50% 30%, black 0%, transparent 75%)',
          opacity: 0.55,
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'radial-gradient(rgba(51,65,85,0.16) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          maskImage:
            'radial-gradient(ellipse at center, black 0%, transparent 80%)',
          WebkitMaskImage:
            'radial-gradient(ellipse at center, black 0%, transparent 80%)',
          opacity: 0.38,
        }}
      />
    </div>
  )
}

function Intro() {
  return (
    <section className="relative isolate">
      <AtmosBackdrop />
      <Container className="pt-24 sm:pt-28 lg:pt-36">
        <FadeIn>
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-b border-neutral-950/15 pb-3 eyebrow text-neutral-500">
            <span className="flex items-center gap-3">
              <span
                className="block h-1.5 w-1.5 rounded-full"
                style={{ background: ATMOS_SLATE }}
              />
              <span className="text-neutral-950">Atmos</span>
              <span className="opacity-50">/</span>
              <span>A product from GroupLabs</span>
            </span>
            <span>Cross-cloud workload migration</span>
          </div>
        </FadeIn>

        <div className="mt-14 grid grid-cols-1 gap-x-12 gap-y-16 lg:mt-20 lg:grid-cols-12 lg:items-start">
          <FadeIn className="lg:col-span-7">
            <h1 className="font-display text-5xl font-medium leading-[1.04] tracking-tight text-neutral-950 [text-wrap:balance] sm:text-6xl lg:text-[5.25rem] lg:leading-[1.0]">
              Move your workload{' '}
              <span style={{ color: ATMOS_SLATE }}>from one cloud</span>{' '}
              to another. Without the rewrite.
            </h1>

            <p className="mt-8 max-w-xl text-lg leading-relaxed text-neutral-700">
              Atmos maps your services, data, and config to the equivalent
              primitives on a second cloud, mirrors them in the background,
              and shifts traffic over when you say go.
            </p>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-neutral-700">
              No frozen feature work. No new abstraction to learn. The
              cutover is a button.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Button
                href="/contact"
                className="text-white hover:opacity-90"
                style={{ background: ATMOS_SLATE }}
              >
                Plan a migration
              </Button>
              <Button href="#how-it-works" variant="outline">
                See how it works →
              </Button>
              <span className="ml-2 inline-flex items-center gap-2 eyebrow text-neutral-500">
                <span
                  className="h-1.5 w-1.5 animate-pulse-dot rounded-full"
                  style={{ background: ATMOS_SKY }}
                />
                v0.9 · beta
              </span>
            </div>
          </FadeIn>

          <FadeIn className="lg:col-span-5 lg:flex lg:justify-end">
            <AtmosShowcase />
          </FadeIn>
        </div>

        {/* mono spec strip */}
        <FadeIn>
          <dl className="mt-20 grid grid-cols-2 gap-y-8 border-y border-neutral-950/15 py-8 sm:grid-cols-4">
            <div>
              <dt className="eyebrow text-neutral-500">Clouds</dt>
              <dd className="mt-2 font-mono tabular text-base font-medium leading-snug text-neutral-950">
                AWS · GCP · Azure
              </dd>
            </div>
            <div>
              <dt className="eyebrow text-neutral-500">Cutover window</dt>
              <dd className="mt-2 font-mono tabular text-2xl font-medium tracking-tight text-neutral-950">
                &lt; 5 min
              </dd>
            </div>
            <div>
              <dt className="eyebrow text-neutral-500">App rewrites</dt>
              <dd className="mt-2 font-mono tabular text-base font-medium leading-snug text-neutral-950">
                none required
              </dd>
            </div>
            <div>
              <dt className="eyebrow text-neutral-500">Rollback</dt>
              <dd className="mt-2 font-mono tabular text-base font-medium leading-snug text-neutral-950">
                one command
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
      label: 'A cloud bill that just keeps climbing',
      body:
        'Egress, reserved instances you no longer use, a database tier you outgrew. Finance keeps asking. Engineering keeps quoting a quarter to move.',
    },
    {
      label: 'Procurement bought a different cloud',
      body:
        "The committed-spend deal is on the other provider now. The workload still runs where it always did, and someone has to bridge the gap.",
    },
    {
      label: 'A region keeps melting down',
      body:
        'Provider-wide incidents, capacity shortages, regulatory pressure. You want the option to be somewhere else by Friday, not next quarter.',
    },
    {
      label: 'A customer requires a specific cloud',
      body:
        'Government, defence, healthcare, EU residency. The deal is yours if the workload runs in the right tenant. The workload is on the wrong one.',
    },
  ]

  return (
    <section className="mt-32 sm:mt-40 lg:mt-52">
      <Container>
        <SectionHead
          kicker="When this matters"
          title="If 'multi-cloud' is a strategy slide and not a runbook."
          dek="Atmos is for teams whose workload runs in one place today and needs to run somewhere else next month, without freezing roadmap to do it."
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
                  style={{ '--hover-color': ATMOS_SLATE }}
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
      title: 'Map the workload',
      body:
        'Atmos reads your live infra (services, data stores, queues, secrets, network) and produces a target-cloud mapping. Where the equivalent exists, it picks it. Where it does not, it tells you before you start.',
    },
    {
      title: 'Mirror in the background',
      body:
        'Stateless services are recreated on the target. Databases stream changes through CDC. Object storage syncs continuously. Source keeps serving the whole time.',
    },
    {
      title: 'Run a shadow drill',
      body:
        'A copy of production traffic plays against the target side. Diffs in latency, error rate, and response shape are reported before any user touches it.',
    },
    {
      title: 'Cut over and watch',
      body:
        'DNS shifts in weighted steps, not a single flip. If health checks regress, Atmos halts the shift and tells you why. Rollback is one command.',
    },
  ]

  return (
    <section id="how-it-works" className="mt-32 sm:mt-40 lg:mt-52">
      <Container>
        <SectionHead
          kicker="How it works"
          title="From snapshot to second cloud. Without freezing the roadmap."
          dek="Atmos runs alongside your live workload. Mirror, drill, cut over. Each step is observable and reversible."
        />

        <FadeInStagger faster>
          <ol className="mt-16 grid grid-cols-1 gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <FadeIn as="li" key={step.title} className="group">
                <div
                  className="flex items-baseline gap-3 border-b border-neutral-950/15 pb-3 transition-colors group-hover:border-[color:var(--accent)]"
                  style={{ '--accent': ATMOS_SLATE }}
                >
                  <span
                    className="font-mono tabular text-5xl font-medium tracking-tight text-neutral-950 transition-colors sm:text-6xl group-hover:text-[color:var(--accent)]"
                    style={{ '--accent': ATMOS_SLATE }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="eyebrow text-neutral-500">Phase</span>
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

const DRIFT_ROWS = [
  { svc: 'api-gateway', src: 'aws · alb', tgt: 'gcp · l7-lb', delta: 'p95 +4ms', ok: true },
  { svc: 'postgres-primary', src: 'rds · 15.4', tgt: 'cloudsql · 15.4', delta: 'lag 0.4s', ok: true },
  { svc: 'redis-cache', src: 'elasticache · 7.2', tgt: 'memorystore · 7.2', delta: 'evictions 0', ok: true },
  { svc: 'object-store', src: 's3 · standard', tgt: 'gcs · standard', delta: '38% copied', ok: true, partial: true },
  { svc: 'event-bus', src: 'sns + sqs', tgt: 'pub/sub', delta: 'shape diff: ordering', ok: false },
  { svc: 'secrets', src: 'secretsmanager', tgt: 'secret-manager', delta: 'parity', ok: true },
]

function DriftPanel() {
  return (
    <div className="rounded-md border border-neutral-950/15 bg-white">
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-neutral-950/10 px-5 py-3">
        <span className="eyebrow text-neutral-500">
          Mapping report · pre-cutover
        </span>
        <div className="flex items-baseline gap-5 font-mono tabular text-sm text-neutral-500">
          <span>
            <span className="font-medium text-neutral-950">5/6</span> parity
          </span>
          <span>
            <span className="font-medium text-neutral-950">1</span> shape diff
          </span>
        </div>
      </div>
      <ul role="list">
        {DRIFT_ROWS.map((row, i) => (
          <li
            key={i}
            className="grid grid-cols-12 items-center gap-x-4 gap-y-1 border-t border-neutral-950/5 px-5 py-3.5 first:border-t-0"
          >
            <div className="col-span-12 sm:col-span-4">
              <p className="font-mono text-sm text-neutral-950">{row.svc}</p>
              <p className="mt-0.5 font-mono text-xs text-neutral-500">
                {row.src} <span className="text-neutral-300">→</span> {row.tgt}
              </p>
            </div>
            <div className="col-span-9 sm:col-span-6 font-mono text-xs text-neutral-700">
              {row.delta}
            </div>
            <div className="col-span-3 sm:col-span-2 flex justify-end">
              {row.ok ? (
                <span
                  className="font-mono text-[10px] uppercase tracking-[0.18em]"
                  style={{ color: row.partial ? ATMOS_SLATE : ATMOS_SKY }}
                >
                  {row.partial ? 'in progress' : 'parity'}
                </span>
              ) : (
                <span
                  className="font-mono text-[10px] uppercase tracking-[0.18em]"
                  style={{ color: '#B45309' }}
                >
                  review
                </span>
              )}
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
          title="A migration that stays observable end to end."
          dek="Three things you can hand to the engineer who has to make this call on a Tuesday."
        />

        <div className="mt-16 grid grid-cols-1 gap-y-14 lg:grid-cols-12 lg:gap-x-16">
          <FadeIn className="lg:col-span-7">
            <ul className="space-y-2">
              {[
                {
                  n: '01',
                  title: 'A mapping report your team can challenge',
                  body:
                    'Every component on the source side gets paired with a target primitive, or flagged. You see shape diffs, parity gaps, and capacity holes before the first byte moves.',
                },
                {
                  n: '02',
                  title: 'Continuous mirroring while production runs',
                  body:
                    'CDC for stateful systems. Object sync for blob storage. Config and secrets reconciled. Source keeps serving until you decide otherwise. There is no maintenance window.',
                },
                {
                  n: '03',
                  title: 'A cutover you can pause, slow down, or undo',
                  body:
                    'DNS weights move in steps you control. Health checks gate every step. If anything regresses, Atmos halts and points at the offending signal. Rollback to the source side is a single command.',
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
                  {d.n === '01' && (
                    <div className="col-span-12 mt-4 sm:col-start-2 sm:col-span-11">
                      <DriftPanel />
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </FadeIn>

          <FadeIn className="lg:col-span-5 lg:flex lg:items-start lg:justify-end lg:pt-2">
            <AtmosShowcase />
          </FadeIn>
        </div>
      </Container>
    </section>
  )
}

function WhyAtmos() {
  const items = [
    {
      n: '01',
      headline: 'It treats every cloud as a target, not a religion.',
      body:
        "AWS, GCP, Azure, and the on-prem rack you forgot you owned. Atmos maps primitives, not branding. The thing that moves is your workload, not your team's vocabulary.",
    },
    {
      n: '02',
      headline: 'It survives the parts you forgot about.',
      body:
        "The cron job nobody documented. The legacy queue. The IAM role with one consumer. Atmos finds them in the live environment, not the architecture diagram, and refuses to cut over until each is accounted for.",
    },
  ]

  return (
    <section className="mt-32 sm:mt-40 lg:mt-52">
      <Container>
        <SectionHead
          kicker="Why Atmos"
          title="Most cloud migrations die in the discovery phase."
          dek="Atmos starts from the running system, not the wiki. The plan it produces matches what you actually have."
        />

        <FadeInStagger faster>
          <ol className="mt-16 grid grid-cols-1 gap-x-16 gap-y-14 lg:grid-cols-2">
            {items.map((item) => (
              <FadeIn as="li" key={item.n}>
                <p
                  className="font-mono tabular text-xl"
                  style={{ color: ATMOS_SLATE }}
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
      title: 'Not a new abstraction',
      body:
        "You don't rewrite your stack into Atmos primitives. Atmos talks to AWS, GCP, and Azure in their native API. Your code stays your code on the other side.",
    },
    {
      title: 'Not a lift-and-shift service',
      body:
        'A consultant in a slide deck migrates VMs. Atmos migrates the running shape of your system (services, state, secrets, traffic) and verifies it before the cutover.',
    },
    {
      title: 'Not a federation layer',
      body:
        'No proxy in the hot path. No new control plane to keep alive forever. Atmos runs during the move, watches for a while after, and gets out of the way.',
    },
  ]

  return (
    <section className="mt-32 sm:mt-40 lg:mt-52">
      <Container>
        <SectionHead
          kicker="What Atmos isn't"
          title="Three things people assume, and the actual answer."
          dek="Cross-cloud is a crowded category full of bad metaphors. Here's what makes Atmos structurally different."
        />

        <FadeInStagger faster>
          <ol className="mt-16 grid grid-cols-1 gap-x-12 gap-y-14 lg:grid-cols-3">
            {items.map((it, i) => (
              <FadeIn as="li" key={it.title} className="group">
                <div className="flex items-baseline gap-3 border-b border-neutral-950/15 pb-3">
                  <span
                    className="font-mono tabular text-4xl font-medium tracking-tight text-neutral-500 transition-colors group-hover:text-[color:var(--accent)]"
                    style={{ '--accent': ATMOS_SLATE }}
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
      question: 'Which clouds does Atmos support?',
      answer:
        'AWS, GCP, and Azure as both source and target. On-prem and bare-metal Kubernetes are supported as either side. Cross-region within a single cloud uses the same machinery. The controller does not care whether the destination is a different vendor or a different account.',
    },
    {
      question: 'How long does a migration take?',
      answer:
        'The mirror phase runs as long as your largest stateful system needs to catch up. Typically hours to days for production-scale databases. The cutover itself is minutes. The roadmap does not stop while either is happening.',
    },
    {
      question: 'What about services with no equivalent on the other side?',
      answer:
        'Atmos flags them in the mapping report and refuses to schedule a cutover until each has an explicit decision: a managed equivalent, a self-hosted alternative, or an explicit accept-the-gap. Surprises at cutover are the failure mode we built around.',
    },
    {
      question: 'Can we roll back?',
      answer:
        'Yes. The source environment stays warm during shadow and weighted cutover. Reversing direction is a single command and shifts traffic back the way it came. Mirroring runs in both directions while both sides are warm, so no writes are lost.',
    },
    {
      question: 'How is data kept consistent during the move?',
      answer:
        "Stateful systems use change-data-capture so the target lags the source by seconds, not hours. Object stores use continuous sync. At cutover, Atmos quiesces writes on the source, drains in-flight requests, lets the target catch up, then opens the target side. The pause is visible in the dashboard and typically under a second.",
    },
  ]

  return (
    <section className="mt-32 sm:mt-40 lg:mt-52">
      <Container>
        <SectionHead
          kicker="Common questions"
          title="What teams ask before they schedule a cutover."
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
      price: 'Free · 30 days',
      priceNote: 'For one workload, one direction',
      description:
        'Drop Atmos in front of one production workload. Co-built mapping, supervised cutover, and pricing locked in for the first year.',
      features: [
        'One source → target pair',
        'Mapping report and shadow drill',
        'Direct line to the engineering team',
        'Pricing fixed at beta rate after launch',
      ],
      cta: 'Apply for beta',
    },
    {
      name: 'Team',
      price: 'From $1,500/mo',
      priceNote: 'For teams running across more than one cloud',
      description:
        'Production install across your fleet. Usage-based on bytes mirrored and cutovers scheduled, not per-engineer seats.',
      features: [
        'Unlimited workloads and target pairs',
        'CDC, object sync, secrets parity',
        'Shadow drill + weighted cutover',
        'SOC2-ready data handling',
        'Email + Slack support',
      ],
      cta: 'Talk to us',
      featured: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      priceNote: 'Self-hosted control plane',
      description:
        'Single-tenant deployment in your VPC. Custom retention, dedicated SRE, procurement-friendly contracts. For regulated environments.',
      features: [
        'Self-hosted or VPC-isolated',
        'Custom data retention and audit',
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
          title="Pay for bytes moved, not seats sold."
          dek="Atmos charges by what gets mirrored and cut over. The incentive sits with the team doing the migration, not the one buying the license."
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
                    style={{ background: ATMOS_SLATE }}
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
                        style={{
                          color: plan.featured ? ATMOS_SKY : ATMOS_SLATE,
                        }}
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
                      plan.featured ? { background: ATMOS_SLATE } : undefined
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
  title: 'Atmos · Move your workload from one cloud to another',
  description:
    'Atmos maps your services, data, and config to a second cloud, mirrors them in the background, and shifts traffic over when you say go. AWS, GCP, Azure.',
  alternates: { canonical: '/atmos' },
}

export default function AtmosPage() {
  return (
    <>
      <Intro />
      <WhenThisMatters />
      <HowItWorks />
      <WhatYouGet />
      <WhyAtmos />
      <Differentiation />
      <FaqSection />
      <Pricing />

      <ContactSection />
    </>
  )
}
