import clsx from 'clsx'
import { forwardRef } from 'react'

const variants = {
  default:
    'inline-flex items-center justify-center rounded-md bg-neutral-950 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-950 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
  outline:
    'inline-flex items-center justify-center rounded-md border border-neutral-300 bg-transparent px-3 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-950 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
}

export const Button = forwardRef(function Button(
  { className, variant = 'default', ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      className={clsx(variants[variant], className)}
      {...props}
    />
  )
})

