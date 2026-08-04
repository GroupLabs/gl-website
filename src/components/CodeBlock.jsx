'use client'

import clsx from 'clsx'
import { useRef, useState } from 'react'

const LANGUAGE_LABELS = {
  bash: 'shell',
  cpp: 'c++',
  javascript: 'js',
  typescript: 'ts',
  markdown: 'md',
  python: 'py',
  yaml: 'yml',
}

export function CodeBlock({ className, children, ...props }) {
  let language = props['data-language']
  let source = useRef(null)
  let [copied, setCopied] = useState(false)

  async function copy() {
    let text = source.current?.textContent
    if (!text) return
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard blocked — the code is selectable either way.
    }
  }

  return (
    <div className="code-block group/code">
      <div className="code-block__bar">
        <span className="eyebrow wdth-narrow text-neutral-500">
          {LANGUAGE_LABELS[language] ?? language ?? 'text'}
        </span>
        <button
          type="button"
          onClick={copy}
          className={clsx(
            'eyebrow wdth-narrow rounded-full px-2 py-1 transition',
            'text-neutral-400 opacity-0 focus-visible:opacity-100 group-hover/code:opacity-100',
            'hover:bg-neutral-950/[0.04] hover:text-neutral-950',
            copied && 'text-orange-600 opacity-100',
          )}
        >
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <pre ref={source} tabIndex={0} className={className} {...props}>
        {children}
      </pre>
    </div>
  )
}
