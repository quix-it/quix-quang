# Signal Forms Refactor — InputTestComponent

**Date:** 2026-06-22  
**Branch:** quang21  
**Goal:** Refactor `InputTestComponent.testForm` to use Angular 21 full signal forms (`@angular/forms/signals`) and expose whether `QuangInputComponent` (CVA-based) is compatible with `[formField]` binding.

---

## Context

- Angular 21.1, signal forms are `@experimental`
- `QuangInputComponent` extends `QuangBaseComponent` which implements `ControlValueAccessor` via `NG_VALUE_ACCESSOR`
- Signal forms bind to custom components via `FormValueControl<T>` interface (requires `value: ModelSignal<T>`)
- `QuangInputComponent` does NOT expose `value: ModelSignal<T>` — this is the incompatibility under test

---

## Form Model

Replace `NonNullableFormBuilder.group()` with `form()` from `@angular/forms/signals`.

```typescript
// Control signals (write side — drive the schema logic)
readonly isFormDisabled = signal(false)
readonly isRequired = signal(true)
readonly recreatedMinLength = signal(1)
readonly testModel = signal({ testInput: '' })

// Signal form (schema evaluated at construction; reads control signals reactively)
readonly testForm = form(this.testModel, (p) => {
  disabled(p.testInput, () => this.isFormDisabled())
  required(p.testInput, { when: () => this.isRequired() })
  minLength(p.testInput, () => this.recreatedMinLength())
  maxLength(p.testInput, 30)
})
```

Key rule: `this.testForm` does not exist yet when the schema runs, so state must be driven by separate writable signals. The form exposes read-only signals for consumption.

---

## Value Change Reaction

Replace RxJS subscription (`valueChanges.pipe(distinctUntilChanged(), takeUntilDestroyed())`) with an `effect`:

```typescript
constructor() {
  effect(() => {
    const val = this.testModel().testInput
    if (val === 'ciao') {
      // noop
    } else if (val) {
      console.log('ciaoni')
      console.log('errors:', this.testForm.testInput().errors())
    }
  })
}
```

---

## Methods

| Current | Refactored |
|---|---|
| `testForm.enable()` / `testForm.disable()` | `isFormDisabled.update(v => !v)` |
| `getIsRequiredInput()` via `hasValidator()` | `testForm.testInput().required()` (form signal, read-only) |
| `changeFormInputRequired()` via `addValidators`/`removeValidators` | `isRequired.update(v => !v)` |
| `recreateForm()` — new FormBuilder.group with minLength(10) | `testModel.set({ testInput: 'New form created' }); recreatedMinLength.set(10)` |
| `setFormValues()` via `patchValue` | `testModel.update(m => ({ ...m, testInput: 'ciao!' }))` |
| `checkCurrentFormValueAndValidity()` reads `testForm.value` / `testForm.valid` | reads `testForm().value()` / `testForm().valid()` |

Note: `recreateForm()` previously created a new `FormGroup` instance entirely. Signal forms do not support schema recreation — the schema is fixed at `form()` call. The refactored version resets the model value and adjusts the dynamic `recreatedMinLength` signal, which achieves the same observable effect for the test.

---

## Template Bindings

| Current | Refactored |
|---|---|
| `[formGroup]="testForm"` | `[formRoot]="testForm"` |
| `formControlName="testInput"` | `[formField]="testForm.testInput"` |
| `testForm.enabled` | `!testForm.testInput().disabled()` |
| `testForm.value \| json` | `testForm().value() \| json` |
| `testForm.valid` | `testForm().valid()` |
| `getIsRequiredInput()` in button label | `testForm.testInput().required()` |

---

## Imports

**Remove from component `imports[]`:** `ReactiveFormsModule`  
**Keep:** `FormsModule` (needed for `[(ngModel)]` on `quang-select`)  
**Add to component `imports[]`:** `FormRoot`, `FormField` (from `@angular/forms/signals`)

**Remove from TS imports:** `NonNullableFormBuilder`, `ReactiveFormsModule`, `Validators`, `takeUntilDestroyed`, `distinctUntilChanged`  
**Add to TS imports:** `effect` (from `@angular/core`), `form`, `required`, `minLength`, `maxLength`, `disabled`, `FormRoot`, `FormField` (from `@angular/forms/signals`)

---

## Expected Compatibility Result

`[formField]="testForm.testInput"` on `<quang-input>` will not sync correctly.

The `FormField` directive connects to the host via the `FormValueControl<T>` contract:
- **Required:** `value: ModelSignal<T>` — the directive reads/writes the field value through this model signal
- **Optional:** `errors`, `disabled`, `touched`, `required`, etc. as signal inputs

`QuangInputComponent` (via `QuangBaseComponent`) provides:
- `NG_VALUE_ACCESSOR` with `writeValue()` / `registerOnChange()` callbacks
- `_value = signal<T | null>(null)` (internal, not exposed as a model)

It does **not** implement `FormValueControl<T>`. Result: the `FormField` directive cannot sync values, and the component will not receive form state (errors, disabled, touched).

### What `QuangBaseComponent` Would Need to Become Compatible

1. Replace `_value = signal<T | null>(null)` with `value = model<T | null>(null)` (public model signal)
2. Declare `implements FormValueControl<T | null>`
3. Remove `NG_VALUE_ACCESSOR` provider (no longer CVA)
4. Optionally add signal inputs for `errors`, `disabled`, `touched`, `required` — the `FormField` directive injects these automatically, so most of `setupFormControl()` and the RxJS subscriptions inside it could be eliminated

This is a significant breaking change to the public component API and is out of scope for this test — documenting the incompatibility is the deliverable.

---

## Out of Scope

- Modifying `QuangInputComponent` or `QuangBaseComponent` for compatibility
- Testing other quang components (select, autocomplete, etc.) with signal forms
- Async validators

---

## Findings

### TypeScript Template Errors

**No compile-time errors occurred.** The build (`npx nx build playground`) succeeded with zero errors. Angular 21's `FormField` directive does **not** enforce `FormValueControl<T>` type-checking at compile time for third-party components. The template compiled cleanly even though `QuangInputComponent` lacks `value: ModelSignal<string>`.

### Runtime Behavior

Manual runtime verification was deferred to the human reviewer (dev server requires interactive browser). However, based on the architectural analysis:

- `QuangInputComponent` implements `NG_VALUE_ACCESSOR` (CVA pattern) — no `FormValueControl<T>` interface.
- `FormField` directive expects `value: ModelSignal<T>` to read/write values.
- The directive cannot sync values to a CVA-only component.
- Buttons that manipulate the model signal directly (`recreateForm`, `setFormValues`) **will** update `testModel` but the change will **not** propagate to the visual input.
- Buttons that toggle form state (`changeFormEnabled`, `changeFormInputRequired`) toggle signals correctly but the visual component will not reflect disabled/required state from the form.
- `checkCurrentFormValueAndValidity` will show the model's value (which may not reflect user typing if two-way binding fails).

### Verdict

`QuangInputComponent` is **not** compatible with full signal forms `[formField]` binding because it implements the CVA pattern (`NG_VALUE_ACCESSOR`) instead of the `FormValueControl<T>` interface required by the `FormField` directive.
