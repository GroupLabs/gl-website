/**
 * Builds the social card for every article and case study.
 *
 * Cards are written as `opengraph-image.png` beside each `page.mdx`, which is
 * a Next file convention — the framework picks them up and writes the tags
 * itself, so a new post gets a correct card without remembering to wire one.
 *
 * Runs from `prebuild`. The output is derived, and git-ignored.
 */
import { Parser } from 'acorn'
import fastGlob from 'fast-glob'
import * as fs from 'fs/promises'
import * as path from 'path'
import satori from 'satori'
import sharp from 'sharp'
import { decompress } from 'wawoff2'

const WIDTH = 1200
const HEIGHT = 630
const PAD = 76
const GRID = 56

const INK = '#0a0a0a'
const ACCENT = '#ea580c'
const MONO =
  'ui-monospace, SFMono-Regular, Menlo, monospace'

const SOURCES = [
  { directory: 'src/app/blog', name: 'article', kind: 'Writing' },
  { directory: 'src/app/work', name: 'caseStudy', kind: 'Case study' },
]

// Satori's font parser trips over Mona Sans's variable tables. Dropping them
// leaves a well-formed static font at the default instance, which is the one
// the cards want anyway.
const VARIATION_TABLES = new Set([
  'fvar',
  'gvar',
  'avar',
  'cvar',
  'STAT',
  'HVAR',
  'VVAR',
  'MVAR',
])

function stripVariations(buffer) {
  let count = buffer.readUInt16BE(4)
  let tables = []

  for (let i = 0; i < count; i++) {
    let at = 12 + i * 16
    let offset = buffer.readUInt32BE(at + 8)
    let length = buffer.readUInt32BE(at + 12)
    tables.push({
      tag: buffer.toString('latin1', at, at + 4),
      checkSum: buffer.readUInt32BE(at + 4),
      data: buffer.subarray(offset, offset + length),
    })
  }

  let kept = tables
    .filter((table) => !VARIATION_TABLES.has(table.tag))
    .sort((a, b) => (a.tag < b.tag ? -1 : 1))

  let entrySelector = Math.floor(Math.log2(kept.length))
  let searchRange = 16 * 2 ** entrySelector
  let header = Buffer.alloc(12 + kept.length * 16)

  header.writeUInt32BE(buffer.readUInt32BE(0), 0)
  header.writeUInt16BE(kept.length, 4)
  header.writeUInt16BE(searchRange, 6)
  header.writeUInt16BE(entrySelector, 8)
  header.writeUInt16BE(kept.length * 16 - searchRange, 10)

  let offset = header.length
  let chunks = []

  kept.forEach((table, index) => {
    let at = 12 + index * 16
    header.write(table.tag, at, 4, 'latin1')
    header.writeUInt32BE(table.checkSum, at + 4)
    header.writeUInt32BE(offset, at + 8)
    header.writeUInt32BE(table.data.length, at + 12)

    let padding = (4 - (table.data.length % 4)) % 4
    chunks.push(table.data, Buffer.alloc(padding))
    offset += table.data.length + padding
  })

  return Buffer.concat([header, ...chunks])
}

/** Pull one `export const <name> = { … }` object literal out of an MDX file. */
function extractExport(source, name) {
  let start = source.indexOf(`export const ${name} = {`)
  if (start === -1) return null

  let open = source.indexOf('{', start)
  let depth = 0
  let quote = null

  for (let i = open; i < source.length; i++) {
    let character = source[i]

    if (quote) {
      if (character === '\\') i++
      else if (character === quote) quote = null
      continue
    }

    if (character === '"' || character === "'" || character === '`') {
      quote = character
    } else if (character === '{') {
      depth++
    } else if (character === '}') {
      depth--
      if (depth === 0) return source.slice(open, i + 1)
    }
  }

  return null
}

/**
 * Turn the parsed literal into a value. Anything that is not a literal — an
 * imported image, say — is dropped rather than resolved; the card only needs
 * the strings.
 */
function evaluate(node) {
  switch (node.type) {
    case 'Literal':
      return node.value
    case 'TemplateLiteral':
      return node.quasis.map((quasi) => quasi.value.cooked).join('')
    case 'ArrayExpression':
      return node.elements.map(evaluate).filter((value) => value !== undefined)
    case 'ObjectExpression': {
      let object = {}
      for (let property of node.properties) {
        if (property.type !== 'Property') continue
        let key = property.key.name ?? property.key.value
        let value = evaluate(property.value)
        if (value !== undefined) object[key] = value
      }
      return object
    }
    default:
      return undefined
  }
}

function readEntry(source, name) {
  let literal = extractExport(source, name)
  if (!literal) return null
  let program = Parser.parse(`(${literal})`, {
    ecmaVersion: 'latest',
    sourceType: 'module',
  })
  return evaluate(program.body[0].expression)
}

