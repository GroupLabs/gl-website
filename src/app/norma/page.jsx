import { Button } from '@/components/Button'
import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { Faqs } from '@/components/Faqs'
import { NormaShowcase } from '@/components/NormaShowcase'
import { SectionHead } from '@/components/SectionHead'

const NORMA_AMBER = '#B45309'

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

function NormaBackdrop() {
  // Atmospheric backdrop: amber spotlight + horizontal "table row" lines.
  // The rows echo Norma's tabular subject matter — distinct from Nudge's
  // dot field and Tessera's tile lattice.
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute -top-24 bottom-0 left-0 right-0 -z-10"
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 55% at 78% 14%, rgba(180,83,9,0.13), transparent 60%), radial-gradient(ellipse 60% 45% at 14% 92%, rgba(180,83,9,0.08), transparent 65%)',
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(to bottom, rgba(180,83,9,0.14) 1px, transparent 1px)',
          backgroundSize: '100% 26px',
          maskImage:
            'radial-gradient(ellipse at center, black 0%, transparent 78%)',
          WebkitMaskImage:
            'radial-gradient(ellipse at center, black 0%, transparent 78%)',
          opacity: 0.6,
        }}
      />
    </div>
  )
}

function Intro() {
  return (
    <section className="relative isolate">
      <NormaBackdrop />
      <Container className="pt-24 sm:pt-28 lg:pt-36">
        <FadeIn>
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-b border-neutral-950/15 pb-3 eyebrow text-neutral-500">
            <span className="flex items-center gap-3">
              <span
                className="block h-1.5 w-1.5 rounded-full"
                style={{ background: NORMA_AMBER }}
              />
              <span className="text-neutral-950">Norma</span>
              <span className="opacity-50">/</span>
              <span>A product from GroupLabs</span>
            </span>
            <span>Automated feature engineering</span>
          </div>
        </FadeIn>

        <div className="mt-14 grid grid-cols-1 gap-x-12 gap-y-16 lg:mt-20 lg:grid-cols-12 lg:items-start">
          <FadeIn className="lg:col-span-7">
            <h1 className="font-display text-5xl font-medium leading-[1.04] tracking-tight text-neutral-950 [text-wrap:balance] sm:text-6xl lg:text-[5.25rem] lg:leading-[1.0]">
              Stop hand-crafting features.{' '}
              <span style={{ color: NORMA_AMBER }}>Search</span> for them.
            </h1>

            <p className="mt-8 max-w-xl text-lg leading-relaxed text-neutral-700">
              Norma treats preprocessing as a search-to-optimize problem.
              Every transform, encoding, and binning choice is a candidate
              pipeline. Each pipeline is scored by 5-fold XGBoost
              cross-validation. The best one wins.
            </p>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-neutral-700">
              Point it at a table. Name the target. Get back a
              model-ready dataset and the recipe that produced it.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Button
                href="https://norma.grouplabs.ca"
                className="text-white hover:opacity-90"
                style={{ background: NORMA_AMBER }}
              >
                Try Norma
              </Button>
              <Button href="#how-it-works" variant="outline">
                See it run →
              </Button>
              <span className="ml-2 inline-flex items-center gap-2 eyebrow text-neutral-500">
                <span
                  className="h-1.5 w-1.5 animate-pulse-dot rounded-full"
                  style={{ background: NORMA_AMBER }}
                />
                v1.0 · released
              </span>
            </div>
          </FadeIn>

          <FadeIn className="lg:col-span-5 lg:flex lg:justify-end">
            <NormaShowcase />
          </FadeIn>
        </div>

        {/* mono spec strip */}
        <FadeIn>
          <dl className="mt-20 grid grid-cols-2 gap-y-8 border-y border-neutral-950/15 py-8 sm:grid-cols-4">
            <div>
              <dt className="eyebrow text-neutral-500">Eval engine</dt>
              <dd className="mt-2 font-mono tabular text-base font-medium leading-snug text-neutral-950">
                XGBoost · 5-fold CV
              </dd>
            </div>
            <div>
              <dt className="eyebrow text-neutral-500">Search space</dt>
              <dd className="mt-2 font-mono tabular text-2xl font-medium tracking-tight text-neutral-950">
                10⁶+
              </dd>
            </div>
            <div>
              <dt className="eyebrow text-neutral-500">Output</dt>
              <dd className="mt-2 font-mono tabular text-base font-medium leading-snug text-neutral-950">
                Parquet + recipe
              </dd>
            </div>
            <div>
              <dt className="eyebrow text-neutral-500">Works with</dt>
              <dd className="mt-2 font-mono tabular text-base font-medium leading-snug text-neutral-950">
                any tabular data
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
      label: 'You write the same preprocessing every quarter',
      body:
        'Log the price, target-encode the country, bin the age. Your repos rhyme. The intuition is shared but never tested against a search.',
    },
    {
      label: 'Feature engineering takes longer than modelling',
      body:
        'XGBoost is a one-liner. Getting to the inputs that make it work is two weeks. The bottleneck moved a long time ago.',
    },
    {
      label: 'You suspect a better encoding exists',
      body:
        "You'd try mean-encoding with smoothing, or splines on tenure, or a ratio feature. There was never time to A/B every variant against CV.",
    },
    {
      label: 'Pipelines drift between notebook and production',
      body:
        'The training transform was eyeballed in a cell. The serving transform was reimplemented in Python. The scores never quite line up.',
    },
  ]

  return (
    <section className="mt-32 sm:mt-40 lg:mt-52">
      <Container>
        <SectionHead
          kicker="When this matters"
          title="If your features are the bottleneck and your intuition is the limit."
          dek="Norma is for teams whose data is messy, whose target is clear, and whose preprocessing is held together by convention."
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
                  style={{ '--hover-color': NORMA_AMBER }}
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
      title: 'Point at a table',
      body:
        'A Parquet file, a warehouse query, a CSV. Norma reads the schema, samples the rows, and infers types.',
    },
    {
      title: 'Name the target',
      body:
        'One column. Classification or regression. Norma picks the right metric (AUC, RMSE, log-loss) and locks the folds.',
    },
    {
      title: 'Norma searches the pipeline space',
      body:
        'It proposes candidate pipelines (encodings, scalers, bins, ratios, interactions) and scores each with 5-fold XGBoost CV. Bad branches die early.',
    },
    {
      title: 'Export the winner',
      body:
        'You get the model-ready dataset and the recipe that built it. Same recipe runs at training and at serving. No drift.',
    },
  ]

  return (
    <section id="how-it-works" className="mt-32 sm:mt-40 lg:mt-52">
      <Container>
        <SectionHead
          kicker="How it works"
          title="Search beats intuition at the long tail of features."
          dek="Norma frames preprocessing as optimisation. The objective is held-out CV score. Every choice is a coordinate in the search space."
        />

        <FadeInStagger faster>
          <ol className="mt-16 grid grid-cols-1 gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <FadeIn as="li" key={step.title} className="group">
                <div
                  className="flex items-baseline gap-3 border-b border-neutral-950/15 pb-3 transition-colors group-hover:border-[color:var(--accent)]"
                  style={{ '--accent': NORMA_AMBER }}
                >
                  <span
                    className="font-mono tabular text-5xl font-medium tracking-tight text-neutral-950 transition-colors sm:text-6xl group-hover:text-[color:var(--accent)]"
                    style={{ '--accent': NORMA_AMBER }}
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

const RECIPE_LINES = [
  { tag: 'numeric', op: 'log1p(price)', delta: '+0.011' },
  { tag: 'numeric', op: 'box-cox(tenure)', delta: '+0.004' },
  { tag: 'category', op: 'target_enc(country, smoothing=20, cv=5)', delta: '+0.018' },
  { tag: 'category', op: 'freq_enc(plan)', delta: '+0.002' },
  { tag: 'binning', op: 'bin(age, 7, strategy=quantile)', delta: '+0.006' },
  { tag: 'ratio', op: 'price / (tenure + 1)', delta: '+0.009' },
  { tag: 'interact', op: 'plan × country', delta: '+0.003' },
]

function RecipePanel() {
  return (
    <div className="rounded-md border border-neutral-950/15 bg-white">
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-neutral-950/10 px-5 py-3">
        <span className="eyebrow text-neutral-500">
          Winning recipe · churn_q3.parquet
        </span>
        <div className="flex items-baseline gap-5 font-mono tabular text-sm text-neutral-500">
          <span>
            <span className="font-medium text-neutral-950">7</span> steps
          </span>
          <span>
            CV AUC{' '}
            <span
              className="font-medium"
              style={{ color: NORMA_AMBER }}
            >
              0.872 ± 0.007
            </span>
          </span>
        </div>
      </div>
      <ul role="list">
        {RECIPE_LINES.map((row, i) => (
          <li
            key={i}
            className="grid grid-cols-12 items-center gap-x-4 gap-y-1 border-t border-neutral-950/5 px-5 py-3 first:border-t-0"
          >
            <div className="col-span-3 sm:col-span-2">
              <span
                className="rounded-sm px-1.5 py-[1px] font-mono text-[10px] font-semibold uppercase tracking-wider"
                style={{ background: 'rgba(180,83,9,0.10)', color: NORMA_AMBER }}
              >
                {row.tag}
              </span>
            </div>
            <p className="col-span-7 truncate font-mono text-sm text-neutral-950 sm:col-span-8">
              {row.op}
            </p>
            <div className="col-span-2 text-right font-mono tabular text-xs text-neutral-700">
              {row.delta}
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
          title="A dataset, a recipe, and a leaderboard you can read."
          dek="Three artefacts come out of every search."
        />

        <div className="mt-16 grid grid-cols-1 gap-y-14 lg:grid-cols-12 lg:gap-x-16">
          <FadeIn className="lg:col-span-7">
            <ul className="space-y-2">
              {[
                {
                  n: '01',
                  title: 'A model-ready dataset',
                  body:
                    'Parquet out, leakage-safe by construction. All target encodings are fit per fold; all imputers learn on the train side. Drop it straight into your trainer.',
                },
                {
                  n: '02',
                  title: 'A reproducible recipe',
                  body:
                    "Every transform, every parameter, every seed. The recipe is the pipeline — load it at serving time and you get the same features for the same row.",
                },
                {
                  n: '03',
                  title: 'A leaderboard with provenance',
                  body:
                    'Every trial scored, every CV fold logged, every feature attributed. You can read why the winner won and where the second-best fell off.',
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
                      <RecipePanel />
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </FadeIn>

          <FadeIn className="lg:col-span-5 lg:flex lg:items-start lg:justify-end lg:pt-2">
            <NormaShowcase />
          </FadeIn>
        </div>
      </Container>
    </section>
  )
}

function WhyNorma() {
  const items = [
    {
      n: '01',
      headline: 'The objective is the score on data you held out.',
      body:
        'Five-fold cross-validation, stratified, with target encodings fit inside the fold. If a feature wins, it wins on data the model never saw. No leakage, no story.',
    },
    {
      n: '02',
      headline: 'The recipe is the pipeline.',
      body:
        "Reproducibility is a property of the artefact, not the notebook. The recipe Norma exports is what runs at serving — same code path, same parameters, same row-level features.",
    },
  ]

  return (
    <section className="mt-32 sm:mt-40 lg:mt-52">
      <Container>
        <SectionHead
          kicker="Why Norma"
          title="Most preprocessing is folklore. Norma makes it falsifiable."
          dek="Two principles hold the system up."
        />

        <FadeInStagger faster>
          <ol className="mt-16 grid grid-cols-1 gap-x-16 gap-y-14 lg:grid-cols-2">
            {items.map((item) => (
              <FadeIn as="li" key={item.n}>
                <p
                  className="font-mono tabular text-xl"
                  style={{ color: NORMA_AMBER }}
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
      title: 'Not AutoML',
      body:
        "Norma stops at the dataset. The model is yours — XGBoost, a linear baseline, a neural net, whatever. We optimise the inputs, you own the architecture.",
    },
    {
      title: 'Not a feature store',
      body:
        "A feature store serves features you've already defined. Norma generates new ones from raw columns and proves which ones move the metric.",
    },
    {
      title: 'Not a notebook helper',
      body:
        "No autocomplete, no in-cell suggestions. Norma runs as a non-interactive search — submit a job, get a leaderboard, ship the winner.",
    },
  ]

  return (
    <section className="mt-32 sm:mt-40 lg:mt-52">
      <Container>
        <SectionHead
          kicker="What Norma isn't"
          title="Three things people assume — and the actual answer."
          dek="The space is crowded with adjacent tools. Here's what makes Norma structurally different."
        />

        <FadeInStagger faster>
          <ol className="mt-16 grid grid-cols-1 gap-x-12 gap-y-14 lg:grid-cols-3">
            {items.map((it, i) => (
              <FadeIn as="li" key={it.title} className="group">
                <div className="flex items-baseline gap-3 border-b border-neutral-950/15 pb-3">
                  <span
                    className="font-mono tabular text-4xl font-medium tracking-tight text-neutral-500 transition-colors group-hover:text-[color:var(--accent)]"
                    style={{ '--accent': NORMA_AMBER }}
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
      question: 'Why XGBoost as the evaluator?',
      answer:
        'XGBoost is a strong, fast, well-calibrated baseline on tabular data. Using it as the scorer means a feature that helps Norma is a feature that helps almost any tree-based or linear model downstream. The signal generalises.',
    },
    {
      question: 'How do you avoid leakage in the search?',
      answer:
        'Every transform that learns from the target (target encoding, mean encoding, smoothed counts) is fit inside the cross-validation fold, never on the full set. The recipe Norma exports preserves the same fold-aware logic at serving time.',
    },
    {
      question: 'How big can my data be?',
      answer:
        'The search runs on a representative sample by default — typically a few hundred thousand rows is enough to score pipelines reliably. The winning recipe then runs over the full dataset to produce the final artefact.',
    },
    {
      question: 'Can I constrain the search space?',
      answer:
        "Yes. Whitelist or blacklist transforms, cap the number of generated features, fix specific encodings for compliance. The default search is broad; the constrained search is a flag.",
    },
    {
      question: 'Where does it run?',
      answer:
        'Norma runs as a job — locally, in your VPC, or as a hosted service. The data never leaves the boundary you point it at. The output is a Parquet file and a serialisable recipe.',
    },
  ]

  return (
    <section className="mt-32 sm:mt-40 lg:mt-52">
      <Container>
        <SectionHead
          kicker="Common questions"
          title="What teams ask before they wire it in."
        />
        <Faqs items={items} className="mt-12" />
      </Container>
    </section>
  )
}

function Pricing() {
  const plans = [
    {
      name: 'Open',
      price: 'Free',
      priceNote: 'Self-hosted, single-node',
      description:
        'The Norma engine, the recipe runtime, and the CLI. Run it on your laptop or on a single box.',
      features: [
        'Full search engine and recipe runtime',
        'Local datasets up to a few million rows',
        'Recipe import / export',
        'Community support',
      ],
      cta: 'Start with Open',
    },
    {
      name: 'Team',
      price: 'From $399/mo',
      priceNote: 'For data and ML teams',
      description:
        'Hosted search workers, shared leaderboards, and warehouse connectors. Run searches in parallel and share recipes across the team.',
      features: [
        'Parallel search workers',
        'Snowflake / BigQuery / Postgres connectors',
        'Shared leaderboards and recipe registry',
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
        'Self-hosted in your VPC, audit-grade lineage, SSO. For regulated environments and high-volume warehouses.',
      features: [
        'Self-hosted or VPC-isolated',
        'Audit lineage on every recipe',
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
          title="Pay for the search, not the seat."
          dek="The engine is open. You pay when you want it to run faster, share more, or sit inside your perimeter."
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
                    style={{ background: NORMA_AMBER }}
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
                        style={{ color: NORMA_AMBER }}
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
                      plan.featured ? { background: NORMA_AMBER } : undefined
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
  title: 'Norma — Automated feature engineering for tabular ML',
  description:
    'Norma searches the space of preprocessing pipelines and scores each with 5-fold XGBoost cross-validation. Output: a model-ready dataset and a reproducible recipe.',
  alternates: { canonical: '/norma' },
}

export default function NormaPage() {
  return (
    <>
      <Intro />
      <WhenThisMatters />
      <HowItWorks />
      <WhatYouGet />
      <WhyNorma />
      <Differentiation />
      <FaqSection />
      <Pricing />

      <ContactSection />
    </>
  )
}
