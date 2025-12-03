import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/Button'

import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { GridPattern } from '@/components/GridPattern'
import { List, ListItem } from '@/components/List'
import { SectionIntro } from '@/components/SectionIntro'
import { StylizedImage } from '@/components/StylizedImage'
import { Testimonial } from '@/components/Testimonial'
import logoSuncor from '@/images/clients/suncor-energy/suncor.png'
import logoHBI from '@/images/clients/hbi/hbi.png'
import logoCenovus from '@/images/clients/cenovus/cenovus.png'
import logoUcalgary from '@/images/clients/ucalgary/ucalgary.png'
import { loadCaseStudies } from '@/lib/mdx'

const clients = [
  ['Suncor Energy', logoSuncor],
  ['Hotchkiss Brain Institute', logoHBI],
  ['Cenovus Energy', logoCenovus],
  ['University of Calgary', logoUcalgary],
]

function Clients() {
  return (
    <Container className="mt-24 sm:mt-32 lg:mt-40">
      <div className="rounded-4xl bg-neutral-950 p-8 sm:py-12">
        <h2 className="text-center font-display text-sm font-semibold tracking-wider text-white sm:text-left">
          Trusted by engineering teams at
        </h2>
        <div className="h-px flex-auto bg-neutral-800" />
        <ul
          role="list"
          className="mt-10 grid grid-cols-2 gap-x-8 gap-y-10 lg:grid-cols-4"
        >
          {clients.map(([client, logo]) => (
            <li key={client} className="flex items-center justify-center">
              <Image src={logo} height={50} alt={client} unoptimized />
            </li>
          ))}
        </ul>
      </div>
    </Container>
  )
}

