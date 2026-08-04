'use client'

import { useEffect } from 'react'

// Below this the gutters are too narrow to hold a note, and the footnote list
// at the foot of the article does the job instead.
const MIN_WIDTH = 1280
// Notes carry no rule of their own, so the space between them is what keeps
// two stacked notes from reading as one.
const GAP = 28

/**
 * Distance from `node` up to `container`, walked through offsetParent rather
 * than measured off a rect — the article animates in on a transform, and
 * getBoundingClientRect would read whatever the animation happened to be
 * doing at the moment we looked.
 */
function offsetWithin(node, container) {
  let top = 0
  let current = node

  while (current && current !== container) {
    top += current.offsetTop
    current = current.offsetParent
  }

  return top
}

function noteContent(reference) {
  let id = decodeURIComponent(reference.getAttribute('href') ?? '').slice(1)
  let source = document.getElementById(id)
  if (!source) return null

  let content = source.cloneNode(true)
  for (let backref of content.querySelectorAll('.data-footnote-backref')) {
    backref.remove()
  }
  return content.innerHTML.trim()
}

/**
 * Lifts footnotes out of the bottom of the article and into the left gutter,
 * level with the sentence that cites them. The rail owns the right edge; this
 * is the space the layout was already paying for and not using.
 */
export function MarginNotes() {
  useEffect(() => {
    let container = document.querySelector('[data-article-body]')
    if (!container) return

    let notes = []
    let cancelled = false

    let teardown = () => {
      for (let { reference, onEnter, onLeave, onClick } of notes) {
        reference.removeEventListener('mouseenter', onEnter)
        reference.removeEventListener('mouseleave', onLeave)
        reference.removeEventListener('click', onClick)
      }
      // Sweep the DOM rather than only the notes this closure knows about —
      // an effect that has already been cleaned up must not leave any behind.
      for (let stale of container.querySelectorAll('.margin-note')) {
        stale.remove()
      }
      notes = []
      container.classList.remove('has-margin-notes')
    }

    let render = () => {
      if (cancelled) return
      teardown()
      if (window.innerWidth < MIN_WIDTH) return

      let references = Array.from(
        container.querySelectorAll('a[data-footnote-ref]'),
      )
      if (references.length === 0) return

      // Placed before the class lands, so the footnote list is still visible
      // and measurements are taken against the same layout the reader sees.
      let placements = []
      for (let [index, reference] of references.entries()) {
        let content = noteContent(reference)
        if (!content) continue

        let aside = document.createElement('aside')
        aside.className = 'margin-note'
        aside.innerHTML = `<span class="margin-note__index">${index + 1}</span><div class="margin-note__body">${content}</div>`
        container.appendChild(aside)
        placements.push({ aside, reference })
      }

      if (placements.length === 0) return

      let cursor = 0
      for (let { aside, reference } of placements) {
        let top = Math.max(offsetWithin(reference, container) - 4, cursor)
        aside.style.top = `${top}px`
        cursor = top + aside.offsetHeight + GAP
      }

      for (let { aside, reference } of placements) {
        let onEnter = () => aside.classList.add('is-active')
        let onLeave = () => aside.classList.remove('is-active')
        let onClick = (event) => {
          // The note is already on screen — flash it rather than sending the
          // reader to a list that is hidden at this width.
          event.preventDefault()
          aside.classList.add('is-active')
          setTimeout(() => aside.classList.remove('is-active'), 1200)
        }

        reference.addEventListener('mouseenter', onEnter)
        reference.addEventListener('mouseleave', onLeave)
        reference.addEventListener('click', onClick)
        notes.push({ aside, reference, onEnter, onLeave, onClick })
      }

      container.classList.add('has-margin-notes')
    }

    // Only resize is coalesced through a frame. The first pass runs straight
    // away: layout is committed by the time effects fire, and requestAnimation
    // Frame does not run at all while the tab is unpainted — an article opened
    // in a background tab would otherwise have no notes until it was focused.
    let frame = 0
    let schedule = () => {
      if (cancelled) return
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(render)
    }

    render()
    window.addEventListener('resize', schedule)
    // Metrics move once the webfont swaps in, so measure again after it lands.
    document.fonts?.ready.then(render)

    return () => {
      cancelled = true
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', schedule)
      teardown()
    }
  }, [])

  return null
}
