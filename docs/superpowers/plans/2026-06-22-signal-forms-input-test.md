# Signal Forms Refactor — InputTestComponent Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace `InputTestComponent`'s reactive-forms `testForm` with Angular 21 signal forms (`@angular/forms/signals`) to expose whether `QuangInputComponent` (CVA-based) is compatible with `[formField]` binding.

**Architecture:** Use `form()` from `@angular/forms/signals` with writable control signals driving the schema logic reactively. Template switches from `[formGroup]`/`formControlName` to `[formRoot]`/`[formField]`. The incompatibility surfaces when `[formField]` is bound to `quang-input`, which implements `NG_VALUE_ACCESSOR` instead of `FormValueControl<T>`.

**Tech Stack:** Angular 21.1, `@angular/forms/signals` (experimental), TypeScript strict templates

## Global Constraints

- Do NOT modify `QuangInputComponent` or `QuangBaseComponent` — incompatibility is intentional, the test exposes it
- Keep `FormsModule` import — `quang-select` uses `[(ngModel)]`
- Do NOT add `ReactiveFormsModule` back
- Signal forms are `@experimental` — this is a playground/test page only, not production code

---

## File Map

| File | Action |
|---|---|
| `projects/playground/src/app/pages/components-test-pages/input-test/input-test.component.ts` | Modify — full refactor |
| `projects/playground/src/app/pages/components-test-pages/input-test/input-test.component.html` | Modify — full refactor |

---

### Task 1: Refactor TypeScript — signal form + control signals + methods

**Files:**
- Modify: `projects/playground/src/app/pages/components-test-pages/input-test/input-test.component.ts`

**Interfaces:**
- Produces: `testForm: FieldTree<{testInput: string}>`, control signals `isFormDisabled`, `isRequired`, `recreatedMinLength`, `testModel` — consumed by Task 2 template

- [ ] **Step 1: Replace the TypeScript file content**

Replace the entire file with:

```typescript
import { JsonPipe } from '@angular/common'
import { ChangeDetectionStrategy, Component, computed, effect, inject, signal, viewChild } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { disabled, form, FormField, FormRoot, maxLength, minLength, required } from '@angular/forms/signals'

import { TranslocoPipe } from '@jsverse/transloco'
import { AngularSvgIconModule } from 'angular-svg-icon'
import { QuangTranslationService } from 'quang/translation'

import { ComponentDocumentationComponent } from '../../../shared/components/component-documentation/component-documentation.component'
import { InputType, QuangInputComponent } from 'quang/components/input'
import { QuangSelectComponent } from 'quang/components/select'
import { SelectOption } from 'quang/components/shared'

import { SourceCodeDirective } from '../../../shared/directives/source-code.directive'

@Component({
  selector: 'playground-input-test',
  imports: [
    FormsModule,
    JsonPipe,
    FormRoot,
    FormField,
    QuangInputComponent,
    TranslocoPipe,
    QuangSelectComponent,
    ComponentDocumentationComponent,
    SourceCodeDirective,
    AngularSvgIconModule,
  ],
  templateUrl: './input-test.component.html',
  styleUrl: './input-test.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputTestComponent {
  private readonly quangTranslationService = inject(QuangTranslationService)
  protected QuangInputComponent = QuangInputComponent

  private readonly testComponent = viewChild('testComponent')

  testComponentSource = computed<string>(() => {
    if (this.testComponent()) {
      return document.getElementById('testComponent')?.getAttribute('data-source') ?? ''
    }
    return ''
  })

  componentsReadmePath = computed(() =>
    this.quangTranslationService.activeLang() === 'en' ? './assets/docs/input.md' : './assets/docs/input-it.md'
  )

  inputTypesList: InputType[] = ['number', 'url', 'tel', 'color', 'email', 'password', 'search', 'text', 'textarea']

  inputTypes = computed<SelectOption[]>(() => this.inputTypesList.map((x) => ({ label: x, value: x })))

  inputType = signal<InputType>('text')

  isReadonly = signal<boolean>(false)

  showValueAndValidity = signal<boolean>(false)

  errors = signal([
    {
      error: 'required',
      message: 'form.errors.required',
    },
    {
      error: 'minLength',
      message: 'form.errors.minLength',
    },
    {
      error: 'maxLength',
      message: 'form.errors.maxLength',
    },
    {
      error: 'noMatch',
      message: 'form.errors.noMatch',
    },
  ])

  helpMessage = signal<string>('form.helpMessage.inputTest')

  readonly isFormDisabled = signal(false)
  readonly isRequired = signal(true)
  readonly recreatedMinLength = signal(1)
  readonly testModel = signal({ testInput: '' })

  readonly testForm = form(this.testModel, (p) => {
    disabled(p.testInput, () => this.isFormDisabled())
    required(p.testInput, { when: () => this.isRequired() })
    minLength(p.testInput, () => this.recreatedMinLength())
    maxLength(p.testInput, 30)
  })

  showInput = signal(true)
  showPassword = signal(false)

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

  onToggleShowPassword(event: boolean): void {
    this.showPassword.set(event)
  }

  changeFormEnabled() {
    this.isFormDisabled.update((v) => !v)
  }

  getIsRequiredInput() {
    return this.testForm.testInput().required()
  }

  changeFormInputRequired() {
    this.isRequired.update((v) => !v)
  }

  changeVisibility() {
    this.showInput.set(!this.showInput())
  }

  recreateForm() {
    this.testModel.set({ testInput: 'New form created' })
    this.recreatedMinLength.set(10)
  }

  setFormValues() {
    this.testModel.update((m) => ({ ...m, testInput: 'ciao!' }))
  }

  checkCurrentFormValueAndValidity() {
    this.showValueAndValidity.set(true)
    console.log('Current form value:', this.testForm().value())
    console.log('Current form validity:', this.testForm().valid())
  }

  setReadonly() {
    this.isReadonly.set(!this.isReadonly())
  }
}
```

