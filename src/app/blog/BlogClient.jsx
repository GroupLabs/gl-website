'use client'

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
import { formatDate } from '@/lib/formatDate'

function Post({ article }) {
  return (
    <article>
      <Border className="pt-16">
        <div className="pt-10">
          <h2 className="font-display text-2xl font-semibold text-neutral-950">
            <Link href={article.href}>{article.title}</Link>
          </h2>
          <dl>
            <dt className="sr-only">Published</dt>
            <dd className="text-sm text-neutral-950">
              <time dateTime={article.date}>{formatDate(article.date)}</time>
            </dd>
            <dt className="sr-only">Author</dt>
            <dd className="mt-6 flex gap-x-4">
              <div className="flex-none">
                <Image
                  alt={article.author.name}
                  {...article.author.image}
                  className="h-12 w-12 rounded-lg object-cover"
                />
              </div>
              <div className="text-sm">
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
      </Border>
    </article>
  )
}

export default function BlogClient({ articles }) {
  const [search, setSearch] = useState('')
  const [sortOrder, setSortOrder] = useState('desc')

  const normalizedSearch = search.trim().toLowerCase()

  let filteredArticles = [...articles]
    .filter((article) =>
      normalizedSearch
        ? article.title.toLowerCase().includes(normalizedSearch)
        : true,
    )
    .sort((a, b) =>
      sortOrder === 'asc'
        ? a.date.localeCompare(b.date)
        : b.date.localeCompare(a.date),
    )

  let [latest, ...rest] = filteredArticles

  return (
    <>
      <PageIntro eyebrow="Blog" title="What we're learning" compact>
        <p>
          Stay up-to-date with our latest insights in computational research.
        </p>
      </PageIntro>

      <Container className="relative mt-8 sm:mt-12 lg:mt-16">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <input
            type="search"
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
      </Container>

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

