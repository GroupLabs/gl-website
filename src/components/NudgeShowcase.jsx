'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import clsx from 'clsx'

const NUDGE_BLUE = '#2563EB'
const STEP_MS = 3600

// Each step represents one frame of the live walkthrough. The fake app actually
// progresses through these states (dashboard → settings/general → settings/team)
// so the cursor caption and the highlighted element line up.
const STEPS = [
  {
    id: 'ask',
    label: 'User asks',
    caption: 'Type the question',
    view: 'dashboard',
    settingsTab: null,
    cursor: { x: 62, y: 5 },
  },
  {
    id: 'open-settings',
    label: 'Step 1 / 3',
    caption: "Open 'Settings'",
    view: 'dashboard',
    settingsTab: null,
    cursor: { x: 12, y: 92 },
  },
  {
    id: 'open-team',
    label: 'Step 2 / 3',
    caption: "Switch to 'Team'",
    view: 'settings',
    settingsTab: 'general',
    cursor: { x: 44, y: 16 },
  },
  {
    id: 'send-invite',
    label: 'Step 3 / 3',
    caption: "Click 'Send invite'",
    view: 'settings',
    settingsTab: 'team',
    cursor: { x: 86, y: 92 },
  },
]

function CursorGlyph({ className }) {
  return (
    <svg viewBox="0 0 22 28" className={className} aria-hidden="true">
      <path
        d="M2 2 L2 24 L7.5 19.5 L11 27 L14 25.5 L10.5 18 L18 18 Z"
        fill={NUDGE_BLUE}
        stroke="white"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function GearIcon({ className }) {
  return (
    <svg
      viewBox="0 0 16 16"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <circle cx="8" cy="8" r="2.5" />
      <path
        d="M8 1.5v2M8 12.5v2M14.5 8h-2M3.5 8h-2M12.6 3.4l-1.4 1.4M4.8 11.2l-1.4 1.4M12.6 12.6l-1.4-1.4M4.8 4.8 3.4 3.4"
        strokeLinecap="round"
      />
    </svg>
  )
}

function NavRail({ highlightSettings }) {
  const items = [
    { id: 'home', glyph: '◇', label: 'Home' },
    { id: 'projects', glyph: '▣', label: 'Projects', active: true },
    { id: 'inbox', glyph: '▢', label: 'Inbox' },
    { id: 'team', glyph: '○', label: 'Team' },
  ]
  return (
    <nav className="flex h-full w-[26%] flex-col border-r border-neutral-950/10 bg-neutral-50/70 px-1.5 py-2">
      <div className="flex items-center gap-1.5 px-1.5 py-1">
        <span className="grid h-3.5 w-3.5 place-items-center rounded-sm bg-neutral-950 font-mono text-[7px] font-bold text-white">
          A
        </span>
        <span className="font-mono text-[8.5px] font-semibold text-neutral-950">
          Acme
        </span>
      </div>

      <div className="mt-3 space-y-0.5">
        {items.map((it) => (
          <div
            key={it.id}
            className={clsx(
              'flex items-center gap-1.5 rounded px-1.5 py-1',
              it.active && 'bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.05)]',
            )}
          >
            <span
              className={clsx(
                'font-mono text-[9px]',
                it.active ? 'text-neutral-950' : 'text-neutral-400',
              )}
            >
              {it.glyph}
            </span>
            <span
              className={clsx(
                'font-mono text-[8.5px]',
                it.active
                  ? 'font-semibold text-neutral-950'
                  : 'text-neutral-500',
              )}
            >
              {it.label}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-auto border-t border-neutral-950/10 pt-2 pb-3">
        <motion.div
          animate={{
            backgroundColor: highlightSettings
              ? 'rgba(37,99,235,0.10)'
              : 'rgba(37,99,235,0)',
          }}
          transition={{ duration: 0.3 }}
          className="flex items-center gap-1.5 rounded px-1.5 py-1"
        >
          <GearIcon
            className={clsx(
              'h-3 w-3',
              highlightSettings ? 'text-neutral-950' : 'text-neutral-500',
            )}
          />
          <span
            className={clsx(
              'font-mono text-[8.5px]',
              highlightSettings
                ? 'font-semibold text-neutral-950'
                : 'text-neutral-500',
            )}
          >
            Settings
          </span>
        </motion.div>
      </div>
    </nav>
  )
}

function SearchBar({ asking }) {
  return (
    <div className="border-b border-neutral-950/10 px-2.5 py-2">
      <div className="flex items-center gap-1.5 rounded-md border border-neutral-950/15 bg-white px-2 py-1.5">
        <svg
          viewBox="0 0 16 16"
          className="h-3 w-3 flex-shrink-0 text-neutral-400"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <circle cx="7" cy="7" r="4.5" />
          <path d="m11 11 3.5 3.5" strokeLinecap="round" />
        </svg>
        <span className="flex-1 truncate font-mono text-[10px] tracking-tight">
          {asking ? (
            <span className="text-neutral-950">
              How do I invite a teammate?
              <span className="ml-0.5 inline-block h-2.5 w-px bg-neutral-950 align-middle animate-blink-caret" />
            </span>
          ) : (
            <span className="text-neutral-400">Ask Nudge anything…</span>
          )}
        </span>
        <span
          className="ml-auto flex-shrink-0 rounded px-1.5 py-0.5 font-mono text-[8px] font-semibold tracking-wider"
          style={{ background: 'rgba(37,99,235,0.10)', color: NUDGE_BLUE }}
        >
          ⌘K
        </span>
      </div>
    </div>
  )
}

function DashboardView() {
  const stats = [
    { label: 'Active', value: '2.8k' },
    { label: 'Today', value: '+182' },
    { label: 'Week', value: '94%' },
  ]
  const rows = [80, 62, 90, 48]
  return (
    <div className="flex h-full flex-col gap-2 p-2">
      <div className="grid grid-cols-3 gap-1.5">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-md border border-neutral-950/10 bg-white px-2 py-1.5"
          >
            <div className="font-mono text-[7px] uppercase tracking-wider text-neutral-500">
              {s.label}
            </div>
            <div className="mt-0.5 font-mono tabular text-[12px] font-medium text-neutral-950">
              {s.value}
            </div>
          </div>
        ))}
      </div>

      <div className="flex-1 rounded-md border border-neutral-950/10 bg-white">
        <div className="flex items-center justify-between border-b border-neutral-950/10 px-2 py-1.5">
          <span className="font-mono text-[8px] uppercase tracking-wider text-neutral-500">
            Recent
          </span>
          <span className="font-mono text-[7px] text-neutral-400">last 24h</span>
        </div>
        <div className="space-y-2 p-2">
          {rows.map((w, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-neutral-200" />
              <div
                className="h-1.5 rounded-sm bg-neutral-200"
                style={{ width: `${w}%` }}
              />
              <div className="ml-auto h-1.5 w-6 rounded-sm bg-neutral-100" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function SettingsGeneralPanel() {
  const fields = [
    { label: 'Workspace name', value: 'Acme Inc.' },
    { label: 'URL slug', value: 'acme' },
    { label: 'Default timezone', value: 'America/Vancouver' },
  ]
  return (
    <div className="space-y-2 p-2.5">
      {fields.map((f) => (
        <div key={f.label}>
          <div className="font-mono text-[7px] uppercase tracking-wider text-neutral-500">
            {f.label}
          </div>
          <div className="mt-1 rounded border border-neutral-950/10 bg-neutral-50 px-2 py-1 font-mono text-[9px] text-neutral-700">
            {f.value}
          </div>
        </div>
      ))}
    </div>
  )
}

function SettingsTeamPanel({ highlightInvite }) {
  const members = [
    ['JS', 'Jamie Singh', 'Owner'],
    ['AR', 'Ari Romero', 'Admin'],
    ['MK', 'Mae Kovac', 'Editor'],
  ]
  return (
    <div className="flex h-full flex-col gap-2 p-2.5">
      <div className="rounded-md border border-neutral-950/10 bg-white">
        <div className="flex items-center justify-between border-b border-neutral-950/10 px-2 py-1.5">
          <span className="font-mono text-[8px] uppercase tracking-wider text-neutral-500">
            3 members
          </span>
          <span className="font-mono text-[7px] text-neutral-400">all roles</span>
        </div>
        {members.map(([init, name, role], i) => (
          <div
            key={init}
            className={clsx(
              'flex items-center gap-2 px-2 py-1.5',
              i > 0 && 'border-t border-neutral-950/5',
            )}
          >
            <div className="grid h-4 w-4 place-items-center rounded-full bg-neutral-200 font-mono text-[7px] font-semibold text-neutral-700">
              {init}
            </div>
            <div className="font-mono text-[9px] text-neutral-950">{name}</div>
            <div className="ml-auto font-mono text-[8px] text-neutral-500">
              {role}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-auto rounded-md border border-neutral-950/10 bg-neutral-50 p-2">
        <div className="font-mono text-[7px] uppercase tracking-wider text-neutral-500">
          Invite by email
        </div>
        <div className="mt-1.5 flex items-center gap-1.5">
          <div className="flex-1 truncate rounded border border-neutral-950/15 bg-white px-2 py-1 font-mono text-[9px] text-neutral-700">
            teammate@acme.com
          </div>
          <motion.div
            animate={{
              boxShadow: highlightInvite
                ? '0 0 0 2px rgba(37,99,235,0.45)'
                : '0 0 0 0px rgba(37,99,235,0)',
            }}
            transition={{ duration: 0.3 }}
            className="rounded px-2.5 py-1 font-mono text-[9px] font-semibold text-white"
            style={{ background: NUDGE_BLUE }}
          >
            Send invite
          </motion.div>
        </div>
      </div>
    </div>
  )
}

function SettingsView({ tab }) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-1 border-b border-neutral-950/10 px-2.5 py-1.5 font-mono text-[8px] text-neutral-500">
        <span>Settings</span>
        <span className="text-neutral-300">/</span>
        <span className="capitalize text-neutral-950">{tab}</span>
      </div>

      <div className="relative flex border-b border-neutral-950/10">
        {['general', 'team', 'billing'].map((t) => {
          const isActive = t === tab
          return (
            <div
              key={t}
              className={clsx(
                'relative px-2.5 py-1.5 font-mono text-[9px] capitalize',
                isActive ? 'text-neutral-950' : 'text-neutral-500',
              )}
            >
              {t}
              {isActive && (
                <motion.div
                  layoutId="settings-tab-underline"
                  className="absolute inset-x-1.5 -bottom-px h-0.5"
                  style={{ background: NUDGE_BLUE }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                />
              )}
            </div>
          )
        })}
      </div>

      <div className="relative flex-1 overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            {tab === 'general' ? (
              <SettingsGeneralPanel />
            ) : (
              <SettingsTeamPanel highlightInvite />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

export function NudgeShowcase({ className }) {
  const shouldReduceMotion = useReducedMotion()
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (shouldReduceMotion) return
    const id = setInterval(() => {
      setActive((i) => (i + 1) % STEPS.length)
    }, STEP_MS)
    return () => clearInterval(id)
  }, [shouldReduceMotion])

  const step = STEPS[active]
  const headerPath =
    step.view === 'settings'
      ? `acme.app/settings/${step.settingsTab}`
      : 'acme.app/dashboard'

  // Flip the tooltip toward the interior of the frame so it never clips.
  const flipX = step.cursor.x > 56
  const flipY = step.cursor.y > 62

  return (
    <div className={clsx('relative w-full max-w-md', className)}>
      <div
        aria-hidden="true"
        className="absolute -bottom-3 -right-3 left-3 top-3 -z-10 border border-neutral-950/10 bg-neutral-50"
      />

      <article className="relative flex aspect-[4/5] flex-col overflow-hidden border border-neutral-950/15 bg-white">
        {/* spec header */}
        <header className="flex items-center justify-between border-b border-neutral-950/10 px-3 py-2 eyebrow text-neutral-500">
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-neutral-300" />
            <span className="h-1.5 w-1.5 rounded-full bg-neutral-300" />
            <span className="h-1.5 w-1.5 rounded-full bg-neutral-300" />
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={headerPath}
                initial={{ opacity: 0, y: -2 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 2 }}
                transition={{ duration: 0.25 }}
                className="ml-3 font-mono text-[9px] tracking-tight text-neutral-700"
              >
                {headerPath}
              </motion.span>
            </AnimatePresence>
          </span>
          <span className="flex items-center gap-1.5">
            <span
              className="relative inline-flex h-1.5 w-1.5 rounded-full"
              style={{ background: NUDGE_BLUE }}
            />
            Live
          </span>
        </header>

        {/* body */}
        <div className="relative flex-1 overflow-hidden">
          <div className="flex h-full">
            <NavRail highlightSettings={step.id === 'open-settings'} />

            <div className="flex flex-1 flex-col">
              <SearchBar asking={step.id === 'ask'} />

              <div className="relative flex-1 overflow-hidden bg-white">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={step.view}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0"
                  >
                    {step.view === 'settings' ? (
                      <SettingsView tab={step.settingsTab} />
                    ) : (
                      <DashboardView />
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* spotlight ring on active target */}
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute h-14 w-14 -translate-x-1/2 -translate-y-1/2 rounded-full"
            initial={false}
            animate={{
              left: `${step.cursor.x}%`,
              top: `${step.cursor.y}%`,
            }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            style={{
              boxShadow: `0 0 0 2px ${NUDGE_BLUE}, 0 0 0 6px rgba(37,99,235,0.18), 0 0 28px 4px rgba(37,99,235,0.25)`,
              background:
                'radial-gradient(circle, rgba(37,99,235,0.18) 0%, rgba(37,99,235,0.04) 60%, transparent 75%)',
            }}
          />

          {/* click ripple — fires once each time the cursor settles */}
          <motion.div
            key={`ripple-${step.id}`}
            aria-hidden="true"
            className="pointer-events-none absolute h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full border-2"
            style={{
              borderColor: NUDGE_BLUE,
              left: `${step.cursor.x}%`,
              top: `${step.cursor.y}%`,
            }}
            initial={{ scale: 0.45, opacity: 0.7 }}
            animate={{ scale: 1.7, opacity: 0 }}
            transition={{ duration: 0.7, delay: 0.65, ease: 'easeOut' }}
          />

          {/* animated cursor + tooltip */}
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute z-10"
            initial={false}
            animate={{
              left: `calc(${step.cursor.x}% + 6px)`,
              top: `calc(${step.cursor.y}% + 6px)`,
            }}
            transition={{ duration: 0.65, ease: [0.5, 0.05, 0.2, 1] }}
          >
            <CursorGlyph className="h-5 w-5 drop-shadow-[0_2px_4px_rgba(37,99,235,0.45)]" />

            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.32, delay: 0.5 }}
              className={clsx(
                'absolute whitespace-nowrap',
                flipX ? 'right-5' : 'left-5',
                flipY ? 'bottom-5' : 'top-5',
              )}
            >
              <div
                className={clsx(
                  'flex flex-col gap-1',
                  flipX ? 'items-end' : 'items-start',
                )}
              >
                <span
                  className="rounded-sm px-1.5 py-0.5 font-mono text-[8px] font-bold uppercase tracking-[0.18em] text-white"
                  style={{ background: NUDGE_BLUE }}
                >
                  {step.label}
                </span>
                <span className="rounded-sm border border-neutral-950/15 bg-white px-2 py-1 font-mono text-[10px] text-neutral-950 shadow-sm">
                  {step.caption}
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* spec footer */}
        <footer className="flex items-baseline justify-between border-t border-neutral-950/10 px-3 py-2 eyebrow text-neutral-500">
          <span className="wdth-narrow">Live walkthrough</span>
          <span className="font-mono">
            step {active + 1} / {STEPS.length}
          </span>
        </footer>
      </article>
    </div>
  )
}
