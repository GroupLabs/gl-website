"use client"

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { Border } from '@/components/Border'
import { Button } from '@/components/Button'
import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { GridPattern } from '@/components/GridPattern'
import { PageIntro } from '@/components/PageIntro'
import { Badge } from '@/components/ui/badge'
import { formatDate } from '@/lib/formatDate'
import { loadArticles } from '@/lib/mdx'

const articles = await loadArticles()

export const metadata = {
  title: 'Blog',
  description:
    'Stay up-to-date with machine learning, data science, and AI insights from our Calgary experts.',
  alternates: { canonical: '/blog' },
}

function Post({ article }) {
  const isGradient = article.author.color?.startsWith('linear-gradient')
  const imageStyle = isGradient
    ? { background: article.author.color }
    : { backgroundColor: article.author.color }
  const textStyle = isGradient
    ? {
        background: article.author.color,
        WebkitBackgroundClip: 'text',
        color: 'transparent',
      }
    : { color: article.author.color }

  return (
    <article>
      <Border className="pt-16">
        <div className="relative lg:-mx-4 lg:flex lg:justify-end">
          <div className="pt-10 lg:w-2/3 lg:flex-none lg:px-4 lg:pt-0">
            <h2 className="font-display text-2xl font-semibold text-neutral-950">
              <Link href={article.href}>{article.title}</Link>
            </h2>
            <dl className="lg:absolute lg:left-0 lg:top-0 lg:w-1/3 lg:px-4">
              <dt className="sr-only">Published</dt>
              <dd className="absolute left-0 top-0 text-sm text-neutral-950 lg:static">
                <time dateTime={article.date}>{formatDate(article.date)}</time>
              </dd>
              <dt className="sr-only">Author</dt>
              <dd className="mt-6 flex gap-x-4">
                <div className="flex-none rounded-xl p-0.5" style={imageStyle}>
                  <Image
                    alt={article.author.name}
                    {...article.author.image}
                    className="h-12 w-12 rounded-lg object-cover"
                  />
                </div>
                <div className="text-sm" style={textStyle}>
                  <div className="font-semibold">{article.author.name}</div>
                  <div>{article.author.role}</div>
                </div>
              </dd>
            </dl>
            <p className="mt-6 max-w-2xl text-base text-neutral-600">
              {article.description}
            </p>
            <Button
              href={article.href}
              aria-label={`Read more: ${article.title}`}
              className="mt-8"
            >
              Read more
            </Button>
          </div>
        </div>
      </Border>
    </article>
  )
}

const articles = await loadArticles()

export default function Blog() {
  const [search, setSearch] = useState('')
  const [sortOrder, setSortOrder] = useState('desc')

  let filteredArticles = [...articles]
    .filter((article) =>
      article.title.toLowerCase().includes(search.toLowerCase()),
    )
    .sort((a, b) =>
      sortOrder === 'asc'
        ? a.date.localeCompare(b.date)
        : b.date.localeCompare(a.date),
    )

  let [latest, ...rest] = filteredArticles

  return (
    <>
      <PageIntro eyebrow="Blog" title="What we're learning">
        <p>
          Stay up-to-date with our latest insights in computational research.
        </p>
      </PageIntro>

      {latest && (
        <Container className="relative mt-24 sm:mt-32 lg:mt-40">
          <GridPattern
            className={
              "absolute inset-x-0 top-0 -z-10 h-full w-full fill-neutral-100 stroke-neutral-950/5 " +
              "[mask-image:linear-gradient(to_bottom_left,white,transparent)] sm:top-8"
            }
            yOffset={-96}
          />
          <FadeIn>
            <Post article={latest} />
          </FadeIn>
        </Container>
      )}

      <Container className="relative mt-24 sm:mt-32 lg:mt-40">
        <GridPattern
          className={
            "absolute inset-0 -z-10 h-full w-full fill-neutral-100 stroke-neutral-950/5 " +
            "[mask-image:linear-gradient(to_bottom_left,white_50%,transparent_70%)] sm:top-16"
          }
          yOffset={-128}
        />
        <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-center">
          <input
            type="text"
            placeholder="Search posts"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full flex-1 rounded-md border border-neutral-300 px-3 py-2"
          />
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="rounded-md border border-neutral-300 px-3 py-2"
          >
            <option value="desc">Newest</option>
            <option value="asc">Oldest</option>
          </select>
        </div>
        <FadeInStagger className="grid grid-cols-1 gap-x-8 gap-y-24 lg:grid-cols-2">
          {rest.map((article) => (
            <FadeIn key={article.href}>
              <Post article={article} />
            </FadeIn>
          ))}
        </FadeInStagger>
      </Container>

      <ContactSection />
    </>
  )
}

