import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/Button'

import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { List, ListItem } from '@/components/List'
import { SectionIntro } from '@/components/SectionIntro'
import { StylizedImage } from '@/components/StylizedImage'
import { Testimonial } from '@/components/Testimonial'
import logoSuncor from '@/images/clients/suncor-energy/suncor.png'
import logoHBI from '@/images/clients/hbi/hbi.png'
import logoCenovus from '@/images/clients/cenovus/cenovus.png'
import logoUcalgary from '@/images/clients/ucalgary/ucalgary.png'
import imageLaptop from '@/images/laptop.jpg'
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
      <div className="p-8 rounded-4xl bg-neutral-950 sm:py-12">
        <FadeIn className="flex items-center gap-x-8">
          <h2 className="text-center font-display text-sm font-semibold tracking-wider text-white sm:text-left">
            Our engineers have made an impact on the world
          </h2>
          <div className="h-px flex-auto bg-neutral-800" />
        </FadeIn>
        <FadeInStagger faster>
          <ul
            role="list"
            className="mt-10 grid grid-cols-2 gap-x-8 gap-y-10 lg:grid-cols-4"
          >
            {clients.map(([client, logo]) => (
              <li key={client} className='flex items-center justify-center'>
                <FadeIn>
                  <Image src={logo} height={50} alt={client} unoptimized />
                </FadeIn>
              </li>
            ))}
          </ul>
        </FadeInStagger>
      </div>
    </Container>
  )
}

function Products() {
  return (
    <Container className="mt-24 sm:mt-32 lg:mt-40">
      <div className="rounded-4xl bg-neutral-950 sm:py-12 p-8">
        <FadeIn className="flex items-center gap-x-8">
          <h2 className="text-center font-display text-sm font-semibold tracking-wider text-white sm:text-left">
            We built a set of world class tools along the way
          </h2>
          <div className="h-px flex-auto bg-neutral-800" />
        </FadeIn>
        <FadeInStagger faster>
          <ul
            role="list"
            className="mt-10 grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-3"
          >
            <FadeIn>
              <div className="text-left">
                <div className="flex items-center">
                  <span className="text-white font-mono text-lg font-bold tracking-wider block">
                    Bridge
                  </span>
                  <a
                    href="https://bridgeproductpage.netlify.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-1 text-neutral-400 hover:text-neutral-200"
                  >
                    <svg width="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M20 14a1 1 0 0 0-1 1v3.077c0 .459-.022.57-.082.684a.363.363 0 0 1-.157.157c-.113.06-.225.082-.684.082H5.923c-.459 0-.571-.022-.684-.082a.363.363 0 0 1-.157-.157c-.06-.113-.082-.225-.082-.684L4.999 5.5a.5.5 0 0 1 .5-.5l3.5.005a1 1 0 1 0 .002-2L5.501 3a2.5 2.5 0 0 0-2.502 2.5v12.577c0 .76.083 1.185.32 1.627.223.419.558.753.977.977.442.237.866.319 1.627.319h12.154c.76 0 1.185-.082 1.627-.319.419-.224.753-.558.977-.977.237-.442.319-.866.319-1.627V15a1 1 0 0 0-1-1zm-2-9.055v-.291l-.39.09A10 10 0 0 1 15.36 5H14a1 1 0 1 1 0-2l5.5.003a1.5 1.5 0 0 1 1.5 1.5V10a1 1 0 1 1-2 0V8.639c0-.757.086-1.511.256-2.249l.09-.39h-.295a10 10 0 0 1-1.411 1.775l-5.933 5.932a1 1 0 0 1-1.414-1.414l5.944-5.944A10 10 0 0 1 18 4.945z" fill="currentColor"/></svg>
                  </a>
                  <span className={`ml-2 inline-flex items-center rounded-md bg-green-400/10 px-2 py-1 text-xs font-medium text-green-400 ring-1 ring-inset ring-green-400/20`}>
                    v1.4.14
                  </span>
                </div>
                <p className="text-neutral-400 text-sm mt-2">
                  Find what you need before you even know it. Combines multiple modalities, novel search algorithms, and outperforms single state-of-the-art retrievers in popular benchmarks.
                </p>
              </div>
            </FadeIn>

            <FadeIn>
              <div className="text-left">
                <div className="flex items-baseline">
                  <span className="text-white font-mono text-lg font-bold tracking-wider block">
                    Mesh [WIP]
                  </span>
                  <span className={`ml-2 inline-flex items-center rounded-md bg-yellow-400/10 px-2 py-1 text-xs font-medium text-yellow-400 ring-1 ring-inset ring-yellow-400/20`}>
                    v0.2.71
                  </span>
                </div>
                <p className="text-neutral-400 text-sm mt-2">
                  Integrate various compute backends for federated paradigms. Designed especially for tensor operations and integrates into frameworks like PyTorch, GGML, and TinyGrad.
                </p>
              </div>
            </FadeIn>

            <FadeIn>
              <div className="text-left">
                <div className="flex items-baseline">
                  <span className="text-white font-mono text-lg font-bold tracking-wider block">
                    Tell [WIP]
                  </span>
                  <span className={`ml-2 inline-flex items-center rounded-md bg-yellow-400/10 px-2 py-1 text-xs font-medium text-yellow-400 ring-1 ring-inset ring-yellow-400/20`}>
                    v0.3.14
                  </span>
                </div>
                <p className="text-neutral-400 text-sm mt-2">
                  Bring Large Language Models into production grade applications. Handles provider management, prompt optimization, adaptive model selection, and so forth.
                </p>
              </div>
            </FadeIn>
          </ul>
        </FadeInStagger>
      </div>
    </Container>
  );
}

