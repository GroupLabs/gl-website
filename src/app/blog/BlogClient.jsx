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

function FeatureTile({ article, index }) {
  const n = String(index + 1).padStart(2, '0')
  return (
    <Link
      href={article.href}
      className="group relative isolate flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-neutral-950/15 bg-neutral-950 p-7 text-white transition hover:border-neutral-950/40 sm:p-9"
    >
      {article.image && (
        <Image
          src={article.image}
          alt=""
          fill
          sizes="(min-width: 1024px) 60vw, 100vw"
          className="absolute inset-0 -z-10 h-full w-full object-cover opacity-45 transition duration-700 group-hover:scale-[1.02] group-hover:opacity-55"
        />
      )}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-t from-neutral-950 via-neutral-950/70 to-neutral-950/30"
      />

      <div className="flex items-baseline gap-3 font-mono text-[10px] uppercase tracking-[0.18em]">
        <span className="flex items-center gap-2 text-white">
          <span
            aria-hidden="true"
            className="block h-1.5 w-1.5 rounded-full bg-orange-500"
          />
          §&nbsp;{n} · Feature
        </span>
        <span aria-hidden="true" className="text-white/35">/</span>
        <span className="tabular text-white/70">
          {formatDate(article.date)}
        </span>
      </div>

      <div>
        <h3 className="wdth-wide font-display text-2xl font-medium leading-[1.05] tracking-tight text-white sm:text-3xl lg:text-[2.5rem]">
          {article.title}
        </h3>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/80 sm:text-base">
          {article.description}
        </p>

        <div className="mt-6 flex items-center justify-between gap-4 border-t border-white/15 pt-5">
          <div className="flex items-center gap-3">
            {article.author?.image && (
              <Image
                alt={article.author.name}
                src={article.author.image}
                width={36}
                height={36}
                className="h-9 w-9 rounded-md object-cover"
              />
            )}
            <div className="font-mono text-xs leading-tight text-white/85">
              <div className="text-white">{article.author.name}</div>
              <div className="text-white/55">{article.author.role}</div>
            </div>
          </div>
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-orange-400 transition-transform group-hover:translate-x-0.5">
            Read →
          </span>
        </div>
      </div>
    </Link>
  )
}

function MediumTile({ article, index }) {
  const n = String(index + 1).padStart(2, '0')
  return (
    <Link
      href={article.href}
      className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-neutral-950/15 bg-white p-6 transition hover:border-neutral-950/40 hover:bg-neutral-50 sm:p-7"
    >
      <div className="flex items-baseline gap-3 border-b border-neutral-950/10 pb-3 font-mono text-[10px] uppercase tracking-[0.18em] text-neutral-500">
        <span className="tabular text-neutral-950">§&nbsp;{n}</span>
        <span aria-hidden="true" className="text-neutral-300">/</span>
        <span className="tabular">{formatDate(article.date)}</span>
        <span aria-hidden="true" className="ml-auto h-px flex-1 bg-neutral-200" />
      </div>

      <div className="mt-4 flex flex-1 flex-col">
        <h3 className="wdth-wide font-display text-xl font-medium leading-[1.1] tracking-tight text-neutral-950 sm:text-2xl">
          {article.title}
        </h3>
        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-neutral-700">
          {article.description}
        </p>
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-neutral-950/10 pt-4 font-mono text-[10px] uppercase tracking-[0.18em] text-neutral-500">
        <span className="text-neutral-700">{article.author.name}</span>
        <span className="text-orange-600 transition-transform group-hover:translate-x-0.5">
          Read →
        </span>
      </div>
    </Link>
  )
}

function SmallTile({ article, index }) {
  const n = String(index + 1).padStart(2, '0')
  return (
    <Link
      href={article.href}
      className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-neutral-950/15 bg-white p-5 transition hover:border-neutral-950/40 hover:bg-neutral-50 sm:p-6"
    >
      <div className="flex items-baseline gap-3 font-mono text-[10px] uppercase tracking-[0.18em] text-neutral-500">
        <span className="tabular text-neutral-950">§&nbsp;{n}</span>
        <span aria-hidden="true" className="text-neutral-300">/</span>
        <span className="tabular">{formatDate(article.date)}</span>
      </div>

      <h3 className="mt-4 font-display text-base font-medium leading-snug tracking-tight text-neutral-950 sm:text-lg">
        {article.title}
      </h3>

      <div className="mt-4 flex items-center justify-between border-t border-neutral-950/10 pt-3 font-mono text-[10px] uppercase tracking-[0.18em] text-neutral-500">
        <span>{article.author.name}</span>
        <span className="text-orange-600 transition-transform group-hover:translate-x-0.5">
          →
        </span>
      </div>
    </Link>
  )
}

function BentoTile({ article, index }) {
  if (index === 0) return <FeatureTile article={article} index={index} />
  if (index < 3) return <MediumTile article={article} index={index} />
  return <SmallTile article={article} index={index} />
}

function bentoSpan(index) {
  if (index === 0) return 'lg:col-span-7 lg:row-span-2'
  if (index < 3) return 'lg:col-span-5'
  return 'lg:col-span-4'
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
            <FadeInStagger
              faster
              className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-6 sm:gap-5 lg:grid-cols-12 lg:auto-rows-[200px]"
            >
              {filteredArticles.map((article, idx) => (
                <FadeIn
                  key={article.href}
                  className={`sm:col-span-3 ${bentoSpan(idx)}`}
                >
                  <BentoTile article={article} index={idx} />
                </FadeIn>
              ))}
            </FadeInStagger>
          )}
        </Container>
      </section>

      <ContactCTA />
    </>
  )
}
