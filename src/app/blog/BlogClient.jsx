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
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from '@/components/ui/command'
import { Check, ChevronsUpDown } from 'lucide-react'

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
  const [tagOpen, setTagOpen] = useState(false)
  const [selectedTags, setSelectedTags] = useState([])

  const tags = Array.from(new Set(articles.flatMap((a) => a.tags ?? [])))

  const normalizedSearch = search.trim().toLowerCase()

  let filteredArticles = [...articles]
    .filter((article) =>
      normalizedSearch
        ? article.title.toLowerCase().includes(normalizedSearch)
        : true,
    )
    .filter((article) =>
      selectedTags.length > 0
        ? selectedTags.some((tag) => article.tags?.includes(tag))
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
            className="w-full flex-1 rounded-md border border-neutral-300 px-3 py-2 sm:min-w-[300px]"
          />
          {tags.length > 0 && (
            <Popover open={tagOpen} onOpenChange={setTagOpen}>
              <PopoverTrigger asChild>
                <UiButton
                  variant="outline"
                  role="combobox"
                  aria-expanded={tagOpen}
                  className="w-40 justify-between"
                >
                  {selectedTags.length > 0
                    ? selectedTags.join(', ')
                    : 'Filter by tag'}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </UiButton>
              </PopoverTrigger>
              <PopoverContent className="w-40 p-0">
                <Command>
                  <CommandInput placeholder="Search tag..." />
                  <CommandList>
                    <CommandEmpty>No tag found.</CommandEmpty>
                    <CommandGroup>
                      {tags.map((tag) => (
                        <CommandItem
                          key={tag}
                          value={tag}
                          onSelect={(currentValue) => {
                            setSelectedTags((prev) =>
                              prev.includes(currentValue)
                                ? prev.filter((t) => t !== currentValue)
                                : [...prev, currentValue],
                            )
                          }}
                        >
                          <Check
                            className={clsx(
                              'mr-2 h-4 w-4',
                              selectedTags.includes(tag)
                                ? 'opacity-100'
                                : 'opacity-0',
                            )}
                          />
                          {tag}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          )}
          <Select value={sortOrder} onValueChange={setSortOrder}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Sort" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="desc">Newest</SelectItem>
              <SelectItem value="asc">Oldest</SelectItem>
            </SelectContent>
          </Select>
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

