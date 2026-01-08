# GitHub Copilot instructions

## Playground pages (default)

- When adding a new component to the playground, prefer the **Showcase** pattern (see `AutocompleteShowcaseComponent`) using `playground-example-viewer` + dedicated example components with embedded TS/HTML snippets.
- Keep the existing `*-test` page pattern for **compatibility/regressions**, but route it under `/<component>/test` (e.g. `components/autocomplete/test`).
- Only implement a test-based playground page as the primary page if explicitly requested.
