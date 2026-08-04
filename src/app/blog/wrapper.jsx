import clsx from 'clsx'

import { ArticleContents, ArticleRail } from '@/components/ArticleRail'
import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { MarginNotes } from '@/components/MarginNotes'
import { MDXComponents } from '@/components/MDXComponents'
import { PageLinks } from '@/components/PageLinks'
import { formatDate } from '@/lib/formatDate'
import { loadArticles } from '@/lib/mdx'
import 'katex/dist/katex.min.css'

// `status: 'Draft'` and `status: { label, note }` both work — the second lets
// a piece say what is unfinished about it, which is the part a reader needs.
function readStatus(status) {
  if (!status) return null
  return typeof status === 'string' ? { label: status } : status
}

export default async function BlogArticleWrapper({ article, children }) {
  let allArticles = await loadArticles()
  let current = allArticles.find(({ metadata }) => metadata === article)
  let status = readStatus(article.status)
  let moreArticles = allArticles
    .filter(({ metadata }) => metadata !== article)
    .slice(0, 2)

  return (
    <>
      <Container as="article" className="mt-12 sm:mt-16 lg:mt-20">
        <FadeIn>
          <header className="mx-auto max-w-[44rem]">
            <div className="flex items-center gap-4 border-b border-neutral-950/15 pb-3">
              <p className="eyebrow wdth-narrow text-orange-600">
                <span
                  aria-hidden="true"
                  className={clsx(
                    'mr-2 inline-block h-1.5 w-1.5 rounded-full bg-orange-600 align-middle',
                    status && 'animate-pulse-dot',
                  )}
                />
                {status?.label ?? 'Writing'}
              </p>
              <span aria-hidden="true" className="h-px flex-1 bg-neutral-950/15" />
              <time
                dateTime={article.date}
                className="eyebrow wdth-narrow tabular text-neutral-500"
              >
                {formatDate(article.date)}
              </time>
            </div>

            <h1 className="wdth-wide mt-10 font-display text-[clamp(2.25rem,5.2vw,3.5rem)] font-medium leading-[1.03] tracking-tight text-neutral-950 [text-wrap:balance]">
              {article.title}
            </h1>

            {article.description && (
              <p className="mt-6 max-w-[36rem] text-lg leading-relaxed text-neutral-600">
                {article.description}
              </p>
            )}

            <div className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-4 border-t border-neutral-950/10 pt-5">
              {article.author.image && (
                <img
                  src={article.author.image}
                  alt=""
                  className="h-10 w-10 flex-none rounded-full object-cover grayscale"
                />
              )}
              <div className="mr-2">
                <p className="text-sm font-semibold text-neutral-950">
                  {article.author.name}
                </p>
                <p className="eyebrow wdth-narrow text-neutral-500">
                  {article.author.role}
                </p>
              </div>
              <span
                aria-hidden="true"
                className="h-px min-w-[2rem] flex-1 bg-neutral-950/10"
              />
              {current?.readingTime && (
                <p className="eyebrow wdth-narrow tabular text-neutral-500">
                  {current.readingTime} min read
                </p>
              )}
            </div>

            {article.tags?.length > 0 && (
              <ul className="mt-6 flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <li
                    key={tag}
                    className="eyebrow wdth-narrow rounded-full border border-neutral-950/10 px-3 py-1.5 text-neutral-500"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            )}

            {status?.note && (
              <div className="mt-8 border-l-2 border-orange-600 pl-5">
                <p className="eyebrow wdth-narrow text-orange-600">
                  {status.label}
                </p>
                <p className="mt-2 text-base leading-relaxed text-neutral-600">
                  {status.note}
                </p>
              </div>
            )}

            <ArticleContents />
          </header>
        </FadeIn>

        <FadeIn>
          <MDXComponents.wrapper
            data-article-body
            className="relative mt-14 sm:mt-16"
          >
            {children}
          </MDXComponents.wrapper>
        </FadeIn>
      </Container>

      <ArticleRail />
      <MarginNotes />

      {moreArticles.length > 0 && (
        <PageLinks
          className="mt-24 sm:mt-32 lg:mt-40"
          title="More articles"
          pages={moreArticles}
        />
      )}

      <ContactSection />
    </>
  )
}
