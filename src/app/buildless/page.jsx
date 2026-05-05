import { Button } from '@/components/Button'
import { ContactCTA } from '@/components/ContactCTA'
import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { Faqs } from '@/components/Faqs'
import { HeroSnapshot } from '@/components/HeroSnapshot'
import { SectionHead } from '@/components/SectionHead'

function CheckIcon({ className }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path
        fillRule="evenodd"
        d="M16.704 5.295a1 1 0 0 1 .001 1.414l-7.5 7.5a1 1 0 0 1-1.415 0l-3.5-3.5a1 1 0 1 1 1.414-1.414L8.5 12.086l6.79-6.79a1 1 0 0 1 1.414 0z"
        clipRule="evenodd"
      />
    </svg>
  )
}

function Intro() {
  return (
    <section className="relative isolate overflow-hidden bg-white">
      <Container className="pt-24 sm:pt-28 lg:pt-36">
        <FadeIn>
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-b border-neutral-950/15 pb-3 eyebrow text-neutral-500">
            <span className="flex items-center gap-3">
              <span className="block h-1.5 w-1.5 rounded-full bg-orange-600" />
              <span className="text-neutral-950">BuildLess</span>
              <span className="opacity-50">/</span>
              <span>A practice from GroupLabs</span>
            </span>
            <span>Pre-build product validation</span>
          </div>
        </FadeIn>

        <div className="mt-14 grid grid-cols-1 gap-x-12 gap-y-12 lg:mt-20 lg:grid-cols-12">
          <FadeIn className="lg:col-span-8">
            <h1 className="font-display text-5xl font-medium leading-[1.04] tracking-tight text-neutral-950 [text-wrap:balance] sm:text-6xl lg:text-[5rem] lg:leading-[1.02]">
              Before you build,{' '}
              <span className="text-neutral-500">know it works.</span>
            </h1>
          </FadeIn>

          <FadeIn className="lg:col-span-4 lg:pt-3">
            <p className="text-lg leading-relaxed text-neutral-700">
              We turn an idea into a live test in days, watch real users meet
              it, and end the week with a clear build-or-kill decision.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-neutral-700">
              Not a prototype. Not a deliverable. A decision, in writing,
              with the data behind it.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/contact">Talk through an idea</Button>
              <Button href="#pricing" variant="outline">See pricing →</Button>
            </div>
          </FadeIn>
        </div>

        {/* mono spec strip */}
        <FadeIn>
          <dl className="mt-20 grid grid-cols-2 gap-y-8 border-y border-neutral-950/15 py-8 sm:grid-cols-4">
            <div>
              <dt className="eyebrow text-neutral-500">Sprint length</dt>
              <dd className="mt-2 font-mono tabular text-2xl font-medium tracking-tight text-neutral-950">1–2 wks</dd>
            </div>
            <div>
              <dt className="eyebrow text-neutral-500">Typical price</dt>
              <dd className="mt-2 font-mono tabular text-2xl font-medium tracking-tight text-neutral-950">$8k–$15k</dd>
            </div>
            <div>
              <dt className="eyebrow text-neutral-500">Output</dt>
              <dd className="mt-2 font-mono tabular text-base font-medium leading-snug text-neutral-950">live test +<br/>recommendation</dd>
            </div>
            <div>
              <dt className="eyebrow text-neutral-500">Decision</dt>
              <dd className="mt-2 font-mono tabular text-base font-medium leading-snug text-neutral-950">build · iterate · kill</dd>
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
      label: 'About to build something',
      body: "You're about to commit weeks of engineering, and you're not sure the idea actually works.",
    },
    {
      label: 'Onboarding or activation underperforms',
      body: 'You have hypotheses for why, but no clean way to test which change moves the needle.',
    },
    {
      label: 'Multiple ideas, no clear priority',
      body: 'A backlog of bets, no consensus, no signal. You need to know which one to commit to first.',
    },
    {
      label: 'You want real user signal',
      body: 'Before you commit engineering time. Behavior data, not opinions in a meeting.',
    },
  ]

  return (
    <section className="mt-32 sm:mt-40 lg:mt-52">
      <Container>
        <SectionHead
          kicker="When this matters"
          title="If you're about to build, pause."
          dek="BuildLess is for teams who want real user signal before they commit weeks of engineering. If any of these read as familiar, let's talk."
        />

        <FadeInStagger faster>
          <ol className="mt-16 grid grid-cols-1 gap-y-2 lg:grid-cols-12">
            {triggers.map((t, i) => (
              <FadeIn
                as="li"
                key={t.label}
                className="group col-span-12 grid grid-cols-12 items-baseline gap-x-6 gap-y-3 border-t border-neutral-950/10 py-8 transition-colors hover:border-neutral-950/40 sm:py-10"
              >
                <span className="col-span-2 font-mono tabular text-3xl font-medium tracking-tight text-neutral-500 transition-colors group-hover:text-orange-600 sm:col-span-1 sm:text-4xl">
                  {String(i + 1).padStart(2, '0')}
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
      title: 'Define the risk',
      body: "We start by scoping the riskiest assumption — the thing you can't answer from a doc, a Loom, or another internal debate. That's what we test.",
    },
    {
      title: 'Build the smallest test',
      body: 'A lightweight version in days, plugged into your product or a standalone flow. Just enough to put the assumption in front of real users.',
    },
    {
      title: 'Observe real behavior',
      body: 'Events, funnels, session replay so you see exactly where users convert, drop off, or get confused.',
    },
    {
      title: 'Make the call',
      body: 'Build, iterate, or kill. Every sprint ends with a written recommendation backed by behavior data, not vibes.',
    },
  ]

  return (
    <section className="mt-32 sm:mt-40 lg:mt-52">
      <Container>
        <SectionHead
          kicker="How it works"
          title="From idea to decision in days."
          dek="We scope your riskiest assumption, build a lightweight test, and track real user behavior to give you a clear answer."
        />

        <FadeInStagger faster>
          <ol className="mt-16 grid grid-cols-1 gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <FadeIn as="li" key={step.title} className="group">
                <div className="flex items-baseline gap-3 border-b border-neutral-950/15 pb-3">
                  <span className="font-mono tabular text-5xl font-medium tracking-tight text-neutral-950 transition-colors group-hover:text-orange-600 sm:text-6xl">
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

function WhatYouGet() {
  return (
    <section className="mt-32 sm:mt-40 lg:mt-52">
      <Container>
        <SectionHead
          kicker="What you get"
          title="A live test, real data, a clear call."
          dek="Not a pitch deck. Not a prototype. A working test in front of real users, with the data to make a decision."
        />

        <div className="mt-16 grid grid-cols-1 gap-y-14 lg:grid-cols-12 lg:gap-x-16">
          <FadeIn className="lg:col-span-7">
            <ul className="space-y-2">
              {[
                {
                  n: '01',
                  title: 'A live test with real user data',
                  body: 'Not a mockup. An actual experience your users used. We build it, ship it, and watch what happens.',
                },
                {
                  n: '02',
                  title: "Clear metrics on what worked and what didn't",
                  body: 'Conversion, engagement, drop-off points, session replay. The full record of what users did.',
                },
                {
                  n: '03',
                  title: 'A recommendation, in writing',
                  body: 'Build, iterate, or kill — with the reasoning behind it. You walk away with a decision, not a debrief.',
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
                </li>
              ))}
            </ul>
          </FadeIn>

          <FadeIn className="lg:col-span-5 lg:flex lg:items-start lg:justify-end lg:pt-2">
            <HeroSnapshot />
          </FadeIn>
        </div>
      </Container>
    </section>
  )
}

function WhyBuildLess() {
  const items = [
    {
      n: '01',
      headline: 'Days, not months.',
      body: 'Most tests go live within one to two weeks. We scope tightly and ship fast.',
    },
    {
      n: '02',
      headline: 'End to end.',
      body: 'We handle the build, the instrumentation, and the analysis. You focus on the decision.',
    },
  ]

  return (
    <section className="mt-32 sm:mt-40 lg:mt-52">
      <Container>
        <SectionHead
          kicker="Why BuildLess"
          title="Most teams waste weeks building the wrong version."
          dek="We help you find out what actually works before you commit."
        />

        <FadeInStagger faster>
          <ol className="mt-16 grid grid-cols-1 gap-x-16 gap-y-14 lg:grid-cols-2">
            {items.map((item) => (
              <FadeIn as="li" key={item.n}>
                <p className="font-mono tabular text-xl text-orange-600">{item.n}</p>
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
      title: 'Faster than building in-house',
      body: 'We scope and ship tests in days, not sprints. Your engineering team stays focused on the roadmap while we run the test.',
    },
    {
      title: 'More than just code',
      body: 'We help you decide what to test, how to test it, and what the results actually mean.',
    },
    {
      title: 'Every test ends with a clear call',
      body: 'Build, iterate, or kill. You walk away knowing what to do next, not just what we shipped.',
    },
  ]

  return (
    <section className="mt-32 sm:mt-40 lg:mt-52">
      <Container>
        <SectionHead
          kicker="What makes us different"
          title="Built for decisions, not deliverables."
          dek="We're not a dev shop. We're a product learning partner that combines speed with structured testing."
        />

        <FadeInStagger faster>
          <ol className="mt-16 grid grid-cols-1 gap-x-12 gap-y-14 lg:grid-cols-3">
            {items.map((it, i) => (
              <FadeIn as="li" key={it.title} className="group">
                <div className="flex items-baseline gap-3 border-b border-neutral-950/15 pb-3">
                  <span className="font-mono tabular text-4xl font-medium tracking-tight text-neutral-500 transition-colors group-hover:text-orange-600">
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
      question: 'Why not just build it ourselves?',
      answer:
        'You can, but it usually means pulling engineers off the roadmap for weeks, only to find out the idea needs major changes. Most teams test ideas by overbuilding them. We focus on the smallest version that still gives you a clear answer.',
    },
    {
      question: 'How is this different from prototyping?',
      answer:
        'Prototypes show how something could work. We go further: we put a working version in front of real users, track their behavior, and give you data to make a decision. It is not a demo. It is a live test.',
    },
    {
      question: 'What kind of results do we get?',
      answer:
        'Real user data: conversion rates, engagement patterns, drop-off points, and session recordings. Plus a clear recommendation on whether to build, iterate, or kill the idea.',
    },
    {
      question: 'How fast is fast?',
      answer:
        'Most sprints go from kickoff to live test in under two weeks. Some ideas can be in front of users within days. It depends on complexity, but speed is the whole point.',
    },
  ]

  return (
    <section className="mt-32 sm:mt-40 lg:mt-52">
      <Container>
        <SectionHead kicker="Common questions" title="Things we hear before a sprint." />
        <Faqs items={items} className="mt-12" />
      </Container>
    </section>
  )
}

function Pricing() {
  const plans = [
    {
      name: 'Validation Sprint',
      price: '1–2 weeks',
      priceNote: 'Typical: $8k–$15k',
      description: 'Test one high-risk idea and get a clear build-or-kill decision.',
      features: [
        'One focused test scoped to your riskiest assumption',
        'We handle the build so you can focus on the decision',
        'Behavior tracking — events, funnels, session replay',
        'Results interpretation and a clear recommendation',
      ],
      cta: 'Talk through an idea',
    },
    {
      name: 'Experiment Program',
      price: 'Ongoing',
      priceNote: 'Recommended for product teams',
      description: 'For teams running multiple tests across their roadmap.',
      features: [
        'Everything in Validation Sprint',
        'Multiple concurrent tests',
        'Prioritization support for the highest-risk ideas',
        'Ongoing learning with regular check-ins',
        'Dedicated project lead',
      ],
      cta: 'Plan a program',
      featured: true,
    },
    {
      name: 'Custom',
      price: 'Flexible',
      priceNote: 'For larger or specific scopes',
      description: 'For teams with specific constraints or larger-scale needs.',
      features: [
        'Custom scoping and timelines',
        'Integration with your existing analytics and tooling',
        'Embedded team support',
        'Enterprise security and compliance requirements',
      ],
      cta: 'Get in touch',
    },
  ]

  return (
    <section id="pricing" className="mt-32 sm:mt-40 lg:mt-52">
      <Container>
        <SectionHead
          kicker="Pricing"
          title="Three shapes of engagement."
          dek="A single wrong build can cost two to six weeks of engineering time. A validation sprint helps you avoid that."
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
                  plan.featured ? 'bg-neutral-950 text-white lg:-my-px' : ''
                }`}
              >
                {plan.featured && (
                  <span className="absolute -top-3 left-10 inline-block bg-orange-600 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.18em] font-semibold text-white">
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
                        className={`mt-1 h-3.5 w-3.5 flex-shrink-0 ${
                          plan.featured ? 'text-orange-500' : 'text-orange-600'
                        }`}
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
                    invert={plan.featured}
                    variant={plan.featured ? 'solid' : 'outline'}
                  >
                    {plan.cta}
                    <span aria-hidden="true" className="ml-1.5">→</span>
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
  title: 'BuildLess — Pre-build product validation',
  description:
    'BuildLess turns your idea into a live test in days. Track real user behavior. Get a clear build-or-kill decision before you commit weeks of engineering.',
  alternates: { canonical: '/buildless' },
}

export default function BuildLessPage() {
  return (
    <>
      <Intro />
      <WhenThisMatters />
      <HowItWorks />
      <WhatYouGet />
      <WhyBuildLess />
      <Differentiation />
      <FaqSection />
      <Pricing />

      <ContactCTA />
    </>
  )
}
