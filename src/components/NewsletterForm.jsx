'use client'

export function NewsletterForm() {
  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    
    try {
      await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData).toString(),
      })
      
      // Redirect to thank you page on success
      window.location.href = "/thank-you"
    } catch (error) {
      console.error("Newsletter submission error:", error)
      alert("There was an error subscribing. Please try again.")
    }
  }

  return (
    <form
      className="max-w-sm"
      name="newsletter"
      onSubmit={handleSubmit}
    >
      <input type="hidden" name="form-name" value="newsletter" />
      <p className="hidden">
        <label>
          Don&apos;t fill this out if you are human: <input name="bot-field" />
        </label>
      </p>
      <h2 className="font-display text-sm font-semibold tracking-wider text-neutral-950">
        Sign up for our newsletter
      </h2>
      <p className="mt-4 pr-3 text-sm text-neutral-700">
        Subscribe to get the latest news, blogs, and resources.
      </p>
      <div className="relative mt-6">
        <input
          type="email"
          name="email"
          placeholder="Email address"
          autoComplete="email"
          aria-label="Email address"
          className="block w-full rounded-2xl border border-neutral-300 bg-transparent py-4 pl-6 pr-20 text-base/6 text-neutral-950 ring-4 ring-transparent transition placeholder:text-neutral-500 focus:border-neutral-950 focus:outline-none focus:ring-neutral-950/5"
          required
        />
        <div className="absolute inset-y-1 right-1 flex justify-end">
          <button
            type="submit"
            aria-label="Submit"
            className="flex aspect-square h-full items-center justify-center rounded-xl bg-neutral-950 text-white transition hover:bg-neutral-800"
          >
            <ArrowIcon className="w-4" />
          </button>
        </div>
      </div>
    </form>
  )
}

function ArrowIcon(props) {
  return (
    <svg viewBox="0 0 16 6" aria-hidden="true" {...props}>
      <path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16 3 10 .5v2H0v1h10v2L16 3Z"
      />
    </svg>
  )
}