import nextMDX from '@next/mdx'
import { Parser } from 'acorn'
import jsx from 'acorn-jsx'
import escapeStringRegexp from 'escape-string-regexp'
import * as path from 'path'
import { recmaImportImages } from 'recma-import-images'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import { remarkRehypeWrap } from 'remark-rehype-wrap'
import remarkUnwrapImages from 'remark-unwrap-images'
import shiki from 'shiki'
import { unifiedConditional } from 'unified-conditional'

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'],
  images: { unoptimized: true },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
}

function walk(node, visitor) {
  visitor(node)
  if (Array.isArray(node.children)) {
    for (let child of node.children) walk(child, visitor)
  }
}

function textContent(node) {
  let out = ''
  walk(node, (n) => {
    if (n.type === 'text') out += n.value
  })
  return out
}

function slugify(value) {
  return value
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/**
 * Articles are authored inconsistently — some open their sections at `#`,
 * others at `##`. Shift each document so its top section lands on `<h2>`
 * (the page title owns the only `<h1>`), then give every heading a stable id
 * so the article rail and deep links have something to aim at.
 */
function rehypeHeadings() {
  return (tree) => {
    let headings = []
    walk(tree, (node) => {
      if (node.type === 'element' && /^h[1-6]$/.test(node.tagName)) {
        headings.push(node)
      }
    })

    let authored = headings.filter(
      (node) => node.properties?.id !== 'footnote-label',
    )

    if (authored.length > 0) {
      let min = Math.min(...authored.map((node) => Number(node.tagName[1])))
      let shift = 2 - min
      if (shift !== 0) {
        for (let node of authored) {
          let level = Math.min(6, Math.max(2, Number(node.tagName[1]) + shift))
          node.tagName = `h${level}`
        }
      }
    }

    let used = new Map()
    for (let node of headings) {
      if (node.properties?.id) continue
      let base = slugify(textContent(node)) || 'section'
      let seen = used.get(base) ?? 0
      used.set(base, seen + 1)
      node.properties = {
        ...node.properties,
        id: seen ? `${base}-${seen}` : base,
      }
    }
  }
}

/**
 * Syntax highlighting straight off Shiki's tokenizer. Unlike the stock
 * rehype-shiki integration this keeps the original `<pre>` node, so the
 * language survives as `data-language` for the code block chrome and the
 * surface color stays under the stylesheet's control rather than Shiki's.
 */
function rehypeShikiTokens({ highlighter, theme }) {
  return (tree) => {
    walk(tree, (node) => {
      if (node.type !== 'element' || node.tagName !== 'pre') return

      let code = node.children?.find(
        (child) => child.type === 'element' && child.tagName === 'code',
      )
      if (!code) return

      let classNames = code.properties?.className
      let language = (Array.isArray(classNames) ? classNames : [classNames])
        .filter((name) => typeof name === 'string')
        .find((name) => name.startsWith('language-'))
        ?.slice('language-'.length)

      if (language === 'math') return // an equation KaTeX has yet to render

      let source = (code.children ?? [])
        .filter((child) => child.type === 'text')
        .map((child) => child.value)
        .join('')
        .replace(/\n$/, '')

      // `remarkArtifacts` stamps its options on the `<code>` — that is where
      // mdast-util-to-hast applies a code node's data — so lift them to the
      // `<pre>`, which is the element the renderer actually dispatches on.
      let artifact = Object.fromEntries(
        Object.entries(code.properties ?? {}).filter(([name]) =>
          name.startsWith('data-artifact'),
        ),
      )

      node.properties = {
        ...node.properties,
        ...artifact,
        'data-language': language ?? 'text',
      }
      code.properties = { ...code.properties, className: ['shiki-code'] }

      if (!language) return

      let lines
      try {
        lines = highlighter.codeToThemedTokens(source, language, theme, {
          includeExplanation: false,
        })
      } catch {
        return // language not loaded — leave the block unhighlighted
      }

      let children = []
      lines.forEach((line, index) => {
        if (index > 0) children.push({ type: 'text', value: '\n' })
        for (let token of line) {
          children.push({
            type: 'element',
            tagName: 'span',
            properties: token.color ? { style: `color:${token.color}` } : {},
            children: [{ type: 'text', value: token.content }],
          })
        }
      })

      code.children = children
      node.properties = { ...node.properties, className: ['shiki'] }
    })
  }
}

/**
 * `$$ … $$` written on a single line parses as *inline* math, so equations
 * meant to stand alone end up wedged into a line of prose. Any paragraph that
 * holds nothing but one math span is an equation — promote it to display mode.
 */
function remarkDisplayMath() {
  return (tree) => {
    walk(tree, (node) => {
      if (!Array.isArray(node.children)) return
      node.children = node.children.map((child) => {
        if (child.type !== 'paragraph') return child

        let content = child.children.filter(
          (grandchild) =>
            !(grandchild.type === 'text' && grandchild.value.trim() === ''),
        )
        if (content.length !== 1 || content[0].type !== 'inlineMath') {
          return child
        }

        let value = content[0].value
        return {
          type: 'math',
          meta: null,
          value,
          position: child.position,
          data: {
            hName: 'pre',
            hChildren: [
              {
                type: 'element',
                tagName: 'code',
                properties: { className: ['language-math', 'math-display'] },
                children: [{ type: 'text', value }],
              },
            ],
          },
        }
      })
    })
  }
}

/**
 * A fence tagged `artifact` in its meta becomes a live widget instead of a
 * listing:
 *
 *     ```js artifact title="Sentiment" height=340 note="~70 MB download"
 *
 * The options ride along as `data-artifact-*` so the renderer can pick them up
 * without a second parse of the source.
 */
function remarkArtifacts() {
  return (tree) => {
    walk(tree, (node) => {
      if (node.type !== 'code' || !node.meta) return

      let meta = node.meta.trim()
      if (!/^artifact\b/.test(meta)) return

      let properties = { 'data-artifact': 'true' }
      let option = /([a-z][a-z-]*)(?:=(?:"([^"]*)"|(\S+)))?/gi
      let match
      while ((match = option.exec(meta.slice('artifact'.length)))) {
        let [, name, quoted, bare] = match
        properties[`data-artifact-${name}`] = quoted ?? bare ?? 'true'
      }

      node.data = {
        ...node.data,
        hProperties: { ...node.data?.hProperties, ...properties },
      }
    })
  }
}

function remarkMDXLayout(source, metaName) {
  let parser = Parser.extend(jsx())
  let parseOptions = { ecmaVersion: 'latest', sourceType: 'module' }

  return (tree) => {
    let imp = `import _Layout from '${source}'`
    let exp = `export default function Layout(props) {
      return <_Layout {...props} ${metaName}={${metaName}} />
    }`

    tree.children.push(
      {
        type: 'mdxjsEsm',
        value: imp,
        data: { estree: parser.parse(imp, parseOptions) },
      },
      {
        type: 'mdxjsEsm',
        value: exp,
        data: { estree: parser.parse(exp, parseOptions) },
      },
    )
  }
}

export default async function config() {
  let theme = 'github-light'
  let highlighter = await shiki.getHighlighter({
    theme,
    langs: ['javascript', 'typescript', 'python', 'css', 'html', 'jsx', 'tsx', 'bash', 'json', 'markdown', 'yaml', 'rust', 'go', 'java', 'cpp', 'c', 'sql'],
  })

  let withMDX = nextMDX({
    extension: /\.mdx$/,
    options: {
      recmaPlugins: [recmaImportImages],
      rehypePlugins: [
        rehypeHeadings,
        // KaTeX first: display math arrives as `<pre><code class="math-display">`
        // and must be rendered before the code pass can mistake it for source.
        rehypeKatex,
        [rehypeShikiTokens, { highlighter, theme }],
        [
          remarkRehypeWrap,
          {
            node: { type: 'mdxJsxFlowElement', name: 'Typography' },
            start: ':root > :not(mdxJsxFlowElement)',
            end: ':root > mdxJsxFlowElement',
          },
        ],
      ],
      remarkPlugins: [
        remarkGfm,
        remarkMath,
        remarkDisplayMath,
        remarkArtifacts,
        remarkUnwrapImages,
        [
          unifiedConditional,
          [
            new RegExp(`^${escapeStringRegexp(path.resolve('src/app/blog'))}`),
            [[remarkMDXLayout, '@/app/blog/wrapper', 'article']],
          ],
          [
            new RegExp(`^${escapeStringRegexp(path.resolve('src/app/work'))}`),
            [[remarkMDXLayout, '@/app/work/wrapper', 'caseStudy']],
          ],
        ],
      ],
    },
  })

  return withMDX(nextConfig)
}
