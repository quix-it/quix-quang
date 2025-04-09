# Migration Guide: Quang Library v15 to v17

This guide provides the necessary steps to migrate your application from version 15 to version 17 of the Quang library. Follow the outlined changes for each component or feature to ensure a smooth transition. The listed changes are not exhaustive, as the library has undergone a major refactor, consolidating many components into one or rearranging the features.
The list of changes is not exhaustive, in case of specific migration advice ask the development team.

## General

All components have been migrated from Modules to Standalone. Attributes that conflicted with reserved keywords (readonly, min, max, ...) have been renamed to avoid such conflicts.

### Deprecated components without replacement

The following components have been deprecated, as they have been deemed either superfluous or often required heavy customizations:

- `QuangInputFile`, can be re-implemented with `ngx-file-drop`, reference is available at `quix-it/lamborghini-welambo-backoffice-lib-frontend`
- `QuangAutocomplete<String|Object>Async`, can be re-implemented using the current `QuangAutocomplete`
- `QuangCard`
- `QuangCalendar`
- ...

## Input

Rigid form messages structure has been deprecated in favor of a dynamic error map and custom hint and success messages. All components now extend the same abstract base class `QuangBaseComponent`

### Module Consolidation:

Replace the following modules with `QuangInput` and set the appropriate `componentType`:

- `QuangInputTextModule` → `QuangInputComponent` (`componentType = 'text'`)
- `QuangInputEmailModule` → `QuangInputComponent` (`componentType = 'email'`)
- `QuangInputNumberModule` → `QuangInputComponent` (`componentType = 'number'`)
- ...

### Tag changes:

- Replace `<quang-input-obj>` and `<quang-select-str>` with `<quang-select>`.

### Attribute Changes:

- [number] `max` → `maxNumber`
- [number] `min` → `minNumber`
- `formName` (deprecated)
- `aria-label` (deprecated)
- `errorMessage` → `errorMap`
- `label` → `componentLabel`
- `placeHolder` → `componentPlaceholder`

## Date

The base library used for the component has been changed from `ngx-bootstrap/datepicker` to `air-datepicker`. If the component is used, add to the global stylesheet the following:

```scss
@import '@quang/components/date/global-date.component.scss';
```

### Tag changes:

- Replace `<quang-input-date>` with `<quang-date>`.

### Attribute Changes:

- `readOnly` → `isReadonly`
- `buttonClass` is now a `string[]` instead of a `string`.
- [new] timePicker

### Behavior Changes:

The component used to have a `returnISODate` flag that tried to handle different use cases, which often lead to weid behavior. The new component only works with ISOStrings and always returns such a date. The date string is always in UTC time at midnight, any time information is discarded, unless the timePicker flag is set to true, in which case the component keeps the time information, which depends on the user locale.

## Select

### Tag changes:

- Replace `<quang-select-obj>` and `<quang-select-str>` with `<quang-select>`.

### Attribute Changes:

- `list` attribute is now `selectOptions`.

### Component Consolidation:

- `quang-select-obj` and `quang-select-strg` have been consolidated into `quang-select`.

### Behavior Changes:

- `quang-select-str` expected a list of strings for its `list` input.
- `quang-select-obj` allowed configurable labels and return values.
- `quang-select` now expects a list of objects with the properties:
  - `label: string`
  - `value: string | number`.

## Toast

### Import Path Changes:

- Replace:
  ```typescript
  import { QuangDialogModule, QuangToastComponent, Toast } from '@quang/dialog'
  ```
- With:
  ```typescript
  import { QuangToastComponent, Toast } from '@quang/overlay/toast'
  ```

## Loader

### Import Path Changes:

- Replace:
  ```typescript
  import { QuangDialogModule } from '@quang/dialog'
  ```
- With:
  ```typescript
  import { QuangLoaderComponent } from '@quang/loader'
  ```

## Modal

### Service Deprecation:

- `QuangModalService` is now deprecated.
- Since it was a wrapper around `BsModalService`, calls can be replaced by importing `NgxBootstrap`'s modal service directly.

### Recommended Migration:

- Use the new `QuangModal` directly in your pages for modal functionality.

## Authentication

### Module Consolidation:

- `quang/keycloak` and `quang/oidc` have been consolidated into `quang/auth`.
- Behavior Changes:
  - While `quang/auth` only supports OIDC, it performs better with Keycloak as the official JavaScript library was unstable.
- New Feature:
  - An optional feature for handling mobile authentication using Capacitor has been added.

## ESLint Configuration

### Base Configuration Update:

- The ESLint base configuration has been migrated from `standardjs` to `airbnb`.
  Action Required:
- Copy the new `.eslintrc` and `.prettierrc` from either `@quang` or the blank project.
