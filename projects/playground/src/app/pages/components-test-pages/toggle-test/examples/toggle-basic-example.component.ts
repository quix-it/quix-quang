import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core'
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'

import { QuangCheckboxComponent } from 'quang/components/checkbox'
import { ErrorData } from 'quang/components/shared'

@Component({
  selector: 'playground-toggle-basic-example',
  standalone: true,
  imports: [ReactiveFormsModule, QuangCheckboxComponent],
  template: `
    <form
      [formGroup]="form"
      class="d-flex flex-column gap-3"
    >
      <div class="row g-3">
        <div class="col-12 col-md-6">
          <quang-checkbox
            [errorMap]="errors()"
            checkType="checkbox"
            componentId="checkbox-basic"
            componentLabel="form.label.checkbox"
            formControlName="checkbox"
            labelPosition="left"
            successMessage="form.label.success"
          />
        </div>
        <div class="col-12 col-md-6">
          <quang-checkbox
            [errorMap]="errors()"
            checkType="toggle"
            componentId="toggle-basic"
            componentLabel="form.label.toggle"
            formControlName="toggle"
            labelPosition="top"
            successMessage="form.label.success"
          />
        </div>
      </div>
    </form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToggleBasicExampleComponent {
  private readonly fb = inject(NonNullableFormBuilder)

  errors = signal<ErrorData[]>([
    {
      error: Validators.required.name,
      message: 'form.errors.required',
    },
  ])

  form = this.fb.group({
    checkbox: this.fb.control(false, [Validators.requiredTrue]),
    toggle: this.fb.control(false, [Validators.requiredTrue]),
  })
}

export const TOGGLE_BASIC_EXAMPLE_TS = `import { Component } from '@angular/core'
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'
import { QuangCheckboxComponent } from 'quang/components/checkbox'

@Component({
  selector: 'app-toggle-basic-example',
  standalone: true,
  imports: [ReactiveFormsModule, QuangCheckboxComponent],
  template: \`<form [formGroup]="form" class="d-flex flex-column gap-3">
  <quang-checkbox
    componentId="checkbox-basic"
    checkType="checkbox"
    componentLabel="form.label.checkbox"
    labelPosition="left"
    formControlName="checkbox"
    successMessage="form.label.success"
  />

  <quang-checkbox
    componentId="toggle-basic"
    checkType="toggle"
    componentLabel="form.label.toggle"
    labelPosition="top"
    formControlName="toggle"
    successMessage="form.label.success"
  />
</form>\`,
})
export class ToggleBasicExampleComponent {
  constructor(private readonly fb: FormBuilder) {}

  form = this.fb.group({
    checkbox: [false, [Validators.requiredTrue]],
    toggle: [false, [Validators.requiredTrue]],
  })
}`

export const TOGGLE_BASIC_EXAMPLE_HTML = `<form [formGroup]="form" class="d-flex flex-column gap-3">
  <quang-checkbox
    componentId="checkbox-basic"
    checkType="checkbox"
    componentLabel="form.label.checkbox"
    labelPosition="left"
    formControlName="checkbox"
    successMessage="form.label.success"
  />

  <quang-checkbox
    componentId="toggle-basic"
    checkType="toggle"
    componentLabel="form.label.toggle"
    labelPosition="top"
    formControlName="toggle"
    successMessage="form.label.success"
  />
</form>`
