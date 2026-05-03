import clsx from 'clsx'

/**
 * SparkLine — a tiny SVG line chart for tabular spec rows.
 * Pass an array of numbers (any range), it normalizes to fit.
 */
export function SparkLine({
  data,
  width = 96,
  height = 22,
  strokeWidth = 1.4,
  className,
  accent = false,
}) {
  if (!data || data.length === 0) return null

  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min || 1
  const stepX = width / (data.length - 1 || 1)

  const points = data.map((v, i) => {
    const x = i * stepX
    const y = height - ((v - min) / range) * (height - strokeWidth) - strokeWidth / 2
    return `${x.toFixed(1)},${y.toFixed(1)}`
  })

  const pathD = `M ${points.join(' L ')}`

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      className={clsx('inline-block align-middle', className)}
      aria-hidden="true"
    >
      <path
        d={pathD}
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={accent ? 'text-orange-600' : 'text-neutral-500'}
      />
      {/* trailing dot */}
      <circle
        cx={(data.length - 1) * stepX}
        cy={height - ((data[data.length - 1] - min) / range) * (height - strokeWidth) - strokeWidth / 2}
        r={2}
        className={accent ? 'fill-orange-600' : 'fill-neutral-700'}
      />
    </svg>
  )
}
