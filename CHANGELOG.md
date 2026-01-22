# Changelog

All notable changes to this project will be documented in this file.

The format is based on Keep a Changelog, and this project follows Conventional Commits.

## [20.7.1] - 2026-01-22

### Fixed

- Overlay: fixed type compatibility between tooltip/popover and the shared base overlay types by making `QuangBaseOverlayComponent`/`QuangBaseOverlayDirective` generic.
- Overlay: restored successful library builds for `quang/overlay/tooltip` after the stricter typing refactor.

### Tests

- Overlay: added integration-style tests for tooltip and popover directives (attach/detach, backdrop close, payload/template rendering).
- Overlay: added coverage for toast service/component timing/close behavior and modal overlay/backdrop behavior.

## [20.7.0] - 2026-01-21

### Added

- New `QuangTabsComponent` for tab navigation with standard and template-based rendering.
  - Support for disabled states (global and per-tab).
  - Support for readonly mode.
  - Custom tab templates via `TabConfiguration.renderer`.
  - Two-way data binding with reactive forms (ControlValueAccessor).
  - `tabChange` output event for tab selection changes.
  - Translation support via Transloco for tab labels.
  - Bootstrap 5.3 styling with responsive layout (column on mobile, row on desktop).
  - Accessibility features (button type, keyboard navigation, tabindex support).
- Playground: Tabs showcase page with 6 comprehensive examples:
  - Simple tabs with translation support.
  - Tabs with individual disabled states.
  - Event handling with `tabChange` output.
  - Tab content switching with `@switch` control flow.
  - Custom tab templates with icons and badges.
  - Interactive example with form integration and validation.
- Playground: Tabs test page for compatibility/regression testing.
- Docs: Complete English and Italian README for QuangTabsComponent.
- Docs: 6 usage examples covering all features (basic usage, disabled tabs, events, content switching, custom templates, form integration).

### Changed

- Playground: Added Tabs component to navigation menu under Components section.
- Translations: Added English and Italian translations for tabs showcase examples.

### Tests

- Comprehensive test suite for QuangTabsComponent with 60+ test cases.
- Test coverage exceeding 90% (statement, branch, function, and line coverage).
- Snapshot tests for DOM regression prevention.
- Tests covering: initialization, selection, events, disabled states, readonly mode, custom templates, form integration, accessibility, and edge cases.

## [19.4.0] - 2026-01-09

### Added

- New `QuangRadioGroupComponent` with standard and template-based options.
- Select/Autocomplete: support template-based option rendering via `SelectOption.renderer`.
- Date picker: keyboard support for opening the calendar (`Enter`/`ArrowDown`) and closing it (`Escape`).
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
- Select/Autocomplete: option list scrollbar is now always visible on macOS.
- Date picker: improved focus handling to avoid infinite focus loops when tabbing between multiple date pickers.
- Date browser focus test uses a stable component selector.
- Vitest config fixes.
- Dependency/publish tooling fixes (including @chevrotain updates).

### Docs

- Documented playground page structure conventions (Showcase + Examples + Test).
- Select/Autocomplete: documented template-based options.
