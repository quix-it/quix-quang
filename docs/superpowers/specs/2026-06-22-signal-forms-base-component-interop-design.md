# Signal Forms Interop — QuangBaseComponent

**Date:** 2026-06-22
**Branch:** quang21
**Goal:** Make every quang form component (all 8 extending `QuangBaseComponent`) usable with Angular 21 signal forms `[formField]` binding, while preserving full backward compatibility with reactive forms (`[formControl]`, `formControlName`) and template forms (`[(ngModel)]`). Change is confined to `QuangBaseComponent`; subclasses and templates are untouched.

This spec **supersedes** the verdict in `2026-06-22-signal-forms-input-test-design.md`, which concluded `QuangInputComponent` was "not compatible" with `[formField]`. That conclusion was wrong — see Background.

---

## Background — Why the earlier verdict was wrong

The earlier spec assumed `[formField]` only binds to hosts implementing `FormValueControl<T>` (`value: ModelSignal<T>`). The installed Angular forms (`@angular/forms` 21.2.7) shows otherwise.

`FormField` (the `[formField]` directive) doc (`node_modules/@angular/forms/types/_structure-chunk.d.ts`) states it binds to **three** kinds of UI control:

1. A native HTML input/textarea
2. A custom control implementing `FormValueControl` / `FormCheckboxControl`
3. **A component that provides a `ControlValueAccessor`** — "for backwards compatibility with reactive forms"

For case 3 the directive runs `cvaControlCreate` (`fesm2022/signals.mjs:809`):

- `registerOnChange(v => fieldState.controlValue.set(v))` — control's value changes flow into the field
- `registerOnTouched(() => markAsTouched())` — blur marks the field touched
- on field value change → `writeValue(value)` back into the CVA
- `disabled` field state → `setDisabledState(value)`
- other state (`required`, `errors`, `touched`, `invalid`, …) → `host.setInputOnDirectives(name, value)` (sets a matching `@Input` **only if the host declares one**)

The directive also provides a fake `NgControl` — `InteropNgControl` (`signals.mjs:554`) — so CVA components that inject `NgControl` keep working. `InteropNgControl`:

- `control = this` (so `ngControl.control` returns the interop object itself)
- getters `value / valid / invalid / disabled / errors / touched / dirty` read `field()` **signals** (reactive)
- `hasValidator(Validators.required)` returns `field().required()`; any other validator → `false`
- **no `statusChanges`, no `valueChanges`** properties

### Root cause of the runtime crash

`QuangBaseComponent.setupFormControl()`:

```ts
this._ngControl.set(this._injector().get(NgControl))   // → InteropNgControl under [formField]
const control = this._ngControl()?.control              // → the interop object (truthy)
this._statusChange$ = control?.statusChanges.pipe(...)  // control.statusChanges is undefined → .pipe throws
```

`control?.statusChanges.pipe(...)` only optional-chains `control`. `control` is truthy but `control.statusChanges` is `undefined`, so `.pipe` throws `Cannot read properties of undefined (reading 'pipe')`. Same latent bug on line 174 (`valueChanges`). Line 181 (`events`) is already guarded with `controlEvents?.pipe`.

---

## Design — Approach B (minimal interop)

All changes in `projects/quang/components/shared/quang-base-component.directive.ts`.

### 1. Guard the missing observable streams

```ts
this._statusChange$ = control?.statusChanges?.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
  this.checkFormErrors()
})

this._valueChange$ = control?.valueChanges?.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
  this.checkFormErrors()
})
```

- Reactive/template forms: real `AbstractControl` has both streams → subscriptions behave exactly as today.
- Signal forms (`InteropNgControl`): `statusChanges` / `valueChanges` are `undefined` → `?.pipe` short-circuits to `undefined`, no subscription, no crash.

### 2. Make state derivation reactive (so signal-forms field changes propagate)

In signal-forms mode there are no change streams, so `checkFormErrors()` would only run once. But the interop getters (`valid`, `errors`, `touched`, `disabled`, `required`) read `FieldState` **signals**. Running `checkFormErrors()` inside an `effect` makes it re-run whenever those signals change.

Add an effect, created with the component injector, that re-derives state:

```ts
constructor() {
  // ...existing formControl subscription...
  effect(() => {
    // Reading the interop control's signal-backed getters here registers reactive
    // dependencies under [formField]. Under reactive/template forms these getters
    // are plain (non-signal) — the effect runs once and the RxJS subscriptions in
    // setupFormControl drive subsequent updates.
    this.checkFormErrors()
  })
}
```

