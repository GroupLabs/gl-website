import { Button } from '@/components/Button'
import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { Faqs } from '@/components/Faqs'
import { SectionHead } from '@/components/SectionHead'
import { TellShowcase } from '@/components/TellShowcase'

const TELL_GREEN = '#166534'
const TELL_LIME = '#4ADE80'

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

function TellBackdrop() {
  // Atmospheric backdrop, forest-green spotlight + horizontal scanlines.
  // The scanlines read as a network monitor / live trace, distinct from
  // Nudge's dot grid. Extends above the parent so the gradient runs to the
  // viewport top behind the page wrapper's pt-14 + pt-9.
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute -top-24 bottom-0 left-0 right-0 -z-10"
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 55% at 80% 12%, rgba(22,101,52,0.16), transparent 60%), radial-gradient(ellipse 55% 40% at 12% 90%, rgba(74,222,128,0.10), transparent 65%)',
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, rgba(22,101,52,0.10) 0px, rgba(22,101,52,0.10) 1px, transparent 1px, transparent 6px)',
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
      <TellBackdrop />
      <Container className="pt-24 sm:pt-28 lg:pt-36">
        <FadeIn>
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-b border-neutral-950/15 pb-3 eyebrow text-neutral-500">
            <span className="flex items-center gap-3">
              <span
                className="block h-1.5 w-1.5 rounded-full"
                style={{ background: TELL_GREEN }}
              />
              <span className="text-neutral-950">Tell</span>
              <span className="opacity-50">/</span>
              <span>A product from GroupLabs</span>
            </span>
            <span>LLM gateway</span>
          </div>
        </FadeIn>

        <div className="mt-14 grid grid-cols-1 gap-x-12 gap-y-16 lg:mt-20 lg:grid-cols-12 lg:items-start">
          <FadeIn className="lg:col-span-7">
            <h1 className="font-display text-5xl font-medium leading-[1.04] tracking-tight text-neutral-950 [text-wrap:balance] sm:text-6xl lg:text-[5.25rem] lg:leading-[1.0]">
              Every LLM request,{' '}
              <span style={{ color: TELL_GREEN }}>routed</span>{' '}
              and accountable.
            </h1>

            <p className="mt-8 max-w-xl text-lg leading-relaxed text-neutral-700">
              Tell is a Rust-based gateway between your product and every LLM
              provider. It caches, routes, redacts, and audits, at sixty
              thousand requests per second, with sub-millisecond overhead.
            </p>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-neutral-700">
              No SDK rewrite. No vendor lock-in. No quiet model swaps that hit
              your customers before they hit your dashboard.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Button
                href="/contact"
                className="text-white hover:opacity-90"
                style={{ background: TELL_GREEN }}
              >
                Get early access
              </Button>
              <Button href="#how-it-works" variant="outline">
                See how it works →
              </Button>
              <span className="ml-2 inline-flex items-center gap-2 eyebrow text-neutral-500">
                <span
                  className="h-1.5 w-1.5 animate-pulse-dot rounded-full"
                  style={{ background: TELL_LIME }}
                />
                Released · v1.0
              </span>
            </div>
          </FadeIn>

          <FadeIn className="lg:col-span-5 lg:flex lg:justify-end">
            <TellShowcase />
          </FadeIn>
        </div>

        {/* mono spec strip · the load test numbers */}
        <FadeIn>
          <dl className="mt-20 grid grid-cols-2 gap-y-8 border-y border-neutral-950/15 py-8 sm:grid-cols-4">
            <div>
              <dt className="eyebrow text-neutral-500">Throughput</dt>
              <dd className="mt-2 font-mono tabular text-2xl font-medium tracking-tight text-neutral-950">
                60k+ rps
              </dd>
            </div>
            <div>
              <dt className="eyebrow text-neutral-500">Overhead</dt>
              <dd className="mt-2 font-mono tabular text-2xl font-medium tracking-tight text-neutral-950">
                &lt; 1 ms
              </dd>
            </div>
            <div>
              <dt className="eyebrow text-neutral-500">Mean response</dt>
              <dd className="mt-2 font-mono tabular text-2xl font-medium tracking-tight text-neutral-950">
                4.3 ms
              </dd>
            </div>
            <div>
              <dt className="eyebrow text-neutral-500">Failures @ 10k conc.</dt>
              <dd className="mt-2 font-mono tabular text-2xl font-medium tracking-tight text-neutral-950">
                0
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
      label: 'You picked a provider, and now you live there',
      body:
        "One SDK, one bill, one failure mode. The model that beat yours on price last week sits on the other side of a rewrite you keep deferring.",
    },
    {
      label: 'Spend is creeping and nobody owns it',
      body:
        'The same prompt is generating the same answer for the tenth time today. Two teams are calling GPT-5 for tasks 4o-mini would solve. There is no budget by team, no cap by project.',
    },
    {
      label: 'Outages are silent until they are loud',
      body:
        'A model gets deprecated. A fingerprint flips overnight. A region quietly throttles. You find out the same way your customers do: through the support inbox.',
    },
    {
      label: 'Compliance keeps asking what left the building',
      body:
        'PII rides along in the prompts. Secrets land in the logs. There is no audit trail that survives a regulator, and no redaction layer that survives a code review.',
    },
  ]

  return (
    <section className="mt-32 sm:mt-40 lg:mt-52">
      <Container>
        <SectionHead
          kicker="When this matters"
          title="If you ship LLM features, you've already met these problems."
          dek="Tell is for teams whose product talks to a model on every meaningful click, and whose ops, finance, and legal teams are starting to notice."
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
                  style={{ '--hover-color': TELL_GREEN }}
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
      title: 'Point at the URL',
      body:
        'Tell speaks the OpenAI API. Swap one base URL in your existing client; keys, types, and streaming all keep working. No SDK rewrite, no new abstractions to learn.',
    },
    {
      title: 'Solve before you spend',
      body:
        'A constraint solver filters providers by region, context length, cost ceiling, and JSON mode. A multi-objective bandit then scores the survivors on cost, latency, and quality.',
    },
    {
      title: 'Cache, redact, route',
      body:
        'A semantic cache check answers similar prompts in under a millisecond. PII and secrets are redacted at the edge. The chosen provider streams the response back in coherent chunks.',
    },
    {
      title: 'Log every byte',
      body:
        'Prompt, params, route decision, tool traces, fingerprints, confidence map, all attached to one trace. Sealed originals; redacted day-to-day logs; audit-ready exports on demand.',
    },
  ]

  return (
    <section id="how-it-works" className="mt-32 sm:mt-40 lg:mt-52">
      <Container>
        <SectionHead
          kicker="How it works"
          title="From your client to a provider, through one accountable hop."
          dek="Tell sits on the wire. Every prompt your product makes, every response a model returns, passes through the same place, and gets the same treatment."
        />

        <FadeInStagger faster>
          <ol className="mt-16 grid grid-cols-1 gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <FadeIn as="li" key={step.title} className="group">
                <div
                  className="flex items-baseline gap-3 border-b border-neutral-950/15 pb-3 transition-colors group-hover:border-[color:var(--accent)]"
                  style={{ '--accent': TELL_GREEN }}
                >
                  <span
                    className="font-mono tabular text-5xl font-medium tracking-tight text-neutral-950 transition-colors sm:text-6xl group-hover:text-[color:var(--accent)]"
                    style={{ '--accent': TELL_GREEN }}
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

const TRAFFIC_ROWS = [
  {
    prompt: 'summarise this 12k-token transcript',
    provider: 'anthropic / sonnet-4',
    latency: '312 ms',
    note: null,
    pct: 78,
  },
  {
    prompt: 'classify ticket sentiment',
    provider: 'cache · 0.94 sim',
    latency: '0.8 ms',
    note: 'served from semantic cache',
    pct: 4,
  },
  {
    prompt: 'extract invoice fields → JSON',
    provider: 'openai / gpt-4.1',
    latency: '198 ms',
    note: 'json repair · 1 fixup',
    pct: 52,
  },
  {
    prompt: 'draft customer email re: refund',
    provider: 'bedrock / haiku-4',
    latency: '267 ms',
    note: 'PII redacted · 2 spans',
    pct: 67,
  },
]

function TellTrafficPanel() {
  return (
    <div className="rounded-md border border-neutral-950/15 bg-white">
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-neutral-950/10 px-5 py-3">
        <span className="eyebrow text-neutral-500">
          Live traffic · last 60 seconds
        </span>
        <div className="flex items-baseline gap-5 font-mono tabular text-sm text-neutral-500">
          <span>
            <span className="font-medium text-neutral-950">3.7M</span> reqs
          </span>
          <span>
            <span className="font-medium text-neutral-950">58%</span> cached
          </span>
          <span>
            <span className="font-medium text-neutral-950">$214</span> spend
          </span>
        </div>
      </div>
      <ul role="list">
        {TRAFFIC_ROWS.map((row, i) => (
          <li
            key={i}
            className="grid grid-cols-12 items-center gap-x-4 gap-y-1 border-t border-neutral-950/5 px-5 py-3.5 first:border-t-0"
          >
            <div className="col-span-12 sm:col-span-6">
              <p className="font-mono text-sm text-neutral-950">
                &ldquo;{row.prompt}&rdquo;
              </p>
              {row.note && (
                <p
                  className="mt-1 font-mono text-xs"
                  style={{ color: TELL_GREEN }}
                >
                  ↳ {row.note}
                </p>
              )}
            </div>
            <div className="col-span-7 font-mono tabular text-xs text-neutral-700 sm:col-span-3">
              {row.provider}
            </div>
            <div className="col-span-2 text-right font-mono tabular text-xs text-neutral-700 sm:col-span-1">
              {row.latency}
            </div>
            <div className="col-span-3 flex items-center gap-2 sm:col-span-2">
              <span className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-neutral-100">
                <span
                  className="absolute inset-y-0 left-0 rounded-full"
                  style={{
                    width: `${row.pct}%`,
                    background: row.note?.startsWith('served')
                      ? TELL_LIME
                      : TELL_GREEN,
                    opacity: row.note?.startsWith('served') ? 1 : 0.85,
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
          title="Cheaper traffic. Calmer outages. One audit trail."
          dek="Three things drop into place the day Tell goes live in front of your stack."
        />

        <div className="mt-16 grid grid-cols-1 gap-y-14 lg:grid-cols-12 lg:gap-x-16">
          <FadeIn className="lg:col-span-7">
            <ul className="space-y-2">
              {[
                {
                  n: '01',
                  title: 'A router that picks the cheapest model that still works',
                  body:
                    "Constraints first, scoring second. Fewer wasted GPT-5 calls on tasks 4o-mini would handle; fewer truncated 4o-mini calls on prompts that actually needed the bigger context.",
                },
                {
                  n: '02',
                  title: 'A semantic cache that pays for itself',
                  body:
                    'Vector lookups on incoming prompts. Forty to sixty percent of traffic stops short of a provider; the answer was already on the shelf, ten characters of paraphrase away.',
                },
                {
                  n: '03',
                  title: 'A single audit trail across every provider',
                  body:
                    'Prompts, params, route decisions, fingerprints, redactions, all in one trace. The forensics bundle attaches itself to the incident, not to the engineer who happens to be on call.',
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
                      <TellTrafficPanel />
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </FadeIn>

          <FadeIn className="lg:col-span-5 lg:flex lg:items-start lg:justify-end lg:pt-2">
            <TellShowcase />
          </FadeIn>
        </div>
      </Container>
    </section>
  )
}

function WhyTell() {
  const items = [
    {
      n: '01',
      headline: "It's a gateway, not a wrapper.",
      body:
        'It lives on the wire. Every request, every retry, every failover passes through the same place, so policy, cost, and audit are written once, not re-implemented per app.',
    },
    {
      n: '02',
      headline: "It's built for the day a provider changes.",
      body:
        'Model fingerprints watched, behavioural contracts enforced, shadow traffic compared. When a provider quietly swaps a checkpoint, you find out before your customers do.',
    },
  ]

  return (
    <section className="mt-32 sm:mt-40 lg:mt-52">
      <Container>
        <SectionHead
          kicker="Why Tell"
          title="A gateway is the right place for this."
          dek="The same problems show up in every LLM stack. Solving them once, on the wire, beats solving them four times in four apps."
        />

        <FadeInStagger faster>
          <ol className="mt-16 grid grid-cols-1 gap-x-16 gap-y-14 lg:grid-cols-2">
            {items.map((item) => (
              <FadeIn as="li" key={item.n}>
                <p
                  className="font-mono tabular text-xl"
                  style={{ color: TELL_GREEN }}
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
      title: 'Not a thin proxy',
      body:
        "It routes on cost, latency, and quality. It repairs JSON output to schema. It hedges tail latency across providers and cancels on first success. A reverse proxy doesn't.",
    },
    {
      title: 'Not an SDK abstraction',
      body:
        "Your code keeps using the OpenAI client. Tell is the URL it points at. No new types, no rewrites, no second SDK to lock yourself into.",
    },
    {
      title: 'Not a separate observability tool',
      body:
        'Request, response, prompt diff, route decision, cost, confidence: same trace. One pane, not three integrations and a Looker dashboard.',
    },
  ]

  return (
    <section className="mt-32 sm:mt-40 lg:mt-52">
      <Container>
        <SectionHead
          kicker="What Tell isn't"
          title="Three things people assume, and the actual answer."
          dek="The category is full of half-fits. Here's what makes Tell structurally different."
        />

        <FadeInStagger faster>
          <ol className="mt-16 grid grid-cols-1 gap-x-12 gap-y-14 lg:grid-cols-3">
            {items.map((it, i) => (
              <FadeIn as="li" key={it.title} className="group">
                <div className="flex items-baseline gap-3 border-b border-neutral-950/15 pb-3">
                  <span
                    className="font-mono tabular text-4xl font-medium tracking-tight text-neutral-500 transition-colors group-hover:text-[color:var(--accent)]"
                    style={{ '--accent': TELL_GREEN }}
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
      question: 'Do we have to rewrite our app?',
      answer:
        "No. Tell speaks the OpenAI API. Point your existing OpenAI client at Tell's URL: keys, types, streaming, tool calls all keep working. The migration is a config change, not a project.",
    },
    {
      question: 'Where does it run?',
      answer:
        'Hosted, per-region, with a global control plane and per-region data planes. Or BYOC inside your VPC, where the data plane stays in your residency zone and the control plane stays out.',
    },
    {
      question: 'What happens when a provider goes down?',
      answer:
        "Smart fallback. Tell holds the chosen model, hedges to a backup if tail latency spikes, and routes around outages without changing the request your client sent. The first you'll hear about it is the dashboard.",
    },
    {
      question: 'Is our data safe?',
      answer:
        'PII and secrets are redacted at the edge before egress. Day-to-day logs are redacted; sealed originals sit in immutable storage with break-glass controls and per-tenant KMS keys.',
    },
    {
      question: 'Can we run our own models behind it?',
      answer:
        'Yes. Self-hosted endpoints (vLLM, TGI, in-house Triton, anything that speaks OpenAI or a known schema) join the routing pool alongside hosted providers; same constraints, same scoring, same audit.',
    },
  ]

  return (
    <section className="mt-32 sm:mt-40 lg:mt-52">
      <Container>
        <SectionHead
          kicker="Common questions"
          title="What teams ask before they put it on the wire."
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
        'Drop Tell in front of one product surface. All features unlocked, weekly check-ins, and pricing locked in for the first year.',
      features: [
        'One workspace · all providers',
        'Semantic cache + smart routing',
        'Direct line to the engineering team',
        'Pricing fixed at beta rate after launch',
      ],
      cta: 'Apply for beta',
    },
    {
      name: 'Team',
      price: 'From $499/mo',
      priceNote: 'For shipping LLM teams',
      description:
        'Hosted, multi-region, full feature set. Usage-based billing on completions that actually leave the gateway; cached calls are free.',
      features: [
        'Unlimited prompts and providers',
        'Per-team budgets and virtual keys',
        'PII redaction · audit log exports',
        'SOC2-ready data handling',
        'Email + Slack support',
      ],
      cta: 'Talk to us',
      featured: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      priceNote: 'BYOC data plane',
      description:
        'Single-tenant deployment in your VPC. BYOK encryption, dedicated SRE, hard multi-tenancy across business units.',
      features: [
        'Self-hosted or VPC-isolated',
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
          title="Pay for completions, not seats."
          dek="Cached calls are free. Routed calls are billed at provider cost plus a thin margin. The incentive sits on the right side."
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
                    style={{ background: TELL_GREEN }}
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
                        style={{ color: plan.featured ? TELL_LIME : TELL_GREEN }}
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
                      plan.featured ? { background: TELL_GREEN } : undefined
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
  title: 'Tell · A Rust gateway for every LLM provider',
  description:
    'Tell is a Rust-based LLM gateway that caches, routes, redacts, and audits requests across every major provider. 60k+ rps, sub-millisecond overhead, OpenAI-compatible.',
  alternates: { canonical: '/tell' },
}

export default function TellPage() {
  return (
    <>
      <Intro />
      <WhenThisMatters />
      <HowItWorks />
      <WhatYouGet />
      <WhyTell />
      <Differentiation />
      <FaqSection />
      <Pricing />

      <ContactSection />
    </>
  )
}
