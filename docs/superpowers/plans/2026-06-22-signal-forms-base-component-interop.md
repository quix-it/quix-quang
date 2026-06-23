# Signal Forms Interop for QuangBaseComponent — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make every quang form component usable with Angular signal forms `[formField]` binding without crashing, while keeping reactive/template forms working unchanged.

**Architecture:** Two base-only changes in `QuangBaseComponent`: (1) optional-chain the RxJS subscriptions on `statusChanges`/`valueChanges` so the absence of those streams under signal forms' `InteropNgControl` does not throw; (2) drive validation-state derivation from a reactive `effect` so signal-backed interop getters propagate changes. Plus a docs note on the error-key convention. No subclass or template changes.

**Tech Stack:** Angular 21.2, `@angular/forms` + `@angular/forms/signals`, RxJS, Vitest (`@analogjs/vitest-angular`), Transloco.

## Global Constraints

- Change is confined to `projects/quang/components/shared/quang-base-component.directive.ts` (plus a new spec file and docs). No edits to the 8 subclass components or their templates.
- Do NOT add `FormValueControl` / `value` model, do NOT remove `NG_VALUE_ACCESSOR`, do NOT rename any CVA method. Capability is additive only.
- Backward compatibility is mandatory: existing reactive (`[formControl]`, `formControlName`) and template (`[(ngModel)]`) usages must behave exactly as before — no app TS/HTML changes.
- Test runner is Vitest. Run a single spec with: `npx vitest run <path-to-spec>`.
- Error-key matching in `checkFormErrors` stays exact-match; no normalization/remap added.

---

### Task 1: Fix the `[formField]` crash and make state reactive

**Files:**
- Create: `projects/quang/components/input/input.signal-forms.spec.ts`
- Modify: `projects/quang/components/shared/quang-base-component.directive.ts`

**Interfaces:**
- Consumes: `QuangInputComponent` (from `quang/components/input`), `ErrorData` (from `quang/components/shared`), `form`, `required`, `minLength`, `FormRoot`, `FormField` (from `@angular/forms/signals`).
- Produces: no new public API. `QuangBaseComponent` gains an internal `effect` in its constructor and guarded subscriptions in `setupFormControl()`; signatures unchanged.

- [ ] **Step 1: Write the failing signal-forms interop test**

Create `projects/quang/components/input/input.signal-forms.spec.ts`:

```ts
import { Component, Injectable, signal } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FormField, FormRoot, form, minLength, required } from '@angular/forms/signals'
import { By } from '@angular/platform-browser'

import { TranslocoLoader, provideTransloco } from '@jsverse/transloco'
import { Observable, of } from 'rxjs'
import { beforeEach, describe, expect, it } from 'vitest'

import { QuangInputComponent } from './input.component'
import { ErrorData } from 'quang/components/shared'

@Injectable()
class TestTranslocoLoader implements TranslocoLoader {
  getTranslation(_lang: string): Observable<Record<string, string>> {
    return of({})
  }
}

const getTranslocoTestingProviders = () =>
  provideTransloco({
    config: { availableLangs: ['en'], defaultLang: 'en', fallbackLang: 'en', prodMode: true },
    loader: TestTranslocoLoader,
  })

@Component({
  template: `
    <form [formRoot]="testForm">
      <quang-input
        [errorMap]="errors"
        componentType="text"
        [formField]="testForm.testInput"
      />
    </form>
  `,
  standalone: true,
  imports: [FormRoot, FormField, QuangInputComponent],
})
class SignalFormsHostComponent {
  errors: ErrorData[] = [
    { error: 'required', message: 'form.errors.required' },
    { error: 'minLength', message: 'form.errors.minLength' },
  ]

  model = signal({ testInput: '' })

  testForm = form(this.model, (p) => {
    required(p.testInput)
    minLength(p.testInput, 3)
  })
}

describe('QuangInputComponent + signal forms [formField]', () => {
  let fixture: ComponentFixture<SignalFormsHostComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignalFormsHostComponent],
      providers: [getTranslocoTestingProviders()],
    }).compileComponents()

    fixture = TestBed.createComponent(SignalFormsHostComponent)
  })

  it('mounts under [formField] without throwing', () => {
    expect(() => fixture.detectChanges()).not.toThrow()

    const input = fixture.debugElement.query(By.css('quang-input input.form-control'))
    expect(input).not.toBeNull()
  })

  it('reflects validity reactively from the signal form', async () => {
    fixture.detectChanges()
    const host = fixture.componentInstance

    // Empty + required => field invalid
    expect(host.testForm.testInput().valid()).toBe(false)

    // Set a valid value (>= 3 chars, non-empty) on the model
    host.model.set({ testInput: 'hello' })
    fixture.detectChanges()
    await fixture.whenStable()

    expect(host.testForm.testInput().valid()).toBe(true)
  })
})
```

