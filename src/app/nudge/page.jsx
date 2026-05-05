import { Button } from '@/components/Button'
import { ContactCTA } from '@/components/ContactCTA'
import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { Faqs } from '@/components/Faqs'
import { NudgeShowcase } from '@/components/NudgeShowcase'
import { SectionHead } from '@/components/SectionHead'

const NUDGE_BLUE = '#2563EB'

function CheckIcon({ className }) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className={className}>
      <path
        fillRule="evenodd"
        d="M16.704 5.295a1 1 0 0 1 .001 1.414l-7.5 7.5a1 1 0 0 1-1.415 0l-3.5-3.5a1 1 0 1 1 1.414-1.414L8.5 12.086l6.79-6.79a1 1 0 0 1 1.414 0z"
        clipRule="evenodd"
      />
    </svg>
  )
}

function NudgeBackdrop() {
  // Atmospheric backdrop for the hero — blue spotlight + dot grid.
  // Extends above its parent section so the gradient runs behind the
  // page wrapper's pt-14 + pt-9 white space and reads to the viewport top.
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute -top-24 bottom-0 left-0 right-0 -z-10"
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 55% at 78% 14%, rgba(37,99,235,0.14), transparent 60%), radial-gradient(ellipse 60% 45% at 14% 92%, rgba(37,99,235,0.08), transparent 65%)',
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'radial-gradient(rgba(37,99,235,0.18) 1px, transparent 1px)',
          backgroundSize: '22px 22px',
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
      <NudgeBackdrop />
      <Container className="pt-24 sm:pt-28 lg:pt-36">
        <FadeIn>
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-b border-neutral-950/15 pb-3 eyebrow text-neutral-500">
            <span className="flex items-center gap-3">
              <span
                className="block h-1.5 w-1.5 rounded-full"
                style={{ background: NUDGE_BLUE }}
              />
              <span className="text-neutral-950">Nudge</span>
              <span className="opacity-50">/</span>
              <span>A product from GroupLabs</span>
            </span>
            <span>In-app walkthrough overlay</span>
          </div>
        </FadeIn>

        <div className="mt-14 grid grid-cols-1 gap-x-12 gap-y-16 lg:mt-20 lg:grid-cols-12 lg:items-start">
          <FadeIn className="lg:col-span-7">
            <h1 className="font-display text-5xl font-medium leading-[1.04] tracking-tight text-neutral-950 [text-wrap:balance] sm:text-6xl lg:text-[5.25rem] lg:leading-[1.0]">
              Your product,{' '}
              <span style={{ color: NUDGE_BLUE }}>explained</span>{' '}
              the moment a user asks.
            </h1>

            <p className="mt-8 max-w-xl text-lg leading-relaxed text-neutral-700">
              Nudge is an overlay that lives inside your app. Users ask
              what they want to do, in plain language. Nudge highlights the
              right elements and walks them through, step by step.
            </p>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-neutral-700">
              No new docs. No re-recording videos. No support tickets for
              flows you already shipped.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Button
                href="/contact"
                className="text-white hover:opacity-90"
                style={{ background: NUDGE_BLUE }}
              >
                Get early access
              </Button>
              <Button href="#how-it-works" variant="outline">
                See how it works →
              </Button>
              <span className="ml-2 inline-flex items-center gap-2 eyebrow text-neutral-500">
                <span
                  className="h-1.5 w-1.5 animate-pulse-dot rounded-full"
                  style={{ background: NUDGE_BLUE }}
                />
                Closed beta · 2026
              </span>
            </div>
          </FadeIn>

          <FadeIn className="lg:col-span-5 lg:flex lg:justify-end">
            <NudgeShowcase />
          </FadeIn>
        </div>

        {/* mono spec strip */}
        <FadeIn>
          <dl className="mt-20 grid grid-cols-2 gap-y-8 border-y border-neutral-950/15 py-8 sm:grid-cols-4">
            <div>
              <dt className="eyebrow text-neutral-500">Install</dt>
              <dd className="mt-2 font-mono tabular text-2xl font-medium tracking-tight text-neutral-950">
                1 line
              </dd>
            </div>
            <div>
              <dt className="eyebrow text-neutral-500">Setup time</dt>
              <dd className="mt-2 font-mono tabular text-2xl font-medium tracking-tight text-neutral-950">
                &lt; 10 min
              </dd>
            </div>
            <div>
              <dt className="eyebrow text-neutral-500">Backend changes</dt>
              <dd className="mt-2 font-mono tabular text-base font-medium leading-snug text-neutral-950">
                none required
              </dd>
            </div>
            <div>
              <dt className="eyebrow text-neutral-500">Works with</dt>
              <dd className="mt-2 font-mono tabular text-base font-medium leading-snug text-neutral-950">
                any web app
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
      label: 'Users keep asking the same thing',
      body:
        "Your support inbox is full of 'how do I…' for flows you already built. The product knows. The user can't find it.",
    },
    {
      label: 'Onboarding feels brittle',
      body:
        'Every new feature means rewriting the tour. The hardcoded checklist is already out of date.',
    },
    {
      label: 'Docs are stale before they ship',
      body:
        'You write the article, the UI changes, the screenshots lie. The next user finds the old one in Google.',
    },
    {
      label: 'Activation drops off mid-flow',
      body:
        "Funnel data shows where they leave. It doesn't tell you what they were trying to do when they got there.",
    },
  ]

  return (
    <section className="mt-32 sm:mt-40 lg:mt-52">
      <Container>
        <SectionHead
          kicker="When this matters"
          title="If your users get stuck where the product already has the answer."
          dek="Nudge is for teams whose interface is rich, whose flows are real, and whose users still email support to ask where the button is."
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
                  style={{ '--hover-color': NUDGE_BLUE }}
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
      title: 'Drop in the script',
      body:
        'One tag in your app. No SDK rewrite, no auth changes, no backend work. It runs entirely on top of what you already shipped.',
    },
    {
      title: 'Nudge maps your UI',
      body:
        'On first visit, it indexes the elements, labels, and routes a user can reach. It learns your app the way a new hire would.',
    },
    {
      title: 'Users ask in plain language',
      body:
        '"How do I export?" "Where do I change my plan?" Anything they would have typed into search or sent to support.',
    },
    {
      title: 'Nudge points and walks',
      body:
        'It highlights the right element, captions what to click, and waits for the user to do it before moving on. One step at a time.',
    },
  ]

  return (
    <section id="how-it-works" className="mt-32 sm:mt-40 lg:mt-52">
      <Container>
        <SectionHead
          kicker="How it works"
          title="From question to next click — in seconds."
          dek="Nudge sits on top of your live product. It listens, points, and walks any user through any flow you've already built."
        />

        <FadeInStagger faster>
          <ol className="mt-16 grid grid-cols-1 gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <FadeIn as="li" key={step.title} className="group">
                <div className="flex items-baseline gap-3 border-b border-neutral-950/15 pb-3 transition-colors group-hover:border-[color:var(--accent)]"
                  style={{ '--accent': NUDGE_BLUE }}
                >
                  <span
                    className="font-mono tabular text-5xl font-medium tracking-tight text-neutral-950 transition-colors sm:text-6xl group-hover:text-[color:var(--accent)]"
                    style={{ '--accent': NUDGE_BLUE }}
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

const ANALYTICS_QUESTIONS = [
  { q: 'How do I export to CSV?', asks: 142, pct: 84, alert: null },
  {
    q: "Where's billing?",
    asks: 98,
    pct: 41,
    alert: 'abandons at settings → billing',
  },
  { q: 'Invite a teammate', asks: 67, pct: 92, alert: null },
  {
    q: 'Cancel subscription',
    asks: 41,
    pct: 12,
    alert: 'no walkthrough exists yet',
  },
]

function NudgeAnalyticsPanel() {
  return (
    <div className="rounded-md border border-neutral-950/15 bg-white">
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-neutral-950/10 px-5 py-3">
        <span className="eyebrow text-neutral-500">
          Top questions · last 7 days
        </span>
        <div className="flex items-baseline gap-5 font-mono tabular text-sm text-neutral-500">
          <span>
            <span className="font-medium text-neutral-950">348</span> asks
          </span>
          <span>
            <span className="font-medium text-neutral-950">62%</span> resolved
          </span>
        </div>
      </div>
      <ul role="list">
        {ANALYTICS_QUESTIONS.map((row, i) => (
          <li
            key={i}
            className="grid grid-cols-12 items-center gap-x-4 gap-y-1 border-t border-neutral-950/5 px-5 py-3.5 first:border-t-0"
          >
            <div className="col-span-12 sm:col-span-7">
              <p className="font-mono text-sm text-neutral-950">&ldquo;{row.q}&rdquo;</p>
              {row.alert && (
                <p
                  className="mt-1 font-mono text-xs"
                  style={{ color: NUDGE_BLUE }}
                >
                  ↳ {row.alert}
                </p>
              )}
            </div>
            <div className="col-span-3 font-mono tabular text-sm text-neutral-700 sm:col-span-2">
              {row.asks} asks
            </div>
            <div className="col-span-9 flex items-center gap-2 sm:col-span-3">
              <span className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-neutral-100">
                <span
                  className="absolute inset-y-0 left-0 rounded-full"
                  style={{
                    width: `${row.pct}%`,
                    background: NUDGE_BLUE,
                    opacity: row.alert ? 0.55 : 1,
                  }}
                />
              </span>
              <span
                className={`w-9 text-right font-mono tabular text-xs font-medium tracking-tight ${
                  row.alert ? 'text-neutral-500' : 'text-neutral-950'
                }`}
              >
                {row.pct}%
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
          title="Less guessing. Less typing. Less support."
          dek="Three things drop into place the day Nudge goes live."
        />

        <div className="mt-16 grid grid-cols-1 gap-y-14 lg:grid-cols-12 lg:gap-x-16">
          <FadeIn className="lg:col-span-7">
            <ul className="space-y-2">
              {[
                {
                  n: '01',
                  title: 'A search bar that always knows the answer',
                  body:
                    "Cmd-K anywhere in your product. Users type what they're trying to do. Nudge takes them there.",
                },
                {
                  n: '02',
                  title: 'Walkthroughs that update themselves',
                  body:
                    'When the UI changes, the highlights move with it. No tour rewrites, no broken screenshots, no QA on every release.',
                },
                {
                  n: '03',
                  title: 'A log of what users were trying to do',
                  body:
                    'Every question becomes a data point. The verbs behind your funnel — which flows users want, where they drop off, and which paths your product never built.',
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
                      <NudgeAnalyticsPanel />
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </FadeIn>

          <FadeIn className="lg:col-span-5 lg:flex lg:items-start lg:justify-end lg:pt-2">
            <NudgeShowcase />
          </FadeIn>
        </div>
      </Container>
    </section>
  )
}

function WhyNudge() {
  const items = [
    {
      n: '01',
      headline: 'It explains the product you already built.',
      body:
        'No content team. No new training set. The walkthrough is the UI itself, narrated as the user moves.',
    },
    {
      n: '02',
      headline: 'It survives every release.',
      body:
        "Move the button, rename the page, restructure the menu — Nudge re-indexes and the walkthrough still works. That's the whole point.",
    },
  ]

  return (
    <section className="mt-32 sm:mt-40 lg:mt-52">
      <Container>
        <SectionHead
          kicker="Why Nudge"
          title="Most help systems rot the day after launch."
          dek="Nudge stays current because it reads the live product, not a parallel doc set."
        />

        <FadeInStagger faster>
          <ol className="mt-16 grid grid-cols-1 gap-x-16 gap-y-14 lg:grid-cols-2">
            {items.map((item) => (
              <FadeIn as="li" key={item.n}>
                <p
                  className="font-mono tabular text-xl"
                  style={{ color: NUDGE_BLUE }}
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
      title: 'Not a tour builder',
      body:
        "You don't sit in a dashboard dragging tooltips onto a screenshot. Nudge reads the page and points. Setup is a script tag, not a project.",
    },
    {
      title: 'Not a chatbot',
      body:
        "It doesn't tell users what to do. It does it with them — cursor, highlight, step, confirm — so they actually learn the path.",
    },
    {
      title: 'Not a docs site',
      body:
        'No second source of truth to keep in sync. The product is the documentation. Nudge just makes it answerable.',
    },
  ]

  return (
    <section className="mt-32 sm:mt-40 lg:mt-52">
      <Container>
        <SectionHead
          kicker="What Nudge isn't"
          title="Three things people assume — and the actual answer."
          dek="The category is crowded. Here's what makes Nudge structurally different."
        />

        <FadeInStagger faster>
          <ol className="mt-16 grid grid-cols-1 gap-x-12 gap-y-14 lg:grid-cols-3">
            {items.map((it, i) => (
              <FadeIn as="li" key={it.title} className="group">
                <div className="flex items-baseline gap-3 border-b border-neutral-950/15 pb-3">
                  <span
                    className="font-mono tabular text-4xl font-medium tracking-tight text-neutral-500 transition-colors group-hover:text-[color:var(--accent)]"
                    style={{ '--accent': NUDGE_BLUE }}
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
      question: 'Do we need to instrument every element?',
      answer:
        'No. Nudge reads the live DOM and the routes a user can reach. You can optionally annotate critical elements for stability, but the default behaviour is zero-config.',
    },
    {
      question: 'What if our UI changes?',
      answer:
        'Nudge re-indexes on each load. As long as the labels, semantics, or accessibility tree of an element remain recognisable, the walkthrough keeps working through redesigns.',
    },
    {
      question: 'Where does it run?',
      answer:
        'The overlay runs entirely client-side in the user\'s browser. The indexer and language model run on our infra. Your customer data never leaves the page.',
    },
    {
      question: 'How is this different from a chatbot?',
      answer:
        "A chatbot tells users what to do, in another window. Nudge takes them through the actual flow, in the actual product, one click at a time. Users learn by doing the thing — not by reading about it.",
    },
    {
      question: 'When can we get it?',
      answer:
        'Closed beta is rolling through 2026. Early-access partners get prioritised onboarding and pricing locked in for the first year.',
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
      price: 'Free · 60 days',
      priceNote: 'For closed-beta partners',
      description:
        'Drop Nudge into one product. Co-built onboarding, weekly check-ins, and pricing locked in for the first year.',
      features: [
        'Up to 1 product surface',
        'Unlimited walkthroughs',
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
        'Production install across your app. Usage-based billing on resolved questions, not seats.',
      features: [
        'Unlimited end-users and walkthroughs',
        'Question log + funnel integration',
        'Custom branding and theming',
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
        'Self-hosted indexer, custom retention, dedicated SRE. For regulated environments and high-volume products.',
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
          title="Pay for answered questions, not seats."
          dek="Nudge gets cheaper per user as your product gets clearer. The incentive sits on the right side."
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
                    style={{ background: NUDGE_BLUE }}
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
                        style={{ color: NUDGE_BLUE }}
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
                      plan.featured ? { background: NUDGE_BLUE } : undefined
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
  title: 'Nudge — In-app walkthroughs that explain themselves',
  description:
    'Nudge is an overlay that lives inside your product. Users ask in plain language; Nudge highlights the right elements and walks them through, step by step.',
  alternates: { canonical: '/nudge' },
}

export default function NudgePage() {
  return (
    <>
      <Intro />
      <WhenThisMatters />
      <HowItWorks />
      <WhatYouGet />
      <WhyNudge />
      <Differentiation />
      <FaqSection />
      <Pricing />

      <ContactCTA />
    </>
  )
}
