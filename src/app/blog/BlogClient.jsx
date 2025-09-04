'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'

import { Border } from '@/components/Border'
import { Button } from '@/components/Button'
import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { GridPattern } from '@/components/GridPattern'
import { PageIntro } from '@/components/PageIntro'
import { formatDate } from '@/lib/formatDate'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'
import { Button as UiButton } from '@/components/ui/button'

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
                  src={article.author.image}
                  width={48}
                  height={48}
                  className="h-12 w-12 rounded-lg object-cover"
                />
              </div>
              <div className="text-sm">
                <div className="font-semibold">{article.author.name}</div>
                <div>{article.author.role}</div>
              </div>
            </dd>
            {article.tags?.length > 0 && (
              <>
                <dt className="sr-only">Tags</dt>
                <dd className="mt-4 flex flex-wrap gap-2">
                  {article.tags?.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="text-neutral-600"
                    >
                      {tag}
                    </Badge>
                  ))}
                </dd>
              </>
            )}
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
          {/* Search Bar - grows to fill available space */}
          <input
            type="search"
            placeholder="Search articles..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 rounded-lg border border-neutral-300 bg-white px-4 py-2.5 text-sm placeholder:text-neutral-500 focus:border-neutral-950 focus:outline-none focus:ring-1 focus:ring-neutral-950"
          />

          {/* Sort Control */}
          <div className="flex flex-shrink-0 items-center gap-3">
            {/* Sort Dropdown */}
            <Select value={sortOrder} onValueChange={setSortOrder}>
              <SelectTrigger className="w-[140px] rounded-lg border-neutral-300 bg-white text-sm font-medium text-neutral-700 hover:bg-neutral-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent align="end">
                <SelectItem value="desc">Newest first</SelectItem>
                <SelectItem value="asc">Oldest first</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results Count */}
        <div className="mt-4 text-sm text-neutral-600">
          {filteredArticles.length === 0 ? (
            <span>No articles found</span>
          ) : (
            <span>
              Showing {filteredArticles.length} {filteredArticles.length === 1 ? 'article' : 'articles'}
            </span>
          )}
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