- [ ] **Step 2: Run the test to verify it fails (reproduces the crash)**

Run: `npx vitest run projects/quang/components/input/input.signal-forms.spec.ts`
Expected: FAIL. The "mounts ... without throwing" test fails with `TypeError: Cannot read properties of undefined (reading 'pipe')` originating in `setupFormControl`.

- [ ] **Step 3: Guard the missing observable streams**

In `projects/quang/components/shared/quang-base-component.directive.ts`, inside `setupFormControl()`, change the two unguarded `.pipe` calls (currently lines ~170 and ~174):

```ts
    this._statusChange$ = control?.statusChanges?.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      this.checkFormErrors()
    })

    this._valueChange$ = control?.valueChanges?.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      this.checkFormErrors()
    })
```

(Only `?.` is added before `.pipe` on `statusChanges` and `valueChanges`. The `events` line is already guarded — leave it.)

- [ ] **Step 4: Add the reactive state effect**

In the same file, add `effect` to the existing `@angular/core` import:

```ts
import { AfterViewInit, DestroyRef, Directive, Injector, computed, effect, inject, input, output, signal } from '@angular/core'
```

Then add an `effect` to the constructor so `checkFormErrors()` runs in a reactive context (the `InteropNgControl` getters read `FieldState` signals, so this re-runs when signal-forms field state changes; under reactive forms the getters are non-reactive, so it runs once and the RxJS subscriptions drive updates):

```ts
  constructor() {
    toObservable(this.formControl)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((form) => {
        if (form) {
          this.setupFormControl()
        }
      })

    effect(() => {
      this.checkFormErrors()
    })
  }
```

- [ ] **Step 5: Run the test to verify it passes**

Run: `npx vitest run projects/quang/components/input/input.signal-forms.spec.ts`
Expected: PASS (both tests).

- [ ] **Step 6: Commit**

```bash
git add projects/quang/components/input/input.signal-forms.spec.ts projects/quang/components/shared/quang-base-component.directive.ts
git commit -m "fix(quang): support signal forms [formField] binding in base component

Guard statusChanges/valueChanges subscriptions (absent on the interop
NgControl provided by [formField]) and drive checkFormErrors from a reactive
effect so signal-backed field state propagates. Reactive/template forms
unaffected."
```

---

### Task 2: Verify reactive-forms regression

**Files:**
- Test: `projects/quang/components/input/input.component.spec.ts` (existing, unchanged — run only)
- Test: `projects/quang/components/checkbox/checkbox.component.spec.ts` (existing, unchanged — run only)
- Test: `projects/quang/components/date/date.component.spec.ts` (existing, unchanged — run only)
- Test: `projects/quang/components/autocomplete/autocomplete.component.spec.ts` (existing, unchanged — run only)

**Interfaces:**
- Consumes: nothing new.
- Produces: nothing — this task is a regression gate confirming the base change did not alter reactive-forms behavior.

- [ ] **Step 1: Run the existing component spec suite**

Run: `npx vitest run projects/quang/components/input/input.component.spec.ts projects/quang/components/checkbox/checkbox.component.spec.ts projects/quang/components/date/date.component.spec.ts projects/quang/components/autocomplete/autocomplete.component.spec.ts`
Expected: PASS. In particular, `input.component.spec.ts` "should not show error state before submit when pristine/untouched" and "should show error state after submitting invalid form (markAllAsTouched)" must still pass — this proves the new `effect` did not change error/touched timing (no premature `is-invalid` before submit).

- [ ] **Step 2: Run the full quang test suite**

Run: `npx vitest run projects/quang`
Expected: PASS, no new failures versus the pre-change baseline.

- [ ] **Step 3 (only if Step 1 or 2 regresses): diagnose timing**

