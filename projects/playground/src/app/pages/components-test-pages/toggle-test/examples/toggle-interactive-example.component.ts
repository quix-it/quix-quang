import { JsonPipe } from '@angular/common'
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core'
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'

import { TranslocoPipe } from '@jsverse/transloco'

import { QuangCheckboxComponent } from 'quang/components/checkbox'
import { ErrorData } from 'quang/components/shared'

type CheckType = 'toggle' | 'checkbox'

type LabelPosition = 'top' | 'left' | 'right'

@Component({
  selector: 'playground-toggle-interactive-example',
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe, TranslocoPipe, QuangCheckboxComponent],
  template: `
    <p class="text-muted mb-3">
      {{ 'examples.checkbox.interactive.helper' | transloco }}
    </p>

    <form [formGroup]="form">
      <div class="row g-3 align-items-start">
        <div class="col-12 col-md-6">
          <quang-checkbox
            [checkType]="checkType()"
            [componentLabel]="componentLabel()"
            [errorMap]="errors()"
            [isReadonly]="isReadonly()"
            [labelPosition]="labelPosition()"
            componentId="checkbox-interactive"
            formControlName="value"
            successMessage="form.label.success"
          />
        </div>

        <div class="col-12 col-md-6">
          <div class="d-flex flex-wrap gap-2">
            <button
              (click)="toggleType()"
              class="btn btn-outline-secondary"
              type="button"
            >
              {{ 'examples.checkbox.interactive.buttons.toggleType' | transloco: { type: checkType() } }}
            </button>

            <button
              (click)="cycleLabelPosition()"
              class="btn btn-outline-secondary"
              type="button"
            >
              {{ 'examples.checkbox.interactive.buttons.labelPosition' | transloco: { position: labelPosition() } }}
            </button>

            <button
              (click)="toggleReadonly()"
              class="btn btn-outline-secondary"
              type="button"
            >
              {{ 'form.buttons.readonly' | transloco: { readonly: isReadonly() } }}
            </button>

            <button
              (click)="toggleRequired()"
              class="btn btn-outline-secondary"
              type="button"
            >
              {{ 'form.buttons.required' | transloco: { required: isRequired() } }}
            </button>

            <button
              (click)="toggleDisabled()"
              class="btn btn-outline-secondary"
              type="button"
            >
              {{ 'form.buttons.enabled' | transloco: { enabled: form.enabled } }}
            </button>

            <button
              (click)="setValue()"
              class="btn btn-outline-secondary"
              type="button"
            >
              {{ 'examples.checkbox.interactive.buttons.setValue' | transloco }}
            </button>

            <button
              (click)="reset()"
              class="btn btn-outline-secondary"
              type="button"
            >
              {{ 'form.buttons.resetForm' | transloco }}
            </button>
          </div>
        </div>
      </div>
    </form>

    <div class="card mt-3">
      <div class="card-body">
        <div class="d-flex gap-4 flex-wrap">
          <div>
            <div class="fw-semibold">Value</div>
            <div>{{ form.value.value }}</div>
          </div>
          <div>
            <div class="fw-semibold">Valid</div>
            <div>{{ form.valid }}</div>
          </div>
          <div>
            <div class="fw-semibold">Errors</div>
            <pre class="mb-0">{{ form.controls.value.errors | json }}</pre>
          </div>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToggleInteractiveExampleComponent {
  private readonly fb = inject(NonNullableFormBuilder)

  errors = signal<ErrorData[]>([
    {
      error: Validators.required.name,
      message: 'form.errors.required',
    },
  ])

  form = this.fb.group({
    value: this.fb.control(false, [Validators.requiredTrue]),
  })

  isReadonly = signal(false)
  checkType = signal<CheckType>('toggle')
  labelPosition = signal<LabelPosition>('top')

  componentLabel = computed(() => (this.checkType() === 'toggle' ? 'form.label.toggle' : 'form.label.checkbox'))

  isRequired = computed(() => this.form.controls.value.hasValidator(Validators.requiredTrue))

  toggleType(): void {
    this.checkType.set(this.checkType() === 'toggle' ? 'checkbox' : 'toggle')
  }

  cycleLabelPosition(): void {
    const next: Record<LabelPosition, LabelPosition> = {
      top: 'left',
      left: 'right',
      right: 'top',
    }
    this.labelPosition.set(next[this.labelPosition()])
  }

  toggleReadonly(): void {
    this.isReadonly.set(!this.isReadonly())
  }

  toggleRequired(): void {
    if (this.isRequired()) {
      this.form.controls.value.removeValidators(Validators.requiredTrue)
    } else {
      this.form.controls.value.addValidators(Validators.requiredTrue)
    }
    this.form.controls.value.updateValueAndValidity()
  }

  toggleDisabled(): void {
    if (this.form.enabled) this.form.disable()
    else this.form.enable()
  }

  setValue(): void {
    this.form.patchValue({ value: true })
  }

  reset(): void {
    this.form.reset({ value: false })
  }
}

export const TOGGLE_INTERACTIVE_EXAMPLE_TS = `import { Component } from '@angular/core'
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'
import { QuangCheckboxComponent } from 'quang/components/checkbox'

@Component({
  selector: 'app-toggle-interactive-example',
  standalone: true,
  imports: [ReactiveFormsModule, QuangCheckboxComponent],
  template: \
    \`<form [formGroup]="form">
  <quang-checkbox
    [checkType]="checkType"
    [labelPosition]="labelPosition"
    [isReadonly]="isReadonly"
    [componentLabel]="componentLabel"
    formControlName="value"
    successMessage="form.label.success"
  />
</form>\`,
})
export class ToggleInteractiveExampleComponent {
  constructor(private readonly fb: FormBuilder) {}

  form = this.fb.group({
    value: [false, [Validators.requiredTrue]],
  })

  checkType: 'toggle' | 'checkbox' = 'toggle'
  labelPosition: 'top' | 'left' | 'right' = 'top'
  isReadonly = false
  componentLabel = 'form.label.toggle'
}`

export const TOGGLE_INTERACTIVE_EXAMPLE_HTML = `<form [formGroup]="form">
  <quang-checkbox
    [checkType]="checkType"
    [labelPosition]="labelPosition"
    [isReadonly]="isReadonly"
    [componentLabel]="componentLabel"
    formControlName="value"
    successMessage="form.label.success"
  />
</form>`
