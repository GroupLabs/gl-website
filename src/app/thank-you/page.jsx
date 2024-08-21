import Link from 'next/link'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { Logo } from '@/components/Logo'

export default function ThankYou() {
  return (
    <Container className="mt-24 w-full sm:mt-32 lg:mt-40 text-center">
      <FadeIn>
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-display font-semibold text-neutral-950">
            Thank You!
          </h1>
          <p className="mt-6 text-lg text-neutral-700">
            We appreciate you reaching out. Your message has been received, and we&apos;ll get back to you as soon as possible.
          </p>
          <div className="mt-12">
            <Link href="/" className="inline-block rounded-xl bg-neutral-950 text-white px-8 py-4 text-sm font-semibold transition hover:bg-neutral-800">
                Return to Home
            </Link>
          </div>
          <div className="mt-12">
            <Logo className="h-12 mx-auto" />
          </div>
        </div>
      </FadeIn>
    </Container>
  )
}