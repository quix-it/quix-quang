## Toolchain e comandi

Node e pnpm sono fissati in `mise.toml`: `mise trust && mise install` la prima volta, oppure
`mise exec -- <comando>`. Si usa pnpm, mai npm per installare (niente `package-lock.json`); `npm
version` e `npm publish` restano negli script di rilascio. Gli script di build delle dipendenze sono
elencati, e spenti, in `pnpm-workspace.yaml` (`allowBuilds`): pnpm rifiuta l'install se ne compare
uno nuovo.

```bash
pnpm start:playground                  # ng serve playground
pnpm build:quang                       # libreria in dist/quang
pnpm lint                              # ng lint su quang e playground
pnpm exec vitest run                   # test unitari una volta (pnpm test è in watch)
pnpm exec vitest run <path-spec>       # un solo file
```

I commit passano da husky: `.husky/pre-commit` (lint-staged: ESLint `--fix` e Prettier) e
`.husky/commit-msg` (commitlint, conventional commits).

## Documentazione delle feature

`docs/automatica/indice-feature.md` è l'indice delle feature di questo repo: cosa fa ognuna, quali
path la realizzano, dove sta la sua scheda. Leggilo prima di cercare nel codice.
