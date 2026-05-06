import Link from 'next/link'

import {
  CostLedger,
  HeroReadout,
  PhasePipeline,
  SampleSprintCarousel,
  ScanRule,
  SectionMark,
} from '@/components/BuildLessSections'
import { ContactCTA } from '@/components/ContactCTA'
import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { Faqs } from '@/components/Faqs'

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

function PrimaryCTA({ href, children, className = '' }) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-neutral-950 transition hover:bg-neutral-200 ${className}`}
    >
      {children}
    </Link>
  )
}

function GhostCTA({ href, children, className = '' }) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/[0.02] px-5 py-2.5 text-sm font-semibold text-white transition hover:border-orange-500/60 hover:text-orange-500 ${className}`}
    >
      {children}
    </Link>
  )
}

// ─── Sections ────────────────────────────────────────────────────────────────

function Intro() {
  return (
    <section className="relative isolate overflow-hidden">
      <Container className="pt-24 sm:pt-28 lg:pt-36">
        <FadeIn>
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-b border-white/15 pb-3 eyebrow text-neutral-400">
            <span className="flex items-center gap-3">
              <span className="block h-1.5 w-1.5 rounded-full bg-orange-500" />
              <span className="text-white">BuildLess</span>
              <span className="opacity-50">/</span>
              <span>A practice from GroupLabs</span>
            </span>
            <span>Build Decision Sprint</span>
          </div>
        </FadeIn>

        <div className="mt-14 grid grid-cols-1 gap-x-12 gap-y-14 lg:mt-20 lg:grid-cols-12 lg:items-end">
          <FadeIn className="lg:col-span-8">
            <h1 className="font-display text-5xl font-medium leading-[1.02] tracking-tight text-white [text-wrap:balance] sm:text-7xl lg:text-[6.25rem] lg:leading-[0.96]">
              <span className="block wdth-wide">Before you build,</span>
              <span className="block text-neutral-400 wdth-default">
                know it matters.
              </span>
            </h1>

            <FadeIn>
              <ScanRule className="mt-10 max-w-xl" />
            </FadeIn>

            <p className="mt-8 max-w-xl text-lg leading-relaxed text-neutral-200 sm:text-xl">
              We turn product ideas into live tests in days, put them in front
              of real users, and end with a clear build-or-kill decision
              grounded in evidence.
            </p>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-neutral-400">
              Not a prototype. Not a deliverable. A decision, in writing,
              with the data behind it.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <PrimaryCTA href="/contact">
                Talk through an idea
                <span aria-hidden="true">→</span>
              </PrimaryCTA>
              <GhostCTA href="#pricing">See pricing</GhostCTA>
            </div>
          </FadeIn>

          <FadeIn className="lg:col-span-4">
            <HeroReadout />
          </FadeIn>
        </div>

        {/* mono spec strip */}
        <FadeIn>
          <dl className="mt-20 grid grid-cols-2 gap-y-8 border-y border-white/15 py-8 sm:grid-cols-4">
            <div>
              <dt className="eyebrow text-neutral-400">Sprint length</dt>
              <dd className="mt-2 font-mono tabular text-2xl font-medium tracking-tight text-white">
                1–2 wks
              </dd>
            </div>
            <div>
              <dt className="eyebrow text-neutral-400">Starting at</dt>
              <dd className="mt-2 font-mono tabular text-2xl font-medium tracking-tight text-white">
                $8k
              </dd>
            </div>
            <div>
              <dt className="eyebrow text-neutral-400">Output</dt>
              <dd className="mt-2 font-mono tabular text-base font-medium leading-snug text-white">
                live test +
                <br />
                recommendation
              </dd>
            </div>
            <div>
              <dt className="eyebrow text-neutral-400">Decision</dt>
              <dd className="mt-2 font-mono tabular text-base font-medium leading-snug text-white">
                build · iterate · kill
              </dd>
            </div>
          </dl>
        </FadeIn>
      </Container>
    </section>
  )
}

