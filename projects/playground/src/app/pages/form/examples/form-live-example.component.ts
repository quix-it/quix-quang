import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import {
  AbstractControl,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms'

import { QuangAutocompleteComponent } from 'quang/components/autocomplete'
import { QuangCheckboxComponent } from 'quang/components/checkbox'
import { QuangDateComponent } from 'quang/components/date'
import { QuangInputComponent } from 'quang/components/input'
import { QuangRadioGroupComponent, RadioOption } from 'quang/components/radio-group'
import { QuangSelectComponent } from 'quang/components/select'
import { ErrorData } from 'quang/components/shared'
import { SelectOption } from 'quang/components/shared'

@Component({
  selector: 'playground-form-live-example',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    QuangInputComponent,
    QuangDateComponent,
    QuangCheckboxComponent,
    QuangSelectComponent,
    QuangAutocompleteComponent,
    QuangRadioGroupComponent,
  ],
  template: `
    <p class="text-muted mb-3">
      Submit with invalid values to see how errors appear after <code>markAllAsTouched()</code>. (Tip: set the name to
      <code>ok</code>, pick a future date, and check the checkbox.)
    </p>

    <form
      [formGroup]="liveForm"
      (ngSubmit)="onSubmitLiveForm()"
      class="card p-3 mb-3"
    >
      <quang-input
        [errorMap]="liveErrors()"
        componentId="live-name"
        componentLabel="Name"
        componentPlaceholder="Type 'ok'"
        componentType="text"
        formControlName="name"
      ></quang-input>

      <quang-input
        [errorMap]="liveErrors()"
        componentId="live-notes"
        componentLabel="Notes"
        componentPlaceholder="Write at least 10 characters"
        componentType="textarea"
        formControlName="notes"
      ></quang-input>

      <quang-input
        [errorMap]="liveErrors()"
        componentId="live-password"
        componentLabel="Password"
        componentPlaceholder="At least 6 characters"
        componentType="password"
        formControlName="password"
      ></quang-input>

      <quang-input
        [errorMap]="liveErrors()"
        componentId="live-rating"
        componentLabel="Rating"
        componentPlaceholder="Enter a number ≥ 10"
        componentType="number"
        formControlName="rating"
      ></quang-input>

      <quang-date
        [errorMap]="liveErrors()"
        componentId="live-date"
        componentLabel="Date"
        componentPlaceholder="Select a future date"
        formControlName="date"
      ></quang-date>

      <quang-select
        [errorMap]="liveErrors()"
        [selectOptions]="countryOptions()"
        componentId="live-country"
        componentLabel="Country"
        componentPlaceholder="Select a country"
        formControlName="country"
        selectionMode="single"
      />

      <quang-autocomplete
        [errorMap]="liveErrors()"
        [internalFilterOptions]="true"
        [selectOptions]="countryOptions()"
        componentId="live-country-autocomplete"
        componentLabel="Country (autocomplete)"
        componentPlaceholder="Start typing to search"
        formControlName="countryAutocomplete"
      />

      <quang-radio-group
        [errorMap]="liveErrors()"
        [radioOptions]="deliveryOptions()"
        componentId="live-delivery"
        componentLabel="Delivery"
        formControlName="delivery"
      />

      <quang-checkbox
        [errorMap]="liveErrors()"
        checkType="checkbox"
        componentId="live-agree"
        componentLabel="Agree"
        formControlName="agree"
      ></quang-checkbox>

      <div class="d-flex gap-2">
        <button
          class="btn btn-primary"
          type="submit"
        >
          Submit
        </button>
        <button
          (click)="resetLiveForm()"
          class="btn btn-outline-secondary"
          type="button"
        >
          Reset
        </button>
      </div>
    </form>

    <div class="card p-3">
      <div class="d-flex gap-4 flex-wrap">
        <div>
          <div class="fw-semibold">Valid</div>
          <div>{{ liveFormValid() }}</div>
        </div>
        <div>
          <div class="fw-semibold">Status</div>
          <div>{{ liveFormStatus() }}</div>
        </div>
      </div>
      <hr />
      <div class="fw-semibold">Value</div>
      <pre class="mb-0">{{ liveFormValue() | json }}</pre>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormLiveExampleComponent {
  private readonly formBuilder = inject(NonNullableFormBuilder)

  liveErrors = signal<ErrorData[]>([
    {
      error: Validators.required.name,
      message: 'form.errors.required',
    },
    {
      error: Validators.requiredTrue.name,
      message: 'form.errors.requiredTrue',
    },
    {
      error: Validators.minLength.name,
      message: 'form.errors.minLength',
    },
    {
      error: 'noMatch',
      message: 'form.errors.noMatch',
    },
  ])

  private readonly mustBeOk = (control: AbstractControl<string>): ValidationErrors | null => {
    return control.value === 'ok' ? null : { noMatch: true }
  }

  private readonly mustBeFutureDate = (control: AbstractControl<string>): ValidationErrors | null => {
    const value = control.value
    if (!value) return null

    const date = new Date(value)
    if (Number.isNaN(date.getTime())) return { noMatch: true }

    const now = new Date()
    now.setHours(0, 0, 0, 0)
    date.setHours(0, 0, 0, 0)

    return date.getTime() > now.getTime() ? null : { noMatch: true }
  }

  private readonly mustBeAtLeast10 = (control: AbstractControl<number>): ValidationErrors | null => {
    const value = control.value
    if (value === null || value === undefined) return null
    return value >= 10 ? null : { noMatch: true }
  }

  countryOptions = signal<SelectOption[]>([
    { label: 'Italy', value: 'IT' },
    { label: 'France', value: 'FR' },
    { label: 'Germany', value: 'DE' },
    { label: 'Spain', value: 'ES' },
  ])

  deliveryOptions = signal<RadioOption[]>([
    { value: 'standard', label: 'Standard' },
    { value: 'express', label: 'Express' },
  ])

  liveForm = this.formBuilder.group({
    name: this.formBuilder.control('', [Validators.required, this.mustBeOk]),
    notes: this.formBuilder.control('', [Validators.required, Validators.minLength(10)]),
    password: this.formBuilder.control('', [Validators.required, Validators.minLength(6)]),
    rating: this.formBuilder.control(0, [Validators.required, this.mustBeAtLeast10]),
    date: this.formBuilder.control('', [Validators.required, this.mustBeFutureDate]),
    country: this.formBuilder.control<string | null>(null, [Validators.required]),
    countryAutocomplete: this.formBuilder.control<string | null>(null, [Validators.required]),
    delivery: this.formBuilder.control<string | null>(null, [Validators.required]),
    agree: this.formBuilder.control(false, [Validators.requiredTrue]),
  })

  liveFormValue = signal(this.liveForm.getRawValue())

  liveFormStatus = signal(this.liveForm.status)

  liveFormValid = computed(() => this.liveFormStatus() === 'VALID')

  onSubmitLiveForm(): void {
    this.liveForm.markAllAsTouched()
  }

  resetLiveForm(): void {
    this.liveForm.reset({
      name: '',
      notes: '',
      password: '',
      rating: 0,
      date: '',
      country: null,
      countryAutocomplete: null,
      delivery: null,
      agree: false,
    })
  }

  constructor() {
    this.liveForm.valueChanges.pipe(takeUntilDestroyed()).subscribe(() => {
      this.liveFormValue.set(this.liveForm.getRawValue())
    })
    this.liveForm.statusChanges.pipe(takeUntilDestroyed()).subscribe((status) => {
      this.liveFormStatus.set(status)
    })
  }
}

export const FORM_LIVE_EXAMPLE_TS = `import { Component } from '@angular/core'
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms'
import { QuangAutocompleteComponent } from 'quang/components/autocomplete'
import { QuangCheckboxComponent } from 'quang/components/checkbox'
import { QuangDateComponent } from 'quang/components/date'
import { QuangInputComponent } from 'quang/components/input'
import { QuangRadioGroupComponent, RadioOption } from 'quang/components/radio-group'
import { QuangSelectComponent } from 'quang/components/select'
import { SelectOption } from 'quang/components/shared'

@Component({
  selector: 'app-form-live-example',
  imports: [
    ReactiveFormsModule,
    QuangInputComponent,
    QuangDateComponent,
    QuangCheckboxComponent,
    QuangSelectComponent,
    QuangAutocompleteComponent,
    QuangRadioGroupComponent,
  ],
  template: \`
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <quang-input formControlName="name" componentLabel="Name" componentType="text" />
      <quang-input formControlName="notes" componentLabel="Notes" componentType="textarea" />
      <quang-input formControlName="password" componentLabel="Password" componentType="password" />
      <quang-input formControlName="rating" componentLabel="Rating" componentType="number" />

      <quang-date formControlName="date" componentLabel="Date" />

      <quang-select
        formControlName="country"
        componentLabel="Country"
        selectionMode="single"
        [selectOptions]="countryOptions"
      />

      <quang-autocomplete
        formControlName="countryAutocomplete"
        componentLabel="Country (autocomplete)"
        [internalFilterOptions]="true"
        [selectOptions]="countryOptions"
      />

      <quang-radio-group
        formControlName="delivery"
        componentLabel="Delivery"
        [radioOptions]="deliveryOptions"
      />

      <quang-checkbox formControlName="agree" componentLabel="Agree" checkType="checkbox" />

      <button type="submit">Submit</button>
    </form>
  \`,
})
export class FormLiveExampleComponent {
  constructor(private readonly fb: FormBuilder) {}

  private mustBeOk(control: AbstractControl<string>): ValidationErrors | null {
    return control.value === 'ok' ? null : { noMatch: true }
  }

  private mustBeFutureDate(control: AbstractControl<string>): ValidationErrors | null {
    const value = control.value
    if (!value) return null

    const date = new Date(value)
    if (Number.isNaN(date.getTime())) return { noMatch: true }

    const now = new Date()
    now.setHours(0, 0, 0, 0)
    date.setHours(0, 0, 0, 0)

    return date.getTime() > now.getTime() ? null : { noMatch: true }
  }

  private mustBeAtLeast10(control: AbstractControl<number>): ValidationErrors | null {
    return control.value >= 10 ? null : { noMatch: true }
  }

  countryOptions: SelectOption[] = [
    { label: 'Italy', value: 'IT' },
    { label: 'France', value: 'FR' },
    { label: 'Germany', value: 'DE' },
    { label: 'Spain', value: 'ES' },
  ]

  deliveryOptions: RadioOption[] = [
    { value: 'standard', label: 'Standard' },
    { value: 'express', label: 'Express' },
  ]

  form = this.fb.group({
    name: ['', [Validators.required, (c) => this.mustBeOk(c as AbstractControl<string>)]],
    notes: ['', [Validators.required, Validators.minLength(10)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    rating: [0, [Validators.required, (c) => this.mustBeAtLeast10(c as AbstractControl<number>)]],
    date: ['', [Validators.required, (c) => this.mustBeFutureDate(c as AbstractControl<string>)]],
    country: [null, [Validators.required]],
    countryAutocomplete: [null, [Validators.required]],
    delivery: [null, [Validators.required]],
    agree: [false, [Validators.requiredTrue]],
  })

  onSubmit(): void {
    this.form.markAllAsTouched()
  }
}`

export const FORM_LIVE_EXAMPLE_HTML = `<form [formGroup]="form" (ngSubmit)="onSubmit()">
  <quang-input formControlName="name" componentLabel="Name" componentType="text" />
  <quang-input formControlName="notes" componentLabel="Notes" componentType="textarea" />
  <quang-input formControlName="password" componentLabel="Password" componentType="password" />
  <quang-input formControlName="rating" componentLabel="Rating" componentType="number" />

  <quang-date formControlName="date" componentLabel="Date" />

  <quang-select
    formControlName="country"
    componentLabel="Country"
    selectionMode="single"
    [selectOptions]="countryOptions"
  />

  <quang-autocomplete
    formControlName="countryAutocomplete"
    componentLabel="Country (autocomplete)"
    [internalFilterOptions]="true"
    [selectOptions]="countryOptions"
  />

  <quang-radio-group
    formControlName="delivery"
    componentLabel="Delivery"
    [radioOptions]="deliveryOptions"
  />

  <quang-checkbox formControlName="agree" componentLabel="Agree" checkType="checkbox" />

  <button type="submit">Submit</button>
</form>`
