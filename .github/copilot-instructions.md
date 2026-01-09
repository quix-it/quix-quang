# GitHub Copilot instructions

## Playground pages (default)

- When adding a new section/page to the playground, prefer the **Showcase + Examples + Test** structure (see `projects/playground/src/app/pages/components-test-pages/autocomplete-test`).

### Showcase page

- Location: `.../<section>/showcase/<component-name>/<component-name>.component.*`
- Purpose: curated documentation + examples.
- Should use `playground-example-viewer` (`ExampleViewerComponent`) to render each example and show its TS/HTML snippets.
- Should include a simple table-of-contents + `scrollTo()` helper (pattern used in Autocomplete/RadioGroup showcase pages).
- **Convention**: when a component has multiple files (TS/HTML/SCSS), keep them grouped under a folder with the component name.

### Examples

- Location: `.../<section>/examples/*-example.component.ts` (+ `.../<section>/examples/index.ts`)
- Examples should be standalone components with an inline `template: \`...\`` (preferred).
- Each example must export snippet strings used by the viewer, e.g.:
	- `export const <EXAMPLE>_TS = `...``
	- `export const <EXAMPLE>_HTML = `...``
- The showcase page imports examples from `../examples` and wires them into `<playground-example-viewer [tsCode] [htmlCode]>`.

### Test page

- Keep the existing `*-test` page pattern for **compatibility/regressions**, but route it under `/<section>/test`.
- The test page is allowed to be more "kitchen-sink"/interactive than the showcase, and may skip the example-viewer if that keeps it simpler.
- **Convention**: when a test page has multiple files (TS/HTML/SCSS), keep them grouped under a folder with the component name.

### Routing

- Prefer routes:
	- `/<section>` → showcase
	- `/<section>/test` → test
- If you are replacing older routes, keep lightweight redirects to avoid breaking deep links.
