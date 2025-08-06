import Image from 'next/image'
import Link from 'next/link'

import { Border } from '@/components/Border'
import { Button } from '@/components/Button'
import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { PageIntro } from '@/components/PageIntro'
import { formatDate } from '@/lib/formatDate'
import { loadArticles } from '@/lib/mdx'

export const metadata = {
  title: 'Blog',
  description:
    'Stay up-to-date with machine learning, data science, and AI insights from our Calgary experts.',
  alternates: { canonical: '/blog' },
}

export default async function Blog() {
  let articles = await loadArticles()
  let [featured, ...rest] = articles

  return (
    <>
      <PageIntro eyebrow="Blog" title="What we're learning">
        <p>
          Stay up-to-date with our latest insights in computational research.
        </p>
      </PageIntro>

      <Container className="mt-24 sm:mt-32 lg:mt-40">
        <section>
          <FadeIn key={featured.href}>
            <article>
              <Border className="pt-16">
                <div className="relative">
                  <Image
                    alt={featured.title}
                    {...featured.image}
                    className="h-96 w-full rounded-3xl object-cover"
                    priority
                  />
                  <div className="mt-10">
                    <h2 className="font-display text-3xl font-semibold text-neutral-950">
                      <Link href={featured.href}>{featured.title}</Link>
                    </h2>
                    <time
                      dateTime={featured.date}
                      className="mt-2 block text-sm text-neutral-950"
                    >
                      {formatDate(featured.date)}
                    </time>
                    <p className="mt-6 max-w-2xl text-base text-neutral-600">
                      {featured.description}
                    </p>
                    <Button
                      href={featured.href}
                      aria-label={`Read more: ${featured.title}`}
                      className="mt-8"
                    >
                      Read more
                    </Button>
                  </div>
                </div>
              </Border>
            </article>
          </FadeIn>
        </section>

        {rest.length > 0 && (
          <section className="mt-24">
            <FadeInStagger className="grid grid-cols-1 gap-x-8 gap-y-20 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((article) => (
                <FadeIn key={article.href}>
                  <article>
                    <Border className="pt-8">
                      <Image
                        alt={article.title}
                        {...article.image}
                        className="h-48 w-full rounded-2xl object-cover"
                      />
                      <h3 className="mt-6 text-base font-semibold text-neutral-950">
                        <Link href={article.href}>{article.title}</Link>
                      </h3>
                      <time
                        dateTime={article.date}
                        className="order-first block text-sm text-neutral-600"
                      >
                        {formatDate(article.date)}
                      </time>
                      <p className="mt-2 text-sm text-neutral-600">
                        {article.description}
                      </p>
                    </Border>
                  </article>
                </FadeIn>
              ))}
            </FadeInStagger>
          </section>
        )}
      </Container>

      <ContactSection />
    </>
  )
}
