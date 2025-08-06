import BlogClient from './BlogClient'
import { loadArticles } from '@/lib/mdx'

export const metadata = {
  title: 'Blog',
  description:
    'Stay up-to-date with machine learning, data science, and AI insights from our Calgary experts.',
  alternates: { canonical: '/blog' },
}

export default async function Blog() {
  const articles = await loadArticles()
  return <BlogClient articles={articles} />
}
