'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { ContactCTA } from '@/components/ContactCTA'
import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { SectionHead } from '@/components/SectionHead'
import { formatDate } from '@/lib/formatDate'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'

function BlogHero({ count }) {
  return (
    <section className="relative isolate overflow-hidden bg-white text-neutral-950">
      <Container className="relative pb-6 pt-10 sm:pb-8 sm:pt-14 lg:pb-10 lg:pt-16">
        <div className="relative flex min-h-[50vh] flex-col items-center justify-center overflow-hidden rounded-[2rem] px-5 py-8 sm:px-10 sm:py-12 lg:px-14 lg:py-14">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10"
            style={{
              maskImage:
                'radial-gradient(ellipse at center, black 0%, transparent 85%)',
              WebkitMaskImage:
                'radial-gradient(ellipse at center, black 0%, transparent 85%)',
            }}
          >
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  'linear-gradient(to right, rgba(234,88,12,0.10) 1px, transparent 1px), linear-gradient(to bottom, rgba(234,88,12,0.10) 1px, transparent 1px)',
                backgroundSize: '20px 20px',
                backgroundPosition: '0 -2px',
              }}
            />
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  'linear-gradient(to right, rgba(234,88,12,0.20) 1px, transparent 1px), linear-gradient(to bottom, rgba(234,88,12,0.20) 1px, transparent 1px)',
                backgroundSize: '100px 100px',
                backgroundPosition: '0 -2px',
              }}
            />
          </div>

          <FadeIn immediate>
            <p className="eyebrow wdth-narrow text-center text-orange-600">
              <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-orange-600 align-middle" />
              §&nbsp;01 &nbsp;·&nbsp; Working notes
            </p>
          </FadeIn>

          <FadeIn immediate delay={0.15}>
            <h1 className="wdth-wide mt-5 max-w-3xl text-center font-display text-3xl font-medium leading-[1.08] tracking-tight text-neutral-950 sm:text-4xl lg:text-5xl">
              What we&rsquo;re{' '}
              <span className="italic text-neutral-700">learning.</span>
              <br />
              Written down.
            </h1>
          </FadeIn>

          <FadeIn immediate delay={0.3}>
            <p className="mt-6 max-w-xl text-center text-base leading-relaxed text-neutral-700 sm:text-lg">
              Field notes, technical write-ups, and the occasional argument.
              Computational research from the studio.
            </p>
          </FadeIn>

          <FadeIn immediate delay={0.45}>
            <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.22em] text-neutral-500">
              <span className="tabular text-neutral-950">
                {String(count).padStart(2, '0')}
              </span>{' '}
              entries archived
            </p>
          </FadeIn>
        </div>
      </Container>
    </section>
  )
}

function PostEntry({ article, index }) {
  const n = String(index + 1).padStart(2, '0')
  const year = article.date.split('-')[0]

  return (
    <article className="group">
      <div className="border-neutral-950/15 flex items-baseline gap-4 border-b pb-3">
        <span className="tabular font-mono text-2xl font-medium tracking-tight text-neutral-950">
          {n}
        </span>
        <span className="eyebrow wdth-narrow text-neutral-500">
          {year} · {article.author.name}
        </span>
        <span aria-hidden="true" className="bg-neutral-950/15 h-px flex-1" />
        <Link
          href={article.href}
          className="eyebrow wdth-narrow text-neutral-500 hover:text-orange-600"
        >
          Read →
        </Link>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-x-12 gap-y-10 lg:grid-cols-12">
        <h3 className="wdth-wide font-display text-[clamp(1.75rem,4vw,3rem)] font-medium leading-[1.05] tracking-tight text-neutral-950 lg:col-span-5">
          <Link href={article.href} className="hover:text-orange-600">
            {article.title}
          </Link>
        </h3>

        <div className="space-y-6 text-base leading-relaxed text-neutral-700 lg:col-span-7">
          <p>
            <span className="eyebrow wdth-narrow text-neutral-500">
              Summary &nbsp;·&nbsp;
            </span>{' '}
            {article.description}
          </p>

          {article.tags?.length > 0 && (
            <p className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[11px] uppercase tracking-[0.18em] text-neutral-500">
              <span className="eyebrow wdth-narrow">Tags &nbsp;·&nbsp;</span>
              {article.tags.map((tag, i) => (
                <span key={tag} className="text-neutral-700">
                  {tag}
                  {i < article.tags.length - 1 && (
                    <span className="ml-2 text-neutral-400">/</span>
                  )}
                </span>
              ))}
            </p>
          )}
        </div>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-x-12 gap-y-6 border-t border-neutral-950/10 pt-6 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="eyebrow wdth-narrow text-neutral-500">Published</p>
          <p className="tabular mt-2 font-mono text-3xl font-medium leading-none tracking-tight text-neutral-950 sm:text-4xl">
            {formatDate(article.date)}
          </p>
        </div>
        <div className="lg:col-span-7">
          <p className="eyebrow wdth-narrow text-neutral-500">Author</p>
          <div className="mt-2 flex items-center gap-3">
            <Image
              alt={article.author.name}
              src={article.author.image}
              width={36}
              height={36}
              className="h-9 w-9 rounded-md object-cover"
            />
            <div className="font-mono text-sm leading-tight text-neutral-800">
              <div className="text-neutral-950">{article.author.name}</div>
              <div className="text-xs text-neutral-500">
                {article.author.role}
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

export default function BlogClient({ articles }) {
  const [search, setSearch] = useState('')
  const [sortOrder, setSortOrder] = useState('desc')

  const normalizedSearch = search.trim().toLowerCase()

  const filteredArticles = [...articles]
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

  return (
    <>
      <BlogHero count={articles.length} />

      <section id="entries" className="mt-16 sm:mt-24 lg:mt-32">
        <Container>
          <SectionHead
            kicker="§ 02 · Archive"
            title="Entries on the record."
            dek="Search the archive, or sort by date. Open any entry for the full piece."
            rightMeta={`${String(filteredArticles.length).padStart(2, '0')} entries`}
            size="lg"
          />

          <FadeIn>
            <div className="mt-12 flex flex-col gap-3 border-t border-neutral-950/10 pt-6 sm:flex-row sm:items-center">
              <input
                type="search"
                placeholder="Search entries..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 border border-neutral-950/15 bg-white px-4 py-2.5 font-mono text-sm placeholder:text-neutral-500 focus:border-neutral-950 focus:outline-none focus:ring-1 focus:ring-neutral-950"
              />

              <Select value={sortOrder} onValueChange={setSortOrder}>
                <SelectTrigger className="w-full rounded-none border border-neutral-950/15 bg-white font-mono text-sm font-medium uppercase tracking-[0.12em] text-neutral-700 hover:bg-neutral-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 sm:w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent align="end">
                  <SelectItem value="desc">Newest first</SelectItem>
                  <SelectItem value="asc">Oldest first</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </FadeIn>

          {filteredArticles.length === 0 ? (
            <FadeIn>
              <p className="mt-16 font-mono text-sm text-neutral-500">
                No entries match &ldquo;{search}&rdquo;.
              </p>
            </FadeIn>
          ) : (
            <FadeInStagger faster>
              <ol className="mt-16 space-y-16 sm:space-y-24">
                {filteredArticles.map((article, idx) => (
                  <FadeIn as="li" key={article.href}>
                    <PostEntry article={article} index={idx} />
                  </FadeIn>
                ))}
              </ol>
            </FadeInStagger>
          )}
        </Container>
      </section>

      <ContactCTA />
    </>
  )
}
