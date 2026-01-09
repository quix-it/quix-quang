import { ChangeDetectionStrategy, Component, TemplateRef, computed, viewChild } from '@angular/core'
import { FormControl, ReactiveFormsModule } from '@angular/forms'

import { QuangAutocompleteComponent } from 'quang/components/autocomplete'
import { QuangSelectOptionTemplateContext, SelectOption } from 'quang/components/shared'

@Component({
  selector: 'playground-autocomplete-template-example',
  standalone: true,
  imports: [ReactiveFormsModule, QuangAutocompleteComponent],
  template: `
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
      [selectOptions]="options()"
    />

    <p class="mt-2 text-muted small">Selected value: {{ control.value ?? 'none' }}</p>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutocompleteTemplateExampleComponent {
  control = new FormControl<string | number | null>(null)

  private readonly optTpl = viewChild<TemplateRef<QuangSelectOptionTemplateContext>>('optTpl')

  options = computed<SelectOption[]>(() => [
    { value: 'IT', label: 'Italy' },
    { value: 'FR', label: 'France', renderer: this.optTpl() },
    { value: 'DE', label: 'Germany' },
  ])
}

export const AUTOCOMPLETE_TEMPLATE_TS = `import { ChangeDetectionStrategy, Component, TemplateRef, computed, viewChild } from '@angular/core'
import { FormControl, ReactiveFormsModule } from '@angular/forms'

import { QuangAutocompleteComponent } from 'quang/components/autocomplete'
import { QuangSelectOptionTemplateContext, SelectOption } from 'quang/components/shared'

@Component({
  selector: 'app-autocomplete-template',
  imports: [ReactiveFormsModule, QuangAutocompleteComponent],
  template: \`
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
      componentLabel="Autocomplete (templated options)"
      [formControl]="control"
    />
  \`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutocompleteTemplateExampleComponent {
  control = new FormControl<string | number | null>(null)

  private readonly optTpl = viewChild<TemplateRef<QuangSelectOptionTemplateContext>>('optTpl')

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
  componentLabel="Autocomplete (templated options)"
  [formControl]="control"
/>`