`checkFormErrors()` already reads `control.valid`, `control.errors`, `control.touched`, `control.dirty`, `control.hasValidator(...)` and the `errorMap`/`_errorMessagesByKey` signals — no change to its body required. The effect just needs to call it within a reactive context.

Notes:
- The effect must read `this._ngControl()` (a signal) so it re-registers when `setupFormControl` swaps the control in. `checkFormErrors` already does `this._ngControl()?.control`, satisfying this.
- `_isDisabled` in signal-forms mode is also driven by `setDisabledState` via `cvaControlCreate`; the effect's `_isDisabled` derivation and `setDisabledState` are consistent (both reflect the field's disabled state).

### 3. No other changes

- `NG_VALUE_ACCESSOR` provider, `writeValue` / `registerOnChange` / `registerOnTouched` / `setDisabledState` — unchanged.
- No `FormValueControl` / `value` model added.
- No new `@Input`s.
- No subclass changes (input, checkbox, select, date, radio-group, autocomplete, wysiwyg, tabs).
- No template changes.

---

## Backward compatibility guarantee

For an application consuming the library:

| Usage | TS change | HTML change | Works |
|---|---|---|---|
| `[formGroup]` + `formControlName` | none | none | ✓ |
| `[formControl]` | none | none | ✓ |
| `[(ngModel)]` (template forms) | none | none | ✓ |
| `[formField]` (signal forms) | none | none | ✓ (new) |

Nothing removed or renamed — only a new capability added.

---

## Verification

1. **Signal forms path** — the existing playground `InputTestComponent` (already migrated to `[formField]` in commits on `quang21`): no console crash; typing updates `testForm` value; required/minLength/maxLength validation errors render; disabled toggle disables the input; touched state updates on blur.
2. **Reactive forms path (regression)** — an existing reactive-forms usage of `quang-input` (and at least one other component): value sync, error display, disabled, and touched behave exactly as before. Confirm the new `effect` does not change error/touched **timing** or cause duplicate error flashes.
3. **Error key mapping** — resolved by investigation, no base change needed (see below). Confirm in the playground that signal-forms errors render with the camelCase keys.

### Error key convention (investigated)

`checkFormErrors` matches error keys **exactly** (`Object.entries(control.errors)` → `_errorMessagesByKey.get(key)`, no normalization). The error keys differ by form system:

| Validator | Signal-forms `kind` | Reactive `Validators` key |
|---|---|---|
| required | `required` | `required` |
| min | `min` | `min` |
| max | `max` | `max` |
| minLength | `minLength` | `minlength` |
| maxLength | `maxLength` | `maxlength` |
| pattern | `pattern` | `pattern` |
| email | `email` | `email` |

(Signal-forms kinds come from the error classes in `fesm2022/signals.mjs:121-165`; the interop control surfaces them via `signalErrorsToValidationErrors`, keyed by `error.kind`.)

**Decision:** the base does **not** remap or normalize keys. Error-key matching is a consumer concern — the `errorMap` keys must match whatever the active form system emits. Under `[formField]`, consumers register camelCase keys (`minLength`, `maxLength`, …); under reactive forms, lowercase (`minlength`, `maxlength`). The migrated `InputTestComponent` already registers camelCase keys, so its messages render correctly. Normalizing in the base would be scope creep and could mask consumer-side key mistakes.

**Documentation deliverable:** note in the library docs that signal-forms (`[formField]`) consumers must use signal-forms `kind` strings for `errorMap` keys (camelCase length keys), distinct from reactive-forms keys.

---

## Out of scope

- Approach A (adding `FormUiControl` signal inputs `disabled`/`required`/`errors`/`touched`/`invalid` and deriving state from them, eventually dropping the `NgControl` + RxJS plumbing) — a possible future cleanup, captured separately if/when desired.
- `FormCheckboxControl` (`checked` model) for `QuangCheckboxComponent` — not needed; checkbox works through the CVA interop path like the others.
- Per-component template migration in the playground beyond `InputTestComponent`.
- Async validators.

---

## Follow-up

Correct the verdict in `2026-06-22-signal-forms-input-test-design.md` (or mark it superseded by this spec) so the "not compatible" conclusion does not mislead later work.
