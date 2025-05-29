import clsx from 'clsx'

import { Blockquote } from '@/components/Blockquote'
import { Border } from '@/components/Border'
import { GrayscaleTransitionImage } from '@/components/GrayscaleTransitionImage'
import { StatList, StatListItem } from '@/components/StatList'
import { TagList, TagListItem } from '@/components/TagList'

export const MDXComponents = {
  Blockquote({ className, ...props }) {
    return <Blockquote className={clsx('my-32', className)} {...props} />
  },
  img: function Img({ className, ...props }) {
    return (
      <div
        className={clsx(
          'group isolate my-10 overflow-hidden rounded-4xl bg-neutral-100 max-sm:-mx-6',
          className,
        )}
      >
        <GrayscaleTransitionImage
          {...props}
          sizes="(min-width: 768px) 42rem, 100vw"
          className="aspect-[16/10] w-full object-cover"
        />
      </div>
    )
  },
  StatList({ className, ...props }) {
    return (
      <StatList className={clsx('my-32 !max-w-none', className)} {...props} />
    )
  },
  StatListItem,
  table: function Table({ className, ...props }) {
    return (
      <div
        className={clsx(
          'my-10 max-sm:-mx-6 max-sm:flex max-sm:overflow-x-auto',
          className,
        )}
      >
        <div className="max-sm:min-w-full max-sm:flex-none max-sm:px-6">
          <table {...props} />
        </div>
      </div>
    )
  },
  TagList({ className, ...props }) {
    return <TagList className={clsx('my-6', className)} {...props} />
  },
  TagListItem,
  TopTip({ children, className }) {
    return (
      <Border position="left" className={clsx('my-10 pl-8', className)}>
        <p className="font-display text-sm font-bold uppercase tracking-widest text-neutral-950">
          Top tip
        </p>
        <div className="mt-4">{children}</div>
      </Border>
    )
  },
  Typography({ className, ...props }) {
    return <div className={clsx('typography', className)} {...props} />
  },
  wrapper({ className, ...props }) {
    return (
      <div
        className={clsx(
          '[&>*]:mx-auto [&>*]:max-w-3xl [&>:first-child]:!mt-0 [&>:last-child]:!mb-0',
          '[&>.katex-display]:!max-w-none',
          className,
        )}
        {...props}
      />
    )
  },
  blockquote({ className, author, image, ...props }) {
    if (author) {
      return <Blockquote className={clsx('my-32', className)} author={author} image={image} {...props} />
    }
    
    return (
      <Border position="left" className={clsx('my-10 pl-8', className)}>
        <blockquote 
          className="text-xl/7 text-neutral-600 [&>*]:relative"
          {...props}
        />
      </Border>
    )
  },
  pre({ className, ...props }) {
    return (
      <pre 
        className={clsx('w-full overflow-x-auto', className)} 
        {...props}
      />
    )
  },
  code({ className, ...props }) {
    const isInline = !className || !className.includes('language-')
    
    if (isInline) {
      return (
        <code 
          className="rounded-md bg-neutral-100 px-2 py-1 text-sm font-medium text-neutral-900 before:content-[''] after:content-['']"
          {...props}
        />
      )
    }
    
    return <code className={className} {...props} />
  },
}
