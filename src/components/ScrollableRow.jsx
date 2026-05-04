'use client'

import { useEffect, useRef, useState } from 'react'

export function ScrollableRow({ children, fadeFrom = 'from-white' }) {
  const ref = useRef(null)
  const [atEnd, setAtEnd] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const update = () => {
      const { scrollLeft, scrollWidth, clientWidth } = el
      const noOverflow = scrollWidth <= clientWidth + 1
      setAtEnd(noOverflow || scrollLeft + clientWidth >= scrollWidth - 4)
    }
    update()
    el.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      el.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  return (
    <div className="relative">
      <div
        ref={ref}
        className="overflow-x-auto pb-4 [scrollbar-width:thin]"
      >
        {children}
      </div>
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l ${fadeFrom} to-transparent transition-opacity duration-200 ${
          atEnd ? 'opacity-0' : 'opacity-100'
        }`}
      />
    </div>
  )
}
