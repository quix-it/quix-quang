import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join, relative, sep } from 'node:path'

const libraryRoot = __dirname
const playgroundRoot = join(libraryRoot, '..', 'playground', 'src')

function listFiles(dir: string, accept: (path: string) => boolean): string[] {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name)
    if (statSync(path).isDirectory()) return name === 'node_modules' ? [] : listFiles(path, accept)
    return accept(path) ? [path] : []
  })
}

function publishedEntryPoints(): Set<string> {
  return new Set(
    listFiles(libraryRoot, (path) => path.endsWith(`${sep}ng-package.json`)).map((path) => {
      const dir = relative(libraryRoot, join(path, '..')).split(sep).join('/')
      return dir ? `quang/${dir}` : 'quang'
    })
  )
}

function shownImportSpecifiers(): { file: string; specifier: string }[] {
  return listFiles(playgroundRoot, (path) => path.endsWith('.ts')).flatMap((path) => {
    const source = readFileSync(path, 'utf8')
    const file = relative(playgroundRoot, path).split(sep).join('/')
    return [...source.matchAll(/import:\s*"([^"]*)"/g)].flatMap(([, shown]) =>
      [...shown.matchAll(/from '([^']+)'/g)].map(([, specifier]) => ({ file, specifier }))
    )
  })
}

describe('Playground import strings', () => {
  describe('shown import specifiers', () => {
    it('every import string shown by the playground targets a published entry point', () => {
      const entryPoints = publishedEntryPoints()
      const shown = shownImportSpecifiers()

      expect(shown.length).toBeGreaterThan(0)
      expect(shown.filter(({ specifier }) => !entryPoints.has(specifier))).toEqual([])
    })
  })
})
