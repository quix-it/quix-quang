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

## Regole imposte da strumenti

- **ESLint** (`eslint.config.mjs`, prefissi dei selettori in `projects/*/eslint.config.mjs`): a
  errore solo le regole senza arretrato; quelle a `warn` hanno violazioni da smaltire e passano a
  errore quando arrivano a zero.
- **`projects/quang/architecture.spec.ts`** (gira con gli altri test): gli import relativi restano
  nel loro entrypoint (gli altri passano da `quang/...`, sempre alla radice di un entrypoint), niente
  cicli fra entrypoint né cicli nuovi fra file, ogni pacchetto importato è dichiarato in
  `projects/quang/package.json`. Le eccezioni di oggi sono in `KNOWN_FILE_CYCLES` e
  `KNOWN_UNDECLARED`: si tolgono, non si aggiungono.
- **Hook di Claude** (`.claude/settings.json`): dopo ogni Edit/Write ESLint sul file con la config
  del suo progetto; a fine turno, se sono cambiati file di quang o del playground, ngc su libreria e
  playground, tsc sulle spec e la spec di architettura. La deny list blocca lockfile, force push,
  pubblicazione e deploy.

I commit passano da husky (che mette `node_modules/.bin` nel PATH, quindi basta node): `.husky/pre-commit` (lint-staged: ESLint `--fix` e Prettier) e
`.husky/commit-msg` (commitlint, conventional commits).

## Documentazione delle feature

`docs/automatica/indice-feature.md` è l'indice delle feature di questo repo: cosa fa ognuna, quali
path la realizzano, dove sta la sua scheda. Leggilo prima di cercare nel codice.
