# Trim option for text-input components

## Summary

Add an opt-in `trim` option (default `false`) that strips leading/trailing
whitespace from the form value **when the field loses focus (blur)**. The option
lives on the shared base component so every text-input component inherits it, and
is meaningful for free-text components (`input`, `autocomplete`).

## Motivation

User-entered text frequently carries accidental leading/trailing whitespace.
Components should be able to clean it up without the consumer wiring a custom
value transformer. Trimming must never disturb text while the user is typing —
only once they have finished and the field has lost focus.

## Behavior

- `trim` defaults to `false`. With the default, no value is ever trimmed
  (preserves current behavior for `input`; restores untrimmed default for
  `autocomplete`).
- When `trim` is `true`, on blur the component replaces its value with the
  trimmed value if (and only if) the value is a string and trimming changes it.
- Trimming happens **only on blur**, never while typing.
- Non-string values (boolean, number, date, option values) are never trimmed.

### Per-component scope

| Component    | Value type                         | Behavior with `trim=true`                          |
| ------------ | ---------------------------------- | -------------------------------------------------- |
| input        | `string \| number`                 | text/textarea/email/url/search/tel trimmed on blur; number/color are no-ops |
| autocomplete | `string \| number \| ...[] \| null`| free-text value trimmed on blur                    |
| select       | option value                       | no-op in practice (option values, default false)   |
| date         | `string \| DateRange \| null`      | no-op (date strings have no surrounding whitespace) |
| radio-group  | `string \| number \| null`        | no-op (option values)                              |
| checkbox     | `boolean`                          | never trimmed (guard)                              |
| wysiwyg      | `string` (HTML)                    | excluded — uses its own blur handling              |

Only `input` and `autocomplete` document/expose the option as a meaningful
feature; other components inherit it harmlessly at the default.

## Design

### Base component (`QuangBaseComponent`)

Add:

```ts
/**
 * When true, strips leading/trailing whitespace from the value when the
 * field loses focus (blur). Only affects string values. Never trims while typing.
 * @default false
 */
trim = input<boolean>(false)
```

Update `onBlurHandler`:

```ts
onBlurHandler() {
  if (this.trim() && typeof this._value() === 'string') {
    const trimmed = (this._value() as string).trim()
    if (trimmed !== this._value()) {
      this.onChangedHandler(trimmed as T)
    }
  }
  if (this.onTouched) {
    this.onTouched()
  }
  this.componentBlur.emit()
}
```

This covers `input` (and every other subclass that routes blur through the base
handler) automatically.

### Autocomplete

Today the free-text blur branch in `processTextToFormValue` always writes the
trimmed `searchText`. Gate it on the flag so the default no longer trims:

```ts
} else if (shouldUseFreeText) {
  if (options.exitSearchMode) {
    this.onChangedHandler(this.trim() ? searchText : text)
  } else {
    this.onValueChange(text, false) // typing: always raw (unchanged)
  }
}
```

`searchText` is `text.trim()`, so this is consistent with the base behavior:
when `trim` is true the value is trimmed on blur/tab; when false the raw text is
kept. The base `super.onBlurHandler()` trim is idempotent for the click-blur path.

> Note: this is a behavior change for autocomplete — it currently always trims
> free text on blur. After this change the default (`trim=false`) preserves
> whitespace, matching every other component.

## Testing (TDD)

Base/input (`input.component.spec.ts` or base coverage via input host):
- `trim=false` (default): type `"  hi  "`, blur → value stays `"  hi  "`.
- `trim=true`: type `"  hi  "`, blur → value `"hi"`.
- `trim=true`: typing does not trim before blur.
- `trim=true` with a non-string value path is a no-op (e.g. number input).

Autocomplete (`autocomplete.component.spec.ts`):
- `allowFreeText=true`, `trim=false`: type `"  hello  "`, blur → value `"  hello  "`.
- `allowFreeText=true`, `trim=true`: type `"  hello  "`, blur → value `"hello"`.

Each test written and watched to fail before implementation.

## Playground

- Add a `trim` toggle to the input interactive/showcase example.
- Surface `trim` in the autocomplete interactive example toggles.

## Out of scope

- Trimming on form submit or value read.
- Trimming rich text (wysiwyg).
- Collapsing internal whitespace (only leading/trailing).
