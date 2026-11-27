import { projectFiles } from 'archunit'
import { globSync, readFileSync } from 'node:fs'
import { dirname, join, normalize } from 'node:path'
import ts from 'typescript'
import { describe, expect, it } from 'vitest'

// Graph checks on the library, run by vitest with the other specs. They hold what ng-packagr needs from
// secondary entrypoints and what a published package needs from its imports; an eslint-disable comment
// cannot silence them. Specs and test-setup.ts are not shipped, so the entrypoint rules skip them.

const LIB = 'projects/quang'
const lib = JSON.parse(readFileSync(`${LIB}/package.json`, 'utf8')) as {
  dependencies?: Record<string, string>
  peerDependencies?: Record<string, string>
}

// Entrypoint roots from the ng-package.json files, longest first so a file belongs to the deepest one.
const ENTRYPOINTS = globSync(`${LIB}/**/ng-package.json`)
  .map((f) => dirname(f))
  .sort((a, b) => b.length - a.length)
const entryOf = (path: string) => ENTRYPOINTS.find((e) => path === e || path.startsWith(`${e}/`))
const importPath = (entry: string) => entry.replace(LIB, 'quang')

const SHIPPED = globSync(`${LIB}/**/*.ts`).filter((f) => !/\.spec\.ts$|\/test-setup\.ts$/.test(f))
const imports = SHIPPED.flatMap((file) =>
  ts.preProcessFile(readFileSync(file, 'utf8'), true, true).importedFiles.map(({ fileName: spec }) => ({
    file,
    spec,
  }))
)
const relative = imports.filter(({ spec }) => spec.startsWith('.'))
const quang = imports.filter(({ spec }) => spec === 'quang' || spec.startsWith('quang/'))
const bare = imports.filter(({ spec }) => !spec.startsWith('.') && !quang.some((q) => q.spec === spec))

// shortcut: cycles that exist today, so only new ones fail. Remove an entry once its cycle is gone.
const KNOWN_FILE_CYCLES = ['projects/quang/overlay/modal/modal-ref.ts -> projects/quang/overlay/modal/modal.service.ts']
// shortcut: packages the library imports but does not declare in its package.json today (they reach
// consumers through other Angular packages). Remove an entry once it is a peer dependency.
const KNOWN_UNDECLARED = ['@angular/router']

const packageOf = (spec: string) =>
  spec
    .split('/')
    .slice(0, spec.startsWith('@') ? 2 : 1)
    .join('/')

// The first check parses the whole TypeScript project: a few seconds, over Vitest's default timeout.
describe('library architecture', { timeout: 30_000 }, () => {
  it('has no new import cycles between files', async () => {
    const violations = await projectFiles('tsconfig.json').inFolder(`${LIB}/**`).should().haveNoCycles().check()
    // Sorted nodes: the same cycle compares equal whichever file archunit starts from.
    const cycles = violations.map((v) =>
      (v as unknown as { cycle: { sourceLabel: string }[] }).cycle
        .map((e) => e.sourceLabel)
        .sort()
        .join(' -> ')
    )

    expect(cycles.filter((c) => !KNOWN_FILE_CYCLES.includes(c))).toEqual([])
  })

  it('finds the entrypoints and the shipped files (the checks below would pass on nothing)', () => {
    expect(ENTRYPOINTS.length).toBeGreaterThan(1)
    expect(SHIPPED.length).toBeGreaterThan(0)
    expect(quang.length).toBeGreaterThan(0)
  })

  it('keeps relative imports inside their entrypoint (the other entrypoints go through quang/...)', () => {
    const leaving = relative
      .filter(({ file, spec }) => entryOf(normalize(join(dirname(file), spec))) !== entryOf(file))
      .map(({ file, spec }) => `${file}: '${spec}'`)

    expect(leaving).toEqual([])
  })

  it('imports quang/... only at an entrypoint root, never its own nor from the primary entrypoint', () => {
    const roots = new Set(ENTRYPOINTS.map(importPath))
    const wrong = quang
      .filter(({ file, spec }) => {
        const own = entryOf(file)
        return !roots.has(spec) || spec === importPath(own ?? '') || own === LIB
      })
      .map(({ file, spec }) => `${file}: '${spec}'`)

    expect(wrong).toEqual([])
  })

  it('has no import cycles between entrypoints (ng-packagr cannot build them)', () => {
    const graph = new Map<string, Set<string>>()
    for (const { file, spec } of quang) {
      const from = importPath(entryOf(file) ?? LIB)
      if (from !== spec) graph.set(from, (graph.get(from) ?? new Set()).add(spec))
    }
    const cycles: string[] = []
    const visit = (node: string, path: string[]) => {
      if (path.includes(node)) return void cycles.push([...path.slice(path.indexOf(node)), node].join(' -> '))
      for (const next of graph.get(node) ?? []) visit(next, [...path, node])
    }
    for (const node of graph.keys()) visit(node, [])

    expect([...new Set(cycles)]).toEqual([])
  })

  it('declares every package it imports in projects/quang/package.json', () => {
    const declared = new Set([
      ...Object.keys(lib.dependencies ?? {}),
      ...Object.keys(lib.peerDependencies ?? {}),
      ...KNOWN_UNDECLARED,
    ])
    const undeclared = bare
      .filter(({ spec }) => !declared.has(packageOf(spec)))
      .map(({ file, spec }) => `${file}: '${spec}'`)

    expect(undeclared).toEqual([])
  })
})
