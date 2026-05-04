'use client'

import { useEffect, useState } from 'react'

const HM = (tz) =>
  new Intl.DateTimeFormat('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: tz,
  }).format(new Date())

export function LocalTime({ tz, className }) {
  const [time, setTime] = useState(null)

  useEffect(() => {
    setTime(HM(tz))
    const id = setInterval(() => setTime(HM(tz)), 30_000)
    return () => clearInterval(id)
  }, [tz])

  return (
    <span className={className} suppressHydrationWarning>
      {time ?? '—:—'}
    </span>
  )
}
