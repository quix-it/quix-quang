import { ChangeDetectionStrategy, Component, TemplateRef, computed, viewChild } from '@angular/core'
import { FormControl, ReactiveFormsModule } from '@angular/forms'

import { QuangRadioGroupComponent, QuangRadioOptionTemplateContext, RadioOption } from 'quang/components/radio-group'

@Component({
  selector: 'playground-radio-group-template-example',
  standalone: true,
  imports: [ReactiveFormsModule, QuangRadioGroupComponent],
  template: `
    <ng-template
      #optTpl
      let-opt
      let-selected="selected"
    >
      <span class="d-flex gap-2 align-items-center">
        <strong>Custom {{ opt.value }}</strong>
        <small class="text-muted">selected: {{ selected }}</small>
      </span>
    </ng-template>

    <quang-radio-group
      [formControl]="control"
      [radioOptions]="options()"
      componentLabel="Radio group"
    />

    <p class="mt-2 text-muted small">Selected value: {{ control.value ?? 'none' }}</p>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadioGroupTemplateExampleComponent {
  control = new FormControl<string | null>(null)

  private readonly optTpl = viewChild<TemplateRef<QuangRadioOptionTemplateContext>>('optTpl')

  options = computed<RadioOption[]>(() => [
    { value: 'A', label: 'Option A' },
    { value: 'B', renderer: this.optTpl() },
    { value: 'C', label: 'Option C' },
  ])
}

export const RADIO_GROUP_TEMPLATE_TS = `import { Component, TemplateRef, computed, viewChild } from '@angular/core'
import { FormControl, ReactiveFormsModule } from '@angular/forms'
import { QuangRadioGroupComponent, QuangRadioOptionTemplateContext, RadioOption } from 'quang/components/radio-group'

@Component({
  selector: 'app-radio-group-template',
  imports: [ReactiveFormsModule, QuangRadioGroupComponent],
  template: \`
    <ng-template #optTpl let-opt let-selected="selected">
      <span class="d-flex gap-2 align-items-center">
        <strong>Custom {{ opt.value }}</strong>
        <small class="text-muted">selected: {{ selected }}</small>
      </span>
    </ng-template>

    <quang-radio-group
      componentLabel="Radio group"
      [formControl]="control"
      [radioOptions]="options()"
    />
  \`,
})
export class RadioGroupTemplateComponent {
  control = new FormControl<string | null>(null)

  private readonly optTpl = viewChild<TemplateRef<QuangRadioOptionTemplateContext>>('optTpl')

  options = computed<RadioOption[]>(() => [
    { value: 'A', label: 'Option A' },
    { value: 'B', renderer: this.optTpl() },
    { value: 'C', label: 'Option C' },
  ])
}`

export const RADIO_GROUP_TEMPLATE_HTML = `<ng-template #optTpl let-opt let-selected="selected">
  <span class="d-flex gap-2 align-items-center">
    <strong>Custom {{ opt.value }}</strong>
    <small class="text-muted">selected: {{ selected }}</small>
  </span>
</ng-template>

<quang-radio-group
  componentLabel="Radio group"
  [formControl]="control"
  [radioOptions]="options()"
/>`
