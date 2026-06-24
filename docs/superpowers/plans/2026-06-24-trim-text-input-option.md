# Trim option for text-input components — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add an opt-in `trim` input (default `false`) that strips leading/trailing whitespace from string form values on blur, across text-input components.

**Architecture:** Put `trim` on `QuangBaseComponent` and apply it in the shared `onBlurHandler`, guarded to string values only. `input` inherits it for free. `autocomplete` overrides blur, so gate its existing free-text trim on the same flag.

**Tech Stack:** Angular (signal inputs), Vitest, jsdom, Transloco testing providers.

## Global Constraints

- `trim` default `false` — no component trims unless explicitly enabled.
- Trim happens **only on blur**, never while typing.
- Only string values are trimmed; non-string values (boolean/number/Date/option) untouched.
- Branch: `quang20`. Spec: `docs/superpowers/specs/2026-06-24-trim-text-input-option-design.md`.

---

### Task 1: Base `trim` input + blur trimming (covers input)

**Files:**
- Modify: `projects/quang/components/shared/quang-base-component.directive.ts` (add input ~line 53, edit `onBlurHandler` ~line 143-148)
- Test: `projects/quang/components/input/input.component.spec.ts` (new describe block)

**Interfaces:**
- Produces: `trim = input<boolean>(false)` on `QuangBaseComponent`; `onBlurHandler()` trims `_value()` on blur when `trim()` is true and value is a string.

- [ ] **Step 1: Write failing tests** — append to `input.component.spec.ts`:

```ts
describe('QuangInputComponent - trim', () => {
  @Component({
    template: `
      <form [formGroup]="form">
        <quang-input
          [trim]="trim"
          componentType="text"
          formControlName="field"
        />
      </form>
    `,
    standalone: true,
    imports: [ReactiveFormsModule, QuangInputComponent],
  })
  class TrimHostComponent {
    trim = false
    form = new FormGroup({ field: new FormControl<string | null>(null) })
  }

  let fixture: ComponentFixture<TrimHostComponent>
  let host: TrimHostComponent
  let input: HTMLInputElement

  async function setup(trim: boolean): Promise<void> {
    fixture = TestBed.createComponent(TrimHostComponent)
    host = fixture.componentInstance
    host.trim = trim
    fixture.detectChanges()
    input = fixture.nativeElement.querySelector('input')
  }

  function typeText(text: string): void {
    input.value = text
    input.dispatchEvent(new Event('input'))
    fixture.detectChanges()
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrimHostComponent],
      providers: [getTranslocoTestingProviders()],
    }).compileComponents()
  })

  it('does not trim on blur when trim is false (default)', async () => {
    await setup(false)
    typeText('  hi  ')
    input.dispatchEvent(new Event('blur'))
    fixture.detectChanges()
    expect(host.form.get('field')?.value).toBe('  hi  ')
  })

  it('does not trim while typing even when trim is true', async () => {
    await setup(true)
    typeText('  hi  ')
    expect(host.form.get('field')?.value).toBe('  hi  ')
  })

  it('trims leading/trailing whitespace on blur when trim is true', async () => {
    await setup(true)
    typeText('  hi  ')
    input.dispatchEvent(new Event('blur'))
    fixture.detectChanges()
    expect(host.form.get('field')?.value).toBe('hi')
  })
})
```

- [ ] **Step 2: Run, verify FAIL**

Run: `npx vitest run projects/quang/components/input/input.component.spec.ts -t "trim"`
Expected: the "trims ... on blur when trim is true" test FAILS (value `'  hi  '` not `'hi'`); first two pass.

- [ ] **Step 3: Add `trim` input to base** — in `quang-base-component.directive.ts`, after `helpMessageTooltip` input (~line 53):

```ts
  /**
   * When true, strips leading/trailing whitespace from the value when the field
   * loses focus (blur). Only affects string values. Never trims while typing.
   * @default false
   */
  trim = input<boolean>(false)
```

- [ ] **Step 4: Trim in `onBlurHandler`** — replace the existing `onBlurHandler`:

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

- [ ] **Step 5: Run, verify PASS**

Run: `npx vitest run projects/quang/components/input/input.component.spec.ts`
Expected: all pass.

- [ ] **Step 6: Commit**

```bash
git add projects/quang/components/shared/quang-base-component.directive.ts projects/quang/components/input/input.component.spec.ts
git commit -m "feat(input): add trim option to trim value on blur"
```

---

### Task 2: Gate autocomplete free-text trim on the flag

**Files:**
- Modify: `projects/quang/components/autocomplete/autocomplete.component.ts` (`processTextToFormValue` free-text branch ~line 748-754)
- Test: `projects/quang/components/autocomplete/autocomplete.component.spec.ts` (extend "Documented free text behaviors" describe)

**Interfaces:**
- Consumes: `trim` input from `QuangBaseComponent` (Task 1).
- Produces: autocomplete writes raw free-text value on blur when `trim` is false, trimmed when true.

- [ ] **Step 1: Write failing tests** — the `FreeTextBehaviorHostComponent` template must add `[trim]="trim"` and a `trim = false` field. Update the host and add tests inside the `allowFreeText = true` describe:

Host edit (add binding + field):

```ts
        <quang-autocomplete
          [allowFreeText]="allowFreeText"
          [searchTextDebounce]="50"
          [selectOptions]="options"
          [trim]="trim"
          formControlName="autocomplete"
        />
```

```ts
  class FreeTextBehaviorHostComponent {
    allowFreeText = false
    trim = false
    // ...existing form/options unchanged
  }
```

