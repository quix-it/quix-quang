import { ChangeDetectionStrategy, Component, TemplateRef, computed, viewChild } from '@angular/core'
import { FormControl, ReactiveFormsModule } from '@angular/forms'

import { QuangSelectComponent } from 'quang/components/select'
import { QuangSelectOptionTemplateContext, SelectOption } from 'quang/components/shared'

@Component({
  selector: 'playground-select-template-example',
  standalone: true,
  imports: [ReactiveFormsModule, QuangSelectComponent],
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
          style="width: 0.75rem; height: 0.75rem; background: #6f42c1"
        ></span>
        <span aria-hidden="true">✨</span>
        <strong>{{ opt.label }}</strong>
        <small class="text-muted">selected: {{ selected }}</small>
      </span>
    </ng-template>

    <quang-select
      [formControl]="control"
      [selectOptions]="options()"
      componentLabel="Select (templated options)"
      selectionMode="single"
    />

    <p class="mt-2 text-muted small">Selected value: {{ control.value ?? 'none' }}</p>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectTemplateExampleComponent {
  control = new FormControl<string | number | null>(null)

  private readonly optTpl = viewChild<TemplateRef<QuangSelectOptionTemplateContext>>('optTpl')

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
      selectionMode="single"
    />
  \`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectTemplateExampleComponent {
  control = new FormControl<string | number | null>(null)

  private readonly optTpl = viewChild<TemplateRef<QuangSelectOptionTemplateContext>>('optTpl')

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
  selectionMode="single"
/>`
