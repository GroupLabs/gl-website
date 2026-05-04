export async function onRequestGet({ request }) {
  let url = new URL(request.url)
  let upstream = new URL('https://api.cal.com/v2/slots/available')
  for (let [k, v] of url.searchParams) upstream.searchParams.append(k, v)
  let r = await fetch(upstream.toString(), {
    headers: { 'cal-api-version': '2024-08-13' },
  })
  let body = await r.text()
  return new Response(body, {
    status: r.status,
    headers: { 'content-type': 'application/json' },
  })
}
