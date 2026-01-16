import { JsonPipe } from '@angular/common'
import { ChangeDetectionStrategy, Component, TemplateRef, computed, signal, viewChild } from '@angular/core'
import { FormControl, ReactiveFormsModule } from '@angular/forms'

import { QuangSelectComponent } from 'quang/components/select'
import { QuangSelectOptionTemplateContext, SelectOption } from 'quang/components/shared'

@Component({
  selector: 'playground-select-template-example',
  standalone: true,
  imports: [ReactiveFormsModule, QuangSelectComponent, JsonPipe],
  template: `
    <div class="d-flex align-items-center justify-content-between mb-2">
      <p class="mb-0 text-muted small">Toggle selection mode to see templated options in both modes.</p>
      <div class="form-check form-switch">
        <input
          [checked]="isMultiple()"
          (change)="toggleSelectionMode()"
          class="form-check-input"
          id="selectTemplateSelectionMode"
          type="checkbox"
        />
        <label
          class="form-check-label"
          for="selectTemplateSelectionMode"
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
          style="width: 0.75rem; height: 0.75rem; background: #6f42c1"
        ></span>
        <span aria-hidden="true">✨</span>
        <strong>{{ opt.label }}</strong>
        <small class="text-muted">selected: {{ selected }}</small>
      </span>
    </ng-template>

    <quang-select
      [formControl]="control"
      [selectionMode]="isMultiple() ? 'multiple' : 'single'"
      [selectOptions]="options()"
      componentLabel="Select (templated options)"
    />

    <p class="mt-2 text-muted small">Selected value: {{ control.value === null ? 'none' : (control.value | json) }}</p>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectTemplateExampleComponent {
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

export const SELECT_TEMPLATE_EXAMPLE_TS = `import { ChangeDetectionStrategy, Component, TemplateRef, computed, viewChild } from '@angular/core'
import { FormControl, ReactiveFormsModule } from '@angular/forms'

import { QuangSelectComponent } from 'quang/components/select'
import { QuangSelectOptionTemplateContext, SelectOption } from 'quang/components/shared'

@Component({
  selector: 'app-select-template',
  imports: [ReactiveFormsModule, QuangSelectComponent],
  template: \`
    <div class="d-flex align-items-center justify-content-between mb-2">
      <p class="mb-0 text-muted small">Toggle selection mode to see templated options in both modes.</p>
      <div class="form-check form-switch">
        <input
          [checked]="isMultiple()"
          (change)="toggleSelectionMode()"
          class="form-check-input"
          id="selectTemplateSelectionMode"
          type="checkbox"
        />
        <label class="form-check-label" for="selectTemplateSelectionMode">Multiple</label>
      </div>
    </div>

    <ng-template #optTpl let-opt let-selected="selected">
      <span class="d-flex gap-2 align-items-center">
        <span
          aria-hidden="true"
          class="d-inline-block rounded-1"
          style="width: 0.75rem; height: 0.75rem; background: #6f42c1"
        ></span>
        <span aria-hidden="true">✨</span>
        <strong>{{ opt.label }}</strong>
        <small class="text-muted">selected: {{ selected }}</small>
      </span>
    </ng-template>

    <quang-select
      componentLabel="Select (templated options)"
      [formControl]="control"
      [selectOptions]="options()"
      [selectionMode]="isMultiple() ? 'multiple' : 'single'"
    />
  \`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectTemplateExampleComponent {
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

export const SELECT_TEMPLATE_EXAMPLE_HTML = `<ng-template #optTpl let-opt let-selected="selected">
  <span class="d-flex gap-2 align-items-center">
    <span
      aria-hidden="true"
      class="d-inline-block rounded-1"
      style="width: 0.75rem; height: 0.75rem; background: #6f42c1"
    ></span>
    <span aria-hidden="true">✨</span>
    <strong>{{ opt.label }}</strong>
    <small class="text-muted">selected: {{ selected }}</small>
  </span>
</ng-template>

<quang-select
  componentLabel="Select (templated options)"
  [formControl]="control"
  [selectOptions]="options()"
  [selectionMode]="isMultiple() ? 'multiple' : 'single'"
/>`
