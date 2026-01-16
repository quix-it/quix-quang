import { DatePipe, JsonPipe } from '@angular/common'
import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core'
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms'

import { QuangSelectComponent } from 'quang/components/select'
import { SelectOption } from 'quang/components/shared'

@Component({
  selector: 'playground-select-dynamic-options-example',
  standalone: true,
  imports: [ReactiveFormsModule, DatePipe, JsonPipe, QuangSelectComponent],
  template: `
    <p class="text-muted mb-3">
      Options update every 500ms to verify the component handles frequent changes gracefully.
    </p>

    <div class="row g-3 align-items-start">
      <div class="col-12 col-md-6">
        <form [formGroup]="form">
          <quang-select
            [selectOptions]="options()"
            componentId="select-dynamic"
            componentLabel="Dynamic options"
            componentPlaceholder="Select a time"
            formControlName="value"
            selectionMode="single"
            successMessage="form.label.success"
          />
        </form>
      </div>

      <div class="col-12 col-md-6">
        <div class="card">
          <div class="card-body">
            <div class="d-flex gap-4 flex-wrap">
              <div>
                <div class="fw-semibold">Timestamp</div>
                <div>{{ timestamp() | date: 'HH:mm:ss.SSS' }}</div>
              </div>
              <div>
                <div class="fw-semibold">Value</div>
                <pre class="mb-0">{{ form.value | json }}</pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectDynamicOptionsExampleComponent {
  private readonly fb = inject(NonNullableFormBuilder)
  private readonly destroyRef = inject(DestroyRef)

  protected readonly timestamp = signal(Date.now())

  protected readonly options = signal<SelectOption[]>([
    { value: 'yesterday', label: 'Yesterday' },
    { value: 'today', label: 'Today' },
    { value: 'now', label: `Now (${new Date().toLocaleTimeString()})` },
  ])

  protected readonly form = this.fb.group({
    value: this.fb.control<string | null>(null),
  })

  constructor() {
    const id = setInterval(() => {
      this.timestamp.set(Date.now())
      this.options.update((opts) =>
        opts.map((opt) =>
          opt.value === 'now'
            ? {
                ...opt,
                label: `Now (${new Date().toLocaleTimeString()})`,
              }
            : opt
        )
      )
    }, 500)

    this.destroyRef.onDestroy(() => clearInterval(id))
  }
}

export const SELECT_DYNAMIC_OPTIONS_EXAMPLE_TS = `import { Component } from '@angular/core'
import { FormBuilder, ReactiveFormsModule } from '@angular/forms'
import { QuangSelectComponent } from 'quang/components/select'

@Component({
  selector: 'app-select-dynamic-options-example',
  standalone: true,
  imports: [ReactiveFormsModule, QuangSelectComponent],
  template: \`<form [formGroup]="form">
  <quang-select
    [selectOptions]="options"
    componentId="select-dynamic"
    componentLabel="Dynamic options"
    componentPlaceholder="Select a time"
    formControlName="value"
    selectionMode="single"
  />
</form>\`,
})
export class SelectDynamicOptionsExampleComponent {
  constructor(private readonly fb: FormBuilder) {}

  options = [
    { value: 'yesterday', label: 'Yesterday' },
    { value: 'today', label: 'Today' },
    { value: 'now', label: 'Now' },
  ]

  form = this.fb.group({
    value: [null],
  })
}`

export const SELECT_DYNAMIC_OPTIONS_EXAMPLE_HTML = `<form [formGroup]="form">
  <quang-select
    [selectOptions]="options"
    componentId="select-dynamic"
    componentLabel="Dynamic options"
    componentPlaceholder="Select a time"
    formControlName="value"
    selectionMode="single"
  />
</form>`
