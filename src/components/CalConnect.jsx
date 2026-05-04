'use client'

import { useEffect, useMemo, useState } from 'react'
import clsx from 'clsx'

const CAL_USERNAME = 'grouplabs'
const CAL_EVENT_SLUG = 'intro'
const EVENT_TITLE = 'Intro call'
const EVENT_LENGTH_MIN = 30
const SLOTS_URL = '/api/cal/slots'
const BOOK_URL = '/api/cal/book'

function startOfMonth(d) {
  let x = new Date(d)
  x.setDate(1)
  x.setHours(0, 0, 0, 0)
  return x
}

function addMonths(d, n) {
  let x = new Date(d)
  x.setMonth(x.getMonth() + n)
  return x
}

function dateKey(d) {
  return [
    d.getFullYear(),
    String(d.getMonth() + 1).padStart(2, '0'),
    String(d.getDate()).padStart(2, '0'),
  ].join('-')
}

function CloseIcon(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="m5.636 4.223 14.142 14.142-1.414 1.414L4.222 5.637z" />
      <path d="M4.222 18.363 18.364 4.22l1.414 1.414L5.636 19.777z" />
    </svg>
  )
}

function Field({ label, value, onChange, type = 'text', required, textarea }) {
  let common = {
    value,
    onChange: (e) => onChange(e.target.value),
    required,
    className:
      'mt-1 block w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-950 outline-none transition focus:border-orange-600',
  }
  return (
    <label className="block">
      <span className="block text-[11px] font-medium uppercase tracking-wide text-neutral-500">
        {label}
      </span>
      {textarea ? (
        <textarea rows={3} {...common} />
      ) : (
        <input type={type} {...common} />
      )}
    </label>
  )
}