function CostLedgerSection() {
  return (
    <section className="mt-32 sm:mt-40 lg:mt-52">
      <Container>
        <FadeIn>
          <SectionMark n="01" label="The cost of being wrong" />
        </FadeIn>

        <div className="mt-10 grid grid-cols-1 gap-x-12 gap-y-10 lg:grid-cols-12 lg:items-end">
          <FadeIn className="lg:col-span-7">
            <h2 className="font-display text-4xl font-medium leading-[1.04] tracking-tight text-white sm:text-5xl lg:text-6xl">
              <span className="wdth-wide">A wrong build</span>{' '}
              <span className="text-neutral-400">
                costs more than a right one ever did.
              </span>
            </h2>
          </FadeIn>
          <FadeIn className="lg:col-span-5">
            <p className="text-lg leading-relaxed text-neutral-300">
              Most teams test ideas by overbuilding them. We compress that
              work into a focused sprint, so the only thing you commit to is
              the answer.
            </p>
          </FadeIn>
        </div>

        <FadeIn>
          <div className="mt-14">
            <CostLedger />
          </div>
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
        <FadeIn>
          <SectionMark n="02" label="When this matters" />
        </FadeIn>

        <div className="mt-10 grid grid-cols-1 gap-x-12 gap-y-8 lg:grid-cols-12">
          <FadeIn className="lg:col-span-7">
            <h2 className="font-display text-4xl font-medium leading-[1.04] tracking-tight text-white sm:text-5xl lg:text-6xl">
              <span className="wdth-wide">If you&rsquo;re about to build,</span>{' '}
              <span className="text-neutral-400 wdth-narrow">pause.</span>
            </h2>
          </FadeIn>
          <FadeIn className="lg:col-span-5">
            <p className="text-lg leading-relaxed text-neutral-300">
              BuildLess is for teams who want real user signal before they
              commit weeks of engineering. If any of these read as familiar,
              let&rsquo;s talk.
            </p>
          </FadeIn>
        </div>

        <FadeInStagger faster>
          <ol className="mt-16 grid grid-cols-1 gap-y-2">
            {triggers.map((t, i) => (
              <FadeIn
                as="li"
                key={t.label}
                className="group grid grid-cols-12 items-baseline gap-x-6 gap-y-3 border-t border-white/10 py-8 transition-colors hover:border-white/40 sm:py-10"
              >
                <span className="col-span-2 font-mono tabular text-3xl font-medium tracking-tight text-neutral-500 transition-colors group-hover:text-orange-500 sm:col-span-1 sm:text-4xl">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="col-span-10 font-display text-xl font-medium tracking-tight text-white sm:col-span-5 sm:text-2xl lg:text-3xl">
                  {t.label}
                </h3>
                <p className="col-span-12 text-base leading-relaxed text-neutral-300 sm:col-span-6 sm:text-lg">
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
  return (
    <section className="mt-32 sm:mt-40 lg:mt-52">
      <Container>
        <FadeIn>
          <SectionMark n="03" label="How it works" />
        </FadeIn>

        <div className="mt-10 grid grid-cols-1 gap-x-12 gap-y-8 lg:grid-cols-12">
          <FadeIn className="lg:col-span-7">
            <h2 className="font-display text-4xl font-medium leading-[1.04] tracking-tight text-white sm:text-5xl lg:text-6xl">
              <span className="wdth-wide">From idea</span>{' '}
              <span className="text-neutral-400">
                to decision in days.
              </span>
            </h2>
          </FadeIn>
          <FadeIn className="lg:col-span-5">
            <p className="text-lg leading-relaxed text-neutral-300">
              We scope your riskiest assumption, build a lightweight test, and
              track real user behavior to give you a clear answer.
            </p>
          </FadeIn>
        </div>

        <FadeIn>
          <div className="mt-16">
            <PhasePipeline />
          </div>
        </FadeIn>
      </Container>
    </section>
  )
}

function WhatYouGet() {
  const items = [
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
      body: 'Build, iterate, or kill, with the reasoning behind it. You walk away with a decision, not a debrief.',
    },
  ]

  return (
    <section className="mt-32 sm:mt-40 lg:mt-52">
      <Container>
        <FadeIn>
          <SectionMark n="04" label="What you get" />
        </FadeIn>

        <div className="mt-10 grid grid-cols-1 gap-x-12 gap-y-8 lg:grid-cols-12">
          <FadeIn className="lg:col-span-7">
            <h2 className="font-display text-4xl font-medium leading-[1.04] tracking-tight text-white sm:text-5xl lg:text-6xl">
              <span className="wdth-wide">A live test,</span>{' '}
              <span className="text-neutral-400">
                real data, a clear call.
              </span>
            </h2>
          </FadeIn>
          <FadeIn className="lg:col-span-5">
            <p className="text-lg leading-relaxed text-neutral-300">
              Not a pitch deck. Not a prototype. A working test in front of
              real users, with the data to make a decision.
            </p>
          </FadeIn>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-y-14 lg:grid-cols-12 lg:gap-x-16">
          <FadeIn className="lg:col-span-7">
            <ul className="space-y-2">
              {items.map((d) => (
                <li
                  key={d.n}
                  className="grid grid-cols-12 items-baseline gap-x-6 gap-y-2 border-t border-white/10 py-7"
                >
                  <span className="col-span-2 font-mono tabular text-2xl font-medium tracking-tight text-neutral-500 sm:col-span-1 sm:text-3xl">
                    {d.n}
                  </span>
                  <h3 className="col-span-10 font-display text-lg font-semibold tracking-tight text-white sm:col-span-5 sm:text-xl">
                    {d.title}
                  </h3>
                  <p className="col-span-12 text-base leading-relaxed text-neutral-300 sm:col-span-6">
                    {d.body}
                  </p>
                </li>
              ))}
            </ul>
          </FadeIn>

          <FadeIn className="lg:col-span-5 lg:flex lg:items-start lg:justify-end lg:pt-2">
            <SampleSprintCarousel />
          </FadeIn>
        </div>
      </Container>
    </section>
  )
}

function PullQuote() {
  return (
    <section className="mt-32 sm:mt-40 lg:mt-52">
      <Container>
        <FadeIn>
          <figure className="relative isolate border-y border-white/15 py-16 sm:py-20 lg:py-28">
            {/* huge orange ornament behind */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-6 left-0 select-none font-display text-[14rem] leading-none text-orange-500/15 sm:text-[20rem]"
            >
              “
            </div>

            <blockquote className="relative">
              <p className="font-display text-3xl font-medium leading-[1.08] tracking-tight text-white [text-wrap:balance] sm:text-5xl lg:text-6xl">
                <span className="wdth-wide">We don&rsquo;t ship pretty mockups.</span>{' '}
                <span className="text-neutral-400">
                  We ship proof.
                </span>
              </p>
            </blockquote>

            <figcaption className="relative mt-10 flex flex-wrap items-baseline gap-x-6 gap-y-2 eyebrow text-neutral-400">
              <span className="text-white">GroupLabs</span>
              <span className="opacity-50">/</span>
              <span>Operating principle 03</span>
              <span className="ml-auto font-mono tabular text-neutral-500">
                est. 2024
              </span>
            </figcaption>
          </figure>
        </FadeIn>
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
      headline: 'Managed end to end.',
      body: 'We own the build, the instrumentation, the analysis, and every bug that surfaces along the way. Your engineers stay on the roadmap. You focus on the decision.',
    },
  ]

  return (
    <section className="mt-32 sm:mt-40 lg:mt-52">
      <Container>
        <FadeIn>
          <SectionMark n="05" label="Why BuildLess" />
        </FadeIn>

        <div className="mt-10 grid grid-cols-1 gap-x-12 gap-y-8 lg:grid-cols-12">
          <FadeIn className="lg:col-span-8">
            <h2 className="font-display text-4xl font-medium leading-[1.04] tracking-tight text-white sm:text-5xl lg:text-6xl">
              <span className="wdth-wide">Most teams waste weeks</span>{' '}
              <span className="text-neutral-400">
                building the wrong version.
              </span>
            </h2>
          </FadeIn>
          <FadeIn className="lg:col-span-4">
            <p className="text-lg leading-relaxed text-neutral-300">
              We help you find out what actually works before you commit.
            </p>
          </FadeIn>
        </div>

        <FadeInStagger faster>
          <ol className="mt-16 grid grid-cols-1 gap-x-16 gap-y-14 lg:grid-cols-2">
            {items.map((item) => (
              <FadeIn as="li" key={item.n}>
                <p className="font-mono tabular text-xl text-orange-500">
                  {item.n}
                </p>
                <h3 className="mt-4 font-display text-3xl font-medium tracking-tight text-white sm:text-4xl lg:text-5xl">
                  {item.headline}
                </h3>
                <p className="mt-5 max-w-md text-lg leading-relaxed text-neutral-300">
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
        <FadeIn>
          <SectionMark n="06" label="What makes us different" />
        </FadeIn>

        <div className="mt-10 grid grid-cols-1 gap-x-12 gap-y-8 lg:grid-cols-12">
          <FadeIn className="lg:col-span-7">
            <h2 className="font-display text-4xl font-medium leading-[1.04] tracking-tight text-white sm:text-5xl lg:text-6xl">
              <span className="wdth-wide">Built for decisions,</span>{' '}
              <span className="text-neutral-400">not deliverables.</span>
            </h2>
          </FadeIn>
          <FadeIn className="lg:col-span-5">
            <p className="text-lg leading-relaxed text-neutral-300">
              We&rsquo;re not a dev shop. We&rsquo;re a product learning partner that
              combines speed with structured testing.
            </p>
          </FadeIn>
        </div>

        <FadeInStagger faster>
          <ol className="mt-16 grid grid-cols-1 gap-x-12 gap-y-14 lg:grid-cols-3">
            {items.map((it, i) => (
              <FadeIn as="li" key={it.title} className="group">
                <div className="flex items-baseline gap-3 border-b border-white/15 pb-3">
                  <span className="font-mono tabular text-4xl font-medium tracking-tight text-neutral-500 transition-colors group-hover:text-orange-500">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="mt-6 font-display text-xl font-semibold tracking-tight text-white sm:text-2xl">
                  {it.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-neutral-300">
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
        'Behavior tracking, events, funnels, session replay',
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
    <section id="pricing" className="mt-32 scroll-mt-24 sm:mt-40 lg:mt-52">
      <Container>
        <FadeIn>
          <SectionMark n="07" label="Pricing" />
        </FadeIn>

        <div className="mt-10 grid grid-cols-1 gap-x-12 gap-y-8 lg:grid-cols-12">
          <FadeIn className="lg:col-span-7">
            <h2 className="font-display text-4xl font-medium leading-[1.04] tracking-tight text-white sm:text-5xl lg:text-6xl">
              <span className="wdth-wide">Three shapes</span>{' '}
              <span className="text-neutral-400">of engagement.</span>
            </h2>
          </FadeIn>
          <FadeIn className="lg:col-span-5">
            <p className="text-lg leading-relaxed text-neutral-300">
              A single wrong build can cost two to six weeks of engineering
              time. A validation sprint helps you avoid that.
            </p>
          </FadeIn>
        </div>

        <FadeInStagger faster>
          <ul
            role="list"
            className="mt-16 grid grid-cols-1 items-stretch gap-x-0 gap-y-10 border-t border-white/15 lg:grid-cols-3 lg:divide-x lg:divide-white/15"
          >
            {plans.map((plan, i) => (
              <FadeIn
                as="li"
                key={plan.name}
                className={`relative flex flex-col px-0 pt-10 lg:px-10 ${
                  plan.featured ? 'bg-white text-neutral-950 lg:-my-px' : ''
                }`}
              >
                {plan.featured && (
                  <span className="absolute -top-3 left-10 inline-block bg-orange-500 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.18em] font-semibold text-white">
                    Recommended
                  </span>
                )}

                <p
                  className={`eyebrow ${
                    plan.featured ? 'text-neutral-500' : 'text-neutral-400'
                  }`}
                >
                  Plan {String(i + 1).padStart(2, '0')}
                </p>
                <h3
                  className={`mt-3 font-display text-2xl font-medium tracking-tight sm:text-3xl ${
                    plan.featured ? 'text-neutral-950' : 'text-white'
                  }`}
                >
                  {plan.name}
                </h3>
                <p
                  className={`mt-6 font-mono tabular text-3xl font-medium tracking-tight sm:text-4xl ${
                    plan.featured ? 'text-neutral-950' : 'text-white'
                  }`}
                >
                  {plan.price}
                </p>
                <p
                  className={`mt-1 text-sm ${
                    plan.featured ? 'text-neutral-500' : 'text-neutral-400'
                  }`}
                >
                  {plan.priceNote}
                </p>
                <p
                  className={`mt-6 text-base leading-relaxed ${
                    plan.featured ? 'text-neutral-700' : 'text-neutral-300'
                  }`}
                >
                  {plan.description}
                </p>

                <ul
                  role="list"
                  className={`mt-8 space-y-3 text-sm leading-relaxed ${
                    plan.featured ? 'text-neutral-700' : 'text-neutral-200'
                  }`}
                >
                  {plan.features.map((f) => (
                    <li key={f} className="flex gap-x-3">
                      <CheckIcon
                        className={`mt-1 h-3.5 w-3.5 flex-shrink-0 ${
                          plan.featured ? 'text-orange-600' : 'text-orange-500'
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
                  {plan.featured ? (
                    <PrimaryCTA
                      href="/contact"
                      className="!bg-neutral-950 !text-white hover:!bg-neutral-800"
                    >
                      {plan.cta}
                      <span aria-hidden="true">→</span>
                    </PrimaryCTA>
                  ) : (
                    <GhostCTA href="/contact">
                      {plan.cta}
                      <span aria-hidden="true">→</span>
                    </GhostCTA>
                  )}
                </div>
              </FadeIn>
            ))}
          </ul>
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
        <FadeIn>
          <SectionMark n="08" label="Common questions" />
        </FadeIn>

        <div className="mt-10 grid grid-cols-1 gap-x-12 gap-y-8 lg:grid-cols-12">
          <FadeIn className="lg:col-span-8">
            <h2 className="font-display text-4xl font-medium leading-[1.04] tracking-tight text-white sm:text-5xl lg:text-6xl">
              <span className="wdth-wide">Things we hear</span>{' '}
              <span className="text-neutral-400">before a sprint.</span>
            </h2>
          </FadeIn>
        </div>

        <Faqs invert items={items} className="mt-12" />
      </Container>
    </section>
  )
}

// ─── Backdrop & page shell ───────────────────────────────────────────────────

export const metadata = {
  title: 'BuildLess — Build Decision Sprint',
  description:
    'BuildLess turns your idea into a live test in days. Track real user behavior. Get a clear build-or-kill decision before you commit weeks of engineering.',
  alternates: { canonical: '/buildless' },
}

function PageBackdrop() {
  return (
    <>
      {/* minor grid · 20px */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.045) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
      />
      {/* major grid · 100px */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,0.085) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.085) 1px, transparent 1px)',
          backgroundSize: '100px 100px',
        }}
      />
      {/* fade grid out toward the bottom so the page resolves into solid black */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            'linear-gradient(to bottom, transparent 0%, transparent 55%, rgba(10,10,10,0.85) 85%, rgb(10,10,10) 100%)',
        }}
      />
      {/* hero glow · top-left orange wash */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[80vh]"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 12% 0%, rgba(249,115,22,0.10), transparent 65%)',
        }}
      />
      {/* second wash · right side, deeper down */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-[55vh] -z-10 h-[70vh]"
        style={{
          background:
            'radial-gradient(ellipse 55% 55% at 85% 30%, rgba(249,115,22,0.07), transparent 65%)',
        }}
      />
    </>
  )
}

export default function BuildLessPage() {
  return (
    <>
      <div className="relative isolate -mt-[5.75rem] overflow-hidden bg-neutral-950 pt-[5.75rem] pb-32 sm:pb-40 lg:pb-52">
        <PageBackdrop />
        <Intro />
        <CostLedgerSection />
        <WhenThisMatters />
        <HowItWorks />
        <WhatYouGet />
        <PullQuote />
        <WhyBuildLess />
        <Differentiation />
        <Pricing />
        <FaqSection />
      </div>

      <ContactCTA />
    </>
  )
}
