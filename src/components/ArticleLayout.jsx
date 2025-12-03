'use client'

import { Container } from '@/components/Container'
import { formatDate } from '@/lib/formatDate'

export function ArticleLayout({ article, children }) {
  return (
    <Container className="mt-16 lg:mt-32">
      <div className="xl:relative">
        <div className="mx-auto max-w-2xl">
          <article>
            <header className="flex flex-col">
              <h1 className="mt-6 text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl">
                {article.title}
              </h1>
              <time
                dateTime={article.date}
                className="order-first flex items-center text-base text-zinc-400"
              >
                <span className="h-4 w-0.5 rounded-full bg-zinc-200" />
                <span className="ml-3">{formatDate(article.date)}</span>
              </time>
            </header>
            <div className="mt-8 prose">{children}</div>
          </article>
        </div>
      </div>
    </Container>
  )
}
