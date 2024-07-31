import { Blockquote } from '@/components/Blockquote'
import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { GridList, GridListItem } from '@/components/GridList'
import { GridPattern } from '@/components/GridPattern'
import { List, ListItem } from '@/components/List'
import { PageIntro } from '@/components/PageIntro'
import { SectionIntro } from '@/components/SectionIntro'
import { StylizedImage } from '@/components/StylizedImage'
import { TagList, TagListItem } from '@/components/TagList'
import imageLaptop from '@/images/laptop.jpg'
import imageMeeting from '@/images/meeting.jpg'
import imageWhiteboard from '@/images/whiteboard.jpg'

function Section({ title, image, children }) {
  return (
    <Container className="group/section [counter-increment:section]">
      <div className="lg:flex lg:items-center lg:justify-end lg:gap-x-8 lg:group-even/section:justify-start xl:gap-x-20">
        <div className="flex justify-center">
          <FadeIn className="w-[33.75rem] flex-none lg:w-[45rem]">
            <StylizedImage
              {...image}
              sizes="(min-width: 1024px) 41rem, 31rem"
              className="justify-center lg:justify-end lg:group-even/section:justify-start"
            />
          </FadeIn>
        </div>
        <div className="mt-12 lg:mt-0 lg:w-[37rem] lg:flex-none lg:group-even/section:order-first">
          <FadeIn>
            <div
              className="font-display text-base font-semibold before:text-neutral-300 before:content-['/_'] after:text-neutral-950 after:content-[counter(section,decimal-leading-zero)]"
              aria-hidden="true"
            />
            <h2 className="mt-2 font-display text-3xl font-medium tracking-tight text-neutral-950 sm:text-4xl">
              {title}
            </h2>
            <div className="mt-6">{children}</div>
          </FadeIn>
        </div>
      </div>
    </Container>
  )
}

function Discover() {
  return (
    <Section title="Discover" image={{ src: imageWhiteboard }}>
      <div className="space-y-6 text-base text-neutral-600">
        <p>
          We work closely with our clients to understand their{' '}
          <strong className="font-semibold text-neutral-950">needs and goals</strong>, embedding ourselves in their everyday operations to understand
          what makes their business tick.

          Our team conducts in-depth consultations with key stakeholders to identify use cases and performs thorough assessments of business processes.
        </p>
        <p>
          Once the full audit is complete, we report back with a comprehensive{' '}
          <strong className="font-semibold text-neutral-950">plan</strong> on how to effectively implement them.
        </p>
      </div>

      <h3 className="mt-12 font-display text-base font-semibold text-neutral-950">
        Included in this phase
      </h3>
      <TagList className="mt-4">
        <TagListItem>Feasibility studies</TagListItem>
        <TagListItem>Employee surveys</TagListItem>
        <TagListItem>Proofs-of-concept</TagListItem>
      </TagList>
    </Section>
  )
}

function Build() {
  return (
    <Section title="Build" image={{ src: imageLaptop, shape: 1 }}>
      <div className="space-y-6 text-base text-neutral-600">
        <p>
          Based on the discovery phase, we develop a comprehensive roadmap for each product and work diligently towards delivery. The roadmap outlines clear technical steps and timelines to ensure a structured and efficient project progression.
        </p>
        <p>
          Each client is assigned a dedicated key account manager to maintain open lines of communication and provide regular updates on the project&apos;s progress. They serve as a liaison between the client and the development team, ensuring all inquiries and feedback are addressed promptly.
        </p>
        <p>
          Our account managers are committed to timely and responsive communication, ensuring clients are well-informed and involved throughout the project&apos;s lifecycle. This approach fosters transparency and builds confidence in our development process.
        </p>
      </div>
    </Section>
  );
}

function Deliver() {
  return (
    <Section title="Deliver" image={{ src: imageMeeting, shape: 2 }}>
      <div className="space-y-6 text-base text-neutral-600">
        <p>
          During the Build phase, we meticulously review and adapt to any changes in{' '}
          <strong className="font-semibold text-neutral-950">
            requirements
          </strong>
          , ensuring that the project timeline and budget are adjusted accordingly for optimal outcomes. Our dedicated development time is utilized efficiently to create high-quality, impactful features.
        </p>
      </div>

      <h3 className="mt-12 font-display text-base font-semibold text-neutral-950">
        Included in this phase
      </h3>
      <List className="mt-8">
        <ListItem title="Testing">
          Our projects undergo rigorous testing to ensure high quality and reliability.
        </ListItem>
        <ListItem title="Infrastructure">
          We utilize top-tier infrastructure to ensure optimal performance and reliability.
        </ListItem>
        <ListItem title="Support">
          We provide comprehensive support, maintaining essential services and ensuring continuous operational efficiency.
        </ListItem>
      </List>
    </Section>
  );
}

function Values() {
  return (
    <div className="relative mt-24 pt-24 sm:mt-32 sm:pt-32 lg:mt-40 lg:pt-40">
      <div className="absolute inset-x-0 top-0 -z-10 h-[884px] overflow-hidden rounded-t-4xl bg-gradient-to-b from-neutral-50">
        <GridPattern
          className="absolute inset-0 h-full w-full fill-neutral-100 stroke-neutral-950/5 [mask-image:linear-gradient(to_bottom_left,white_40%,transparent_50%)]"
          yOffset={-270}
        />
      </div>

      <SectionIntro
        eyebrow="Our values"
        title="Balancing reliability and innovation"
      >
      <p>
        We aim to stay at the forefront of emerging trends and technologies, balancing innovation with the stability of proven solutions. Our commitment to core values guides us in selecting the best tools for each project, ensuring reliability and performance.
      </p>
      </SectionIntro>

      <Container className="mt-24">
        <GridList>
          <GridListItem title="Meticulous">
            Our meticulous approach begins with customizing our templates to incorporate your logo and branding, ensuring a seamless fit with your identity.
          </GridListItem>
          <GridListItem title="Efficient">
            We pride ourselves on consistently meeting deadlines, leveraging our extensive experience and pre-developed resources to deliver projects promptly.
          </GridListItem>
          <GridListItem title="Adaptable">
            We understand that every business has unique needs, and we tailor our solutions to fit those requirements effectively.
          </GridListItem>
          <GridListItem title="Honest">
            We maintain transparency in all our processes, ensuring our clients are well-informed at every step.
          </GridListItem>
          <GridListItem title="Loyal">
            We foster long-term relationships with our clients, providing ongoing support and value beyond the initial delivery.
          </GridListItem>
          <GridListItem title="Innovative">
            We continuously evolve with the technological landscape, actively seeking new and innovative solutions to incorporate into our projects.
          </GridListItem>
        </GridList>
      </Container>
    </div>
  )
}

export const metadata = {
  title: 'Our Process',
  description:
    'We believe in delivering practical solutions that clients can use to address real-world, impactful issues.',
}

export default function Process() {
  return (
    <>
      <PageIntro eyebrow="Our process" title="How we work">
        <p>
          We believe in delivering practical solutions that clients can use to address real-world, impactful issues.
        </p>
      </PageIntro>

      <div className="mt-24 space-y-24 [counter-reset:section] sm:mt-32 sm:space-y-32 lg:mt-40 lg:space-y-40">
        <Discover />
        <Build />
        <Deliver />
      </div>

      <Values />

      <ContactSection />
    </>
  )
}
