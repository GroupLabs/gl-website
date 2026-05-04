'use client'

import { CanadaMap } from '@/components/CanadaMap'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { LocalTime } from '@/components/LocalTime'
import { useConnect } from '@/components/RootLayout'

const OFFICES = [
  {
    n: '01',
    city: 'Calgary',
    region: 'Alberta',
    role: 'Studio HQ',
    phone: '+1 (587) 700-9968',
    tel: '+15877009968',
    coords: '51.0486°N · 114.0708°W',
    tz: 'America/Edmonton',
    abbr: 'MST',
    utc: 'UTC−07',
  },
  {
    n: '02',
    city: 'Montreal',
    region: 'Quebec',
    role: 'Satellite office',
    phone: '+1 (825) 365-9891',
    tel: '+18253659891',
    coords: '45.5089°N · 73.5542°W',
    tz: 'America/Toronto',
    abbr: 'EST',
    utc: 'UTC−05',
  },
]

export function ContactCTA() {
  const openConnect = useConnect()

  return (
    <section
      id="contact"
      className="relative isolate mt-32 scroll-mt-24 overflow-hidden bg-white sm:mt-40 lg:mt-52"
    >

      <Container className="py-24 sm:py-32 lg:py-40">
        {/* TOP STRIP — section number, sub-header, live status */}
        <FadeIn>
          <div className="border-neutral-950/15 flex flex-wrap items-center gap-x-4 gap-y-2 border-b pb-3">
            <p className="eyebrow wdth-narrow text-orange-600">
              <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-orange-600 align-middle" />
              §&nbsp;03 &nbsp;·&nbsp; Engagement intake
            </p>
            <span
              aria-hidden="true"
              className="bg-neutral-950/15 hidden h-px flex-1 sm:block"
            />
            <p className="eyebrow wdth-narrow text-neutral-500">
              Direct line — no forms, no funnels
            </p>
            <span
              aria-hidden="true"
              className="bg-neutral-950/15 hidden h-px w-8 lg:block"
            />
            <p className="eyebrow wdth-narrow flex items-center gap-2 text-emerald-700">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-70" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-600" />
              </span>
              Accepting Q3 engagements
            </p>
          </div>
        </FadeIn>

        {/* HERO — manifesto + email + actions on the left, transmission map on the right */}
        <div className="mt-16 grid grid-cols-1 gap-x-12 gap-y-16 lg:mt-24 lg:grid-cols-12 lg:gap-y-0">
          <FadeIn className="lg:col-span-7">
            <p className="eyebrow wdth-narrow text-neutral-500">
              <span className="tabular text-neutral-950">01 /</span>{' '}
              Start a brief
            </p>
            <h2
              className="wdth-wide mt-5 font-display text-[clamp(2.5rem,6.5vw,5rem)] font-medium leading-[0.98] tracking-tight text-neutral-950
                           [text-wrap:balance]"
            >
              Talk to the people who’ll{' '}
              <span className="italic text-neutral-700">do the work</span>
              <span className="text-orange-600">.</span>
            </h2>

            <div className="mt-10 max-w-xl space-y-5 text-base leading-relaxed text-neutral-700 sm:text-lg">
              <p>
                We staff small and senior, scope by phase, and end on a written
                deliverable. We don’t sell decks or hours.
              </p>
              <p className="text-neutral-500">
                If we’re not the right team for the job, we say so on the first
                call. The bar is production, not pitch.
              </p>
            </div>

            {/* email — mono, large, with hover underline + arrow */}
            <a
              href="mailto:team@grouplabs.ca?subject=%5BBrief%5D%20"
              className="group relative mt-12 block w-fit"
              aria-label="Email team@grouplabs.ca"
            >
              <span className="absolute -left-9 top-1/2 hidden -translate-y-1/2 font-mono text-sm text-neutral-400 transition-all duration-500 group-hover:-translate-x-1 group-hover:text-orange-600 sm:block">
                →
              </span>
              <span className="tabular block font-mono text-[clamp(1.5rem,5vw,3.25rem)] font-medium leading-[1] tracking-tight text-neutral-950">
                team
                <span className="text-neutral-400 transition-colors duration-500 group-hover:text-orange-600">
                  @
                </span>
                grouplabs
                <span className="text-neutral-400 transition-colors duration-500 group-hover:text-orange-600">
                  .
                </span>
                ca
              </span>
              <span
                aria-hidden="true"
                className="absolute -bottom-2 left-0 h-px w-full origin-left scale-x-0 bg-orange-600 transition-transform duration-700 ease-out group-hover:scale-x-100"
              />
            </a>

            {/* dual CTAs — compose / schedule */}
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <a
                href="mailto:team@grouplabs.ca?subject=%5BBrief%5D%20"
                className="group inline-flex items-center gap-2 rounded-full bg-neutral-950 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-orange-600"
              >
                Compose a brief
                <span
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:translate-x-0.5"
                >
                  →
                </span>
              </a>
              <button
                type="button"
                onClick={openConnect}
                className="group inline-flex items-center gap-2 rounded-full border border-neutral-950/20 bg-white/60 px-5 py-3 text-sm font-medium text-neutral-950 backdrop-blur-sm transition-colors hover:border-orange-600/40 hover:text-orange-600"
              >
                Schedule a call
                <span
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                >
                  ↗
                </span>
              </button>
              <span className="ml-1 font-mono text-[11px] uppercase tracking-[0.18em] text-neutral-500">
                30 min · intro
              </span>
            </div>
          </FadeIn>

          {/* MAP — transmission chart on light paper */}
          <FadeIn className="lg:col-span-5">
            <figure
              className="relative w-full overflow-hidden border border-neutral-950/15 bg-white"
              style={{ aspectRatio: '10/9' }}
            >
              {/* Orange blueprint grid — minor 20px + major 100px lines.
                  Sits behind the country outline, contained to the map frame. */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
                style={{
                  backgroundImage:
                    'linear-gradient(to right, rgba(234,88,12,0.10) 1px, transparent 1px), linear-gradient(to bottom, rgba(234,88,12,0.10) 1px, transparent 1px)',
                  backgroundSize: '20px 20px',
                  backgroundPosition: '-5px -5px',
                }}
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
                style={{
                  backgroundImage:
                    'linear-gradient(to right, rgba(234,88,12,0.20) 1px, transparent 1px), linear-gradient(to bottom, rgba(234,88,12,0.20) 1px, transparent 1px)',
                  backgroundSize: '100px 100px',
                  backgroundPosition: '-5px -5px',
                }}
              />

              {/* corner registration marks */}
              {[
                'left-2 top-2',
                'right-2 top-2 rotate-90',
                'right-2 bottom-2 rotate-180',
                'left-2 bottom-2 -rotate-90',
              ].map((pos, i) => (
                <svg
                  key={i}
                  aria-hidden="true"
                  viewBox="0 0 14 14"
                  className={`absolute h-3 w-3 text-neutral-950/45 ${pos}`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                >
                  <path d="M0 0 L7 0 M0 0 L0 7" />
                </svg>
              ))}

              {/* top header bar */}
              <div className="absolute left-3 right-3 top-3 flex items-baseline justify-between gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-neutral-500">
                <span className="text-neutral-950">WGS84</span>
                <span
                  aria-hidden="true"
                  className="bg-neutral-950/15 h-px flex-1"
                />
                <span>YYC / YUL</span>
              </div>

              {/* the map — slightly inset so corner marks read */}
              <div className="absolute inset-x-6 inset-y-10 sm:inset-x-8 sm:inset-y-12">
                <CanadaMap className="text-neutral-700" />
              </div>

              {/* annotations */}
              <div className="pointer-events-none absolute inset-x-6 inset-y-10 sm:inset-x-8 sm:inset-y-12">
                <div
                  className="absolute whitespace-nowrap rounded-md border border-neutral-950/10 bg-white/90 px-2 py-1.5 font-mono text-[10px] leading-tight tracking-[0.06em] text-neutral-950 shadow-sm backdrop-blur-sm"
                  style={{ left: '23%', top: '49%' }}
                >
                  <span>Calgary</span>
                  <span className="ml-1.5 text-neutral-500">YYC</span>
                  <div className="tabular mt-0.5 whitespace-nowrap text-[9px] tracking-[0.04em] text-neutral-500">
                    51.05°N · 114.07°W
                  </div>
                </div>
                <div
                  className="absolute whitespace-nowrap rounded-md border border-neutral-950/10 bg-white/90 px-2 py-1.5 font-mono text-[10px] leading-tight tracking-[0.06em] text-neutral-950 shadow-sm backdrop-blur-sm"
                  style={{ left: '68%', top: '83%' }}
                >
                  <span>Montreal</span>
                  <span className="ml-1.5 text-neutral-500">YUL</span>
                  <div className="tabular mt-0.5 text-[9px] tracking-[0.04em] text-neutral-500">
                    45.51°N · 73.55°W
                  </div>
                </div>
              </div>

              {/* bottom strip — distance */}
              <div className="absolute bottom-3 left-3 right-3 flex items-baseline gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-neutral-500">
                <span>
                  Δ&nbsp;
                  <span className="tabular text-neutral-950">3,020</span> km
                </span>
                <span
                  aria-hidden="true"
                  className="bg-neutral-950/15 h-px flex-1"
                />
              </div>
            </figure>
          </FadeIn>
        </div>

        {/* CITY CARDS — two offices side by side */}
        <FadeIn>
          <div className="border-neutral-950/15 mt-20 border-t pt-10 lg:mt-28">
            <p className="eyebrow wdth-narrow text-neutral-500">
              <span className="tabular text-neutral-950">02 /</span> Where to
              find us
            </p>
            <div className="mt-8 grid grid-cols-1 gap-y-10 sm:grid-cols-2 sm:gap-x-16">
              {OFFICES.map((o) => (
                <div key={o.city} className="group relative">
                  <div className="flex items-baseline gap-3">
                    <span className="tabular font-mono text-[11px] uppercase tracking-[0.22em] text-neutral-500">
                      {o.n}
                    </span>
                    <p className="eyebrow wdth-narrow text-neutral-950">
                      {o.city}, {o.region}
                    </p>
                    <span
                      aria-hidden="true"
                      className="bg-neutral-950/10 h-px flex-1"
                    />
                    <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-neutral-500">
                      {o.role}
                    </span>
                  </div>

                  <a
                    href={`tel:${o.tel}`}
                    className="tabular mt-5 block font-mono text-2xl text-neutral-950 transition-colors hover:text-orange-600 sm:text-[28px]"
                  >
                    {o.phone}
                  </a>

                  <dl className="mt-5 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 font-mono text-xs text-neutral-700">
                    <dt className="uppercase tracking-[0.18em] text-neutral-500">
                      Lat / Lng
                    </dt>
                    <dd className="tabular">{o.coords}</dd>
                    <dt className="uppercase tracking-[0.18em] text-neutral-500">
                      Local
                    </dt>
                    <dd className="tabular">
                      <LocalTime tz={o.tz} />{' '}
                      <span className="text-neutral-500">
                        {o.abbr} · {o.utc}
                      </span>
                    </dd>
                  </dl>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* BOTTOM PRECISION STRIP */}
        <FadeIn>
          <div className="border-neutral-950/10 mt-16 flex flex-wrap items-center gap-x-6 gap-y-3 border-t pt-6 font-mono text-[10px] uppercase tracking-[0.22em] text-neutral-500">
            <span>
              Response&nbsp;·&nbsp;
              <span className="tabular text-neutral-950">&lt; 1</span>{' '}
              business day
            </span>
            <span aria-hidden="true" className="bg-neutral-950/15 h-px flex-1" />
            <span>Scoped &amp; quoted by phase</span>
            <span aria-hidden="true" className="bg-neutral-950/15 h-px w-6" />
            <span>
              Doc&nbsp;·&nbsp;
              <span className="tabular text-neutral-700">2026.05.03</span>
            </span>
          </div>
        </FadeIn>
      </Container>
    </section>
  )
}
