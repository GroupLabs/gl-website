'use client'

import clsx from 'clsx'
import { useCallback, useEffect, useState } from 'react'

const HEADING_SELECTOR =
  '.typography h2[id], .typography h3[id], .typography h4[id]'

// Tick length per depth — a ruler's major, minor and fine graduations.
const TICK_WIDTH = [26, 17, 10]

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

// Headings carry a margin anchor ("#"); it is chrome, not part of the title.
function headingText(node) {
  let clone = node.cloneNode(true)
  for (let anchor of clone.querySelectorAll('.heading-anchor')) anchor.remove()
  return clone.textContent.trim()
}

function readHeadings() {
  let nodes = Array.from(document.querySelectorAll(HEADING_SELECTOR)).filter(
    (node) =>
      node.textContent.trim().length > 0 &&
      // Skip anything currently hidden — at wide viewports the footnote list
      // is replaced by margin notes, and its heading should leave with it.
      node.getClientRects().length > 0,
  )
  if (nodes.length === 0) return []

  let levels = nodes.map((node) => Number(node.tagName[1]))
  let top = Math.min(...levels)

  return nodes.map((node, index) => ({
    id: node.id,
    text: headingText(node),
    depth: Math.min(2, levels[index] - top),
    node,
  }))
}

/**
 * Reads the rendered article back out of the DOM. Doing it here rather than
 * threading a table of contents through the MDX pipeline keeps the rail
 * working for anything that lands inside `.typography`.
 *
 * The article can still be arriving when this mounts — streamed on first load,
 * or swapped in by a client-side navigation — so watch until the DOM settles
 * rather than trusting a single snapshot.
 */
function useHeadings() {
  let [headings, setHeadings] = useState([])

  useEffect(() => {
    let frame = 0
    let scan = () => {
      let next = readHeadings()
      setHeadings((current) =>
        current.length === next.length &&
        current.every((heading, index) => heading.id === next[index].id)
          ? current
          : next,
      )
    }

    scan()

    let observer = new MutationObserver(() => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(scan)
    })
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['class'],
    })
    let settle = setTimeout(() => observer.disconnect(), 5000)

    return () => {
      cancelAnimationFrame(frame)
      clearTimeout(settle)
      observer.disconnect()
    }
  }, [])

  return headings
}

function useActiveHeading(headings) {
  let [active, setActive] = useState(0)

  useEffect(() => {
    if (headings.length === 0) return

    let frame = 0
    let measure = () => {
      let line = window.innerHeight * 0.3
      let index = 0
      for (let i = 0; i < headings.length; i++) {
        if (headings[i].node.getBoundingClientRect().top > line) break
        index = i
      }
      // The final section is often shorter than the fold — claim it once the
      // reader has bottomed out, otherwise it can never become active.
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 8
      ) {
        index = headings.length - 1
      }
      setActive(index)
    }

    let onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(measure)
    }

    measure()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [headings])

  return active
}

function useJumpToHeading() {
  return useCallback((event, id) => {
    let target = document.getElementById(id)
    if (!target) return
    event.preventDefault()
    target.scrollIntoView({
      behavior: prefersReducedMotion() ? 'auto' : 'smooth',
      block: 'start',
    })
    target.setAttribute('tabindex', '-1')
    target.focus({ preventScroll: true })
    window.history.replaceState(null, '', `#${id}`)
  }, [])
}

/**
 * The rail: a graduated scale pinned to the right edge. Collapsed it reads as
 * the article's shape and how far through it you are; hovered or focused it
 * opens into a table of contents.
 */
