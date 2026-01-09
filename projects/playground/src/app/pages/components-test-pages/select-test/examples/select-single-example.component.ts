import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core'
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'

import { QuangSelectComponent } from 'quang/components/select'
import { ErrorData, SelectOption } from 'quang/components/shared'

@Component({
  selector: 'playground-select-single-example',
  standalone: true,
  imports: [ReactiveFormsModule, QuangSelectComponent],
  template: `
    <form [formGroup]="form">
      <quang-select
        [errorMap]="errors()"
        [selectOptions]="options"
        componentId="select-single"
        componentLabel="form.label.select"
        componentPlaceholder="Select an option"
        formControlName="value"
        selectionMode="single"
        successMessage="form.label.success"
      />
    </form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectSingleExampleComponent {
  private readonly fb = inject(NonNullableFormBuilder)

  protected readonly errors = signal<ErrorData[]>([
    {
      error: Validators.required.name,
      message: 'form.errors.required',
    },
  ])

  protected readonly options: SelectOption[] = [
    { value: 'minLength', label: 'Min length' },
    { value: 'maxLength', label: 'Max length' },
    { value: 'pattern', label: 'Pattern' },
  ]

  protected readonly form = this.fb.group({
    value: this.fb.control<string>('', [Validators.required]),
  })
}

export const SELECT_SINGLE_EXAMPLE_TS = `import { Component } from '@angular/core'
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'
import { QuangSelectComponent } from 'quang/components/select'

@Component({
  selector: 'app-select-single-example',
  standalone: true,
  imports: [ReactiveFormsModule, QuangSelectComponent],
  template: \`<form [formGroup]="form">
  <quang-select
    [selectOptions]="options"
    componentId="select-single"
    componentLabel="form.label.select"
    componentPlaceholder="Select an option"
    formControlName="value"
    selectionMode="single"
    successMessage="form.label.success"
  />
</form>\`,
})
export class SelectSingleExampleComponent {
  constructor(private readonly fb: FormBuilder) {}

  options = [
    { value: 'minLength', label: 'Min length' },
    { value: 'maxLength', label: 'Max length' },
    { value: 'pattern', label: 'Pattern' },
  ]

  form = this.fb.group({
    value: ['', [Validators.required]],
  })
}`

export const SELECT_SINGLE_EXAMPLE_HTML = `<form [formGroup]="form">
  <quang-select
    [selectOptions]="options"
    componentId="select-single"
    componentLabel="form.label.select"
    componentPlaceholder="Select an option"
    formControlName="value"
    selectionMode="single"
    successMessage="form.label.success"
  />
</form>`
