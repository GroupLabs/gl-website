'use client'

import { useId } from 'react'
import { Button } from '@/components/Button'
import { FadeIn } from '@/components/FadeIn'

function TextInput({ label, ...props }) {
  let id = useId()

  return (
    <div className="group relative z-0 transition-all focus-within:z-10">
      <input
        type="text"
        id={id}
        {...props}
        placeholder=" "
        className="peer block w-full border border-neutral-300 bg-transparent px-6 pb-4 pt-12 text-base/6 text-neutral-950 ring-4 ring-transparent transition focus:border-neutral-950 focus:outline-none focus:ring-neutral-950/5 group-first:rounded-t-2xl group-last:rounded-b-2xl"
      />
      <label
        htmlFor={id}
        className="pointer-events-none absolute left-6 top-1/2 -mt-3 origin-left text-base/6 text-neutral-500 transition-all duration-200 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:font-semibold peer-focus:text-neutral-950 peer-[:not(:placeholder-shown)]:-translate-y-4 peer-[:not(:placeholder-shown)]:scale-75 peer-[:not(:placeholder-shown)]:font-semibold peer-[:not(:placeholder-shown)]:text-neutral-950"
      >
        {label}
      </label>
    </div>
  )
}

export function ContactForm() {
  const handleFormSubmit = async (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    
    try {
      await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData).toString(),
      })
      
      // Redirect to thank you page on success
      window.location.href = "/thank-you"
    } catch (error) {
      console.error("Form submission error:", error)
      alert("There was an error submitting the form. Please try again.")
    }
  }

  return (
    <FadeIn className="lg:order-last">
      <form
        className="max-w-lg"
        name="contact"
        onSubmit={handleFormSubmit}
      >
        <input type="hidden" name="form-name" value="contact" />

        <p className="hidden">
          <label>
            Don&apos;t fill this out if you are human:{' '}
            <input name="bot-field" />
          </label>
        </p>

        <h2 className="font-display text-base font-semibold text-neutral-950">
          Work inquiries
        </h2>
        <div className="isolate mt-6 -space-y-px rounded-2xl bg-white/50">
          <TextInput label="Name" name="name" autoComplete="name" />
          <TextInput
            label="Email"
            type="email"
            name="email"
            autoComplete="email"
            required
          />
          <TextInput label="Message (optional)" name="message" />
        </div>
        <Button type="submit" className="mt-10">
          Let&apos;s work together
        </Button>
      </form>
    </FadeIn>
  )
}