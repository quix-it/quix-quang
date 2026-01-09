# Changelog

All notable changes to this project will be documented in this file.

The format is based on Keep a Changelog, and this project follows Conventional Commits.

## [Unreleased]

- _Nothing yet._

## [19.4.0] - 2026-01-09

### Added

- New `QuangRadioGroupComponent` with standard and template-based options.
- Select/Autocomplete: support template-based option rendering via `SelectOption.renderer`.
- Playground: Radio Group showcase/examples/test pages.
- Playground: Toggle showcase/examples/test pages.
- Playground: new template-based option examples for Select and Autocomplete.
- Playground: PrismJS-based code highlighting for example snippets (light/dark themes).

### Changed

- Validation status is now based on touched/dirty instead of pristine and refreshes more reliably after programmatic touch (e.g. `markAllAsTouched()`).
- Shared option list now renders custom option templates with context `{ $implicit, selected, index }`.
- Playground: Form section split into routed showcase pages, keeping `/form/test` for compatibility.
- Playground: Showcase layout styling centralized to a shared Sass partial.

### Fixed

- Required indicator (`*`) now appears for controls using `Validators.requiredTrue` (e.g. checkboxes/toggles).
- Autocomplete now shows validation feedback text reliably (Bootstrap feedback visibility).
- Input feedback blocks are positioned to render correctly with Bootstrap.
- Checkbox layout alignment for label positions (top/left/right/bottom) is more consistent.
- Date browser focus test uses a stable component selector.
- Vitest config fixes.
- Dependency/publish tooling fixes (including @chevrotain updates).

### Docs

- Documented playground page structure conventions (Showcase + Examples + Test).
- Select/Autocomplete: documented template-based options.
