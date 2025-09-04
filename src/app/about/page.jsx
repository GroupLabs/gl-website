import Image from 'next/image'

import { Border } from '@/components/Border'
import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { GridList, GridListItem } from '@/components/GridList'
import { PageIntro } from '@/components/PageIntro'
import { PageLinks } from '@/components/PageLinks'
import { SectionIntro } from '@/components/SectionIntro'
import { StatList, StatListItem } from '@/components/StatList'
import { loadArticles } from '@/lib/mdx'

function Culture() {
  return (
    <div className="mt-24 bg-neutral-950 py-24 sm:mt-32 lg:mt-40 lg:py-32">
      <SectionIntro
        eyebrow="Our culture"
        title="Life is about doing what you love."
        invert
      >
        <p>Our team all share the same core tenets.</p>
      </SectionIntro>
      <Container className="mt-16">
        <GridList>
          <GridListItem title="Trust" invert>
            We establish strong relationships by consistently delivering
            high-quality work and meeting our commitments.
          </GridListItem>
          <GridListItem title="Hard work" invert>
            Our team’s dedication and loyalty are reflected in their continuous
            commitment and remarkable achievements.
          </GridListItem>
          <GridListItem title="Perseverance" invert>
            We support our team through every challenge, ensuring a
            compassionate and understanding work environment.
          </GridListItem>
        </GridList>
      </Container>
    </div>
  )
}

const team = [
  {
    title: 'Leadership',
    people: [
      {
        name: 'Eugene Paulia',
        role: 'Founder',
        image: '/images/team/eugene-paulia.jpg',
      },
      {
        name: 'Noel Thomas',
        role: 'Founder',
        image: '/images/team/noel-thomas.jpg',
      },
      {
        name: 'Sam Moses',
        role: 'Intern',
        image: '/images/team/sam-moses.png',
      },
    ],
  },
]

function Team() {
  return (
    <Container className="mt-24 sm:mt-32 lg:mt-40">
      <div className="space-y-24">
        {team.map((group) => (
          <FadeInStagger key={group.title}>
            <Border as={FadeIn} />
            <div className="grid grid-cols-1 gap-6 pt-12 sm:pt-16 lg:grid-cols-4 xl:gap-8">
              <FadeIn>
                <h2 className="font-display text-2xl font-semibold text-neutral-950">
                  {group.title}
                </h2>
              </FadeIn>
              <div className="lg:col-span-3">
                <ul
                  role="list"
                  className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8"
                >
                  {group.people.map((person) => (
                    <li key={person.name}>
                      <FadeIn>
                        <div className="group relative h-96 overflow-hidden rounded-3xl bg-neutral-100">
                          <Image
                            alt={person.name}
                            src={person.image}
                            fill
                            sizes="(min-width: 1024px) 24rem, (min-width: 640px) 50vw, 100vw"
                            className="object-cover grayscale transition duration-500 motion-safe:group-hover:scale-105"
                          />
                          <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black to-black/0 to-40% p-6">
                            <p className="font-display text-base/6 font-semibold tracking-wide text-white">
                              {person.name}
                            </p>
                            <p className="mt-2 text-sm text-white">
                              {person.role}
                            </p>
                          </div>
                        </div>
                      </FadeIn>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </FadeInStagger>
        ))}
      </div>
    </Container>
  )
}

export const metadata = {
  title: 'About Us',
  description:
    'Learn about GroupLabs, a Calgary-based team of machine learning and data science consultants dedicated to client success.',
  alternates: { canonical: '/about' },
}

export default async function About() {
  let blogArticles = (await loadArticles()).slice(0, 2)

  const today = new Date()
  const startOfYear = new Date(today.getFullYear(), 0, 1)
  const daysSinceStartOfYear = Math.floor(
    (today - startOfYear) / (1000 * 60 * 60 * 24),
  )

  return (
    <>
      <PageIntro eyebrow="About us" title="We build practical solutions">
        <p>
          We put our clients and their goals at the center of everything we do.
          We&apos;re a team of doers, and get-doners.
        </p>
        <div className="mt-10 max-w-2xl space-y-6 text-base">
          <p>
            GroupLabs was started by two friends who noticed that machine
            learning is still not accessible to everyone. Since the beginning,
            we have been committed to doing things differently by building
            tools, and expert networks to support the community.
          </p>
        </div>
      </PageIntro>
      <Container className="mt-16">
        <StatList>
          <StatListItem value="12+" label="Industry experts" />
          <StatListItem value="30%" label="Cost savings (on average)" />
          <StatListItem
            value={daysSinceStartOfYear}
            label="Days of customer satisfaction this year"
          />
        </StatList>
      </Container>

      <Culture />

      <Team />

      <PageLinks
        className="mt-24 sm:mt-32 lg:mt-40"
        title="From the blog"
        intro="Our team of loves to share what they learn. We want to do our part to make the world a better place."
        pages={blogArticles}
      />

      <ContactSection />
    </>
  )
}
