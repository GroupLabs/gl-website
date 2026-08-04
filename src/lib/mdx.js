import glob from 'fast-glob'
import * as fs from 'fs/promises'
import * as path from 'path'

const WORDS_PER_MINUTE = 200

async function readingTime(filename) {
  try {
    let source = await fs.readFile(filename, 'utf8')
    let prose = source
      .replace(/^import[^\n]*$/gm, '')
      .replace(/^export const [\s\S]*?\n}\n/gm, '')
      .replace(/```[\s\S]*?```/g, '')
      .replace(/<[^>]+>/g, ' ')
    let words = prose.split(/\s+/).filter(Boolean).length
    return Math.max(1, Math.round(words / WORDS_PER_MINUTE))
  } catch {
    return null
  }
}

async function loadEntries(directory, metaName) {
  return (
    await Promise.all(
      (await glob('**/page.mdx', { cwd: `src/app/${directory}` })).map(
        async (filename) => {
          let metadata = (await import(`../app/${directory}/${filename}`))[
            metaName
          ]
          return {
            ...metadata,
            metadata,
            readingTime: await readingTime(
              path.join('src/app', directory, filename),
            ),
            href: `/${directory}/${filename.replace(/\/page\.mdx$/, '')}`,
          }
        },
      ),
    )
  ).sort((a, b) => b.date.localeCompare(a.date))
}

export async function loadArticles() {
  let articles = await loadEntries('blog', 'article')
  return articles.map((article) => ({ ...article, tags: article.tags || [] }))
}

export function loadCaseStudies() {
  return loadEntries('work', 'caseStudy')
}