export function ArticleRail() {
  let headings = useHeadings()
  let active = useActiveHeading(headings)
  let jump = useJumpToHeading()

  if (headings.length < 2) return null

  return (
    <div className="pointer-events-none fixed inset-y-0 right-0 z-30 hidden items-center xl:flex">
      <nav
        aria-label="On this page"
        className="group pointer-events-auto py-8 pl-16 pr-6 2xl:pr-10"
      >
        <ul
          className={clsx(
            'flex max-h-[76vh] flex-col items-end gap-y-2 overflow-y-auto overscroll-contain rounded-2xl',
            'px-4 py-4 transition duration-300 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
            'bg-white/0 ring-0 ring-neutral-950/5',
            'group-hover:bg-white/90 group-hover:shadow-[0_16px_48px_-24px_rgba(10,10,10,0.4)] group-hover:ring-1 group-hover:backdrop-blur',
            'group-focus-within:bg-white/90 group-focus-within:shadow-[0_16px_48px_-24px_rgba(10,10,10,0.4)] group-focus-within:ring-1 group-focus-within:backdrop-blur',
          )}
        >
          {headings.map((heading, index) => {
            let isActive = index === active
            let isRead = index < active

            return (
              <li key={heading.id} className="w-full">
                <a
                  href={`#${heading.id}`}
                  onClick={(event) => jump(event, heading.id)}
                  aria-current={isActive ? 'location' : undefined}
                  className="group/row flex items-center justify-end gap-x-3 rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-orange-600/40"
                >
                  <span
                    className={clsx(
                      'grid grid-cols-[0fr] transition-[grid-template-columns] duration-300 ease-out',
                      'group-hover:grid-cols-[1fr] group-focus-within:grid-cols-[1fr] motion-reduce:transition-none',
                    )}
                    style={{ transitionDelay: `${Math.min(index, 12) * 15}ms` }}
                  >
                    <span
                      className={clsx(
                        'overflow-hidden whitespace-nowrap text-right opacity-0 transition-opacity duration-200',
                        'group-hover:opacity-100 group-focus-within:opacity-100 motion-reduce:transition-none',
                        heading.depth === 0 &&
                          'max-w-[15rem] text-[13px] font-medium leading-5',
                        heading.depth === 1 &&
                          'max-w-[13rem] text-[12.5px] leading-5',
                        heading.depth === 2 && 'max-w-[12rem] text-xs leading-5',
                        isActive
                          ? 'text-neutral-950'
                          : isRead
                            ? 'text-neutral-600 group-hover/row:text-neutral-950'
                            : 'text-neutral-500 group-hover/row:text-neutral-950',
                      )}
                    >
                      <span className="block truncate">{heading.text}</span>
                    </span>
                  </span>

                  <span
                    aria-hidden="true"
                    className={clsx(
                      'block h-0.5 flex-none rounded-full transition-all duration-300 ease-out motion-reduce:transition-none',
                      isActive
                        ? 'bg-orange-600'
                        : isRead
                          ? 'bg-neutral-950/[0.45] group-hover/row:bg-neutral-950/80'
                          : 'bg-neutral-950/[0.22] group-hover/row:bg-neutral-950/80',
                    )}
                    style={{
                      width: TICK_WIDTH[heading.depth] + (isActive ? 8 : 0),
                    }}
                  />
                </a>
              </li>
            )
          })}
        </ul>
      </nav>
    </div>
  )
}

/**
 * The same outline, in flow, for viewports too narrow to carry the rail.
 */
export function ArticleContents() {
  let headings = useHeadings()
  let jump = useJumpToHeading()

  if (headings.length < 2) return null

  return (
    <details className="group mt-12 border-y border-neutral-950/10 xl:hidden">
      <summary className="flex cursor-pointer list-none items-center gap-x-3 py-4 outline-none [&::-webkit-details-marker]:hidden">
        <span className="eyebrow wdth-narrow text-neutral-950">Contents</span>
        <span aria-hidden="true" className="h-px flex-1 bg-neutral-950/10" />
        <span className="eyebrow wdth-narrow tabular text-neutral-500">
          {String(headings.length).padStart(2, '0')}
        </span>
        <svg
          aria-hidden="true"
          viewBox="0 0 10 6"
          className="w-2.5 flex-none fill-neutral-500 transition-transform duration-200 group-open:rotate-180 motion-reduce:transition-none"
        >
          <path d="M0 0h10L5 6z" />
        </svg>
      </summary>
      <ul className="pb-5">
        {headings.map((heading) => (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              onClick={(event) => jump(event, heading.id)}
              className={clsx(
                'block py-1.5 text-neutral-600 transition-colors hover:text-neutral-950',
                heading.depth === 0 && 'text-[15px] font-medium text-neutral-950',
                heading.depth === 1 && 'pl-5 text-sm',
                heading.depth === 2 && 'pl-10 text-sm text-neutral-500',
              )}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </details>
  )
}