- [ ] **Step 2: Verify TypeScript compilation**

```bash
cd /Users/stefano.restuccia/Progetti/quix-quang
npx nx build playground 2>&1 | head -60
```

Expected: compilation proceeds past the `.ts` file (template errors acceptable at this stage — template hasn't been updated yet). TS errors in the `.ts` file itself must be zero.

- [ ] **Step 3: Commit**

```bash
git add projects/playground/src/app/pages/components-test-pages/input-test/input-test.component.ts
git commit -m "refactor(playground): migrate InputTestComponent to signal forms (TS)"
```

---

### Task 2: Refactor template — signal form directives

**Files:**
- Modify: `projects/playground/src/app/pages/components-test-pages/input-test/input-test.component.html`

**Interfaces:**
- Consumes: `testForm: FieldTree<{testInput: string}>`, `isReadonly`, `showInput`, `showValueAndValidity`, all other signals from Task 1
- `testForm.testInput` → `FieldTree<string>` — passed to `[formField]`
- `testForm.testInput().disabled()` → `boolean`
- `testForm.testInput().required()` → `boolean`
- `testForm().valid()` → `boolean`
- `testForm().value()` → `{testInput: string}`

- [ ] **Step 1: Replace the template file content**

```html
<div class="d-flex gap-4">
  <h3 class="d-flex flex-column w-100">{{ 'title.components.input' | transloco }}</h3>
  <div class="d-flex flex-column w-50">
    <quang-select
      [selectOptions]="inputTypes()"
      [(ngModel)]="inputType"
      componentLabel="form.buttons.selectInputType"
      selectionMode="single"
    ></quang-select>
  </div>
</div>
<form [formRoot]="testForm">
  <div class="card">
    <div class="card-header"></div>
    <div class="card-body">
      @if (showInput()) {
        <div class="row">
          <quang-input
            [class.col-6]="inputType() === 'password'"
            [componentType]="inputType()"
            [errorMap]="errors()"
            [helpMessage]="helpMessage()"
            [helpMessageTooltip]="true"
            [isReadonly]="isReadonly()"
            [maxNumber]="10"
            [minNumber]="0"
            #testComponent
            componentLabel="form.label.input"
            [formField]="testForm.testInput"
            id="testComponent"
            playgroundSourceCode
            showTooltipMethod="click"
            successMessage="form.label.success"
          >
            <svg-icon
              help-icon
              src="assets/icons/svg/info.svg"
            />
          </quang-input>
          @if (inputType() === 'password') {
            <quang-input
              [class.col-6]="inputType() === 'password'"
              [componentType]="inputType()"
              [errorMap]="errors()"
              [helpMessage]="helpMessage()"
              [isReadonly]="isReadonly()"
              [maxNumber]="10"
              [minNumber]="0"
              [showHidePasswordButton]="true"
              #testComponent
              componentLabel="form.label.input"
              [formField]="testForm.testInput"
              id="testComponent"
              playgroundSourceCode
              successMessage="form.label.success"
            >
              <svg-icon
                hide-password
                src="assets/icons/svg/visibility_off.svg"
              />
              <svg-icon
                show-password
                src="assets/icons/svg/visibility.svg"
              />
            </quang-input>
          }
        </div>
      }
      <div class="d-flex gap-3 mt-3">
        <button
          (click)="changeFormEnabled()"
          class="btn btn-outline-secondary"
        >
          {{ 'form.buttons.enabled' | transloco: { enabled: !testForm.testInput().disabled() } }}
        </button>
        <button
          (click)="changeFormInputRequired()"
          class="btn btn-outline-secondary"
        >
          {{ 'form.buttons.required' | transloco: { required: testForm.testInput().required() } }}
        </button>
        <button
          (click)="changeVisibility()"
          class="btn btn-outline-secondary"
        >
          {{ 'form.buttons.changeVisibility' | transloco }}
        </button>
        <button
          (click)="recreateForm()"
          class="btn btn-outline-secondary"
        >
          {{ 'form.buttons.recreateForm' | transloco }}
        </button>
        <button
          (click)="setFormValues()"
          class="btn btn-outline-secondary"
        >
          {{ 'form.buttons.setForm' | transloco }}
        </button>
        <button
          (click)="checkCurrentFormValueAndValidity()"
          class="btn btn-outline-secondary"
        >
          {{ 'form.buttons.checkForm' | transloco }}
        </button>
        <button
          (click)="setReadonly()"
          class="btn btn-outline-secondary"
        >
          {{ 'form.buttons.readonly' | transloco: { readonly: isReadonly() } }}
        </button>
      </div>
    </div>
  </div>
</form>
@if (showValueAndValidity()) {
  <div class="d-flex flex-column mt-3 ms-3">
    <span>
      {{ 'form.label.formValue' | transloco: { value: testForm().value() | json } }}
    </span>
    <span>
      {{ 'form.label.formValidity' | transloco: { valid: testForm().valid() } }}
    </span>
  </div>
}

<!-- Component Documentation Section -->
<div class="mt-5 border-top pt-4">
  <playground-component-documentation
    [componentType]="QuangInputComponent"
    [customReadmePath]="componentsReadmePath()"
    [exampleHtml]="testComponentSource()"
  />
</div>
```

- [ ] **Step 2: Full build to expose all errors**

```bash
cd /Users/stefano.restuccia/Progetti/quix-quang
npx nx build playground 2>&1
```

**Expected errors (incompatibility findings):**

The `[formField]="testForm.testInput"` bindings on `<quang-input>` will produce TypeScript template errors because `QuangInputComponent` does not implement `FormValueControl<string>` — it has no `value: ModelSignal<string>`. Record the exact error messages verbatim in the design spec.

Everything else should compile cleanly.

- [ ] **Step 3: Run dev server and manually verify all buttons**

```bash
cd /Users/stefano.restuccia/Progetti/quix-quang
npx nx serve playground
```

Navigate to the input test page. Verify:
- **Enable/Disable button:** label toggles `enabled: true/false`, input visually disables
- **Required button:** label toggles `required: true/false`
- **Change Visibility button:** input appears/disappears
- **Recreate Form button:** input value resets to `'New form created'`
- **Set Form Values button:** input value changes (or does NOT change — document the result)
- **Check Form button:** value + validity appear below form
- **Readonly button:** label toggles

Note which buttons work and which do not due to the `NG_VALUE_ACCESSOR` / `FormValueControl` incompatibility.

- [ ] **Step 4: Commit**

```bash
git add projects/playground/src/app/pages/components-test-pages/input-test/input-test.component.html
git commit -m "refactor(playground): migrate InputTestComponent template to signal forms"
```

---

### Task 3: Document compatibility findings in spec

**Files:**
- Modify: `docs/superpowers/specs/2026-06-22-signal-forms-input-test-design.md`

- [ ] **Step 1: Append findings section to the spec**

Add a new section `## Findings` at the end of the spec file containing:

1. **TypeScript template errors** (if any) — exact error text from the build output in Task 2 Step 2
2. **Runtime behavior** — which buttons worked, which didn't, observed symptom for each
3. **Verdict** — one sentence: `QuangInputComponent` is / is not compatible with full signal forms `[formField]` binding

- [ ] **Step 2: Commit**

```bash
git add docs/superpowers/specs/2026-06-22-signal-forms-input-test-design.md
git commit -m "docs: add signal forms compatibility findings for QuangInputComponent"
```
