# Indice delle feature

Repo: `quix-quang` — branch di integrazione `quang22` — baseline `68c44102`.

Libreria Angular `quang` (`projects/quang/`, pubblicata a entry point secondari `quang/<area>`) più
l'applicazione dimostrativa `projects/playground/`.

| Voce | Tipo | Path posseduti | Scheda | Documentata a |
|---|---|---|---|---|
| Configurazione Quang | feature | `projects/quang/index.ts` | `features/configurazione-quang.md` | `68c44102` |
| Autenticazione | feature | `projects/quang/auth/` | `features/autenticazione.md` | `68c44102` |
| Autocomplete | feature | `projects/quang/components/autocomplete/` | `features/autocomplete.md` | `68c44102` |
| Checkbox | feature | `projects/quang/components/checkbox/` | `features/checkbox.md` | — |
| Date | feature | `projects/quang/components/date/` | `features/date.md` | — |
| Input | feature | `projects/quang/components/input/` | `features/input.md` | — |
| Paginator | feature | `projects/quang/components/paginator/` | `features/paginator.md` | — |
| Radio group | feature | `projects/quang/components/radio-group/` | `features/radio-group.md` | — |
| Select | feature | `projects/quang/components/select/` | `features/select.md` | — |
| Table | feature | `projects/quang/components/table/` | `features/table.md` | — |
| Tabs | feature | `projects/quang/components/tabs/` | `features/tabs.md` | — |
| Wysiwyg | feature | `projects/quang/components/wysiwyg/` | `features/wysiwyg.md` | — |
| Conversione e download | feature | `projects/quang/data-handling/` | `features/conversione-e-download.md` | — |
| Osservazione del ridimensionamento | feature | `projects/quang/device/` | `features/osservazione-ridimensionamento.md` | — |
| Form e validatori | feature | `projects/quang/forms/` | `features/form-e-validatori.md` | — |
| Loader | feature | `projects/quang/loader/` | `features/loader.md` | — |
| Modal | feature | `projects/quang/overlay/modal/` | `features/modal.md` | — |
| Popover | feature | `projects/quang/overlay/popover/` | `features/popover.md` | — |
| Toast | feature | `projects/quang/overlay/toast/` | `features/toast.md` | — |
| Tooltip | feature | `projects/quang/overlay/tooltip/` | `features/tooltip.md` | — |
| Traduzioni | feature | `projects/quang/translation/` | `features/traduzioni.md` | — |
| Playground | feature | `projects/playground/` | `features/playground.md` | — |
| Base dei componenti | condiviso | `projects/quang/components/shared/` | `condivisi/base-componenti.md` | — |
| Base degli overlay | condiviso | `projects/quang/overlay/shared/`, `projects/quang/overlay/global-overlay.scss` | `condivisi/base-overlay.md` | — |
| Utility per interceptor | condiviso | `projects/quang/shared/` | `condivisi/utility-interceptor.md` | — |

I tre `condiviso` sono tali perché non hanno un ingresso proprio per chi usa la libreria e almeno due
feature ne dipendono: `components/shared/` è importato da nove componenti, `overlay/shared/` da
popover e tooltip, `shared/` dagli interceptor di `auth` e `loader`.

`projects/quang/networking/` contiene solo un `.gitkeep`: è un'area predisposta e ancora vuota, senza
codice da documentare. Diventerà una voce quando avrà del codice.

## Non documentabile

`package.json`, `package-lock.json`, `pnpm-lock.yaml`, `angular.json`, `tsconfig*.json`,
`eslint.config.mjs`, `vite.config.ts`, `vitest*.config.ts`, `playwright.config.ts`,
`openapitools.json`, `Dockerfile`, `default.conf`, `Gemfile`, `Gemfile.lock`, `fastlane/`,
`.github/`, `.vscode/`, `scripts/`, `docs/`, `**/node_modules/`, `**/dist/`, `**/.angular/`,
`**/coverage/`, `**/test-results/`, `**/ng-package.json`, `**/package.json`,
`.commitlintrc.json`, `.editorconfig`, `.gitignore`, `.lintstagedrc.json`, `.prettierignore`,
`.prettierrc`, `projects/quang/test-setup.ts`, `**/.gitkeep`, `CHANGELOG.md`, `**/README*.md`