function formatDate(value) {
  if (!value) return ''
  return new Date(`${value}T00:00:00Z`).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  })
}

function statusLabel(status) {
  if (!status) return null
  return typeof status === 'string' ? status : status.label
}

/** Long titles step down rather than overflow. */
function titleSize(title) {
  if (title.length <= 26) return 74
  if (title.length <= 44) return 62
  if (title.length <= 68) return 52
  return 44
}

function blueprint() {
  let lines = []
  for (let x = GRID; x < WIDTH; x += GRID) {
    lines.push({
      type: 'div',
      props: {
        style: {
          position: 'absolute',
          top: 0,
          left: x,
          width: 1,
          height: HEIGHT,
          background: 'rgba(255,255,255,0.05)',
        },
      },
    })
  }
  for (let y = GRID; y < HEIGHT; y += GRID) {
    lines.push({
      type: 'div',
      props: {
        style: {
          position: 'absolute',
          top: y,
          left: 0,
          width: WIDTH,
          height: 1,
          background: 'rgba(255,255,255,0.05)',
        },
      },
    })
  }
  return lines
}

function rule(color = 'rgba(255,255,255,0.15)') {
  return {
    type: 'div',
    props: { style: { flex: 1, height: 1, background: color } },
  }
}

function eyebrow(text, color) {
  return {
    type: 'div',
    props: {
      style: {
        fontFamily: MONO,
        fontSize: 20,
        letterSpacing: 3.4,
        textTransform: 'uppercase',
        color,
      },
      children: text,
    },
  }
}

function card({ title, description, kind, status, author, date }) {
  return {
    type: 'div',
    props: {
      style: {
        width: WIDTH,
        height: HEIGHT,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: PAD,
        background: INK,
        color: '#fff',
        fontFamily: 'Mona Sans',
        position: 'relative',
      },
      children: [
        ...blueprint(),

        // Masthead
        {
          type: 'div',
          props: {
            style: { display: 'flex', alignItems: 'center', gap: 20 },
            children: [
              {
                type: 'div',
                props: {
                  style: {
                    width: 12,
                    height: 12,
                    borderRadius: 12,
                    background: ACCENT,
                  },
                },
              },
              eyebrow(`GroupLabs · ${kind}`, '#fff'),
              rule(),
              ...(status ? [eyebrow(status, ACCENT)] : []),
            ],
          },
        },

        // The piece
        {
          type: 'div',
          props: {
            style: {
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            },
            children: [
              {
                type: 'div',
                props: {
                  style: {
                    fontSize: titleSize(title),
                    lineHeight: 1.06,
                    letterSpacing: -1.5,
                    color: '#fff',
                  },
                  children: title,
                },
              },
              description
                ? {
                    type: 'div',
                    props: {
                      style: {
                        marginTop: 26,
                        maxWidth: 820,
                        fontSize: 27,
                        lineHeight: 1.45,
                        color: 'rgba(255,255,255,0.66)',
                      },
                      children: description,
                    },
                  }
                : null,
            ].filter(Boolean),
          },
        },

        // Colophon
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              alignItems: 'center',
              gap: 20,
              paddingTop: 28,
              borderTop: '1px solid rgba(255,255,255,0.15)',
            },
            children: [
              eyebrow(
                [author?.name, author?.role].filter(Boolean).join(' · '),
                'rgba(255,255,255,0.8)',
              ),
              rule('transparent'),
              eyebrow(formatDate(date), 'rgba(255,255,255,0.5)'),
            ],
          },
        },
      ],
    },
  }
}

async function main() {
  let ttf = await decompress(await fs.readFile('src/fonts/Mona-Sans.var.woff2'))
  let fonts = [
    {
      name: 'Mona Sans',
      data: stripVariations(Buffer.from(ttf)),
      weight: 400,
      style: 'normal',
    },
  ]

  let written = 0

  for (let { directory, name, kind } of SOURCES) {
    let pages = await fastGlob('**/page.mdx', { cwd: directory })

    for (let page of pages) {
      let file = path.join(directory, page)
      let entry = readEntry(await fs.readFile(file, 'utf8'), name)

      if (!entry?.title) {
        console.warn(`[og] no ${name} export in ${file} — skipped`)
        continue
      }

      let svg = await satori(
        card({
          title: entry.title,
          description: entry.description,
          kind,
          status: statusLabel(entry.status),
          author: entry.author,
          date: entry.date,
        }),
        { width: WIDTH, height: HEIGHT, fonts },
      )

      let output = path.join(path.dirname(file), 'opengraph-image.png')
      await sharp(Buffer.from(svg)).png().toFile(output)
      written++
    }
  }

  console.log(`[og] wrote ${written} cards`)
}

await main()