function Products() {
  const externalLinkIcon = (
    <svg
      width="16"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20 14a1 1 0 0 0-1 1v3.077c0 .459-.022.57-.082.684a.363.363 0 0 1-.157.157c-.113.06-.225.082-.684.082H5.923c-.459 0-.571-.022-.684-.082a.363.363 0 0 1-.157-.157c-.06-.113-.082-.225-.082-.684L4.999 5.5a.5.5 0 0 1 .5-.5l3.5.005a1 1 0 1 0 .002-2L5.501 3a2.5 2.5 0 0 0-2.502 2.5v12.577c0 .76.083 1.185.32 1.627.223.419.558.753.977.977.442.237.866.319 1.627.319h12.154c.76 0 1.185-.082 1.627-.319.419-.224.753-.558.977-.977.237-.442.319-.866.319-1.627V15a1 1 0 0 0-1-1zm-2-9.055v-.291l-.39.09A10 10 0 0 1 15.36 5H14a1 1 0 1 1 0-2l5.5.003a1.5 1.5 0 0 1 1.5 1.5V10a1 1 0 1 1-2 0V8.639c0-.757.086-1.511.256-2.249l.09-.39h-.295a10 10 0 0 1-1.411 1.775l-5.933 5.932a1 1 0 0 1-1.414-1.414l5.944-5.944A10 10 0 0 1 18 4.945z"
        fill="currentColor"
      />
    </svg>
  )

  const tools = [
    {
      name: 'Tell',
      description:
        'High-throughput LLM gateway with caching, routing, and observability. Production-ready serving infrastructure.',
      version: 'v1.0',
      status: 'released',
    },
    {
      name: 'Atmos',
      description:
        'Multi-cloud orchestration for ML workloads. Seamlessly burst between on-prem and cloud GPU clusters.',
      version: 'v0.9',
      status: 'beta',
    },
    {
      name: 'Tessera',
      description:
        'Secure, lightweight runtime for executing untrusted code in high-performance environments.',
      version: 'v0.8',
      status: 'beta',
    },
    {
      name: 'Norma',
      description:
        'Automated feature engineering and data pipeline optimization for maximizing model performance.',
      version: 'v1.0',
      status: 'released',
      link: 'https://norma.grouplabs.ca',
    },
    {
      name: 'Bridge',
      description:
        'High-performance vector search. Sub-millisecond retrieval at scale with novel multi-modal algorithms.',
      version: 'v1.4.14',
      status: 'released',
      link: 'https://bridgeproductpage.netlify.app/',
    },
    {
      name: 'Mesh',
      description:
        'Distributed compute orchestration. Unified backend for PyTorch, GGML, and TinyGrad across heterogeneous hardware.',
      version: 'v0.2.71',
      status: 'wip',
    },
  ]

  return (
    <Container className="mt-24 sm:mt-32 lg:mt-40">
      <div className="rounded-4xl bg-neutral-950 p-8 sm:py-12">
        <FadeIn className="flex flex-col gap-y-4">
          <h2 className="text-center font-display text-sm font-semibold tracking-wider text-white sm:text-left">
            Internal tools born from production engineering
          </h2>
          <div className="h-px flex-auto bg-neutral-800" />
          <p className="text-sm text-neutral-400">
            These tools are born from real-world ML infrastructure challenges.
            They reflect our depth in performance engineering, distributed
            systems, and production ML.
          </p>
        </FadeIn>
        <FadeInStagger faster>
          <ul
            role="list"
            className="mt-10 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3"
          >
            {tools.map((tool) => (
              <li key={tool.name}>
                <FadeIn>
                  <div className="text-left">
                    <div className="flex items-center">
                      <span className="block font-mono text-lg font-bold tracking-wider text-white">
                        {tool.name}
                        {tool.status === 'wip' ? ' [WIP]' : ''}
                      </span>
                      {tool.link && (
                        <a
                          href={tool.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ml-1 text-neutral-400 hover:text-neutral-200"
                          aria-label={`${tool.name} product page (opens in new tab)`}
                        >
                          {externalLinkIcon}
                        </a>
                      )}
                      <span
                        className={`ml-2 inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${
                          tool.status === 'released'
                            ? 'bg-green-400/10 text-green-400 ring-green-400/20'
                            : tool.status === 'beta'
                            ? 'bg-blue-400/10 text-blue-400 ring-blue-400/20'
                            : 'bg-yellow-400/10 text-yellow-400 ring-yellow-400/20'
                        }`}
                      >
                        {tool.version}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-neutral-400">
                      {tool.description}
                    </p>
                  </div>
                </FadeIn>
              </li>
            ))}
          </ul>
        </FadeInStagger>
      </div>
    </Container>
  )
}

function CaseStudies({ caseStudies }) {
  return (
    <>
      <SectionIntro
        title="Real-world engineering outcomes"
        className="mt-24 sm:mt-32 lg:mt-40"
      >
        <p>A track record of accelerating and scaling ML in production.</p>
      </SectionIntro>
      <Container className="mt-16">
        <FadeInStagger className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {caseStudies.map((caseStudy) => (
            <FadeIn key={caseStudy.href} className="flex">
              <article className="relative flex w-full flex-col rounded-3xl p-6 ring-1 ring-neutral-950/5 transition hover:bg-neutral-50 sm:p-8">
                <h3>
                  <Link href={caseStudy.href}>
                    <span className="absolute inset-0 rounded-3xl" />
                    <Image
                      src={caseStudy.logo}
                      alt={caseStudy.client}
                      className="h-16 w-16 object-contain"
                      unoptimized
                    />
                  </Link>
                </h3>
                <p className="mt-6 flex gap-x-2 text-sm text-neutral-950">
                  <time
                    dateTime={caseStudy.date.split('-')[0]}
                    className="font-semibold"
                  >
                    {caseStudy.date.split('-')[0]}
                  </time>
                  <span className="text-neutral-300" aria-hidden="true">
                    /
                  </span>
                  <span>Case study</span>
                </p>
                <p className="mt-6 font-display text-2xl font-semibold text-neutral-950">
                  {caseStudy.title}
                </p>
                <p className="mt-4 text-base text-neutral-600">
                  {caseStudy.description}
                </p>
              </article>
            </FadeIn>
          ))}
        </FadeInStagger>
      </Container>
    </>
  )
}

function WhoWeHelp() {
  const personas = [
    {
      title: 'Real-Time Robotics',
      description:
        'Enabling faster, more reliable ML perception and autonomy on constrained hardware.',
    },
    {
      title: 'High-Volume Inference',
      description:
        'Reducing latency, increasing throughput, and cutting GPU spend for production ML workloads.',
    },
    {
      title: 'ML Products at Scale',
      description:
        'Building the serving infrastructure needed to deploy and operate models with predictable performance.',
    },
    {
      title: 'Industrial & Edge Vision',
      description:
        'Optimizing CV and sensor pipelines on edge devices for greater speed, stability, and efficiency.',
    },
  ]

  return (
    <Container className="mt-24 sm:mt-32 lg:mt-40">
      <SectionIntro
        eyebrow="Who We Help"
        title="Built for teams shipping ML to production"
      >
        <p>
          If inference cost, latency, or scaling is blocking your roadmap, we
          should talk.
        </p>
      </SectionIntro>
      <FadeInStagger className="mt-16">
        <ul
          role="list"
          className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
        >
          {personas.map((persona) => (
            <FadeIn key={persona.title} as="li" className="flex">
              <div className="flex h-full flex-col rounded-2xl border border-neutral-200 p-8 transition hover:bg-neutral-50">
                <h3 className="font-display text-lg font-semibold text-neutral-950">
                  {persona.title}
                </h3>
                <p className="mt-4 text-sm text-neutral-600">
                  {persona.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </ul>
      </FadeInStagger>
      <FadeIn className="mt-12 text-center">
        <Button href="/contact">Speak With an Engineer</Button>
      </FadeIn>
    </Container>
  )
}

function Services() {
  return (
    <>
      <Container className="mt-24 sm:mt-32 lg:mt-40">
        <div className="mt-16 lg:flex lg:flex-row">
          <div className="rounded-4xl bg-black p-8 sm:p-12 lg:mt-0 lg:w-1/2 lg:min-w-[33rem] lg:p-16 lg:pl-4">
            <FadeIn>
              <SectionIntro
                eyebrow="Services"
                title="ML Infrastructure & Inference Acceleration"
                className="text-white"
                invert
                smaller
              >
                <p className="hidden sm:block">
                  High-performance serving stacks with faster cold starts on
                  serverless GPUs, optimal runtimes, intelligent batching and
                  routing layers, and low-level CUDA or kernel tuning when
                  compilers can't keep up.
                </p>
              </SectionIntro>
            </FadeIn>
          </div>
          <List className="mt-16 lg:mt-0 lg:min-w-[33rem] lg:px-16">
            <ListItem title="Model Optimization">
              We make models smaller, faster, and cheaper through quantization,
              distillation, pruning, and custom kernel or CUDA work when
              compilers fall short. Every improvement is backed by
              interpretable, GPU-level performance tests that clearly show the
              gains.
            </ListItem>
            <ListItem title="Production ML Systems">
              We build reliable, high-throughput ML systems including
              registries, feature stores, serving pipelines, observability, and
              autoscaling. Each system is validated with transparent performance
              metrics and bottleneck analyses so behavior is predictable in
              production.
            </ListItem>
            <ListItem title="Custom Model Development">
              We design and train tailored models when off-the-shelf options
              don’t fit, using PyTorch, JAX, and modern tooling. All results are
              supported by clear, reproducible benchmarks that show measurable
              improvements in speed, accuracy, or efficiency.
            </ListItem>
          </List>
        </div>
      </Container>
    </>
  )
}

export const metadata = {
  title: 'ML Infrastructure & Model Acceleration',
  description:
    'GroupLabs builds scalable ML infrastructure and accelerates model inference. 2–10× faster, 30–70% lower costs. Production-ready ML systems.',
  alternates: { canonical: '/' },
}

export default async function Home() {
  let caseStudies = (await loadCaseStudies()).slice(0, 3)

  return (
    <>
      <div className="relative">
        <GridPattern
          className="absolute inset-x-0 -top-14 -z-10 h-[1000px] w-full fill-neutral-50 stroke-neutral-950/5 [mask-image:linear-gradient(to_bottom_left,white_40%,transparent_50%)]"
          yOffset={-96}
          interactive
        />
        <Container className="mt-24 sm:mt-32 md:mt-56">
          <FadeIn>
            <h1 className="font-display text-4xl font-medium tracking-tight text-neutral-950 [text-wrap:balance] sm:text-5xl">
              We Fix Slow ML Systems.
            </h1>
            <p className="mt-6 text-xl text-neutral-700">
              High-throughput, low-latency ML infrastructure engineered for
              teams that need their models to perform in production.
            </p>
            <p className="mt-4 text-sm font-medium text-neutral-500">
              Faster models → better UX, lower cost, more scale.
            </p>
            <div className="mt-10 flex gap-x-6">
              <Button href="/contact" className="hidden sm:inline-flex">
                Speak With an Engineer
              </Button>
              <Button href="/work" variant="outline">
                Explore Our Work
              </Button>
            </div>
          </FadeIn>
        </Container>
      </div>

      <Clients />

      <WhoWeHelp />

      <Services />

      <CaseStudies caseStudies={caseStudies} />

      <Products />

      <ContactSection />
    </>
  )
}