If any pristine/untouched test now shows `is-invalid` prematurely, the effect is writing touched/error state too early. Fix by making `checkFormErrors` a no-op when there is no resolved control yet — guard the body with an early return when `this._ngControl()?.control` is undefined:

```ts
  checkFormErrors() {
    const control = this._ngControl()?.control
    if (!control) {
      return
    }
    // ...existing body unchanged...
  }
```

Re-run Step 1 and Step 2 until PASS. Then commit:

```bash
git add projects/quang/components/shared/quang-base-component.directive.ts
git commit -m "fix(quang): skip checkFormErrors before control resolved"
```

(If Steps 1 and 2 pass directly, this task produces no commit.)

---

### Task 3: Verify the playground signal-forms page and document the error-key convention

**Files:**
- Modify: `docs/superpowers/specs/2026-06-22-signal-forms-input-test-design.md`
- Verify only (no edit): `projects/playground/src/app/pages/components-test-pages/input-test/input-test.component.ts` + `.html`

**Interfaces:**
- Consumes: nothing.
- Produces: corrected documentation; manual confirmation that the playground page works end-to-end.

- [ ] **Step 1: Run the playground and confirm no console crash**

Run: `npx nx serve playground` (or the project's existing serve command), open the Input test page.
Expected: no `Cannot read properties of undefined (reading 'pipe')` in the console. Typing in the input updates the displayed form value; leaving the field empty shows the required error; fewer than the min length shows the minLength error; toggling disabled disables the input; blurring marks touched.

- [ ] **Step 2: Correct the superseded verdict in the earlier spec**

In `docs/superpowers/specs/2026-06-22-signal-forms-input-test-design.md`, append a note at the top of the `## Findings` section (immediately after the `## Findings` heading line):

```markdown
> **SUPERSEDED (2026-06-22):** The "not compatible" verdict below is incorrect.
> Angular's `[formField]` directive binds to `ControlValueAccessor` hosts via
> `cvaControlCreate` + a fake `InteropNgControl`, so `QuangInputComponent` IS
> usable with signal forms. The only issue was a runtime crash in
> `setupFormControl` (`.pipe` on the interop control's absent `statusChanges`/
> `valueChanges`), fixed in
> `2026-06-22-signal-forms-base-component-interop-design.md`. Disregard the
> "Verdict" and runtime-behavior claims in this section.
```

- [ ] **Step 3: Document the error-key convention**

Append to the same file, at the end, a new section:

```markdown
## Error-key convention (signal forms vs reactive)

`checkFormErrors` matches `errorMap` keys exactly against the keys in
`control.errors`. The keys differ by form system:

| Validator | Signal forms `kind` | Reactive `Validators` key |
|---|---|---|
| required | `required` | `required` |
| min | `min` | `min` |
| max | `max` | `max` |
| minLength | `minLength` | `minlength` |
| maxLength | `maxLength` | `maxlength` |
| pattern | `pattern` | `pattern` |
| email | `email` | `email` |

When binding a quang component with `[formField]`, register `errorMap` keys
using the signal-forms `kind` strings (camelCase length keys). Under reactive
forms, use the lowercase keys. The base does not normalize keys.
```

- [ ] **Step 4: Commit**

```bash
git add docs/superpowers/specs/2026-06-22-signal-forms-input-test-design.md
git commit -m "docs: supersede signal-forms incompatibility verdict; document error-key convention"
```

---

## Self-Review

**Spec coverage:**
- Design change 1 (guard streams) → Task 1, Step 3 ✓
- Design change 2 (reactive effect) → Task 1, Step 4 ✓
- Design change 3 (no other changes / backward compat) → Task 2 (regression gate) ✓
- Verification 1 (signal-forms path) → Task 1 tests + Task 3 Step 1 ✓
- Verification 2 (reactive regression, timing) → Task 2 ✓
- Verification 3 + error-key convention doc → Task 3 Steps 2-3 ✓
- Follow-up (supersede old spec verdict) → Task 3 Step 2 ✓

**Placeholder scan:** No TBD/TODO. All code steps contain full code; all run steps contain exact commands + expected output. ✓

**Type consistency:** `checkFormErrors()`, `setupFormControl()`, `_ngControl()`, `_statusChange$`, `_valueChange$`, `destroyRef`, `errorMap` used consistently with the existing directive. Test host signal names (`model`, `testForm`, `testInput`, `errors`) consistent across steps. ✓
