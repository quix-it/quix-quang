import { JsonPipe } from '@angular/common'
import { ChangeDetectionStrategy, Component, TemplateRef, computed, signal, viewChild } from '@angular/core'
import { FormControl, ReactiveFormsModule } from '@angular/forms'

import { QuangAutocompleteComponent } from 'quang/components/autocomplete'
import { QuangSelectOptionTemplateContext, SelectOption } from 'quang/components/shared'

@Component({
  selector: 'playground-autocomplete-template-example',
  standalone: true,
  imports: [ReactiveFormsModule, QuangAutocompleteComponent, JsonPipe],
  template: `
    <div class="d-flex align-items-center justify-content-between mb-2">
      <p class="mb-0 text-muted small">Toggle selection mode to see templated options in both modes.</p>
      <div class="form-check form-switch">
        <input
          [checked]="isMultiple()"
          (change)="toggleSelectionMode()"
          class="form-check-input"
          id="autocompleteTemplateSelectionMode"
          type="checkbox"
        />
        <label
          class="form-check-label"
          for="autocompleteTemplateSelectionMode"
          >Multiple</label
        >
      </div>
    </div>

    <ng-template
      #optTpl
      let-opt
      let-selected="selected"
    >
      <span class="d-flex gap-2 align-items-center">
        <span
          aria-hidden="true"
          class="d-inline-block rounded-1"
          style="width: 0.75rem; height: 0.75rem; background: #0d6efd"
        ></span>
        <span aria-hidden="true">✨</span>
        <strong>{{ opt.label }}</strong>
        <small class="text-muted">selected: {{ selected }}</small>
      </span>
    </ng-template>

    <quang-autocomplete
      [componentLabel]="'Autocomplete (templated options)'"
      [formControl]="control"
      [internalFilterOptions]="true"
      [multiple]="isMultiple()"
      [selectOptions]="options()"
    />

    <p class="mt-2 text-muted small">Selected value: {{ control.value === null ? 'none' : (control.value | json) }}</p>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutocompleteTemplateExampleComponent {
  control = new FormControl<string | number | (string | number)[] | null>(null)

  protected readonly isMultiple = signal(false)

  private readonly optTpl = viewChild<TemplateRef<QuangSelectOptionTemplateContext>>('optTpl')

  toggleSelectionMode(): void {
    this.isMultiple.update((current) => !current)

    const currentValue = this.control.value

    if (this.isMultiple()) {
      this.control.setValue(Array.isArray(currentValue) ? currentValue : currentValue != null ? [currentValue] : [])
      return
    }

    this.control.setValue(Array.isArray(currentValue) ? (currentValue[0] ?? null) : currentValue)
  }

  options = computed<SelectOption[]>(() => [
    { value: 'IT', label: 'Italy' },
    { value: 'FR', label: 'France', renderer: this.optTpl() },
    { value: 'DE', label: 'Germany' },
  ])
}

export const AUTOCOMPLETE_TEMPLATE_TS = `import { ChangeDetectionStrategy, Component, TemplateRef, computed, signal, viewChild } from '@angular/core'
import { FormControl, ReactiveFormsModule } from '@angular/forms'

import { QuangAutocompleteComponent } from 'quang/components/autocomplete'
import { QuangSelectOptionTemplateContext, SelectOption } from 'quang/components/shared'

@Component({
  selector: 'app-autocomplete-template',
  imports: [ReactiveFormsModule, QuangAutocompleteComponent],
  template: \`
    <div class="d-flex align-items-center justify-content-between mb-2">
      <p class="mb-0 text-muted small">Toggle selection mode to see templated options in both modes.</p>
      <div class="form-check form-switch">
        <input
          [checked]="isMultiple()"
          (change)="toggleSelectionMode()"
          class="form-check-input"
          id="autocompleteTemplateSelectionMode"
          type="checkbox"
        />
        <label class="form-check-label" for="autocompleteTemplateSelectionMode">Multiple</label>
      </div>
    </div>

    <ng-template #optTpl let-opt let-selected="selected">
      <span class="d-flex gap-2 align-items-center">
        <span
          aria-hidden="true"
          class="d-inline-block rounded-1"
          style="width: 0.75rem; height: 0.75rem; background: #0d6efd"
        ></span>
        <span aria-hidden="true">✨</span>
        <strong>{{ opt.label }}</strong>
        <small class="text-muted">selected: {{ selected }}</small>
      </span>
    </ng-template>

    <quang-autocomplete
      [internalFilterOptions]="true"
      [selectOptions]="options()"
      [multiple]="isMultiple()"
      componentLabel="Autocomplete (templated options)"
      [formControl]="control"
    />
  \`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutocompleteTemplateExampleComponent {
  control = new FormControl<string | number | (string | number)[] | null>(null)

  protected readonly isMultiple = signal(false)

  private readonly optTpl = viewChild<TemplateRef<QuangSelectOptionTemplateContext>>('optTpl')

  toggleSelectionMode(): void {
    this.isMultiple.update((current) => !current)

    const currentValue = this.control.value

    if (this.isMultiple()) {
      this.control.setValue(Array.isArray(currentValue) ? currentValue : currentValue != null ? [currentValue] : [])
      return
    }

    this.control.setValue(Array.isArray(currentValue) ? (currentValue[0] ?? null) : currentValue)
  }

  options = computed<SelectOption[]>(() => [
    { value: 'IT', label: 'Italy' },
    { value: 'FR', label: 'France', renderer: this.optTpl() },
    { value: 'DE', label: 'Germany' },
  ])
}
`

export const AUTOCOMPLETE_TEMPLATE_HTML = `<ng-template #optTpl let-opt let-selected="selected">
  <span class="d-flex gap-2 align-items-center">
    <span
      aria-hidden="true"
      class="d-inline-block rounded-1"
      style="width: 0.75rem; height: 0.75rem; background: #0d6efd"
    ></span>
    <span aria-hidden="true">✨</span>
    <strong>{{ opt.label }}</strong>
    <small class="text-muted">selected: {{ selected }}</small>
  </span>
</ng-template>

<quang-autocomplete
  [internalFilterOptions]="true"
  [selectOptions]="options()"
  [multiple]="isMultiple()"
  componentLabel="Autocomplete (templated options)"
  [formControl]="control"
/>`
