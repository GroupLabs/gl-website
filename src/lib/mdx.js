import glob from 'fast-glob'

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
