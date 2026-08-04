'use client'

import clsx from 'clsx'
import { useEffect, useRef, useState } from 'react'

/**
 * The page an artifact runs inside. Authored code is dropped in as a module,
 * so top-level `import` and `await` both work, and a small runtime is defined
 * ahead of it: `root` to render into, `print()` for output, `status()` for a
 * progress line, `clear()` to reset.
 *
 * Errors cannot be caught around a module body without breaking its imports,
 * so failures are collected off the window instead.
 */
function buildDocument(code) {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<style>
  :root { color-scheme: light }
  *, *::before, *::after { box-sizing: border-box }
  body {
    margin: 0;
    padding: 18px;
    background: #fff;
    color: #171717;
    font: 14px/1.6 ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  }
  label {
    display: block;
    margin-bottom: 8px;
    color: #737373;
    font: 600 11px/1.5 ui-monospace, SFMono-Regular, Menlo, monospace;
    letter-spacing: 0.16em;
    text-transform: uppercase;
  }
  input, textarea, select {
    width: 100%;
    padding: 10px 12px;
    border: 1px solid rgba(10, 10, 10, 0.14);
    border-radius: 8px;
    background: #fff;
    color: inherit;
    font: inherit;
    resize: vertical;
  }
  input:focus, textarea:focus, select:focus {
    border-color: rgba(10, 10, 10, 0.3);
    outline: 2px solid rgba(234, 88, 12, 0.35);
    outline-offset: 1px;
  }
  button {
    padding: 8px 16px;
    border: 1px solid rgba(10, 10, 10, 0.14);
    border-radius: 999px;
    background: #fff;
    color: inherit;
    font: 500 13px/1.4 inherit;
    cursor: pointer;
  }
  button:hover:not(:disabled) { border-color: rgba(10, 10, 10, 0.4) }
  button:disabled { opacity: 0.45; cursor: default }
  #gl-status {
    margin-bottom: 14px;
    color: #737373;
    font: 600 11px/1.5 ui-monospace, SFMono-Regular, Menlo, monospace;
    letter-spacing: 0.16em;
    text-transform: uppercase;
  }
  #gl-status[hidden] { display: none }
  #gl-log {
    margin: 14px 0 0;
    white-space: pre-wrap;
    word-break: break-word;
    color: #404040;
    font: 12.5px/1.7 ui-monospace, SFMono-Regular, Menlo, monospace;
  }
  #gl-log:empty { display: none }
  .gl-fail { color: #b91c1c }
</style>
</head>
<body>
<div id="gl-status" hidden></div>
<div id="gl-root"></div>
<pre id="gl-log"></pre>
<script>
  var root = document.getElementById('gl-root')
  var glLog = document.getElementById('gl-log')
  var glStatus = document.getElementById('gl-status')

  function glFormat(value) {
    if (typeof value === 'string') return value
    if (value instanceof Error) return value.message
    try { return JSON.stringify(value, null, 2) } catch (error) { return String(value) }
  }

  function print() {
    var line = document.createElement('div')
    line.textContent = Array.prototype.map.call(arguments, glFormat).join(' ')
    glLog.appendChild(line)
    return line
  }

  function status(text) {
    glStatus.hidden = !text
    glStatus.textContent = text || ''
  }

  function clear() {
    glLog.textContent = ''
    root.innerHTML = ''
    status('')
  }

  function glFail(message) {
    var line = print(message || 'Something threw without a message.')
    line.className = 'gl-fail'
    status('')
  }

  window.print = print
  window.addEventListener('error', function (event) {
    glFail(String((event.error && event.error.message) || event.message))
  })
  window.addEventListener('unhandledrejection', function (event) {
    glFail(String((event.reason && event.reason.message) || event.reason))
  })
</script>
<script type="module">
${code.replace(/<\/script/gi, '<\\/script')}
</script>
</body>
</html>`
}

export function Artifact({ className, children, ...props }) {
  let title = props['data-artifact-title']
  let note = props['data-artifact-note']
  let height = Number(props['data-artifact-height']) || 320
  let autorun = props['data-artifact-autorun'] === 'true'

  let listing = useRef(null)
  let [code, setCode] = useState('')
  // Bumping the key remounts the iframe, which is the whole of "reset".
  let [run, setRun] = useState(0)
  let [showSource, setShowSource] = useState(false)

  // The highlighted listing already holds the source verbatim, so read it back
  // out rather than shipping a second copy of every artifact in the payload.
  useEffect(() => {
    setCode(listing.current?.textContent ?? '')
  }, [])

  useEffect(() => {
    if (autorun && code) setRun((current) => current || 1)
  }, [autorun, code])

  return (
    <div className="artifact">
      <div className="artifact__bar">
        <span className="flex items-center gap-x-2">
          <span
            aria-hidden="true"
            className={clsx(
              'h-1.5 w-1.5 rounded-full',
              run ? 'bg-orange-600' : 'bg-neutral-950/20',
            )}
          />
          <span className="eyebrow wdth-narrow text-neutral-500">
            {title || 'Live'}
          </span>
        </span>
        <span className="flex items-center gap-x-1">
          <button
            type="button"
            onClick={() => setShowSource((current) => !current)}
            className="eyebrow wdth-narrow rounded-full px-2 py-1 text-neutral-400 transition hover:bg-neutral-950/[0.04] hover:text-neutral-950"
            aria-expanded={showSource}
          >
            Source
          </button>
          <button
            type="button"
            onClick={() => setRun((current) => current + 1)}
            className="eyebrow wdth-narrow rounded-full px-2 py-1 text-neutral-400 transition hover:bg-neutral-950/[0.04] hover:text-neutral-950"
          >
            {run ? 'Restart' : 'Run'}
          </button>
        </span>
      </div>

      <div className="artifact__stage" style={{ height }}>
        {run ? (
          <iframe
            key={run}
            title={title || 'Live example'}
            srcDoc={buildDocument(code)}
            // Same-origin so the sandbox can reach the Cache API — without it
            // transformers.js re-downloads its weights on every page view. The
            // code is authored in this repo, not submitted by readers.
            sandbox="allow-scripts allow-same-origin"
            className="h-full w-full border-0"
          />
        ) : (
          <button
            type="button"
            onClick={() => setRun(1)}
            className="group/run flex h-full w-full flex-col items-center justify-center gap-y-3 bg-neutral-50 transition hover:bg-neutral-100"
          >
            <span className="eyebrow wdth-narrow rounded-full border border-neutral-950/15 px-4 py-2 text-neutral-950 transition group-hover/run:border-neutral-950/40">
              Run this
            </span>
            {note && (
              <span className="max-w-xs px-6 text-center text-sm text-neutral-500">
                {note}
              </span>
            )}
          </button>
        )}
      </div>

      <div className="artifact__source" hidden={!showSource}>
        <pre ref={listing} tabIndex={0} className={className}>
          {children}
        </pre>
      </div>
    </div>
  )
}