export function CalConnect({ open, onClose }) {
  let timeZone = useMemo(
    () => Intl.DateTimeFormat().resolvedOptions().timeZone,
    [],
  )

  let [monthCursor, setMonthCursor] = useState(() => startOfMonth(new Date()))
  let [slotsByDate, setSlotsByDate] = useState({})
  let [loadingSlots, setLoadingSlots] = useState(false)
  let [slotsError, setSlotsError] = useState('')

  let [selectedDate, setSelectedDate] = useState(null)
  let [selectedSlot, setSelectedSlot] = useState(null)

  let [step, setStep] = useState('pick')
  let [name, setName] = useState('')
  let [email, setEmail] = useState('')
  let [notes, setNotes] = useState('')
  let [submitting, setSubmitting] = useState(false)
  let [submitError, setSubmitError] = useState('')

  useEffect(() => {
    if (open) return
    let t = setTimeout(() => {
      setStep('pick')
      setSelectedDate(null)
      setSelectedSlot(null)
      setName('')
      setEmail('')
      setNotes('')
      setSubmitError('')
    }, 200)
    return () => clearTimeout(t)
  }, [open])

  useEffect(() => {
    if (!open) return
    let onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    let prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [open, onClose])

  useEffect(() => {
    if (!open) return
    let aborted = false
    setLoadingSlots(true)
    setSlotsError('')
    let now = new Date()
    let start = monthCursor < now ? now : monthCursor
    let end = addMonths(monthCursor, 1)
    let params = new URLSearchParams()
    params.append('eventTypeSlug', CAL_EVENT_SLUG)
    params.append('usernameList[]', CAL_USERNAME)
    params.append('startTime', start.toISOString())
    params.append('endTime', end.toISOString())
    fetch(`${SLOTS_URL}?${params.toString()}`)
      .then((r) => r.json())
      .then((j) => {
        if (aborted) return
        if (j?.status === 'error') {
          throw new Error(j?.error?.message || 'Could not load availability')
        }
        let raw = j?.data?.slots ?? {}
        let map = {}
        for (let [k, v] of Object.entries(raw)) {
          map[k] = (v || []).map((s) => s.time).filter(Boolean)
        }
        setSlotsByDate(map)
      })
      .catch((e) => {
        if (!aborted) setSlotsError(e.message || 'Could not load availability')
      })
      .finally(() => {
        if (!aborted) setLoadingSlots(false)
      })
    return () => {
      aborted = true
    }
  }, [open, monthCursor, timeZone])

  let monthGrid = useMemo(() => {
    let firstDay = startOfMonth(monthCursor)
    let firstWeekday = firstDay.getDay()
    let daysInMonth = new Date(
      firstDay.getFullYear(),
      firstDay.getMonth() + 1,
      0,
    ).getDate()
    let cells = []
    for (let i = 0; i < firstWeekday; i++) cells.push(null)
    for (let d = 1; d <= daysInMonth; d++) {
      let date = new Date(firstDay)
      date.setDate(d)
      cells.push(date)
    }
    while (cells.length % 7 !== 0) cells.push(null)
    return cells
  }, [monthCursor])

  let today = useMemo(() => {
    let t = new Date()
    t.setHours(0, 0, 0, 0)
    return t
  }, [])

  let monthLabel = monthCursor.toLocaleString(undefined, {
    month: 'long',
    year: 'numeric',
  })

  let selectedSlots = selectedDate
    ? slotsByDate[dateKey(selectedDate)] || []
    : []

  async function submit(ev) {
    ev.preventDefault()
    if (!selectedSlot) return
    setSubmitting(true)
    setSubmitError('')
    try {
      let body = {
        eventTypeSlug: CAL_EVENT_SLUG,
        username: CAL_USERNAME,
        start: selectedSlot,
        attendee: {
          name,
          email,
          timeZone,
          language: 'en',
        },
        ...(notes ? { metadata: { notes } } : {}),
      }
      let r = await fetch(BOOK_URL, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(body),
      })
      let j = await r.json().catch(() => ({}))
      if (!r.ok || j?.status === 'error') {
        throw new Error(
          j?.error?.message || j?.message || `Booking failed (${r.status})`,
        )
      }
      setStep('success')
    } catch (e) {
      setSubmitError(e.message || 'Booking failed')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div
      className={clsx(
        'fixed inset-0 z-[60] flex items-center justify-center bg-neutral-950/60 p-4 transition-opacity sm:p-8',
        open ? 'opacity-100' : 'pointer-events-none opacity-0',
      )}
      onClick={onClose}
      aria-hidden={!open}
    >
      <div
        className="relative max-h-[90vh] w-full max-w-3xl overflow-hidden rounded-xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 z-10 rounded-full p-2 text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-950"
        >
          <CloseIcon className="h-4 w-4 fill-current" />
        </button>

        <div className="max-h-[90vh] overflow-y-auto p-6 sm:p-10">
          {step === 'success' ? (
            <div className="py-12 text-center">
              <h2 className="font-display text-3xl tracking-tight text-neutral-950">
                You&rsquo;re booked.
              </h2>
              <p className="mt-3 text-neutral-600">
                {selectedSlot
                  ? `We'll see you ${new Date(selectedSlot).toLocaleString(
                      undefined,
                      {
                        weekday: 'long',
                        month: 'long',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: '2-digit',
                      },
                    )}.`
                  : ''}{' '}
                A calendar invite is on its way to {email}.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="mt-8 rounded-full bg-neutral-950 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
              >
                Done
              </button>
            </div>
          ) : step === 'form' ? (
            <form onSubmit={submit} className="space-y-5">
              <div>
                <button
                  type="button"
                  onClick={() => {
                    setStep('pick')
                    setSelectedSlot(null)
                  }}
                  className="text-sm text-neutral-500 underline underline-offset-4 hover:text-orange-600"
                >
                  &larr; back
                </button>
                <h2 className="mt-3 font-display text-2xl tracking-tight text-neutral-950">
                  Confirm your details
                </h2>
                <p className="mt-1 text-sm text-neutral-600">
                  {selectedSlot &&
                    new Date(selectedSlot).toLocaleString(undefined, {
                      weekday: 'long',
                      month: 'long',
                      day: 'numeric',
                      hour: 'numeric',
                      minute: '2-digit',
                    })}{' '}
                  &middot; {timeZone}
                </p>
              </div>

              <Field label="Name" value={name} onChange={setName} required />
              <Field
                label="Email"
                type="email"
                value={email}
                onChange={setEmail}
                required
              />
              <Field
                label="Notes (optional)"
                value={notes}
                onChange={setNotes}
                textarea
              />

              {submitError && (
                <p className="text-sm text-orange-700">{submitError}</p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="rounded-full bg-orange-600 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-orange-700 disabled:opacity-60"
              >
                {submitting ? 'Booking…' : 'Confirm'}
              </button>
            </form>
          ) : (
            <div>
              <div className="flex flex-wrap items-baseline justify-between gap-4">
                <div>
                  <h2 className="font-display text-2xl tracking-tight text-neutral-950">
                    {EVENT_TITLE}
                  </h2>
                  <p className="mt-1 text-sm text-neutral-600">
                    {EVENT_LENGTH_MIN} min &middot; {timeZone}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setMonthCursor((m) => addMonths(m, -1))}
                    disabled={monthCursor <= startOfMonth(new Date())}
                    aria-label="Previous month"
                    className="rounded-full px-2 py-1 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-950 disabled:opacity-40"
                  >
                    &lsaquo;
                  </button>
                  <span className="min-w-[8rem] text-center text-sm font-medium text-neutral-950">
                    {monthLabel}
                  </span>
                  <button
                    type="button"
                    onClick={() => setMonthCursor((m) => addMonths(m, 1))}
                    aria-label="Next month"
                    className="rounded-full px-2 py-1 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-950"
                  >
                    &rsaquo;
                  </button>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-[1fr_14rem]">
                <div>
                  <div className="grid grid-cols-7 gap-1 text-center text-[11px] uppercase tracking-wide text-neutral-500">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(
                      (d) => (
                        <div key={d} className="py-1">
                          {d}
                        </div>
                      ),
                    )}
                  </div>
                  <div className="mt-1 grid grid-cols-7 gap-1">
                    {monthGrid.map((cell, i) => {
                      if (!cell) return <div key={i} />
                      let key = dateKey(cell)
                      let hasSlots = (slotsByDate[key] || []).length > 0
                      let isPast = cell < today
                      let disabled = isPast || !hasSlots
                      let isSelected =
                        selectedDate && dateKey(selectedDate) === key
                      return (
                        <button
                          key={i}
                          type="button"
                          onClick={() => !disabled && setSelectedDate(cell)}
                          disabled={disabled}
                          className={clsx(
                            'aspect-square rounded-md text-sm transition-colors',
                            disabled
                              ? 'text-neutral-300'
                              : isSelected
                                ? 'bg-orange-600 text-white'
                                : 'bg-neutral-100 text-neutral-950 hover:bg-orange-100',
                          )}
                        >
                          {cell.getDate()}
                        </button>
                      )
                    })}
                  </div>
                  {loadingSlots && (
                    <p className="mt-3 text-xs text-neutral-500">
                      Loading availability&hellip;
                    </p>
                  )}
                  {slotsError && (
                    <p className="mt-3 text-xs text-orange-700">{slotsError}</p>
                  )}
                </div>

                <div>
                  <p className="text-sm font-medium text-neutral-950">
                    {selectedDate
                      ? selectedDate.toLocaleDateString(undefined, {
                          weekday: 'long',
                          month: 'short',
                          day: 'numeric',
                        })
                      : 'Select a day'}
                  </p>
                  <div className="mt-3 max-h-72 space-y-1.5 overflow-y-auto pr-1 sm:max-h-80">
                    {selectedDate && selectedSlots.length === 0 && (
                      <p className="text-xs text-neutral-500">
                        No times on this day.
                      </p>
                    )}
                    {selectedSlots.map((iso) => (
                      <button
                        key={iso}
                        type="button"
                        onClick={() => {
                          setSelectedSlot(iso)
                          setStep('form')
                        }}
                        className="w-full rounded-md border border-neutral-200 px-3 py-2 text-left text-sm text-neutral-950 transition-colors hover:border-orange-600 hover:text-orange-600"
                      >
                        {new Date(iso).toLocaleTimeString(undefined, {
                          hour: 'numeric',
                          minute: '2-digit',
                        })}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