function CaseStudies({ caseStudies }) {
  return (
    <>
      <SectionIntro
        title="Here's a little bit about us"
        className="mt-24 sm:mt-32 lg:mt-40"
      >
        <p>
          A few humble brags never hurt anyone, right?
        </p>
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
                      className="h-16 w-16"
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

function Services() {
  return (
    <>
      <Container className="mt-24 sm:mt-32 lg:mt-40">
        <div className="mt-16 lg:flex lg:flex-row">
          <div className="lg:mt-0 lg:w-1/2 lg:min-w-[33rem] lg:pl-4 bg-black p-16 rounded-4xl">
            <FadeIn>
              <SectionIntro
                eyebrow="Services"
                title="We're here to help"
                className="text-white"
                invert
              >
                <p>
                  We offer a range of services designed to elevate your business. Here&apos;s a sneak peek of how we can help you achieve your goals.
                </p>
              </SectionIntro>
            </FadeIn>
          </div>
          <List className="lg:mt-0 lg:min-w-[33rem] lg:px-16 mt-16">
            <ListItem title="Custom AI Solutions">
              We understand the unique needs of each client. We create tailored AI solutions, including NLP, computer vision, and predictive analytics, to meet your specific business challenges.
            </ListItem>
            <ListItem title="Model Development">
              Our team of expert data scientists and machine learning engineers specialize in developing state-of-the-art models using frameworks like TensorFlow, PyTorch, and Scikit-learn.
            </ListItem>
            <ListItem title="Data Preparation and Visualization">
              We clean, normalize, and transform raw data into meaningful and usable formats, to ensure high-quality datasets for model training and clear visualizations.
            </ListItem>
            <ListItem title="Deployment">
              At the end of the day, we&apos;re practictioners with experience in deploying machine learning models into production, offering scalable and efficient solutions with various cloud platforms.
            </ListItem>
          </List>
        </div>
      </Container>
    </>
  )
}

export const metadata = {
  description:
    'We are a team of scientists and engineers that build practical solutions grounded in experience and foundational research.',
}

export default async function Home() {
  let caseStudies = (await loadCaseStudies()).slice(0, 3)

  return (
    <>
      <Container className="mt-24 sm:mt-32 md:mt-56">
        <FadeIn className="max-w-3xl">
          <h1 className="font-display font-medium tracking-tight text-neutral-950 [text-wrap:balance] sm:text-5xl">
            Machine Learning Studio
          </h1>
          <p className="mt-6 text-xl text-neutral-600">
            We are a team of scientists and engineers that build practical solutions grounded in experience and foundational research.
          </p>
        </FadeIn>
      </Container>

      <Clients />

      <CaseStudies caseStudies={caseStudies} />

      <Products />

      {/* <Testimonial
        className="mt-24 sm:mt-32 lg:mt-40"
        client={{ name: 'Phobia', logo: logoPhobiaDark }}
      >
        The team at Studio went above and beyond with our onboarding, even
        finding a way to access the user’s microphone without triggering one of
        those annoying permission dialogs.
      </Testimonial> */}

      <Services />

      <ContactSection />
    </>
  )
}
