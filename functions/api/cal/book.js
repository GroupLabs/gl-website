export async function onRequestPost({ request }) {
  let body = await request.text()
  let r = await fetch('https://api.cal.com/v2/bookings', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'cal-api-version': '2024-08-13',
    },
    body,
  })
  let resBody = await r.text()
  return new Response(resBody, {
    status: r.status,
    headers: { 'content-type': 'application/json' },
  })
}
