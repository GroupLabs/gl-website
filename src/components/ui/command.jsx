import clsx from 'clsx'
import { forwardRef } from 'react'
import { Command as CommandPrimitive } from 'cmdk'

export const Command = forwardRef(function Command({ className, ...props }, ref) {
  return (
    <CommandPrimitive
      ref={ref}
      className={clsx('flex h-full w-full flex-col overflow-hidden rounded-md bg-white', className)}
      {...props}
    />
  )
})
Command.displayName = CommandPrimitive.displayName

export const CommandInput = forwardRef(function CommandInput(
  { className, ...props },
  ref,
) {
  return (
    <CommandPrimitive.Input
      ref={ref}
      className={clsx(
        'flex h-10 w-full border-b border-neutral-200 bg-transparent px-3 py-2 text-sm outline-none placeholder:text-neutral-500',
        className,
      )}
      {...props}
    />
  )
})
CommandInput.displayName = CommandPrimitive.Input.displayName

export const CommandList = forwardRef(function CommandList(
  { className, ...props },
  ref,
) {
  return (
    <CommandPrimitive.List
      ref={ref}
      className={clsx('max-h-60 overflow-y-auto', className)}
      {...props}
    />
  )
})
CommandList.displayName = CommandPrimitive.List.displayName

export const CommandEmpty = forwardRef(function CommandEmpty(
  { className, ...props },
  ref,
) {
  return (
    <CommandPrimitive.Empty
      ref={ref}
      className={clsx('py-6 text-center text-sm', className)}
      {...props}
    />
  )
})
CommandEmpty.displayName = CommandPrimitive.Empty.displayName

export const CommandGroup = forwardRef(function CommandGroup(
  { className, ...props },
  ref,
) {
  return (
    <CommandPrimitive.Group
      ref={ref}
      className={clsx('overflow-hidden p-1 text-neutral-950', className)}
      {...props}
    />
  )
})
CommandGroup.displayName = CommandPrimitive.Group.displayName

export const CommandItem = forwardRef(function CommandItem(
  { className, ...props },
  ref,
) {
  return (
    <CommandPrimitive.Item
      ref={ref}
      className={clsx(
        'flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-neutral-100',
        className,
      )}
      {...props}
    />
  )
})
CommandItem.displayName = CommandPrimitive.Item.displayName