`setup` already sets `allowFreeText`; add `host.trim = ...` only in the new tests via a small override (set `host.trim` before `fixture.detectChanges()` — simplest: extend `setup` signature). Add an optional param:

```ts
  async function setup(allowFreeText: boolean, trim = false): Promise<void> {
    fixture = TestBed.createComponent(FreeTextBehaviorHostComponent)
    host = fixture.componentInstance
    host.allowFreeText = allowFreeText
    host.trim = trim
    fixture.detectChanges()
    cmp = fixture.debugElement.query(By.directive(QuangAutocompleteComponent)).componentInstance
    input = fixture.nativeElement.querySelector('quang-autocomplete input')
  }
```

New tests:

```ts
    it('does not trim free text on blur when trim is false (default)', async () => {
      await setup(true, false)
      await type('  hello  ')
      await clickOutsideBlur()
      expect(formValue()).toBe('  hello  ')
    })

    it('trims free text on blur when trim is true', async () => {
      await setup(true, true)
      await type('  hello  ')
      await clickOutsideBlur()
      expect(formValue()).toBe('hello')
    })
```

- [ ] **Step 2: Run, verify FAIL**

Run: `npx vitest run projects/quang/components/autocomplete/autocomplete.component.spec.ts -t "Documented free text"`
Expected: "does not trim ... when trim is false" FAILS (value `'hello'` because current code always trims on blur); existing trim-on-blur test for the prior whitespace behavior may also need this gating — confirm only the two new tests + the existing `trims the value only once the field loses focus (blur)` interact. That existing test does not set `trim`, so after the fix it expects untrimmed — update it in Step 3.

- [ ] **Step 3: Implement gating** — in `processTextToFormValue`, free-text branch:

```ts
      } else if (shouldUseFreeText) {
        // Free text allowed: use the typed text as value.
        // While typing keep raw text. On blur, trim only when the trim option is on.
        if (options.exitSearchMode) {
          this.onChangedHandler(this.trim() ? searchText : text)
        } else {
          this.onValueChange(text, false)
        }
      } else if (shouldClearOnBlurEmpty || shouldClearOnBlurNoMatch) {
```

Then fix the existing test `trims the value only once the field loses focus (blur)` (in the same describe) so its blur expectation reflects the new default (no trim unless enabled). Change its post-blur assertion to set up with trim enabled, or rename it to assert untrimmed-on-blur-by-default. Concretely, update that test to:

```ts
    it('keeps untrimmed value on blur by default, trims when trim is enabled', async () => {
      await setup(true, false)
      await type('  hello world  ')
      expect(formValue()).toBe('  hello world  ')
      await clickOutsideBlur()
      expect(formValue()).toBe('  hello world  ')

      await setup(true, true)
      await type('  hello world  ')
      await clickOutsideBlur()
      expect(formValue()).toBe('hello world')
    })
```

- [ ] **Step 4: Run, verify PASS**

Run: `npx vitest run projects/quang/components/autocomplete/autocomplete.component.spec.ts`
Expected: all pass.

- [ ] **Step 5: Commit**

```bash
git add projects/quang/components/autocomplete/autocomplete.component.ts projects/quang/components/autocomplete/autocomplete.component.spec.ts
git commit -m "feat(autocomplete): gate free-text blur trim behind trim option (default false)"
```

---

### Task 3: Document on input + autocomplete; add playground toggle

**Files:**
- Modify: `projects/quang/components/autocomplete/autocomplete.component.ts` (JSDoc note near `updateValueOnType` / class — optional, the input is inherited; add a class-level note)
- Modify: `projects/playground/src/app/pages/components-test-pages/autocomplete-test/examples/autocomplete-interactive-example.component.ts` (add `trim` toggle, mirroring the existing `allowFreeText` toggle)

**Interfaces:**
- Consumes: `trim` input (Tasks 1-2).

- [ ] **Step 1: Add `trim` signal + toggle to the autocomplete interactive example** — mirror the existing `updateValueOnType`/`allowFreeText` toggles (a `signal<boolean>(false)`, a checkbox bound `[checked]`/`(change)`, and `[trim]="trim()"` on the `<quang-autocomplete>`).

```ts
  // near other signals
  trim = signal<boolean>(false)
```

Template (mirror the allowFreeText toggle block):

```html
<input
  [checked]="trim()"
  (change)="trim.set(!trim())"
  type="checkbox"
/>
<span>trim</span>
```

And add `[trim]="trim()"` to the `<quang-autocomplete>` element.

- [ ] **Step 2: Verify playground builds**

Run: `npx vitest run projects/quang` (lib tests still green) and a TypeScript check on the playground if available, e.g. `npx tsc -p projects/playground/tsconfig.app.json --noEmit` (skip if config differs).
Expected: no type errors related to `trim`.

- [ ] **Step 3: Commit**

```bash
git add projects/playground/src/app/pages/components-test-pages/autocomplete-test/examples/autocomplete-interactive-example.component.ts
git commit -m "docs(playground): add trim toggle to autocomplete interactive example"
```

---

## Self-Review

- **Spec coverage:** base `trim` input (Task 1), on-blur-only string trim (Task 1 onBlurHandler), input coverage (Task 1), autocomplete gating + behavior-change note (Task 2), non-string no-op (guard in Task 1, exercised implicitly; checkbox/number safe by `typeof` guard), playground toggle (Task 3). wysiwyg explicitly out of scope — no task, correct.
- **Placeholder scan:** none; all steps show concrete code/commands.
- **Type consistency:** `trim = input<boolean>(false)` defined in Task 1, consumed as `this.trim()` in Task 2 and `[trim]` bindings in Task 3. `onChangedHandler` cast `as T` matches base generic.
