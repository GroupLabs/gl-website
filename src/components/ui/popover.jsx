import clsx from 'clsx'
import { forwardRef } from 'react'
import * as PopoverPrimitive from '@radix-ui/react-popover'

export const Popover = PopoverPrimitive.Root
export const PopoverTrigger = PopoverPrimitive.Trigger

export const PopoverContent = forwardRef(function PopoverContent(
  { className, align = 'center', sideOffset = 4, ...props },
  ref,
) {
  return (
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={clsx(
        'z-50 w-72 rounded-md border border-neutral-200 bg-white p-4 text-neutral-950 shadow-md outline-none',
        className,
      )}
      {...props}
    />
  )
})
PopoverContent.displayName = PopoverPrimitive.Content.displayName

