import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core'
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'

import { QuangSelectComponent } from 'quang/components/select'
import { ErrorData, SelectOption } from 'quang/components/shared'

@Component({
  selector: 'playground-select-multiple-example',
  standalone: true,
  imports: [ReactiveFormsModule, QuangSelectComponent],
  template: `
    <form [formGroup]="form">
      <quang-select
        [errorMap]="errors()"
        [selectOptions]="options"
        componentId="select-multiple"
        componentLabel="form.label.multipleSelect"
        componentPlaceholder="Select multiple options"
        formControlName="value"
        selectionMode="multiple"
        successMessage="form.label.success"
      />
    </form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectMultipleExampleComponent {
  private readonly fb = inject(NonNullableFormBuilder)

  protected readonly errors = signal<ErrorData[]>([
    {
      error: Validators.required.name,
      message: 'form.errors.required',
    },
  ])

  protected readonly options: SelectOption[] = [
    { value: 1, label: 'One' },
    { value: 2, label: 'Two' },
    { value: 3, label: 'Three' },
    { value: 4, label: 'Four' },
  ]

  protected readonly form = this.fb.group({
    value: this.fb.control<number[]>([], [Validators.required]),
  })
}

export const SELECT_MULTIPLE_EXAMPLE_TS = `import { Component } from '@angular/core'
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'
import { QuangSelectComponent } from 'quang/components/select'

@Component({
  selector: 'app-select-multiple-example',
  standalone: true,
  imports: [ReactiveFormsModule, QuangSelectComponent],
  template: \`<form [formGroup]="form">
  <quang-select
    [selectOptions]="options"
    componentId="select-multiple"
    componentLabel="form.label.multipleSelect"
    componentPlaceholder="Select multiple options"
    formControlName="value"
    selectionMode="multiple"
    successMessage="form.label.success"
  />
</form>\`,
})
export class SelectMultipleExampleComponent {
  constructor(private readonly fb: FormBuilder) {}

  options = [
    { value: 1, label: 'One' },
    { value: 2, label: 'Two' },
    { value: 3, label: 'Three' },
    { value: 4, label: 'Four' },
  ]

  form = this.fb.group({
    value: [[], [Validators.required]],
  })
}`

export const SELECT_MULTIPLE_EXAMPLE_HTML = `<form [formGroup]="form">
  <quang-select
    [selectOptions]="options"
    componentId="select-multiple"
    componentLabel="form.label.multipleSelect"
    componentPlaceholder="Select multiple options"
    formControlName="value"
    selectionMode="multiple"
    successMessage="form.label.success"
  />
</form>`
