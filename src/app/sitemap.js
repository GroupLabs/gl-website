import glob from 'fast-glob'

import { loadArticles, loadCaseStudies } from '@/lib/mdx'

const SITE = 'https://grouplabs.ca'

// Pages that exist but should not be advertised to crawlers.
const EXCLUDED = new Set(['/thank-you'])

/**
 * Derived from the routes on disk rather than kept by hand — the previous
 * checked-in sitemap.xml went stale the moment a post was deleted and spent
 * months pointing crawlers at two 404s.
 */
export default async function sitemap() {
  let [articles, caseStudies] = await Promise.all([
    loadArticles(),
    loadCaseStudies(),
  ])

  let dates = new Map(
    [...articles, ...caseStudies].map((entry) => [entry.href, entry.date]),
  )

  let routes = (await glob('**/page.{js,jsx,ts,tsx,mdx}', { cwd: 'src/app' }))
    .map((file) => '/' + file.replace(/\/?page\.[a-z]+$/, ''))
    .filter((route) => !route.includes('[') && !route.includes('('))
    .filter((route) => !EXCLUDED.has(route))

  return routes.sort().map((route) => ({
    url: `${SITE}${route === '/' ? '' : route}`,
    ...(dates.has(route)
      ? { lastModified: new Date(`${dates.get(route)}T00:00:00Z`) }
      : {}),
  }))
}
