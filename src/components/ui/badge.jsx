import clsx from 'clsx'

const variants = {
  default:
    'border-transparent bg-neutral-950 text-neutral-50 hover:bg-neutral-950/80',
  secondary:
    'border-transparent bg-neutral-100 text-neutral-900 hover:bg-neutral-100/80',
  outline: 'text-neutral-950',
}

export function Badge({ className, variant = 'default', ...props }) {
  return (
    <div
      className={clsx(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2',
        variants[variant],
        className,
      )}
      {...props}
    />
  )
}

